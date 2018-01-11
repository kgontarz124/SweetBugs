const allColors = ["purple", "pink", "green", "red", "orange"];
let tab = [];
let id = 0;


class Bug {
	constructor() {
        this.x = 4;
        this.y = -1;
        this.up = -2;
        this.down = 0;
        this.left = 3;
        this.right = 5;
        this.direction = "down";
        this.color = allColors[Math.floor(Math.random() * 5)];
	}
}
class Game {
	constructor() {
        this.width = 8;
        this.height = 7;
        this.board = document.querySelectorAll(".square");
        this.bug = new Bug(id);
        this.score = 0;
        this.nextCheck = 0;

        // start game
        self = this;
        this.handler = setInterval(this.tick, 700);
        document.addEventListener("keydown", this.keyboard);
	}

    keyboard(event) {
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
    }

    check() {
    // checking borders - left and right
        if (this.bug.x <=0 && this.bug.direction === "right") {
            this.bug.direction = "right";

        } else if (this.bug.x <=0 ) {
                this.bug.direction = "down";
        }
        if (this.bug.x >=7 && this.bug.direction === "left") {
            this.bug.direction = "left";

        } else if (this.bug.x >=7 ) {
                this.bug.direction = "down";
        }
    }

    position(x, y) {
        return y + x * this.height;
    }

    clean(a) {
        this.board[a].classList.remove(this.bug.color);
    }


    tick() {
        self.check();
        switch (self.bug.direction) {
            case "down":
                self.bug.y++;
                self.bug.up++;
                self.bug.down++;
                let upBugField = self.position(self.bug.x, self.bug.up);
                self.clean(upBugField);
                break;
            case "left":
                self.bug.x--;
                self.bug.left--;
                self.bug.right--;
                let rightBugField = self.position(self.bug.right, self.bug.y);
                self.clean(rightBugField);
                break;
            case "right":
                self.bug.x++;
                self.bug.left++;
                self.bug.rigth++;
                let leftBugField = self.position(self.bug.left, self.bug.y);
                self.clean(leftBugField);
                break;
        }
        self.bug.direction = "down";
        self.next();
    }

    next(){
        //chech downfield free or not
        let downBugField = self.position(self.bug.x, self.bug.down);
        let downOccupiedField = self.board[downBugField].dataset.occupied;

        if (self.bug.y > 5) {
            console.log(self.bug.y, "stopinterval");
            clearInterval(self.handler);
            tab.push(self.bug)
            console.log(tab);
            self.occupy();
            self.render();
            let game = new Game();
        } else if (downOccupiedField === "true"){
            console.log(self.bug.y, "stopinterval");
            clearInterval(self.handler);
            tab.push(self.bug)
            console.log(tab);
            self.occupy();
            self.render();
            let game = new Game();
        } else {
            self.render();
        }
    }

    occupy(x, y) {
        //occupy field
        let bugField = this.position(this.bug.x, this.bug.y);
        this.board[bugField].dataset.occupied = "true";
    }

    render() {
        // rendering bug
        let bugField = self.position(self.bug.x, self.bug.y);
        self.board[bugField].classList.add(self.bug.color);
        console.log(self.bug.x, self.bug.y, self.bug.color);
    }
}


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
