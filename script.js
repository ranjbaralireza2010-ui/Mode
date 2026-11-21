
const products = [
    {
        id: 1,
        name: "تی‌شرت مشکی مردانه",
        price: 450000,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        id: 2,
        name: "تی‌شرت سفید مردانه",
        price: 420000,
        category: "tshirt",
        image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600"
    },
    {
        id: 3,
        name: "هودی مشکی اسپرت",
        price: 890000,
        category: "hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
    },
    {
        id: 4,
        name: "هودی طوسی مردانه",
        price: 920000,
        category: "hoodie",
        image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600"
    },
    {
        id: 5,
        name: "شلوار جین آبی",
        price: 750000,
        category: "pants",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"
    },
    {
        id: 6,
        name: "شلوار اسلش مشکی",
        price: 680000,
        category: "pants",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600"
    },
    {
        id: 7,
        name: "کفش اسپرت مردانه",
        price: 1200000,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 8,
        name: "کفش سفید مردانه",
        price: 1350000,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600"
    }
];

let cart = [];

function money(price) {
    return price.toLocaleString("fa-IR") + " تومان";
}

// نمایش محصولات
function render() {

    const search = document
        .getElementById("search")
        .value.toLowerCase();

    const category = document
        .getElementById("category")
        .value;

    const filtered = products.filter(product => {

        return product.name.toLowerCase().includes(search)
        &&
        (category === "all" || product.category === category);

    });

    document.getElementById("products").innerHTML =
        filtered.map(product => `

        <div class="product">

            <img src="${product.image}" alt="${product.name}">

            <div class="info">

                <h3>${product.name}</h3>

                <div class="price">
                    ${money(product.price)}
                </div>

                <button class="add"
                    onclick="addToCart(${product.id})">
                    افزودن به سبد خرید
                </button>

            </div>

        </div>

        `).join("") || "<p>محصولی پیدا نشد.</p>";
}

// افزودن به سبد خرید
function addToCart(id) {

    const item = cart.find(product => product.id === id);

    if (item) {

        item.quantity++;

    } else {

        cart.push({
            ...products.find(product => product.id === id),
            quantity: 1
        });

    }

    updateCart();

}

// بروزرسانی سبد خرید
function updateCart() {

    document.getElementById("count").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cartItems").innerHTML =
        cart.map(item => `

        <div class="cart-item">

            <span>
                ${item.name} × ${item.quantity}
            </span>

            <span>
                ${money(item.price * item.quantity)}

                <button class="remove"
                    onclick="removeItem(${item.id})">
                    حذف
                </button>
            </span>

        </div>

        `).join("") || "<p>سبد خرید خالی است.</p>";

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("total").textContent =
        "مبلغ کل: " + money(total);

}

// حذف محصول
function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}

// باز و بسته کردن سبد خرید
function toggleCart() {

    const box = document.getElementById("cartBox");

    box.style.display =
        box.style.display === "block" ? "none" : "block";

    updateCart();

}

// ثبت سفارش نمایشی
function checkout() {

    if (cart.length === 0) {

        alert("سبد خرید شما خالی است!");

        return;

    }

    alert("برای ثبت سفارش واقعی باید سیستم سفارش‌گیری متصل شود.");

}

// اجرای اولیه
render();
updateCart();
