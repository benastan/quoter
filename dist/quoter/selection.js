(function() {
  var Node, Selection;

  Node = require('./node');

  Selection = (function() {
    function Selection() {
      var anchorNode, extentNode, _ref;
      this.selection = document.getSelection();
      _ref = this.selection, anchorNode = _ref.anchorNode, this.anchorOffset = _ref.anchorOffset, this.baseNode = _ref.baseNode, this.baseOffset = _ref.baseOffset, extentNode = _ref.extentNode, this.extentOffset = _ref.extentOffset, this.focusNode = _ref.focusNode, this.focusOffset = _ref.focusOffset, this.isCollapsed = _ref.isCollapsed, this.rangeCount = _ref.rangeCount, this.type = _ref.type;
      this.string = this.selection.toString();
      this.length = this.string.length;
      this.anchorNode = new Node(anchorNode);
      this.extentNode = new Node(extentNode);
      this.ancestorNode = Node.findSharedAncestor(this.anchorNode, this.extentNode);
      this.textNodes = this.ancestorNode.collectTextNodes();
      this.filterTextNodes();
      this.wrapNodes();
    }

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
      var html, node, parent, _i, _len, _ref, _results;
      if (this.textNodes.length === 1) {
        this.wrapSingleNode();
      } else {
        this.wrapFirstNode();
        this.wrapLastNode();
      }
      _ref = this.textNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        parent = node.parentElement;
        if (!(node.textContent.match(/^\s+$/) || !parent)) {
          html = parent.innerHTML;
          _results.push(parent.innerHTML = '<span style="background-color: green">' + html + '</span>');
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Selection;

  })();

  module.exports = Selection;

}).call(this);
