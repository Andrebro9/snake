/* Pure Function */

// Очищение поля
function clear() {
    let $area = document.querySelector('.area')
    $area.innerHTML = ""
}


// Добавляет очки
function addPoints(value) {
    let $points = document.querySelector(".points")
    $points.textContent = ($points.textContent - 0) + value
}


// Генерирует рандомное значение
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/******************/




/* ====------- Engine -------==== */

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

function appleEat() {
    // Удаление текстуры
    getBlockByCord(appleCordX, appleCordY).classList.remove('apple')

    addPoints(1)

    spawnApple()
}

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
    if (x < 20 || y < 20) {
        alert ('Поле слишком маленькое (лимит 20x20)')
        return
    } 

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




function gameOver() {
    alert('The End')
    location.reload()
}

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



    function moveController(event) {
        // Вправо
        if (event.keyCode == 39) {
            let newX = snakeCordX + 1

            if (newX > col) { 
                gameOver()
            }

            move(newX, snakeCordY)
        }
        // Вниз
        if (event.keyCode == 40) {
            let newY = snakeCordY + 1

            if (newY > row) { 
                gameOver()
            }

            move(snakeCordX, newY)
        }
        // Вверх
        if (event.keyCode == 38) {
            
            let newY = snakeCordY - 1

            if (newY < 1) { 
                gameOver()
            }
            
            move(snakeCordX, newY)
        }
        // Влево
        if (event.keyCode == 37) {
            let newX = snakeCordX - 1
           
            if (newX < 1) { 
                gameOver()
            }

            // if (newX == 0) { 
            //     gameOver()
            // }
            
            move(newX, snakeCordY)
        }
    }
    
    document.addEventListener('keydown', moveController)
}

/**************************************************/




/* ===-- UI --=== */

// Показать меню
document.querySelector('.btn-primary').click()
document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        document.querySelector('.btn-play').click()
    }
})

// Кнопка Играть
const buttonPlay = document.querySelector('.btn-play')
buttonPlay.addEventListener('click', run) 

/******************/


/*
    План:
1. Управление змейкой
2. съедание яблока
3. добавление очков 
4. Рефакторинг

*/




