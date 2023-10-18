"use strict";

// QR code api template : http(s)://api.qrserver.com/v1/create-qr-code/?data=[URL-encoded-text]&size=[pixels]x[pixels]

let $ = document;
let qrPicWrapper = $.querySelector(".qr-pic-wrapper");
let qrPic = $.querySelector(".qr-pic");
let qr_input = $.querySelector(".qr-input");
let generateBtn = $.querySelector(".generate-btn");
let downloadBtn = $.querySelector(".download-btn");
let urlDownload = null;

function qrCodeGenerator() {
  let text = qr_input.value;
  if (text) {
    downloadBtn.classList.add("enable-btn");
    qrPicWrapper.classList.add("show-qr-pic");
    downloadBtn.removeAttribute("disabled", true);
    urlDownload = `http://api.qrserver.com/v1/create-qr-code/?data=${text}&size=200x200`;
    qrPic.src = `http://api.qrserver.com/v1/create-qr-code/?data=${text}&size=200x200`;
    qr_input.value = "";
  } else {
    downloadBtn.setAttribute("disabled", false);
  }
}

generateBtn.addEventListener("click", (event) => {
  qrCodeGenerator();
});
qr_input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    qrCodeGenerator();
  }
});

downloadBtn.addEventListener("click", async () => {
  try {
    let response = await fetch(urlDownload);
    let file = await response.blob();
    let link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = new Date().getTime();
    link.click();
  } catch (error) {
    alert("Faild to download the file ! ");
  }
});
