(function () {
  "use strict";

  const link = document.querySelector(".portfolio-studies-link");
  const column = link && link.closest(".content-column");
  const grid = column && column.querySelector(".grid");
  if (!grid) return;

  let frame = 0;

  function positionLink() {
    frame = 0;
    const cards = Array.from(grid.querySelectorAll(".masonry-item > .box-masonry"))
      .map(card => card.getBoundingClientRect())
      .filter(rect => rect.width > 0 && rect.height > 0);
    if (!cards.length) return;

    const rightEdge = Math.max(...cards.map(rect => rect.right));
    const lastCard = cards
      .filter(rect => Math.abs(rect.right - rightEdge) < 2)
      .reduce((last, rect) => rect.bottom > last.bottom ? rect : last);
    const columnRect = column.getBoundingClientRect();

    link.style.setProperty("--portfolio-studies-card-bottom",
      (lastCard.bottom - columnRect.top - column.clientTop + column.scrollTop) + "px");
    link.style.setProperty("--portfolio-studies-right",
      (columnRect.left + column.clientLeft + column.clientWidth - lastCard.right) + "px");
    link.style.setProperty("--portfolio-studies-width", lastCard.width + "px");
    link.classList.add("is-positioned");

    // Reserve space only when the link extends beyond the tallest column.
    const bottomMargin = parseFloat(window.getComputedStyle(link).marginBottom) || 0;
    const clearance = Math.max(0, Math.ceil(
      link.getBoundingClientRect().bottom + bottomMargin - grid.getBoundingClientRect().bottom));
    grid.style.setProperty("--portfolio-studies-clearance", clearance + "px");
    grid.classList.add("has-portfolio-studies");
  }

  function schedulePosition() {
    if (!frame) frame = window.requestAnimationFrame(positionLink);
  }

  const masonry = window.jQuery && window.jQuery(grid).data("masonry");
  if (masonry) masonry.on("layoutComplete", schedulePosition);
  window.addEventListener("resize", schedulePosition);
  window.addEventListener("load", schedulePosition);
  if (document.fonts) {
    document.fonts.ready.then(function () {
      if (masonry) masonry.layout();
      schedulePosition();
    });
  }
  schedulePosition();
})();
