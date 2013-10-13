require('./node')

class Selection
  constructor: ->
    @getSelection()
    @string = @selection.toString()
    @length = @string.length
    @openTag = '<span style="background-color: green" class="quoter-selected-text">'
    @closeTag = '</span>'
    @ancestorNode = Node.findSharedAncestor(@anchorNode, @focusNode)
    @textNodes = (
      if @anchorNode is @focusNode
        [ @anchorNode ]
      else
        @ancestorNode.collectTextNodes()
    )
    @filterTextNodes()
    @wrapNodes()

  getSelection: ->
    @selection = document.getSelection()
    { @anchorNode, @anchorOffset, @baseNode, @baseOffset, @focusNode, @focusOffset, @focusNode, @focusOffset, @isCollapsed, @rangeCount, @type } = @selection

  filterTextNodes: ->
    textNodes = []
    for node in @textNodes
      if @selection.containsNode(node)
        textNodes.push(node)
    @textNodes = textNodes

  wrapNodes: ->
    if @textNodes.length is 1
      @wrapSelectedTextWithinNode(@anchorNode, @anchorOffset, @focusOffset)
    else
      @wrapSelectedTextWithinNode(@anchorNode, @anchorOffset)
      @wrapSelectedTextWithinNode(@focusNode, 0, @focusOffset)
      for node in @textNodes.slice(1, -1)
        @wrapSelectedTextWithinNode(node)


  wrapSelectedTextWithinNode: (node, start = 0, end = false) ->
    parent = node.parentElement
    if ! node.textContent.match(/^\s+$/) && parent
      chars = node.textContent.split('')
      chars.splice(start, 0, @openTag)
      if end
        chars.splice(end + 1, 0, @closeTag)
      else
        chars.push(@closeTag)
      intermediateNode = document.createElement('span')
      intermediateNode.innerHTML = chars.join('')
      while intermediateNode.childNodes.length
        child = intermediateNode.childNodes[0]
        parent.insertBefore(child, node)
      parent.removeChild(node)

module.exports = Selection
