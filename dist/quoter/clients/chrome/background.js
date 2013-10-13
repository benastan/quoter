(function() {
  var Background;

  Background = (function() {
    function Background() {
      this.createContextMenus();
    }

    Background.prototype.createContextMenus = function() {
      chrome.contextMenus.onClicked.addListener(function(info, tab) {
        var options;
        options = {
          method: 'quoter.quote'
        };
        return chrome.tabs.sendMessage(tab.id, options, function(selectedText) {
          debugger;
        });
      });
      return chrome.runtime.onInstalled.addListener(function() {
        return chrome.contextMenus.create({
          title: 'Quote with Quoter',
          id: 'quoter-quote',
          contexts: ['page', 'selection']
        });
      });
    };

    return Background;

  })();

  module.exports = Background;

}).call(this);
