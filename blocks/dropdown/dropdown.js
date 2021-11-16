const INTERVAL = 50; // minimum interval between getting focus and clicking the mouse 50 milliseconds
// Требуется для корректной обработки щелчка мыши по дропдауну, когда вся страница не в фокусе (фокус на консоли, на
// другом окне и т. д.)
// Только в этом случае событие получения фокуса обрабатывается раньше события mousedown

const CLOSED_HEIGHT = '43px';       // Высота выпадающего элемента в закрытом состоянии
const ITEM_HEIGHT = 37;             // Высота одной строки в выпадающем элементе
const BUTTON_CONTAINER_HEIGHT = 41; // Высота нижней строки с кнопками "очистить" и "применить"
const EMPTY_OPEN_HEIGHT = 52;       // Высота выпадающего элемента в котором нет ни одной строки

let $ = require('jquery');

$('.js-dropdown').each(function() {
  if (!isDropdownWithJSModifier(this)) {
    new Dropdown(this);
  }
})

function Dropdown(dropdown) {
  this.$dropdown = $(dropdown);

  this.name = dropdown.dataset.dropdownName;

  this.zIndex = dropdown.dataset.zIndex;

  this.openHeight = EMPTY_OPEN_HEIGHT;

  this.$dropdown__items = $('.js-dropdown__item', this.$dropdown);
  this.$dropdown__items.each((index, dropdown__item) => {
    $(dropdown__item).attr('data-dropdown-name', this.name);

    this.openHeight += ITEM_HEIGHT;
  });

  if ($('.js-dropdown__button-container', this.$dropdown).length) {
    this.openHeight += BUTTON_CONTAINER_HEIGHT;
  }
  this.openHeight += 'px';

  this.$dropdown__down = $('.js-dropdown__down', this.$dropdown);
  this.$dropdown__down.css({
    'height': () => {
      return CLOSED_HEIGHT;
    },
    'z-index': () => {
      return 2 * this.zIndex - 1;
    }
  });

  this.$dropdown__drop = $('.js-dropdown__drop', this.$dropdown);
  this.$dropdown__drop.css({
    'z-index': () => {
      return 2 * this.zIndex;
    }
  });

  this.time = {
    timeFocus: 0
  };

  this.$dropdown.on('focus.dropdown.' + this.name,
      null,
      {$dropdown__down: this.$dropdown__down,
      openHeight: this.openHeight,
      time: this.time},
      handleFocus);
  function handleFocus( event ) {
    $(event.target).addClass('dropdown_open');
    event.data.$dropdown__down.css('height', event.data.openHeight);

    event.data.time.timeFocus = Date.now();
  }

  this.$dropdown.on('blur.dropdown.' + this.name,
                    null,
                    {$dropdown__down: this.$dropdown__down},
                    handleBlur);
  function handleBlur( event ) {
    console.log('BLUR');

    if ($(event.target).hasClass('dropdown_keeping-focus')) {
      $(event.target).removeClass('dropdown_keeping-focus');
      return;
    }

    $(event.target).removeClass('dropdown_open');
    event.data.$dropdown__down.css('height', CLOSED_HEIGHT);
  }

  this.$dropdown__drop.on('mousedown.dropdown__drop.' + this.name,
      null,
      {$dropdown: this.$dropdown,
      $dropdown__down: this.$dropdown__down,
      time: this.time,
      openHeight: this.openHeight},
      handleDropMousedown);
  function handleDropMousedown( event ) {
    if (Date.now() - event.data.time.timeFocus < INTERVAL) {
      return;
    }

    if (event.data.$dropdown.hasClass('dropdown_open')) {
      event.data.$dropdown.removeClass('dropdown_open');
      event.data.$dropdown__down.css('height', CLOSED_HEIGHT);
    } else {
      event.data.$dropdown.addClass('dropdown_open');
      event.data.$dropdown__down.css('height', event.data.openHeight);
    }
  }

  // this.$dropdown.on('mousedown', () => {
  //   if (Date.now() - this.timeFocus < INTERVAL) {
  //     return;
  //   }
  //
  //   if (this.$dropdown.hasClass('dropdown_open')) {
  //     this.$dropdown.removeClass('dropdown_open');
  //     this.$dropdown__down.css('height', CLOSED_HEIGHT);
  //   } else {
  //     this.$dropdown.addClass('dropdown_open');
  //     this.$dropdown__down.css('height', this.openHeight);
  //   }
  // });
}

function isDropdownWithJSModifier(dropdown) {
  return !!($(dropdown).attr('class').match(/js-dropdown_[^_]/));
}
