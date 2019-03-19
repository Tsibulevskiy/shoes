document.addEventListener("DOMContentLoaded", function () {
    var categoryFootwear = document.querySelector('#coats');
    var sectionDetails = document.querySelector("#details");
    var sectionPreview = document.querySelector("#preview");
    var sectionBreadcrumb = document.querySelector(".breadcrumb__menu");
    var sectionShoppingBag = document.querySelector("#shopping_bag");
    var basket = {
        "counter": document.querySelector('#counter'),
        "subtotal": document.querySelector(".total"),
        "buttonCart": document.querySelector('.add__button'),
        "buttonOrder": document.querySelector('.order__button'),
        "sectionDetails": document.querySelector("#details"),
        "intermediate": 0,
        "countSave": 'count',
        "basketSave": 'Cart'
    };

    function getFootwear() {
        var xhr = new XMLHttpRequest();
        var response = [];
        xhr.open('GET', 'shoes.json');
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                response = JSON.parse(xhr.responseText);
                if (categoryFootwear) {
                    var gender = getGender(response); //выборка по категории;
                    renderProducts(gender);
                }
                if (sectionDetails) {
                    var itemId = getShoes(response);  //выборка по id;
                    renderShoes(itemId);
                    initListeners();
                }
                if (sectionBreadcrumb) {
                    var breadcrumb = getGender(response); //отрисовка breadcrumb;
                    renderBreadcrumb(breadcrumb);
                }
                if (sectionShoppingBag) {
                    var shoppingBag = getCartTable(response); //отрисовка Cart;
                    renderShoppingBag(shoppingBag);
                    initCartRender();
                }
                initCart();
            }

        });
        xhr.send();

    }

    function getGender(response) {
        var items = [];
        var category = location.search.slice(5);
        items = response.filter(function (item) {
            if (category == item.category) {
                return item;
            }
        });
        return items;
    }
    function getShoes(response) {
        var items = [];
        var shoesId = location.hash.match(/\d+/g).join('');
        items = response.filter(function (item) {
            if (shoesId == item.id) {
                return item;
            }
        });
        return items;

    }
    function getCartTable(response) {
        var items = [];
        var itemsLocaleStorage = JSON.parse(localStorage.getItem("basket"));
        itemsLocaleStorage.forEach(function(item){
           response.filter(function (itemFromJSON) {
               if(itemFromJSON.id == item.id){
                   itemFromJSON.size = item.size;
                   itemFromJSON.number = item.number;
                   items.push(itemFromJSON);
               }
               localStorage.setItem("price", JSON.stringify(items))
           })
        });
        return items;
    }
    function getBreadcrumbs() {
        var itemsBreadcrumbs = [];
        function ToCreateBreadcrimbs() {
            this.category = new URLSearchParams(location.search).get("cat");
            // this.id =
        }

        return itemsBreadcrumbs;
    } // в работе;

    function genderTemplate(gender) {
        return `<div class="col-3 flex column coast__item justify-center align-center">
                                <div class="product_image flex  align-center">
                                    <a href="details.html?cat=${gender.category}#id=${gender.id}"><img src="${gender.photos[0]}" alt="shoes"></a>
                                </div>
                                <h4>${gender.name}</h4>
                                <div class="product__price">€ ${gender.price}</div>
                            </div>`;
    }
    function shoesIdTemplate(itemId) {
        return `<div class="col-12 details__title"><h2>${itemId.name}</h2></div>
                            <div class="col-12 details__article"><h3>Article number:${itemId.article}</h3></div>
                            <div class="col-12 detail__price"><p> ${itemId.price}</p></div>
                            <div class="col-12 details__description"><p>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis.Maecenas malesuada elit lectus felis, malesuada ultricies. </p></div>
                            <div class="col-12 details__size"><h3>Size</h3></div>
                            <div class="col-12 details__item row justify-center">
                                <label><input class="hidden" type="radio" checked name="size" id="${itemId.sizes[0]}">
                                    <div><i class="icon__ok">${itemId.sizes[0]}</i><i class="">${itemId.sizes[0]}</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size" id="${itemId.sizes[1]}">
                                    <div><i class="icon__ok">${itemId.sizes[1]}</i><i class="">${itemId.sizes[1]}</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size" id="${itemId.sizes[2]}">
                                    <div><i class="icon__ok">${itemId.sizes[2]}</i><i class="">${itemId.sizes[2]}</i></div>
                                </label>
                                <label><input class="hidden" type="radio" name="size" id="${itemId.sizes[3]}">
                                    <div><i class="icon__ok">${itemId.sizes[3]}</i><i class="">${itemId.sizes[3]}</i></div>
                                </label>
                            </div>
                            <div class="col-12 details__button row justify-center">
                            <button class="add__button " type="button">add do cart</button></div>`;
    }
    function shoesPreviewTemplate(itemId) {
        return ` <ul class="preview__nav order-2 align-self-end  ">
                            <li><a href="#link1" class="preview__link active__link"><img
                                    src="${itemId.thumbnails[0]}" alt=""></a></li>
                            <li><a href="#link2" class="preview__link"><img
                                    src="${itemId.thumbnails[1]}" alt=""></a></li>
                            <li><a href="#link3" class="preview__link"><img
                                    src="${itemId.thumbnails[2]}" alt=""></a></li>
                        </ul>
                        <div class="preview__content ">
                            <div id="link1" class="preview__item"><img
                                    src="${itemId.photos[0]}" alt="foto"></div>
                            <div id="link2" class="preview__item hidden"><img
                                    src="${itemId.photos[1]}" alt="foto"></div>
                            <div id="link3" class="preview__item hidden"><img
                                    src="${itemId.photos[2]}" alt="foto"></div>
                        </div>`;
    }
    function breadcrumbTemplate(gender) {
        return `<li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item active" >${gender[0].category}</li>`;

    }
    function shoppingBagTemplate(items) {
        return `<tr class="row  product" data-id="${items.id}">
                    <td class=" col-1 no-margin shoppingBag__table__product">
                        <a href="#"><img src="${items.thumbnails[0]}" alt=""></a>
                    </td>
                    <td class=" col-6 no-margin shoppingBag__table__discription row align-center">
                        <div class="column col-12 no-margin no-gap">
                            <div class="col-12 column no-margin no-gap">
                                <h2>${items.name}</h2>
                                <h3>Ref.${items.article}</h3>
                            </div>
                        </div>
                    </td>
                    <td class=" col-2 no-margin shoppingBag__table__color row align-center">
                        <span>${items.color}</span>
                    </td>
                    <td class=" col-1 no-margin shoppingBag__table__size row align-center">
                        <span>${items.size}</span>
                    </td>
                    <td class="col-1 no-margin shoppingBag__table__qty row align-center">
                        <div class="row align-center">
                            <span class="qty__number">${items.number}</span>
                            <div class="column no-gap no-margin" data-id="${items.id}">
                                <button type="button" class="no-gap up__number" data-counter>+</button>
                                <button type="button" class="no-gap down__number" data-counter1>-</button>
                            </div>
                        </div>
                    </td>
                    <td class="col-1 no-margin shoppingBag__table__amount row align-center">
                        <span>€ </span>
                        <span class="amount" > ${items.price}</span>
                        <button class="price__clear" data-clear>X</button>
                    </td>
                </tr>`
    }

    function renderProducts(gender) {
        var fragment = gender.map(genderTemplate).join('');
        if (categoryFootwear) {
            categoryFootwear.innerHTML = fragment;
        }
    }
    function renderShoes(itemId) {
        var fragmentId = itemId.map(shoesIdTemplate).join('');
        var fragmentPreview = itemId.map(shoesPreviewTemplate).join('');
        if (sectionDetails) {
            sectionPreview.innerHTML = fragmentPreview;
            sectionDetails.innerHTML = fragmentId;
        }
    }
    function renderBreadcrumb(gender) {
        var fragment = breadcrumbTemplate(gender);
        if (sectionBreadcrumb) {
            sectionBreadcrumb.innerHTML = fragment;
        }
    }
    function renderShoppingBag(items) {

        var fragment = items.map(shoppingBagTemplate).join('');
        if (sectionShoppingBag) {
            sectionShoppingBag.innerHTML = fragment;
        }
    }

    function initListeners() {
        Preview.initListeners();
    }
    function initCart() {
        Counter.initCart();
    }
    function initCartRender() {
        CartRender.changeQuantity();
    }



    getFootwear();
});

