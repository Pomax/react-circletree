var dispatcher = {

  dispatch(eventName, detail) {
    var customEvent = new CustomEvent(eventName, { detail });
    window.dispatchEvent(customEvent);
  },

  on(eventName, callback) {
    window.addEventListener(eventName, callback);
  },

  off(eventName, callback) {
    window.removeEventListener(eventName, callback);
  }

};

module.exports = dispatcher;
