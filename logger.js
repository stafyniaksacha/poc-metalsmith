//Register a new Metalsmith custom plugin
module.exports = options => {
  // Initialize options

  // Return a function that will be executed on files
  return (files, metalsmith, done) => {
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
