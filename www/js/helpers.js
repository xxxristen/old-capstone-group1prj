var data = [];

data = [
    {
        image: "img/teas/black-tea.jpg",
        name: "Black Tea",
        rating: "5",
        price: "100",
        description: "Lorem ipsum dolor sit amet.",
        type: "Tea",
        tea_format: "Loose leaf"
    },    
    {
        image: "img/teas/fruit-tea.jpg",
        name: "Fruit Tea",
        rating: "4",
        price: "50",
        description: "Lorem ipsum dolor sit amet.",
        type: "Tea",
        tea_format: "Loose leaf"
    },    
    {
        image: "img/teas/green-tea.jpg",
        name: "Green Tea",
        rating: "2.5",
        price: "45",
        description: "Lorem ipsum dolor sit amet.",
        type: "Tea",
        tea_format: "Loose leaf"
    },    
    {
        image: "img/teas/white-tea.jpg",
        name: "White Tea",
        rating: "1",
        price: "80",
        description: "Lorem ipsum dolor sit amet.",
        type: "Tea",
        tea_format: "Loose leaf"
    }    
]

const teaProduct = new productList(data)
teaProduct.loadDataFromLocalStorage()