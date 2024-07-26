export function toggleIcons(downIcon, upIcon, servicesList) {
  if (downIcon.style.display === "none") {
    downIcon.style.display = "block";
    upIcon.style.display = "none";
    servicesList.classList.remove("active");
  } else {
    downIcon.style.display = "none";
    upIcon.style.display = "block";
    servicesList.classList.add("active");
  }
}
