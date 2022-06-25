import $ from 'jquery';

const openCloseTime = 50;
const interval = 40;

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

function handleBurgerMousedown(event) {
  const { burger } = event.data;

  if (Math.abs(event.timeStamp - burger.timeStamp) < interval) {
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

  if (Math.abs(event.timeStamp - burger.timeStamp) < interval) {
    return;
  }

  burger.setTimeStamp(event.timeStamp);

  clearTimeout(burger.timerID);

  burger.setTimerID(setTimeout(open, openCloseTime, burger));
}

function close(burger) {
  burger.close();
}

function handleBurgerFocusout(event) {
  const { burger } = event.data;

  clearTimeout(burger.timerID);

  burger.setTimerID(setTimeout(close, openCloseTime, burger));
}

function handleItemMousedown(event) {
  event.stopPropagation();
}

function handleSubmenuMousedown(event) {
  const $submenu = $(event.target);
  const timeStamp = parseFloat($submenu.attr('data-timestamp'));

  if (Math.abs(event.timeStamp - timeStamp) < interval) {
    return;
  }

  $submenu.attr('data-timestamp', event.timeStamp);

  $submenu.toggleClass('burger__submenu_open');
}

function openSub($submenu) {
  $submenu.addClass('burger__submenu_open');
}

function handleSubmenuFocusin(event) {
  const $submenu = $(event.delegateTarget);
  const timeStamp = parseFloat($submenu.attr('data-timestamp'));
  const timerID = parseFloat($submenu.attr('data-timer-id'));

  if (Math.abs(event.timeStamp - timeStamp) < interval) {
    return;
  }

  $submenu.attr('data-timestamp', event.timeStamp);

  clearTimeout(timerID);

  $submenu.attr('data-timer-id', setTimeout(openSub, openCloseTime, $submenu));
}

function closeSub($submenu) {
  $submenu.removeClass('burger__submenu_open');
}

function handleSubmenuFocusout(event) {
  const $submenu = $(event.delegateTarget);
  const timerID = parseFloat($submenu.attr('data-timer-id'));

  clearTimeout(timerID);

  $submenu.attr('data-timer-id', setTimeout(closeSub, openCloseTime, $submenu));
}

$('.js-burger').each((index, burger) => {
  const jsBurger = new Burger(burger);
  jsBurger.init();
});
