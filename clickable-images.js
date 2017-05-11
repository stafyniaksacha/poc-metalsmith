const Bluebird  = require('bluebird')
const cheerio = require('cheerio')

module.exports = options => {
  return (files, metalsmith, done) => {
    let promises = []

    for (let file in files) {
      if (!file.endsWith('.html')) {
        continue
      }

      promises.push(new Bluebird((resolve, reject) => {
        let $ = cheerio.load(files[file].contents.toString())
        let images = $('.content img').each((index, image) => {
          let src = $(image).attr('src')
          $(image).replaceWith(`<a class="image" href="${src}"><img src="${src}" /></a>`)
        })

        files[file].contents = new Buffer($.html())

        resolve()
      }))
    }

    Bluebird.all(promises).then(() => done())
  }
}
