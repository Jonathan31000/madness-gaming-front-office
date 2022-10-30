import Account from "../components/account/account";
import Header from "../components/header/header";
import Notification from "../components/notification/notification";

const userRole = {
  'super-admin': 0,
  'admin': 1,
  'creator': 2,
  'user': 3
};

function convertRoleToInt(role) {
  return parseInt(userRole[role]);
}

function isConnected(role, cb) {
  let account = localStorage.getItem('account');
  if (!account) return Account.login();
  account = JSON.parse(account);
  Account.profile = account;
  if (!role){  
    Header.render(Account.profile);
    return cb(false);
  }
  else {
    if (typeof userRole[role] != "number") return Notification.new({
      style: "error",
      message: role + " is not a role defined !"
    })
    if (convertRoleToInt(Account.profile.role) > convertRoleToInt(role)) {
      Notification.new({
        style: "error",
        message: "You do not have access rights !"
      })
      Header.render(false);
      return cb(true);
    }
    else {
      Header.render(Account.profile);
      return cb(false);
    }
  }
}

export default isConnected;
