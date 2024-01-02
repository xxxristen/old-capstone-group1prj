// Initialize productController (item controller) as a new product list
// Perform POST/PUT request with Fetch API
const productController = new ProductController()

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
    const newProdFormat = document.querySelector('input[name="tea_format"]:checked');

    // Get values of inputs
    const name = escapeHTML(newProdName.value);
    const type = escapeHTML(newProdType.value);
    const price = escapeHTML(newProdPrice.value);
    const country = escapeHTML(newProdCountry.value);
    const description = escapeHTML(newProdDescription.value);
    var format = null

    if(newProdFormat !== null){
        format = escapeHTML(newProdFormat.value);
    }

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

    // If no image uploaded - replace with default image
    if (newProdImage.files.length == 0) {
        imgURL = "/img/teas/default-prod-img.png";
    }
    // Temporary fix to store the actual image name in db, instead of the base64
    else if (newProdImage.files.length > 0) {
        imgURL = "/img/teas/" + (newProdImage.value).replace("C:\\fakepath\\", "");
    }

    // POST to api
    productController.sendJSON(name, type, format, price, country, description, imgURL, "POST")

    // Run toast if new product is created successfully
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