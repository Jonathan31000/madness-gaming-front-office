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
  }
}

export default Header;