//
var Search = (function () {
    var searchButton = document.querySelector(".search__button");
    var searchInput = document.querySelector(".search__input");
    var searchContainer = document.querySelector('.header__search');
    var basketContainer = document.querySelector('.header__basket');

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
    function toSearch() {
        var name = searchInput.value.toLowerCase().trim();
        var product = App.getResponse();
        product.forEach(function (item) {
            if(item.name.toLowerCase() == name || item.color.toLowerCase() == name){
                console.log("AAAA");
                toLoadingProducts(item);
            }

        });
        return name;
    }
    function toLoadingProducts(item) {
        if(event.keyCode == 13){
            event.preventDefault();
            document.location.assign(`./details.html?cat=${item.category}&id=${item.id}#id=${item.id}`);
        }
    }
    function initSearch() {
            var searchInput = document.querySelector(".search__input");
            searchInput && searchInput.addEventListener('input', toSearch);
            searchInput && searchInput.addEventListener('keydown', toSearch)
    }
    return{
        initSearch: initSearch
    }
})();