// Показать меню
document.querySelector('.btn-primary').click()

// Запуск игры на enter
document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        document.querySelector('.btn-play').click()
    }
})

// Кнопка Играть
const buttonPlay = document.querySelector('.btn-play')
buttonPlay.addEventListener('click', run)