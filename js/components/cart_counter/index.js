var Counter = (function () {
    let basket = {
        "counter": document.querySelector('#counter'),
        "buttonCart" : document.querySelector('.add__button'),
        "buttonOrder": document.querySelector('.order__button'),
        "sectionDetails": document.querySelector("#details"),
        "intermediate": 0,
        "countSave" : 'count',
        "basketSave" : 'basket'
    };
    function initCart() {
        if(!localStorage.getItem(basket.countSave)){
            basket.counter.innerHTML = basket.intermediate;
        }else{
            basket.counter.innerHTML = localStorage.getItem(basket.countSave);
        }
        basket.buttonCart && basket.sectionDetails.addEventListener('click', addDoCart);
        basket.buttonCart && basket.sectionDetails.addEventListener('click', addDoBasket);
        basket.buttonOrder && basket.buttonOrder.addEventListener('click', resetToCart);
    }

    function addDoBasket() {
        if(!localStorage.getItem(basket.basketSave)){
            var shopBasket = [];
        }else{
            shopBasket = JSON.parse(localStorage.getItem(basket.basketSave));
            console.log(shopBasket);
        }
        var shopCartItem = new CreatingCart();
        shopBasket.push(shopCartItem);
         localStorage.setItem(basket.basketSave, JSON.stringify(shopBasket));




    } //Ф-ция добавления в LocaleStorage;
    function isCheck(checkSize) {
        checkSize= document.querySelector('input:checked').id;
        return checkSize;
    }   //Выбор размера
    function CreatingCart() {
        this.id = location.search.slice(1);
        this.size = isCheck();
    } //Создание объестов в localeStorage;
    function addDoCart() {
            if(!localStorage.getItem(basket.countSave)){
                basket.intermediate ++;
            }else{
                var count = localStorage.getItem(basket.countSave);
                basket.intermediate = count;
                basket.intermediate ++;
            }
            basket.counter.innerHTML = basket.intermediate ;
            localStorage.setItem(basket.countSave, basket.intermediate);
        }//Ф-ция увеличения счетчика корзины;
    function resetToCart() {
        basket.intermediate = 0;
        basket.counter.innerHTML = basket.intermediate ;
        localStorage.removeItem(basket.countSave);
        localStorage.removeItem(basket.basketSave);
    } //Ф-ция обнуление счетчика корзины;
    return {
            initCart: initCart
    }
})();




