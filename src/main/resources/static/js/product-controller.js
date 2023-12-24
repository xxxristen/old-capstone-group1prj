// This is the controller class (with methods) to control/manage the products

// Create a class product controller
class ProductController {

    constructor(data = []) {
        this.products = data;
    }

    //    Fetch API - Get
    //    async fetchData() {
    //        try {
    //            let response = await fetch("/api/products");
    //            let data = await response.json();
    //            this.displayList(data);
    //        }
    //        catch (error) {
    //            console.error("Error fetching products from API: ", error);
    //        }
    //    }

    // Fetch array of objects and display in HTML (instantiated to ref classname '.row')
    displayList(data) {
        const unorderedList = document.querySelector(".row");

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
        const selections = getAllSelections();
        // console.log("Selections: "+selections); // For debugging on selections
        // Clear previously appended child
        unorderedList.textContent = '';
        // If no filter applied
        if (selections.length === 0) {
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
                unorderedList.appendChild(listProduct);
                this.displayRating(data[i]);
            }
        }
        // If filter(s) applied
        else {
            const filteredProducts = data.filter((product) => {
                return selections.includes(product.type) || selections.includes(product.format);
            });
            for (let i = 0; i < filteredProducts.length; i++) {
                const formattedPrice = parseFloat(filteredProducts[i].price).toFixed(2);
                let listProduct = document.createElement("a")
                listProduct.className = "card"
                listProduct.classList.add("card_listing")
                listProduct.setAttribute("data-product-id", i)
                listProduct.href = "product-details.html?id=" + filteredProducts[i].id
                listProduct.innerHTML = `
                <img src="${filteredProducts[i].imagePath}"/>
                <div class="card-body">
                    <h5 class="card-title">${filteredProducts[i].name}</h5>
                    <div class="card-text proReview" id="product${filteredProducts[i].id}">
                    </div>
                    <p class="card-text proPrice">$${formattedPrice}</p>
                    <p class="card-text proDescription">${filteredProducts[i].description}</p>
                </div>
            `
                unorderedList.appendChild(listProduct);
                this.displayRating(filteredProducts[i]);
            }
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