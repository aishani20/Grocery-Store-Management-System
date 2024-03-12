// productListApiUrl, uomListApiUrl, productSaveApiUrl,
// productDeleteApiUrl, orderListApiUrl, orderSaveApiUrl, productsApiUrl  these are present in common.js

var productModal = document.getElementById("productModal");

document.addEventListener("DOMContentLoaded", async function () {
  // Making HTTP call from JavaScript code
  await fetch(productListApiUrl, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      console.log("This is our data", data);
      if (data) {
        var table = "";
        data.forEach(function (product) {
          table +=
            '<tr data-id="' +
            product.product_id +
            '" data-name="' +
            product.name +
            '" data-unit="' +
            product.uom_id +
            '" data-price="' +
            product.price_per_unit +
            '">' +
            "<td>" +
            product.name +
            "</td>" +
            "<td>" +
            product.uom_name +
            "</td>" +
            "<td>" +
            product.price_per_unit +
            "</td>" +
            '<td><span class="btn btn-xs btn-danger delete-product">Delete</span></td>' +
            "</tr>";
        });
        document.querySelector("table tbody").innerHTML = table;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Save Product
document.getElementById("saveProduct").addEventListener("click", function () {
  var data = new FormData(document.getElementById("productForm"));
  var requestPayload = {
    product_name: data.get("name"),
    uom_id: data.get("uoms"),
    price_per_unit: data.get("price"),
  };
  callApi("POST", productSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});

//Event listener for deleting the product
document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("delete-product")) {
    var tr = event.target.closest("tr");

    var data = {
      product_id: tr.dataset.id,
    };
    var isDelete = confirm(
      "Are you sure to delete " + tr.dataset.name + " item?"
    );
    if (isDelete) {
      await callApi("POST", productDeleteApiUrl, data);
      tr.remove();
    }
  }
});

//Event listener for opening the product modal
document
  .getElementById("openProductModal")
  .addEventListener("click", function () {
    //showing the product modal
    productModal.style.display = "block";

    // Making HTTP call to get UOM
    fetch("http://127.0.0.1:5000/getUOM", {
      method: "GET",
    })
      .then((response) => response.json())
      .then(function (response) {
        if (response) {
          console.log(response);
          var options = '<option value="">--Select--</option>';
          response.forEach(function (uom) {
            options +=
              '<option value="' +
              uom.uom_id +
              '">' +
              uom.uom_name +
              "</option>";
          });
          document.getElementById("uoms").innerHTML = options;
        }
      });
  });

//Event listener for closing the product modal
document
  .getElementById("closeProductModal")
  .addEventListener("click", function () {
    productModal.style.display = "none";
  });

//Event listener for closing the product modal when clicked outside the modal
window.addEventListener("click", function (event) {
  if (event.target === productModal) {
    productModal.style.display = "none";
  }
});
