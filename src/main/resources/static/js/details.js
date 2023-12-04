import { escapeHTML } from './escape-html';
document.addEventListener('DOMContentLoaded', function () {
    const url = window.location.href;
    const queryString = url.split('?')[1];
    const id = new URLSearchParams(queryString).get('id');
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
                deleteBtn.classList.add("user_selection_button");
                deleteBtn.innerText = "Delete product";
                deleteBtn.setAttribute("id", "btn_delete");
                userSelection.appendChild(updateBtn);
                userSelection.appendChild(deleteBtn);
                prodContainer.appendChild(userSelection);
                const productBody = document.createElement("div");
                productBody.classList.add("container", "product_details");
                const imgBody = document.createElement('div');
                imgBody.classList.add("col-6", "form_left");
                const imgPath = escapeHTML(data.imagePath);
                const productName = escapeHTML(data.name);
                const imgElement = document.createElement('img');
                imgElement.setAttribute("id", "prodImg");
                imgElement.src = imgPath;
                imgElement.alt = productName;
                imgBody.setAttribute("id", "prodImg");
                imgBody.appendChild(imgElement);
                productBody.appendChild(imgBody);
                const prodDetails = document.createElement('div');
                prodDetails.classList.add("col-6", "form-right");
                const prodDescription = escapeHTML(data.description);
                const prodDetailsContent = [
                    { htmlContent: [`<h2 class="prodName" id="prodName">${productName}</h2>`] },
                    { htmlContent: [`<p class="productPrice" id="prodPrice">$${Number(data.price).toFixed(2)}</p>`] },
                    { htmlContent: [`<div class="qty_section"><p class="qty_txt">Qty</p><input type="number" class="qty_input"></div>`] },
                    { htmlContent: [`<button class="purchase_btn">Purchase</button></div>`] },
                    { htmlContent: [`<div class="prodDescription" id="prodDescription">${prodDescription}</div>`] }
                ];

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
                productBody.appendChild(prodDetails);
                prodContainer.appendChild(productBody);

                // document.getElementById("prodImg").innerHTML = `<img src="${data.imagePath}" alt="${data.name}">`
                // document.getElementById("prodName").innerHTML = data.name
                // document.getElementById("prodPrice").innerHTML = `$${data.price}`;
                // document.getElementById("prodDescription").innerHTML = data.description;
                // displayRating(products[selectedProductId])
            })
    }
    else {
        apiContainer.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
        apiContainer.setAttribute("role", "alert");
        apiContainer.innerText = "No id indicated in the URL.";
    }

    function displayRating(data) {
        let productRating = document.getElementById("prodRating")

        for (let i = 1; i <= data.rating; i++) {
            let listRatingFull = document.createElement("i")
            listRatingFull.className = "bi"
            listRatingFull.classList.add("bi-star-fill")
            productRating.appendChild(listRatingFull)
        }

        if (data.rating % 1 != 0) {
            let listRatingHalf = document.createElement("i")
            listRatingHalf.className = "bi"
            listRatingHalf.classList.add("bi-star-half")
            productRating.appendChild(listRatingHalf)

            for (let i = data.rating; i < 5 - 1; i++) {
                let listRatingNone = document.createElement("i")
                listRatingNone.className = "bi"
                listRatingNone.classList.add("bi-star")
                productRating.appendChild(listRatingNone)
            }
        } else {
            for (let i = data.rating; i < 5; i++) {
                let listRatingNone = document.createElement("i")
                listRatingNone.className = "bi"
                listRatingNone.classList.add("bi-star")
                productRating.appendChild(listRatingNone)
            }
        }
    }
}
);