const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
  html2canvas(document.getElementById("captureArea")).then(canvas => {

    const link = document.createElement("a");

    link.download = "our-love-story.png";
    link.href = canvas.toDataURL();

    link.click();
  });
});