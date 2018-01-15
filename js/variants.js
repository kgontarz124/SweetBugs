function checkCloseFields(){
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
    let def = [rightPosition, upRightPosition, rightPositionBro, leftPosition, upLeftPosition, leftPositionBro];


    switch(this.bug.y){
        case 6:
            switch(this.bug.x){
                case 0:
                    let booleanZero = self.positionHasColor(rightPosition);
                    if(booleanZero){
                        case0.push(rightPositionBro, upRightPosition);
                        self.aaa(case0);
                    }
                    break;

                case 1:
                    let booleanOneR = self.positionHasColor(rightPosition);
                    let booleanOneL = self.positionHasColor(leftPosition);

                    if(booleanOneR && booleanOneL){
                        case1.push(rightPositionBro, upRightPosition, upLeftPosition);
                        self.aaa(case1);
                    } else if(booleanOneL){
                        case1.push(upLeftPosition);
                        self.aaa(case1);
                    } else if(booleanOneR){
                        case1.push(rightPositionBro, upRightPosition);
                        self.aaa(case1);
                    }
                    break;

                case 6:
                    let booleanSixR = self.positionHasColor(rightPosition);
                    let booleanSixL = self.positionHasColor(leftPosition);

                    if(booleanSixR && booleanSixL){
                        case6.push(leftPositionBro, upRightPosition, upLeftPosition);
                        self.aaa(case6);
                    } else if(booleanSixL){
                        case6.push(upLeftPosition, leftPositionBro);
                        self.aaa(case6);
                    } else if(booleanSixR){
                        case6.push(upRightPosition);
                        self.aaa(case6);
                    }
                    break;

                case 7:
                    let booleanSeven = self.positionHasColor(leftPosition);
                    if(booleanSeven){
                        case7.push(leftPositionBro, upLeftPosition);
                        self.aaa(case7);
                    }
                    break;

                default:
                    let booleanDefR = self.positionHasColor(rightPosition);
                    let booleanDefL = self.positionHasColor(leftPosition);

                    if(booleanDefR && booleanDefL){
                        def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition);
                        self.aaa(def);
                    } else if(booleanDefL){
                        def.push(leftPositionBro, upLeftPosition);
                        self.aaa(def);
                    } else if(booleanDefR){
                        def.push(rightPositionBro, upRightPosition);
                        self.aaa(def);
                    }
                    break;
            }
        break;

        case 5:
            switch(this.bug.x){
                case 0:
                    let booleanZeroR = self.positionHasColor(rightPosition);
                    let booleanZeroD = self.positionHasColor(downPosition);
                    if(booleanZeroR && booleanZeroD){
                        case0.push(rightPositionBro, upRightPosition, downRightPosition, downLeftPosition, downPosition);
                        self.aaa(case0);
                    } else if(booleanZeroR){
                        case0.push(rightPositionBro, upRightPosition, downRightPosition);
                        self.aaa(case0);
                    } else if(booleanZeroD) {
                        case0.push(downPosition, downRightPosition);
                        self.aaa(case0);
                    }
                break;

                case 1:
                    let booleanOneR = self.positionHasColor(rightPosition);
                    let booleanOneL = self.positionHasColor(leftPosition);
                    let booleanOneD = self.positionHasColor(downPosition);

                    if(booleanOneR && booleanOneL && booleanOneD){
                        case1.push(rightPositionBro, upRightPosition, upLeftPosition, downPosition);
                        self.aaa(case1);
                    } else if(booleanOneR && booleanOneL){
                        case1.push(rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
                        self.aaa(case1);
                    } else if(booleanOneL){
                        case1.push(upLeftPosition, downLeftPosition);
                        self.aaa(case1);
                    } else if(booleanOneL && booleanOneD){
                        case1.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition);
                        self.aaa(case1);
                    } else if(booleanOneR && booleanOneD){
                        case1.push(downPosition, upRightPosition, rightPositionBro, downLeftPosition, downRightPosition);
                        self.aaa(case1);
                    } else if(booleanOneR){
                        case1.push(rightPositionBro, upRightPosition, downRightPosition);
                        self.aaa(case1);
                    } else if(booleanOneD){
                        case1.push(downPosition, downLeftPosition, downRightPosition);
                        self.aaa(case1);
                    }
                break;

                case 6:
                    let booleanSixR = self.positionHasColor(rightPosition);
                    let booleanSixL = self.positionHasColor(leftPosition);
                    let booleanSixD = self.positionHasColor(downPosition);

                    if(booleanSixR && booleanSixL && booleanSixD){
                        case6.push(leftPositionBro, upRightPosition, upLeftPosition, downPosition);
                        self.aaa(case6);
                    } else if(booleanSixR && booleanSixL){
                        case6.push(leftPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
                        self.aaa(case6);
                    } else if(booleanSixL && booleanSixD){
                        case6.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro);
                        self.aaa(case6);
                    } else if(booleanSixR && booleanSixD){
                        case6.push(downPosition, upRightPosition, downLeftPosition, downRightPosition);
                        self.aaa(case6);
                    } else if(booleanSixL){
                        case6.push(upLeftPosition, downLeftPosition, leftPositionBro);
                        self.aaa(case6);
                    } else if(booleanSixR){
                        case6.push(upRightPosition, downRightPosition);
                        self.aaa(case6);
                    } else if(booleanSixD){
                        case6.push(downPosition, downLeftPosition, downRightPosition);
                        self.aaa(case6);
                    }
                break;

                case 7:
                    let booleanSevenL = self.positionHasColor(leftPosition);
                    let booleanSevenD = self.positionHasColor(downPosition);
                    if(booleanSevenL && booleanSevenD){
                        case7.push(leftPositionBro, upLeftPosition, downLeftPosition, downRightPosition, downPosition);
                        self.aaa(case7);
                    } else if(booleanSevenL){
                        case7.push(leftPositionBro, upLeftPosition, downLeftPosition);
                        self.aaa(case7);
                    } else if(booleanSevenD) {
                        case7.push(downPosition, downLeftPosition);
                        self.aaa(case7);
                    }
                break;

                default:
                    let booleanDefR = self.positionHasColor(rightPosition);
                    let booleanDefL = self.positionHasColor(leftPosition);
                    let booleanDefD = self.positionHasColor(downPosition);

                    if(booleanDefR && booleanDefL && booleanDefD){
                        def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downPosition);
                        self.aaa(def);
                    } else if(booleanDefR && booleanDefL){
                        def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
                        self.aaa(def);
                    } else if(booleanDefL && booleanDefD){
                        def.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro);
                        self.aaa(def);
                    } else if(booleanDefR && booleanDefD){
                        def.push(downPosition, upRightPosition, downLeftPosition, downRightPosition, rightPositionBro);
                        self.aaa(def);
                    } else if(booleanDefL){
                        def.push(upLeftPosition, downLeftPosition, leftPositionBro);
                        self.aaa(def);
                    } else if(booleanDefR){
                        def.push(upRightPosition, rightPositionBro,  downRightPosition);
                        self.aaa(def);
                    } else if(booleanDefD){
                        def.push(downPosition, downLeftPosition, downRightPosition);
                        self.aaa(def);
                    }
                break;
            }
        break;

        default:
        switch(this.bug.x){
            case 0:
                let booleanZeroR = self.positionHasColor(rightPosition);
                let booleanZeroD = self.positionHasColor(downPosition);
                if(booleanZeroR && booleanZeroD){
                    case0.push(rightPositionBro, upRightPosition, downRightPosition, downLeftPosition, downPosition, downPositionBro);
                    self.aaa(case0);
                } else if(booleanZeroR){
                    case0.push(rightPositionBro, upRightPosition, downRightPosition);
                    self.aaa(case0);
                } else if(booleanZeroD) {
                    case0.push(downPosition, downRightPosition, downPositionBro);
                    self.aaa(case0);
                }
            break;

            case 1:
                let booleanOneR = self.positionHasColor(rightPosition);
                let booleanOneL = self.positionHasColor(leftPosition);
                let booleanOneD = self.positionHasColor(downPosition);

                if(booleanOneR && booleanOneL && booleanOneD){
                    case1.push(rightPositionBro, upRightPosition, upLeftPosition, downPosition, downPositionBro);
                    self.aaa(case1);
                } else if(booleanOneR && booleanOneL){
                    case1.push(rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
                    self.aaa(case1);
                } else if(booleanOneL && booleanOneD){
                    case1.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, downPositionBro);
                    self.aaa(case1);
                } else if(booleanOneR && booleanOneD){
                   case1.push(downPosition, upRightPosition, rightPositionBro, downLeftPosition, downRightPosition, downPositionBro);
                   self.aaa(case1);
                } else if(booleanOneL){
                    case1.push(upLeftPosition, downLeftPosition);
                    self.aaa(case1);
                } else if(booleanOneR){
                    case1.push(rightPositionBro, upRightPosition, downRightPosition);
                    self.aaa(case1);
                } else if(booleanOneD){
                    case1.push(downPosition, downLeftPosition, downRightPosition, downPositionBro);
                    self.aaa(case1);
                }
            break;

            case 6:
                let booleanSixR = self.positionHasColor(rightPosition);
                let booleanSixL = self.positionHasColor(leftPosition);
                let booleanSixD = self.positionHasColor(downPosition);

                if(booleanSixR && booleanSixL && booleanSixD){
                    case6.push(leftPositionBro, upRightPosition, upLeftPosition, downPosition, downPositionBro);
                    self.aaa(case6);
                } else if(booleanSixR && booleanSixL){
                    case6.push(leftPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
                    self.aaa(case6);
                } else if(booleanSixL && booleanSixD){
                    case6.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro, downPositionBro);
                    self.aaa(case6);
                } else if(booleanSixR && booleanSixD){
                    case6.push(downPosition, upRightPosition, downLeftPosition, downRightPosition, downPositionBro);
                    self.aaa(case6);
                } else if(booleanSixL){
                    case6.push(upLeftPosition, downLeftPosition, leftPositionBro);
                    self.aaa(case6);
                } else if(booleanSixR){
                    case6.push(upRightPosition, downRightPosition);
                    self.aaa(case6);
                } else if(booleanSixD){
                    case6.push(downPosition, downLeftPosition, downRightPosition, downPositionBro);
                    self.aaa(case6);
                }
            break;

            case 7:
                let booleanSevenL = self.positionHasColor(leftPosition);
                let booleanSevenD = self.positionHasColor(downPosition);
                if(booleanSevenL && booleanSevenD){
                    case7.push(leftPositionBro, upLeftPosition, downLeftPosition, downRightPosition, downPosition, downPositionBro);
                    self.aaa(case7);
                } else if(booleanSevenL){
                    case7.push(leftPositionBro, upLeftPosition, downLeftPosition);
                    self.aaa(case7);
                } else if(booleanSevenD) {
                    case7.push(downPosition, downLeftPosition, downPositionBro);
                    self.aaa(case7);
                }
            break;

            default:
                let booleanDefR = self.positionHasColor(rightPosition);
                let booleanDefL = self.positionHasColor(leftPosition);
                let booleanDefD = self.positionHasColor(downPosition);

                if(booleanDefR && booleanDefL && booleanDefD){
                    def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downPosition, downPositionBro);
                    self.aaa(def);
                } else if(booleanDefR && booleanDefL){
                    def.push(leftPositionBro, rightPositionBro, upRightPosition, upLeftPosition, downLeftPosition, downRightPosition);
                    self.aaa(def);
                } else if(booleanDefL && booleanDefD){
                    def.push(downPosition, upLeftPosition, downRightPosition, downLeftPosition, leftPositionBro, downPositionBro);
                    self.aaa(def);
                } else if(booleanDefR && booleanDefD){
                    def.push(downPosition, upRightPosition, downLeftPosition, downRightPosition, rightPositionBro, downPositionBro);
                    self.aaa(def);
                } else if(booleanDefL){
                    def.push(upLeftPosition, downLeftPosition, leftPositionBro);
                    self.aaa(def);
                } else if(booleanDefR){
                    def.push(upRightPosition, rightPositionBro,  downRightPosition);
                    self.aaa(def);
                } else if(booleanDefD){
                    def.push(downPosition, downLeftPosition, downRightPosition, downPositionBro);
                    self.aaa(def);
                }
            break;
        }
        break;
    }
}
module.exports = checkCloseFields;
