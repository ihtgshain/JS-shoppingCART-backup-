let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

//============= copy from main.js ========================
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartQuantity = document.getElementById("cartAmount");
    cartQuantity.textContent = basket.map(x => x.item).reduce((x, y) => x + y, 0);
};

calculation();
//============= ↑copy from main.js ========================

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map(x => {
            let { id, item } = x;
            let search = shopItemsData.find(y => y.id === id) || [];
            return `
            <div class="cart-item">
                <img src=${search.img} width=100 />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                        <p class="cart-item-name">${search.name}</p>
                        <p class="cart-item-price">${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-trash-fill"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-square-fill"></i>
                    </div>
                    <h3>小計：${item * search.price}</h3>
                </div>
            </div>
            `;
        }).join(""));
    }
    else {
        shoppingCart.innerHTML=``
        label.innerHTML = `
        <h2>購物車內無商品</h2>
        <a href="shop.html">
            <button class="HomeBtn">回賣場</button>
        </a>
        `;
    }

};
generateCartItems();

let increment = (item) => {
    let selectedId = item.id;
    let search = basket.find(x => x.id == selectedId)

    if (search === undefined) {
        basket.push({
            id: selectedId,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    updata(selectedId);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (item) => {
    let selectedId = item.id;
    let search = basket.find(x => x.id == selectedId)

    if (search === undefined || search.item === 0) return;
    else search.item -= 1;

    updata(selectedId);

    basket = basket.filter(x => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let updata = (id) => {
    let search = basket.find(x => x.id == id);
    document.getElementById(id).textContent = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let seleteditem = id;
    basket = basket.filter(x => x.id !== seleteditem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = (co) => {
    basket = [];
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    if (co) {
        alert("謝謝惠顧！");
    }
}

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map(x => {
            let { item, id } = x;
            let search = shopItemsData.find(y => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h1>總計：${amount}</h1>
        <button onclick="clearCart(true)" class="checkout">結帳</button>
        <button onclick="clearCart(false)" class="removeAll">清空</button>
        `;
    }
}
TotalAmount();

