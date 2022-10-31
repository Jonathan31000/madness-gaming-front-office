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

//tab = ["1-2", "2-1", ...];

function checkWin(){
  winPatern.map(el => {
    let win = 0;
    el.map(elem => {
      if(Morpion.player1.indexOf(elem) != -1) win++;
      if(win == 3) return console.log('WIN!!');
    })
  })
}
const winPatern = [
  ["0-0", "0-1", "0-2"],
  ["1-0","1-1","1-2"],
  ["2-0","2-1","2-2"],
  ["0-0","1-0","2-0"],
  ["0-1", "1-1", "2-1"],
  ["0-2", "1-2", "2-2"],
  ["0-0","1-1","2-2"],
  ["0-2","1-1","2-0"]
]


let Morpion = {
  player1 : [],
  rowDraw : function(id){
    b(id).style.backgroundColor = "black";
    Morpion.player1.push(id);
    checkWin();
  }
}


window.Morpion = Morpion;