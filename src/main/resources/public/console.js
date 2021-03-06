// The link below explains WebSocket Client Applications.
// https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications


//Establish the WebSocket connection and set up event handlers
var webSocketConsole = new WebSocket("ws://" + location.hostname + ":" + location.port + "/console");

// Add a listener. Runs when a message is received from the server
webSocketConsole.onmessage = function (msg) { updateConsole(msg, consoleCodeMirror); };

var consoleCodeMirror = CodeMirror(document.anchors.namedItem("console"), {
    value: "Output...",
    mode:  "text",
    lineNumbers: false,
    theme: "erlang-dark",
    readOnly: true
});

var updateCount = 0;
var oldConsole = "";


function updateConsole(msg, consoleCodeMirror) {
    updateCount += 1;
    var data = msg;
    if(oldConsole != msg.data && updateCount%1 == 0){
        consoleCodeMirror.setValue(msg.data);
    }
    else{
        console.log("Console is up to date")
    }
}
