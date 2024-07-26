import { toggleIcons } from "./toggleIcons.js";
export function initializeDropdownToggle(parentElement) {
  const services = parentElement.querySelectorAll(".services");

  services.forEach((service) => {
    const dropdownMenu = service.querySelector(".dropwodn-menu");
    const downIcon = service.querySelector(".down");
    const upIcon = service.querySelector(".up");
    const servicesList = service.querySelector(".services-list");

    if (!dropdownMenu || !downIcon || !upIcon || !servicesList) {
      console.warn("Required elements not found in .services");
      return;
    }

    upIcon.style.display = "none";

    const dropdownIcons = service.querySelectorAll(".dropdown-icon");
    dropdownIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleIcons(downIcon, upIcon, servicesList);
      });
    });

    dropdownMenu.addEventListener("click", (event) => {
      if (!event.target.classList.contains("dropdown-icon")) {
        servicesList.classList.toggle("active");
        toggleIcons(downIcon, upIcon, servicesList);
      }
    });
  });
}
