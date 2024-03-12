var productPrices = {};

document.addEventListener("DOMContentLoaded", function () {
  // JSON data by API call for order table
  fetch(productListApiUrl)
    .then((response) => response.json())
    .then(function (response) {
      productPrices = {};
      if (response) {
        var options = '<option value="">--Select--</option>';
        response.forEach(function (product) {
          options +=
            '<option value="' +
            product.product_id +
            '">' +
            product.name +
            "</option>";
          productPrices[product.product_id] = product.price_per_unit;
        });
        var productBoxes = document.querySelectorAll(".product-box select");
        productBoxes.forEach(function (box) {
          box.innerHTML = options;
        });
      }
    })
    .catch((error) => console.error("Error:", error));
});

var newOrderBoxes = document.getElementById("newOrderBoxes");
document.getElementById("addMoreButton").addEventListener("click", function () {
  var newElement = document.getElementById("newOrderBox").cloneNode(true);
  console.log("Add more button clicked")
  var updatedElement = document.getElementById("newOrderBoxes").appendChild(newElement);
  document.getElementById("newOrderBoxes").style.display = "block";
  document.getElementById("newOrderBox").style.display = "block";
});


// document.addEventListener("click", function (event) {
//   if (event.target.classList.contains("remove-row")) {
//     event.target.closest(".row").remove();
//     calculateValue();
//   }
// });

document.addEventListener("change", function (event) {
  if (event.target.classList.contains("cart-product")) {
    var product_id = event.target.value;
    var price = productPrices[product_id];
    event.target.closest(".row").querySelector("#product_price").value = price;
    calculateValue();
  } else if (event.target.classList.contains("product-qty")) {
    calculateValue();
  }
});

document.getElementById("saveOrder").addEventListener("click", function () {
  var formData = new FormData(document.querySelector("form"));
  var requestPayload = {
    customer_name: null,
    total: null,
    order_details: [],
  };

  formData.forEach(function (value, key) {
    switch (key) {
      case "customerName":
        requestPayload.customer_name = value;
        break;
      case "product_grand_total":
        requestPayload.total = value;
        break;
      case "product":
        requestPayload.order_details.push({
          product_id: value,
          quantity: null,
          total_price: null,
        });
        break;
      case "qty":
        var lastElement =
          requestPayload.order_details[requestPayload.order_details.length - 1];
        lastElement.quantity = value;
        break;
      case "item_total":
        var lastElement =
          requestPayload.order_details[requestPayload.order_details.length - 1];
        lastElement.total_price = value;
        break;
    }
  });

  callApi("POST", orderSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});
