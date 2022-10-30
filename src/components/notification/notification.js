import fs from "fs";
import "./notification.scss";

const notificationTemplate = fs.readFileSync(__dirname + "/notification.pug", "utf8");
const actionNotificationTemplate = fs.readFileSync(__dirname + "/actionNotification.pug", "utf-8");

const Notification = {
  notificationId: 0,
  aliveNotificatonId: [],
  actionId: 0,
  new: function (objectData) {
    Notification.actionId = 0;
    Notification.notificationId++;

    let time = objectData.time ? objectData.time : 5000;
    let style = objectData.style ? objectData.style : "default";
    
    let message = objectData.message
    if (message == "too-many-request") message = "Too many request passed ! Please try again after 15 min"
    at('notification').insertAdjacentHTML("beforeend", Pug.render(notificationTemplate, {
      notificationId: Notification.notificationId,
      message: message,
      notificationStyle: "notification-" + style
    }));

    let currentNotification = b('notification-' + Notification.notificationId);
    let closeButton = currentNotification.getElementsByClassName('notification-close-container')[0];
    closeButton.onclick = (e) => Notification.close(e);

    if (!objectData.stayingAlive) {
      Notification.aliveNotificatonId.push(Notification.notificationId);
      setTimeout(() => Notification.close(), time)
    }

    return {
      addAction: function (objectData) {
        let currentNotification = b('notification-' + Notification.notificationId);
        let closeIcon = currentNotification.getElementsByClassName("notification-close-container")[0];
        let count = -1;
        while(objectData[++count]){
          Notification.actionId++;
          closeIcon.insertAdjacentHTML("beforebegin", Pug.render(actionNotificationTemplate, {
            text: objectData[count].text,
            icon: objectData[count].icon,
            className: objectData[count].className,
            notificationId: Notification.actionId
          }));
          let action = currentNotification.getElementsByClassName('action-' + Notification.actionId)[0];
          let functionAction = objectData[count].action
          action.onclick = () => {
            functionAction();
            currentNotification.remove()
          }
        }
        return this;
      },
      cb: function(cb) {
        cb();
      }
    }
  },
  close: function (e) {
    let currentNotification;
    if (!e) {
      if(!Notification.aliveNotificatonId.length) return;
      currentNotification = b('notification-' + Notification.aliveNotificatonId[Notification.aliveNotificatonId.length - 1]);
      Notification.aliveNotificatonId.splice(Notification.aliveNotificatonId.length-1, 1);
    } else {
      const targetDiv = e.target.id ? e.target : e.target.closest(".notification-container");
      currentNotification = b(targetDiv.id);
      let aliveNotificationIndex = Notification.aliveNotificatonId.findIndex(el => el == targetDiv.id.replace('notification-', ""));
      if(aliveNotificationIndex != -1) Notification.aliveNotificatonId.splice(aliveNotificationIndex, 1);
    }
    currentNotification.remove();
    Notification.notificationId--;
  }
}

export default Notification;