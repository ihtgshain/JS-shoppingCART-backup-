let label = document.getElementById("label");
let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("cartData")) || [];
let shoppingCart = document.getElementById("cartItems");
const sContainers = document.querySelector("#shop");
const cContainers = document.querySelector("#cartZone");

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map(x => {
        let { id, name, price, desc, img } = x  
        let search = basket.find(x => x.id === id) || [] 
        return `<div id=lalaID-${id} class="item" >   
            <img src=${img} class="bookImg"/>
            <div class="details">
                <div class="titleAndTrash">
                <h3>${name}</h3><i onclick="removeItem(${id})" class="bi bi-trash-fill"></i>
                </div>
                <div class="description">
                    <p>${desc}</p>
                </div>
                <div class="price-quantity">
                    <h2>訂價${price}元</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                        <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-square-fill"></i>
                    </div>
                </div>
            </div>
        </div >
    </div>
    `
    }).join(""));
};
generateShop();
const draggables = document.querySelectorAll(".item");

function generateCart() {
    console.log(basket);
    basket.forEach(x => {
        let item = document.getElementById("lalaID-" + x.id);
        cContainers.appendChild(item);
    });
}
generateCart();

draggables.forEach(x => {
    x.addEventListener("dragstart", () => {
        x.classList.add("dragging");
    })

    x.addEventListener("dragend", () => {
        x.classList.remove("dragging");
    })
})

cContainers.addEventListener("dragover", e => { e.preventDefault()});

cContainers.addEventListener("drop", e => {
    e.preventDefault();
    let draggable = document.querySelector(".dragging");
    let dropZone = document.querySelector("#cartItems");
    dropZone.appendChild(draggable);

    let id = draggable.id.substr(7);
    document.getElementById(id).textContent = 1;
    basket.push({
        id: id,
        item: 1,
    });
    updata(id);
    localStorage.setItem("cartData", JSON.stringify(basket));
});

sContainers.addEventListener("dragover", e => { e.preventDefault() });

sContainers.addEventListener("drop", e => {
    e.preventDefault();
    let draggable = document.querySelector(".dragging");
    sContainers.appendChild(draggable);

    let selectedId = draggable.id.substr(7);
    document.getElementById(selectedId).textContent = 0;
    let search = basket.find(x => x.id == selectedId)
    if (search === undefined || search.item === 0) return;
    else search.item = 0;
    updata(selectedId);

    let item = document.getElementById("lalaID-" + selectedId);
    basket = basket.filter(x => x.id !== selectedId);
    TotalAmount();
    calculation();
    localStorage.setItem("cartData", JSON.stringify(basket));
    sContainers.appendChild(item);
});

function increment(item){
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
    localStorage.setItem("cartData", JSON.stringify(basket));
};

function decrement(item) {
    let selectedId = item.id;
    let search = basket.find(x => x.id == selectedId)

    if (search === undefined || search.item === 0) return;
    else {
        search.item -= 1
        if (search.item == 0) {
            sContainers.appendChild(document.getElementById("lalaID-" + selectedId));
        }
            
    };

    updata(selectedId);

    basket = basket.filter(x => x.item !== 0);
    localStorage.setItem("cartData", JSON.stringify(basket));

};

function updata(id) {
    let search = basket.find(x => x.id == id);
    document.getElementById(id).textContent = search.item;
    calculation();
    TotalAmount();
};

function removeItem(id) {
    let selectedId = id.id;
    let search = basket.find(x => x.id == selectedId)
    if (search === undefined || search.item === 0) return;
    else search.item = 0;
    updata(selectedId);

    let item = document.getElementById("lalaID-" + selectedId);
    basket = basket.filter(x => x.id !== selectedId);
    TotalAmount();
    calculation();
    localStorage.setItem("cartData", JSON.stringify(basket));
    sContainers.appendChild(item);
}

function clearCart(co) {
    draggables.forEach(x => {
        document.getElementById(x.id.substr(7)).textContent = 0;
        sContainers.appendChild(x);
    });

    basket = [];
    TotalAmount();
    calculation();
    localStorage.setItem("cartData", JSON.stringify(basket));
    if (co) {
        alert("謝謝惠顧！");
    }

}

function TotalAmount(){
    if (basket.length !== 0) {
        let amount = basket.map(x => {
            let { item, id } = x;
            let search = shopItemsData.find(y => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        if (amount == 0) {
            label.innerHTML = "";
        }
        else {
            label.innerHTML = `
        <h1>總計：${amount}元</h1>
        <button onclick="clearCart(true)" class="checkout">結帳</button>
        <button onclick="clearCart(false)" class="removeAll">清空</button>
        `;
        }
    }
    else {
        label.innerHTML = "";
    }
}
TotalAmount();

function calculation(){
    let cartQuantity = document.getElementById("cartAmount");
    cartQuantity.textContent = basket.map(x => x.item).reduce((x, y) => x + y, 0);  //reduce((previous,current)=> function,default))
};
calculation();