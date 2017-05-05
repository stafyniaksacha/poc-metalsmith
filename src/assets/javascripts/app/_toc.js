//= require ../lib/_jquery_ui
//= require ../lib/_jquery.tocify
//= require ../lib/_imagesloaded.min
(function (global) {
  'use strict';

  var closeToc = function() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  var makeToc = function() {
    global.toc = $("#toc").tocify({
      selectors: 'h1, h2, h3',
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 250,
      scrollTo: 120,
      scrollTo2: 150,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');

    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
  };

  // Hack to make already open sections to start opened,
  // instead of displaying an ugly animation
  function animate() {
    setTimeout(function() {
      toc.setOption('showEffectSpeed', 180);
    }, 50);
  }

  $(function() {
    makeToc();
    animate();
    $('.content').imagesLoaded( function() {
      global.toc.calculateHeights();
    });

    $('h4').each(function(key, node) {
      $(node).html(
        '<span>' +
        $(node).text() +
        '</span>'
      )
    })

    $('h3').each(function(key, node) {
      var previousSection = '';
      var previousSubSection = '';
      var subheadings = $(node).prevAll('h2');
      var headings = $(node).prevAll('h1');

      $.each(subheadings, function(k, el) {
        previousSubSection = el.innerHTML;
        return false;
      });

      $.each(headings, function(k, el) {
        previousSection = el.innerHTML;
        return false;
      });

      var issueTitle = 'Issue related to "' + previousSection + '/' +  previousSubSection + '/' + $(node).text() + '" section';
      var issueLink = "https://github.com/kuzzleio/documentation/issues/new?labels=guide&title=" + encodeURIComponent(issueTitle);

      $(node).replaceWith(
        '<div class="heading">' +
        '<div class="left">' +
          '<h3 id="' + node.id + '">' +
            '<span class="heading-title">' +
              node.innerHTML +
            '</span>' +
            '<div class="heading-links">' +
              '<a target="_blank" rel="external" href="' + issueLink + '" title=\'' + issueTitle + '\'>' +
                '<i class="icon icon-github icon-small"></i>report an issue' +
              '</a>' +
            '</div>' +
          '</h3>' +
        '</div>' +
        '</div>'
      )
    });

    $('h2').each(function(key, node) {
      var previousSection = '';
      var headings = $(node).prevAll('h1');

      $.each(headings, function(k, el) {
        previousSection = el.innerHTML;
        return false;
      });

      var issueTitle = 'Issue related to "' + previousSection + '/' + $(node).text() + '" section';
      var issueLink = "https://github.com/kuzzleio/documentation/issues/new?labels=guide&title=" + encodeURIComponent(issueTitle);

      $(node).replaceWith(
        '<div class="heading ' + node.className + '">' +
        '<div class="left">' +
          '<h2 id="' + node.id + '">' +
            '<span class="heading-title">' +
              node.innerHTML +
            '</span>' +
            '<div class="heading-links">' +
              '<a target="_blank" rel="external" href="' + issueLink + '" title=\'' + issueTitle + '\'>' +
                '<i class="icon icon-github icon-small"></i>report an issue' +
              '</a>' +
            '</div>' +
          '</h2>' +
        '</div>' +
        '</div>'
      )
    });

    $('h1').each(function(key, node) {
      var issueTitle = 'Issue related to "' + $(node).text() + '" section';
      var issueLink = "https://github.com/kuzzleio/documentation/issues/new?labels=guide&title=" + encodeURIComponent(issueTitle);

      $(node).replaceWith(
        '<div class="heading' + ((key === 0) ? ' heading-first' : '') + '">' +
        '<div class="left">' +
          '<h1 id="' + node.id + '">' +
            '<span class="heading-title">' +
              node.innerHTML +
            '</span>' +
            '<div class="heading-links">' +
              '<a target="_blank" rel="external" href="' + issueLink + '" title=\'' + issueTitle + '\'>' +
                '<i class="icon icon-github icon-small"></i>report an issue' +
              '</a>' +
            '</div>' +
          '</h1>' +
        '</div>' +
        '</div>'
      )
    });

    $('h4, h5, h6').each(function(key, node) {
      $(node).replaceWith(
        '<div class="heading">' +
        '<div class="left">' +
        '<' + node.tagName + ' id="' + node.id + '">' +
          '<span class="heading-title">' +
            node.innerHTML +
          '</span>' +
        '</' + node.tagName + '>' +
        '</div>' +
        '</div>'
      )
    });

    $('.panels > .panel > a').each(function (key, node) {
      var $n = $(node);

      $n.click(function (e) {
        e.preventDefault();
        global.toc._scrollTo($('div[data-unique="' + $n.attr('href').substring(1) + '"]'))
      });
    });

  });
})(window);
