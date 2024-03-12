// Define your API endpoints
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var uomListApiUrl = 'http://127.0.0.1:5000/getUOM';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productDeleteApiUrl = 'http://127.0.0.1:5000/deleteProduct';
var orderListApiUrl = 'http://127.0.0.1:5000/getAllOrders';
var orderSaveApiUrl = 'http://127.0.0.1:5000/insertOrder';
var productsApiUrl = 'https://fakestoreapi.com/products';

// Function to make API calls
async function callApi(method, url, data) {
    try {
        console.log("Data before calling the fetch request : "+JSON.stringify(data));
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        });
        console.log(response.product_id);
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // window.location.reload();
    } catch (error) {
        console.error(error);
        console.log("Error in API call");
    }
}

// Function to calculate total values
function calculateValue() {
    var total = 0;
    var productItems = document.querySelectorAll(".product-item");
    productItems.forEach(function(productItem) {
        var qty = parseFloat(productItem.querySelector('.product-qty').value);
        var price = parseFloat(productItem.querySelector('#product_price').value);
        price = price * qty;
        productItem.querySelector('#item_total').value = price.toFixed(2);
        total += price;
    });
    document.getElementById("product_grand_total").value = total.toFixed(2);
}

// Function to parse order data
function orderParser(order) {
    return {
        id: order.id,
        date: order.employee_name,
        orderNo: order.employee_name,
        customerName: order.employee_name,
        cost: parseInt(order.employee_salary)
    };
}

// Function to parse product data
function productParser(product) {
    return {
        id: product.id,
        name: product.employee_name,
        unit: product.employee_name,
        price: product.employee_name
    };
}

// Function to parse product drop data
function productDropParser(product) {
    return {
        id: product.id,
        name: product.title
    };
}
