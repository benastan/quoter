Selection = require '../../selection'

class Content
  constructor: ->
    @attachMessageListeners()

  attachMessageListeners: ->
    chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
      new Selection
      if request.method is 'quoter.quote'
        sendResponse('asda')
module.exports = Content
