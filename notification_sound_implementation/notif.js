class Stats {
  constructor(speed, time, destination, time_left) {
    this.speed = speed;
    this.time = time;
    this.destination = destination;
    this.time_left = time_left;
  }
}

class Scene {
  constructor(bimg, stats, instruction) {
    this.bimg = bimg;
    this.stats = stats;
    this.instruction = instruction;
  }
}

let currentScene = 0;

const stats1 = new Stats("80 km/h", "14:30", "Groningen", "20 minutes")
const stats2 = new Stats("35 km/h", "09:20", "Assen", "5 minutes")
let scenes = [];
const scene1 = new Scene('bimgs/bg0.png', stats1, "Take the first exit");
const scene2 = new Scene('bimgs/bg1.png', stats2, "Take the second exit");
scenes.push(scene1);
scenes.push(scene2);

$(document).ready(function () {
  loadScene(currentScene);
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
  currentScene = index;
}
