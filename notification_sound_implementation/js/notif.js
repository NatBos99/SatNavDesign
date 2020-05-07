class Stats {
  constructor(speed, time, destination, time_left) {
    this.speed = speed;
    this.time = time;
    this.destination = destination;
    this.time_left = time_left;
  }
}

class Sound {
  constructor(notifurl, texturl) {
    this.notif = notifurl;
    this.text = texturl;
  }
}

class Scene {
  constructor(bimg, stats, instruction, sound) {
    this.bimg = bimg;
    this.stats = stats;
    this.instruction = instruction;
    this.sound = sound;
  }
}

let currentScene = 0;
let colorBlindMode = false;
const sound1 = new Sound('notifs/n1', 'spoken/n1');
const sound2 = new Sound('notifs/n2', 'spoken/n2');

const stats1 = new Stats("80 km/h", "14:30", "Groningen", "20 minutes")
const stats2 = new Stats("35 km/h", "09:20", "Assen", "5 minutes")
let scenes = [];
const scene1 = new Scene('bimgs/bg0', stats1, "Turn left", sound1);
const scene2 = new Scene('bimgs/bg1', stats2, "Turn right", sound2);
scenes.push(scene1);
scenes.push(scene2);

$(document).ready(function () {
  loadScene(currentScene);
  $('#cbswitch').change(function () {
    colorBlindMode = this.checked;
    updateSettings();
   });
});

function changeSceneRight() {
  loadScene(currentScene+1);
}

function changeSceneLeft() {
  loadScene(currentScene-1);
}

function loadScene(index) {
  if (index < 0) {
    index = scenes.length-1;
  } else if (index >= scenes.length) {
    index = 0;
  }
  let scene = scenes[index];
  $(".instructions").children("span")[0].innerHTML = scene.instruction;
  if (colorBlindMode) {
    $(".satnav").css("background-image", "url('" + scene.bimg + "cb.png')")
  } else {
    $(".satnav").css("background-image", "url('" + scene.bimg + ".png')")
  }
  $(".satnav").css("background-position", "0% 30%")
  $(".satnav").css("background-repeat", "no-repeat")
  $(".satnav").css("background-size", "100% 75%")
  currentScene = index;
}

function updateSettings() {
  loadScene(currentScene);
}

function playSound() {
  new Audio(scenes[currentScene].sound.notif + '.mp3').play();
  new Audio(scenes[currentScene].sound.text + '.mp3').play();
}
