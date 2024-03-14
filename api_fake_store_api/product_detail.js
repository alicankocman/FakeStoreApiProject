// URL'den ürün ID'sini al
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Ürün detaylarını almak için bir API isteği gönderme
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(data => {
        // Ürün detaylarını görüntüleme
        const productImageContainer = document.getElementById('product-image');
        const productInfoContainer = document.getElementById('product-info');

        // Ürün resmi
        const productImage = document.createElement('img');
        productImage.src = data.image;
        productImage.alt = data.title;
        productImageContainer.appendChild(productImage);

        // Ürün bilgileri
        const productName = document.createElement('h2');
        productName.textContent = data.title;

        const productDescription = document.createElement('p');
        productDescription.textContent = data.description;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: $${data.price}`;

        const productRating = document.createElement('p');
        productRating.textContent = `Rating: ${data.rating.rate}`;

        productInfoContainer.appendChild(productName);
        productInfoContainer.appendChild(productDescription);
        productInfoContainer.appendChild(productPrice);
        productInfoContainer.appendChild(productRating);
    })
    .catch(error => console.error('Error fetching product details:', error));