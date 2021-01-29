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