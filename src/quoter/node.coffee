if typeof Node isnt 'undefined'
  Node.findSharedAncestor = (firstNode, secondNode) ->
    if firstNode is secondNode then firstNode
    else if secondNode.contains(firstNode) || firstNode.parentNode is secondNode then secondNode
    else if firstNode.contains(secondNode) || secondNode.parentNode is firstNode then firstNode
    else
      firstParentNode = firstNode
      secondParentNode = secondNode
      ancestor = false
      while firstParentNode = firstParentNode.parentNode
        while  secondParentNode = secondParentNode.parentNode
          if firstParentNode is secondParentNode
            ancestor = firstParentNode
            break
        if firstParentNode is secondParentNode
          ancestor = firstParentNode
          break
        secondParentNode = secondNode
      ancestor

  Node::collectTextNodes = ->
    textNodes = []
    for child in @childNodes
      if child.nodeType is child.TEXT_NODE
        textNodes.push(child)
      else
        textNodes = textNodes.concat(child.collectTextNodes())
    textNodes
