$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('Please login to access this page.');
        window.location.href = 'login.html'; // Redirect to login page
    }
   
    let orders = []; // Store all orders fetched from the API

    // Function to fetch orders from the API
    function fetchOrders() {
        $.ajax({
            url: 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders',
            type: 'GET',
            success: function(data) {
                orders = data; // Store all orders
                displayOrders(orders); // Display all orders by default
            },
            error: function() {
                alert('Error fetching orders');
            }
        });
    }

    // Function to display orders in the table
    function displayOrders(ordersToDisplay) {
        const tableBody = $('#order-table tbody');
        tableBody.empty(); // Clear existing rows

        ordersToDisplay.forEach(function(order) {
            const row = `<tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.orderDate}</td>
                <td>${order.orderTime}</td>
                <td>${order.amount}</td>
                <td>${order.orderStatus}</td>
            </tr>`;
            tableBody.append(row);
        });
    }

    // Fetch orders on page load
    fetchOrders();

    // Event listener for checkbox changes
    $('input[type="checkbox"]').change(function() {
        filterOrders();
    });

    // Function to filter orders based on checkbox values
    function filterOrders() {
        const newOrderCheckbox = $('#newOrderCheckbox').prop('checked');
        const packedOrderCheckbox = $('#packedOrderCheckbox').prop('checked');
        const inTransitOrderCheckbox = $('#inTransitOrderCheckbox').prop('checked');
        const deliveredOrderCheckbox = $('#deliveredOrderCheckbox').prop('checked');

        // Filter orders based on checkbox values
        const filteredOrders = orders.filter(function(order) {
            return (
                (newOrderCheckbox && order.orderStatus === 'New') ||
                (packedOrderCheckbox && order.orderStatus === 'Packed') ||
                (inTransitOrderCheckbox && order.orderStatus === 'InTransit') ||
                (deliveredOrderCheckbox && order.orderStatus === 'Delivered')
            );
        });

        displayOrders(filteredOrders);
    }
});
