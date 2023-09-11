$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('Please login to access this page.');
        window.location.href = 'login.html'; // Redirect to login page
    }
    let allProducts = []; // Store all products fetched from the API

    // Function to fetch products from the API
    function fetchProducts() {
        $.ajax({
            url: 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products',
            type: 'GET',
            success: function(data) {
                allProducts = data; // Store all products
                displayProducts(allProducts); // Display all products by default
            },
            error: function() {
                alert('Error fetching products');
            }
        });
    }

    // Function to display products in the table
    function displayProducts(products) {
        const tableBody = $('#product-table tbody');
        tableBody.empty(); // Clear existing rows

        products.forEach(function(product) {
            const row = `<tr>
                <td>${product.id}</td>
                <td>${product.medicineName}</td>
                <td>${product.medicineBrand}</td>
                <td>${product.expiryDate}</td>
                <td>${product.unitPrice}</td>
                <td>${product.prescriptionRequired ? 'Yes' : 'No'}</td>
                <td>${product.stock}</td>
            </tr>`;
            tableBody.append(row);
        });
    }

    // Fetch all products on page load
    fetchProducts();

    // Event listeners for checkbox changes
    $('#expiredCheckbox, #lowStockCheckbox').change(function() {
        filterProducts();
    });

    // Function to filter products based on checkbox values
    function filterProducts() {
        const expiredCheckbox = $('#expiredCheckbox').prop('checked');
        const lowStockCheckbox = $('#lowStockCheckbox').prop('checked');

        // Filter products based on checkbox values
        const filteredProducts = allProducts.filter(function(product) {
            const isExpired = checkIfExpired(product.expiryDate);
            const isLowStock = product.stock < 100;
            return (expiredCheckbox && isExpired) || (lowStockCheckbox && isLowStock);
        });

        displayProducts(filteredProducts);
    }

    // Function to check if a product is expired
    function checkIfExpired(expiryDate) {
        const currentDate = new Date();
        const expiry = new Date(expiryDate);
        return expiry < currentDate;
    }
});
