const myContainer = document.querySelector('.post-container');
const priceInputMin = document.querySelector('.price-min-range');
const priceInputMax = document.querySelector('.price-max-range');
const rateInputMin = document.querySelector('.rate-min-range');
const rateInputMax = document.querySelector('.rate-max-range');
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
    const minPrice = parseFloat(priceInputMin.value.trim());
    const maxPrice = parseFloat(priceInputMax.value.trim());
    const minRate = parseFloat(rateInputMin.value.trim());
    const maxRate = parseFloat(rateInputMax.value.trim());

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

// Kategori filtreleme işlemini gerçekleştiren fonksiyon
function filterByCategory(categoryInput) {
    const selectedCategory = categoryInput.value; // Seçilen kategori değerini al

    // Tüm ürünleri temizle
    myContainer.innerHTML = '';

    // Tüm ürünleri filtrele
    window.allProducts.forEach((product) => {
        // Ürün kategorisi seçilen kategoriye eşitse veya seçilen kategori "all" ise, ürünü göster
        if (product.category === selectedCategory || selectedCategory === 'all') {
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

    // Açıklama bilgisi elementinin oluşturulması ve ayarlanması
    const description = document.createElement('p'); // Açıklama için bir paragraf elementi oluştur
    description.classList.add('post-description'); // CSS için bir sınıf ekleyebilirsiniz
    description.textContent = product.description; // Ürünün açıklamasını ekleyin

    // Fiyat bilgisi elementinin oluşturulması ve ayarlanması
    const price = document.createElement('p');
    price.classList.add('post-body2');
    price.textContent = `Fiyat: $${product.price}`;

    // Fiyat bilgisi için bir div oluştur ve içeriği bu div içine yerleştir
    const priceWrapper = document.createElement('div');
    priceWrapper.classList.add('price-wrapper');
    priceWrapper.appendChild(price);

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
    div.appendChild(description); // Açıklama paragrafını ürün öğesine ekleyin
    div.appendChild(priceWrapper); // Fiyat bilgisini yeni oluşturduğumuz div'e yerleştir
    div.appendChild(rating);
    

    // post-container div'ine post-item div'ini ekle
    myContainer.appendChild(div);
}

// Sayfa yüklendiğinde ürünleri yükle ve filtreleme işlemini gerçekleştir
document.addEventListener('DOMContentLoaded', loadItems);

// Filtreleme butonunun tıklama olayına filtreleme işlemini bağla
filterButton.addEventListener('click', filterItems);

// Sıralama kriterlerini tanımla
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
