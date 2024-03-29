document.addEventListener('DOMContentLoaded', function () {
  const productName = document.getElementById("input_bar_name");
  productName.addEventListener("focusout", validateName);
  const productPrice = document.getElementById("input_bar_price");
  productPrice.addEventListener("input", validatePrice);
});


// Product name and price validation - show/hide warning

// Product name

function validateName() {
const productName = document.getElementById("input_bar_name");
const nameError = document.getElementById("nameErrorCol1");
const nameError2 = document.getElementById("nameErrorCol2");

    if (productName.value.length < 5 ) {
        nameError.style.display = "block";
        nameError2.style.display = "block";
    }
    else if (productName.value.length >= 5 || productName.value.length <= 80) {
        nameError.style.display = "none";
        nameError2.style.display = "none";
    }
}
// Product price

function validatePrice() {
const productPrice = document.getElementById("input_bar_price");
const priceError = document.getElementById("priceErrorCol1");
const priceError2 = document.getElementById("priceErrorCol2");

    const priceValue = parseFloat(productPrice.value);
    if (isNaN(priceValue) || priceValue < 0 || priceValue > 999.99) {
        priceError.style.display = "block";
        priceError2.style.display = "block";
    }
    else {
        priceError.style.display = "none";
        priceError2.style.display = "none";
    }
}

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

// This section is to enable the Tea Format selection only if product type Tea is checked
const typeForm = document.getElementsByName('prod_type');
const teaCheckBox = document.getElementById('prod_type_tea');
const looseLeafCheckBox = document.getElementById('tea_format_looseLeaf')
const teaFormatBoxes = document.querySelectorAll("#tea_format_looseLeaf, #tea_format_powder, #tea_format_teabag");

function handleTeaCheckBoxChange(){
    teaFormatBoxes.forEach(checkBox => {
            if (!teaCheckBox.checked) {
                checkBox.checked = false;
                checkBox.disabled = true;
            }
            else {
                checkBox.disabled = false;
                looseLeafCheckBox.checked = true;
            }
        })
}

typeForm.forEach(function(element){
    element.addEventListener('change', handleTeaCheckBoxChange)
})

//Uncomment the below for junit testing
//module.exports = {validateName, validatePrice}