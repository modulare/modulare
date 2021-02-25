//ok
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
        let vX = random(-1, 1);
        let vY = random(-1, 1);
        let rot = 0.8;
        this.sni.push(new snip(i.toString(), orX, orY, new body(kind), createVector(vX, vY),rot));
    }
}

function draw() {
    //TODO: DEFINIRE IL RANGE DI OGNI BODY
    //TODO: CONTROLLARE SE ATTRAVERSA IL BORDO NON AGGIUNGERE VELOCITA' E ROTAZIONE
    //TODO: inherit di body
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
    //BOOKMARK: QUI SI FISSA IL TIPO DI BODY
    this.sni[0].bod.type = 1; //                                    SOLO PER TEST
    //print("------");
    for (const s of this.sni) {
        s.move();
        s.bod.display(s.x, s.y,s.rot);
        s.borders();
        //print(s.x,s.y);
    }

    noFill();
    stroke(0);
    rect(marg, marg, width - 2 * marg, height - 2 * marg);
}

class snip {

    constructor(name, x, y, bod, vel,vel_rot) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.rot = vel_rot;
        this.vel_rot=vel_rot;
        this.bod = bod;
        this.range_ = bod.range_;
        print(this.range_);
        this.vel = vel;
        //FIXME: valore iniziale potrebbe anche essere anche true 
        this.onBorders = false;
    }

    move() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.rot += this.vel_rot;
    }

    borders() {
        let k = 0;
        this.onBorders = true;
        if (this.y - this.range_ / 2 < marg) {
            if (this.y < marg - this.range_ / 2) {
                this.y = height - marg - this.range_ / 2;
            }
            k = 1;
            this.bod.display(this.x, this.y + (height - 2 * marg),this.rot);
            this.displayRange(this.x, this.y + (height - 2 * marg));
        }
        if (this.y + this.range_ / 2 > height - marg) {
            if (this.y > height - marg + this.range_ / 2) {
                this.y = marg + this.range_ / 2;
            }
            k += 3;
            this.bod.display(this.x, this.y - (height - 2 * marg),this.rot);
            this.displayRange(this.x, this.y - (height - 2 * marg));
        }
        if (this.x - this.range_ / 2 < marg) {
            if (this.x < marg - this.range_ / 2) {
                this.x = width - marg - this.range_ / 2;
            }
            k += 50;
            this.bod.display(this.x + (width - 2 * marg), this.y,this.rot);
            this.displayRange(this.x + (width - 2 * marg), this.y);
        }
        if (this.x + this.range_ / 2 > width - marg) {
            if (this.x > width - marg + this.range_ / 2) {
                this.x = marg + this.range_ / 2;
            }
            k += 70;
            this.bod.display(this.x - (width - 2 * marg), this.y,this.rot);
            this.displayRange(this.x - (width - 2 * marg), this.y);
        }
        //BOOKMARK: SWITCH K BORDERS 71 73 51 ....
        switch (k) {
            case 71:
                this.bod.display(this.x - (width - 2 * marg), this.y + (height - 2 * marg),this.rot);
                    this.displayRange(this.x - (width - 2 * marg), this.y + (height - 2 * marg));
                break;
            case 73:
                this.bod.display(this.x - (width - 2 * marg), this.y - (height - 2 * marg),this.rot);
                this.displayRange(this.x - (width - 2 * marg), this.y - (height - 2 * marg));
                break;
            case 51:
                this.bod.display(this.x + (width - 2 * marg), this.y + (height - 2 * marg),this.rot);
                this.displayRange(this.x + (width - 2 * marg), this.y + (height - 2 * marg));
                break;
            case 53:
                this.bod.display(this.x + (width - 2 * marg), this.y - (height - 2 * marg),this.rot);
                this.displayRange(this.x + (width - 2 * marg), this.y - (height - 2 * marg));
                break;
            default:
                this.onBorders = false;
        }
    }

    displayRange(x, y) {
        ellipse(x, y, 8);
        rect(x - this.bod.range_ / 2, y - this.bod.range_ / 2, this.range_);
        stroke(1);
    }
}

class body {
    constructor(type) {
        this.type = type;
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        this.set_range_(type);
        this.rot = 0.8;
    }
    /*getType(type) {
        this.type = type;
    }*/

    set_range_(type) {
        //BOOKMARK: SWITCH set_range_(type) ma non funziona è ininfluente
        switch (this.type) {
            case 0:
                this.range_ = 0;
            case 1:
                this.range_ = 92;
            case 2:
                this.range_ = 200;
            default:
            //
        }
    }
    
    display(x, y,rot) {
        //print(this.type);
        //BOOKMARK: SWITCH DISPLAY PER TIPO
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
                push();
                translate(x, y);
                rotate(radians(rot));
                beginShape();
                vertex(-32, 28);
                vertex(-17, -17);
                vertex(28, -32);
                vertex(-17, -47);
                vertex(-32, -92);
                vertex(-47, -47);
                vertex(-92, -32);
                vertex(-47, -17);
                endShape(CLOSE);
                ellipse(0, 0, 10)
                pop();
                //}
                break;
            case 2:
                stroke(1);
                push();
                translate(x, y);
                beginShape();
                vertex(-12, -2);
                vertex(13, -7);
                vertex(33, 23);
                vertex(3, 38);
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