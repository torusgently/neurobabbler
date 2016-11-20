var client;
var request;

var useMic = function useMic() {
  return true;
}

var getMode = function getMode() {
  return Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
}

var getKey = function getKey() {
  return "c83cf5413f36435eb04e14b173bcb701";
}

function getLanguage() {
  return "en-gb";
}

function clearText() {
  document.getElementById("output").value = "";
}

function setText(text) {
  document.getElementById("output").value += text;
}

function getLuisConfig() {
  var appid = "4e6006ae-630d-4afa-9dac-4abe7370d81c";
  var subid = "f0932dec2b3446b6bfc9ac05a89fec7b";

  if (appid.length > 0 && subid.length > 0) {
    return { appid: appid, subid: subid };
  }

  return null;
}

function start() {
  var mode = getMode();
  var luisCfg = getLuisConfig();

  if (luisCfg) {
    client = Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClientWithIntent(
      getLanguage(),
      getKey(),
      luisCfg.appid,
      luisCfg.subid);
  } else {
    client = Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(
      mode,
      getLanguage(),
      getKey());
  }
  client.startMicAndRecognition();
  console.log("Start mic recognition");
  setTimeout(function () {
    console.log("End speech recognition");
    client.endMicAndRecognition();
  }, 5000);

  console.log("After");
  client.onPartialResponseReceived = function (response) {
    console.log(response);
    app.speechRecognized(response)
  }

  client.onFinalResponseReceived = function (response) {
    console.log(response.intents);
    app.speechRecognized(response)

  }

  client.onIntentReceived = function (response) {
    console.log(response);
    app.speechRecognized(response)

  };
}

window.start = start;
