// Initialize productController (item controller) as a new product list
const productController = new ProductController()

const url = document.location.search;
let urlParams = new URLSearchParams(url);
let id = urlParams.get("id");
const apiContainer = document.getElementById("apiError");
const contentHolder = document.querySelector("#content_holder")

                const formHolder = document.createElement("div")
                formHolder.classList.add("row")
                const formContent = document.createElement("form")
                formContent.classList.add("col", "user_input")
                formContent.setAttribute("id", "productForm")
                formHolder.appendChild(formContent)
                contentHolder.appendChild(formHolder)

//import { escapeHTML } from './escape-html';
document.addEventListener('DOMContentLoaded', function () {
//    const url = window.location.href;
//    const queryString = url.split('?')[1];
//    const id = new URLSearchParams(queryString).get('id');
//    const apiContainer = document.getElementById("apiError");
    if (id) {
        fetch(`/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
                    apiContainer.setAttribute("role", "alert");
                    apiContainer.innerText = "Product id does not exist.";
                    const pageTitle = document.querySelector("h1");
                    pageTitle.style.display = "none"
                    throw new Error("Fetching of data failed.");
                }
                return response.json();
            })
            .then(data =>{
//                const inputName = document.getElementById("input_bar_name")
//                inputName.value = data.name
//                const inputPrice = document.getElementById("input_bar_price")
//                inputPrice.value = data.price
//                const inputCountry = document.getElementById("input_bar_country")
//                inputCountry.value = data.country
//                const inputDescription = document.getElementById("input_bar_description")
//                inputDescription.value = data.description
//                const inputImage = document.getElementById("currentImage")
//                inputImage.src = data.imagePath

//                const formHolder = document.createElement("div")
//                formHolder.classList.add("row")
//                const formContent = document.createElement("form")
//                formContent.classList.add("col", "user_input")
//                formContent.setAttribute("id", "productForm")
//                formHolder.appendChild(formContent)
//                contentHolder.appendChild(formHolder)

                const inputNameText = document.createElement("span")
                inputNameText.classList.add("input_txt")
                inputNameText.innerText = "Product name: "
                const inputNameHolder = document.createElement("input")
                inputNameHolder.classList.add("form-control","input_bar")
                inputNameHolder.setAttribute("type", "text")
                inputNameHolder.setAttribute("id", "input_bar_name")
                inputNameHolder.setAttribute("minlength", "5")
                inputNameHolder.setAttribute("maxlength", "80")
                inputNameHolder.value = data.name
                const inputTypeText = document.createElement("span")
                inputTypeText.classList.add("input_txt", "marginTop2Rem")
                inputTypeText.innerText = "Product type: "
                formContent.appendChild(inputNameText)
                formContent.appendChild(inputNameHolder)
                formContent.appendChild(inputTypeText)

                const inputTypeSelection = document.createElement("div")
                inputTypeSelection.classList.add("input_type_selection", "marginTop2Rem")
                formContent.appendChild(inputTypeSelection)

                const inputTypeTeaOuterHolder = document.createElement("div")
                inputTypeTeaOuterHolder.classList.add("form-check")
                const inputTypeTeaHolder = document.createElement("input")
                inputTypeTeaHolder.classList.add("form-check-input")
                inputTypeTeaHolder.setAttribute("type", "radio")
                inputTypeTeaHolder.setAttribute("name", "prod_type")
                inputTypeTeaHolder.setAttribute("id", "prod_type_tea")
                inputTypeTeaHolder.value = "Tea"
                inputTypeTeaHolder.checked = true
                const inputTypeTeaText = document.createElement("label")
                inputTypeTeaText.classList.add("form-check-label")
                inputTypeTeaText.setAttribute("for", "prod_type_tea")
                inputTypeTeaText.innerText = "Tea"
                inputTypeTeaOuterHolder.appendChild(inputTypeTeaHolder)
                inputTypeTeaOuterHolder.appendChild(inputTypeTeaText)
                inputTypeSelection.appendChild(inputTypeTeaOuterHolder)

                const inputTypeTeawareOuterHolder = document.createElement("div")
                inputTypeTeawareOuterHolder.classList.add("form-check")
                const inputTypeTeawareHolder = document.createElement("input")
                inputTypeTeawareHolder.classList.add("form-check-input")
                inputTypeTeawareHolder.setAttribute("type", "radio")
                inputTypeTeawareHolder.setAttribute("name", "prod_type")
                inputTypeTeawareHolder.setAttribute("id", "prod_type_teaware")
                inputTypeTeawareHolder.value = "Teaware"
                inputTypeTeawareHolder.disabled = true
                const inputTypeTeawareText = document.createElement("label")
                inputTypeTeawareText.classList.add("form-check-label")
                inputTypeTeawareText.setAttribute("for", "prod_type_teaware")
                inputTypeTeawareText.innerText = "Teaware"
                inputTypeTeawareOuterHolder.appendChild(inputTypeTeawareHolder)
                inputTypeTeawareOuterHolder.appendChild(inputTypeTeawareText)
                inputTypeSelection.appendChild(inputTypeTeawareOuterHolder)

                const inputTypeAccessoryOuterHolder = document.createElement("div")
                inputTypeAccessoryOuterHolder.classList.add("form-check")
                const inputTypeAccessoryHolder = document.createElement("input")
                inputTypeAccessoryHolder.classList.add("form-check-input")
                inputTypeAccessoryHolder.setAttribute("type", "radio")
                inputTypeAccessoryHolder.setAttribute("name", "prod_type")
                inputTypeAccessoryHolder.setAttribute("id", "prod_type_accessories")
                inputTypeAccessoryHolder.value = "Accessory"
                inputTypeAccessoryHolder.disabled = true
                const inputTypeAccessoryText = document.createElement("label")
                inputTypeAccessoryText.classList.add("form-check-label")
                inputTypeAccessoryText.setAttribute("for", "prod_type_accessories")
                inputTypeAccessoryText.innerText = "Accessory"
                inputTypeAccessoryOuterHolder.appendChild(inputTypeAccessoryHolder)
                inputTypeAccessoryOuterHolder.appendChild(inputTypeAccessoryText)
                inputTypeSelection.appendChild(inputTypeAccessoryOuterHolder)

                const inputFormatText = document.createElement("span")
                inputFormatText.classList.add("input_txt", "input_txt_format", "marginTop2Rem")
                inputFormatText.setAttribute("id", "input_txt_format")
                inputFormatText.innerText = "Tea Format: "
                formContent.appendChild(inputFormatText)

                const inputFormatSelection = document.createElement("div")
                inputFormatSelection.classList.add("input_format_selection", "input_txt_format", "marginTop2Rem")
                formContent.appendChild(inputFormatSelection)

                const inputFormatLooseLeafOuterHolder = document.createElement("div")
                inputFormatLooseLeafOuterHolder.classList.add("form-check")
                const inputFormatLooseLeafHolder = document.createElement("input")
                inputFormatLooseLeafHolder.classList.add("form-check-input")
                inputFormatLooseLeafHolder.setAttribute("type", "radio")
                inputFormatLooseLeafHolder.setAttribute("name", "tea_format")
                inputFormatLooseLeafHolder.setAttribute("id", "tea_format_looseLeaf")
                inputFormatLooseLeafHolder.value = "Loose_leaf"
                inputFormatLooseLeafHolder.checked = true
                const inputFormatLooseLeafText = document.createElement("label")
                inputFormatLooseLeafText.classList.add("form-check-label")
                inputFormatLooseLeafText.setAttribute("for", "tea_format_looseLeaf")
                inputFormatLooseLeafText.innerText = "Loose leaf"
                inputFormatLooseLeafOuterHolder.appendChild(inputFormatLooseLeafHolder)
                inputFormatLooseLeafOuterHolder.appendChild(inputFormatLooseLeafText)
                inputFormatSelection.appendChild(inputFormatLooseLeafOuterHolder)

                const inputFormatPowderOuterHolder = document.createElement("div")
                inputFormatPowderOuterHolder.classList.add("form-check")
                const inputFormatPowderHolder = document.createElement("input")
                inputFormatPowderHolder.classList.add("form-check-input")
                inputFormatPowderHolder.setAttribute("type", "radio")
                inputFormatPowderHolder.setAttribute("name", "tea_format")
                inputFormatPowderHolder.setAttribute("id", "tea_format_powder")
                inputFormatPowderHolder.value = "Powder"
                inputFormatPowderHolder.disabled = true
                const inputFormatPowderText = document.createElement("label")
                inputFormatPowderText.classList.add("form-check-label")
                inputFormatPowderText.setAttribute("for", "tea_format_powder")
                inputFormatPowderText.innerText = "Powder"
                inputFormatPowderOuterHolder.appendChild(inputFormatPowderHolder)
                inputFormatPowderOuterHolder.appendChild(inputFormatPowderText)
                inputFormatSelection.appendChild(inputFormatPowderOuterHolder)

                const inputFormatTeabagOuterHolder = document.createElement("div")
                inputFormatTeabagOuterHolder.classList.add("form-check")
                const inputFormatTeabagHolder = document.createElement("input")
                inputFormatTeabagHolder.classList.add("form-check-input")
                inputFormatTeabagHolder.setAttribute("type", "radio")
                inputFormatTeabagHolder.setAttribute("name", "tea_format")
                inputFormatTeabagHolder.setAttribute("id", "tea_format_teabag")
                inputFormatTeabagHolder.value = "Teabag"
                inputFormatTeabagHolder.disabled = true
                const inputFormatTeabagText = document.createElement("label")
                inputFormatTeabagText.classList.add("form-check-label")
                inputFormatTeabagText.setAttribute("for", "tea_format_teabag")
                inputFormatTeabagText.innerText = "Teabag"
                inputFormatTeabagOuterHolder.appendChild(inputFormatTeabagHolder)
                inputFormatTeabagOuterHolder.appendChild(inputFormatTeabagText)
                inputFormatSelection.appendChild(inputFormatTeabagOuterHolder)

                const inputPriceText = document.createElement("span")
                inputPriceText.classList.add("input_txt", "marginTop2Rem")
                inputPriceText.innerText = "Price (SGD): "
                const inputPriceHolder = document.createElement("input")
                inputPriceHolder.setAttribute("type","text")
                inputPriceHolder.setAttribute("pattern","^(0|[1-9][0-9]{0,2})(\.[0-9]{1,2})?$")
                inputPriceHolder.setAttribute("id","input_bar_price")
                inputPriceHolder.classList.add("form-control","input_bar", "marginTop2Rem")
                inputPriceHolder.value = data.price
                formContent.appendChild(inputPriceText)
                formContent.appendChild(inputPriceHolder)

                const inputCountryText = document.createElement("span")
                inputCountryText.classList.add("input_txt", "marginTop2Rem")
                inputCountryText.innerText = "Country: "
                const inputCountryHolder = document.createElement("input")
                inputCountryHolder.setAttribute("type","text")
                inputCountryHolder.setAttribute("id","input_bar_country")
                inputCountryHolder.classList.add("form-control","input_bar", "marginTop2Rem")
                inputCountryHolder.value = data.country
                formContent.appendChild(inputCountryText)
                formContent.appendChild(inputCountryHolder)

                const inputDescriptionText = document.createElement("span")
                inputDescriptionText.classList.add("input_txt", "marginTop2Rem")
                inputDescriptionText.innerText = "Description: "
                const inputDescriptionHolder = document.createElement("textarea")
                inputDescriptionHolder.setAttribute("name","input_bar_description")
                inputDescriptionHolder.setAttribute("id","input_bar_description")
                inputDescriptionHolder.setAttribute("row","10")
                inputDescriptionHolder.setAttribute("maxlength","500")
                inputDescriptionHolder.classList.add("form-control","input_bar", "marginTop2Rem")
                inputDescriptionHolder.value = data.description
                formContent.appendChild(inputDescriptionText)
                formContent.appendChild(inputDescriptionHolder)

                const currentImageText = document.createElement("span")
                currentImageText.classList.add("input_txt", "marginTop2Rem")
                currentImageText.innerText = "Current Image: "
                const currentImageHolder = document.createElement("img")
                currentImageHolder.classList.add("marginTop2Rem")
                currentImageHolder.setAttribute("id","currentImage")
                currentImageHolder.src = data.imagePath
                formContent.appendChild(currentImageText)
                formContent.appendChild(currentImageHolder)

                const inputImageText = document.createElement("span")
                inputImageText.classList.add("input_txt", "marginTop2Rem")
                inputImageText.innerText = "Change Image: "

                const inputImageOuterHolder = document.createElement("div")
                inputImageOuterHolder.classList.add("input-group", "marginTop2Rem")
                const inputImageRowHolder = document.createElement("div")
                inputImageRowHolder.classList.add("row", "w-100")
                const inputImageHolder = document.createElement("input")
                inputImageHolder.classList.add("form-control")
                inputImageHolder.setAttribute("type","file")
                inputImageHolder.setAttribute("id","input_image")
                inputImageHolder.setAttribute("accept","image/png, image/jpeg, image/jpg")
                inputImageHolder.setAttribute("multiple","false")
                const inputImageWarning = document.createElement("div")
                inputImageWarning.classList.add("row", "w-100", "small", "fw-bold", "pt-1")
                inputImageWarning.innerText = "Image should be in either .jpg, .jpeg or .png format."
                const inputImagePreview = document.createElement("div")
                inputImagePreview.classList.add("row", "pt-2", "w-50")
                inputImagePreview.setAttribute("id","imagePreview")
                inputImageRowHolder.appendChild(inputImageHolder)
                inputImageOuterHolder.appendChild(inputImageRowHolder)
                inputImageOuterHolder.appendChild(inputImageWarning)
                inputImageOuterHolder.appendChild(inputImagePreview)
                formContent.appendChild(inputImageText)
                formContent.appendChild(inputImageOuterHolder)

                const submitButton = document.createElement("button")
                submitButton.classList.add("user_selection_button")
                submitButton.setAttribute("id","btn_updateDB")
                submitButton.setAttribute("type","submit")
                submitButton.innerText = "Update Product"
                formContent.appendChild(submitButton)

                inputImageHolder.addEventListener("change", function(){
                    getImgURL(this)
                })
            })
    } else {
        apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
        apiContainer.setAttribute("role", "alert");
        apiContainer.innerText = "No id indicated in the URL.";
        const pageTitle = document.querySelector("h1");
        pageTitle.style.display = "none"
    }
})


// Select the form
const newProdForm = document.querySelector("#productForm")

// To store the base64 encoded string of the uploaded image
let imgURL

// Function to set the image input value to null and hide the image preview
function setImgNull(file) {
    file.value = '';
    document.getElementById('imagePreview').style.display = "none";
}

// Validation - Image type and file size
function imgValidation() {
    const file = document.querySelector("#input_image");
    // Get image name + extension
    if (file.files.length > 0) {
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
}

// A function to encode the uploaded image file to base64 format to display it on web directly once the new product is created
function getImgURL(input) {
    const file = document.querySelector("input[type=file]").files[0];
    const previewDiv = document.getElementById('imagePreview');
    if (previewDiv.hasChildNodes()) {
        // If an image has been chosen previously, remove it from the previewDiv
        previewDiv.removeChild(previewDiv.firstChild);
    }
    let checkImgStatus = imgValidation();
    if (checkImgStatus && file) {
        var reader = new FileReader()
        reader.onload = function () {
            imgURL = reader.result;
            console.log(imgURL);
            // Set image preview
            previewDiv.style.display = "unset";
            const previewImg = document.createElement('img');
            previewImg.src = imgURL;
            previewDiv.appendChild(previewImg);
        }
        // Read image file as data url
        reader.readAsDataURL(file)
    }
}

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
    const name = newProdName.value;
    const type = newProdType.value;
    const price = newProdPrice.value;
    const country = newProdCountry.value;
    const description = newProdDescription.value;
    const format = newProdFormat.value;

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
        imgURL = currentImage.src
    }
    // Temporary fix to store the actual image name in db, instead of the base64
    else if (newProdImage.files.length > 0) {
        imgURL = "/img/teas/" + (newProdImage.value).replace("C:\\fakepath\\", "");
    }

    // PUT to api
    productController.sendJSON(id, name, type, format, price, country, description, imgURL, "PUT")

    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Run toast if new product is created successfully
    var toastEl = document.querySelector('.toast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();

    var productAddedToast = document.querySelector('.toast');
    productAddedToast.addEventListener('hidden.bs.toast', function () {
        window.open("products.html", "productController");
    });

    // Reset the user inputs
    const formElement = document.querySelector('#productForm');
    formElement.reset();
    // newProdName.value = ''
    // newProdType.value = ''
    // newProdFormat.value = ''
    // newProdPrice.value = ''
    // newProdCountry.value = ''
    // newProdDescription.value = ''
    // newProdImage.value = ''
    document.getElementById('imagePreview').style.display = "none";
}
)

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