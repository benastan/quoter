(function() {
  var Chrome;

  Chrome = (function() {
    function Chrome() {}

    Chrome.Background = require('./chrome/background');

    Chrome.Content = require('./chrome/content');

    return Chrome;

  })();

  module.exports = Chrome;

}).call(this);
