// Данные товаров
const products = [
	{
		"id": 1,
		"name": "Футболка Creep",
		"price": "4000.00",
		"image": "creept.jpg"
	},
	{
		"id": 2,
		"name": "Худи Radiohead",
		"price": "7000.00",
		"image": "hoodie.webp"
	},
	{
		"id": 3,
		"name": "Футболка OK Computer",
		"price": "5000.00",
		"image": "okcomp.webp"
	},
	{
		"id": 4,
		"name": "Футболка с нашивкой",
		"price": "4500.00",
		"image": "patcht.webp"
	},
	{
		"id": 5,
		"name": "Значок",
		"price": "1500.00",
		"image": "pin.jpg"
	},
	{
		"id": 6,
		"name": "Свитшот Radiohead",
		"price": "4900.00",
		"image": "sweater.webp"
	}


];

// Корзина (хранится в localStorage)
let cart = [];

// Функция добавления в корзину
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}


function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Корзина пуста</p>';
    cartTotal.textContent = 'Общая сумма: 0 руб.';
  } else {
    let total = 0;
    let cartHTML = '';
    
    cart.forEach((item, index) => {
      total += parseInt(item.price);
      cartHTML += `
        <div style="border-bottom: 1px solid whitesmoke; padding: 5px 0;">
          ${item.name} - ${item.price} руб.
          <button style:"margin-left: 40px; height: 30px" onclick="removeFromCart(${index})" >
            Удалить
          </button>
        </div>
      `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = `Общая сумма: ${total} руб.`;
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}





function checkout() {
  if (cart.length === 0) {
    alert('Корзина пуста!');
    return;
  }
  
  let total = 0;
  let itemsData = '';
  
  cart.forEach(item => {
    total += parseInt(item.price);
    itemsData += `${item.name}_${item.price},`;
  });
  

  

  const orderUrl = `https://www.google.com/#order=Radiohead&items=${encodeURIComponent(itemsData)}&total=${total}`;
  
  window.open(orderUrl, '_blank');
}


function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}



function createProductCard(product) {
  return `
    <div class="col-md-4 mb-4">
      <div style="border: 1px solid #537f94;">
        <img src="${product.image}" style = "width: 100%; height: 100%; object-fit:cover" alt="${product.name}">
        <div style="margin-top:10px;">
          <h5 style="margin-left: 10px; ">${product.name}</h5>
          <p style="color: #537f94">${product.price} руб.</p>
          <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" style=" width: 180px" >Добавить в корзину</button>
        </div>
      </div>
    </div>
  `;
}


document.addEventListener('DOMContentLoaded', function() {
  console.log('Скрипт запущен!'); // Проверка что скрипт работает
  
  const container = document.getElementById('products-container');
  console.log('Контейнер:', container);
  if (container) {
    console.log('Товары:', products); 
    
    let productsHTML = '';
    products.forEach(product => {
      productsHTML += createProductCard(product);
    });
    
    container.innerHTML = productsHTML;
    console.log('HTML добавлен!'); 
  }
});