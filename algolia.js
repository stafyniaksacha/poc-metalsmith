const algoliasearch = require('algoliasearch')
const cheerio = require('cheerio')
const Bluebird = require('bluebird')
const util = require('util')

module.exports = function(options) {
  let client = algoliasearch('4RFBRWISJR', 'thisisprivate')
  let index = client.initIndex('kuzzle-documentation')

  return function(files, metalsmith, done) {
    console.log('==> indexing')
    let clear = new Bluebird((resolve, reject) => {
      let promises = []

      index.clearIndex(function(err, content) {
        console.log('==> clear index')
        for (let file in files) {
          if (files[file].algolia !== true) {
            continue
          }

          //   if (files[file].ancestry.parent) {
          //   console.log(util.inspect(files[file], {depth: 2}))
          //   process.exit(1)
          // }
          let $ = cheerio.load(files[file].contents.toString(), {
            normalizeWhitespace: true
          })
          let content = $('.main-content')

          // remove useless content
          $('pre', content).remove()
          $('blockquote', content).remove()
          $('.language-tab-selector', content).remove()
          $('table', content).remove()

          //content = content.text()

          let pagedata = {
            objectID: files[file].path,
            title: files[file].title,
            path: files[file].path,
            //content,
            parent: (files[file].ancestry.parent ? files[file].ancestry.parent.title : '')
          }

          for (let subpage of files[file].toc) {
            if (files[file].toc.level === 1) {
              continue
            }

            promises.push(new Bluebird((resolve, reject) => {
              let element = $(`#${subpage.id}`, content).parents('h1, h2, h3, h4, h5, h6')
              let siblings = element.nextUntil('h1, h2, h3, h4, h5, h6')

              let subpagedata = {
                objectID: subpage.path,
                title: files[file].title,
                subtitle: subpage.title,
                path: files[file].path,
                subpath: subpage.path,
                content: siblings.text(),
                parent: (files[file].ancestry.parent ? files[file].ancestry.parent.title : '')
              }

              index.addObject(subpagedata, function(err, content) {
                if (err) {
                  console.error('=> /!\\ err:', file, err.message)
                }

                console.log('=> indexed:', file, subpage.title)
                resolve(content);
              });
            }))
          }

          promises.push(new Bluebird((resolve, reject) => {
            index.addObject(pagedata, function(err, content) {
              if (err) {
                console.error('=> /!\\ err:', file, err.message)
              }

              console.log('=> indexed:', file)
              resolve(content);
            });
          }))
        }
        resolve(promises)
      })
    })

    clear
      .then((promises) => Bluebird.all(promises))
      .then(() => {
        console.log('==> index successful')
        done()
      })



  }
}
