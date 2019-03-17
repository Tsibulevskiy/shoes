var CartRender = (function () {
    var products = document.querySelector("#shopping_bag");
    var quantity = document.querySelector(".qty__number");
    var upNumber = document.querySelector(".up__number");
    var downNumber = document.querySelector(".down__number");
    var number = 1;
    var amount = document.querySelector(".amount");
    var clearPrice = document.querySelector(".price__clear");

    function changeQuantity() {
        quantity = document.querySelectorAll(".qty__number");
        upNumber = document.querySelector(".up__number");
        downNumber = document.querySelector(".down__number");
        number = 1;
        amount = document.querySelector(".amount");
        product = document.querySelector("#shopping_bag");
        clearPrice = document.querySelector(".price__clear");

        upNumber && product.addEventListener('click', addToQuantity);
        downNumber && product.addEventListener('click', decreaseToQuantity);
        clearPrice && product.addEventListener('click', removeProduct);

    }

    function addToQuantity(event) {
        if(!event.target.hasAttribute('data-counter')) {
            return;
        }else{
            var counter = event.target.parentNode.previousElementSibling;
            counter.innerHTML ++ ;
        }
    } //Увеличение товара в корзине;
    function decreaseToQuantity(event) {
        if(!event.target.hasAttribute('data-counter1')){
            return;
        }else{
            var counter = event.target.parentNode.previousElementSibling;
            if(counter.textContent <= 1){
                counter.innerHTML = 1 ;
            }else{
                counter.innerHTML -- ;
            }
        }
    } //Уменьшение товара в корзине;
    function removeProduct(event) {
        if(!event.target.hasAttribute('data-clear')) {
            return;
        }else{
            console.log(event.target.parentNode.parentNode);
            var product = event.target.parentNode.parentNode;
            products.removeChild(product);
        }
    }  //Удаление товара в корзине

    return{
        changeQuantity: changeQuantity
    }
})();
