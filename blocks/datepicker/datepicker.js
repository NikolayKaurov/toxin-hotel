import $ from 'jquery';

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const shortMonths = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

class Datepicker {
  constructor(datepicker) {
    this.$datepicker = $(datepicker);
  }

  init() {
    this.$datepicker
      .on('focusin', { datepicker: this }, handleDatepickerFocusin)
      .on('mousedown', { datepicker: this }, handleDatepickerMousedown);

    $('.js-datepicker__down', this.$datepicker).on('mousedown', stop);

    this.$arrival = $('.js-datepicker__input_date_arrival', this.$datepicker)
      .val('');
    this.$departure = $('.js-datepicker__input_date_departure', this.$datepicker)
      .val('');
    this.$dropFilter = $('.js-datepicker__drop_format_filter', this.$datepicker);
    this.$dropArrival = $('.js-datepicker__drop_date_arrival', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleArrivalMousedown);
    this.$dropDeparture = $('.js-datepicker__drop_date_departure', this.$datepicker)
      .on('mousedown', { datepicker: this }, handleDepartureMousedown);
    this.$back = $('.js-datepicker__button_action_back', this.$datepicker);
    // this.$forward = $('.js-datepicker__button_action_forward', this.$datepicker);
    this.$monthYear = $('.js-datepicker__month-year', this.$datepicker);
    this.$calendar = $('.js-datepicker__tbody', this.$datepicker);
    this.$clear = $('.js-datepicker__button_action_clear', this.$datepicker);
    this.$confirm = $('.js-datepicker__button_action_confirm', this.$datepicker);

    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.cursorDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.calendarMonth = new Date(now.getFullYear(), now.getMonth());

    this.update();
  }

  update() {
    const arrival = this.$arrival.val();
    const departure = this.$departure.val();

    const dateArrival = new Date(arrival);
    const dateDeparture = new Date(departure);

    dateArrival.setHours(0, 0, 0);
    dateDeparture.setHours(0, 0, 0);

    const period = (arrival !== '') && (departure !== '');

    if (period) {
      this.$dropFilter.text(
        `${dateArrival.getDate()} ${shortMonths[dateArrival.getMonth()]} - ${dateDeparture.getDate()} ${shortMonths[dateDeparture.getMonth()]}`,
      );
      this.$dropArrival.text(arrival.split('-').reverse().join('.'));
      this.$dropDeparture.text(departure.split('-').reverse().join('.'));
    } else if (arrival !== '') {
      this.$dropFilter.text(
        `${dateArrival.getDate()} ${shortMonths[dateArrival.getMonth()]}`,
      );
      this.$dropArrival.text(arrival.split('-').reverse().join('.'));
      this.$dropDeparture.text('ДД.ММ.ГГГГ');
    } else if (departure !== '') {
      this.$dropFilter.text(
        `${dateDeparture.getDate()} ${shortMonths[dateDeparture.getMonth()]}`,
      );
      this.$dropArrival.text('ДД.ММ.ГГГГ');
      this.$dropDeparture.text(departure.split('-').reverse().join('.'));
    } else {
      this.$dropFilter.text('Укажите даты пребывания');
      this.$dropDeparture.text('ДД.ММ.ГГГГ');
      this.$dropArrival.text('ДД.ММ.ГГГГ');
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

    // 0 - понедельник, 1 - вторник, 2 - среда...
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

        if (period) {
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

        const zeroMonth = cycleDate.getMonth() < 9 ? '0' : '';
        const zeroDate = cycleDate.getDate() < 10 ? '0' : '';

        calendarHTML += `<td class="js-datepicker__cell datepicker__cell${cellClasses}" data-date="${cycleDate.getFullYear()}-${zeroMonth}${cycleDate.getMonth() + 1}-${zeroDate}${cycleDate.getDate()}">${cycleDate.getDate()}${cellPeriod}</td>`;

        cycleDate.setDate(cycleDate.getDate() + 1);
      }

      calendarHTML += '</tr>';
    } while (cycleDate.getMonth() === this.calendarMonth.getMonth());

    this.$calendar.html(calendarHTML);

    this.$clear.prop(
      'disabled',
      arrival === '' && departure === '',
    );

    this.$confirm.prop('disabled', !period);
  }
}

function handleDatepickerFocusin(event) {
  const { $datepicker } = event.data.datepicker;
  const { datepicker } = event.data;

  const close = (eventIN) => {
    const { $datepicker: $datepickerIN } = eventIN.data.datepicker;
    const { close: closeIN, datepicker: datepickerIN } = event.data;

    if ($datepickerIN.hasClass('datepicker_just-now-focused')) {
      $datepickerIN.removeClass('datepicker_just-now-focused');
      return;
    }

    $datepickerIN.removeClass('datepicker_open');

    $(window).off('focusin mousedown', closeIN);

    $datepickerIN
      .off('focusin', stop)
      .on('focusin', { datepicker: datepickerIN }, handleDatepickerFocusin);
  };

  $datepicker.addClass('datepicker_open datepicker_just-now-focused');

  $(window).on('focusin mousedown', { datepicker, close }, close);

  $datepicker
    .off('focusin', handleDatepickerFocusin)
    .on('focusin', stop);
}

function handleDatepickerMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.toggleClass('datepicker_open');

  event.stopPropagation();
}

function handleArrivalMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.attr('data-active', 'arrival');
}

function handleDepartureMousedown(event) {
  const { $datepicker } = event.data.datepicker;

  $datepicker.attr('data-active', 'departure');
}

function stop(event) {
  event.stopPropagation();
}

$('.js-datepicker').each((index, datepicker) => {
  const jsDatepicker = new Datepicker(datepicker);
  jsDatepicker.init();
});
