(function() {
  var Content, Selection;

  Selection = require('../../selection');

  Content = (function() {
    function Content() {
      this.attachMessageListeners();
    }

    Content.prototype.attachMessageListeners = function() {
      return chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        new Selection;
        if (request.method === 'quoter.quote') {
          return sendResponse('asda');
        }
      });
    };

    return Content;

  })();

  module.exports = Content;

}).call(this);
