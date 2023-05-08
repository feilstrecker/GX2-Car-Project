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
const growingCheckbox = document.querySelector('#growing')
const descendingCheckbox = document.querySelector('#descending')
const meanButton = document.querySelector('#mean-button')
const modeButton = document.querySelector('#mode-button')
const selectedCarsElement = document.querySelector('#selected-cars-element')
const totalValueElement = document.querySelector('#total-value-element')
const meanElement = document.querySelector('#mean-element')
const deviationElement = document.querySelector('#deviation-element')
const selectedCarsContainer = document.querySelector('#selected-cars-container')

// Options
const allOption = document.querySelector('#all')
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
function brandCounterFunction() {
    data.then(cars => {
        allOption.innerHTML += ` (${cars.length})`
        toyotaOption.innerHTML += ` (${Object.keys(cars.filter(car => car.marca === "Toyota")).length})`
        hondaOption.innerHTML += ` (${Object.keys(cars.filter(car => car.marca === "Honda")).length})`
        fordOption.innerHTML += ` (${Object.keys(cars.filter(car => car.marca === "Ford")).length})`
        renaultOption.innerHTML += ` (${Object.keys(cars.filter(car => car.marca === "Renault")).length})`
        cheryOption.innerHTML += ` (${Object.keys(cars.filter(car => car.marca === "Chery")).length})`
        chevroletOption.innerHTML += ` (${Object.keys(cars.filter(car => car.marca === "Chevrolet")).length})`
        volkswagenOption.innerHTML += ` (${Object.keys(cars.filter(car => car.marca === "Volkswagen")).length})`
    })
}

// Função que adiciona quantos carros há de cada tipo de combustível
function fuelCounterFunction() {
    data.then(cars => {
        allFuelOption.innerHTML += ` (${cars.length})`
        flexOption.innerHTML += ` (${Object.keys(cars.filter(car => car.combustivel === "Flex")).length})`
        dieselOption.innerHTML += ` (${Object.keys(cars.filter(car => car.combustivel === "Diesel")).length})`
        gasolineOption.innerHTML += ` (${Object.keys(cars.filter(car => car.combustivel === "Gasolina")).length})`
        eletricOption.innerHTML += ` (${Object.keys(cars.filter(car => car.combustivel === "Elétrico")).length})`
        alcoolOption.innerHTML += ` (${Object.keys(cars.filter(car => car.combustivel === "Álcool")).length})`
    })
}

// Função para o input 'Pesquisar'
function searchFunction(callback) {
    const filtedCars = []
    // Se o valor da pesquisa for igual a '', carrega os cards novamente.
    if (searchInput.value === '') {
        data.then(cars => {
            for(car of cars) {
                filtedCars.push(car)
            }
        })
    }
    // Captalize
    searchInput.value = searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);

    // Carrega o json e adiciona os carros que se encaixam no valor da pesquisa
    data.then(cars => {
        for(car of cars) {
            if(car.modelo === searchInput.value || car.marca === searchInput.value){
                if(!filtedCars.includes(car)) {
                    filtedCars.push(car)
                }
            } 
        }
        filteredCars = filtedCars
        if(callback) callback()
    })

}

// Função para os inputs de preço
function minAndMaxPrice() {
    let filtedCars = []
    // Se possuir valor no input de preço máximo e mínimo
    if(minPriceInput.value != '' && maxPriceInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço do carro se encaixa no preço mínimo e máximo dos inputs
            if(car.preco >= parseInt(minPriceInput.value) && car.preco <= parseInt(maxPriceInput.value)) {
                // Se sim, cria o card do carro
                filtedCars.push(car)
            }
        }
    
    }
    // Se possuir valor apenas no input de preço mínimo
    else if(minPriceInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço é maior ou igual ao preço mínimo do input
            if(car.preco >= parseInt(minPriceInput.value)) {
                filtedCars.push(car)
            }
        }
    }
    // Se possuir valor apenas no input de preço máximo
    else if(maxPriceInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço é menor ou igual ao preço máximo do input
            if(car.preco <= parseInt(maxPriceInput.value)) {
                filtedCars.push(car)
            }
        }
    } else {
        filtedCars = filteredCars
    }
    
    filteredCars = filtedCars
    minAndMaxKm()
    
}

// Função para os inputs de quilometragem
function minAndMaxKm() {
    let filtedCars = []
    // Se possuir valor no input de preço máximo e mínimo
    if(minKmInput.value != '' && maxKmInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço do carro se encaixa no preço mínimo e máximo dos inputs
            if(car.km >= parseInt(minKmInput.value) && car.km <= parseInt(maxKmInput.value)) {
                // Se sim, cria o card do carro
                filtedCars.push(car)
            }
        }
    }
    // Se possuir valor apenas no input de preço mínimo
    else if(minKmInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço é maior ou igual ao preço mínimo do input
            if(car.km >= parseInt(minKmInput.value)) {
                filtedCars.push(car)
            }
        }
    }
    // Se possuir valor apenas no input de preço máximo
    else if(maxKmInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço é menor ou igual ao preço máximo do input
            if(car.km <= parseInt(maxKmInput.value)) {
                filtedCars.push(car)
            }
        }
    } else {
        filtedCars = filteredCars
    }

    filteredCars = filtedCars
    onlyOneBrand()
    
}

// Filtra somente carros novos (0km)
function onlyNewCars() {
    let filtedCars = []
    if(newCarsCheckbox.checked === true) {
        for(car of filteredCars) {
            if(car.km === 0) {
                filtedCars.push(car)
            }
        }
    } else {
        filtedCars = filteredCars
    }
    filteredCars = filtedCars
    sortByCategory()
}

// Filtra por marca
function onlyOneBrand() {
    let filtedCars = []
    // Retira o contador da marca e faz captalize para se encaixar na propriedade do json
    const splittedInputValue = brandInput.value.split(' ')[0]
    const inputValue = splittedInputValue.charAt(0).toUpperCase() + splittedInputValue.slice(1);
    if(inputValue === 'Todos') {
        filtedCars = filteredCars
    }
    else if(inputValue) {
        for(car of filteredCars) {
            if(car.marca === inputValue) {
                filtedCars.push(car)
            }
        }
    } else {
        filtedCars = filteredCars
    }
    filteredCars = filtedCars
    minAndMaxYear()
}

function minAndMaxYear() {
    let filtedCars = []
    // Se possuir valor no input de ano máximo e mínimo
    if(minYearInput.value != '' && maxYearInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o ano do carro se encaixa no ano mínimo e máximo dos inputs
            if(car.ano >= parseInt(minYearInput.value) && car.ano <= parseInt(maxYearInput.value)) {
                // Se sim, cria o card do carro
                filtedCars.push(car)
            }
        }
    }
    // Se possuir valor apenas no input de preço mínimo
    else if(minYearInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço é maior ou igual ao preço mínimo do input
            if(car.ano >= parseInt(minYearInput.value)) {
                filtedCars.push(car)
            }
        }
    }
    // Se possuir valor apenas no input de preço máximo
    else if(maxYearInput.value != '') {
        for(car of filteredCars) {
            // Verifica se o preço é menor ou igual ao preço máximo do input
            if(car.ano <= parseInt(maxYearInput.value)) {
                filtedCars.push(car)
            }
        }
    } else {
        filtedCars = filteredCars
    }

    filteredCars = filtedCars
    onlyOneFuel()
}

// Filtra por tipo de combustível
function onlyOneFuel() {
    let filtedCars = []
    // Retira o contador da marca e faz captalize para se encaixar na propriedade do json
    const splittedInputValue = fuelInput.value.split(' ')[0]
    const inputValue = splittedInputValue.charAt(0).toUpperCase() + splittedInputValue.slice(1);
    if(inputValue === 'Todos') {
        filtedCars = filteredCars
    }
    else if(inputValue) {
        for(car of filteredCars) {
            if(car.combustivel === inputValue) {
                filtedCars.push(car)
            }
        }
    } else {
        filtedCars = filteredCars
    }
    filteredCars = filtedCars
    onlyNewCars()
}

// Função que adiciona as opções de anos máximos
function createMinYear() {
    const years = []
    data.then(cars => {
        for(car of cars) {
            if(!years.includes(car.ano)) {
                years.push(car.ano)
            }
        }
        years.sort()
        const minyearElement = document.createElement('option')
        minYearInput.appendChild(minyearElement)

        for(year of years) {
            const minyearElement = document.createElement('option')
            minyearElement.innerHTML = year
            minYearInput.appendChild(minyearElement)
        }
    })
} 

// Função que adiciona as opções de anos mínimos
function createMaxYear() {
    maxYearInput.innerHTML = ''
    const years = []
    data.then(cars => {
        for(car of cars) {
            if(!years.includes(car.ano)) {
                years.push(car.ano)
            }
        }
        years.sort()
        const maxyearElement = document.createElement('option')
        maxYearInput.appendChild(maxyearElement)

        for(year of years) {
            const maxyearElement = document.createElement('option')
            maxyearElement.innerHTML = year
            maxYearInput.appendChild(maxyearElement)
        }
    })
} 

// Limpa a grid de cards
function cleanGridListing() {
    gridListing.innerHTML = ''
}

// Cria o card do carro
function createCarBox(car) {
    // Cria container do carro
    let boxCar = document.createElement('div')
    boxCar.classList.add('box-car')

    // ====================================

    // Cria o container da imagem e título do carro
    let imgContainer = document.createElement('div')
    imgContainer.classList.add('img-container')
    imgContainer.style.backgroundImage = `url(${car.imagem})`
    
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

    // Cria h3 para o preço do carro
    carPrice = document.createElement('h3')

    // Adicionando as informações do carro nas variáveis:
    carModel.innerText = car.modelo
    carBrand.innerText = car.marca
    carYear.innerText = 'Ano: ' + car.ano
    carFuel.innerText = 'Combustível: ' + car.combustivel
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
    this.selected = false

    // Event listener
    boxCar.addEventListener('click', function(e) {
        if(boxCar.style.background == 'linear-gradient(white, white, white, rgb(143, 255, 143))') {
            boxCar.style.background = 'white'
            boxCar.style.transform = 'scale(1)'
            this.selected = false
            selectedCars -= 1
            delTotalValue(car.preco)
            delValueMedian(car.preco)
            delValueDeviation(car.km)
        } else {
            boxCar.style.background = 'linear-gradient(white, white, white, rgb(143, 255, 143))'
            boxCar.style.transform = 'scale(0.9)'
            this.selected = true
            selectedCars += 1
            addTotalValue(car.preco)
            addValueMedian(car.preco)
            addValueDeviation(car.km)

        }
        if(selectedCars == 0) {
            selectedCarsContainer.style.display = ''
            selectedCarsContainer.id = ''
        } else {
            selectedCarsContainer.style.display = 'flex'
            selectedCarsContainer.id = 'selectedCars'
        }
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
function addValueMedian(preco) {
    meanArray.push(preco)
}
function delValueMedian(preco) {
    const index = meanArray.indexOf(preco)
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
    if(!mean) {
        mean = 0
    }
    meanElement.innerHTML = "Mediana: R$" + new Intl.NumberFormat('pt-BR').format(mean)
}

// Calcula o desvio padrão
function calculateDeviation() {
    const mean = deviationArray.reduce((a, b) => a + b, 0) / deviationArray.length; 
    const cubeDiferrence = deviationArray.map(value => Math.pow(value - mean, 2)); 
    const som = cubeDiferrence.reduce((a, b) => a + b, 0); 
    let deviation = Math.sqrt(som / (deviationArray.length - 1));
    if(!deviation) {
        deviation = 0
    }
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
        const carNames = []

        // Mescla o modelo e o id do carro numa string só, para a seguinte lógica:
        // Utilizamos o sort para deixarmos os carros em ordem alfabética e em seguida
        // pegamos seu id para adicioná-lo a página
        for(car of cars) {
            carNames.push(`${car.modelo}|${car.id}`)
        }
        carNames.sort()
        for(carName of carNames) {
            for(car of cars) {
                if(car.id == parseInt(carName.split('|')[1])) {
                    createCarBox(car)
                }
            }
        }
    })
}

// Ordenar por categoria
function sortByCategory() {
    if(categories.value !== '') {
        const category = categories.value
        if(category === 'preco') {
            filteredCars.sort(compareByPrice)
        } else if(category === 'marca') {
            filteredCars.sort(compareByBrand)
        } else if(category === 'ano') {
            filteredCars.sort(compareByYear)
        } else if(category === 'km') {
            filteredCars.sort(compareByKm)
        } else if(category === 'modelo') {
            filteredCars.sort(compareByModel)
        }
        if(descendingCheckbox.checked) {
            filteredCars.reverse()
        }
        for(car of filteredCars) {
            createCarBox(car)
        }
    } else {
        for(car of filteredCars) {
            createCarBox(car)
        }
    }
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

    for(box of gridListing.children) {
        const boxPrice = box.querySelector('.box-car-price')
        const priceText = boxPrice.innerText.replace('R$', '')
        price += parseInt(priceText)
        counter ++
    }
    meanButton.innerHTML = 'R$' + parseInt(price/counter) + ' mil'
}

// Calcula a moda
function modeCalculate() {
    let year1 = 0
    let year2 = 0
    let year3 = 0
    let year4 = 0
    let year5 = 0
    let year6 = 0
    let year7 = 0
    let i = 0
    const yearsList = []
    let mostYear = 0
    let modeYear = 0

    data.then(cars => {
        for(car of cars) {
            yearsList.push(car.ano)
        }
        yearsList.sort()
        for(box of gridListing.children) {
            const carDetails = box.querySelector('.car-details')
            let thisYear = carDetails.children[0]
            let splitted = thisYear.innerHTML.split(' ')[1]
            if(parseInt(splitted) === yearsList[0]) year1++
            if(parseInt(splitted) === yearsList[1]) year2++
            if(parseInt(splitted) === yearsList[2]) year3++
            if(parseInt(splitted) === yearsList[3]) year4++
            if(parseInt(splitted) === yearsList[4]) year5++
            if(parseInt(splitted) === yearsList[5]) year6++
            if(parseInt(splitted) === yearsList[6]) year7++
        }
        for(year of [year1, year2, year3, year4, year5, year6, year7]) {
            if(year > mostYear) {
                mostYear = year
                modeYear = yearsList[i]
            }
            i++
        }
    
        modeButton.innerHTML = modeYear
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

// EventListener para alterar as options do ano máximo quando colocado um ano mínimo
minYearInput.addEventListener('change', function(e) {
    e.preventDefault()
    let maxValue = 0
    if(maxSelected) {
        maxValue = maxYearInput.value
    } 

    if(minYearInput.value != '') {
        minSelected = true
        data.then(cars => {
            cars.sort(compareByYear)
            for(car of cars) {
                if(car.ano >= minYearInput.value) {
                    yearsElements = maxYearInput.innerText.split('\n')
                    if(yearsElements.includes(`${car.ano}`)) {
                    } else {
                        const yearElement = document.createElement('option')
                        yearElement.innerText = car.ano
                        maxYearInput.appendChild(yearElement)
                    }

                }
            }
            if(maxSelected) {
                maxYearInput.value = maxValue
            }
        })
    } else {
        minSelected = false
    }
})

// EventListener para alterar as options do ano mínimo quando colocado um ano máximo
maxYearInput.addEventListener('change', function(e) {
    e.preventDefault()
    let minValue = 0
    if(minSelected) {
        minValue = minYearInput.value
    } 

    if(maxYearInput.value != '') {
        maxSelected = true
        data.then(cars => {
            cars.sort(compareByYear)
            for(car of cars) {
                if(car.ano >= maxYearInput.value) {
                    yearsElements = minYearInput.innerText.split('\n')
                    if(yearsElements.includes(`${car.ano}`)) {
                    } else {
                        const yearElement = document.createElement('option')
                        yearElement.innerText = car.ano
                        minYearInput.appendChild(yearElement)
                    }

                }
            }
            if(minSelected) {
                minYearInput.value = minValue
            }
        })
    } else {
        maxSelected = false
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

// Executar ao carregar a página:
loadCards()
brandCounterFunction()
fuelCounterFunction()
createMinYear()
createMaxYear()



