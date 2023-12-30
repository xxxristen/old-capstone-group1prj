// Initialize productController (item controller) as a new product list
const productController = new ProductController()
window.name = "productController"

document.addEventListener('DOMContentLoaded', function () {
const url = document.location.search;
let urlParams = new URLSearchParams(url);
    let id = urlParams.get("id");
    const apiContainer = document.getElementById("apiError");
    if (id) {
        fetch(`/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
                    apiContainer.setAttribute("role", "alert");
                    apiContainer.innerText = "Product id does not exist.";
                    throw new Error("Fetching of data failed.");
                }
                return response.json();
            })
            .then(data => {
                const prodContainer = document.getElementById('prodContainer');
                const userSelection = document.createElement('div');
                userSelection.classList.add("user_selection");
                const updateBtn = document.createElement('button');
                const deleteBtn = document.createElement('button');
                updateBtn.innerText = "Update product";
                updateBtn.classList.add("user_selection_button");
                updateBtn.setAttribute("id", "btn_update");
                updateBtn.addEventListener('click',()=>{
                    window.location.href= "update-product.html?id=" + id
                })
                deleteBtn.classList.add("user_selection_button");
                deleteBtn.innerText = "Delete product";
                deleteBtn.setAttribute("id", "btn_delete");
                deleteBtn.addEventListener('click', ()=>{
                        productController.deleteProduct(id)

                        // Run toast if new product is deleted successfully
                        var toastEl = document.querySelector('#delete');
                        var toast = new bootstrap.Toast(toastEl);
                        toast.show();

                        var productDeletedToast = document.querySelector('#delete');
                        productDeletedToast.addEventListener('hidden.bs.toast', function () {
                            window.open("products.html", "productController");
                        });
                });
                userSelection.appendChild(updateBtn);
                userSelection.appendChild(deleteBtn);
                prodContainer.appendChild(userSelection);
                const productBody = document.createElement("div");
                productBody.classList.add("container", "product_details");
                const productContent = document.createElement("div");
                productContent.classList.add("row");
                const imgBody = document.createElement('div');
                imgBody.classList.add("col-6", "form_left");
                const imgPath = escapeHTML(data.imagePath);
                const productName = escapeHTML(data.name);
                const imgElement = document.createElement('img');
                imgElement.setAttribute("id", "prodImg");
                imgElement.src = imgPath;
                imgElement.alt = productName;
                imgBody.setAttribute("id", "prodImg");
                const prodDetails = document.createElement('div');
                prodDetails.classList.add("col-6", "form-right");
                const prodDescription = escapeHTML(data.description);
                const prodDetailsContent = [
                    { htmlContent: [`<h2 class="prodName" id="prodName">${productName}</h2>`] },
                    { htmlContent: [`<p class="prodPrice" id="prodPrice">$${Number(data.price).toFixed(2)}</p>`] },
//                    { htmlContent: [`<div class="purchase_section"><div class="qty_section"><p class="qty_txt">Qty</p><input type="number" class="qty_input" id="qty_input"></div><button type="button" class="purchase_btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="orderProduct()">Purchase</button></div></div>`] },
                    { htmlContent: [`<div class="prodDescription" id="prodDescription">${prodDescription}</div>`] },
                    { htmlContent: [`<button type="button" class="user_selection_button" onclick="addToEnquiry()">Add to Enquiry</button>`] }
                ];
                imgBody.appendChild(imgElement);
                productContent.appendChild(imgBody);
                productContent.appendChild(prodDetails);
                productBody.appendChild(productContent);

                // Loop through prodDetailsContent and create elements
                for (const content of prodDetailsContent) {
                    const contentElement = document.createElement('div');
                    // Append HTML content elements
                    for (const line of content.htmlContent) {
                        const fragment = document.createRange().createContextualFragment(line);
                        contentElement.appendChild(fragment);
                    }
                    prodDetails.appendChild(contentElement);
                }
                prodContainer.appendChild(productBody);

                // document.getElementById("prodImg").innerHTML = `<img src="${data.imagePath}" alt="${data.name}">`
                // document.getElementById("prodName").innerHTML = data.name
                // document.getElementById("prodPrice").innerHTML = `$${data.price}`;
                // document.getElementById("prodDescription").innerHTML = data.description;

                const usernameSpanBig = document.getElementById("logoutBig");
                const usernameSpanSmall = document.getElementById("logoutSmall");

                if (!usernameSpanBig || !usernameSpanSmall) {
                    userSelection.style.display = "none"
                } else {
                    userSelection.style.display = "flex"
                }
            })
    }
    else {
        apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
        apiContainer.setAttribute("role", "alert");
        apiContainer.innerText = "No id indicated in the URL.";
    }
});

// Function to check if an ID is present in the array
function isIdPresent(arr, targetId) {
  return arr.some(product => product.id === targetId);
}

function addToEnquiry(){
    const url = document.location.search;
    let urlParams = new URLSearchParams(url);
    let id = urlParams.get("id");

    if(!localStorage.getItem('enquiryList')){
        const dummyArray = []
        localStorage.setItem('enquiryList',JSON.stringify(dummyArray))
    }

    const enquiryList = JSON.parse(localStorage.getItem('enquiryList')) || [];
    const idInt = parseInt(id)
    const toastText = document.querySelector("#toast_text")

    if(isIdPresent(enquiryList,idInt)){
        var toastEl = document.querySelector('#addToEnquiry');
        var toast = new bootstrap.Toast(toastEl);
        toastText.innerText = "Product has been added to enquiry previously. You may edit the quantity of the product in the shopping enquiry page"
        toast.show();

        var productAddToEnquiry = document.querySelector('#addToEnquiry');
        productAddToEnquiry.addEventListener('hidden.bs.toast', function () {
            window.open("enquiry-form.html");
        });

    } else{
            fetch(`/api/products/${id}`)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            productController.storeDataToLocalStorage(data)
                        })

        // Run toast if new product is added to enquiry successfully
        var toastEl = document.querySelector('#addToEnquiry');
        var toast = new bootstrap.Toast(toastEl);
        toastText.innerText = "Product added to enquiry"
        toast.show();

        var productAddToEnquiry = document.querySelector('#addToEnquiry');
        productAddToEnquiry.addEventListener('hidden.bs.toast', function () {
            window.open("enquiry-form.html", "productController");
        });
    }
}

var windowName = window.name;
console.log("Window Name:", windowName);
