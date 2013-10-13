class Node
  @findSharedAncestor: (firstNode, secondNode) ->
    if firstNode is secondNode then firstNode
    else if secondNode.node.contains(firstNode) && firstNode.node.parentNode is secondNode then secondNode
    else if firstNode.node.contains(secondNode) && secondNode.node.parentNode is firstNode then firstNode
    else
      firstParentNode = firstNode.node
      secondParentNode = secondNode.node
      ancestor = false
      while firstParentNode = firstParentNode.parentNode
        while  secondParentNode = secondParentNode.parentNode
          if firstParentNode is secondParentNode
            ancestor = firstParentNode
            break
        if firstParentNode is secondParentNode
          ancestor = firstParentNode
          break
        secondParentNode = secondNode.node
      new Node(ancestor)

  constructor: (@node) ->

  collectTextNodes: ->
    textNodes = []
    for child in @node.childNodes
      if child.nodeType is child.TEXT_NODE
        textNodes.push(child)
      else
        textNodes = textNodes.concat(new Node(child).collectTextNodes())
    textNodes

module.exports = Node
