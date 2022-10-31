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

function checkWin(){
  Morpion.player1
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
  }
}


window.Morpion = Morpion;