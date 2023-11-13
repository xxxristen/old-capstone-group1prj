// Used in form.html - Adding of new product.

// Initialize teaList as a new product list
const teaList = new productList()

// Select the form
const newProdForm = document.querySelector("#productForm")

// To store the base64 encoded string of the uploaded image
let imgURL

function setImgNull(file) {
    file.value = '';
    document.getElementById('imagePreview').style.display = "none";
}

// Validation - Image type and file size
function imgValidation() {
    const file = document.querySelector("#input_image");
    // Get image name + extension
    var filePath = file.value;
    // Get image size in MB and rounded to 2 decimal points
    var fileSize = ((document.querySelector("input[type=file]").files[0].size) / 1024 / 1024).toFixed(2);
    // Allowed image formats
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid image type');
        setImgNull(file);
        return false;
    }
    else {
        // Check size of image that is of allowed extension
        if (fileSize > 1) {
            alert("Please upload an image that is max 1 MB in size.")
            file.value = '';
            document.getElementById('imagePreview').style.display = "none";
        }
        else {
            return true;
        }
    }
}

// A function to encode the uploaded image file to base64 format to display it on web directly once the new product is created
function getImgURL(input) {
    const file = document.querySelector("input[type=file]").files[0];
    let checkImgStatus = imgValidation();
    if (checkImgStatus && file) {
        var reader = new FileReader()
        reader.onload = function () {
            imgURL = reader.result
            console.log(imgURL)
            // Set image preview
            let previewDiv = document.getElementById('imagePreview');
            previewDiv.style.display = "unset";
            previewDiv.innerHTML =
                '<img src="' + imgURL
                + '"/>';
        }
        reader.readAsDataURL(file)
    }
}


// Add an 'onsubmit' event listener to the form
newProdForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // Select inputs
    const newProdName = document.querySelector('#input_bar_name')
    const newProdType = document.querySelector('input[name="prod_type"]:checked')
    const newProdPrice = document.querySelector('#input_bar_price')
    const newProdDescription = document.querySelector('#input_bar_description')
    const newProdImage = document.querySelector('#input_image')
    const newProdFormat = document.querySelector('input[name="tea_format"]:checked')

    // Get values of inputs
    const name = newProdName.value
    const type = newProdType.value
    const price = newProdPrice.value
    const description = newProdDescription.value
    // const image = reader.result
    const format = newProdFormat.value

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
        imgURL="./img/teas/default-Prod-Img.png";
    }

    // Add new product to the list
    teaList.addProduct(imgURL, name, price, description, type, format)

    // Run toast if new product is created successfully
    var toastEl = document.querySelector('.toast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();

    var productAddedToast = document.querySelector('.toast');
    productAddedToast.addEventListener('hidden.bs.toast', function () {
        window.open("product.html", "productlist");
    });

    // Reset the user inputs
    newProdName.value = ''
    newProdType.value = ''
    newProdPrice.value = ''
    newProdDescription.value = ''
    newProdImage.value = ''
    document.getElementById('imagePreview').style.display = "none";
    newProdFormat.value = ''
})

// This section is to enable or disable the Tea Format Selection based on the product type
const formatForm = document.getElementsByName('tea_format')

function disableFormat() {
    formatForm.forEach(element => {
        element.disabled = true
    })
}

function enableFormat() {
    formatForm.forEach(element => {
        element.disabled = false
    })
}