let currentNumber = 0
let numbers = []
let numbersPosibles = []
let numbersTaken = []
let inCourse = false
let status = 'Sin Iniciar'
let resultSort = false

resetGame = () => {
    let last = document.querySelector('#options').value
    numbers = Array.from({length: last}, (value, index) => index+1)
    numbersPosibles = numbers
    numbersTaken = []

    changeStatus()

    timerTaken()
}

checkAvailable = () => {
    let available = numbersPosibles.length

    if(available <= 0){
        document.querySelector('#status').innerHTML = 'Juego Terminado'
        inCourse = false
    }
}

changeSort = () => {
    resultSort = !resultSort
    updateTaken()
}

changeStatus = () => {
    let status = !inCourse ? 'En Curso' : 'En Pausa'
    inCourse = !inCourse
    document.querySelector('#status').innerHTML = status
}

timerTaken = () => {
    let time = document.querySelector('#timer').value * 1000
    if(inCourse === true){
        setTimeout(() => { takeNumber() }, time)
    }
}

pauseGame = () => {
    changeStatus()
}

resumeGame = () => {
    changeStatus()
    timerTaken()
}

updateCurrent = () => {
    document.querySelector('#currentNumber').innerHTML = currentNumber
}

updateTaken = () => {
    let result = ''

    let values = [...numbersTaken]

    if(resultSort ===  true) values.sort((a,b) => { return a - b })

    values.forEach((line) => {
        result += `<span class='text-center'> ${line} </span>`
    })

    document.querySelector('#numbersTaken').innerHTML = result
}

takeNumber = () => {
    let position = Math.floor(Math.random() * (numbersPosibles.length - 1 + 1) + 1) - 1

    currentNumber = numbersPosibles[position]
    numbersPosibles = numbersPosibles.filter(line => line !== currentNumber)
    numbersTaken.push(currentNumber)

    updateCurrent()
    updateTaken()
    checkAvailable()
    timerTaken()
}