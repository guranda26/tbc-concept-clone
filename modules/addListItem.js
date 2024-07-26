export const addListItem = (hrefLink, text) => {
  const el = document.createElement("li");
  const link = document.createElement("a");
  link.setAttribute("href", hrefLink);
  link.textContent = text;
  el.appendChild(link);
  return el;
};
