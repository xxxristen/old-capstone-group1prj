// Initialize teaList as a new product list
const teaList = new productList()

// Select the form
const newProdForm = document.querySelector("#productForm")

// Add an 'onsubmit' event listener to the form
newProdForm.addEventListener('submit',(event)=> {
    event.preventDefault()

    // Select inputs
    const newProdName = document.querySelector('#input_bar_name')
    const newProdType = document.querySelector('input[name="prod_type"]:checked')
    const newProdPrice = document.querySelector('#input_bar_price')
    const newProdDescription = document.querySelector('#input_bar_description')
    // const newProdImage = document.querySelector('#"input_image"')
    const newProdFormat = document.querySelector('input[name="tea_format"]:checked')

    // Get values of inputs
    const name = newProdName.value
    const type = newProdType.value
    const price = newProdPrice.value 
    const description = newProdDescription.value
    // const image = newProdImage.value
    const format = newProdFormat.value

    /*
    Add Validation Code Here
    */

    console.log(`Name is ${name}`)
    console.log(`Type is ${type}`)
    console.log(`Price is $${price}`)
    console.log(`Content is ${description}`)
    console.log(`Format is ${format}`)
    // Add new product to the list
    // teaList.addProduct(image, name, price, description, type, format)

    // Run toast if new product is created successfully
    // $('.toast').toast('show')

    // Reset the user inputs
    newProdName.value = ''
    newProdType.value = ''
    newProdPrice.value = ''
    newProdDescription.value = ''
    // newProdImage.value = ''
    newProdFormat.value = ''
})

// This section is to enable or disable the Tea Format Selection based on the product type
const formatForm = document.getElementsByName('tea_format')

function disableFormat(){
    formatForm.forEach(element => {
        element.disabled = true
    })
}

function enableFormat(){
    formatForm.forEach(element => {
        element.disabled = false
    })
}