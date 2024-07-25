document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector(".navbar");
  const headerContainer = document.querySelector(".header-container");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = menuBtn.classList.toggle("open");
      navbar.classList.toggle("show", isOpen);
      headerContainer.classList.toggle("active", isOpen);
      menuBtn.classList.toggle("active", isOpen);
    });
  }

  const hoverImageColor = "#182cc0";
  const normalImageColor = "#a5aaac";
  const defaultNextColor = "#182cc0";

  const changeIconColor = (iconElement, color) => {
    if (iconElement) {
      iconElement.style.color = color;
    }
  };

  const prevSlide = document.querySelector(".prev");
  const nextSlide = document.querySelector(".next");

  if (prevSlide && prevSlide.parentElement) {
    prevSlide.parentElement.addEventListener("mouseenter", () =>
      changeIconColor(prevSlide, hoverImageColor)
    );
    prevSlide.parentElement.addEventListener("mouseleave", () =>
      changeIconColor(prevSlide, normalImageColor)
    );
  }

  if (nextSlide && nextSlide.parentElement) {
    nextSlide.parentElement.addEventListener("mouseenter", () =>
      changeIconColor(nextSlide, normalImageColor)
    );
    nextSlide.parentElement.addEventListener("mouseleave", () =>
      changeIconColor(nextSlide, defaultNextColor)
    );
  }

  // const initSlider = () => {
  //   const slideBtns = document.querySelectorAll(".slide");
  //   const imageList = document.querySelector(".image-list");
  //   const scrollbarSlider = document.querySelector(".scrollbar");
  //   const scrollbarThumb = scrollbarSlider.querySelector(".scrollbar-thumb");

  //   const style = getComputedStyle(imageList);
  //   const columnGap = parseInt(style.columnGap, 10) || 0;

  //   const updateButtonStates = () => {
  //     const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  //     const canScrollLeft = imageList.scrollLeft > 0;
  //     const canScrollRight = imageList.scrollLeft < maxScrollLeft;

  //     if (prevSlide) {
  //       prevSlide.style.color = canScrollLeft
  //         ? hoverImageColor
  //         : normalImageColor;
  //       prevSlide.disabled = !canScrollLeft;
  //     }
  //     if (nextSlide) {
  //       nextSlide.style.color = canScrollRight
  //         ? normalImageColor
  //         : defaultNextColor;
  //       nextSlide.disabled = !canScrollRight;
  //     }
  //   };

  //   const updateThumbPosition = () => {
  //     const scrollPosition = imageList.scrollLeft;
  //     const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  //     const thumbWidth = scrollbarThumb.offsetWidth;
  //     const thumbPosition =
  //       (scrollPosition / maxScrollLeft) *
  //       (scrollbarSlider.clientWidth - thumbWidth);
  //     scrollbarThumb.style.left = `${thumbPosition}px`;

  //     updateButtonStates();
  //   };

  //   updateButtonStates();

  //   if (scrollbarThumb) {
  //     let isDragging = false;
  //     let startX;
  //     let scrollLeft;

  //     scrollbarThumb.addEventListener("mousedown", (e) => {
  //       e.preventDefault();
  //       isDragging = true;
  //       startX = e.clientX;
  //       scrollLeft = imageList.scrollLeft;
  //     });

  //     document.addEventListener("mousemove", (e) => {
  //       if (!isDragging) return;
  //       const x = e.clientX;
  //       const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  //       const thumbWidth = scrollbarThumb.offsetWidth;
  //       const sliderWidth = scrollbarSlider.clientWidth;
  //       const scrollAmount =
  //         (x - startX) * (maxScrollLeft / (sliderWidth - thumbWidth));
  //       imageList.scrollLeft = scrollLeft + scrollAmount;
  //       updateThumbPosition();
  //     });

  //     document.addEventListener("mouseup", () => {
  //       isDragging = false;
  //     });
  //   }

  //   slideBtns.forEach((button) => {
  //     button.addEventListener("click", () => {
  //       const slideDirection = button.id === "prev-slide" ? -1 : 1;
  //       const imageWrapper = document.querySelector(".img-wrapper");
  //       const imageWrapperWidth = imageWrapper ? imageWrapper.offsetWidth : 0;
  //       const scrollAmount = imageWrapperWidth + columnGap;
  //       imageList.scrollBy({
  //         left: scrollAmount * slideDirection,
  //         behavior: "smooth",
  //       });

  //       updateButtonStates();
  //       updateThumbPosition();
  //     });
  //   });

  //   imageList.addEventListener("scroll", updateThumbPosition);
  // };

  // initSlider();

  const initSliders = () => {
    const sections = document.querySelectorAll(".offers");

    sections.forEach((section) => {
      const slideBtns = section.querySelectorAll(".slide");
      const imageList = section.querySelector(".image-list");
      const scrollbarSlider = section.querySelector(".scrollbar");
      const scrollbarThumb = scrollbarSlider
        ? scrollbarSlider.querySelector(".scrollbar-thumb")
        : null;

      const style = getComputedStyle(imageList);
      const columnGap = parseInt(style.columnGap, 10) || 0;

      const updateButtonStates = () => {
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        const canScrollLeft = imageList.scrollLeft > 0;
        const canScrollRight = imageList.scrollLeft < maxScrollLeft;

        const prevSlide = section.querySelector(".prev");
        const nextSlide = section.querySelector(".next");

        if (prevSlide) {
          prevSlide.style.color = canScrollLeft
            ? hoverImageColor
            : normalImageColor;
          prevSlide.disabled = !canScrollLeft;
        }
        if (nextSlide) {
          nextSlide.style.color = canScrollRight
            ? normalImageColor
            : defaultNextColor;
          nextSlide.disabled = !canScrollRight;
        }
      };

      const updateThumbPosition = () => {
        if (!scrollbarThumb) return;

        const scrollPosition = imageList.scrollLeft;
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        const thumbWidth = scrollbarThumb.offsetWidth;
        const thumbPosition =
          (scrollPosition / maxScrollLeft) *
          (scrollbarSlider.clientWidth - thumbWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;

        updateButtonStates();
      };

      updateButtonStates();

      if (scrollbarThumb) {
        let isDragging = false;
        let startX;
        let scrollLeft;

        scrollbarThumb.addEventListener("mousedown", (e) => {
          e.preventDefault();
          isDragging = true;
          startX = e.clientX;
          scrollLeft = imageList.scrollLeft;
        });

        document.addEventListener("mousemove", (e) => {
          if (!isDragging) return;
          const x = e.clientX;
          const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
          const thumbWidth = scrollbarThumb.offsetWidth;
          const sliderWidth = scrollbarSlider.clientWidth;
          const scrollAmount =
            (x - startX) * (maxScrollLeft / (sliderWidth - thumbWidth));
          imageList.scrollLeft = scrollLeft + scrollAmount;
          updateThumbPosition();
        });

        document.addEventListener("mouseup", () => {
          isDragging = false;
        });
      }

      slideBtns.forEach((button) => {
        button.addEventListener("click", () => {
          const slideDirection = button.id === "prev-slide" ? -1 : 1;
          const imageWrapper = section.querySelector(".img-wrapper");
          const imageWrapperWidth = imageWrapper ? imageWrapper.offsetWidth : 0;
          const scrollAmount = imageWrapperWidth + columnGap;
          imageList.scrollBy({
            left: scrollAmount * slideDirection,
            behavior: "smooth",
          });

          updateButtonStates();
          updateThumbPosition();
        });
      });

      imageList.addEventListener("scroll", updateThumbPosition);
    });
  };

  initSliders();

  const handleDots = () => {
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

  // Call the function to update the text
  handleDots();
});
