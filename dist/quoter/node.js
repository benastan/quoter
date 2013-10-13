(function() {
  var Node;

  Node = (function() {
    Node.findSharedAncestor = function(firstNode, secondNode) {
      var ancestor, firstParentNode, secondParentNode;
      if (firstNode === secondNode) {
        return firstNode;
      } else if (secondNode.node.contains(firstNode) && firstNode.node.parentNode === secondNode) {
        return secondNode;
      } else if (firstNode.node.contains(secondNode) && secondNode.node.parentNode === firstNode) {
        return firstNode;
      } else {
        firstParentNode = firstNode.node;
        secondParentNode = secondNode.node;
        ancestor = false;
        while (firstParentNode = firstParentNode.parentNode) {
          while (secondParentNode = secondParentNode.parentNode) {
            if (firstParentNode === secondParentNode) {
              ancestor = firstParentNode;
              break;
            }
          }
          if (firstParentNode === secondParentNode) {
            ancestor = firstParentNode;
            break;
          }
          secondParentNode = secondNode.node;
        }
        return new Node(ancestor);
      }
    };

    function Node(node) {
      this.node = node;
    }

    Node.prototype.collectTextNodes = function() {
      var child, textNodes, _i, _len, _ref;
      textNodes = [];
      _ref = this.node.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.nodeType === child.TEXT_NODE) {
          textNodes.push(child);
        } else {
          textNodes = textNodes.concat(new Node(child).collectTextNodes());
        }
      }
      return textNodes;
    };

    return Node;

  })();

  module.exports = Node;

}).call(this);
