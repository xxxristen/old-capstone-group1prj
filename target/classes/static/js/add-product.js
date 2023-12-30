// Initialize productController (item controller) as a new product list
// Perform POST/PUT request with Fetch API
const productController = new ProductController()

// Select the form
const newProdForm = document.querySelector("#productForm")

//// Product name and price validation - show/hide warning
//// Product name
//const productName = document.getElementById("input_bar_name");
//const nameError = document.getElementById("nameErrorCol1");
//const nameError2 = document.getElementById("nameErrorCol2");
//productName.addEventListener("focusout", validateName);
//function validateName() {
//    if (productName.value.length < 5) {
//        nameError.style.display = "block";
//        nameError2.style.display = "block";
//    }
//    else if (productName.value.length >= 5 || productName.value.length <= 80) {
//        nameError.style.display = "none";
//        nameError2.style.display = "none";
//    }
//}
//// Product price
//const productPrice = document.getElementById("input_bar_price");
//const priceError = document.getElementById("priceErrorCol1");
//const priceError2 = document.getElementById("priceErrorCol2");
//
//productPrice.addEventListener("input", validatePrice);
//function validatePrice() {
//    const priceValue = parseFloat(productPrice.value);
//    if (isNaN(priceValue) || priceValue < 0 || priceValue > 999.99) {
//        priceError.style.display = "block";
//        priceError2.style.display = "block";
//    }
//    else {
//        priceError.style.display = "none";
//        priceError2.style.display = "none";
//    }
//}
//
//// To store the base64 encoded string of the uploaded image
//let imgURL
//
//// Function to set the image input value to null and hide the image preview
//function setImgNull(file) {
//    file.value = '';
//    document.getElementById('imagePreview').style.display = "none";
//}
//
//// Validation - Image type and file size
//function imgValidation() {
//    const file = document.querySelector("#input_image");
//    // Get image name + extension
//    if (file.files.length > 0) {
//        var filePath = file.value;
//        // Get image size in MB and rounded to 2 decimal points
//        var fileSize = ((document.querySelector("input[type=file]").files[0].size) / 1024 / 1024).toFixed(2);
//        // Allowed image formats
//        var allowedExtensions =
//            /(\.jpg|\.jpeg|\.png)$/i;
//        if (!allowedExtensions.exec(filePath)) {
//            alert('Invalid image type');
//            setImgNull(file);
//            return false;
//        }
//        else {
//            // Check size of image that is of allowed extension
//            if (fileSize > 1) {
//                alert("Please upload an image that is max 1 MB in size.")
//                file.value = '';
//                document.getElementById('imagePreview').style.display = "none";
//            }
//            else {
//                return true;
//            }
//        }
//    }
//}
//
//// A function to encode the uploaded image file to base64 format to display it on web directly once the new product is created
//function getImgURL(input) {
//    const file = document.querySelector("input[type=file]").files[0];
//    const previewDiv = document.getElementById('imagePreview');
//    if (previewDiv.hasChildNodes()) {
//        // If an image has been chosen previously, remove it from the previewDiv
//        previewDiv.removeChild(previewDiv.firstChild);
//    }
//    let checkImgStatus = imgValidation();
//    if (checkImgStatus && file) {
//        var reader = new FileReader()
//        reader.onload = function () {
//            imgURL = reader.result;
//            // Set image preview
//            previewDiv.style.display = "unset";
//            const previewImg = document.createElement('img');
//            previewImg.src = imgURL;
//            previewDiv.appendChild(previewImg);
//        }
//        // Read image file as data url
//        reader.readAsDataURL(file)
//    }
//}

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

    // If no image uploaded - replace with default image
    if (newProdImage.files.length == 0) {
        imgURL = "/img/teas/default-prod-img.png";
    }
    // Temporary fix to store the actual image name in db, instead of the base64
    else if (newProdImage.files.length > 0) {
        imgURL = "/img/teas/" + (newProdImage.value).replace("C:\\fakepath\\", "");
    }

    // POST to api
    productController.sendJSON(0, name, type, format, price, country, description, imgURL, "POST")

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

//// This section is to enable or disable the Tea Format Selection based on the product type
//const formatForm = document.getElementsByName('tea_format')
//
//function disableFormat() {
//    formatForm.forEach(element => {
//        element.disabled = true
//    })
//}
//
//function enableFormat() {
//    formatForm.forEach(element => {
//        element.disabled = false
//    })
//}