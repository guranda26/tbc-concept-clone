import { addListItem } from "./modules/addListItem.js";
import { handleDots } from "./modules/handleDots.js";
import { initializeDropdownToggle } from "./modules/initDropdown.js";
import { openModal, closeModal } from "./modules/handleModalShow.js";

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const headerContainer = document.querySelector(".header-container");
  const sections = document.querySelectorAll("section");
  const footerSection = document.querySelector(".footer-section");

  let menuIsOpen = false;

  const normalImageColor = "##555f62";
  const hoverImageColor = "#555f62";
  const defaultNextColor = "#00f";

  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.classList.toggle("open");
    menuBtn.classList.toggle("active", isOpen);
  });

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = !menuIsOpen;
      menuIsOpen = isOpen;

      headerContainer.classList.toggle("active", isOpen);
      menuBtn.classList.toggle("active", isOpen);

      if (isOpen) {
        const footerClone = footerSection.cloneNode(true);
        headerContainer.appendChild(footerClone);

        const clonedProductsList = footerClone.querySelector(".products-item");
        const clonedServicesLists =
          footerClone.querySelectorAll(".services-list");

        const productListItem = addListItem(
          "https://tbcconcept.ge/ge/products/kits",
          "პროდუქტების მიმოხილვა"
        );
        const offerListItem = addListItem(
          "https://tbcconcept.ge/ge/lifestyle/overview",
          "მიმოხილვა"
        );
        const firstConceptListItem = addListItem(
          "https://tbcconcept.ge/ge/concept-space/overview",
          "მიმოხილვა"
        );
        const lastConceptListItem = addListItem(
          "https://tbcconcept.ge/ge/concept-space/concept-branches",
          "კონცეპტ ფილიალები"
        );

        if (clonedProductsList) clonedProductsList.prepend(productListItem);
        if (clonedServicesLists[1])
          clonedServicesLists[1].prepend(offerListItem);
        if (clonedServicesLists[2]) {
          clonedServicesLists[2].prepend(firstConceptListItem);
          clonedServicesLists[2].append(lastConceptListItem);
        }

        const dropdownLinks = footerClone.querySelectorAll(".dropwodn-menu a");
        if (dropdownLinks.length > 1) {
          const updateTitle = dropdownLinks[1];
          updateTitle.textContent = "შეთავაზებები";
        }

        clonedServicesLists.forEach((list) => {
          const serviceItems = list.querySelectorAll("li");
          serviceItems.forEach((item) => {
            const link = item.querySelector("a");
            if (link) {
              link.classList.add("service-link");
            }
          });
        });

        sections.forEach((section) => {
          section.style.display = "none";
        });

        footerSection.style.display = "none";

        initializeDropdownToggle(footerSection);
        initializeDropdownToggle(footerClone);
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
    });
  }

  initializeDropdownToggle(footerSection);

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

        if (scrollbarSlider) {
          scrollbarSlider.style.display = maxScrollLeft > 0 ? "block" : "none";
        }

        if (maxScrollLeft <= 0) {
          nextSlide.style.display = "none";
          prevSlide.style.display = "none";
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
  handleDots();

  const modalPrivacy = document.getElementById("modalPrivacy");
  const modalRules = document.getElementById("modalRules");

  const btnPrivacy = document.getElementById("privacy");
  const btnRules = document.getElementById("rules");

  const closeButtons = document.querySelectorAll(".close");

  btnPrivacy.onclick = function () {
    openModal(modalPrivacy);
  };

  btnRules.onclick = function () {
    openModal(modalRules);
  };

  closeButtons.forEach((closeButton) => {
    closeButton.onclick = function () {
      const modal = this.closest(".modal");
      closeModal(modal);
    };
  });

  window.onclick = function (event) {
    if (event.target === modalPrivacy) {
      closeModal(modalPrivacy);
    } else if (event.target === modalRules) {
      closeModal(modalRules);
    }
  };
});
