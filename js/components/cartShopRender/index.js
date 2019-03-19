var CartRender = (function () {
    var products = document.querySelector("#shopping_bag");
    var product = document.querySelector(".product");
    var quantity = document.querySelector(".qty__number");
    var upNumber = document.querySelector(".up__number");
    var downNumber = document.querySelector(".down__number");
    var number = 1;
    var clearPrice = document.querySelector(".price__clear");
    var priceItem = document.querySelector(".amount");
    var subtotal = document.querySelector(".total");


    function changeQuantity() {
        quantity = document.querySelector(".qty__number");
        product = document.querySelector(".product");
        upNumber = document.querySelector(".up__number");
        downNumber = document.querySelector(".down__number");
        number = 1;
        products = document.querySelector("#shopping_bag");
        clearPrice = document.querySelector(".price__clear");
        priceItem = document.querySelector(".amount");
        subtotal = document.querySelector(".total");

        subtotal.innerHTML = sumProduct();

        upNumber && products.addEventListener('click', addToQuantity);
        downNumber && products.addEventListener('click', decreaseToQuantity);
        clearPrice && products.addEventListener('click', removeProduct);

    }

    function addToQuantity(event) {
        if(!event.target.hasAttribute('data-counter')) {
            return;
        }else{
            var counter = event.target.parentNode.previousElementSibling;
            counter.innerHTML ++ ;
            number = counter.textContent;
            changeAmount();
            subtotal.innerHTML = sumProduct();

        }
    } //Увеличение товара в корзине;
    function decreaseToQuantity(event) {
        if(!event.target.hasAttribute('data-counter1')){
            return;
        }else{
            var counter = event.target.parentNode.previousElementSibling;
            if(counter.textContent <= 1){
                number = counter.textContent;
                counter.innerHTML = 1 ;
            }else{
                counter.innerHTML -- ;
                number = counter.textContent;
                changeAmount();
                subtotal.innerHTML = sumProduct();
            }
        }
    } //Уменьшение товара в корзине;
    function removeProduct(event) {
        if(!event.target.hasAttribute('data-clear')) {
            return;
        }else{
            var product = event.target.parentNode.parentNode;
            products.removeChild(product);
            removeProductWithLS();
            changeAmount();
            subtotal.innerHTML = sumProduct();
        }
    }  //Удаление товара в корзине
    function sumProduct() {
        var itemsLocaleStorage = JSON.parse(localStorage.getItem("price"));
        var total = 0;
        itemsLocaleStorage.forEach(function (item) {
            total += + item.price * item.number;
        });
        return total.toFixed(2);
    } //Общая цена;
    
    function changeAmount() {
        var itemsLocaleStorage = JSON.parse(localStorage.getItem("price"));
        var dataId = event.target.parentNode.dataset.id;
        itemsLocaleStorage.forEach(function (item) {
            if(dataId == item.id){
                item.number = number;
            }
        });
        localStorage.setItem("price", JSON.stringify(itemsLocaleStorage));
    }// Добавление в LocaleStorage количества продукта;
    function removeProductWithLS() {
        var itemsLocaleStorage = JSON.parse(localStorage.getItem("price"));
        var dataId = product.dataset.id;
        itemsLocaleStorage.forEach(function (item) {
            if(dataId == item.id){
                itemsLocaleStorage.pop(item);
            }
        });
        localStorage.setItem("price", JSON.stringify(itemsLocaleStorage));
    }
    return{
        changeQuantity: changeQuantity
    }
})();
