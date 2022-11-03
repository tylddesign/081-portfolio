// $(document).ready(function () {
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>'
//     });
// });




// document.querySelector('.slick-prev').onclick = function () {
//     slider.goTo('prev');
// };



$(document).ready(function () {

    // Кнопка предыдущий в карусели
    document.querySelector('.slick-prev').addEventListener('click', function () {
        slider.goTo('prev');
    });

    // Кнопка следующий в карусели
    document.querySelector('.slick-next').addEventListener('click', function () {
        slider.goTo('next');
    });

    // Настройка карусели
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false
        // prevButton: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>'
    });

    // Табы
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); // closest - ближайший элемент (контейнер), внутри него find - найти активный контент, removeClass - удалить класс активности, eq - получает тот номер элемента на который мы кликнули, addClass - добавляет класс.
    });

    // Контент в табах
    function toggleSlide(item) { // функция "переключатель"
        $(item).each(function (i) { //каждый элемент (item) который попал в функцию будет делать что-то
            $(this).on('click', function (e) { //this - текущий выбранный элемент по клику будет делать следующую функцию
                e.preventDefault(); //убираем стандартное поведение браузера у ссылки
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active'); // при клике на эту кнопку будет переключаться(toggle) класс. Eq - позволяет получать элемент по индексу
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active'); // при клике на эту кнопку будет переключаться(toggle) класс. Eq - позволяет получать элемент по индексу
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal consultation
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');

    });

    // Закрытие всех модальных окн
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    //Modal order
    $('.catalog-item__btn').each(function (i) {
        $(this).on('click', function () { // По клику на кнопку (catalog-item__btn) у нас будет функция:
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); // функция берет по селектору элемент описания модального окна и вставляет в него текст. Этот текст получаем при помощи .text(), внутри которого мы находим элемент по которому кликнули и оотуда вытаскиваем нужное описание.
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // Настройка валидации
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                minlength: 2,
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, укажите имя",
                    minlength: jQuery.validator.format("Введите, пожалуйста, больше {0} символов")
                },
                phone: "Пожалуйста, укажите телефон",
                email: {
                    required: "Пожалуйста, укажите почту",
                    email: "Укажите верную почту"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    $('input[name=phone]').mask("+7 (999) 999-99-99")

    // Отправка данных с формы
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();

        }
    });

    $("a[href='#up']").click(function () {
        let _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    new WOW().init();
});