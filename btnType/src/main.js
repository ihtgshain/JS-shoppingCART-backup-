let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map(x => {
        let { id, name, price, desc, img } = x  
        let search = basket.find(x => x.id === id) || [] 
        return `<div id=lalaID-${id} class="item" >   
            <img src=${img} width="220" />
            <hr/>
            <div class="details">
                <h3>${name}</h3>
                <div class="description">
                    <p>${desc}</p>
                </div>
                <div class="price-quantity">
                    <h2>${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                        <div id=${id} class="quantity">${search.item===undefined? 0:search.item}</div>
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

let increment = (item) => {
    let selectedId= item.id;
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
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (item) => {
    let selectedId = item.id;
    let search = basket.find(x => x.id == selectedId)

    if (search === undefined || search.item===0) return;
    else search.item -= 1;

    updata(selectedId);

    basket = basket.filter(x => x.item !== 0); 
    localStorage.setItem("data", JSON.stringify(basket));
};

let updata = (id) => {
    let search = basket.find(x => x.id == id);
    document.getElementById(id).textContent = search.item;
    calculation();
};

let calculation = () => {
    let cartQuantity = document.getElementById("cartAmount");
    cartQuantity.textContent = basket.map(x => x.item).reduce((x, y) => x + y, 0);  //reduce((previous,current)=> function,default))
};
calculation();  