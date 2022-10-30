import fs from "fs";
import "./modal.scss";

const modalTemplate = fs.readFileSync(__dirname + "/modal.pug", "utf8");

const Modal = {
  modalId: 0,
  add: function (modalView, modalProperty = {width: 50, maxHeight: 80, single: true, img: "", closable: true}) {
    //default value
    modalProperty.width = typeof modalProperty.width !== "undefined" ? modalProperty.width : 50;
    modalProperty.maxHeight = typeof modalProperty.maxHeight !== "undefined" ? modalProperty.maxHeight : 80;
    modalProperty.single = typeof modalProperty.single !== "undefined" ? modalProperty.single : true;
    modalProperty.img = typeof modalProperty.img !== "undefined" ? modalProperty.img : "";
    modalProperty.closable = typeof modalProperty.closable !== "undefined" ? modalProperty.closable : true;

    let currentModal = b("modal-main-container-" + Modal.modalId);
    if (currentModal) currentModal.style.display = "none";
    Modal.modalId++;
    if (!modalProperty.single) at('modal').insertAdjacentHTML("beforeend", Pug.render(modalTemplate, { modalId: Modal.modalId, isClosable: modalProperty.closable }));
    else at('modal').innerHTML = Pug.render(modalTemplate, { modalId: Modal.modalId, isClosable: modalProperty.closable });

    currentModal = b("modal-main-container-" + Modal.modalId);
    let currentModalContentContainer = currentModal.getElementsByClassName('modal-content-container')[0];
    currentModalContentContainer.style.width = modalProperty.width + "%";
    currentModalContentContainer.style.maxHeight = modalProperty.maxHeight + "%";
    let currentModalContent = currentModal.getElementsByClassName('modal-content')[0];
    currentModalContent.innerHTML = modalView;

    if (modalProperty.closable) {
      let overlay = currentModal.getElementsByClassName('overlay')[0];
      let iconClose = currentModal.getElementsByClassName('modal-close-icon')[0];
      overlay.onclick = () => Modal.close();
      iconClose.onclick = () => Modal.close();
    }
  },
  close: function () {
    let currentModal = b("modal-main-container-" + Modal.modalId);
    currentModal.outerHTML = "";
    Modal.modalId--;
    let previousModal = b("modal-main-container-" + Modal.modalId);
    if (previousModal) previousModal.style.display = "block";
  }
}

export default Modal;