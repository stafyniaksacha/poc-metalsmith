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
const linkcheck   = require('metalsmith-linkcheck');
const metalic     = require('metalsmith-metallic');

const handlebars = require('handlebars');
const nodeStatic = require('node-static');
const watch = require('glob-watcher');
const open = require('open');

const port = 8080;

//Register a new Metalsmith custom plugin
function logger(options) {
  // Initialize options

  // Return a function that will be executed on files
  return function(files, metalsmith, done) {
    setImmediate(done)
    console.log("==============================", options)

    // const paths = Object.keys(files)
    //
    // // act on "files", update metadata  / contents ...
    // for (let path of paths) {
    //   if (path.endsWith('.md')) {
    //     console.log("==============================")
    //     console.log(path)
    //     console.log(Object.keys(files[path]))
    //     console.log(Object.keys(files[path].ancestry))
    //   }
    // }
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

// Build site with metalsmith.
const build = (dev = false) => (done) => {
  console.log('"?????"')
  let metalsmith = Metalsmith(__dirname)
    .metadata({
      title: "My Static Site & Blog",
      description: "It's about saying »Hello« to the World.",
      generator: "Metalsmith",
      url: "http://www.metalsmith.io/"
    })
    .source('./src')
    .destination('./build') // does not work with 'dist' folder ...
    .clean(true) // false: does not rebuild templates

  if (dev) {
    metalsmith.use(changed())
  }

  metalsmith
    .use(links())
    .use(ancestry({
      match: '**/*.md',
      sortBy: 'title'
    }))
    .use(sass({
      sourceMap: true,
      sourceMapContents: true
    }))
    .use(cleanCSS({
      files: 'assets/stylesheets/**/*.css',
      cleanCSS: {
        rebase: true
      }
    }))
    .use(metalic())
    .use(hbtmd(handlebars, {
        pattern: '**/*.md'
    }))
    .use(markdown())
    // .use(collect({
    //   pattern: ['**/*.md']
    // }))
    .use(permalinks())
    .use(layouts({
      engine: 'handlebars',
    }))
    .use(linkcheck({
      verbose: true,
      timeout: 5,
      checkFile: '.linkcheck/.links_checked.json',
      ignoreFile: '.linkcheck/links_ignore.json',
      failFile: '.linkcheck/links_failed.json'
    }))

  if (dev) {
    metalsmith
      .use(debug())
      .use(livereload({ debug: true }))
  }

  metalsmith.build((error, files) => {
      if (error) {
        console.error(error)
        if (!dev) {
          return done(error)
        }
      }
      done()
    })
};

if (process.argv.indexOf('--dev') > -1) {
  // run dev server (build & serv ./build directory on 8080 port & watch => rebuild on change)
  var serve = new nodeStatic.Server(__dirname + '/build');

  require('http').createServer((req, res) => {
    req.addListener('end', () => serve.serve(req, res));
    req.resume();
  }).listen(port);

  watch(__dirname + '/{src,layouts}/{!.linkcheck,**}/*', { ignoreInitial: false }, build(true));

  if (process.argv.indexOf('--open') > -1) {
    open('http://localhost:' + port);
  }
} else {
  // only build static site
  build()((error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }

    return process.exit(0)
  })
}
