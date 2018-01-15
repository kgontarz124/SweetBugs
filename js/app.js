const allColors = ["purple", "pink", "green", "red", "orange"];
const starsTab = document.querySelectorAll(".star-icon");

class Bug {
	constructor() {
        this.x = 4;
        this.y = 0;
        this.direction = "down";
        this.color = allColors[Math.floor(Math.random() * 5)];
	}
}

class Game {
	constructor(speed) {
        this.width = 8;
        this.height = 7;
		this.bug = new Bug();
		this.speed = speed;
		this.endOfGame = false;
		this.turn0n = true;
        this.board = document.querySelectorAll(".square");
        this.generalResult = Number(document.querySelector(".general").innerText);
		this.purple = Number(document.querySelector(".purple-result").innerText);
		this.pink = Number(document.querySelector(".pink-result").innerText);
		this.green = Number(document.querySelector(".green-result").innerText);
		this.orange = Number(document.querySelector(".orange-result").innerText);
		this.red = Number(document.querySelector(".red-result").innerText);
		this.minutesDozens = 0;
		this.minutesUnity = 0;
		this.secondsDozens = 0;
		this.secondsUnity = 0;


        self = this;
		this.render();
        this.handler = setInterval(this.tick, this.speed);
		this.timer = setInterval(this.countGameTime, 1000);
        document.addEventListener("keydown", this.keyboard);
		document.querySelector(".pause").addEventListener("click", (e)=>{
			clearInterval(self.handler);
			self.turn0n = false;
		});
	}

	countGameTime() {
		self.secondsUnity++;
		if(self.secondsUnity > 9) {
			self.secondsUnity = 0;
			self.secondsDozens++;
			if(self.secondsDozens > 5) {
				self.secondsDozens = 0;
				self.minutesUnity++;
				if(self.minutesUnity > 9) {
					self.minutesUnity = 0;
					self.minutesDozens++;
				}
			}
		}
		document.querySelector(".time").innerText = "" + self.minutesDozens + self.minutesUnity + "." + self.secondsDozens + self.secondsUnity;
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
		let downPosition = self.position(self.bug.x, self.bug.y + 1);
		if(self.bug.y === 0 && downPosition.dataset.occupied === "true"){
			clearInterval(self.handler);
			document.querySelector(".result-of-game").innerText = self.generalResult;
			document.querySelector(".time-of-game").innerText = document.querySelector(".time").innerText
			let info = document.querySelector(".gameover-info");
			info.classList.add("active");
			self.endOfGame = true;
			clearInterval(self.timer);
			document.querySelector(".time").innerText = "00.00";
			document.querySelector(".general").innerText = "0";

			document.querySelector(".cancel-game-over").addEventListener("click", (e)=>{
				info.classList.remove("active");
				//clean all fields
				for (let i = 0; i < self.board.length; i++) {
					self.board[i].dataset.occupied="false";
					for (let j = 0; j<self.board.length; j++){
						self.board[i].classList.remove(allColors[j]);
					}
			    }
			})
		}
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
        return self.board[y + x * this.height;
    }

	addPointsForBugColor(prop, color, tab){
		prop += tab.length;
		document.querySelector("." +color+"-result").innerText = prop;
	}

	cleanFields(tab){
		let colorsTrue = [];
		for(let i=0; i<tab.length; i++){
			if(tab[i].className.indexOf(self.bug.color) !== -1) {
				colorsTrue.push(tab[i]);
			}
		}
		if(colorsTrue.length > 1) {
			let currentPosition = self.position(self.bug.x, self.bug.y);
			colorsTrue.push(currentPosition);
			//increase generalResult
			self.generalResult += colorsTrue.length*10;
			document.querySelector(".general").innerText = self.generalResult;

			switch (self.bug.color) {
				case "purple":
					self.addPointsForBugColor(self.purple, self.bug.color, colorsTrue);
					break;
				case "pink":
					self.addPointsForBugColor(self.pink, self.bug.color, colorsTrue);
					break;
				case "green":
					self.addPointsForBugColor(self.green, self.bug.color, colorsTrue);
					break;
				case "orange":
					self.addPointsForBugColor(self.orange, self.bug.color, colorsTrue);
					break;
				case "red":
					self.addPointsForBugColor(self.red, self.bug.color, colorsTrue);
					break;
			}

			for(let j=0; j<colorsTrue.length; j++){
				self.clean(colorsTrue[j]);
				self.occupy(colorsTrue[j]);
			}
			colorsTrue = [];
		}
	}

	elementHasColor(el){
		if(el.className.indexOf(self.bug.color) !== -1) {
			return true;
		} else {
			return false;
		}
	}

	checkCloseFields(){
		//left brothers
		let leftElem = self.position(self.bug.x - 1, self.bug.y);
		let upLeftElem = self.position(self.bug.x - 1, self.bug.y - 1);
		let downLeftElem = self.position(self.bug.x - 1, self.bug.y + 1);
		let leftElemBro = self.position(self.bug.x - 2, self.bug.y);
		//right brothers
		let rightElem = self.position(self.bug.x + 1, self.bug.y);
		let upRightElem = self.position(self.bug.x + 1, self.bug.y - 1);
		let downRightElem = self.position(self.bug.x + 1, self.bug.y + 1);
		let rightElemBro = self.position(self.bug.x + 2, self.bug.y);
		//down brothers
		let downElem = self.position(self.bug.x, self.bug.y + 1);
		let downElemBro = self.position(self.bug.x, self.bug.y + 2);

		let case0 = [rightElem];
		let case7 = [leftElem];
		let case1 = [rightElem, leftElem];
		let case6 = [rightElem, leftElem];
		let def = [rightElem, leftElem];
		switch(this.bug.y){
			case 6:
				switch(this.bug.x){
					case 0:
						let booleanZero = self.elementHasColor(rightElem);
						if(booleanZero){
							case0.push(rightElemBro, upRightElem);
							self.cleanFields(case0);
						}
						break;

					case 1:
						let booleanOneR = self.elementHasColor(rightElem);
						let booleanOneL = self.elementHasColor(leftElem);

						if(booleanOneR && booleanOneL){
							case1.push(rightElemBro, upRightElem, upLeftElem);
							self.cleanFields(case1);
						} else if(booleanOneL){
							case1.push(upLeftElem);
							self.cleanFields(case1);
						} else if(booleanOneR){
							case1.push(rightElemBro, upRightElem);
							self.cleanFields(case1);
						}
						break;

					case 6:
						let booleanSixR = self.elementHasColor(rightElem);
						let booleanSixL = self.elementHasColor(leftElem);

						if(booleanSixR && booleanSixL){
							case6.push(leftElemBro, upRightElem, upLeftElem);
							self.cleanFields(case6);
						} else if(booleanSixL){
							case6.push(upLeftElem, leftElemBro);
							self.cleanFields(case6);
						} else if(booleanSixR){
							case6.push(upRightElem);
							self.cleanFields(case6);
						}
						break;

					case 7:
						let booleanSeven = self.elementHasColor(leftElem);
						if(booleanSeven){
							case7.push(leftElemBro, upLeftElem);
							self.cleanFields(case7);
						}
						break;

					default:
						let booleanDefR = self.elementHasColor(rightElem);
						let booleanDefL = self.elementHasColor(leftElem);


						if(booleanDefR && booleanDefL){
							def.push(leftElemBro, rightElemBro, upRightElem, upLeftElem);
							self.cleanFields(def);
						} else if(booleanDefL){
							def.push(leftElemBro, upLeftElem);
							self.cleanFields(def);
						} else if(booleanDefR){
							def.push(rightElemBro, upRightElem);
							self.cleanFields(def);
						}
						break;
				}
			break;

			case 5:
				switch(this.bug.x){
					case 0:
						let booleanZeroR = self.elementHasColor(rightElem);
						let booleanZeroD = self.elementHasColor(downElem);
						if(booleanZeroR && booleanZeroD){
							case0.push(rightElemBro, upRightElem, downRightElem, downLeftElem, downElem);
							self.cleanFields(case0);
						} else if(booleanZeroR){
							case0.push(rightElemBro, upRightElem, downRightElem);
							self.cleanFields(case0);
						} else if(booleanZeroD) {
							case0.push(downElem, downRightElem);
							self.cleanFields(case0);
						}
					break;

					case 1:
						let booleanOneR = self.elementHasColor(rightElem);
						let booleanOneL = self.elementHasColor(leftElem);
						let booleanOneD = self.elementHasColor(downElem);

						if(booleanOneR && booleanOneL && booleanOneD){
							case1.push(rightElemBro, upRightElem, upLeftElem, downElem);
							self.cleanFields(case1);
						} else if(booleanOneR && booleanOneL){
							case1.push(rightElemBro, upRightElem, upLeftElem, downLeftElem, downRightElem);
							self.cleanFields(case1);
						} else if(booleanOneL){
							case1.push(upLeftElem, downLeftElem);
							self.cleanFields(case1);
						} else if(booleanOneL && booleanOneD){
							case1.push(downElem, upLeftElem, downRightElem, downLeftElem);
							self.cleanFields(case1);
						} else if(booleanOneR && booleanOneD){
							case1.push(downElem, upRightElem, rightElemBro, downLeftElem, downRightElem);
							self.cleanFields(case1);
						} else if(booleanOneR){
							case1.push(rightElemBro, upRightElem, downRightElem);
							self.cleanFields(case1);
						} else if(booleanOneD){
							case1.push(downElem, downLeftElem, downRightElem);
							self.cleanFields(case1);
						}
					break;

					case 6:
						let booleanSixR = self.elementHasColor(rightElem);
						let booleanSixL = self.elementHasColor(leftElem);
						let booleanSixD = self.elementHasColor(downElem);

						if(booleanSixR && booleanSixL && booleanSixD){
							case6.push(leftElemBro, upRightElem, upLeftElem, downElem);
							self.cleanFields(case6);
						} else if(booleanSixR && booleanSixL){
							case6.push(leftElemBro, upRightElem, upLeftElem, downLeftElem, downRightElem);
							self.cleanFields(case6);
						} else if(booleanSixL && booleanSixD){
							case6.push(downElem, upLeftElem, downRightElem, downLeftElem, leftElemBro);
							self.cleanFields(case6);
						} else if(booleanSixR && booleanSixD){
							case6.push(downElem, upRightElem, downLeftElem, downRightElem);
							self.cleanFields(case6);
						} else if(booleanSixL){
							case6.push(upLeftElem, downLeftElem, leftElemBro);
							self.cleanFields(case6);
						} else if(booleanSixR){
							case6.push(upRightElem, downRightElem);
							self.cleanFields(case6);
						} else if(booleanSixD){
							case6.push(downElem, downLeftElem, downRightElem);
							self.cleanFields(case6);
						}
					break;

					case 7:
						let booleanSevenL = self.elementHasColor(leftElem);
						let booleanSevenD = self.elementHasColor(downElem);
						if(booleanSevenL && booleanSevenD){
							case7.push(leftElemBro, upLeftElem, downLeftElem, downElem);
							self.cleanFields(case7);
						} else if(booleanSevenL){
							case7.push(leftElemBro, upLeftElem, downLeftElem);
							self.cleanFields(case7);
						} else if(booleanSevenD) {
							case7.push(downElem, downLeftElem);
							self.cleanFields(case7);
						}
					break;

					default:
						let booleanDefR = self.elementHasColor(rightElem);
						let booleanDefL = self.elementHasColor(leftElem);
						let booleanDefD = self.elementHasColor(downElem);

						if(booleanDefR && booleanDefL && booleanDefD){
							def.push(leftElemBro, rightElemBro, upRightElem, upLeftElem, downElem);
							self.cleanFields(def);
						} else if(booleanDefR && booleanDefL){
							def.push(leftElemBro, rightElemBro, upRightElem, upLeftElem, downLeftElem, downRightElem);
							self.cleanFields(def);
						} else if(booleanDefL && booleanDefD){
							def.push(downElem, upLeftElem, downRightElem, downLeftElem, leftElemBro);
							self.cleanFields(def);
						} else if(booleanDefR && booleanDefD){
							def.push(downElem, upRightElem, downLeftElem, downRightElem, rightElemBro);
							self.cleanFields(def);
						} else if(booleanDefL){
							def.push(upLeftElem, downLeftElem, leftElemBro);
							self.cleanFields(def);
						} else if(booleanDefR){
							def.push(upRightElem, rightElemBro,  downRightElem);
							self.cleanFields(def);
						} else if(booleanDefD){
							def.push(downElem, downLeftElem, downRightElem);
							self.cleanFields(def);
						}
					break;
				}
			break;

			default:
			switch(this.bug.x){
				case 0:
					let booleanZeroR = self.elementHasColor(rightElem);
					let booleanZeroD = self.elementHasColor(downElem);
					if(booleanZeroR && booleanZeroD){
						case0.push(rightElemBro, upRightElem, downRightElem, downLeftElem, downElem, downElemBro);
						self.cleanFields(case0);
					} else if(booleanZeroR){
						case0.push(rightElemBro, upRightElem, downRightElem);
						self.cleanFields(case0);
					} else if(booleanZeroD) {
						case0.push(downElem, downRightElem, downElemBro);
						self.cleanFields(case0);
					}
				break;

				case 1:
					let booleanOneR = self.elementHasColor(rightElem);
					let booleanOneL = self.elementHasColor(leftElem);
					let booleanOneD = self.elementHasColor(downElem);

					if(booleanOneR && booleanOneL && booleanOneD){
						case1.push(rightElemBro, upRightElem, upLeftElem, downElem, downElemBro);
						self.cleanFields(case1);
					} else if(booleanOneR && booleanOneL){
						case1.push(rightElemBro, upRightElem, upLeftElem, downLeftElem, downRightElem);
						self.cleanFields(case1);
					} else if(booleanOneL && booleanOneD){
						case1.push(downElem, upLeftElem, downRightElem, downLeftElem, downElemBro);
						self.cleanFields(case1);
					} else if(booleanOneR && booleanOneD){
					   case1.push(downElem, upRightElem, rightElemBro, downLeftElem, downRightElem, downElemBro);
					   self.cleanFields(case1);
				    } else if(booleanOneL){
						case1.push(upLeftElem, downLeftElem);
						self.cleanFields(case1);
					} else if(booleanOneR){
						case1.push(rightElemBro, upRightElem, downRightElem);
						self.cleanFields(case1);
					} else if(booleanOneD){
						case1.push(downElem, downLeftElem, downRightElem, downElemBro);
						self.cleanFields(case1);
					}
				break;

				case 6:
					let booleanSixR = self.elementHasColor(rightElem);
					let booleanSixL = self.elementHasColor(leftElem);
					let booleanSixD = self.elementHasColor(downElem);

					if(booleanSixR && booleanSixL && booleanSixD){
						case6.push(leftElemBro, upRightElem, upLeftElem, downElem, downElemBro);
						self.cleanFields(case6);
					} else if(booleanSixR && booleanSixL){
						case6.push(leftElemBro, upRightElem, upLeftElem, downLeftElem, downRightElem);
						self.cleanFields(case6);
					} else if(booleanSixL && booleanSixD){
						case6.push(downElem, upLeftElem, downRightElem, downLeftElem, leftElemBro, downElemBro);
						self.cleanFields(case6);
					} else if(booleanSixR && booleanSixD){
						case6.push(downElem, upRightElem, downLeftElem, downRightElem, downElemBro);
						self.cleanFields(case6);
					} else if(booleanSixL){
						case6.push(upLeftElem, downLeftElem, leftElemBro);
						self.cleanFields(case6);
					} else if(booleanSixR){
						case6.push(upRightElem, downRightElem);
						self.cleanFields(case6);
					} else if(booleanSixD){
						case6.push(downElem, downLeftElem, downRightElem, downElemBro);
						self.cleanFields(case6);
					}
				break;

				case 7:
					let booleanSevenL = self.elementHasColor(leftElem);
					let booleanSevenD = self.elementHasColor(downElem);
					if(booleanSevenL && booleanSevenD){
						case7.push(leftElemBro, upLeftElem, downLeftElem, downRightElem, downElem, downElemBro);
						self.cleanFields(case7);
					} else if(booleanSevenL){
						case7.push(leftElemBro, upLeftElem, downLeftElem);
						self.cleanFields(case7);
					} else if(booleanSevenD) {
						case7.push(downElem, downLeftElem, downElemBro);
						self.cleanFields(case7);
					}
				break;

				default:
					let booleanDefR = self.elementHasColor(rightElem);
					let booleanDefL = self.elementHasColor(leftElem);
					let booleanDefD = self.elementHasColor(downElem);

					if(booleanDefR && booleanDefL && booleanDefD){
						def.push(leftElemBro, rightElemBro, upRightElem, upLeftElem, downElem, downElemBro);
						self.cleanFields(def);
					} else if(booleanDefR && booleanDefL){
						def.push(leftElemBro, rightElemBro, upRightElem, upLeftElem, downLeftElem, downRightElem);
						self.cleanFields(def);
					} else if(booleanDefL && booleanDefD){
						def.push(downElem, upLeftElem, downRightElem, downLeftElem, leftElemBro, downElemBro);
						self.cleanFields(def);
					} else if(booleanDefR && booleanDefD){
						def.push(downElem, upRightElem, downLeftElem, downRightElem, rightElemBro, downElemBro);
						self.cleanFields(def);
					} else if(booleanDefL){
						def.push(upLeftElem, downLeftElem, leftElemBro);
						self.cleanFields(def);
					} else if(booleanDefR){
						def.push(upRightElem, rightElemBro,  downRightElem);
						self.cleanFields(def);
					} else if(booleanDefD){
						def.push(downElem, downLeftElem, downRightElem, downElemBro);
						self.cleanFields(def);
					}
				break;
			}
			break;
		}
	}

	clean(el) {
        el.classList.remove(this.bug.color);
    }

    tick() {
        self.check();
		if(self.endOfGame === false) {
			switch (self.bug.direction) {
				case "down":
					self.bug.y++;
					let upPosition = self.position(self.bug.x, self.bug.y - 1);
					self.clean(upPosition);
					break;
				case "left":
					self.bug.x--;
					let rightPosition = self.position(self.bug.x + 1, self.bug.y);
					self.clean(rightPosition);
					break;
				case "right":
					self.bug.x++;
					let leftPosition = self.position(self.bug.x - 1, self.bug.y);
					self.clean(leftPosition);
					break;
			}
			self.bug.direction = "down";
			self.next();
		}
    }

    next(){
        //check downField free or not
        let downOccupiedField;
        if (self.bug.x === 7 && self.bug.y === 6) {
            downOccupiedField === "true"
        } else {
            let downPosition = self.position(self.bug.x, self.bug.y + 1);
            downOccupiedField = downPosition.dataset.occupied;
        }


        if (self.bug.y >= 6 || downOccupiedField === "true") {
			self.render();
            self.stopBug();
        } else {
            self.render();
        }
    }


    stopBug() {
        clearInterval(self.handler);
		self.occupy(self.position(self.bug.x, this.bug.y));
		self.checkCloseFields();
		self.bug = new Bug();
		self.render();
		self.handler = setInterval(self.tick, this.speed);
    }

    occupy(el) {
		if (el.dataset.occupied==="false"){
			el.dataset.occupied = "true";
		} else {
			el.dataset.occupied = "false";
		}
    }

    render() {
        // rendering bug
        let currentPosition = self.position(self.bug.x, self.bug.y);
        currentPosition.classList.add(self.bug.color);
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    "use strict";
	//speed of speed
	let speed = 700;
	function changespeed(event){
		if (this.getAttribute("src") === "images/star.svg") {
			for (let i=0; i<=Number(this.dataset.num); i++) {
				starsTab[i].setAttribute("src", "images/blue-star.svg");
				speed = this.dataset.speed;
			}
		} else {
			for (let i=Number(this.dataset.num)+1; i<=4; i++) {
				starsTab[i].setAttribute("src", "images/star.svg");
				speed = this.dataset.speed;
			}
		}
	}

	for(let i = 0; i < starsTab.length; i++) {
		starsTab[i].addEventListener('click', changespeed);
	}

	//start game
	document.querySelector(".play").addEventListener("click", (e)=>{
		if(document.querySelector(".time").innerText === "00.00"){
			let game = new Game(speed);
		} else if(self.turn0n === false){
			self.speed = speed;
			self.handler = setInterval(self.tick, self.speed);
		}
	});


});
