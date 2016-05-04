var btnBox = document.getElementById('content'),
    btn = document.getElementsByClassName('button');

var AudioContext = AudioContext || webkitAudioContext; // for ios/safari
var context = new AudioContext();
// var showChatbox = false;
const toggleChatbox = function(){
  $('textarea').toggle();
  $('#sendBtn').toggle();
}

const pianoShow = function(){
    $('#pianoImg').toggle();
}

const keyDrum = function(){
  // $('#piano').hide();
  $('#pianoImg').toggle();
  $('#content').toggle();
}



var sampleMap = {
    key60: 1,
    key61: 2,
    key62: 3,
    key63: 4,
    key64: 5
};

// for (var i = 0; i < btn.length; i++) {
//     addAudioProperties(btn[i], i);
// }
// add event listeners
document.addEventListener('keydown', keyController);
document.addEventListener('keyup', keyController);

function keyController(e) {
    if (e.type == "keydown") {
        switch (e.keyCode) {
            case 81:
                btn[0].classList.add('active');
                // btn[0].play();
                break;
            case 87:
                btn[1].classList.add('active');
                // btn[1].play();
                break;
            case 69:
                btn[2].classList.add('active');
                // btn[2].play();
                break;
            case 82:
                btn[3].classList.add('active');
                // btn[3].play();
                break;
            case 84:
                btn[4].classList.add('active');
                // btn[4].play();
                break;
            default:
                //console.log(e);
        }
    } else if (e.type == "keyup") {
        switch (e.keyCode) {
            case 81:
                btn[0].classList.remove('active');
                break;
            case 87:
                btn[1].classList.remove('active');
                break;
            case 69:
                btn[2].classList.remove('active');
                break;
            case 82:
                btn[3].classList.remove('active');
                break;
            case 84:
                btn[4].classList.remove('active');
                break;
            default:
                //console.log(e.keyCode);
        }
    }
}


function addAudioProperties(object, id){
    //object is the button
    object.index = id;
    object.name = object.id;
    object.source = object.dataset.sound;
    // loadAudioBtn(object, object.source);
    // object.play = function(){
    //     // peer2.send(object.index, 'drum');
    //   // console.log('play show object.buffer', object.buffer)
    //     var s = context.createBufferSource();
    //     s.buffer = object.buffer;
    //     s.connect(context.destination);
    //     s.start();
    //     object.source = s;
    // }
}

// function loadAudioBtn(object, url){
//      var request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.responseType = 'arraybuffer';
//     request.onload = function () {
//         context.decodeAudioData(request.response, function (buffer) {
//           console.log(buffer)
//             object.buffer = buffer
//         });
//     }
// }

var pianoNoteSamplesSrc = {};
for(var j=48; j<85; j++){
	var k = j - 20;
	pianoNoteSamplesSrc['note'+j] = "/assets/ff-0" + k + ".wav";
}

// buffer60
var pianoNoteSamplesBuffer = {};


var peer1,peer2;

function gotPeer() {
  $('#blueNote2').append('Connected to a Friend');
  PartnerIdTxt.value = peer2.peer;
}

function setPeer2Data()
{
  peer2.on('data', function(data)
  {
    // var args = Array.prototype.slice.call(arguments);
    // var data = args[0];
    InBox.value = InBox.value + 'PARTNER:  ' + data + '\r';  // input data is the note for piano
    var source = context.createBufferSource();
    // if(args.length>1){
    //   if(args[1]==='piano'){
    //     console.log('peer2.on',args[1])
    source.buffer = pianoNoteSamplesBuffer['buffer' + data];
    //   } else {
    //     source.buffer = btn[data].buffer;
    //   }
    // } 
    source.connect(context.destination);
    source.start();    
  })
}

var lastMsg;

function MyIdBtn_onclick() {
    $('#myImg').show();
    peer1 = new Peer(MyIdTxt.value,{
    key: 'jdwgvfk0xelmobt9',
    debug: 3,
    logFunction: function() {
      var newMsg = Array.prototype.slice.call(arguments).join(' ');
      if (newMsg != lastMsg)
      {
        $('.log').append(newMsg + '<br>');
        if ((newMsg.indexOf('disconnected') + newMsg.indexOf('WARNING') + newMsg.indexOf('ERROR')) > -3)
          alert(newMsg);
        lastMsg = newMsg;
      }
    },
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' }
    ]} /* Sample servers, please use appropriate ones */
  });

  peer1.on('open', function(id){
   $('#blueNote1').append('Your connection is openned');
  });

  peer1.on('connection', function(connect) {
    peer2 = connect;
    peer2.on('open', function() {
      gotPeer();
    });
    setPeer2Data();
    $('#friendImg').show();
    // $('#pianoImg').show();
  });
  $('#browsers').text(navigator.userAgent);    // Show browser version

  window.onunload = window.onbeforeunload = function(e) {
    if (!!peer1 && !peer1.destroyed) {
      peer1.destroy(); }
    if (!!peer2 && !peer2.destroyed) {
      peer2.destroy(); }
  };
}

function PartnerIdBtn_onclick() {
  try
  {
    peer2 = peer1.connect(PartnerIdTxt.value, {
      label: 'chat',
      serialization: 'none',
      reliable: false,
      metadata: {message: 'hi i want to chat with you!'}
    });
    peer2.on('open', function() {
      gotPeer(); });
    peer2.on('error', function(err) {
      alert(err); });
    peer2.on('connection', function(peer2) {
      alert('did connection'); 
    });
    setPeer2Data();
    $('#friendImg').show();
  }
  catch(e)
  {
    $('.log').append(e + '<br>');
    alert('"MY ID" must be opened first.');
  }
}

function sendBtn_onclick (){
    peer2.send(OutBox.value);
    InBox.value = InBox.value + 'ME:  ' + OutBox.value + '\r';
    OutBox.value = '';

}

