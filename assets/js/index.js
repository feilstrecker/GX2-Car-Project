const gridListing = document.querySelector('.grid-listing')
const searchInput = document.querySelector('#search-button')
const filterButton = document.querySelector('#filter-button')
const minPriceInput = document.querySelector('#min-price')
const maxPriceInput = document.querySelector('#max-price')
const minKmInput = document.querySelector('#min-km')
const maxKmInput = document.querySelector('#max-km')
const minYearInput = document.querySelector('#min-year')
const maxYearInput = document.querySelector('#max-year')
const brandInput = document.querySelector('#brand')
const fuelInput = document.querySelector('#fuel-type')

const data = fetch('assets/data/data.json').then(r => {
    return r.json()
})

function searchFunction() {
    cleanGridListing()
    data.then(cars => {
        for(car of cars) {
            if(car.modelo === searchInput.value || car.marca === searchInput.value){
                createCarBox(car)
            } 
        }
    })

}

function cleanGridListing() {
    gridListing.innerHTML = ''
}

filterButton.addEventListener('click', function(e) {
    e.preventDefault()
    console.log(searchInput.value)
    searchFunction()
})

function createCarBox(car) {
    // Cria container do carro
    let boxCar = document.createElement('div')
    boxCar.classList.add('box-car')

    // ====================================

    // Cria o container da imagem e título do carro
    let imgContainer = document.createElement('div')
    imgContainer.classList.add('img-container')
    imgContainer.style.backgroundImage = `url(${car.image})`
    
    // Cria o container para a sombra da imagem, modelo e marca do carro
    let imgShadow = document.createElement('div')
    imgShadow.classList.add('box-car-shadow')

    // Cria container para o título do carro
    let boxCarTitle = document.createElement('div')
    boxCarTitle.classList.add('box-car-title')

    // Cria h3 para modelo e h4 para ano do carro
    let carModel = document.createElement('h3')
    let carBrand = document.createElement('h4')

    carModel.classList.add('car-model')
    carBrand.classList.add('car-brand')

    // ====================================
    
    // Cria container geral para informações do carro: Ano, tipo de combustível,
    // quilometragem e preço
    carInfo = document.createElement('div')
    carInfo.classList.add('info-container')

    // Cria container para ano, combustível e quilometragem e um hr
    carDetails = document.createElement('div')
    carDetails.classList.add('car-details')

    // Cria os parágrafos para ano, combustível e quilometragem (e a tag hr)
    carYear = document.createElement('p')
    carFuel = document.createElement('p')
    carKm = document.createElement('p')
    hr = document.createElement('hr')

    // Cria o container para o preço do carro
    boxCarPrice = document.createElement('div')
    boxCarPrice.classList.add('box-car-price')

    // Cria h4 para o preço do carro
    carPrice = document.createElement('h3')

    // Adicionando as informações do carro nas variáveis:
    carModel.innerText = car.modelo
    carBrand.innerText = car.marca
    carYear.innerText = 'Ano: ' + car.ano
    carFuel.innerText = 'Combustível ' + car.combustivel
    carKm.innerText = car.km + 'km'
    carPrice.innerText = "R$" + new Intl.NumberFormat('pt-BR').format(car.preco);

    // Fazendo a cadeia familiar
    boxCarTitle.appendChild(carModel)
    boxCarTitle.appendChild(carBrand)
    boxCarPrice.appendChild(carPrice)

    carDetails.appendChild(carYear)
    carDetails.appendChild(carFuel)
    carDetails.appendChild(carKm)
    carDetails.appendChild(hr)

    imgShadow.appendChild(boxCarTitle)

    carInfo.appendChild(carDetails)
    carInfo.appendChild(boxCarPrice)
    imgContainer.appendChild(imgShadow)
    boxCar.appendChild(imgContainer)
    boxCar.appendChild(carInfo)
    gridListing.appendChild(boxCar)

}

data.then(cars => {
    for(car of cars) {
        createCarBox(car)
    }
})


