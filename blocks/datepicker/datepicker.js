import $ from 'jquery';

class Datepicker {
  $datepicker;

  constructor(datepicker) {
    this.$datepicker = $(datepicker);
  }

  init() {
    this.$datepicker
      .on('focusin', { datepicker: this }, handleDatepickerFocusin)
      .on('mousedown', { datepicker: this }, handleDatepickerMousedown);

    $('.js-datepicker__down', this.$datepicker).on('focusin mousedown', handleDownFocusin);
  }
}

function handleDatepickerFocusin(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.addClass('datepicker_open datepicker_just-now-focused');

  const close = (eventIN) => {
    const {
      $datepicker: $datepickerIN,
      close: closeIN,
    } = eventIN.data;

    if ($datepickerIN.hasClass('datepicker_just-now-focused')) {
      $datepickerIN.removeClass('datepicker_just-now-focused');
      return;
    }

    $datepickerIN.removeClass('datepicker_open');

    $(window).off('focusin mousedown', closeIN);

    $(event.target).addClass('RAT RAT RAT RAT RAT');
  };

  $(window).on('focusin mousedown', { $datepicker, close }, close);
}

function handleDatepickerMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.toggleClass('datepicker_open');

  event.stopPropagation();
}

function handleDownFocusin(event) {
  event.stopPropagation();
}

$('.js-datepicker').each((index, datepicker) => {
  const jsDatepicker = new Datepicker(datepicker);
  jsDatepicker.init();
});
