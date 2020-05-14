class Stats {
  constructor(time, destination, eta) {
    this.time = time;
    this.destination = destination;
    this.eta = eta;
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
let currentVolume = 50;
let currentPitch = "medium";
let speakerGender = "male";
const sound1 = new Sound('notifs/n1', 'spoken/n1');
const sound2 = new Sound('notifs/n1', 'spoken/n2');
const sound3 = new Sound('notifs/n3', 'spoken/n3');
const sound4 = new Sound('notifs/n4', 'spoken/n4');
const sound5 = new Sound('notifs/n5', 'spoken/n5');

const stats1 = new Stats("13:50", "Wall Street", "13:56")
const stats2 = new Stats("13:50", "Wall Avenue", "14:30")
const stats3 = new Stats("09:00", "Short Street", "09:30")
const stats4 = new Stats("13:50", "Long Drive", "14:30")
const stats5 = new Stats("15:20", "Central Park", "19:30")
let scenes = [];
const scene1 = new Scene('bimgs/bg0', stats1, "Take the first left", sound1);
const scene2 = new Scene('bimgs/bg1', stats2, "Take the first right", sound2);
const scene3 = new Scene('bimgs/bg2', stats3, "Take the third exit at the roundabout", sound3);
const scene4 = new Scene('bimgs/bg3', stats4, "Take the first exit in 200 meters", sound4);
const scene5 = new Scene('bimgs/bg4', stats5, "Missed exit. Recalculating.", sound5);
scenes.push(scene1);
scenes.push(scene2);
scenes.push(scene3);
scenes.push(scene4);
scenes.push(scene5);

$(document).ready(function () {
  loadScene(currentScene);
  $('#cbswitch').change(function () {
    colorBlindMode = this.checked;
    updateSettings();
  });
  changeFontSize("medium");
  $('input[name=fontsizeoptions]').click(function () {
    changeFontSize(this.value);
  });
  $('input[name=pitchshift]').click(function () {
    currentPitch = this.value;
  });
  $('input[name=speakergender]').click(function () {
    speakerGender = this.value;
  });
  const volumeSlider = $('#volumeslider');
  const pitchSlider = $('#pitchslider');
  volumeSlider.on('input change', () => {
    currentVolume = volumeSlider.val();
  });
  pitchSlider.on('input change', () => {
    currentPitch = pitchSlider.val();
  });
});

function changeSceneRight() {
  loadScene(currentScene+1);
}

function changeSceneLeft() {
  loadScene(currentScene-1);
}

function changeFontSize(fontSize) {
  if (fontSize == "small") {
    $('.instructions').css('font-size', '160%');
    $('.instructions').css('margin-top', '3%');
    $('.drive_statistics').css('font-size', '160%');
    $('.drive_statistics').css('margin-top', '1%');
  } else if (fontSize == "medium") {
    $('.instructions').css('font-size', '200%');
    $('.instructions').css('margin-top', '2%');
    $('.drive_statistics').css('font-size', '200%');
    $('.drive_statistics').css('margin-top', '0%');
  } else if (fontSize == "large") {
    $('.instructions').css('font-size', '240%');
    $('.instructions').css('margin-top', '1%');
    $('.drive_statistics').css('font-size', '240%');
    $('.drive_statistics').css('margin-top', '-1%');
  } else {
    console.log("Invalid font size: " + fontSize);
  }
}

function loadScene(index) {
  if (index < 0) {
    index = scenes.length-1;
  } else if (index >= scenes.length) {
    index = 0;
  }
  let scene = scenes[index];
  $(".instructions").children("span")[0].innerHTML = scene.instruction;
  $(".destination").children("span")[1].innerHTML = scene.stats.destination;
  $(".time").children("span")[1].innerHTML = scene.stats.time;
  $(".eta").children("span")[1].innerHTML = scene.stats.eta;
  if (colorBlindMode) {
    $(".satnav").css("background-image", "url('" + scene.bimg + "cb.png')")
  } else {
    $(".satnav").css("background-image", "url('" + scene.bimg + ".png')")
  }
  $(".satnav").css("background-position", "0% 30%")
  $(".satnav").css("background-repeat", "no-repeat")
  $(".satnav").css("background-size", "100% 80%")
  currentScene = index;
}

function updateSettings() {
  loadScene(currentScene);
}

function playSound() {
  let a1 = new Audio(scenes[currentScene].sound.notif + currentPitch + '.mp3');
  a1.volume = currentVolume / 100;
  a1.play();
  let a2 = new Audio(scenes[currentScene].sound.text + speakerGender + currentPitch + '.mp3');
  a2.volume = currentVolume / 100;
  a2.play();
}
