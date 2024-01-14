var data = [];
// Create instance of productList, i.e. controller class
const productController = new ProductController();

const url = document.location.search;
let urlParams = new URLSearchParams(url);
let type = urlParams.get("type");
// console.log("Type is:" + type); // For debugging

// Fetch data from API
async function fetchData(type = "") {
  if (type === null) {
    try {
      let response = await fetch("/api/products");
      let data = await response.json();
      productController.displayList(data);
    } catch (error) {
      loadError(error);
      console.error("Error fetching products from API: 1", error);
    }
  } else {
    try {
      let response = await fetch(`/api/products?type=${type}`);
      let data = await response.json();
      this.displayList(data);
    } catch (error) {
      loadError(error);
      console.error("Error fetching products from API: ", error);
    }
  }
}
function loadError(error) {
  const unorderedList = document.getElementById("showList");
  let listProduct = document.createElement("li");
  listProduct.innerHTML = `<span>${error}.</span>`;
  listProduct.style.alignItems = "center";
  listProduct.style.fontSize = "x-large";
  listProduct.style.fontStyle = "italic";
  listProduct.style.listStyle = "none";
  unorderedList.appendChild(listProduct);
}
// Initial fetch - Load immediately when the script is loaded to fetch initial data.
fetchData(type);
