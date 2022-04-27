(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory(root);
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ScrollLoad = factory(root);
  }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    root = window;
  }

  const defaults = {
    mistake: 20,
    delay: 300,
    flag: true,
    handleFun: function () {
    }
  };

  const throttle = function (fn, delay) {
    let valid = true;
    return function () {
      if (!valid) {
        return false;
      }

      valid = false;
      setTimeout(function () {
        fn();
        valid = true;
      }, delay);
    };
  };

  const clientHeight = document.documentElement.clientHeight;

  let stop = false;

  function ScrollLoad(selDom, options = {}) {
    let self = this;
    this.selDom = selDom;
    if (options.hasOwnProperty('flag')) {
      delete options.flag;
    }
    this.cfg = Object.assign(defaults, options)

    if (options.hasOwnProperty('handle') && Object.prototype.toString.call(options['handle']) === '[object Function]') {
      this.cfg.handleFun = function () {
        options['handle']();
        self.cfg.flag = true;
      };
    }

    this.init();
  }

  ScrollLoad.prototype = {
    init: function () {
      let self = this;

      window.onscroll = throttle(function () {
        if (stop) {
          return false;
        }
        if (!self.cfg.flag) {
          return false;
        }
        if (self.selBottom(self.selDom) < clientHeight + self.cfg.mistake) {
          self.cfg.flag = false;

          self.cfg.handleFun();
        }
      }, self.cfg.delay);
    },
    selBottom: function (sel) {
      return document.getElementsByClassName(sel)[0].getBoundingClientRect().bottom;
    },
    stop: function () {
      stop = true;
    }
  };

  root.ScrollLoad = function (selDom, options) {
    return new ScrollLoad(selDom, options);
  };

  return ScrollLoad;
});
