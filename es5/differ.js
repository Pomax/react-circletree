"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function differ(o1, o2, props) {
  if (!props) props = o2;

  if ((typeof props === "undefined" ? "undefined" : _typeof(props)) === "object") {
    props = Object.keys(props);
  }

  for (var i = props.length, p; i > -1; i--) {
    p = props[i];
    if (o1[p] !== o2[p]) return true;
  }

  return false;
};