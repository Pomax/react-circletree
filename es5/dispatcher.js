"use strict";

var dispatcher = {
  dispatch: function dispatch(eventName, detail) {
    var customEvent = new CustomEvent(eventName, { detail: detail });
    window.dispatchEvent(customEvent);
  },
  on: function on(eventName, callback) {
    window.addEventListener(eventName, callback);
  },
  off: function off(eventName, callback) {
    window.removeEventListener(eventName, callback);
  }
};

module.exports = dispatcher;