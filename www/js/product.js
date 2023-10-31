// Create a class product list
class productList{

    constructor(data = []){
        this.product = data

        this.storeDataToLocalStorage(data);
    }

    storeDataToLocalStorage(data){
        if(!localStorage.getItem("productList")){
            const sampleProduct = [];
            if(data.length > 0){
                for (let i=0; i< data.length; i++){
                    sampleProduct.push({
                        id: i+1,
                        image: data[i].image,
                        name: data[i].name,
                        rating: data[i].rating,
                        price: data[i].price,
                        description: data[i].description,
                        type: data[i].type,
                        tea_format: data[i].format
                    })
                }
            }
            localStorage.setItem("productList", JSON.stringify(sampleProduct))
        }
    }

    loadDataFromLocalStorage(){
        const storageProduct = localStorage.getItem("productList")
        if(storageProduct){
            const products = JSON.parse(storageProduct)
            this.displayList(products)
        }
    }

    displayList(data){
        const unorderedList = document.querySelector(".row")

        if(!data.length){
            let listProduct = document.createElement("li")
            listProduct.innerHTML = `<span>There are no products at the moment.</span>`
            listProduct.style.alignItems = "center"
            listProduct.style.fontSize = "x-large"
            listProduct.style.fontStyle = "italic"
            listProduct.style.listStyle = "none"
            unorderedList.appendChild(listProduct)
            return
        }

        for(let i=0; i<data.length; i++){
            let listProduct = document.createElement("li")
            listProduct.className = "card"
            listProduct.classList.add("card_listing")
            listProduct.innerHTML = `
                <img src="${data[i].image}"/>
                <div class="card-body">
                    <h5 class="card-title">${data[i].name}</h5>
                    <div class="card-text proReview" id="product${data[i].id}">
                    </div>
                    <p class="card-text proPrice">$${data[i].price}</p>
                    <p class="card-text proDescription">${data[i].description}</p>
                </div>
            `
            unorderedList.appendChild(listProduct)
            this.displayRating(data[i])
        }
    }

    // To display ratings in star graphics
    displayRating(data){
        let productRating = document.querySelector(`#product${data.id}`)
        
        for(let i=1; i<=data.rating; i++){
            let listRatingFull = document.createElement("i")
            listRatingFull.className = "bi"
            listRatingFull.classList.add("bi-star-fill")
            productRating.appendChild(listRatingFull)
        }

        if(data.rating%1 != 0){
            let listRatingHalf = document.createElement("i")
            listRatingHalf.className = "bi"
            listRatingHalf.classList.add("bi-star-half")
            productRating.appendChild(listRatingHalf)

            for(let i=data.rating; i<5-1; i++){
                let listRatingNone = document.createElement("i")
                listRatingNone.className = "bi"
                listRatingNone.classList.add("bi-star")
                productRating.appendChild(listRatingNone)
            }
        } else {
            for(let i=data.rating; i<5; i++){
                let listRatingNone = document.createElement("i")
                listRatingNone.className = "bi"
                listRatingNone.classList.add("bi-star")
                productRating.appendChild(listRatingNone)
            }
        }
    }
}