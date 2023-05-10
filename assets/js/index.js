// Botões, inputs
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
const categories = document.querySelector('#categories')
const fuelInput = document.querySelector('#fuel-type')
const newCarsCheckbox = document.querySelector('#new-cars')
const counterElement = document.querySelector('#counter')
const descendingCheckbox = document.querySelector('#descending')
const meanButton = document.querySelector('#mean-button')
const modeButton = document.querySelector('#mode-button')
const selectedCarsElement = document.querySelector('#selected-cars-element')
const totalValueElement = document.querySelector('#total-value-element')
const meanElement = document.querySelector('#mean-element')
const deviationElement = document.querySelector('#deviation-element')
const selectedCarsContainer = document.querySelector('#selected-cars-container')
// Options
const allBrandOption = document.querySelector('#all')
const volkswagenOption = document.querySelector('#volkswagen')
const chevroletOption = document.querySelector('#chevrolet')
const cheryOption = document.querySelector('#chery')
const renaultOption = document.querySelector('#renault')
const fordOption = document.querySelector('#ford')
const hondaOption = document.querySelector('#honda')
const toyotaOption = document.querySelector('#toyota')
const allFuelOption = document.querySelector('#allFuel')
const flexOption = document.querySelector('#flex')
const dieselOption = document.querySelector('#diesel')
const gasolineOption = document.querySelector('#gasoline')
const eletricOption = document.querySelector('#eletric')
const alcoolOption = document.querySelector('#alcool')
// Vars
let minSelected = false
let maxSelected = false
let selectedCars = 0
let totalValue = 0
let meanArray = []
let deviationArray = []
let filteredCars = []

const data = fetch('assets/data/data.json').then(r => {
    return r.json()
})
// Função que adiciona quantos carros há de cada marca
function brandAndFuelCounterLoader() {
    data.then(cars => {
        const brandOptions = {'Toyota':toyotaOption, 'Honda':hondaOption, 'Ford':fordOption, 'Renault':renaultOption, 'Chery':cheryOption, 'Chevrolet':chevroletOption, 'Volkswagen':volkswagenOption}
        const fuelOptions = {'Flex':flexOption, 'Diesel':dieselOption, 'Gasolina':gasolineOption, 'Elétrico':eletricOption, 'Álcool':alcoolOption}
        allBrandOption.innerHTML += ` (${cars.length})`
        allFuelOption.innerHTML += ` (${cars.length})`
        Object.entries(brandOptions).map((option, index) => { option[1].innerHTML += ` (${Object.keys(cars.filter(car => car.marca === option[0])).length})` })
        Object.entries(fuelOptions).map((option, index) => { option[1].innerHTML += ` (${Object.keys(cars.filter(car => car.combustivel === option[0])).length})` })
    })
}
// Função para o input 'Pesquisar'
function searchFunction(callback) {
    const foundCars = []
    data.then(cars => {
        cars.map((car, index) => {
            if(searchInput.value === '') foundCars.push(car)
            else if(car.modelo.toUpperCase() === searchInput.value.toUpperCase() || car.marca.toUpperCase() === searchInput.value.toUpperCase()){
                if(!foundCars.includes(car)) foundCars.push(car)
            } 
        })
        filteredCars = foundCars
        if(callback) callback()
    })
}

// Função para os inputs de preço
function minAndMaxPrice() {
    const foundCars = []
    // Se possuir valor no input de preço máximo e mínimo
    if(minPriceInput.value != '' && maxPriceInput.value != '') {
        filteredCars.map((car, index) => {
            // Verifica se o preço do carro se encaixa no preço mínimo e máximo dos inputs
            if(car.preco >= parseInt(minPriceInput.value) && car.preco <= parseInt(maxPriceInput.value)) foundCars.push(car)
        })
    }
    // Se possuir valor apenas no input de preço mínimo
    else if(minPriceInput.value != '') {
        filteredCars.map((car, index) => {
            // Verifica se o preço é maior ou igual ao preço mínimo do input
            if(car.preco >= parseInt(minPriceInput.value)) foundCars.push(car)
        })
    }
    // Se possuir valor apenas no input de preço máximo
    else if(maxPriceInput.value != '') {
        filteredCars.map((car, index) => {
            // Verifica se o preço é menor ou igual ao preço máximo do input
            if(car.preco <= parseInt(maxPriceInput.value)) foundCars.push(car)
        })
    } else return minAndMaxKm()
    filteredCars = foundCars
    minAndMaxKm()
}

// Função para os inputs de quilometragem
function minAndMaxKm() {
    let foundCars = []
    // Se possuir valor no input de preço máximo e mínimo
    if(minKmInput.value != '' && maxKmInput.value != '') {
        foundCars = filteredCars.filter(car => car.km >= parseInt(minKmInput.value) && car.km <= parseInt(maxKmInput.value))
    }
    // Se possuir valor apenas no input de preço mínimo
    else if(minKmInput.value != '') {
        foundCars = filteredCars.filter(car => car.km >= parseInt(minKmInput.value))
    }
    // Se possuir valor apenas no input de preço máximo
    else if(maxKmInput.value != '') {
        foundCars = filteredCars.filter(car => car.km <= parseInt(maxKmInput.value))
    } else return onlyOneBrand()

    filteredCars = foundCars
    onlyOneBrand()   
}

// Filtra somente carros novos (0km)
function onlyNewCars() {
    let foundCars = []
    if(newCarsCheckbox.checked === true) {
        foundCars = filteredCars.filter(car => car.km === 0)
        filteredCars = foundCars
    }
    sortByCategory()
}

// Filtra por marca
function onlyOneBrand() {
    let foundCars = []
    // Retira o contador da marca
    const inputValue = brandInput.value.split(' ')[0]

    if(inputValue != 'Todos' && inputValue != '' && inputValue) {
        foundCars = filteredCars.filter(car => car.marca.toUpperCase() === inputValue.toUpperCase())
        filteredCars = foundCars
    }
    minAndMaxYear()
}

function minAndMaxYear() {
    let foundCars = []
    // Se possuir valor no input de ano máximo e mínimo
    if(minYearInput.value != '' && maxYearInput.value != '') {
        foundCars = filteredCars.filter(car => car.ano >= parseInt(minYearInput.value) && car.ano <= parseInt(maxYearInput.value))
    }
    // Se possuir valor apenas no input de preço mínimo
    else if(minYearInput.value != '') {
        foundCars = filteredCars.filter(car => car.ano >= parseInt(minYearInput.value))
    }
    // Se possuir valor apenas no input de preço máximo
    else if(maxYearInput.value != '') {
        foundCars = filteredCars.filter(car => car.ano <= parseInt(maxYearInput.value))
    } else onlyOneFuel()

    filteredCars = foundCars
    onlyOneFuel()
}

// Filtra por tipo de combustível
function onlyOneFuel() {
    const inputValue = fuelInput.value.split(' ')[0]
    let foundCars = []

    if(inputValue != 'Todos' && inputValue != '' && inputValue) {
        foundCars = filteredCars.filter(car => car.combustivel.toUpperCase() === inputValue.toUpperCase())
        filteredCars = foundCars
    }
    onlyNewCars()
}

// Função que adiciona as opções de anos máximos
function createMinAndMaxYear() {
    const years = []
    data.then(cars => {
        cars.map((car, index) => { if(!years.includes(car.ano)) years.push(car.ano) })
        years.sort()
        minYearInput.appendChild(document.createElement('option'))
        maxYearInput.appendChild(document.createElement('option'))
        years.map((year, index) => {
            const minYearElement = document.createElement('option')
            const maxYearElement = document.createElement('option')
            minYearElement.innerHTML = year
            maxYearElement.innerHTML = year
            minYearInput.appendChild(minYearElement)
            maxYearInput.appendChild(maxYearElement)
        })
    })
} 

// Limpa a grid de cards
function cleanGridListing() {
    gridListing.innerHTML = ''
}

// Cria o card do carro
function createCarBox(car) {
    const boxCar = document.createElement('div')
    boxCar.classList.add('box-car')
    const boxCarHtml = `
        <div class="img-container" style="background-image: url(${car.imagem})">
            <div class="box-car-shadow">
                <div class="box-car-title">
                    <h3 class="car-model">${car.modelo}</h3>
                    <h4 class="car-brand">${car.marca}</h4>
                </div>
            </div>
        </div>
        <div class="info-container">
            <div class="car-details">
                <p>Ano: ${car.ano}</p>
                <p>Combustível: ${car.combustivel}</p>
                <p>${car.km}km</p>
                <hr>
            </div>
            <div class="box-car-price">
                <h3>R$ ${new Intl.NumberFormat('pt-BR').format(car.preco)},00</h3>
            </div>
        </div>
    `
    boxCar.innerHTML = boxCarHtml
    gridListing.appendChild(boxCar)
    this.selected = false
    // Event listener
    boxCar.addEventListener('click', function(e) {
        if(boxCar.style.background == 'linear-gradient(white, white, white, rgb(143, 255, 143))') {
            boxCar.style.background = 'white'
            boxCar.style.transform = 'scale(1)'
            this.selected = false
            selectedCars -= 1
            delTotalValue(car.preco)
            delValueMedian(car.km)
            delValueDeviation(car.km)
        } else {
            boxCar.style.background = 'linear-gradient(white, white, white, rgb(143, 255, 143))'
            boxCar.style.transform = 'scale(0.9)'
            this.selected = true
            selectedCars += 1
            addTotalValue(car.preco)
            addValueMedian(car.km)
            addValueDeviation(car.km)
        }
        if(selectedCars == 0) selectedCarsContainer.style.transform = 'scale(0)'
        else selectedCarsContainer.style.transform = 'scale(1)'
        refreshSelectedCars()
        calculateMean()
        calculateDeviation()
    })
}

function refreshSelectedCars() {
    selectedCarsElement.innerHTML = `Selecionado: ${selectedCars} carro(s)`
}

function addTotalValue(preco) {
    totalValue += preco
    totalValueElement.innerHTML = 'Total: R$' + new Intl.NumberFormat('pt-BR').format(totalValue)
}
function delTotalValue(preco) {
    totalValue -= preco
    totalValueElement.innerHTML = 'Total: R$' + new Intl.NumberFormat('pt-BR').format(totalValue)
}
function addValueMedian(km) {
    meanArray.push(km)
}
function delValueMedian(km) {
    const index = meanArray.indexOf(km)
    meanArray.splice(index, 1)
}
function calculateMean() {
    let mean = 0
    meanArray.sort((a, b) => a - b)
    const len = meanArray.length
    if(len % 2 === 0) {
        const middle = len / 2
        mean = (meanArray[middle-1] + meanArray[middle] / 2)
    } else {
        const middle = Math.floor(len / 2)
        mean = meanArray[middle]
    }
    if(!mean) mean = 0
    meanElement.innerHTML = "Mediana: " + new Intl.NumberFormat('pt-BR').format(mean) + 'km'
}
// Calcula o desvio padrão
function calculateDeviation() {
    const mean = deviationArray.reduce((a, b) => a + b, 0) / deviationArray.length; 
    const cubeDiferrence = deviationArray.map(value => Math.pow(value - mean, 2)); 
    const som = cubeDiferrence.reduce((a, b) => a + b, 0); 
    let deviation = Math.sqrt(som / (deviationArray.length - 1));
    if(!deviation) deviation = 0
    deviationElement.innerHTML = 'Desvio: ' + parseInt(deviation) + 'km'
}

function addValueDeviation(preco) {
    deviationArray.push(preco)
}
function delValueDeviation(preco) {
    const index = deviationArray.indexOf(preco)
    deviationArray.splice(index, 1)
}
// Carrega os cards ao entrar na página
function loadCards() {
    cleanGridListing()
    data.then(cars => {
        cars.sort(compareByModel)
        cars.map((car, index) => {
            createCarBox(car)
        })
    })
}
// Ordenar por categoria
function sortByCategory() {
    if(categories.value !== '') {
        const category = categories.value
        if(category === 'preco') filteredCars.sort(compareByPrice)
        else if(category === 'marca') filteredCars.sort(compareByBrand)
        else if(category === 'ano') filteredCars.sort(compareByYear)
        else if(category === 'km') filteredCars.sort(compareByKm)
        else filteredCars.sort(compareByModel)

        if(descendingCheckbox.checked) filteredCars.reverse()
    }
    filteredCars.map((car, index) => { createCarBox(car) })
    loadCounter()
}
// Funções para alterar a ordem dos cards exibidos
function compareByBrand(a, b) {
    return a.marca.localeCompare(b.marca)
}
function compareByModel(a, b) {
    return a.modelo.localeCompare(b.modelo)
}
function compareByPrice(a, b) {
    if(a.preco < b.preco) return -1
    if(a.preco > b.preco) return 0
}
function compareByKm(a, b) {
    if(a.km < b.km) return -1
    if(a.km > b.km) return 0
}
function compareByYear(a, b) {
    if(a.ano < b.ano) return -1
    if(a.ano > b.ano) return 0
}
// Calcula a média
function meanCalculate() {
    let price = 0
    let counter = 0
    Object.entries(gridListing.children).map(([key, value]) => {
        const boxPrice = value.querySelector('.box-car-price')
        const priceText = boxPrice.innerText.replace('R$', '')
        price += parseInt(priceText)
        counter ++
    })
    meanButton.innerHTML = 'R$' + parseInt(price/counter) + ' mil'
}
// Calcula a moda
function modeCalculate() {
    data.then(cars => {
        let count = {}
        const yearsArray = cars.map((car, index) => {return car.ano})
        yearsArray.map((year, index) => {
            if(count[year]) count[year]++
            else count[year] = 1
        })
        const countEntries = Object.entries(count)
        countEntries.sort((a, b) => b[1] - a[1])
        modeButton.innerHTML = countEntries[0][0]
    })
}

function resetMeanAndModeButtonText() {
    meanButton.innerText = 'Calcular moda'
    modeButton.innerText = 'Calcular média'
}
// Carrega a quantidade de carros filtrados
function loadCounter() {
    const counter = gridListing.children.length
    if(counter != 12) {
        counterElement.innerHTML = ''
        const pCounter = document.createElement('p')
        pCounter.innerText = `Carros filtrados: ${counter}`
        counterElement.appendChild(pCounter)
    }
}
// Adiciona o carro mais barato em oferta
function addOfferCar() {
    data.then(cars => {
        cars.sort(compareByPrice)
        const car = cars[0]
        const carOfferElement = document.createElement('div')
        carOfferElement.classList.add('car-offer')
        const carOfferHtml = `
            <div class="car-offer-banner">
                <p id="timer">Faltam: 3h 0m 0s</p>
            </div>
            <div class="car-offer-main-container">
                <div class="car-offer-details">
                    <div class="car-offer-model-and-brand-container">
                        <h2 class="car-offer-model">${car.modelo}</h2>
                        <h3 class="car-offer-brand">${car.marca}</h3>
                    </div>
                    <p class="car-offer-year-and-km">${car.ano} | ${car.km}km</p>
                    <div class="car-offer-price-container">
                        <h5 class="car-offer-old-price">de <s>R$R$${new Intl.NumberFormat('pt-BR').format(car.preco)},00</s></h5>
                        <h4 class="car-offer-new-price">por <strong>R$${new Intl.NumberFormat('pt-BR').format(car.preco - (car.preco/100)*20)},00</strong></h4>
                    </div>
                    <button>Mais detalhes</button>
                </div>
                <div class="car-offer-img-container">
                    <img id="car-offer-img" src="${car.imagem}" alt="Car photo">
                </div>
            </div>
        `
        carOfferElement.innerHTML = carOfferHtml
        document.querySelector('header').insertAdjacentElement("afterend", carOfferElement)  
    })
}

function addOfferTimer() {
    let start = new Date().getTime();
    let end = start + (3 * 60 * 60 * 1000);

    // Atualiza o timer a cada segundo
    let x = setInterval(function() {
        let now = new Date().getTime();

        let distance = end - now;
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const timer = document.querySelector('#timer')
        timer.innerText = `Faltam: ${hours}h ${minutes}m ${seconds}s`

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Encerrado";
        }
    }, 1000);
}
// EventListener para alterar as options do ano máximo quando colocado um ano mínimo
minYearInput.addEventListener('change', function(e) {
    if(minYearInput.value === '') minSelected = false
    else {
        minSelected = parseInt(minYearInput.value)
        maxYearInput.innerHTML = ''
        data.then(cars => {
            const yearsArray = cars.map((car, index) => {return car.ano})
            const cleanedYearsArray = yearsArray.filter((value, index, self) => self.indexOf(value) === index).sort()
            cleanedYearsArray.map((year, index) => {
                if(year >= parseInt(minYearInput.value)) {
                    const yearElement = document.createElement('option')
                    yearElement.innerHTML = year
                    maxYearInput.appendChild(yearElement)
                }
                if(maxSelected) maxYearInput.value = maxSelected
                else maxYearInput.value = ''
            })
        })
    }
})
// EventListener para alterar as options do ano mínimo quando colocado um ano máximo
maxYearInput.addEventListener('change', function(e) {
    if(maxYearInput.value === '') maxSelected = false
    else {
        maxSelected = parseInt(maxYearInput.value)
        minYearInput.innerHTML = ''
        data.then(cars => {
            const yearsArray = cars.map((car, index) => {return car.ano})
            const cleanedYearsArray = yearsArray.filter((value, index, self) => self.indexOf(value) === index).sort()
            cleanedYearsArray.map((year, index) => {
                if(year <= parseInt(maxYearInput.value)) {
                    const yearElement = document.createElement('option')
                    yearElement.innerHTML = year
                    minYearInput.appendChild(yearElement)
                }
                if(minSelected) minYearInput.value = minSelected
                else minYearInput.value = ''
            })
        })
    }
})

filterButton.addEventListener('click', function(e) {
    e.preventDefault()
    cleanGridListing()
    resetMeanAndModeButtonText()
    searchFunction(minAndMaxPrice)
})

meanButton.addEventListener('click', function(e) {
    e.preventDefault()
    meanCalculate()
})
modeButton.addEventListener('click', function(e) {
    e.preventDefault()
    modeCalculate()
})

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        cleanGridListing()
        resetMeanAndModeButtonText()
        searchFunction(minAndMaxPrice)
    }
})

searchInput.addEventListener('keyup', function(e) {
    e.preventDefault()
    cleanGridListing()
    resetMeanAndModeButtonText()
    searchFunction(minAndMaxPrice)
})

// Executar ao carregar a página:
loadCards()
brandAndFuelCounterLoader()
createMinAndMaxYear()
addOfferCar()
addOfferTimer()