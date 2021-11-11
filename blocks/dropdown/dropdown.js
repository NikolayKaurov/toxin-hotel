const MAX = 99; // максимальное значение каждого счётчика в дропдауне
// минимальное значение 0

const MIBGFACTM = 50; // minimum interval between getting focus and clicking the mouse 50 milliseconds
// Требуется для корректной обработки щелчка мыши по дропдауну, когда вся страница не в фокусе (фокус на консоли, на
// другом окне и т. д.)
// Только в этом случае событие получения фокуса обрабатывается раньше события mousedown


let $ = require('jquery');

$('.js-dropdown').each(function() {
  if (!isDropdownWithJSModifier(this)) {
    new Dropdown(this);
  }
})

function Dropdown($dropdown) {
  this.$dropdown = $dropdown;

  this.name = this.$dropdown.dataset.dropdownName;
  // console.log(this.name);

  this.$dropdown__down = $('.dropdown__down', this.$dropdown);
  $(this.$dropdown__down).css('height','43px');

  this.openHeight = 52;

  this.$dropdown__items = $('.js-dropdown__item', this.$dropdown);
  $(this.$dropdown__items).each((index, $dropdown__item) => {
    $($dropdown__item).attr('data-dropdown-name', this.name);

    this.openHeight += 37;
  });

  if ($('.dropdown__button-container', this.$dropdown).length) {
    this.openHeight += 41;
  }
  this.openHeight += 'px';

  this.timeFocus = 0;

  $(this.$dropdown).on('focus', () => {
    $(this.$dropdown).addClass('dropdown_open');
    $(this.$dropdown__down).css('height',this.openHeight);

    this.timeFocus = Date.now();
  })

  $(this.$dropdown).on('blur', () => {
    $(this.$dropdown).removeClass('dropdown_open');
    $(this.$dropdown__down).css('height','43px');
  })
}

function isDropdownWithJSModifier($dropdown) {
  return !!($($dropdown).attr('class').match(/js-dropdown_[^_]/));
}
