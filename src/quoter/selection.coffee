Node = require('./node')

class Selection
  constructor: ->
    @selection = document.getSelection()
    { anchorNode, @anchorOffset, @baseNode, @baseOffset, extentNode, @extentOffset, @focusNode, @focusOffset, @isCollapsed, @rangeCount, @type } = @selection
    @string = @selection.toString()
    @length = @string.length
    @anchorNode = new Node(anchorNode)
    @extentNode = new Node(extentNode)
    @ancestorNode = Node.findSharedAncestor(@anchorNode, @extentNode)
    @textNodes = @ancestorNode.collectTextNodes()
    @filterTextNodes()
    @wrapNodes()

  filterTextNodes: ->
    textNodes = []
    for node in @textNodes
      if @selection.containsNode(node)
        textNodes.push(node)
    @textNodes = textNodes

  wrapNodes: ->
    if @textNodes.length is 1
      @wrapSingleNode()
    else
      @wrapFirstNode()
      @wrapLastNode()
    for node in @textNodes
      parent = node.parentElement
      unless node.textContent.match(/^\s+$/) || ! parent
        html = parent.innerHTML
        parent.innerHTML = '<span style="background-color: green">'+html+'</span>'

module.exports = Selection
