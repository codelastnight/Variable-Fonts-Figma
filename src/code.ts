// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// the key used in storing data in clientstorage
const clientId = "Variable-Fonts-Figma"


// This shows the HTML page in "ui.html".
figma.showUI(__html__,{width: 420, height: 270});


// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.on("message",async (msg: pluginMessage) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  switch(msg.type) {
    case 'create-rectangles':
      const nodes: SceneNode[] = [];
      
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
      break;
    
    // save font data sent from ui in to clientstorage
    case 'font-loaded': {
     let clientBuffer: VariableClientStorage = await figma.clientStorage.getAsync(clientId)
      if (clientBuffer  == undefined) clientBuffer = { data: []}
      //console.log(msg.fontData)
      
      clientBuffer.data.push(msg.fontData) 
      
      await figma.clientStorage.setAsync(clientId, clientBuffer) 
      figma.ui.postMessage({type: "font-list", fontListData: clientBuffer} as pluginMessage)
      break;

    }

    // get font data from clientstorage 
    case 'app-init': {
      let clientBuffer: VariableClientStorage = await figma.clientStorage.getAsync(clientId)
      if (clientBuffer != undefined) figma.ui.postMessage({type: "font-list", fontListData: clientBuffer} as pluginMessage)
      break;
    }  
    
    // remove font from data
    case 'font-remove': {
      let clientBuffer: VariableClientStorage = await figma.clientStorage.getAsync(clientId)
      if (clientBuffer != undefined) clientBuffer.data = clientBuffer.data.filter(i => i.Id != msg.removeID)
      await figma.clientStorage.setAsync(clientId, clientBuffer) 
      figma.ui.postMessage({type: "font-list", fontListData: clientBuffer} as pluginMessage)
      break;
    }  
    default:

  }




  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  //figma.closePlugin();
});

// do shit on selection change
figma.on("selectionchange", () => {

  const selection = figma.currentPage.selection

  switch(selection.length) {
    // one thing selected
    case 1: {
      break;
    }

    // nothing
    case 0: {
      break;
    }

    // many
    default: {

    }

  } 
})
