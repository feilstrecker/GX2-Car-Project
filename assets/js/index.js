const gridListing = document.querySelector('.grid-listing')

function createCarBox(image, model, brand, year, fuel, km, price) {
    // Cria container do carro
    let boxCar = document.createElement('div')
    boxCar.classList.add('box-car')

    // ====================================

    // Cria o container da imagem e título do carro
    let imgContainer = document.createElement('div')
    imgContainer.classList.add('img-container')
    imgContainer.style.backgroundImage = `url(${image})`
    
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
    carModel.innerText = model
    carBrand.innerText = brand
    carYear.innerText = 'Ano: ' + year
    carFuel.innerText = 'Combustível ' + fuel
    carKm.innerText = km + 'km'
    carPrice.innerText = "R$" + new Intl.NumberFormat('pt-BR').format(price);

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

const data = fetch('assets/data/data.json').then(r => {
    return r.json()
}).then(cars => {
    for(car of cars) {
        createCarBox(car.imagem, car.modelo, car.marca, car.ano, car.combustivel, car.km, car.preco)
    }
})