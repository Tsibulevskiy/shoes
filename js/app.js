document.addEventListener("DOMContentLoaded", function () {
    let categoryFootwear = document.querySelector('#coats');
    let sectionDetails = document.querySelector("#details");
    let sectionPreview = document.querySelector("#preview");
    let sectionBreadcrumb = document.querySelector(".breadcrumb__menu");
    let sectionShoppingBag = document.querySelector("#shopping_bag");
    let basket = {
        "counter": document.querySelector('#counter'),
        "buttonCart": document.querySelector('.add__button'),
        "buttonOrder": document.querySelector('.order__button'),
        "sectionDetails": document.querySelector("#details"),
        "intermediate": 0,
        "countSave": 'count',
        "basketSave": 'Cart'
    };

    function getFootwear() {
        let xhr = new XMLHttpRequest();
        let response = [];
        xhr.open('GET', 'shoes.json');
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                response = JSON.parse(xhr.responseText);
                if (categoryFootwear) {
                    let gender = getGender(response); //выборка по категории;
                    renderProducts(gender);
                }
                if (sectionDetails) {
                    let itemId = getShoes(response);  //выборка по id;
                    renderShoes(itemId);
                    initListeners();
                    initCart();
                }
                if (sectionBreadcrumb) {
                    let breadcrumb = getGender(response); //отрисовка breadcrumb;
                    renderBreadcrumb(breadcrumb);
                }
                if (sectionShoppingBag) {
                    let shoppingBag = getCartTable(response); //отрисовка Cart;
                    renderShoppingBag(shoppingBag);
                }
            }
        });
        xhr.send();
    }

    function getGender(response) {
        let items = [];
        let category = location.search.slice(5);
        items = response.filter(function (item) {
            if (category == item.category) {
                return item;
            }
        });
        return items;
    }
    function getShoes(response) {
        let items = [];
        let shoesId = location.search.match(/\d+/g).join('');
        items = response.filter(function (item) {
            if (shoesId == item.id) {
                return item;
            }
        });
        return items;

    }
    function getCartTable(response) {
        let items = [];
        let itemsLocaleStorage = JSON.parse(localStorage.getItem("basket"));
        itemsLocaleStorage.forEach(function(item){
           response.filter(function (itemFromJSON) {
               if(itemFromJSON.id == item.id){
                   itemFromJSON.size = item.size;
                   items.push(itemFromJSON);
               }
           })
        });
        return items;
    }
    function getBreadcrumbs() {
        var itemsBreadcrumbs = [];
        function ToCreateBreadcrimbs() {
            this
        }

        return itemsBreadcrumbs;
    }

    function genderTemplate(gender) {
        return `<div class="col-3 flex column coast__item justify-center align-center">
                                <div class="product_image flex  align-center">
                                    <a href="details.html?cat=${gender.category}/id=${gender.id}"><img src="${gender.photos[0]}" alt="shoes"></a>
                                </div>
                                <h4>${gender.name}</h4>
                                <div class="product__price">€ ${gender.price}</div>
                            </div>`;
    }
    function shoesIdTemplate(itemId) {
        return `<div class="col-12 details__title"><h2>${itemId.name}</h2></div>
                            <div class="col-12 details__article"><h3>Article number:${itemId.article}</h3></div>
                            <div class="col-12 detail__price"><p>€ ${itemId.price}</p></div>
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
        return `<tbody id="shopping_bag">
                            <tr class="row">
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
                                        <span>1</span>
                                        <div class="column no-gap no-margin">
                                            <button type="button" class="no-gap">+</button>
                                            <button type="button" class="no-gap">-</button>
                                        </div>
                                    </div>
                                </td>
                                <td class="col-1 no-margin shoppingBag__table__amount row align-center">
                                    <span>€ ${items.price}</span>
                                    <span class="price__clear">X</span>
                                </td>
                            </tr>
                        </tbody>`
    }

    function renderProducts(gender) {
        let fragment = gender.map(genderTemplate).join('');
        if (categoryFootwear) {
            categoryFootwear.innerHTML = fragment;
        }
    }
    function renderShoes(itemId) {
        let fragmentId = itemId.map(shoesIdTemplate).join('');
        let fragmentPreview = itemId.map(shoesPreviewTemplate).join('');
        if (sectionDetails) {
            sectionPreview.innerHTML = fragmentPreview;
            sectionDetails.innerHTML = fragmentId;
        }
    }
    function renderBreadcrumb(gender) {
        let fragment = breadcrumbTemplate(gender);
        if (sectionBreadcrumb) {
            sectionBreadcrumb.innerHTML = fragment;
        }
    }
     function renderShoppingBag(items) {

        let fragment = items.map(shoppingBagTemplate).join('');
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


    getFootwear();
    initCart();




});



