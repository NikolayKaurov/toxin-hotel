import $ from 'jquery';

// minimum interval between getting focus and clicking the mouse 50 milliseconds
const INTERVAL = 50;

function handleExpandMousedown(event) {
  if (Math.abs(event.timeStamp - event.data.datepicker.timeFocus) < INTERVAL) {
    return;
  }

  $(event.delegateTarget).toggleClass('datepicker__expand_open');

  console.log('expand mousedown');
}

function handleExpandFocusin(event) {
  $(event.target).removeClass('datepicker__expand_keeping-focus');
  event.data.datepicker.setTimeFocus(event.timeStamp);

  if ($(event.target).hasClass('js-datepicker__expand_arrival')) {
    event.data.datepicker.setActiveDate('arrival');
  } else {
    event.data.datepicker.setActiveDate('departure');
  }

  $(event.target).addClass('datepicker__expand_open');

  console.log('expand focusin');
}

function handleExpandFocusout(event) {
  $(event.target).removeClass('datepicker__expand_open');

  console.log('expand focusout');
}

function handleMousedown(event) {
  if (event.data.datepicker.$datepicker__expands.hasClass('datepicker__expand_open')) {
    event.data.datepicker.$datepicker__down.css({
      height: '200px',
      border: '1px solid rgba(31, 32, 65, 0.25)',
      transition: 'height 500ms, border 500ms',
    });

    $('.datepicker__expand_open', event.data.datepicker.$datepicker__drop).addClass('datepicker__expand_keeping-focus');
  } else {
    event.data.datepicker.$datepicker__down.css({
      height: '0',
      border: '0px solid rgba(31, 32, 65, 0)',
      transition: 'height 500ms, border 500ms',
    });
  }

  console.log('datepicker mousedown');
}

function handleFocusin(event) {
  console.log('datepicker focusin');
  // $(event.delegateTarget).addClass('datepicker_open');
  event.data.datepicker.$datepicker__down.css({
    height: '200px',
    border: '1px solid rgba(31, 32, 65, 0.25)',
    transition: 'height 500ms, border 500ms',
  });
}

function handleFocusout(event) {
  if (!(event.data.datepicker.$datepicker__expands.hasClass('datepicker__expand_open'))) {
    // $(event.delegateTarget).removeClass('datepicker_open');
    event.data.datepicker.$datepicker__down.css({
      height: '0',
      border: '0px solid rgba(31, 32, 65, 0)',
      transition: 'height 500ms, border 500ms',
    });
  }
  console.log('datepicker focusout');
}

class Datepicker {
  constructor(datepicker) {
    this.$datepicker = $(datepicker);
    this.$datepicker__expands = $('.js-datepicker__expand', this.$datepicker);
    this.$datepicker__drop = $('.js-datepicker__drop', this.$datepicker);
    this.$datepicker__down = $('.js-datepicker__down', this.$datepicker);

    this.name = datepicker.dataset.name;
    this.zIndex = datepicker.dataset.zIndex;

    this.timeFocus = 0;

    this.activeDate = 'both';
  }

  init() {
    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.todayMonth = new Date(now.getFullYear(), now.getMonth());
    this.calendarMonth = new Date(now.getFullYear(), now.getMonth());

    this.$datepicker__expands.on(
      `mousedown.datepicker__expand.${this.name}`,
      null,
      { datepicker: this },
      handleExpandMousedown,
    );

    this.$datepicker__expands.on(
      `focusin.datepicker__expand.${this.name}`,
      null,
      { datepicker: this },
      handleExpandFocusin,
    );

    this.$datepicker__expands.on(
      `focusout.datepicker__expand.${this.name}`,
      null,
      { },
      handleExpandFocusout,
    );

    this.$datepicker.on(
      `mousedown.datepicker.${this.name}`,
      null,
      { datepicker: this },
      handleMousedown,
    );

    this.$datepicker.on(
      `focusin.datepicker.${this.name}`,
      null,
      { datepicker: this },
      handleFocusin,
    );

    this.$datepicker.on(
      `focusout.datepicker.${this.name}`,
      null,
      { datepicker: this },
      handleFocusout,
    );
  }

  setTimeFocus(time) {
    this.timeFocus = time;
  }

  setActiveDate(activeDate) {
    this.activeDate = activeDate;
  }
}

function isDatepickerWithJSModifier(datepicker) {
  return !!($(datepicker).attr('class').match(/js-datepicker_[^_]/));
}

$('.js-datepicker').each((index, element) => {
  if (!isDatepickerWithJSModifier(element)) {
    const datepicker = new Datepicker(element);
    datepicker.init();
  }
});
