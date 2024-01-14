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
    }
  } else {
    try {
      let response = await fetch(`/api/products?type=${type}`);
      let data = await response.json();
      console.log(data)
      productController.displayList(data);
    } catch (error) {
      loadError(error);
      console.log(error);
    }
  }
}
function loadError(error) {
  const unorderedList = document.getElementById("showList");
  unorderedList.classList.add("alert", "alert-danger", "w-50", "translate-middle-x", "start-50", "mt-3");
                      unorderedList.setAttribute("role", "alert");
                      unorderedList.innerHTML = `<span>Failed to fetch.</span>`;
                      throw new Error("Fetching of data failed.");
}

// Initial fetch - Load immediately when the script is loaded to fetch initial data.
fetchData(type);
