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
    this._playerPos = this._fieldArray[0][0];
    this._xAxis = 0;
    this._yAxis = 0;
  }

  get fieldArray() {
    return this._fieldArray;
  }

  get playerPos() {
    return this._playerPos;
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
    if (dir === "r") {
      this._fieldArray[this._yAxis][this._xAxis] = pathCharacter;
      this._playerPos = this._fieldArray[this._yAxis][this._xAxis++];
    } else if (dir === "l") {
      this._fieldArray[this._yAxis][this._xAxis] = pathCharacter;
      this._playerPos = this._fieldArray[this._yAxis][this._xAxis--];
    } else if (dir === "u") {
      this._fieldArray[this._yAxis][this._xAxis] = pathCharacter;
      this._playerPos = this._fieldArray[this._yAxis--][this._xAxis];
    } else if (dir === "d") {
      this._fieldArray[this._yAxis][this._xAxis] = pathCharacter;
      this._playerPos = this._fieldArray[this._yAxis++][this._xAxis];
    }
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

  //not working yet
  playerStatus(winPos) {
    winPos.forEach((position) => {
      if (this.playerPos === position) {
        process.stdout.write("Congrats");
        return true;
      }
    });
  }
}

//test instance for the map field
let testField = new Field([
  [pathCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter, fieldCharacter, hole],
  [hole, fieldCharacter, fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter, fieldCharacter, hole],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole],
  [hole, fieldCharacter, fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter],
  [hole, fieldCharacter, fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole],
]);

//using the helper function to find the position of the hat
const hatPos = testField.charPos("^");
console.log(hatPos);
//initial player position
//let playerPos = testField.fieldArray[0][0];

console.log(
  "Welcome to our maze, you are trapped in order to get out you need to find a magical hat."
);
console.log("Avoid holes and be careful not to step out of the field.");
console.log(
  "Choose wich direction you want to go by typing: 'U' = up, 'L' = left, 'R' = right, 'D' = down."
);
console.log(
  "=================================================================================="
);

testField.print();
//asking user for input
//let userIn = prompt(`Your move:`).toLowerCase();

/* while (testField.playerPos != testField.fieldArray[hatPos[0]][hatPos[1]]) {
  let userIn = prompt(`Your move:`).toLowerCase();
  testField.movement(userIn);
  testField.print();
} */

do {
  let userIn = prompt(`Your move:`).toLowerCase();
  testField.movement(userIn);
  testField.print();
} while (!testField.playerStatus(hatPos));
