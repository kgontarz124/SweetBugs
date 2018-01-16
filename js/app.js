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
		})
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
                self.bug.direction = "left";
                break;
            case 39:
                self.bug.direction = "right";
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

		function tamp6(caseNum, leftBro, rightBro){
			let booleanOneR = self.elementHasColor(rightElem);
			let booleanOneL = self.elementHasColor(leftElem);

			if(booleanOneR && booleanOneL){
				caseNum.push(upRightElem, upLeftElem, leftBro, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneL){
				caseNum.push(upLeftElem, leftBro);
				self.cleanFields(caseNum);
			} else if(booleanOneR){
				caseNum.push(upRightElem, rightBro);
				self.cleanFields(caseNum);
			}
		}

		function temp5(caseNum, leftBro, rightBro){
			let booleanOneR = self.elementHasColor(rightElem);
			let booleanOneL = self.elementHasColor(leftElem);
			let booleanOneD = self.elementHasColor(downElem);

			if(booleanOneR && booleanOneL && booleanOneD){
				caseNum.push(upRightElem, upLeftElem, downElem, leftBro, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneR && booleanOneL){
				caseNum.push(upRightElem, upLeftElem, downLeftElem, downRightElem, leftBro, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneL){
				caseNum.push(upLeftElem, downLeftElem, leftBro);
				self.cleanFields(caseNum);
			} else if(booleanOneL && booleanOneD){
				caseNum.push(downElem, upLeftElem, downRightElem, downLeftElem, leftBro);
				self.cleanFields(caseNum);
			} else if(booleanOneR && booleanOneD){
				caseNum.push(downElem, upRightElem, downLeftElem, downRightElem, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneR){
				caseNum.push(upRightElem, downRightElem, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneD){
				caseNum.push(downElem, downLeftElem, downRightElem);
				self.cleanFields(caseNum);
			}
		}


		function tempDef(caseNum, leftBro, rightBro, downBro){
			let booleanOneR = self.elementHasColor(rightElem);
			let booleanOneL = self.elementHasColor(leftElem);
			let booleanOneD = self.elementHasColor(downElem);

			if(booleanOneR && booleanOneL && booleanOneD){
				caseNum.push(upRightElem, upLeftElem, downElem, leftBro, rightBro, downBro);
				self.cleanFields(caseNum);
			} else if(booleanOneR && booleanOneL){
				caseNum.push(upRightElem, upLeftElem, downLeftElem, downRightElem, leftBro, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneL){
				caseNum.push(upLeftElem, downLeftElem, leftBro);
				self.cleanFields(caseNum);
			} else if(booleanOneL && booleanOneD){
				caseNum.push(downElem, upLeftElem, downRightElem, downLeftElem, leftBro, downBro);
				self.cleanFields(caseNum);
			} else if(booleanOneR && booleanOneD){
				caseNum.push(downElem, upRightElem, downLeftElem, downRightElem, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneR){
				caseNum.push(upRightElem, downRightElem, rightBro);
				self.cleanFields(caseNum);
			} else if(booleanOneD){
				caseNum.push(downElem, downLeftElem, downRightElem, downBro);
				self.cleanFields(caseNum);
			}
		}

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
						tamp6(case1, null, rightElemBro);
						break;
					case 6:
						tamp6(case6, leftElemBro);
						break;
					case 7:
						let booleanSeven = self.elementHasColor(leftElem);
						if(booleanSeven){
							case7.push(leftElemBro, upLeftElem);
							self.cleanFields(case7);
						}
						break;
					default:
						tamp6(def, leftElemBro, rightElemBro);
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
						temp5(case1, null, rightElemBro);
						break;

					case 6:
						temp5(case6, leftElemBro, null);
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
						temp5(def, leftElemBro, rightElemBro);
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
					tempDef(case1, null, rightElemBro, downElemBro);
					break;
				case 6:
					tempDef(case6, leftElemBro, null, downElemBro);
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
					tempDef(def, leftElemBro, rightElemBro, downElemBro);
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
					console.log(self.position(i, j));
					self.position(i, j).dataset.occupied = "false";
					let tab = self.position(i, j).classList;
					tab.remove(tab[1]);
					console.log("nowe: ");
					console.log(self.position(i, j));
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
					// console.log(self.position(i, self.bug.y + 1));
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
	let speed = 600;
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
		if(document.querySelector(".time").innerText === "00.00"){
			let game = new Game(speed, sound);
		} else if(self.playTurnOn === false){
			self.speed = speed;
			self.handler = setInterval(self.tick, self.speed);
			self.timer = setInterval(self.countGameTime, 1000);
			self.playTurnOn = true;
		}
	});

});
