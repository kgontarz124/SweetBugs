const allColors = ["purple", "pink", "green", "red", "orange"];
let tab = [];
let id = 0;

function Bug(id) {
    this.id = id;
    this.x = 4;
    this.y = -1;
    this.direction = "down";
    this.color = allColors[Math.floor(Math.random() * 5)];
}

function Game(id) {
    this.width = 8;
    this.height = 7;
    this.board = document.querySelectorAll(".square");
    this.bug = new Bug(id);
    this.score = 0;

    // start game
    self = this;
    this.handler = setInterval(this.tick, 250);
    document.addEventListener("keydown", this.keyboard);
}


Game.prototype.position = function(x, y) {
    return y + x * this.height;

}
Game.prototype.occupy = function(x, y) {
    let bugField = this.position(this.bug.x, this.bug.y);
    this.board[bugField].dataset.occupied = "true";
}
Game.prototype.clean = function(a,b,c) {

        this.board[a].classList.remove(this.bug.color);
        this.board[b].classList.remove(this.bug.color);
        this.board[c].classList.remove(this.bug.color);
}

Game.prototype.render = function() {
    //tu jest cos nie tak
    let y = self.bug.y;
    let x = self.bug.x;
    let upBugField = self.position(x, y-1);
    let leftBugField = self.position(x+1, y);
    let rightBugField = self.position(x-1, y);
    self.clean(upBugField, leftBugField, rightBugField)

    // rendering bug
    let bugField = self.position(self.bug.x, self.bug.y);
    self.board[bugField].classList.add(self.bug.color);
    console.log(self.bug.y, self.bug.x, self.bug.color);

};

Game.prototype.next = function() {
    let y = self.bug.y;
    let downBugField = self.position(self.bug.x, y+1); //i tu tez jest cos nie tak
    let occupiedField = self.board[downBugField].dataset.occupied;
    if (self.bug.y > 6  || occupiedField === "true") {
        console.log(self.bug.y, "stopinterval");
        clearInterval(self.handler);
        tab.push(self.bug)
        console.log(tab);
        self.occupy();
        id++;
        let game = new Game(id);

    } else {
        self.render();
    }
}


Game.prototype.tick = function() {
    self.check();
    switch (self.bug.direction) {
        case "down":
            self.bug.y++;
            break;
        case "left":
            self.bug.x--;
            break;
        case "right":
            self.bug.x++;
            break;
    }
    self.bug.direction = "down";

    self.next();

};


Game.prototype.keyboard = function(event) {
    var key = event.which;
    switch (key) {
        case 37:
            self.bug.direction = "left";
            break;
        case 39:
            self.bug.direction = "right";
            break;
        case 40:
            self.bug.direction = "down";
            break;
    }
};


Game.prototype.check = function() {

// checking borders - left and right
if (this.bug.x <=0 || this.bug.x >= 7) {
    this.bug.direction = "down";
}
};

document.addEventListener("DOMContentLoaded", function(event) {
    "use strict";

    //stars
    const starsTab = document.querySelectorAll(".star-icon");
    function changeStar() {
        if (this.getAttribute("src") === "images/star.svg") {
            for (let i=0; i<=Number(this.dataset.num); i++) {
                starsTab[i].setAttribute("src", "images/blue-star.svg");
            }
        } else {
            for (let i=Number(this.dataset.num)+1; i<=4; i++) {
                starsTab[i].setAttribute("src", "images/star.svg");
            }
        }
    }
    for(let i = 0; i < starsTab.length; i++) {
        starsTab[i].addEventListener('click', changeStar);
    }



    //game

    let game = new Game();

});
