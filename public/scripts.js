const currrentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
    if (currrentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}