let accordionItems = document.querySelectorAll(".accordion .item");

accordionItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
      console.log("lol");
    } else {
      item.classList.add("active");
      console.log("lol");
    }
  });
});

console.log(accordionItems);
