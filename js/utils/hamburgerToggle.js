export function initHamburgerToggle(buttonSelector, menuSelector) {
    const button = document.querySelector(buttonSelector);
    const menu = document.querySelector(menuSelector);
  
    if (!button) return;
  
    button.addEventListener("click", () => {
      button.classList.toggle("open");
  
      if (menu) {
        menu.classList.toggle("translate-x-full");
        menu.classList.toggle("translate-x-0");
      }
    });
}  