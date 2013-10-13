(function() {
  var Clients;

  Clients = (function() {
    function Clients() {}

    Clients.Chrome = require('./clients/chrome');

    return Clients;

  })();

  module.exports = Clients;

}).call(this);
