# Playing with metalsmith

`npm install`
> install dependencies

`node index.js`
> builds src into build/ folder

`node index.js --dev`
> bind a webserver on 8080 with livereload

`DEBUG=* node index.js --dev --open`
> bind a webserver on 8080 with livereload, open a browser and turn on debug messages


### Usefull links
- [https://www.npmjs.com/package/metalsmith](https://www.npmjs.com/package/metalsmith)
- [https://github.com/metalsmith/awesome-metalsmith](https://github.com/metalsmith/awesome-metalsmith)
- [https://www.npmjs.com/package/metalsmith-ancestry](https://www.npmjs.com/package/metalsmith-ancestry)
- [http://handlebarsjs.com/](http://handlebarsjs.com/)


### todo
- [x] compile markdown
- [x] compile sass
- [x] custom layout
- [x] livereload
- [x] auto tree (reference the next, previous, parent and all children of a particular resource)
- [x] find a way to get sdk-exemples/api-reference working (with tabs / custom template / ...)
- [ ] ~multi version capability ([we can use multi-language plugin](https://github.com/doup/metalsmith-multi-language))~
- [x] generate table of content ~([maybe this ?](https://github.com/majodev/metalsmith-headings-identifier))~
- [ ] ~client-side search [with lunr](https://github.com/CMClay/metalsmith-lunr)~
- [x] try a [broken link checker](https://github.com/gchallen/code.metalsmith-linkcheck)
- [ ] try [discus](https://github.com/vitaliy-bobrov/metalsmith-disqus)
- [ ] ~try content [fingerprint](https://github.com/christophercliff/metalsmith-fingerprint)~
