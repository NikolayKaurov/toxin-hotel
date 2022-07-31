import $ from 'jquery';

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const shortMonths = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

const enter = 13;
const spaceBar = 32;
const left = 37;
const up = 38;
const right = 39;
const down = 40;

class Datepicker {
  $datepicker;

  $arrival;

  $departure;

  $dropFilter;

  $dropArrival;

  $dropDeparture;

  $back;

  $monthYear;

  $calendar;

  $clear;

  $confirm;

  today;

  cursorDate;

  calendarMonth;

  constructor(datepicker) {
    this.$datepicker = $(datepicker);
  }

  init() {
    this.$datepicker
      .on('keydown', { datepicker: this }, handleDatepickerKeydown);

    if (!this.$datepicker.hasClass('datepicker_format_demo')) {
      this.$datepicker
        .on('focusin', { datepicker: this }, handleDatepickerFocusin)
        .on('mousedown', { datepicker: this }, handleDatepickerMousedown);

      $('.js-datepicker__down', this.$datepicker)
        .on('mousedown', stop);
    }

    this.$arrival = $('.js-datepicker__input_date_arrival', this.$datepicker)
      .val('');

    this.$departure = $('.js-datepicker__input_date_departure', this.$datepicker)
      .val('');

    this.$dropFilter = $('.js-datepicker__drop_format_filter', this.$datepicker);

    this.$dropArrival = $('.js-datepicker__drop_date_arrival', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleArrivalMousedown);

    this.$dropDeparture = $('.js-datepicker__drop_date_departure', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleDepartureMousedown);

    this.$back = $('.js-datepicker__button_action_back', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleBackMousedown);

    $('.js-datepicker__button_action_forward', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleForwardMousedown);

    this.$monthYear = $('.js-datepicker__month-year', this.$datepicker);

    this.$calendar = $('.js-datepicker__tbody', this.$datepicker)
      .on(
        'click',
        '.datepicker__cell_clickable',
        { datepicker: this },
        handleCellClick,
      );

    this.$clear = $('.js-datepicker__button_action_clear', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleClearMousedown);

    this.$confirm = $('.js-datepicker__button_action_confirm', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleConfirmMousedown);

    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.cursorDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.calendarMonth = new Date(now.getFullYear(), now.getMonth());

    return this.update();
  }

  update() {
    const arrival = this.$arrival.val();
    const departure = this.$departure.val();

    const dateArrival = new Date(arrival);
    const dateDeparture = new Date(departure);

    dateArrival.setHours(0, 0, 0);
    dateDeparture.setHours(0, 0, 0);

    const hasPeriod = (arrival !== '') && (departure !== '');

    if (hasPeriod) {
      this.$dropFilter
        .text(
          `${dateArrival.getDate()} ${shortMonths[dateArrival.getMonth()]} - ${dateDeparture.getDate()} ${shortMonths[dateDeparture.getMonth()]}`,
        );
      this.$dropArrival
        .text(arrival.split('-').reverse().join('.'))
        .attr('datetime', arrival);
      this.$dropDeparture
        .text(departure.split('-').reverse().join('.'))
        .attr('datetime', departure);
    } else if (arrival !== '') {
      this.$dropFilter
        .text(
          `${dateArrival.getDate()} ${shortMonths[dateArrival.getMonth()]}`,
        );
      this.$dropArrival
        .text(arrival.split('-').reverse().join('.'))
        .attr('datetime', arrival);
      this.$dropDeparture
        .text('ДД.ММ.ГГГГ')
        .attr('datetime', '1970-01-01');
    } else if (departure !== '') {
      this.$dropFilter
        .text(
          `${dateDeparture.getDate()} ${shortMonths[dateDeparture.getMonth()]}`,
        );
      this.$dropArrival
        .text('ДД.ММ.ГГГГ')
        .attr('datetime', '1970-01-01');
      this.$dropDeparture
        .text(departure.split('-').reverse().join('.'))
        .attr('datetime', departure);
    } else {
      this.$dropFilter.text('Укажите даты пребывания');
      this.$dropDeparture
        .text('ДД.ММ.ГГГГ')
        .attr('datetime', '1970-01-01');
      this.$dropArrival
        .text('ДД.ММ.ГГГГ')
        .attr('datetime', '1970-01-01');
    }

    this.$back.prop(
      'disabled',
      this.today.getMonth() === this.calendarMonth.getMonth()
      && this.today.getFullYear() === this.calendarMonth.getFullYear(),
    );

    this.$monthYear.text(
      `${months[this.calendarMonth.getMonth()]} ${this.calendarMonth.getFullYear()}`,
    );

    const cycleDate = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth());

    const dayOfWeek = cycleDate.getDay() ? cycleDate.getDay() - 1 : 6;
    cycleDate.setDate(cycleDate.getDate() - dayOfWeek);

    let calendarHTML = '';

    do {
      calendarHTML += '<tr class="datepicker__row">';

      for (let i = 0; i < 7; i += 1) {
        let cellClasses = '';
        let cellPeriod = '';

        if (
          cycleDate.getTime() === dateArrival.getTime()
          || cycleDate.getTime() === dateDeparture.getTime()
        ) {
          cellClasses += ' datepicker__cell_selected';
        } else if (cycleDate.getTime() === this.cursorDate.getTime()) {
          cellClasses += ' datepicker__cell_format_cursor datepicker__cell_clickable';
        } else if (cycleDate.getTime() === this.today.getTime()) {
          cellClasses += ' datepicker__cell_date_today datepicker__cell_clickable';
        } else if (cycleDate > this.today) {
          cellClasses += ' datepicker__cell_clickable';
        }

        if (cycleDate.getMonth() !== this.calendarMonth.getMonth()) {
          cellClasses += ' datepicker__cell_date_other-month';
        }

        if (hasPeriod) {
          if (cycleDate.getTime() === dateArrival.getTime()) {
            if (i < 6) {
              cellPeriod = '<div class="datepicker__cell-period datepicker__cell-period_date_arrival"></div>';
            }
          } else if (cycleDate.getTime() === dateDeparture.getTime()) {
            if (i > 0) {
              cellPeriod = '<div class="datepicker__cell-period datepicker__cell-period_date_departure"></div>';
            }
          } else if (
            dateArrival < cycleDate
            && cycleDate < dateDeparture
          ) {
            if (i === 0) {
              cellPeriod = '<div class="datepicker__cell-period datepicker__cell-period_date_monday"></div>';
            } else if (i === 6) {
              cellPeriod = '<div class="datepicker__cell-period datepicker__cell-period_date_sunday"></div>';
            } else {
              cellPeriod = '<div class="datepicker__cell-period"></div>';
            }
          }
        }

        calendarHTML += `
          <td class="js-datepicker__cell datepicker__cell ${cellClasses}" data-date="${getDateString(cycleDate)}">
            ${cycleDate.getDate()}
            ${cellPeriod}
          </td>
        `;

        cycleDate.setDate(cycleDate.getDate() + 1);
      }

      calendarHTML += '</tr>';
    } while (cycleDate.getMonth() === this.calendarMonth.getMonth());

    this.$calendar.html(calendarHTML);

    this.$clear.prop(
      'disabled',
      arrival === '' && departure === '',
    );

    this.$confirm.prop('disabled', !hasPeriod);

    return this;
  }

  setDate(date) {
    let arrival = this.$arrival.val();
    let departure = this.$departure.val();

    if (this.$datepicker.attr('data-active') === 'arrival') {
      arrival = date;
    } else {
      departure = date;
    }

    if (arrival !== '' && departure !== '') {
      if (arrival > departure) {
        [arrival, departure] = [departure, arrival];
      }
    }

    if (date === arrival) {
      this.$datepicker.attr('data-active', 'departure');
    } else {
      this.$datepicker.attr('data-active', 'arrival');
    }

    this.$arrival.val(arrival);
    this.$departure.val(departure);

    this.$datepicker.trigger('input');

    return this;
  }
}

function handleDatepickerFocusin(event) {
  const { datepicker } = event.data;
  const { $datepicker } = datepicker;

  const close = (eventIN) => {
    const { close: closeIN, datepicker: datepickerIN } = eventIN.data;
    const { $datepicker: $datepickerIN } = datepickerIN;

    if ($datepickerIN.hasClass('datepicker_just-now-focused')) {
      $datepickerIN.removeClass('datepicker_just-now-focused');
      return;
    }

    $datepickerIN.removeClass('datepicker_open');

    $(window).off('focusin focusout mousedown', closeIN);

    $datepickerIN
      .off('focusin focusout', stop)
      .on('focusin', { datepicker: datepickerIN }, handleDatepickerFocusin);
  };

  $datepicker.addClass('datepicker_open datepicker_just-now-focused');

  $(window).on('focusin focusout mousedown', { datepicker, close }, close);

  $datepicker
    .off('focusin', handleDatepickerFocusin)
    .on('focusin  focusout', stop);
}

function handleDatepickerMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.toggleClass('datepicker_open');

  event.stopPropagation();
}

function handleDatepickerKeydown(event) {
  const { datepicker } = event.data;
  const {
    today,
    cursorDate,
    calendarMonth,
    $arrival,
    $departure,
  } = datepicker;
  const { keyCode } = event;

  const arrival = new Date($arrival.val());
  const departure = new Date($departure.val());

  arrival.setHours(0, 0, 0);
  departure.setHours(0, 0, 0);

  if (keyCode === enter || keyCode === spaceBar) {
    event.preventDefault();

    if (
      cursorDate.getTime() === arrival.getTime()
      || cursorDate.getTime() === departure.getTime()
    ) {
      return;
    }

    datepicker.setDate(getDateString(cursorDate));

    datepicker.update();

    return;
  }

  const temp = new Date(
    cursorDate.getFullYear(),
    cursorDate.getMonth(),
    cursorDate.getDate(),
  );

  switch (keyCode) {
    case left:
      temp.setDate(temp.getDate() - 1);
      if (temp.getTime() === departure.getTime()) {
        temp.setDate(temp.getDate() - 1);
      }
      if (temp.getTime() === arrival.getTime()) {
        temp.setDate(temp.getDate() - 1);
      }
      break;
    case up:
      temp.setDate(temp.getDate() - 7);
      if (temp.getTime() === departure.getTime()) {
        temp.setDate(temp.getDate() - 7);
      }
      if (temp.getTime() === arrival.getTime()) {
        temp.setDate(temp.getDate() - 7);
      }
      break;
    case right:
      temp.setDate(temp.getDate() + 1);
      if (temp.getTime() === arrival.getTime()) {
        temp.setDate(temp.getDate() + 1);
      }
      if (temp.getTime() === departure.getTime()) {
        temp.setDate(temp.getDate() + 1);
      }
      break;
    case down:
      temp.setDate(temp.getDate() + 7);
      if (temp.getTime() === arrival.getTime()) {
        temp.setDate(temp.getDate() + 7);
      }
      if (temp.getTime() === departure.getTime()) {
        temp.setDate(temp.getDate() + 7);
      }
      break;
    default:
      return;
  }

  event.preventDefault();

  if (temp < today) {
    return;
  }

  cursorDate.setFullYear(
    temp.getFullYear(),
    temp.getMonth(),
    temp.getDate(),
  );

  calendarMonth.setFullYear(
    temp.getFullYear(),
    temp.getMonth(),
  );

  datepicker.update();
}

function handleArrivalMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.attr('data-active', 'arrival');
}

function handleDepartureMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.attr('data-active', 'departure');
}

function handleForwardMousedown(event) {
  const { datepicker } = event.data;
  const { calendarMonth: month } = datepicker;

  month.setMonth(month.getMonth() + 1);

  datepicker.update();
}

function handleBackMousedown(event) {
  const { datepicker } = event.data;
  const { calendarMonth: month } = datepicker;

  month.setMonth(month.getMonth() - 1);

  datepicker.update();
}

function handleCellClick(event) {
  const { datepicker } = event.data;

  const date = $(event.target).data('date');

  datepicker.setDate(date);

  datepicker.update();
}

function handleClearMousedown(event) {
  const { datepicker } = event.data;
  const {
    $datepicker,
    $arrival,
    $departure,
    today,
    cursorDate,
    calendarMonth,
  } = datepicker;

  $datepicker.attr('data-active', 'arrival');

  $arrival.val('');
  $departure.val('');

  $datepicker.trigger('input');

  cursorDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
  calendarMonth.setFullYear(today.getFullYear(), today.getMonth());

  datepicker.update();
}

function handleConfirmMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.removeClass('datepicker_open');
}

function stop(event) {
  event.stopPropagation();
}

function getDateString(date) {
  const zeroMonth = date.getMonth() < 9 ? '0' : '';
  const zeroDate = date.getDate() < 10 ? '0' : '';

  return `${date.getFullYear()}-${zeroMonth}${date.getMonth() + 1}-${zeroDate}${date.getDate()}`;
}

$('.js-datepicker').each((index, datepicker) => {
  const jsDatepicker = new Datepicker(datepicker);
  jsDatepicker.init();
});
