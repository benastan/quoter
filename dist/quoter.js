(function() {
  var Quoter;

  Quoter = (function() {
    function Quoter() {}

    Quoter.Clients = require('./quoter/clients');

    return Quoter;

  })();

  module.exports = Quoter;

}).call(this);
