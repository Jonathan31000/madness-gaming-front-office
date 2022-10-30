import "regenerator-runtime/runtime.js"; // for asyn await with parcel
import "../../env";
import request from "../util/request";
import pug from "pug";
import Modal from "../components/modal/modal";
import Loader from "../components/loader/loader";
import isConnected from "./isConneted";
import transformError from "./transforError";

window.Pug = pug;
window.Modal = Modal;
window.Loader = Loader;
window.myRequest = request;
window.isConnected = isConnected;
window.transformError = transformError;

window.b = function (idElem) {
  return document.getElementById(idElem);
};
window.af = function (className) {
  return document.getElementsByClassName(className)[0];
};
window.a = function (className) {
  return document.getElementsByClassName(className);
};
window.at = function (className) {
  return document.getElementsByTagName(className)[0];
};
window.an = function (className) {
  return document.getElementsByName(className);
};

window.asyncPromise = promise =>
  promise
    .then(data => ([false, data]))
    .catch(error => Promise.resolve([error, false]));

window.getBodyFromFormData = form => {
  const formData = new FormData(form);
  const body = {};
  for (var pair of formData.entries()) {
    if (pair[1] !== "") body[pair[0]] = pair[1];
  }
  return body;
};