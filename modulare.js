//ok
let marg = 100;
let num_snip = 25;
let view_range_body_on_edges = true;

function setup() {
    createCanvas(800, 800);
    let orX = width / 2;
    let orY = height / 2;
    this.sni = [];

    for (let i = 0; i < num_snip; i++) {
        let kind = 1;
        let vX = random(-1, 1);
        let vY = random(-1, 1);
        let rot = random(-0.8, 0.8);
        this.sni.push(new snip(i.toString(), orX, orY, new body(kind), createVector(vX, vY), rot));
    }
}

function draw() {
    background(255, 255, 255, 25);

    sequence();

    noFill();
    stroke(0);
    rect(marg, marg, width - 2 * marg, height - 2 * marg);
}

function sequence() {

    if (frameCount == 1) {
        start_ = 0;
        end_ = 1;
        let kind = 1;
        this.sni[0].bod.kind = kind;
        this.sni[0].bod.set_range_(kind);
        this.sni[0].range_ = this.sni[0].bod.range_;
    }
    if (frameCount == 400) {
        start_ = 0;
        end_ = num_snip;
        for (let i = start_; i < end_; i++) {
            let kind = 1;
            this.sni[i].bod.kind = kind;
            this.sni[i].bod.set_range_(kind);
            this.sni[i].range_ = this.sni[i].bod.range_;
        }
    }

    if (frameCount == 800) {
        marg = 10;
        start_ = 0;
        end_ = num_snip;
        for (let i = start_; i < end_; i++) {
            let kind = ceil(random(-1, 2));
            this.sni[i].bod.kind = kind;
            this.sni[i].bod.set_range_(kind);
            this.sni[i].range_ = this.sni[i].bod.range_;
        }
    }

    if (frameCount == 1200) {
        marg = 0;
        start_ = 0;
        end_ = num_snip;
        for (let i = start_; i < end_; i++) {
            this.sni[i].bod.kind = 2;
            this.sni[i].bod.set_range_(2);
            this.sni[i].range_ = this.sni[i].bod.range_;
        }
    }

    draw_snip(start_,end_);

}

function draw_snip(start_,end_) {
    //draw the snips (on the edge too)
    for (let i = start_; i < end_; i++) {
        sni[i].move();
        sni[i].bod.display(sni[i].x, sni[i].y, sni[i].rot);
        sni[i].edges();
    }
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
        //to determine if this.onEdges is true or false 
        //at the beginning
        this.edges();
    }

    move() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.rot += this.vel_rot;
    }

    edges() {
        let k = 0;
        this.onEdges = true;
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
                this.bod.display(this.x + (width - 2 * marg), this.y - (height - 2 * marg), this.rot)
                this.displayRange(this.x + (width - 2 * marg), this.y - (height - 2 * marg));
                break;
            default:
                this.onEdges = false;
        }
    }

    displayRange(x, y) {
        if (view_range_body_on_edges == true) {
            line(x - 6, y, x + 6, y);
            line(x, y - 6, x, y + 6);
            rect(x - this.bod.range_ / 2, y - this.bod.range_ / 2, this.range_);
            stroke(0);
        }
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
        //consider the size (encumbrance) of the body in a complete rotation
        switch (kind) {
            case 0:
                this.range_ = 100;
                break;
            case 1:
                this.range_ = 200;
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
                stroke(0);
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
