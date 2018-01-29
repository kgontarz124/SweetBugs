const allColors = ["purple", "pink", "green", "red", "orange"];
const starsTab = document.querySelectorAll(".star-icon");
const helpers = ["sprey", "boom", "cleaner"];

class Bug {
	constructor() {
        this.x = 4;
        this.y = 0;
        this.direction = "down";
        this.color = allColors[Math.floor(Math.random() * 5)];
		this.trueColor="";
	}
}

class Game {
	constructor(speed, sound) {
        this.width = 8;
        this.height = 7;
		this.bug = new Bug();
		this.speed = speed;
		this.endOfGame = false;
		this.playTurnOn = true;
		this.soundTurnOn = sound;
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
		this.canChangeDirection = true;


        self = this;
		this.render();
        this.handler = setInterval(this.tick, this.speed);
		this.timer = setInterval(this.countGameTime, 1000);
        document.addEventListener("keydown", this.keyboard);
		document.querySelector(".pause").addEventListener("click", (e)=>{
			clearInterval(self.handler);
			clearInterval(self.timer);
			self.playTurnOn = false;
		});
		document.querySelector(".volume").addEventListener("click", (e)=>{
			self.soundTurnOn=!self.soundTurnOn;
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
		let checkCanUseHelper = (points, num) =>{
			if(self.generalResult>=points){
				self.bug.trueColor = self.bug.color;
				self.bug.color = helpers[num];
				self.generalResult -= points;
				document.querySelector(".general").innerText = self.generalResult;
			}
		}
        var key = event.which;
        switch (key) {
            case 37:
				if(self.canChangeDirection){
	            	self.bug.direction = "left";
					self.canChangeDirection = false;
				}
                break;
            case 39:
				if(self.canChangeDirection){
	            	self.bug.direction = "right";
					self.canChangeDirection = false;
				}
                break;
            case 40:
                self.bug.direction = "down";
                break;
			case 90:
				checkCanUseHelper(100, 0);
                break;
            case 88:
				checkCanUseHelper(150, 1);
                break;
            case 67:
				checkCanUseHelper(200, 2);
                break;
        }
    }

    check() {
		let downPosition = self.position(self.bug.x, self.bug.y + 1);
		let leftPosition = self.position(self.bug.x - 1, self.bug.y);
		let rightPosition = self.position(self.bug.x + 1, self.bug.y);
		//gemeover
		if(self.bug.y === 0 && downPosition.dataset.occupied === "true"){
			if(self.soundTurnOn){
				let	soundBox = document.querySelector(".sound-box");
				soundBox.innerHTML =`<audio autoplay><source src="fail-sound.mp3"/>
				<source src="fail-sound.mp3"/></audio>`;
			}
			clearInterval(self.handler);
			document.querySelector(".result-of-game").innerText = self.generalResult;
			document.querySelector(".time-of-game").innerText = document.querySelector(".time").innerText
			let info = document.querySelector(".gameover-info");
			info.classList.add("active");
			self.endOfGame = true;
			clearInterval(self.timer);
			document.querySelector(".time").innerText = "00.00";
			document.querySelector(".general").innerText = "0";
			delete self.timer;

			let tabPropColor = [self.purple, self.pink, self.green, self.red,  self.orange];

			for(let i= 0; i<tabPropColor.length; i++){
				tabPropColor[i] = 0;
				document.querySelector("." +allColors[i]+"-result").innerText = tabPropColor[i];
			}

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
    // checking borders and occupied fields - left and right
		if((this.bug.x >0 && leftPosition.dataset.occupied === "true") ||
		(this.bug.x <7 && rightPosition.dataset.occupied === "true") ||
		(this.bug.x >=7 && this.bug.direction === "right") ||
		(this.bug.x <=0 && this.bug.direction === "left")) {
			this.bug.direction = "down";
		}
    }

    position(x, y) {
        return self.board[y + x * this.height];
    }

	cleanFields(tab){
		let addPointsForBugColor = (prop, color, tab)=>{
			prop += tab.length;
			document.querySelector("." +color+"-result").innerText = prop;
		}

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
					addPointsForBugColor(self.purple, self.bug.color, colorsTrue);
					break;
				case "pink":
					addPointsForBugColor(self.pink, self.bug.color, colorsTrue);
					break;
				case "green":
					addPointsForBugColor(self.green, self.bug.color, colorsTrue);
					break;
				case "orange":
					addPointsForBugColor(self.orange, self.bug.color, colorsTrue);
					break;
				case "red":
					addPointsForBugColor(self.red, self.bug.color, colorsTrue);
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
		let leftPosition = self.position(self.bug.x - 1, self.bug.y);
		let upLeftPosition = self.position(self.bug.x - 1, self.bug.y - 1);
		let downLeftPosition = self.position(self.bug.x - 1, self.bug.y + 1);
		let leftPositionBro = self.position(self.bug.x - 2, self.bug.y);
		//right brothers
		let rightPosition = self.position(self.bug.x + 1, self.bug.y);
		let upRightPosition = self.position(self.bug.x + 1, self.bug.y - 1);
		let downRightPosition = self.position(self.bug.x + 1, self.bug.y + 1);
		let rightPositionBro = self.position(self.bug.x + 2, self.bug.y);
		//down brothers
		let downPosition = self.position(self.bug.x, self.bug.y + 1);
		let downPositionBro = self.position(self.bug.x, self.bug.y + 2);

		let case0 = [rightPosition];
		let case1 = [rightPosition, leftPosition];
		let case6 = [rightPosition, leftPosition];
		let case7 = [leftPosition];
		let def = [rightPosition, leftPosition];


		switch(this.bug.y){
			case 6:
				switch(this.bug.x){
					case 0:
						let booleanZero = self.elementHasColor(rightPosition);
						if(booleanZero){
							case0.push(rightPositionBro, upRightPosition);
							self.cleanFields(case0);
						}
						break;

					case 1:
						let booleanOneR = self.elementHasColor(rightPosition);
						let booleanOneL = self.elementHasColor(leftPosition);

						if(booleanOneR && booleanOneL){
							case1.push(rightPositionBro, upRightPosition, upLeftPosition);
							self.cleanFields(case1);
						} else if(booleanOneL){
							case1.push(upLeftPosition);
							self.cleanFields(case1);
						} else if(booleanOneR){
							case1.push(rightPositionBro, upRightPosition);
							self.cleanFields(case1);
						}
						break;

					case 6:
						let booleanSixR = self.elementHasColor(rightPosition);
						let booleanSixL = self.elementHasColor(leftPosition);

						if(booleanSixR && booleanSixL){
							case6.push(leftPositionBro, upRightPosition, upLeftPosition);
							self.cleanFields(case6);
						} else if(booleanSixL){
							case6.push(upLeftPosition, leftPositionBro);
							self.cleanFields(case6);
						} else if(booleanSixR){
							case6.push(upRightPosition);
							self.cleanFields(case6);
						}
						break;

					case 7:
						let booleanSeven = self.elementHasColor(leftPosition);
						if(booleanSeven){
							case7.push(leftPositionBro, upLeftPosition);
							self.cleanFields(case7);
						}
						break;

					default:
						let booleanDefR = self.elementHasColor(rightPosition);
						let booleanDefL = self.elementHasColor(leftPosition);

						if(booleanDefR && booleanDefL){
							def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition);
							self.cleanFields(def);
						} else if(booleanDefL){
							def.push(leftPositionBro, upLeftPosition);
							self.cleanFields(def);
						} else if(booleanDefR){
							def.push(rightPositionBro, upRightPosition);
							self.cleanFields(def);
						}
						break;
				}
			break;

			case 5:
				switch(this.bug.x){
					case 0:
						let booleanZeroR = self.elementHasColor(rightPosition);
						let booleanZeroD = self.elementHasColor(downPosition);
						if(booleanZeroR && booleanZeroD){
							case0.push(rightPositionBro, upRightPosition, downRightPosition, downLeftPosition, downPosition);
							self.cleanFields(case0);
						} else if(booleanZeroR){
							case0.push(rightPositionBro, upRightPosition, downRightPosition);
							self.cleanFields(case0);
						} else if(booleanZeroD) {
							case0.push(downPosition, downRightPosition);
							self.cleanFields(case0);
						}
					break;

					case 1:
						let booleanOneR = self.elementHasColor(rightPosition);
						let booleanOneL = self.elementHasColor(leftPosition);
						let booleanOneD = self.elementHasColor(downPosition);

						if(booleanOneR && booleanOneL && booleanOneD){
							case1.push(rightPositionBro, upRightPosition, upLeftPosition, downPosition);
							self.cleanFields(case1);
						} else if(booleanOneR && booleanOneL){
							case1.push(rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
							self.cleanFields(case1);
						} else if(booleanOneL){
							case1.push(upLeftPosition, downLeftPosition);
							self.cleanFields(case1);
						} else if(booleanOneL && booleanOneD){
							case1.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition);
							self.cleanFields(case1);
						} else if(booleanOneR && booleanOneD){
							case1.push(downPosition, upRightPosition, rightPositionBro, downLeftPosition, downRightPosition);
							self.cleanFields(case1);
						} else if(booleanOneR){
							case1.push(rightPositionBro, upRightPosition, downRightPosition);
							self.cleanFields(case1);
						} else if(booleanOneD){
							case1.push(downPosition, downLeftPosition, downRightPosition);
							self.cleanFields(case1);
						}
					break;

					case 6:
						let booleanSixR = self.elementHasColor(rightPosition);
						let booleanSixL = self.elementHasColor(leftPosition);
						let booleanSixD = self.elementHasColor(downPosition);

						if(booleanSixR && booleanSixL && booleanSixD){
							case6.push(leftPositionBro, upRightPosition, upLeftPosition, downPosition);
							self.cleanFields(case6);
						} else if(booleanSixR && booleanSixL){
							case6.push(leftPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
							self.cleanFields(case6);
						} else if(booleanSixL && booleanSixD){
							case6.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro);
							self.cleanFields(case6);
						} else if(booleanSixR && booleanSixD){
							case6.push(downPosition, upRightPosition, downLeftPosition, downRightPosition);
							self.cleanFields(case6);
						} else if(booleanSixL){
							case6.push(upLeftPosition, downLeftPosition, leftPositionBro);
							self.cleanFields(case6);
						} else if(booleanSixR){
							case6.push(upRightPosition, downRightPosition);
							self.cleanFields(case6);
						} else if(booleanSixD){
							case6.push(downPosition, downLeftPosition, downRightPosition);
							self.cleanFields(case6);
						}
					break;

					case 7:
						let booleanSevenL = self.elementHasColor(leftPosition);
						let booleanSevenD = self.elementHasColor(downPosition);
						if(booleanSevenL && booleanSevenD){
							case7.push(leftPositionBro, upLeftPosition, downLeftPosition, downRightPosition, downPosition);
							self.cleanFields(case7);
						} else if(booleanSevenL){
							case7.push(leftPositionBro, upLeftPosition, downLeftPosition);
							self.cleanFields(case7);
						} else if(booleanSevenD) {
							case7.push(downPosition, downLeftPosition);
							self.cleanFields(case7);
						}
					break;

					default:
						let booleanDefR = self.elementHasColor(rightPosition);
						let booleanDefL = self.elementHasColor(leftPosition);
						let booleanDefD = self.elementHasColor(downPosition);

						if(booleanDefR && booleanDefL && booleanDefD){
							def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downPosition);
							self.cleanFields(def);
						} else if(booleanDefR && booleanDefL){
							def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
							self.cleanFields(def);
						} else if(booleanDefL && booleanDefD){
							def.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro);
							self.cleanFields(def);
						} else if(booleanDefR && booleanDefD){
							def.push(downPosition, upRightPosition, downLeftPosition, downRightPosition, rightPositionBro);
							self.cleanFields(def);
						} else if(booleanDefL){
							def.push(upLeftPosition, downLeftPosition, leftPositionBro);
							self.cleanFields(def);
						} else if(booleanDefR){
							def.push(upRightPosition, rightPositionBro,  downRightPosition);
							self.cleanFields(def);
						} else if(booleanDefD){
							def.push(downPosition, downLeftPosition, downRightPosition);
							self.cleanFields(def);
						}
					break;
				}
			break;

			default:
			switch(this.bug.x){
				case 0:
					let booleanZeroR = self.elementHasColor(rightPosition);
					let booleanZeroD = self.elementHasColor(downPosition);
					if(booleanZeroR && booleanZeroD){
						case0.push(rightPositionBro, upRightPosition, downRightPosition, downLeftPosition, downPosition, downPositionBro);
						self.cleanFields(case0);
					} else if(booleanZeroR){
						case0.push(rightPositionBro, upRightPosition, downRightPosition);
						self.cleanFields(case0);
					} else if(booleanZeroD) {
						case0.push(downPosition, downRightPosition, downPositionBro);
						self.cleanFields(case0);
					}
				break;

				case 1:
					let booleanOneR = self.elementHasColor(rightPosition);
					let booleanOneL = self.elementHasColor(leftPosition);
					let booleanOneD = self.elementHasColor(downPosition);

					if(booleanOneR && booleanOneL && booleanOneD){
						case1.push(rightPositionBro, upRightPosition, upLeftPosition, downPosition, downPositionBro);
						self.cleanFields(case1);
					} else if(booleanOneR && booleanOneL){
						case1.push(rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
						self.cleanFields(case1);
					} else if(booleanOneL && booleanOneD){
						case1.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, downPositionBro);
						self.cleanFields(case1);
					} else if(booleanOneR && booleanOneD){
					   case1.push(downPosition, upRightPosition, rightPositionBro, downLeftPosition, downRightPosition, downPositionBro);
					   self.cleanFields(case1);
					} else if(booleanOneL){
						case1.push(upLeftPosition, downLeftPosition);
						self.cleanFields(case1);
					} else if(booleanOneR){
						case1.push(rightPositionBro, upRightPosition, downRightPosition);
						self.cleanFields(case1);
					} else if(booleanOneD){
						case1.push(downPosition, downLeftPosition, downRightPosition, downPositionBro);
						self.cleanFields(case1);
					}
				break;

				case 6:
					let booleanSixR = self.elementHasColor(rightPosition);
					let booleanSixL = self.elementHasColor(leftPosition);
					let booleanSixD = self.elementHasColor(downPosition);

					if(booleanSixR && booleanSixL && booleanSixD){
						case6.push(leftPositionBro, upRightPosition, upLeftPosition, downPosition, downPositionBro);
						self.cleanFields(case6);
					} else if(booleanSixR && booleanSixL){
						case6.push(leftPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
						self.cleanFields(case6);
					} else if(booleanSixL && booleanSixD){
						case6.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro, downPositionBro);
						self.cleanFields(case6);
					} else if(booleanSixR && booleanSixD){
						case6.push(downPosition, upRightPosition, downLeftPosition, downRightPosition, downPositionBro);
						self.cleanFields(case6);
					} else if(booleanSixL){
						case6.push(upLeftPosition, downLeftPosition, leftPositionBro);
						self.cleanFields(case6);
					} else if(booleanSixR){
						case6.push(upRightPosition, downRightPosition);
						self.cleanFields(case6);
					} else if(booleanSixD){
						case6.push(downPosition, downLeftPosition, downRightPosition, downPositionBro);
						self.cleanFields(case6);
					}
				break;

				case 7:
					let booleanSevenL = self.elementHasColor(leftPosition);
					let booleanSevenD = self.elementHasColor(downPosition);
					if(booleanSevenL && booleanSevenD){
						case7.push(leftPositionBro, upLeftPosition, downLeftPosition, downRightPosition, downPosition, downPositionBro);
						self.cleanFields(case7);
					} else if(booleanSevenL){
						case7.push(leftPositionBro, upLeftPosition, downLeftPosition);
						self.cleanFields(case7);
					} else if(booleanSevenD) {
						case7.push(downPosition, downLeftPosition, downPositionBro);
						self.cleanFields(case7);
					}
				break;

				default:
					let booleanDefR = self.elementHasColor(rightPosition);
					let booleanDefL = self.elementHasColor(leftPosition);
					let booleanDefD = self.elementHasColor(downPosition);

					if(booleanDefR && booleanDefL && booleanDefD){
						def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downPosition, downPositionBro);
						self.cleanFields(def);
					} else if(booleanDefR && booleanDefL){
						def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
						self.cleanFields(def);
					} else if(booleanDefL && booleanDefD){
						def.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro, downPositionBro);
						self.cleanFields(def);
					} else if(booleanDefR && booleanDefD){
						def.push(downPosition, upRightPosition, downLeftPosition, downRightPosition, rightPositionBro, downPositionBro);
						self.cleanFields(def);
					} else if(booleanDefL){
						def.push(upLeftPosition, downLeftPosition, leftPositionBro);
						self.cleanFields(def);
					} else if(booleanDefR){
						def.push(upRightPosition, rightPositionBro,  downRightPosition);
						self.cleanFields(def);
					} else if(booleanDefD){
						def.push(downPosition, downLeftPosition, downRightPosition, downPositionBro);
						self.cleanFields(def);
					}
				break;
			}
			break;
		}

	}

	clean(el) {
        el.classList.remove(self.bug.color);
		if(self.bug.trueColor!==""){
			el.classList.remove(self.bug.trueColor);
		}
    }

    tick() {
        self.check();
		if(self.endOfGame === false) {
			switch (self.bug.direction) {
				case "down":
					self.bug.y++;
					let upElem = self.position(self.bug.x, self.bug.y - 1);
					self.clean(upElem);
					self.canChangeDirection = true;
					break;
				case "left":
					self.bug.x--;
					let rightElem = self.position(self.bug.x + 1, self.bug.y);
					self.clean(rightElem);
					break;
				case "right":
					self.bug.x++;
					let leftElem = self.position(self.bug.x - 1, self.bug.y);
					self.clean(leftElem);
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

	helpers(position){
		let cleanFromBoom = (leng)=>{
			for(let i = self.bug.x-1; i < self.bug.x+2; i++){
				for(let j = self.bug.y+1; j < self.bug.y+leng; j++){
					self.position(i, j).dataset.occupied = "false";
					let tab = self.position(i, j).classList;
					tab.remove(tab[1]);
				}
			}
		}

		switch(self.bug.color){
			case "sprey":
				let downElemClass = self.position(self.bug.x, self.bug.y + 1).className.split(' ');
				self.clean(position);
				let tab = document.querySelectorAll("."+downElemClass[1]);
				for (let i = 0; i < tab.length; i++) {
					tab[i].classList.remove(downElemClass[1]);
					self.occupy(tab[i]);
				}
				break;
			case "boom":
				self.clean(position);
				switch(self.bug.y){
					case 6:
						cleanFromBoom(1);
						break;
					case 5:
						cleanFromBoom(2);
						break;
					default:
						cleanFromBoom(4);
						break;
				}
				break;
			case "cleaner":
				self.clean(position);
				for(let i = 0; i < 8; i++){
					let tab = self.position(i, self.bug.y + 1).classList;
					tab.remove(tab[1]);
					self.position(i, self.bug.y + 1).dataset.occupied = "false";
				}
				break;
		}
	}


    stopBug() {
        clearInterval(self.handler);

		// console.log(self.bug.trueColor);
		if(self.bug.trueColor!==""){
			self.helpers(self.position(self.bug.x, this.bug.y));
			self.bug.trueColor = "";
		} else {
			self.occupy(self.position(self.bug.x, this.bug.y));
			self.checkCloseFields();
		}
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
	let speed = 400;
	let sound = true;
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

	//sound
	document.querySelector(".volume").addEventListener("click", (e)=>{
		sound=!sound;
	})


	//start game
	document.querySelector(".play").addEventListener("click", (e)=>{
		if(self.timer === undefined){
			let game = new Game(speed, sound);
		} else if(self.playTurnOn === false){
			self.speed = speed;
			self.handler = setInterval(self.tick, self.speed);
			self.timer = setInterval(self.countGameTime, 1000);
			self.playTurnOn = true;
		}
	});

});
