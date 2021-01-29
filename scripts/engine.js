
let col = 0
let row = 0

let snakeCordX = 1
let snakeCordY = 1

let appleCordX = 1
let appleCordY = 1


// Получение блока по координате
function getBlockByCord(x /*block*/, y /*row*/) {
    const row = document.querySelectorAll('.row')[y - 1]
    const block = row.querySelectorAll('.block')[x - 1]

    return block
}

// Создание яблока
function makeApple(x /*block*/, y /*row*/) {
    appleCordX = x
    appleCordY = y
    getBlockByCord(x, y).classList.add('apple')
}

// Создание змеии
function makeSnake(x = 1, y = 1) {
    getBlockByCord(x, y).classList.add('snake')
}

// Съедание яблока
function appleEat() {
    // Удаление текстуры
    getBlockByCord(appleCordX, appleCordY).classList.remove('apple')

    addPoints(1)

    spawnApple()
}

// Движение
function move(x, y) {

    if (x == appleCordX && y == appleCordY) {
        appleEat()
    }

    // Закрасить
    // getBlockByCord(snakeCordX, snakeCordY).style.background='rgba(0,0,0,0)'
    getBlockByCord(snakeCordX, snakeCordY).classList.remove('snake')

    // Установить
    snakeCordX = x
    snakeCordY = y
    makeSnake(x, y)
}

// Функция спавна яблок
function spawnApple() {
    let x = random(1, col)
    let y = random(1, col)

    while(true) {
        if (!(x == snakeCordX && y ==snakeCordY)) break

        x = random(1, col)
        y = random(1, col)
    }

    makeApple(x, y)
}



// Создание арены
function area(x, y) {
    if (x < 5 || y < 5) {
        alert ('Поле слишком маленькое (лимит 20x20)')
        return
    }

    // Арена
    let $area = document.querySelector('.area')

    // Блок, кубик
    let block = `
    <div class='block'></div>
    `

    // Строка
    let row = `
    <div class='row'></div>
    `

    for (let i = 0; i < y; i++){
        $area.innerHTML += row
        let rows = document.querySelectorAll('.row')

        for (let j = 0; j < x; j++){
            rows[i].innerHTML += block
        }
    }

}



// Функция заверщение игры
function gameOver() {
    console.log('the end')
    location.reload()
}

/*
* left
* top
* right
* bottom
* */
let target = 'right'


// Функция запуска игры
function run() {
    // Получение колонок и строк из полей ввода
    col = document.querySelector('.input-col').value - 0
    row = document.querySelector('.input-row').value - 0

    // Очищение арены
    clear()

    // Создание арены
    area(col, row)

    // Cоздание змеи
    makeSnake()

    // Спавн яблока
    spawnApple()


    function moveController() {
        // Вправо
        if (target == 'right') {
            let newX = snakeCordX + 1

            if (newX > col) {
                gameOver()
            }

            move(newX, snakeCordY)
        }
        // Вниз
        if (target == 'bottom') {
            let newY = snakeCordY + 1

            if (newY > row) {
                gameOver()
            }

            move(snakeCordX, newY)
        }
        // Вверх
        if (target == 'top') {

            let newY = snakeCordY - 1

            if (newY < 1) {
                gameOver()
            }

            move(snakeCordX, newY)
        }
        // Влево
        if (target == 'left') {
            let newX = snakeCordX - 1

            if (newX < 1) {
                gameOver()
            }

            move(newX, snakeCordY)
        }

        if (target == 'pause') {

        }
    }

    function moveButtonController(event) {

        // Вправо
        if (event.keyCode == 39) {
            if (target == 'left') return

            target = 'right'
        }
        // Вниз
        if (event.keyCode == 40) {
            if (target == 'top') return

            target = 'bottom'
        }
        // Вверх
        if (event.keyCode == 38) {
            if (target == 'bottom') return
            target = 'top'
        }
        // Влево
        if (event.keyCode == 37) {
            if (target == 'right') return
            target = 'left'
        }

        if (event.keyCode == 17) {
            target = 'pause'
        }
    }
    document.addEventListener('keydown', moveButtonController)

    setInterval(moveController, 80 )
}