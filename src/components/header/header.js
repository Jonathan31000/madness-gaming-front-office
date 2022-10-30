import fs from "fs";
import "./styles.scss";

const Header = {
  render: function (profile) {
    let headerTemplate = fs.readFileSync(__dirname + "/header.pug", "utf-8");
    at("header").innerHTML = Pug.render(headerTemplate, { profile });
    let allLinks = a('action-nav-item');
    let count = -1;
    while (allLinks[++count]) {
      if (allLinks[count].href && window.location.pathname != "/") {
        let linkHref = allLinks[count].href.replace(window.location.origin, "");
        if (linkHref != "/" && window.location.pathname.indexOf(linkHref) != -1) {
          allLinks[count].parentNode.classList.add("active-nav");
        }
      }
    }
    af("close-navigation-header").onclick = function() {
      b('main-container').style.marginLeft = "2%";
      af('brand').style.display = "none";
      af('nav').style.display = "none";
      at('header').style.width = "2%"
      af("close-navigation-header").style.display = "none";
      af("open-navigation-header").style.display = "block";
      af('header-container').style.justifyContent = "center";
    }
    af("open-navigation-header").onclick = function () {
      b('main-container').style.marginLeft = "15%";
      af('brand').style.display = "block";
      af('nav').style.display = "block";
      at('header').style.width = "15%"
      af("close-navigation-header").style.display = "block";
      af("open-navigation-header").style.display = "none";
      af('header-container').style.justifyContent = "start";
    }
  }
}

export default Header;