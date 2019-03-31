var Counter = (function () {
    var basket = {
        "counter": document.querySelector('#counter'),
        "subtotal": document.querySelector(".total"),
        "buttonCart" : document.querySelector('.add__button'),
        "buttonOrder": document.querySelector('.order__button'),
        "sectionDetails": document.querySelector("#details"),
        "intermediate": 0,
        "basketSave" : 'basket'
    };
    var counter = JSON.parse(localStorage.getItem(basket.basketSave));
    function initCart() {
        var basket = {
            "counter": document.querySelector('#counter'),
            "subtotal": document.querySelector(".total"),
            "buttonCart" : document.querySelector('.add__button'),
            "buttonOrder": document.querySelector('.order__button'),
            "sectionDetails": document.querySelector("#details"),
            "intermediate": 0,
            "basketSave" : 'basket'
        };
        var counter = JSON.parse(localStorage.getItem(basket.basketSave));
        if(!counter){
            basket.counter.innerHTML = basket.intermediate;
        }else{
            addDoCart();
        }
        basket.buttonCart && basket.buttonCart.addEventListener('click', addDoBasket);
        basket.buttonCart && basket.buttonCart.addEventListener('click', addDoCart);
        basket.buttonOrder && basket.buttonOrder.addEventListener('click', resetToCart);
    }
    function addDoBasket() {
        var shopCartItem;
        if(!counter){
            var shopBasket = [];
            shopCartItem = new CreatingCart();
            shopBasket.push(shopCartItem);
            localStorage.setItem(basket.basketSave, JSON.stringify(shopBasket));
        }else{
            shopBasket = counter;
            shopCartItem = new CreatingCart();
            var duplicate = shopBasket.filter(function (item) {
                if(item.id == shopCartItem.id){
                    item.size = shopCartItem.size;
                }
                return item.id == shopCartItem.id;
            });
            if (duplicate.length < 1) {
                shopBasket.push(shopCartItem);
            }
            localStorage.setItem(basket.basketSave, JSON.stringify(shopBasket));

        }
    } //Ф-ция добавления в LocaleStorage;
    function isCheck(checkSize) {
        checkSize= document.querySelector('input:checked').id;
        return checkSize;
    }   //Выбор размера
    function CreatingCart() {
        this.id = location.hash.match(/\d+/g).join('');
        this.size = isCheck();
        this.number = '1';
    } //Создание объестов в localeStorage;
    function addDoCart() {
        counter = JSON.parse(localStorage.getItem(basket.basketSave));
        if(!counter){
            basket.intermediate ++;
            basket.counter.innerHTML = basket.intermediate;

        }else{

            var number = 0;
            counter.forEach(function (item) {
                number += parseFloat(item.number);
                return number;
            });
            basket.counter.innerHTML = number;
        }









        // var count = JSON.parse(localStorage.getItem(basket.countSave));
        //     if(!count){
        //         basket.intermediate ++;
        //     }else{
        //         basket.intermediate = count;
        //         basket.intermediate ++;
        //     }
        //     basket.counter.innerHTML = basket.intermediate ;
        //     localStorage.setItem(basket.countSave, JSON.stringify(basket.intermediate));
        }//Ф-ция увеличения счетчика корзины;
    function resetToCart() {
        basket.intermediate = 0;
        basket.counter.innerHTML = basket.intermediate ;
        localStorage.removeItem(basket.countSave);
        localStorage.removeItem(basket.basketSave);
        localStorage.removeItem("price");
    } //Ф-ция обнуление счетчика корзины;

    return {
            initCart: initCart
    }
})();




