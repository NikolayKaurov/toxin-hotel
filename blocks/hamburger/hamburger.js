import $ from 'jquery';

const OPEN_CLOSE_TIME = 50;
const INTERVAL = 40;

function handleHamburgerMousedown(event) {
  const { hamburger } = event.data;

  if (Math.abs(event.timeStamp - hamburger.timeStamp) < INTERVAL) {
    return;
  }

  hamburger.setTimeStamp(event.timeStamp);

  hamburger.$hamburger.toggleClass('hamburger_open');
}

function open(hamburger) {
  hamburger.open();
}

function handleHamburgerFocusin(event) {
  const { hamburger } = event.data;

  if (Math.abs(event.timeStamp - hamburger.timeStamp) < INTERVAL) {
    return;
  }

  hamburger.setTimeStamp(event.timeStamp);

  clearTimeout(hamburger.timerID);

  hamburger.setTimerID(setTimeout(open, OPEN_CLOSE_TIME, hamburger));
}

function close(hamburger) {
  hamburger.close();
}

function handleHamburgerFocusout(event) {
  const { hamburger } = event.data;

  clearTimeout(hamburger.timerID);

  hamburger.setTimerID(setTimeout(close, OPEN_CLOSE_TIME, hamburger));
}

function handleItemMousedown(event) {
  event.stopPropagation();
}

function handleSubhamburgerMousedown(event) {
  const { hamburger } = event.data;

  if (Math.abs(event.timeStamp - hamburger.subTimeStamp) < INTERVAL) {
    return;
  }

  hamburger.setSubTimeStamp(event.timeStamp);

  $(event.target).toggleClass('hamburger__subhamburger_open');
}

function openSub($subhamburger) {
  $subhamburger.addClass('hamburger__subhamburger_open');
}

function handleSubhamburgerFocusin(event) {
  const { hamburger } = event.data;

  if (Math.abs(event.timeStamp - hamburger.subTimeStamp) < INTERVAL) {
    return;
  }

  hamburger.setSubTimeStamp(event.timeStamp);

  clearTimeout(hamburger.subTimerID);

  hamburger.setSubTimerID(setTimeout(openSub, OPEN_CLOSE_TIME, $(event.target)));
}

function closeSub($subhamburger) {
  $subhamburger.removeClass('hamburger__subhamburger_open');
}

function handleSubhamburgerFocusout(event) {
  const { hamburger } = event.data;

  clearTimeout(hamburger.subTimerID);

  hamburger.setSubTimerID(setTimeout(closeSub, OPEN_CLOSE_TIME, $(event.delegateTarget)));
}

class Hamburger {
  constructor(hamburger) {
    this.$hamburger = $(hamburger);
  }

  init() {
    this.timerID = 0;
    this.subTimerID = 0;
    this.timeStamp = 0;
    this.subTimeStamp = 0;

    this.$hamburger
      .on(
        'mousedown',
        null,
        { hamburger: this },
        handleHamburgerMousedown,
      )
      .on(
        'mousedown',
        '.js-hamburger__item',
        { },
        handleItemMousedown,
      )
      .on(
        'focusin',
        null,
        { hamburger: this },
        handleHamburgerFocusin,
      )
      .on(
        'focusout',
        null,
        { hamburger: this },
        handleHamburgerFocusout,
      )
      .on(
        'mousedown',
        '.js-hamburger__subhamburger',
        { hamburger: this },
        handleSubhamburgerMousedown,
      )
      .on(
        'focusin',
        '.js-hamburger__subhamburger',
        { hamburger: this },
        handleSubhamburgerFocusin,
      );

    $('.js-hamburger__subhamburger', this.$hamburger)
      .on(
        'focusout',
        null,
        { hamburger: this },
        handleSubhamburgerFocusout,
      );
  }

  open() {
    this.$hamburger.addClass('hamburger_open');
  }

  close() {
    this.$hamburger.removeClass('hamburger_open');
  }

  setTimerID(id) {
    this.timerID = id;
  }

  setSubTimerID(id) {
    this.subTimerID = id;
  }

  setTimeStamp(timeStamp) {
    this.timeStamp = timeStamp;
  }

  setSubTimeStamp(timeStamp) {
    this.subTimeStamp = timeStamp;
  }
}

$('.js-hamburger').each((index, element) => {
  const hamburger = new Hamburger(element);
  hamburger.init();
});
