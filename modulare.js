let marg = 50;
let ini_rnd = 0;
let end_rnd = 1;
let orX;
let orY;

function setup() {
  createCanvas(600, 600);
  let orX = width / 2;
  let orY = height / 2;
  this.sni = [];
  
  for (let i = 0; i < 1; i++) {
	  let kind = ceil(random(0, 2))
	  let vX =random(-1, 1);
	  let vY =random(-1, 1);
      this.sni.push(new snip(i.toString(), orX, orY, new body(kind),  
	  random(40, 100), createVector(vX, vY)));
  }
}

function draw() {
  background(255, 255, 255, 25);
  /*
  if (frameCount == 800) {
    for (let i = 0; i < 8; i++) {
      this.sni[i].bod.type = 1;
    }
  }

  if (frameCount == 1300) {
    for (let i = 8; i < 16; i++) {
      this.sni[i].bod.type = 0;
    }
  }
  
   if (frameCount == 2000) {
    for (let i = 0; i < 25; i++) {
      this.sni[i].bod.type = 2;
    }
  }
*/
  this.sni[0].bod.type = 1; //                                    SOLO PER TEST
  //print("------");
  for (const s of this.sni) {
    s.move();
    s.display(s.x, s.y);
    //print(s.x,s.y);
  }

  noFill();
  stroke(0);
  rect(marg, marg, width - 2 * marg, height - 2 * marg);
}

class snip {

  constructor(name, x, y, bod, range_, vel) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.bod = bod;
    this.range_ = range_;
    this.vel = vel;
    this.onBorders = false;
  }

  move() {
    //this.vel.rotate(random(-0.8, 0.8));
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.borders();
  }

  borders() {
    let k = 0;
    this.onBorders = true;
    if (this.y - this.range_ / 2 < marg) {
      if (this.y < marg - this.range_ / 2) {
        this.y = height - marg - this.range_ / 2;
      }
      k = 1;
      this.display(this.x, this.y + (height - 2 * marg));
    }
    if (this.y + this.range_ / 2 > height - marg) {
      if (this.y > height - marg + this.range_ / 2) {
        this.y = marg + this.range_ / 2;
      }
      k += 3;
      this.display(this.x, this.y - (height - 2 * marg));
    }
    if (this.x - this.range_ / 2 < marg) {
      if (this.x < marg - this.range_ / 2) {
        this.x = width - marg - this.range_ / 2;
      }
      k += 50;
      this.display(this.x + (width - 2 * marg), this.y);
    }
    if (this.x + this.range_ / 2 > width - marg) {
      if (this.x > width - marg + this.range_ / 2) {
        this.x = marg + this.range_ / 2;
      }
      k += 70;
      //this.display(this.x - (width - 2 * marg), this.y);
      this.display(this.x - (width - 2 * marg), this.y);
    }

    switch (k) {
      case 71:
        this.display(this.x - (width - 2 * marg),
          this.y + (height - 2 * marg));
        break;
      case 73:
        this.display(this.x - (width - 2 * marg), this.y - (height - 2 * marg));
        break;
      case 51:
        this.display(this.x + (width - 2 * marg), this.y + (height - 2 * marg));
        break;
      case 53:
        this.display(this.x + (width - 2 * marg), this.y - (height - 2 * marg));
        break;
      default:
        this.onBorders = false;
    }
  }

  display(x, y) {
    this.bod.display(x, y,this.onBorders);
    stroke(1);
  }
}

class body {
  constructor(type) {
    this.type = type;
    this.rot = 0;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }
  getType(type) {
    this.type = type;
  }
  display(x, y,onBorders) {
    //print(this.type);
    switch (this.type) {
      case 0:
        noStroke();
        push();
        translate(x, y);
        //area di visuale dello snip
        fill(this.r, this.g, this.b, 100);
        ellipse(0, 0, 100); // this.range_ !!!!!!!!!!
        //nucleo snip
        fill(this.b, this.r, this.g, 100);
        ellipse(0, 0, 16);
        pop();
        break;
      case 1:
        stroke(this.r, this.g, this.b);
        this.rot += 0.8;
        push();
        //print(onBorders);
        if (onBorders == false) {
          //print("------2");
          translate(x, y);
          rotate(radians(this.rot));
        }
        beginShape();
        vertex(0 - 32, 60 - 32);
        vertex(15 - 32, 15 - 32);
        vertex(60 - 32, 0 - 32);
        vertex(15 - 32, -15 - 32);
        vertex(0 - 32, -60 - 32);
        vertex(-15 - 32, -15 - 32);
        vertex(-60 - 32, 0 - 32);
        vertex(-15 - 32, 15 - 32);
        endShape(CLOSE);
        ellipse(0, 0, 10)
        pop();
        break;
      case 2:
        stroke(1);
        this.rot += 0.8;
        push();
        translate(x, y);
        rotate(radians(this.rot));
        beginShape();
        vertex(20 - 32, 30 - 32);
        vertex(45 - 32, 25 - 32);
        vertex(65 - 32, 55 - 32);
        vertex(35 - 32, 70 - 32);
        endShape(CLOSE);
        rect(-50, -50, 100, 100)
        pop();
        break;
      default:
        print("bad");
        //console.log(`bad`);
    }
  }
}
