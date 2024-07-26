export function openModal(modal) {
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

export function closeModal(modal) {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 400);
}
