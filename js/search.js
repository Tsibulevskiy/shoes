//
;(function () {
    let searchButton = document.querySelector(".search__button");
    let searchInput = document.querySelector(".search__input");
    let searchContainer = document.querySelector('.header__search');
    let basketContainer = document.querySelector('.header__basket');

    searchButton.addEventListener('click', toShow);
    searchInput.addEventListener('change', toHide );

    function toShow() {
        searchInput.classList.toggle("hidden");
        searchContainer.classList.toggle("col-xs-12");
        searchContainer.classList.toggle("order-xs-3");
        searchContainer.classList.toggle("row-xs");
        basketContainer.classList.toggle("col-xs-7");

    }
    function toHide() {
        searchInput.classList.add("hidden");
        searchContainer.classList.remove("col-xs-12");
        searchContainer.classList.remove("order-xs-3");
        searchContainer.classList.remove("row-xs");
        basketContainer.classList.remove("col-xs-7");
    }

})();