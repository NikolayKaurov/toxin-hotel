import $ from 'jquery';

const OPEN_CLOSE_TIME = 50;
const INTERVAL = 40;

function handleBurgerMousedown(event) {
  const { burger } = event.data;

  if (Math.abs(event.timeStamp - burger.timeStamp) < INTERVAL) {
    return;
  }

  burger.setTimeStamp(event.timeStamp);

  burger.$burger.toggleClass('burger_open');
}

function open(burger) {
  burger.open();
}

function handleBurgerFocusin(event) {
  const { burger } = event.data;

  if (Math.abs(event.timeStamp - burger.timeStamp) < INTERVAL) {
    return;
  }

  burger.setTimeStamp(event.timeStamp);

  clearTimeout(burger.timerID);

  burger.setTimerID(setTimeout(open, OPEN_CLOSE_TIME, burger));
}

function close(burger) {
  burger.close();
}

function handleBurgerFocusout(event) {
  const { burger } = event.data;

  clearTimeout(burger.timerID);

  burger.setTimerID(setTimeout(close, OPEN_CLOSE_TIME, burger));
}

function handleItemMousedown(event) {
  event.stopPropagation();
}

function handleSubmenuMousedown(event) {
  const $submenu = $(event.target);
  const timeStamp = parseFloat($submenu.attr('data-timeStamp'));

  if (Math.abs(event.timeStamp - timeStamp) < INTERVAL) {
    return;
  }

  $submenu.attr('data-timeStamp', event.timeStamp);

  $submenu.toggleClass('burger__submenu_open');
}

function openSub($submenu) {
  $submenu.addClass('burger__submenu_open');
}

function handleSubmenuFocusin(event) {
  const $submenu = $(event.delegateTarget);
  const timeStamp = parseFloat($submenu.attr('data-timeStamp'));
  const timerID = parseFloat($submenu.attr('data-timerID'));

  if (Math.abs(event.timeStamp - timeStamp) < INTERVAL) {
    return;
  }

  $submenu.attr('data-timeStamp', event.timeStamp);

  clearTimeout(timerID);

  $submenu.attr('data-timerID', setTimeout(openSub, OPEN_CLOSE_TIME, $submenu));
}

function closeSub($submenu) {
  $submenu.removeClass('burger__submenu_open');
}

function handleSubmenuFocusout(event) {
  const $submenu = $(event.delegateTarget);
  const timerID = parseFloat($submenu.attr('data-timerID'));

  clearTimeout(timerID);

  $submenu.attr('data-timerID', setTimeout(closeSub, OPEN_CLOSE_TIME, $submenu));
}

class Burger {
  constructor(burger) {
    this.$burger = $(burger);
  }

  init() {
    this.timerID = 0;
    this.timeStamp = 0;

    this.$burger
      .on(
        'mousedown',
        null,
        { burger: this },
        handleBurgerMousedown,
      )
      .on(
        'mousedown',
        '.js-burger__item',
        { },
        handleItemMousedown,
      )
      .on(
        'focusin',
        null,
        { burger: this },
        handleBurgerFocusin,
      )
      .on(
        'focusout',
        null,
        { burger: this },
        handleBurgerFocusout,
      )
      .on(
        'mousedown',
        '.js-burger__submenu',
        { },
        handleSubmenuMousedown,
      );

    $('.js-burger__submenu', this.$burger)
      .on('focusin', null, { }, handleSubmenuFocusin)
      .on('focusout', null, { }, handleSubmenuFocusout);
  }

  open() {
    this.$burger.addClass('burger_open');
  }

  close() {
    this.$burger.removeClass('burger_open');
  }

  setTimerID(id) {
    this.timerID = id;
  }

  setTimeStamp(timeStamp) {
    this.timeStamp = timeStamp;
  }
}

$('.js-burger').each((index, element) => {
  const burger = new Burger(element);
  burger.init();
});
