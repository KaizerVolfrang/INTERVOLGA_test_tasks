document.addEventListener('DOMContentLoaded', function() {
    // Открытие всплывающего окна при нажатии на элемент с классом 'open-popup'
    $('.open-popup').click(function(e) {
        e.preventDefault(); // Предотвращение стандартного поведения ссылки
        $('.popup-bg').fadeIn(800); // Плавное появление фона всплывающего окна
        $('html').addClass('no-scroll'); // Отключение прокрутки страницы
    });

    // Закрытие всплывающего окна при нажатии на элемент с классом 'close-popup'
    $('.close-popup').click(function() {
        $('.popup-bg').fadeOut(800); // Плавное исчезновение фона всплывающего окна
        $('html').removeClass('no-scroll'); // Включение прокрутки страницы
    });

    // Закрытие всплывающего окна при нажатии на кнопку с классом 'btn btn-secondary'
    $('.btn.btn-secondary').click(function() {
        $('.popup-bg').fadeOut(800); // Плавное исчезновение фона всплывающего окна
    });

    const popup = document.querySelector('form'); // Получение элемента формы
    const inputs = popup.querySelectorAll('input'); // Получение всех input элементов внутри формы

    // Установка значения input 'date-issue' из Local Storage или пустой строки
    const dateInput = document.getElementById('date-issue');
    dateInput.value = localStorage.getItem('date-issue') || '';

    // Сохранение значения input 'date-issue' в Local Storage при изменении
    dateInput.addEventListener('input', function() {
        localStorage.setItem('date-issue', dateInput.value);
    });

    // Изменение типа input 'date-issue' на 'text' при потере фокуса, если значение пустое
    dateInput.addEventListener('blur', function() {
        if (!this.value) {
            this.type = 'text';
        }
    });

    // Валидация формы при отправке
    popup.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращение стандартного поведения отправки формы

        let isValid = true; // Флаг валидности формы
        const requiredInputs = popup.querySelectorAll('input[required]'); // Получение всех обязательных input элементов

        // Проверка каждого обязательного input элемента
        requiredInputs.forEach(function(input) {
            if (!input.value) {
                isValid = false;
                input.classList.add('error'); // Добавление класса 'error' для невалидных полей
            } else {
                input.classList.remove('error'); // Удаление класса 'error' для валидных полей
            }
        });

        // Если форма валидна, отправить её
        if (isValid) {
            popup.submit();
        } else {
            alert('Пожалуйста, заполните все обязательные поля.'); // Вывод сообщения об ошибке
        }
    });

    // Функция для сохранения данных в Local Storage
    function saveData() {
        inputs.forEach(function(input) {
            localStorage.setItem(input.id, input.value); // Сохранение значения каждого input элемента в Local Storage
        });
    }

    // Функция для восстановления данных из Local Storage
    function loadData() {
        inputs.forEach(function(input) {
            const savedValue = localStorage.getItem(input.id); // Получение сохраненного значения из Local Storage
            if (savedValue) {
                input.value = savedValue; // Установка значения input элемента
            }
        });
    }

    // Восстановление данных при загрузке страницы
    loadData();

    // Сохранение данных при изменении значений полей
    inputs.forEach(function(input) {
        input.addEventListener('input', saveData); // Добавление обработчика события 'input' для каждого input элемента
    });
});