// temporary data
const data = [
    {
        image: "img/teas/african-rooibos-honeybush.jpg",
        title: "African rooibos honeybush tea",
        url: "#",
        description: "Naturally sweet, earthy, and nutty with a hint of honey.",
    },
    {
        image: "img/teas/black-tea.jpg",
        title: "Black tea",
        url: "#",
        description: "Savor our Signature Black Tea - bold and timeless, crafted to elevate your tea experience.",
    },
    {
        image: "img/teas/fruit-tea.jpg",
        title: "Fruit tea",
        url: "#",
        description: "Delight in our Fruit Fusion Tea-a burst of natural sweetness and flavor, tailor-made for your enjoyment.",
    },
    {
        image: "img/teas/green-tea.jpg",
        title: "China jasmine tea",
        url: "#",
        description: "A fragrant blend of green tea and jasmine blossoms for a soothing and elegant sip.",
    },
    {
        image: "img/teas/herbal-floral-tea.jpg",
        title: "Herbal and floral tea",
        url: "#",
        description: "Savor our Herbal & Flora Infusion-nature's best, tailored for your tranquility and wellness.",
    },
    {
        image: "img/teas/matcha.jpg",
        title: "Matcha green tea",
        url: "#",
        description: "Energize your day with Matcha Green Tea - a vibrant ceremonial grade blend, tailored for your revitalisation.",
    },
    {
        image: "img/teas/oolong-tea.jpg",
        title: "Oolong tea",
        url: "#",
        description: "Indulge in Oolong Bliss Tea - a refined and aromatic brew, tailored for your exquisite tea moments.Energize your day with Matcha Green Tea - a vibrant ceremonial grade blend, tailored for your revitalisation."
    }
]

// create a div element with the classname "card-item"
const cardContainer = document.createElement("div")
cardContainer.className = "card-wrapper"

// 1. invoke function displayCard(), pass in the list items to unordered list element 
// 2. append the div element to element with classname "placeholder" - found in index.html
cardContainer.innerHTML = displayCard(data)
document.getElementsByClassName("placeholder")[0].appendChild(cardContainer)

// displayCard() receives an array of JSON objects
// and uses method map() iteratively to return a list of items from parameter data
function displayCard(data) {
    return data.map((item, key) => `
           <img src="${item.image} alt="${title}" />
            <div class="card-info">
            <a href="${item.url} class="card-title">${item.title}</a>
            <p class="card-description d-none d-sm-block">${item.description}</p>
            </div>`).join('');
};


