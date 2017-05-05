const Metalsmith  = require('metalsmith');

const markdown    = require('metalsmith-markdown');
const layouts     = require('metalsmith-layouts');
const permalinks  = require('metalsmith-permalinks');
const collect     = require('metalsmith-auto-collections');
const debug       = require('metalsmith-debug');
const changed     = require('metalsmith-changed');
const livereload  = require('metalsmith-livereload');
const cleanCSS    = require('metalsmith-clean-css');
const ancestry    = require('metalsmith-ancestry');
const links       = require('metalsmith-relative-links');
const hbtmd       = require('metalsmith-hbt-md');
const sass        = require('metalsmith-sass');

const handlebars = require('handlebars');
const nodeStatic = require('node-static');
const watch = require('glob-watcher');
const open = require('open');

const port = 8080;

function logger(options) {
  return function(files, metalsmith, done) {
    setImmediate(done)

    const paths = Object.keys(files)

    for (let path of paths) {
      if (path.endsWith('.md')) {
        console.log("==============================")
        console.log(path)
        console.log(Object.keys(files[path]))
        console.log(Object.keys(files[path].ancestry))
      }
    }

  }
}


/**
 * Usefull handlebars helpers
 */
handlebars.registerHelper({
    eq: function (v1, v2) {
        return v1 === v2;
    },
    ne: function (v1, v2) {
        return v1 !== v2;
    },
    lt: function (v1, v2) {
        return v1 < v2;
    },
    gt: function (v1, v2) {
        return v1 > v2;
    },
    lte: function (v1, v2) {
        return v1 <= v2;
    },
    gte: function (v1, v2) {
        return v1 >= v2;
    },
    and: function (v1, v2) {
        return v1 && v2;
    },
    or: function (v1, v2) {
        return v1 || v2;
    }
});

/**
 * Build with metalsmith.
 */
const build = (clean = false) => (done) => {
  Metalsmith(__dirname)
    .metadata({
      title: "My Static Site & Blog",
      description: "It's about saying »Hello« to the World.",
      generator: "Metalsmith",
      url: "http://www.metalsmith.io/"
    })
    .source('./src')
    .destination('./build') // does not work with 'dist' folder ...
    .clean(true) // false: does not rebuild templates
    .use(changed())
    .use(links())
    .use(ancestry({
      match: '**/*.md',
      sortBy: 'title'
    }))
    .use(sass({
      //outputDir: 'assets/stylesheets/',
      sourceMap: true,
      sourceMapContents: true   // This will embed all the Sass contents in your source maps.
    }))
    // .use(cleanCSS({
    //   files: 'assets/stylesheets/**/*.css',
    //   cleanCSS: {
    //     rebase: true
    //   }
    // }))
    .use(hbtmd(handlebars, {
        pattern: '**/*.md'
    }))
    .use(logger())
    .use(markdown())
    // .use(collect({
    //   pattern: ['**/*.md']
    // }))
    .use(permalinks())
    .use(layouts({
      engine: 'handlebars',
    }))
    .use(debug())
    .use(livereload({ debug: true }))
    .build((error, files) => {
      if (error) {
        console.error(error)
      }
      done()
    })
};

if (process.argv.indexOf('--dev') > -1) {
  var serve = new nodeStatic.Server(__dirname + '/build');

  require('http').createServer((req, res) => {
    req.addListener('end', () => serve.serve(req, res));
    req.resume();
  }).listen(port);

  watch(__dirname + '/{src,layouts}/**/*', { ignoreInitial: false }, build(false));

  if (process.argv.indexOf('--open') > -1) {
    open('http://localhost:' + port);
  }
} else {
  build(true)((error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }

    return process.exit(0)
  })
}
