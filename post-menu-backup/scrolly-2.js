var APP = APP || {};

APP.linkScroll = APP.linkScroll || (function() {
  'use strict';

  var $scrollLinks,
    duration = 800;

  function init() {
    $scrollLinks = $('a.link-top, a.link-scroll');
    $scrollLinks.click(function() {
      doScroll($(this));
    });
  }

  // Scroll to top if href is "#" otherwise to anchor. Only show link if page is big enough
  function doScroll(el) {
    var link = el.attr('href');

    if (link === '#') {
      $('body, html').animate({
        scrollTop: 0
      }, 800);
    } else {
      $('body, html').animate({
        'scrollTop': $(link).offset().top
      }, duration, function() {
        updateUrl(link);
      });
    }
    return false;
  }

  function hasHistoryApi() {    
    return !!(window.history && history.pushState);
  }

  function updateUrl(link) {
    if (hasHistoryApi() === true) {
      history.pushState({}, '', '#' + link.substring(1));
    }
  }

  return {
    init: init
  };

}());

$(document).ready(function() {
  'use strict';
  APP.linkScroll.init();
});