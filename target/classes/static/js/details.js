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
                // To start tabulating the product details into the page if the fetch api is successfully responded
                const prodContainer = document.getElementById('prodContainer');
                const userSelection = document.createElement('div');
                userSelection.classList.add("user_selection");
                const updateBtn = document.createElement('button');
                const deleteBtn = document.createElement('button');
                updateBtn.innerText = "Update product";
                updateBtn.classList.add("user_selection_button");
                updateBtn.setAttribute("id", "btn_update");
                // This button direct the user to product details page whereby he/she can update or delete the product
                updateBtn.addEventListener('click',()=>{
                    window.location.href= "update-product.html?id=" + id
                })
                deleteBtn.classList.add("user_selection_button");
                deleteBtn.setAttribute("data-bs-toggle","modal")
                deleteBtn.setAttribute("data-bs-target","#exampleModal")
                deleteBtn.innerText = "Delete product";
                deleteBtn.setAttribute("id", "btn_delete");
                // This button will display the a Bootstrap modal that will ask user for confirmation for delete
                deleteBtn.addEventListener("click",()=>{
                    localStorage.setItem("product_id_to_delete", id)
                    document.querySelector("#modal_delete_text").innerText = `Are you sure you want to delete ${data.name}?`
                })

                //These 2 buttons are for mobile view only
                const updateBtnMobile = document.createElement('button');
                const deleteBtnMobile = document.createElement('button');
                updateBtnMobile.innerText = "Update";
                updateBtnMobile.classList.add("user_selection_button");
                updateBtnMobile.setAttribute("id", "btn_update_mobile");
                updateBtnMobile.addEventListener('click',()=>{
                    window.location.href= "update-product.html?id=" + id
                })
                deleteBtnMobile.classList.add("user_selection_button");
                deleteBtnMobile.setAttribute("data-bs-toggle","modal")
                deleteBtnMobile.setAttribute("data-bs-target","#exampleModal")
                deleteBtnMobile.setAttribute("id", "btn_delete_mobile");
                deleteBtnMobile.innerText = "Delete";
                deleteBtnMobile.addEventListener("click",()=>{
                    localStorage.setItem("product_id_to_delete", id)
                    document.querySelector("#modal_delete_text").innerText = `Are you sure you want to delete ${data.name}?`
                })

                userSelection.appendChild(updateBtn);
                userSelection.appendChild(deleteBtn);
                userSelection.appendChild(updateBtnMobile);
                userSelection.appendChild(deleteBtnMobile);
                prodContainer.appendChild(userSelection);

                const productBody = document.createElement("div");
                productBody.classList.add("container", "product_details");
                const productContent = document.createElement("div");
                productContent.classList.add("row");
                const imgBody = document.createElement('div');
                imgBody.classList.add("col-12", "col-sm-6", "form_left");
                const imgPath = escapeHTML(data.imagePath);
                const productName = escapeHTML(data.name);
                const imgElement = document.createElement('img');
                imgElement.setAttribute("id", "prodImg");
                imgElement.src = imgPath;
                imgElement.alt = productName;
                imgBody.setAttribute("id", "prodImg");
                const prodDetails = document.createElement('div');
                prodDetails.classList.add("col-12", "col-sm-6", "form-right");
                const prodDescription = escapeHTML(data.description);
                const prodDetailsContent = [
                    { htmlContent: [`<h2 class="prodName" id="prodName">${productName}</h2>`] },
                    { htmlContent: [`<p class="prodPrice" id="prodPrice">$${Number(data.price).toFixed(2)}</p>`] },
//                    { htmlContent: [`<div class="purchase_section"><div class="qty_section"><p class="qty_txt">Qty</p><input type="number" class="qty_input" id="qty_input"></div><button type="button" class="purchase_btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="orderProduct()">Purchase</button></div></div>`] },
                    { htmlContent: [`<div class="prodDescription" id="prodDescription">${prodDescription}</div>`] },
                    { htmlContent: [`<div class="mobile_center"><button type="button" class="user_selection_button" onclick="addToEnquiry()">Add to Enquiry</button></div>`] }
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

//function to add the product into local storage to be rendered in the enquiry form later
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
        // If the product exists in local storage, the toast is run to inform the the customer
        var toastEl = document.querySelector('#addToEnquiry');
        var toast = new bootstrap.Toast(toastEl);
        toastText.innerText = "Product has been added to enquiry previously. You may edit the quantity of the product in the enquiry page."
        toast.show();
        scrollToTop();

        var productAddToEnquiry = document.querySelector('#addToEnquiry');
        productAddToEnquiry.addEventListener('hidden.bs.toast', function () {
            window.open("enquiry-form.html");
        });

    } else{
        // If the product does not exist in local storage, product is fetched from database to the local storage
            fetch(`/api/products/${id}`)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            productController.storeDataToLocalStorage(data)
                        })

        // Run toast if new product is added to enquiry form successfully
        var toastEl = document.querySelector('#addToEnquiry');
        var toast = new bootstrap.Toast(toastEl);
        toastText.innerText = "Product added to enquiry"
        toast.show();
        scrollToTop();

        var productAddToEnquiry = document.querySelector('#addToEnquiry');
        productAddToEnquiry.addEventListener('hidden.bs.toast', function () {
            window.open("enquiry-form.html", "productController");
        });
    }
}
