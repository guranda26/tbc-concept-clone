export const handleDots = () => {
  const paragraphs = document.querySelectorAll(".cropped-text, .croppedText");
  const maxLength = 196;

  const getPlainText = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  const cropPlainText = (plainText, maxLength) => {
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };

  const getCroppedHTML = (htmlContent, croppedText) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;

    const walker = document.createTreeWalker(
      div,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    let currentIndex = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const remainingLength = croppedText.length - currentIndex;

      if (remainingLength <= 0) {
        node.textContent = "";
      } else if (node.textContent.length > remainingLength) {
        node.textContent = croppedText.substring(
          currentIndex,
          currentIndex + remainingLength
        );
      }

      currentIndex += node.textContent.length;
    }

    return div.innerHTML;
  };

  paragraphs.forEach((paragraph) => {
    const originalHTML = paragraph.innerHTML;
    const originalPlainText = getPlainText(originalHTML);
    const croppedPlainText = cropPlainText(originalPlainText, maxLength);
    paragraph.innerHTML = getCroppedHTML(originalHTML, croppedPlainText);
  });
};
