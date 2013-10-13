(function() {
  var Selection;

  require('./node');

  Selection = (function() {
    function Selection() {
      this.getSelection();
      this.string = this.selection.toString();
      this.length = this.string.length;
      this.openTag = '<span style="background-color: green" class="quoter-selected-text">';
      this.closeTag = '</span>';
      this.ancestorNode = Node.findSharedAncestor(this.anchorNode, this.focusNode);
      this.textNodes = (this.anchorNode === this.focusNode ? [this.anchorNode] : this.ancestorNode.collectTextNodes());
      this.filterTextNodes();
      this.wrapNodes();
    }

    Selection.prototype.getSelection = function() {
      var _ref;
      this.selection = document.getSelection();
      return _ref = this.selection, this.anchorNode = _ref.anchorNode, this.anchorOffset = _ref.anchorOffset, this.baseNode = _ref.baseNode, this.baseOffset = _ref.baseOffset, this.focusNode = _ref.focusNode, this.focusOffset = _ref.focusOffset, this.focusNode = _ref.focusNode, this.focusOffset = _ref.focusOffset, this.isCollapsed = _ref.isCollapsed, this.rangeCount = _ref.rangeCount, this.type = _ref.type, _ref;
    };

    Selection.prototype.filterTextNodes = function() {
      var node, textNodes, _i, _len, _ref;
      textNodes = [];
      _ref = this.textNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (this.selection.containsNode(node)) {
          textNodes.push(node);
        }
      }
      return this.textNodes = textNodes;
    };

    Selection.prototype.wrapNodes = function() {
      var node, _i, _len, _ref, _results;
      if (this.textNodes.length === 1) {
        return this.wrapSelectedTextWithinNode(this.anchorNode, this.anchorOffset, this.focusOffset);
      } else {
        this.wrapSelectedTextWithinNode(this.anchorNode, this.anchorOffset);
        this.wrapSelectedTextWithinNode(this.focusNode, 0, this.focusOffset);
        _ref = this.textNodes.slice(1, -1);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _results.push(this.wrapSelectedTextWithinNode(node));
        }
        return _results;
      }
    };

    Selection.prototype.wrapSelectedTextWithinNode = function(node, start, end) {
      var chars, child, intermediateNode, parent;
      if (start == null) {
        start = 0;
      }
      if (end == null) {
        end = false;
      }
      parent = node.parentElement;
      if (!node.textContent.match(/^\s+$/) && parent) {
        chars = node.textContent.split('');
        chars.splice(start, 0, this.openTag);
        if (end) {
          chars.splice(end + 1, 0, this.closeTag);
        } else {
          chars.push(this.closeTag);
        }
        intermediateNode = document.createElement('span');
        intermediateNode.innerHTML = chars.join('');
        while (intermediateNode.childNodes.length) {
          child = intermediateNode.childNodes[0];
          parent.insertBefore(child, node);
        }
        return parent.removeChild(node);
      }
    };

    return Selection;

  })();

  module.exports = Selection;

}).call(this);
