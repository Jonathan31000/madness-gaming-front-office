
// SIMPLE notification
Notification.new({
  message: "yo ca va bien ?",
  style: "success"
}) 

// ACTION notification with text button
function customD() {
  console.log("yooooo");
}
let actionsNotif = [
  {
    action: customD,
    text: "join the room ott e ses ru",
  }
];
Notification.new({
  message: "yo ca va bien ? alleu usrit ursitu tureit rstui rstui rsaueti alleu usrit ursitu tureit rstui rstui rsaueti alleu usrit ursitu tureit rstui rstui rsaueti alleu usrit ursitu tureit rstui rstui rsaueti",
  style: "error",
  stayingAlive: true
}).addAction(actionsNotif);


// ACTION notification with icon button
function customF() {
  console.log("ca marche");
}
let actionsNotif2 = [
  {
    action: customF,
    className: "image-camera-for-notification",
  },
];
Notification.new({
  message: "yo ca va bien ? alleu usrit ursitu tureit",
  style: "success",
  stayingAlive: true
}).addAction(actionsNotif2);