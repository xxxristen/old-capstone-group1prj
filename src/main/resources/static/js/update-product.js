// Initialize productController (item controller) as a new product list
const productController = new ProductController()

const url = document.location.search;
let urlParams = new URLSearchParams(url);
let id = urlParams.get("id");

//import { escapeHTML } from './escape-html';
document.addEventListener('DOMContentLoaded', function () {
//    const url = window.location.href;
//    const queryString = url.split('?')[1];
    if (id) {
        fetch(`/api/products/${id}`)
            .then(response => {
                return response.json();
            })
            .then(data =>{

                const inputName = document.getElementById("input_bar_name")
                inputName.value = data.name
                const inputPrice = document.getElementById("input_bar_price")
                inputPrice.value = data.price
                const inputCountry = document.getElementById("input_bar_country")
                inputCountry.value = data.country
                const inputDescription = document.getElementById("input_bar_description")
                inputDescription.value = data.description
                const inputImage = document.getElementById("currentImage")
                inputImage.src = data.imagePath

            })
    }
})

// Select the form
const newProdForm = document.querySelector("#productForm")

// Add an 'onsubmit' event listener to the form
newProdForm.addEventListener('submit', (event) => {
    // Prevent form submission from reloading the page
    event.preventDefault();

    // Select inputs
    const newProdName = document.querySelector('#input_bar_name');
    const newProdType = document.querySelector('input[name="prod_type"]:checked');
    const newProdPrice = document.querySelector('#input_bar_price');
    const newProdCountry = document.querySelector('#input_bar_country');
    const newProdDescription = document.querySelector('#input_bar_description');
    const newProdImage = document.querySelector('#input_image');
    const currentImage = document.getElementById("currentImage")
    const newProdFormat = document.querySelector('input[name="tea_format"]:checked');

    // Get values of inputs
    const name = escapeHTML(newProdName.value);
    const type = escapeHTML(newProdType.value);
    const price = escapeHTML(newProdPrice.value);
    const country = escapeHTML(newProdCountry.value);
    const description = escapeHTML(newProdDescription.value);
    const format = escapeHTML(newProdFormat.value);

    // Validation - Fields cannot be empty
    // Creation of empty array to store those empty fields
    var formFields = [];
    for (let i = 0; i < newProdForm.length; i++) {
        var field = newProdForm.elements[i];
        if (field.type === "text" || field.id === "input_bar_description") {
            if (field.value.trim() === '') {
                let tempName = '';
                switch (field.id) {
                    case "input_bar_name":
                        tempName = "- Product name";
                        break;
                    case "input_bar_price":
                        tempName = "- Price";
                        break;
                    case "input_bar_country":
                        tempName = "- Country";
                        break;
                    case "input_bar_description":
                        tempName = "- Product description";
                        break;
                }
                formFields.push(tempName);
            }
        }
    }
    // If there is any data in formFields, alert the value(s).
    if (formFields.length > 0) {
        alert("You need to complete:\n" + formFields.join("\n"));
        return false;
    }

    // If no image uploaded - the current image is used
    if (newProdImage.files.length == 0) {
        imgURL = currentImage.src
    }
    // Temporary fix to store the actual image name in db, instead of the base64
    else if (newProdImage.files.length > 0) {
        imgURL = "/img/teas/" + (newProdImage.value).replace("C:\\fakepath\\", "");
    }

    // PUT to api
    productController.sendJSON(id, name, type, format, price, country, description, imgURL, "PUT")

    // Run toast if new product is updated successfully
    var toastEl = document.querySelector('.toast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
    scrollToTop();

    var productAddedToast = document.querySelector('.toast');
    productAddedToast.addEventListener('hidden.bs.toast', function () {
        window.open("products.html", "productController");
    });

    // Reset the user inputs
    const formElement = document.querySelector('#productForm');
    formElement.reset();
    document.getElementById('imagePreview').style.display = "none";
}
)