const cheerio = require('cheerio')
const util = require('util')

/**
 *
 */
module.exports = function languageTab(options) {
  const selector = '.hljs'
  const languagesHeaders = {
    js: 'Javascript',
    java: 'Android',
    php: 'PHP'
  }
  const whitelist = Object.keys(languagesHeaders)

  return function (files, metalsmith, done) {
    setImmediate(done)

    for (let file in files) {
      let data = files[file]
      let languages = []
      let firstsTabs = []
      let languageSelector

      // load contents with cheerio to parse html nodes
      let $ = cheerio.load(data.contents.toString())

      if (!file.endsWith('.html')) {
        continue
      }

      if (!data['language-tab']) {
        continue
      }

      // identify languages tabs
      $(selector).each((index, element) => {
        let classes = $(element).attr('class').split(' ');
        let parent = $(element).parent()
        let languageClass = '';


        for (let cssClass of classes) {
          if (whitelist.indexOf(cssClass) > -1) {
            languageClass = cssClass

            if (languages.indexOf(cssClass) === -1) {
              languages.push(cssClass)
            }
          }
        }

        if (parent.is('pre')) {
          parent.addClass('language-tab')
          parent.attr('data-language', languageClass)

          if (!parent.prev().is('pre')
            && !parent.prev().is('blockquote')
            && !parent.prev().is('aside')
            && !parent.prev().is('section')
          ) {
            parent.addClass('language-first-tab')
            parent.addClass('language-tab-active') // activate first tab
            firstsTabs.push(element)
          }

          if (parent.prev().is('blockquote')
            || parent.prev().is('aside')
            || parent.prev().is('section')
          ) {
            parent.addClass('language-meta-tab')
          }
        }
      })

      languageSelector = $('<div>')
      languageSelector.addClass('language-tab-selector')

      for (let i in languages) {
        if (i == 0) { // activate first tab
          languageSelector.append(`<a href="#" class="language-tab-active" data-language-name="${languages[i]}">${languagesHeaders[languages[i]]}</a>`)
        }
        else {
          languageSelector.append(`<a href="#" data-language-name="${languages[i]}">${languagesHeaders[languages[i]]}</a>`)
        }
      }

      // insert language selector
      $('.language-first-tab').each((index, element) => {
        let el = languageSelector.clone()

        $(element).before(el)
      })


      data.contents = new Buffer($.html())
      files[file] = data

    }
  }
}