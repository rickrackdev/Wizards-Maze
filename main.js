const prompt = require("prompt-sync")({ sigint: true });
const process = require("process");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  //construtor creates the field map, gives the player the initial position on index [0,0], and sets the x and y variables for the player movement.
  constructor(fieldArray) {
    this._fieldArray = fieldArray;
    this._xAxis = 0;
    this._yAxis = 0;
    this._fieldArray[this._yAxis][this._xAxis] = pathCharacter;
  }

  get fieldArray() {
    return this._fieldArray;
  }

  static generateField(fHeight, fWidth) {
    let mapArr = [fieldCharacter, hole];
    let randIdx;
    let newMap = [];

    for (let i = 0; i < fHeight; i++) {
      let newMapPiece = [];
      for (let j = 0; j < fWidth; j++) {
        randIdx = mapArr[Math.floor(Math.random() * mapArr.length)];
        newMapPiece.push(randIdx);
      }
      newMap.push(newMapPiece);
    }
    let randY = Math.floor(Math.random() * newMap.length);
    let randX = Math.floor(Math.random() * newMap[0].length);

    newMap[randY][randX] = hat;

    return newMap;
  }

  //prints the map field to console, converts the array raw data to string and joins the data removing the comma and adding a breakline per each line on the map field.
  print() {
    this._fieldArray.forEach((line) => {
      process.stdout.write(line.join(""));
      process.stdout.write("\n");
    });
  }
  //player movement method, gets an user input and depending on the direction adds or substracts the index value to move in each direction, then it replaces the previous position with the path character
  //that way it leaves a trail on where the player has been.
  movement(dir) {
    let newY = this._yAxis;
    let newX = this._xAxis;
    //gets the new player position.
    if (dir === "r") {
      newX++;
    } else if (dir === "l") {
      newX--;
    } else if (dir === "u") {
      newY--;
    } else if (dir === "d") {
      newY++;
    }
    //check if the new position is out of bounds.
    if (
      newY < 0 ||
      newY >= this._fieldArray.length ||
      newX < 0 ||
      newX >= this._fieldArray[0].length
    ) {
      process.stdout.write(`Out of bounds, try again!\n`);
      process.exit();
    }
    //updates player position and marks the map.
    this._xAxis = newX;
    this._yAxis = newY;
    this._fieldArray[this._yAxis][this._xAxis] = pathCharacter;
  }

  charPos(character) {
    let coordArr = [];
    for (let i = 0; i < this._fieldArray.length; i++) {
      for (let j = 0; j < this._fieldArray[i].length; j++) {
        if (this._fieldArray[i][j] === character) {
          coordArr.push([i, j]);
        }
      }
    }
    return coordArr;
  }

  //working but missing player out of bounds
  playerStatus(winCoordinate, loseCoordinate) {
    let playerPos = [this._yAxis, this._xAxis];
    for (let coordinate of loseCoordinate) {
      if (playerPos.toString() === coordinate.toString()) {
        return false;
      }
    }
    if (playerPos.toString() === winCoordinate[0].toString()) {
      return true;
    }
    return null;
  }
  //we loop the game while the user hasn't won/lost, once the user wins/loses we print a winner/loser message, it takes the hatPosition and holePosition as parameters to be given to the playerStatus call.
  game(w, l) {
    do {
      let userIn = prompt(`Your move:`).toLowerCase();
      this.movement(userIn);
      this.print();
    } while (this.playerStatus(w, l) === null);
    if (this.playerStatus(w, l) === true) {
      process.stdout.write("You escaped the maze, congratulations!");
    } else if (this.playerStatus(w, l) === false) {
      process.stdout.write(
        "Oh no!, you fell down a hole, good luck next time!"
      );
    }
  }
}

let testField = new Field(Field.generateField(5, 5));
const hatPos = testField.charPos(hat);
const holePos = testField.charPos(hole);
testField.print();
testField.game(hatPos, holePos);
