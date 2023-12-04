// This is the controller class (with methods) to control/manage the products

// Create a class product controller
class ProductController {

    constructor(data = []) {
        this.products = data
        // this.storeDataToLocalStorage(data);
    }

    // Fetch API - Get
    async fetchData() {
        try {
            let response = await fetch("/api/products");
            let data = await response.json();
            displayList(data);
        }
        catch (error) {
            console.error("Error fetching products from API: ", error);
        }
    }

    // Fetch array of objects and display in HTML (instantiated to ref classname '.row')
    displayList(data) {
        const unorderedList = document.querySelector(".row")

        // If no product
        if (!data.length) {
            let listProduct = document.createElement("li")
            listProduct.innerHTML = `<span>There are no products at the moment.</span>`
            listProduct.style.alignItems = "center"
            listProduct.style.fontSize = "x-large"
            listProduct.style.fontStyle = "italic"
            listProduct.style.listStyle = "none"
            unorderedList.appendChild(listProduct)
            return
        }

        // Populate product cards
        for (let i = 0; i < data.length; i++) {
            const formattedPrice = parseFloat(data[i].price).toFixed(2);
            let listProduct = document.createElement("a")
            listProduct.className = "card"
            listProduct.classList.add("card_listing")
            listProduct.setAttribute("data-product-id", i)
            listProduct.href = "product-details.html?id=" + data[i].id
            listProduct.innerHTML = `
                <img src="${data[i].imagePath}"/>
                <div class="card-body">
                    <h5 class="card-title">${data[i].name}</h5>
                    <div class="card-text proReview" id="product${data[i].id}">
                    </div>
                    <p class="card-text proPrice">$${formattedPrice}</p>
                    <p class="card-text proDescription">${data[i].description}</p>
                </div>
            `
            unorderedList.appendChild(listProduct)
            this.displayRating(data[i])
        }
    }

    // To display ratings in star graphics
    displayRating(data) {
        let productRating = document.querySelector(`#product${data.id}`)

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

    // Post and Put
    async sendJSON(name, type, format, price, country, description, image, method) {
        // declare max and min variables for ratings
        const max = 5
        const min = 1

        const product = {
            name: name,
            type: type,
            format: format,
            price: price,
            country: country,
            description: description,
            // rating: Math.floor(Math.random() * (max - min + 1)) + min, //Randomly generate ratings of 1-5
            imagePath: image
        }
        try {
            const response = await fetch("/api/products", {
                method: method.toUpperCase(),
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            const result = await response.json();
            console.log("Result:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

// Capture the product index selected by user to display its details in the product details page
document.addEventListener('DOMContentLoaded', function () {
    var productLinks = document.querySelectorAll('a[data-product-id]');

    productLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            var productId = link.getAttribute('data-product-id')
            localStorage.setItem('selectedProductId', productId)
        })
    })
})