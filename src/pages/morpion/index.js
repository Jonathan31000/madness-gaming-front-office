import "../../util/global-import";
import fs from "fs";
import header from "../../components/header/header";
import Notification from "../../components/notification/notification";
import Account from "../../components/account/account";

document.addEventListener("DOMContentLoaded", () => {
  isConnected("user", (err) => {
    if (err) return console.error('not-access');
    const morpionTemplate = fs.readFileSync(__dirname + "/main.pug", "utf-8");
    b('main-container').innerHTML = Pug.render(morpionTemplate, { profile: Account.profile })
  })
})

let Morpion = {
  user: [],
  computer: [],
  drawUserCase: function (id) {
    b(id).style.backgroundColor = "black";
    Morpion.user.push(id);
    if(!checkWin()) drawComputerCase();
  },
}
window.Morpion = Morpion;

function drawComputerCase() {
  let randomCase = "";
  let availablePattern;
  winPatern.map(elem => {
    availablePattern = winPatern.filter(el => !Morpion.user.includes(elem));
  })
  console.log(availablePattern);
  console.log(availablePattern.length);
  b(randomCase).style.backgroundColor = "blue";
  Morpion.computer.push(randomCase);
}

const winPatern = [
  ["0-0", "0-1", "0-2"],
  ["1-0", "1-1", "1-2"],
  ["2-0", "2-1", "2-2"],
  ["0-0", "1-0", "2-0"],
  ["0-1", "1-1", "2-1"],
  ["0-2", "1-2", "2-2"],
  ["0-0", "1-1", "2-2"],
  ["0-2", "1-1", "2-0"]
]

function checkWin() {
  let isWin = false;
  winPatern.map(el => {
    let win = 0;
    el.map(elem => {
      if (Morpion.user.indexOf(elem) != -1) win++;
      if (win == 3) isWin = true;
    })
  })
  return isWin;
}

// function winPattern2(){
//   let winPatternTab = [];
//   let row = -1;
//   let arrayDiag = [];
//   let maxCase = 2;
//   while (++row <= maxCase) {
//     let col = -1;
//     let arrayRow= [];
//     let arrayCol= [];
//     while (++col <= maxCase) {
//       //["0-0","1-1","2-2"],
//       //["0-2", "1-1", "2-0"]
//       arrayRow.push(`${row}-${col}`);
//       arrayCol.push(`${col}-${row}`);
//       if(row == col) {
//         arrayDiag.push(`${col}-${row}`);
//       }

//       if(row == maxCase) {
//         arrayDiag.push(`${col}-${maxCase}`);
//       }

//     }
//     winPatternTab.push(arrayRow);
//     winPatternTab.push(arrayCol);
//   }
//   winPatternTab.push(arrayDiag);
//   return winPatternTab;
// }

// console.log(winPattern2());
