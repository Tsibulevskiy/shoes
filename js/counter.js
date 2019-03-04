/**
 * Счетчик корзины
 */
;(function () {
    let counter = document.querySelector('#counter');
    let buttonCart = document.querySelector('.add__button');
    let buttonOrder = document.querySelector('.order__button');
    let sectionDetails = document.querySelector("#details");
    let intermediate = 0;  //промежуточный счетчик;
    let countSave = 'basket'; //Ключ для хранения в LocalStorage;
    //Проверка на наличие в LocalStorage счетчика;
    if(!localStorage.getItem(countSave)){
        counter.innerHTML = intermediate;
    }else{
        counter.innerHTML = localStorage.getItem(countSave);
    }
    // Проверка на наличие элемента;
    if(buttonCart){
        //Обработчик события на увеличения счетчика товара;
        sectionDetails.addEventListener('click', addDoCart);
    }else if(buttonOrder){
        //Обработчик события на обнуление корзины;
        buttonOrder.addEventListener('click', resetToCart);
    }
    function addDoCart(event) {
        if (event.target.classList.contains('add__button')){
            if(!localStorage.getItem(countSave)){
                intermediate ++;
            }else{
                let count = localStorage.getItem(countSave);
                intermediate = count;
                intermediate ++;
            }
            counter.innerHTML = intermediate ;
            localStorage.setItem(countSave, intermediate);
        }

    }
    function resetToCart() {
        intermediate = 0;
        counter.innerHTML = intermediate ;
        localStorage.removeItem(countSave);
    }

})();




