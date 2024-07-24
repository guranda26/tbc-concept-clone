document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector(".navbar");
  const headerContainer = document.querySelector(".header-container");

  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.classList.toggle("open");
    navbar.classList.toggle("show", isOpen);
    headerContainer.classList.toggle("active", isOpen);
    menuBtn.classList.toggle("active", isOpen);
  });
});
