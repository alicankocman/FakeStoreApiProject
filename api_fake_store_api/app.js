const myContainer = document.querySelector('.post-container');
const priceInput = document.querySelector('.price-range');
const rateInput = document.querySelector('.rate');
const filterButton = document.querySelector('.list');

// Tüm ürünleri yükleme fonksiyonu
function loadItems() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then((data) => {
            // Tüm ürünleri tek bir değişkende sakla
            window.allProducts = data;
            // Filtreleme işlemini gerçekleştir
            filterItems();
        })
        .catch(error => console.log(error));
}

// Filtreleme işlemini gerçekleştiren fonksiyon
function filterItems() {
    // Kullanıcının girdiği fiyat aralığını ve yıldız veri aralığını al
    const priceRange = priceInput.value.trim();
    const rateRange = rateInput.value.trim();

    // Girilen metni "-" karakterinden ayırarak fiyat aralığını ve yıldız veri aralığını elde et
    const priceRangeArray = priceRange.split('-');
    const rateRangeArray = rateRange.split('-');

    // Minimum ve maksimum fiyatı ve yıldız verisini al
    const minPrice = parseFloat(priceRangeArray[0]);
    const maxPrice = parseFloat(priceRangeArray[1]);
    const minRate = parseFloat(rateRangeArray[0]);
    const maxRate = parseFloat(rateRangeArray[1]);

    // Tüm ürünleri temizle
    myContainer.innerHTML = '';

    // Tüm ürünleri filtrele
    window.allProducts.forEach((product) => {
        // Ürün fiyatı ve yıldız verisi filtre aralığına uygun mu diye kontrol et
        if ((isNaN(minPrice) || isNaN(maxPrice) || (product.price >= minPrice && product.price <= maxPrice)) &&
            (isNaN(minRate) || isNaN(maxRate) || (product.rating.rate >= minRate && product.rating.rate <= maxRate))) {
            createProductItem(product);
        }
    });
}

// Ürün elemanı oluşturma fonksiyonu
function createProductItem(product) {
    // post-item div'inin oluşturulması
    const div = document.createElement('div');
    div.classList.add('post-item');

    // img-container div'inin oluşturulması
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    // img elementinin oluşturulması ve ayarlanması
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = product.image;

    // Ürün adı elementinin oluşturulması ve ayarlanması
    const title = document.createElement('h2');
    title.classList.add('post-title1');
    title.textContent = product.title;

    // Fiyat bilgisi elementinin oluşturulması ve ayarlanması
    const price = document.createElement('p');
    price.classList.add('post-body2');
    price.textContent = `Fiyat: $${product.price}`;

    // Yıldız verisi elementinin oluşturulması ve ayarlanması
    const rating = document.createElement('p');
    rating.classList.add('post-body3');
    rating.textContent = `Yıldız: ${product.rating.rate}`;

    // img-container div'ine img elementini ekle
    imgContainer.appendChild(img);

    // post-item div'ine tüm içeriği ekle
    div.appendChild(imgContainer);
    div.appendChild(title);
    div.appendChild(price);
    div.appendChild(rating);

    // post-container div'ine post-item div'ini ekle
    myContainer.appendChild(div);
}

// Sayfa yüklendiğinde ürünleri yükle ve filtreleme işlemini gerçekleştir
document.addEventListener('DOMContentLoaded', loadItems);

// Filtreleme butonunun tıklama olayına filtreleme işlemini bağla
filterButton.addEventListener('click', filterItems);
// Sıralama kriterlerini tanımla
// Sıralama kriterlerini tanımla
// Sıralama seçenekleri
// Sıralama seçenekleri
const sortingOptions = {
    "FROM CHEAP TO EXPENSIVE": (a, b) => a.price - b.price,
    "FROM EXPENSIVE TO CHEAP": (a, b) => b.price - a.price,
    "MOST RATED ONES": (a, b) => b.rating.rate - a.rating.rate,
    "THOSE WHO GET THE LEAST RATE": (a, b) => a.rating.rate - b.rating.rate
};

// Tıklama olayını dinleyen fonksiyon
function arrangeItems(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

    const clickedOption = event.target.textContent; // Tıklanan seçeneği al
    const sortingFunction = sortingOptions[clickedOption]; // Seçeneklere göre sıralama fonksiyonunu al

    if (sortingFunction) {
        // Sıralama fonksiyonu varsa ürünleri sırala
        window.allProducts.sort(sortingFunction);
        // Filtreleme işlemini yeniden çağırarak sıralı ürünleri göster
        filterItems();
    }
}

// ARRANGEMENT bağlantılarını dinleyen fonksiyon
document.querySelectorAll('.demo-dropdown ul a').forEach(link => {
    link.addEventListener('click', arrangeItems);
});





// Ürün elemanı oluşturma fonksiyonu
function createProductItem(product) {
    // post-item div'inin oluşturulması
    const div = document.createElement('div');
    div.classList.add('post-item');

    // img-container div'inin oluşturulması
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    // img elementinin oluşturulması ve ayarlanması
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = product.image;

    // Ürün adı elementinin oluşturulması ve ayarlanması
    const title = document.createElement('h2');
    title.classList.add('post-title1');
    title.textContent = product.title;

    // Fiyat bilgisi elementinin oluşturulması ve ayarlanması
    const price = document.createElement('p');
    price.classList.add('post-body2');
    price.textContent = `Fiyat: $${product.price}`;

    // Yıldız verisi elementinin oluşturulması ve ayarlanması
    const rating = document.createElement('p');
    rating.classList.add('post-body3');
    rating.textContent = `Yıldız: ${product.rating.rate}`;

    // Tıklama olayı ekleme
    div.addEventListener('click', function() {
        // Tıklanan ürünün ID'sini al
        const productId = product.id;
        // Yeni sayfaya yönlendirme
        window.location.href = `product_detail.html?id=${productId}`;
    });

    // img-container div'ine img elementini ekle
    imgContainer.appendChild(img);

    // post-item div'ine tüm içeriği ekle
    div.appendChild(imgContainer);
    div.appendChild(title);
    div.appendChild(price);
    div.appendChild(rating);

    // post-container div'ine post-item div'ini ekle
    myContainer.appendChild(div);
}
