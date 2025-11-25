const products = [
	{
		"id": "madrid",
		"name": "Мадрид",
		"date": "4, 5, 7, 8 ноября",
		"image": "concert1.jpg"
	},
	{
		"id": "bologna",
		"name": "Болонья",
		"date": "14, 15, 17, 18 ноября",
		"image": "concert2.jpg"
	},
	{
		"id": "london",
		"name": "Лондон",
		"date": "21, 22, 24, 25 ноября",
		"image": "concert3.jpg"
	},
	{
		"id": "copenhagen",
		"name": "Копенгаген",
		"date": "1, 2, 4, 5 декабря",
		"image": "concert4.jpg"
	},
	{
		"id": "berlin",
		"name": "Берлин",
		"date": "8, 9, 11, 12 декабря",
		"image": "concert5.jpg"
	},
	{
		"id": "paris",
		"name": "Париж",
		"date": "18, 19, 21, 22 декабря",
		"image": "concert6.jpg"
	}


];

let selectedTicket = null;

function selectTicket(product) {
  const allButtons = document.querySelectorAll('#products-container button');
  allButtons.forEach(button=>{button.textContent="Выбрать";
     button.style.backgroundColor = "";
     button.style.boxShadow = "";
     button.style.position = "";
     button.style.top = "";});


  const currentButton = event.target;
  currentButton.textContent = "Выбрано";
  currentButton.style.backgroundColor = "#2e5263";
  currentButton.style.boxShadow = "none";
  currentButton.style.position = "relative";
  currentButton.style.top = "2px";

  selectedTicket = product;

  const orderButton = document.getElementById('orderButton');
  if (orderButton) {
    orderButton.disabled = false;
  }
}

function placeOrder() {
  if (!selectedTicket) {
    alert('Выберите билет');
    return;
  }
  const orderUrl = `https://www.google.com/#order=Radiohead&concert=${encodeURIComponent(selectedTicket.name)}&date=${encodeURIComponent(selectedTicket.date)}`;
  window.open(orderUrl, '_blank');

}



function createProductCard(product) {
  return `
    <div class="col-md-4 mb-4">
      <div style="border: 1px solid whitesmoke;">
        <img src="${product.image}" style = "width: 100%; height: 100%; object-fit:cover" alt="${product.name}">
        <div style="margin-top:10px;">
          <h5 style="margin-left: 10px; ">${product.name}</h5>
          <p style="color: #537f94">${product.date}</p>
          <button onclick="selectTicket(${JSON.stringify(product).replace(/"/g, '&quot;')})" style=" width: 180px" >Выбрать</button>
        </div>
      </div>
    </div>
  `;
}



  document.addEventListener('DOMContentLoaded', function() {
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
