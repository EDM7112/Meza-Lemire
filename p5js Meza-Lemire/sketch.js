//Var sont des attributs
var rectangles = [];
var theChoosenOne = 0;
var couleur;
var ligne = 10;
var sounds = [];
var soundIndex = 0;
var img = [] ;
var isFull = false;
var LargImageX = 30; //La largeur de la note
var HauteImageY = 30; //Hauteur de la note

function preload() { //bibliothèque des sons et images à charger avant de partir le programme
  sounds[0] = loadSound('assets/BASS.mp3');
  sounds[1] = loadSound('assets/CLOCHE.mp3');
  sounds[2] = loadSound('assets/FLÛTE.mp3');
  sounds[3] = loadSound('assets/HAUTBOIS.mp3');
  sounds[4] = loadSound('assets/NYLON.mp3');
  sounds[5] = loadSound('assets/ORGUE.mp3');
  sounds[6] = loadSound('assets/SYNTH-1.mp3');
  sounds[7] = loadSound('assets/SYNTH-2.mp3');
  sounds[8] = loadSound('assets/VIOLON.mp3');
  sounds[9] = loadSound('assets/DR.mp3');

 
  img = loadImage("assets/note.png");
}

function setup() {

  createCanvas(600, 700); //Surface de travail
  colorMode(HSB);
  couleur = random(60); //Choix de couleur aléatoire, au début

  for (var i = 0; i < ligne; i++) { //Le nombre de rectagles dessinés
    var r = new Rectangle();
    r.x = 0;
    r.y = i * height / ligne; //hauteur du canevas divisé par ligne

    r.speed = random(0.01, 0.03); //Vitesse d'apparition des rectangles
    r.h = height / ligne;

    couleur = couleur + 45; //Dégradé à chaque valeur de 45 dans le mode HSB
    if (couleur > 360) couleur = 0;
    r.color = color(couleur, 100, 100); //Couleur change uniquement dans sa valeur Hue, Saturation et brillance sont dans une valeur maximale
    rectangles.push(r); //L'action d'entrée du rectangle

  }
  
}

function draw() {
  background(255); //Couleur de fond
  noStroke(); //Les lignes n'ont pas de contour
  push(); //Début du nouveau dessin des lignes
  translate(mouseX, mouseY); //l'indicateur de la souris
  ellipse(0, 0, 10, 10); //La forme de l'indicateur
  pop(); // Lié à l'indicateur, il dessine une nouvelle forme autonome
  for (var i = 0; i < rectangles.length; i++) {

    if (i <= theChoosenOne) { //Les rectagles qui arrêtent

      if (rectangles[0].w + ligne > width) { //Le même rectange redémarre après avoir complèté sa trajectoire
        rectangles[0].w = 0;
      }
      rectangles[i].draw();
    }
  }
  if (isFull) { //Quand cette variable est appelée, l'image apparaît
    for (var i = 0; i < ligne; i++) { //Positionnement de la première image
      
      image(img, 20, (i * 70) + 15, LargImageX, HauteImageY); // emplacement des images de notes
  }
}
}
var Rectangle = function() { //fonction qui détermine les rectangles

  this.color = color(0, 0, 0); //Les this suivant, sont des attributs donnés aux variables du rectangle
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;
  this.targetW = width; //la longueur visée de la ligne ; longueur du canevas
  this.speed = 1;
  this.stopDraw = 0;

  this.draw = function() {

    if (this.stopDraw == 0) { //Si la valeur de stop est à zero, l'attribut suivant s'applique
      this.w = (this.targetW - this.w) * this.speed + this.w;
    }

    fill(this.color); //Défini la couleur du rectagle
    rect(this.x, this.y, this.w, this.h); //Défini les autres attributs
  }


}

function mousePressed() {
  stopFirstRec = 1; //Si la souris est enfoncé, le rectangle arrête

  rectangles[theChoosenOne].stopDraw = 1; //Le rectangle arrête

  if (theChoosenOne < ligne - 1) {
    theChoosenOne++;
  } else {
    isFull = true; //Quand toutes les lignes sont dessinées, on passe à la fonction suivante.
  }
}

function mouseClicked() { // Quand on clique sur la barre colorée

  // joue le son associé
  if (isFull) {

    var ligneIndex = Math.floor(mouseY / 70); //Floor transforme le chiffre décimal en nombre entier - Math est une class (un objet)

    if (mouseX < rectangles[ligneIndex].w) {
     
      sounds[ligneIndex % sounds.length].play(); //Modulo servant à calculer l'emplacement des sons
      
    }
  }

}


function keyPressed() { //Tu appuies sur n'importe quel touche du clavier, les sons s'arrêtent
  for (var i = 0; i < sounds.length; i++) {
    sounds[i].stop();
  }

}