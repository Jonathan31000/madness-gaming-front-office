import fs from "fs";
import "./loader.scss";

const loaderTemplate = fs.readFileSync(__dirname + "/loader.pug", "utf-8");

const Loader = {
  initFixed: function (size = 60) {
    at('loader').innerHTML = Pug.render(loaderTemplate, { type: "fixed" });
    let loader = af('loader');
    loader.style.width = size + "px";
    loader.style.height = size + "px";
  },
  initAppend: function (appendDiv, size = 60) {
    appendDiv.innerHTML = Pug.render(loaderTemplate, { type: "append" });
    let loader = af('loader');
    loader.style.width = size + "px";
    loader.style.height = size + "px";
  },
  end: function () {
    at('loader').innerHTML = "";
  }
}

export default Loader;