//To display the product index according to the product ID store
document.addEventListener('DOMContentLoaded', function () {
    var selectedProductId = localStorage.getItem('selectedProductId');

    const storageProduct = localStorage.getItem("productList")
    if(storageProduct){
        const products = JSON.parse(storageProduct)

        document.getElementById("prodName").innerHTML = products[selectedProductId].name
        document.getElementById("prodPrice").innerHTML = `$${products[selectedProductId].price}`
        document.getElementById("prodDescription").innerHTML = products[selectedProductId].description
        document.getElementById("prodImg").setAttribute('src', products[selectedProductId].image)
        displayRating(products[selectedProductId])
        
        function displayRating(data){
            let productRating = document.getElementById("prodRating")
            
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
  });