// Static product data
const products = [
    { id: 1, name: "Teapot with black tea", price: "£59.99", image: "assets/img/300ml-jar.png", description: "A fine teapot.", categories: ["Furniture", "Table"] },
    { id: 2, name: "Glass Jar 250ml", price: "£12.99", image: "assets/img/300x300.png", description: "Perfect for jams.", categories: ["Accessories", "Kitchen"] },
    { id: 3, name: "Wooden Chair", price: "£75.00", image: "assets/img/300x300.png", description: "A beautifully crafted wooden chair.", categories: ["Chair", "Furniture"] },
    { id: 4, name: "Glass Jar 500ml", price: "£19.99", image: "assets/img/300x300.png", description: "Ideal for pickles.", categories: ["Kitchen", "Storage"] },
];

// Function to render products based on category
function renderProducts(category = "All") {

    document.getElementById("product-list-all").innerHTML = '';
    document.getElementById("product-list-accessories").innerHTML = '';
    document.getElementById("product-list-chair").innerHTML = '';
    document.getElementById("product-list-furniture").innerHTML = '';

    // Filter products by category
    const filteredProducts = category === "All" ? products : products.filter(p => p.categories.includes(category));

    filteredProducts.forEach(product => {
        const productHTML = `
      <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="single-product-item text-center">
          <div class="products-images">
            <a href="#" class="product-thumbnail">
              <img src="${product.image}" class="img-fluid" alt="${product.name}" width="300" height="300">
            </a>
            <div class="product-actions">
              <a href="#" data-bs-toggle="modal" data-bs-target="#prodect-modal" class="quick-view" data-id="${product.id}">
                <i class="fa-solid fa-plus"></i><span class="tool-tip">Quick View</span>
              </a>
            </div>
          </div>
          <div class="product-content">
            <h6 class="prodect-title">${product.name}</h6>
            <p>${product.price}</p>
          </div>
        </div>
      </div>
    `;

        // Populate the appropriate list based on the category
        if (category === "All" || product.categories.includes("Furniture")) {
            document.getElementById("product-list-furniture").innerHTML += productHTML;
        }
        if (category === "All" || product.categories.includes("Accessories")) {
            document.getElementById("product-list-accessories").innerHTML += productHTML;
        }
        if (category === "All" || product.categories.includes("Chair")) {
            document.getElementById("product-list-chair").innerHTML += productHTML;
        }
        if (category === "All") {
            document.getElementById("product-list-all").innerHTML += productHTML;
        }
    });
}

// Initial render (All Products tab is selected by default)
renderProducts("All");

// Event listener for filtering based on tab selection
document.querySelectorAll('.nav-link').forEach(tab => {
    tab.addEventListener('click', function () {
        const category = this.getAttribute('href').split('_')[1];
        renderProducts(category);
    });
});

// Event listener for showing product details in the modal
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("quick-view")) {
        const productId = event.target.getAttribute("data-id");
        const product = products.find(p => p.id === parseInt(productId));

        if (product) {
            // Populate the modal with product details dynamically
            document.getElementById("modal-img").src = product.image;
            document.getElementById("modal-title").textContent = product.name;
            document.getElementById("modal-description").textContent = product.description;
            document.getElementById("modal-price").textContent = product.price;

            // Fill in additional details if needed (optional)
            document.getElementById("sku").textContent = product.id;  // Just as an example, SKU can be product ID or anything else
            document.getElementById("product-category").textContent = product.categories.join(', ');
            document.getElementById("product-tag").textContent = "Pottery"; // You can modify this as per your data
        }
    }
});
