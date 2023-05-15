const allProductsContainer = document.querySelector(".all-products");
const allProducts = document.querySelectorAll(".chair");
const pagesCount = 12;
const PaginationLinksContainer = document.querySelector(".pagination--links");
const btnPaginationprev = document.getElementById("btn-pagination--prev");
const btnPaginationNext = document.getElementById("btn-pagination--next");
let paginationLinks;
let activePage = 1;

disableBtns();
insertPagination();

function insertPagination() {
  PaginationLinksContainer.textContent = "";
  for (let i = 1; i <= pagesCount; i++) {
    const link = document.createElement("a");
    const dots = document.createElement("span");
    dots.textContent = "...";
    link.textContent = i;
    i === activePage ? link.classList.add("pagination--active") : "";

    if (pagesCount > 5) {
      if (activePage <= 3) {
        if (i < 4) {
          PaginationLinksContainer.append(link);
        } else if (i === pagesCount) {
          PaginationLinksContainer.append(dots);
          PaginationLinksContainer.append(link);
        } else {
          continue;
        }
      } else if (activePage > 3 && activePage < pagesCount - 2) {
        if (i === 1) {
          PaginationLinksContainer.append(link);
          PaginationLinksContainer.append(dots);
        } else if (i === activePage || i === activePage + 1) {
          PaginationLinksContainer.append(link);
        } else if (i === pagesCount) {
          PaginationLinksContainer.append(dots);
          PaginationLinksContainer.append(link);
        }
      } else if (activePage > 3 && activePage >= pagesCount - 2) {
        if (i === 1) {
          PaginationLinksContainer.append(link);
          PaginationLinksContainer.append(dots);
        } else if (i >= pagesCount - 2) {
          PaginationLinksContainer.append(link);
        } else {
          continue;
        }
      }
    } else {
      PaginationLinksContainer.append(link);
    }
  }
  paginationLinks = document.querySelectorAll(".pagination--links a");
}

function disableBtns() {
  activePage === 1
    ? (btnPaginationprev.disabled = true)
    : (btnPaginationprev.disabled = false);

  activePage === pagesCount
    ? (btnPaginationNext.disabled = true)
    : (btnPaginationNext.disabled = false);
}

btnPaginationNext.addEventListener("click", () => {
  activePage < pagesCount ? activePage++ : "";
  insertPagination();
  disableBtns();
});

btnPaginationprev.addEventListener("click", () => {
  activePage > 1 ? activePage-- : "";
  insertPagination();
  disableBtns();
});

PaginationLinksContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    activePage = Number(e.target.innerText);
    insertPagination();
    disableBtns();
  }
});
