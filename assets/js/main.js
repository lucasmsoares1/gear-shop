const productsArea = document.querySelector('[data-js="products-area"]')
const filterButton = document.querySelector('[data-js="filter-button"]')
const filterArea = document.querySelector('[data-js="filter-area"]')
const filterList = document.querySelector('[data-js="filter-list"]')
const soldQuant = document.querySelector('[data-js="home-quant"]')
const cartButton = document.querySelectorAll('[data-js="toggle-cart"]')
const cartArea = document.querySelector('[data-js="cart"]')
const cartAmount = document.querySelector('[data-js="cart-amount"]')
const totalPrice = document.querySelector('[data-js="total-price"]')

/********** products data **********/
let products = [
    {
        id: 0,
        name: "Corsair HS80 RGB",
        price: 120,
        type: "headset",
        srcImg: "https://www.corsair.com/eu/en/medias/sys_master/images/images/hc4/he9/9839645687838/CA-9011235-EU/Gallery/HS80_RGB_WIRELESS_BLACK_01/-CA-9011235-EU-Gallery-HS80-RGB-WIRELESS-BLACK-01.png_515Wx515H",
    },
    {
        id: 1,
        name: "Redragon Fizz RGB",
        price: 220,
        type: "keyboard",
        srcImg: "https://static.wixstatic.com/media/71a6c2_c76c23406d4240ac92d2d9bdc46f861d~mv2.png/v1/fill/w_293,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Mouse.png",
    }
    ,
    {
        id: 2,
        name: "Redragon Dark Avanger",
        price: 300,
        type: "keyboard",
        srcImg: "https://static.wixstatic.com/media/71a6c2_a37b6de75daa476cb23565aad17af2ac~mv2.png/v1/fill/w_293,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Mouse.png",
    }
    ,
    {
        id: 3,
        name: "Steel Series Sensei",
        price: 160,
        type: "mouse",
        srcImg: "https://isratechgamingwebsite.netlify.app/Images/mouse2.png",
    },
    {
        id: 4,
        name: "Corsair HS80 RGB",
        price: 400,
        type: "headset",
        srcImg: "https://www.corsair.com/eu/en/medias/sys_master/images/images/hc4/he9/9839645687838/CA-9011235-EU/Gallery/HS80_RGB_WIRELESS_BLACK_01/-CA-9011235-EU-Gallery-HS80-RGB-WIRELESS-BLACK-01.png_515Wx515H",
    },
    {
        id: 5,
        name: "VIRTUOSO RGB WIRELESS",
        price: 800,
        type: "headset",
        srcImg: "https://www.corsair.com/eu/en/medias/sys_master/images/images/h0b/hc5/9597790748702/CA-9011185-EU/Gallery/VIRTUOSO_CARBON_01/-CA-9011185-EU-Gallery-VIRTUOSO-CARBON-01.png_515Wx515H",
    },
    {
        id: 6,
        name: "Logitech G703",
        price: 300,
        type: "mouse",
        srcImg:
            "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g703/g703-gallery-1.png?v=1",
    },
    {
        id: 7,
        name: "Logitech G502",
        price: 420,
        type: "mouse",
        srcImg:
            "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g502-lightspeed-gaming-mouse/g502-lightspeed-gallery-1.png?v=1",
    },
    {
        id: 8,
        name: "Logitech G600",
        price: 120.99,
        type: "mouse",
        srcImg:
            "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/non-braid/antivenom-g600/g600-gallery-1-nb.png?v=1",
    },
    {
        id: 9,
        name: "Logitech Keyboard G915",
        price: 650.20,
        type: "keyboard",
        srcImg:
            "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g915/g915-gallery/us-g915-wireless-gallery-topdown.png?v=1",
    },
    {
        id: 10,
        name: "Logitech Keyboard PRO X",
        price: 500.80,
        type: "keyboard",
        srcImg:
            "https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-keyboard/pro-x-keyboard-gallery-1.png?v=1",
    }
];

let cart = []


/********** convert prices to brl ( R$ included ) **********/
const convertToBRL = (price) => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })



/*********** home counter **********/
const activeCounter = () => {
    let accumulator = 0
    let endValue = 500
    let duration = Math.floor(3000 / endValue)

    let counter = setInterval(() => {
        accumulator += 1
        soldQuant.textContent = accumulator

        if (accumulator === endValue) {
            clearInterval(counter)
        }
    }, duration)
}
activeCounter()



/********** home slider **********/
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
});



/********** render products **********/
const renderProducts = (array) => {
    productsArea.innerHTML = array.map(({ id, name, price, srcImg }) => {
        return `
            <div class="product__card" onclick="addProductIntoCart(${id})">
                <div class="product__image">
                    <img src=${srcImg} />
                </div>
                <span class="product__name">${name}</span>
                <span class="product__price">${convertToBRL(price)}</span>
                <div class="card__bottom">
                    <ion-icon name="add-circle-outline" class="card__icon"></ion-icon>
                    Adicionar ao carrinho
                </div>
            </div>
        `
    }).join(' ')
}
renderProducts(products)



/********** filters **********/
const toggleMenu = () => {
    filterList.classList.toggle('filter__list--show')
}

const changeFilter = (selecterSearchTerm) => {
    toggleMenu()
    filterButton.textContent = selecterSearchTerm
    renderProducts(products)
}

filterArea.addEventListener('click', (e) => {
    const clickedElement = e.target.dataset.js

    switch (clickedElement) {
        case 'filter-button':
            toggleMenu()
            break;

        case 'lowToHigh':
            products = products.sort((a, b) => a.price < b.price ? -1 : true)
            changeFilter('Menor preco')
            break;

        case 'highToLow':
            products = products.sort((a, b) => a.price > b.price ? -1 : true)
            changeFilter('Maior preco')
            break;

        case 'relevant':
            products = products.sort((a, b) => a.id < b.id ? -1 : true)
            changeFilter('Mais relevantes')
            break;

        default:
            break;
    }
})



/********** cart **********/
const renderCartProducts = () => {
    const cartList = cartArea.querySelector('[data-js="cart-list"]')

    cartList.innerHTML = cart.map(({ id, name, price, srcImg, quant }) => {
        return `
        <li class="cart-product">
            <button class="cart-product__remove" onclick="removeFromCart(${id})">
                <ion-icon name="close"></ion-icon>
            </button>
            <div class="cart-product__image">
                <img src=${srcImg}>
            </div>
            <div class="cart-product__name">${name}</div>
            <div class="cart-product__amount">
                <button class="cart-product__controller" data-js="increase-amount" onclick="decreaseProductAmount(${id})">-</button>
                ${quant}
                <button class="cart-product__controller" data-js="decrease-amount" onclick="increaseProductAmount(${id})">+</button>
            </div>
            <div class="cart-product__price">${convertToBRL(price)}</div>
        </li>
        `
    }).join(' ')
}

const toggleCart = () => {
    cartArea.classList.toggle('cart--show')
    document.body.classList.toggle('disable-overflow')
}

// update total price and amount of items in the header
const updateCartAmounts = () => {
    cartAmount.textContent = cart.reduce((acc, curItem) => acc += curItem.quant, 0)
    totalPrice
        .textContent = convertToBRL(cart
        .reduce((acc, curItem) => acc += curItem.price * curItem.quant, 0))
}

cartButton.forEach(button => button.addEventListener('click', toggleCart))

const addProductIntoCart = (productId) => {
    let selectedProduct = products.find(product => product.id === productId)
    const isProductAlreadyInCart = cart.find(cartProduct => cartProduct.id === selectedProduct.id)

    if (!isProductAlreadyInCart) {
        cart.push({
            ...selectedProduct,
            quant: 1
        })

    } else {
        cart = cart.map(cartProduct => {
            if (cartProduct.id === selectedProduct.id) {
                return { ...cartProduct, quant: cartProduct.quant += 1 }
            }

            return cartProduct
        })
    }


    updateCartAmounts()
    renderCartProducts()
}

const removeFromCart = (productId) => {
    cart = cart.filter(product => product.id !== productId)
    updateCartAmounts()
    renderCartProducts()
}

const increaseProductAmount = (productId) => {
    cart = cart.map(cartProduct => {
        if (cartProduct.id === productId) {
            return { ...cartProduct, quant: cartProduct.quant += 1 }
        }

        return cartProduct
    })
    updateCartAmounts()
    renderCartProducts()
}

const decreaseProductAmount = (productId) => {
    cart = cart.map(cartProduct => {
        if (cartProduct.id === productId) {
            if(cartProduct.quant > 1) {
                return { ...cartProduct, quant: cartProduct.quant -= 1 }
            }
        }

        return cartProduct
    })
    updateCartAmounts()
    renderCartProducts()
}


