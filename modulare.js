//ok
let marg = 100;
let ini_rnd = 0;
let end_rnd = 1;
let orX;
let orY;

function setup() {
    createCanvas(1000, 800);
    let orX = width / 2;
    let orY = height / 2;
    this.sni = [];

    for (let i = 0; i < 25; i++) {
        let kind = ceil(random(0, 2))
        let vX = random(-1, 1);
        let vY = random(-1, 1);
        let rot = random(-0.8, 0.8);
        this.sni.push(new snip(i.toString(), orX, orY, new body(kind), createVector(vX, vY), rot));
    }
}

function draw() {
    background(255, 255, 255, 25);

    if (frameCount == 800) {
        for (let i = 0; i < 8; i++) {
            this.sni[i].bod.kind = 1;
            this.sni[i].range_ = this.sni[i].bod.set_range_(1);
        }
    }

    if (frameCount == 1300) {
        //marg = 10;
        for (let i = 8; i < 16; i++) {
            this.sni[i].bod.kind = 0;
            this.sni[i].range_ = this.sni[i].bod.set_range_(0);

        }
    }

    if (frameCount == 2000) {
        for (let i = 0; i < 25; i++) {
            this.sni[i].bod.kind = 2;
            this.sni[i].range_ = this.sni[i].bod.set_range_(2);
        }
    }


    for (const s of this.sni) {
        s.move();
        s.bod.display(s.x, s.y, s.rot);
        s.borders();
    }

    noFill();
    stroke(0);
    rect(marg, marg, width - 2 * marg, height - 2 * marg);
}

class snip {

    constructor(name, x, y, bod, vel, vel_rot) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.rot = vel_rot;
        this.vel_rot = vel_rot;
        this.bod = bod;
        this.range_ = bod.range_;
        this.vel = vel;
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
            this.bod.display(this.x, this.y + (height - 2 * marg), this.rot);
            this.displayRange(this.x, this.y + (height - 2 * marg));
        }
        if (this.y + this.range_ / 2 > height - marg) {
            if (this.y > height - marg + this.range_ / 2) {
                this.y = marg + this.range_ / 2;
            }
            k += 3;
            this.bod.display(this.x, this.y - (height - 2 * marg), this.rot);
            this.displayRange(this.x, this.y - (height - 2 * marg));
        }
        if (this.x - this.range_ / 2 < marg) {
            if (this.x < marg - this.range_ / 2) {
                this.x = width - marg - this.range_ / 2;
            }
            k += 50;
            this.bod.display(this.x + (width - 2 * marg), this.y, this.rot);
            this.displayRange(this.x + (width - 2 * marg), this.y);
        }
        if (this.x + this.range_ / 2 > width - marg) {
            if (this.x > width - marg + this.range_ / 2) {
                this.x = marg + this.range_ / 2;
            }
            k += 70;
            this.bod.display(this.x - (width - 2 * marg), this.y, this.rot);
            this.displayRange(this.x - (width - 2 * marg), this.y);
        }
        switch (k) {
            case 71:
                this.bod.display(this.x - (width - 2 * marg), this.y + (height - 2 * marg), this.rot);
                this.displayRange(this.x - (width - 2 * marg), this.y + (height - 2 * marg));
                break;
            case 73:
                this.bod.display(this.x - (width - 2 * marg), this.y - (height - 2 * marg), this.rot);
                this.displayRange(this.x - (width - 2 * marg), this.y - (height - 2 * marg));
                break;
            case 51:
                this.bod.display(this.x + (width - 2 * marg), this.y + (height - 2 * marg), this.rot);
                this.displayRange(this.x + (width - 2 * marg), this.y + (height - 2 * marg));
                break;
            case 53:
                this.bod.display(this.x + (width - 2 * marg), this.y - (height - 2 * marg), this.rot);
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
    constructor(kind) {
        this.kind = kind;
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        this.set_range_(kind);
        this.rot = 0.8;
    }

    set_range_(kind) {
        switch (kind) {
            case 0:
                this.range_ = 100;
                break;
            case 1:
                this.range_ = 92;
                break;
            case 2:
                this.range_ = 141;
                break;
            default:
            //
        }
    }

    display(x, y, rot) {
        switch (this.kind) {
            case 0:
                noStroke();
                push();
                translate(x, y);
                fill(this.r, this.g, this.b, 100);
                ellipse(0, 0, 100); 
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
                pop();
                break;
            case 2:
                stroke(1);
                push();
                translate(x, y);
                rotate(radians(rot));
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
        }
    }
}