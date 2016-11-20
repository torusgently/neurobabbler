

var client;
var request;

useMic = function useMic() {
  return true;
}

getMode = function getMode() {
  return Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
}

getKey = function getKey() {
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
  var appid = "bb666b81-56bf-4fd2-a020-eaf4ba757971";
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
    console.log("Getting response...");
    window.network.outsideAddLayer(JSON.stringify(response))
  }

  client.onFinalResponseReceived = function (response) {
    console.log("Getting response...");
    window.network.outsideAddLayer(JSON.stringify(response))

  }

  client.onIntentReceived = function (response) {
    console.log("Getting response...");
    window.network.outsideAddLayer(JSON.stringify(response))

  };
}

window.start = start;

