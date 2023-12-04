var data = [];
// Create instance of productList, i.e. controller class
const productController = new ProductController()

// Fetch data from API
async function fetchData() {
    try {
        let response = await fetch("/api/products");
        let data = await response.json();
        productController.displayList(data);
    }
    catch (error) {
        console.error("Error fetching products from API: ", error);
    }
}
// Initial fetch - Load immediately when the script is loaded to fetch initial data.
fetchData();

// const teaProduct = new productList(data)
// teaProduct.loadDataFromLocalStorage()