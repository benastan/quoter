class Background
  constructor: ->
    @createContextMenus()

  createContextMenus: ->
    chrome.contextMenus.onClicked.addListener (info, tab) ->
      options =
        method: 'quoter.quote'
      chrome.tabs.sendMessage tab.id, options, (selectedText) ->
        debugger

    chrome.runtime.onInstalled.addListener ->
      chrome.contextMenus.create
        title: 'Quote with Quoter'
        id: 'quoter-quote'
        contexts: [ 'page', 'selection' ]

module.exports = Background
