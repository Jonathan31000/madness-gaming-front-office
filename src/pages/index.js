import "../util/global-import";
import fs from "fs";
import header from "../components/header/header";
import Notification from "../components/notification/notification";
import Account from "../components/account/account";

document.addEventListener("DOMContentLoaded", () => {
  isConnected("user", (err) => {
    if(err) return console.error('not-access');
    const mainTemplate = fs.readFileSync(__dirname + "/main.pug", "utf-8");
    b('main-container').innerHTML = Pug.render(mainTemplate, { profile: Account.profile })
  })
})