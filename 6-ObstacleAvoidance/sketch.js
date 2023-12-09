let pursuer1, pursuer2;
let target;
let obstacles = [];
let vehicules = [];
let vehicles = []
let leader;
let pursuers = [];
let circleRadius = 100;
let separationSlider, evasionSlider;
let numVehicles = 10; // Change this to the number of vehicles you want
let imgVaisseau;

function preload() {
  imgVaisseau = loadImage('assets/images/vaisseau.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pursuer1 = new Vehicle(100, 100, imgVaisseau);
  pursuer2 = new Vehicle(random(width), random(height), imgVaisseau);
  vehicules.push(pursuer1);
  vehicules.push(pursuer2);

  obstacles.push(new Obstacle(width / 2, height / 2, 100));
  
}


function draw() {
  background(0, 0, 0, 100);

  // Mettez à jour la position de la cible pour suivre la souris
  let target = createVector(mouseX, mouseY);

  // Mettez à jour et montrez chaque véhicule
  for (let i = 0; i < vehicules.length; i++) {
    // Si ce n'est pas le premier véhicule, faites-le suivre le précédent
    if (i > 0) {
      let leader = vehicules[i - 1];
      vehicules[i].follow(leader);
    }

    // Appliquez les comportements, mettez à jour et montrez le véhicule
    vehicules[i].applyBehaviors(target, obstacles, vehicules);
    vehicules[i].update();
    vehicules[i].show();
  }

  // Dessinez les obstacles
  obstacles.forEach(o => {
    o.show();
  })

  // Dessinez la cible (point rouge qui représente la souris)
  fill(255, 0, 0);
  noStroke();
  circle(target.x, target.y, 32);
}



function mousePressed() {
  obstacles.push(new Obstacle(mouseX, mouseY, random(30, 100)));
}

function keyPressed() {
  if (key == "v") {
    vehicules.push(new Vehicle(random(width), random(height), imgVaisseau));
  }
  if (key == "d") {
    Vehicle.debug = !Vehicle.debug;
  }
  if (key == "f") {
    for (let i = 0; i < 10; i++) {
      let v = new Vehicle(random(10, 20), random(height / 2 - 10, height / 2 + 10), imgVaisseau)
      v.maxSpeed = 10;
      v.color = "purple";
      vehicules.push(v);
    }
  }
}
