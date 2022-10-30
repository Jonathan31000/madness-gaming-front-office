import Notification from "../components/notification/notification";

function transformError(err, message, isSuffixe = true) {
  let prefixeOrsuffixe;
  if (isSuffixe) prefixeOrsuffixe = "suffixe"
  else prefixeOrsuffixe = "prefixe"

  let availableError = [
    {
      error: "error-find",
      prefixe: message + " ,an error occured",
      suffixe: "An error occured, impossible to find " + message,
    },
    {
      error: "undefined-find",
      //TODO: must change message
      prefixe: message + " ,an error occured",
      suffixe: "An error occured, impossible to find " + message,
    },
    {
      error: "error-save",
      //TODO: must change message
      prefixe: message + " ,an error occured",
      suffixe: "An error occured, impossible to find " + message,
    },
    {
      error: "error-save-session",
      //TODO: must change message
      prefixe: message + " ,an error occured",
      suffixe: "An error occured, impossible to find " + message,
    }
  ];

  let error = availableError.find(el => el.error == err);
  if (!error) return Notification.new({
    style: "error",
    message: err + " is not a defined error"
  })

  return error[prefixeOrsuffixe];
}

export default transformError;