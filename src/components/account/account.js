import "../../util/global-import";
import Modal from "../modal/modal";
import fs from "fs";
import Notification from "../notification/notification";

const Account = {
  isConnected: false,
  profile: {},
  login: function (type = "web") {
    const loginTemplate = fs.readFileSync(__dirname + "/login.pug", "utf-8");
    let modalProperty = { width: 30, closable: false, single: false }
    let title = "Login into you account !";
    if(type == "haptagram") {
      modalProperty = { width: 30}
      title = "Login into you Haptagram App account !"
    }
    Modal.add(Pug.render(loginTemplate, { type, title }), modalProperty);
  },
  register: function () {
    const registerTemplate = fs.readFileSync(__dirname + "/register.pug", "utf-8");
    Modal.add(Pug.render(registerTemplate, {}), { width: 30, single: false});
  },
  forgotPassword: function () {
    const forgotPasswordTemplate = fs.readFileSync(__dirname + "/forgotPassword.pug", "utf-8");
    Modal.add(Pug.render(forgotPasswordTemplate, {}));
  },
  resetPassword: function () {
    const resetPasswordTemplate = fs.readFileSync(__dirname + "/resetPassword.pug", "utf-8");
    Modal.add(Pug.render(resetPasswordTemplate, {}));
  },

  /*
    EVENTS
  */
  events: {
    login: {
      loginWebAccount: async function (e) {
        e.preventDefault();
        let data = getBodyFromFormData(b('login-form'));
        let [errLogAccount, loggedAccount] = await asyncPromise(request({
          method: "POST",
          url: BACKEND_URL + "/account/auth/login",
          body: data,
          parse: true
        }))
        if (errLogAccount) return Notification.new({
          message: errLogAccount.error,
          style: "error"
        })

        localStorage.setItem("account", JSON.stringify(loggedAccount));

        location.href = "/";
      },
      loginHaptagramAccount: async function (e) {
        e.preventDefault();
        let data = getBodyFromFormData(b('login-form'));
        let [errLogAccount, loggedAccount] = await asyncPromise(request({
          method: "POST",
          url: BACKEND_URL + "/externals/haptagramApp/auth/login",
          body: data,
          parse: true
        }))
        if (errLogAccount) return Notification.new({
          message: errLogAccount.error,
          style: "error"
        })

        // Get the existing data
        let accountItem = localStorage.getItem('account');
        accountItem = accountItem ? JSON.parse(accountItem) : {};
        accountItem.linkedAccountId = loggedAccount.user_uid;
        accountItem.haptagram = loggedAccount;

        localStorage.setItem("account", JSON.stringify(accountItem));

        location.reload();
      },
      redirectToRegisterModal: function () {
        Account.register();
      }
    },
    register: {
      registerAccount: async function (e) {
        e.preventDefault();
        let data = getBodyFromFormData(b('register-form'));
        let [errRegisterAccount, registeredAccount] = await asyncPromise(request({
          method: "POST",
          url: BACKEND_URL + "/account/auth/register",
          body: data,
          parse: true
        }))
        if (errRegisterAccount) return Notification.new({
          message: errRegisterAccount.error,
          style: "error"
        })

        localStorage.setItem("account", JSON.stringify(registeredAccount));

        location.href = "/";
      }
    },
    forgotPassword: {
      forgotPasswordAccount: async function () {
        console.log('clicked');
      }
    },
    resetPassword: {
      resetPasswordAccount: async function () {
        console.log('clicked');
      }
    },
    logoutWeb: async function () {
      let [errLogout, logout] = await asyncPromise(request({
        url: BACKEND_URL + "/account/auth/logout"
      }))
      if (errLogout) return Notification.new({
        message: "Logout error",
        style: "error"
      })
      console.log('la')

      Account.profile = {};
      localStorage.removeItem("account");
      window.location.href = "/";
    },
    logoutHaptagram: async function () {
      let [errLogout, logout] = await asyncPromise(request({
        url: BACKEND_URL + "/externals/haptagramApp/auth/logout"
      }))
      if (errLogout) return Notification.new({
        message: "Logout error",
        style: "error"
      })

      Notification.new({
        message: "Logout from Haptagram App",
        style: "success"
      })

      // Get the existing data
      let accountItem = localStorage.getItem('account');
      accountItem = accountItem ? JSON.parse(accountItem) : {};
      accountItem.linkedAccountId = undefined;
      accountItem.haptagram = undefined;

      localStorage.setItem("account", JSON.stringify(accountItem));

      location.reload();
    }
  }
};

window.Account = Account;
export default Account;