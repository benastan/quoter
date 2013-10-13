(function() {
  if (typeof Node !== 'undefined') {
    Node.findSharedAncestor = function(firstNode, secondNode) {
      var ancestor, firstParentNode, secondParentNode;
      if (firstNode === secondNode) {
        return firstNode;
      } else if (secondNode.contains(firstNode) || firstNode.parentNode === secondNode) {
        return secondNode;
      } else if (firstNode.contains(secondNode) || secondNode.parentNode === firstNode) {
        return firstNode;
      } else {
        firstParentNode = firstNode;
        secondParentNode = secondNode;
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
          secondParentNode = secondNode;
        }
        return ancestor;
      }
    };
    Node.prototype.collectTextNodes = function() {
      var child, textNodes, _i, _len, _ref;
      textNodes = [];
      _ref = this.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.nodeType === child.TEXT_NODE) {
          textNodes.push(child);
        } else {
          textNodes = textNodes.concat(child.collectTextNodes());
        }
      }
      return textNodes;
    };
  }

}).call(this);
