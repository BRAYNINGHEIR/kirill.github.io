// Подсветка активного пункта меню (если нет класса active)
document.addEventListener('DOMContentLoaded', function() {
    // Динамическое приветствие на главной
    if (document.querySelector('h2') && document.title.includes('Главная')) {
        const h2 = document.querySelector('h2');
        const hour = new Date().getHours();
        let greet = 'Добро пожаловать!';
        if (hour >= 5 && hour < 12) greet = 'Доброе утро!';
        else if (hour >= 12 && hour < 18) greet = 'Добрый день!';
        else if (hour >= 18 && hour < 23) greet = 'Добрый вечер!';
        h2.textContent = greet + ' ' + h2.textContent.replace('Добро пожаловать!', '');
    }

    // XSS-safe text node insertion
    function safeText(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // Проверка форм + XSS защита
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true, msg = '';
            const email = form.querySelector('input[type="email"]');
            if (email && !/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email.value)) {
                valid = false;
                msg += 'Введите корректный email.\n';
                email.style.borderColor = 'red';
            } else if (email) {
                email.style.borderColor = '#7ed6df';
            }
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    msg += 'Заполните все обязательные поля.\n';
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#7ed6df';
                }
            });
            if (!valid) {
                e.preventDefault();
                alert(msg);
            } else {
                e.preventDefault();
                // XSS-safe вывод сообщения
                form.reset();
                let ok = document.createElement('div');
                ok.innerHTML = safeText('Спасибо! Форма успешно отправлена.');
                ok.style.background = '#7ed6df';
                ok.style.color = '#232526';
                ok.style.padding = '1rem';
                ok.style.margin = '1rem 0';
                ok.style.borderRadius = '6px';
                ok.style.textAlign = 'center';
                form.parentNode.insertBefore(ok, form);
                setTimeout(() => ok.remove(), 3000);
            }
        });
    });
});
