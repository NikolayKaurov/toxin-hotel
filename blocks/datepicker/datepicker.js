import $ from 'jquery';

// minimum interval between getting focus and clicking the mouse 50 milliseconds
const INTERVAL = 50;

// высота выпадающего элемента без календаря
const EMPTY_CALENDAR_HEIGHT = 129;

const DURATION_OPEN = 500;

const CALENDAR_HEAD = '<tr class="datepicker__calendar-header"><th class="datepicker__cell">Пн</th><th class="datepicker__cell">Вт</th><th class="datepicker__cell">Ср</th><th class="datepicker__cell">Чт</th><th class="datepicker__cell">Пт</th><th class="datepicker__cell">Сб</th><th class="datepicker__cell">Вс</th></tr>';

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const SHORT_MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

function handleExpandFocusin(event) {
  $(event.target).addClass('datepicker__expand_open js-datepicker__expand_open');

  event.data.datepicker.open();

  event.data.datepicker.setTimeFocus(event.timeStamp);
}

function handleExpandFocusout(event) {
  const { $datepicker } = event.data.datepicker;

  if ($datepicker.hasClass('datepicker_keeping-open')) {
    $datepicker.removeClass('datepicker_keeping-open');

    return;
  }

  $(event.target).removeClass('datepicker__expand_open js-datepicker__expand_open');

  if (!event.data.datepicker.isOpen()) {
    if (event.data.datepicker.isRollbackable()) {
      event.data.datepicker.rollback();
    }

    event.data.datepicker.close();
  }
}

function handleExpandMousedown(event) {
  if (Math.abs(event.timeStamp - event.data.datepicker.timeFocus) < INTERVAL) {
    return;
  }

  const $expand = $(event.delegateTarget);

  if ($expand.hasClass('js-datepicker__expand_open')) {
    $expand.removeClass('datepicker__expand_open js-datepicker__expand_open');
    event.data.datepicker.close();
  } else {
    $expand.addClass('datepicker__expand_open js-datepicker__expand_open');
    event.data.datepicker.open();
  }
}

function handleExpandKeydown(event) {
  const { $expandDeparture } = event.data.datepicker;

  if (event.which === 9) {
    $expandDeparture.addClass('datepicker__expand_open js-datepicker__expand_open');
  }
}

function handleDownMousedown(event) {
  const { $datepicker, $down } = event.data.datepicker;

  $datepicker.addClass('datepicker_keeping-open');
  $down.addClass('datepicker__down_pressed');
}

function handleDownMouseup(event) {
  const { $datepicker, $down } = event.data.datepicker;

  if ($down.hasClass('datepicker__down_pressed')) {
    $down.removeClass('datepicker__down_pressed');

    $('.js-datepicker__expand_open', $datepicker).trigger('focus');
  }
}

function handleButtonMousedown(event) {
  const $button = $(event.target);
  const {
    dates,
    today,
    calendarMonth: month,
    $arrival,
    $departure,
    $expandArrival,
    $expandDeparture,
    $valueArrival,
    $valueDeparture,
    $valueFilter,
  } = event.data.datepicker;

  if ($button.hasClass('js-datepicker__button_action_month-minus')) {
    month.setMonth(month.getMonth() - 1);
  } else if ($button.hasClass('js-datepicker__button_action_month-plus')) {
    month.setMonth(month.getMonth() + 1);
  } else if ($button.hasClass('js-datepicker__button_action_clear')) {
    month.setMonth(today.getMonth());
    dates[0] = '';
    dates[1] = '';
    $expandArrival.attr('data-date', '');
    $expandDeparture.attr('data-date', '');
    $valueArrival.text('ДД.ММ.ГГГГ');
    $valueDeparture.text('ДД.ММ.ГГГГ');
    $valueFilter.text('Укажите даты пребывания');
    $arrival.val('');
    $departure.val('');
  } else {
    $button.prop('disabled', true);

    $arrival.val($expandArrival.attr('data-date'));
    $departure.val($expandDeparture.attr('data-date'));

    event.data.datepicker.close();

    return;
  }

  event.data.datepicker.updateCalendar();
}

function handleCellMousedown(event) {
  const $cell = $(event.target);
  const {
    dates,
    $datepicker,
    $expandArrival,
    $expandDeparture,
    $valueArrival,
    $valueDeparture,
    $valueFilter,
  } = event.data.datepicker;

  if (!$cell.hasClass('datepicker__cell_clickable')) {
    return;
  }

  const cellDate = $cell.data('date');

  const $openExpand = $('.js-datepicker__expand_open', $datepicker);

  // не фильтр и не демо
  const regularFormat = $openExpand.hasClass('js-datepicker__expand_date_arrival')
    || $openExpand.hasClass('js-datepicker__expand_date_departure');

  if (regularFormat) {
    if (dates[1] === $openExpand.attr('data-date')) {
      dates[1] = cellDate;
    } else {
      dates[0] = cellDate;
    }
  } else {
    dates.push(cellDate);
    dates.shift();
  }

  if (
    dates[1] === ''
    || dates[0] === ''
  ) {
    if (regularFormat) {
      $openExpand.attr('data-date', cellDate);

      $('.js-datepicker__value', $openExpand).text(
        cellDate.split('-').reverse().join('.'),
      );
    } else {
      $expandArrival.attr('data-date', cellDate);
      $valueArrival.text(
        cellDate.split('-').reverse().join('.'),
      );
    }

    const date = new Date(cellDate);

    $valueFilter.text(
      `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`,
    );
  } else {
    let arrival;
    let departure;

    if (dates[0] > dates[1]) {
      [departure, arrival] = dates;
    } else {
      [arrival, departure] = dates;
    }

    const dateArrival = new Date(arrival);
    const dateDeparture = new Date(departure);

    $expandArrival.attr('data-date', arrival);
    $valueArrival.text(
      arrival.split('-').reverse().join('.'),
    );

    $expandDeparture.attr('data-date', departure);
    $valueDeparture.text(
      departure.split('-').reverse().join('.'),
    );

    $valueFilter.text(
      `${dateArrival.getDate()} ${SHORT_MONTHS[dateArrival.getMonth()]} - ${dateDeparture.getDate()} ${SHORT_MONTHS[dateDeparture.getMonth()]}`,
    );
  }

  if (regularFormat) {
    if ($expandArrival.attr('data-date') === cellDate) {
      $expandDeparture.addClass('js-datepicker__expand_open datepicker__expand_open');
      $expandArrival.removeClass('js-datepicker__expand_open datepicker__expand_open');
    } else {
      $expandDeparture.removeClass('js-datepicker__expand_open datepicker__expand_open');
      $expandArrival.addClass('js-datepicker__expand_open datepicker__expand_open');
    }
  }

  event.data.datepicker.updateCalendar();
}

class Datepicker {
  #weeks = 1;

  #$back;

  #$monthYear;

  #$clear;

  #$confirm;

  #$calendar;

  constructor(datepicker) {
    this.$datepicker = $(datepicker);
  }

  init() {
    this.timeFocus = 0;

    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.calendarMonth = new Date(now.getFullYear(), now.getMonth());

    this.dates = ['', ''];

    this.$arrival = $('.js-datepicker__input_date_arrival', this.$datepicker);
    this.$departure = $('.js-datepicker__input_date_departure', this.$datepicker);

    const zIndex = 2 * this.$datepicker.data('z-index') - 1;
    const name = this.$datepicker.data('name');

    this.$down = $('.js-datepicker__down', this.$datepicker)
      .css({
        'z-index': zIndex,
      })
      .on(
        `mousedown.datepicker__down.${name}`,
        null,
        { datepicker: this },
        handleDownMousedown,
      )
      .on(
        `mouseup.datepicker__down.${name} mouseout.datepicker__down.${name}`,
        null,
        { datepicker: this },
        handleDownMouseup,
      )
      .on(
        `mousedown.datepicker__button.${name}`,
        '.js-datepicker__button',
        { datepicker: this },
        handleButtonMousedown,
      );

    this.$datepicker
      .on(
        `focusin.datepicker__expand.${name}`,
        '.js-datepicker__expand',
        { datepicker: this },
        handleExpandFocusin,
      )
      .on(
        `focusout.datepicker__expand.${name}`,
        '.js-datepicker__expand',
        { datepicker: this },
        handleExpandFocusout,
      );

    $('.js-datepicker__expand', this.$datepicker)
      .on(
        `mousedown.datepicker__expand.${name}`,
        null,
        { datepicker: this },
        handleExpandMousedown,
      );

    this.$expandArrival = $('.js-datepicker__expand_date_arrival', this.$datepicker)
      .on(
        `keydown.datepicker__expand_date_arrival.${name}`,
        null,
        { datepicker: this },
        handleExpandKeydown,
      );

    this.$valueArrival = $('.js-datepicker__value', this.$expandArrival);
    this.$expandDeparture = $('.js-datepicker__expand_date_departure', this.$datepicker);
    this.$valueDeparture = $('.js-datepicker__value', this.$expandDeparture);
    this.$expandFilter = $('.js-datepicker__expand_format_filter', this.$datepicker);
    this.$valueFilter = $('.js-datepicker__value', this.$expandFilter);
    this.#$back = $('.js-datepicker__button_action_month-minus', this.$down);
    this.#$monthYear = $('.js-datepicker__month-year', this.$down);
    this.#$clear = $('.js-datepicker__button_action_clear', this.$down);
    this.#$confirm = $('.js-datepicker__button_action_confirm', this.$down);
    this.#$calendar = $('.js-datepicker__calendar', this.$down)
      .on(
        `mousedown.datepicker__cell.${name}`,
        '.js-datepicker__cell',
        { datepicker: this },
        handleCellMousedown,
      );

    this.updateCalendar();
  }

  open() {
    const openHeight = EMPTY_CALENDAR_HEIGHT + this.#weeks * parseInt($('td', this.#$calendar).css('height'), 10);

    this.$down.css({
      height: `${openHeight}px`,
      border: '1px solid rgba(31, 32, 65, 0.25)',
      transition: `height ${DURATION_OPEN}ms, border ${DURATION_OPEN}ms`,
    });
  }

  close() {
    this.$expandArrival.removeClass('js-datepicker__expand_open datepicker__expand_open');
    this.$expandDeparture.removeClass('js-datepicker__expand_open datepicker__expand_open');
    this.$expandFilter.removeClass('js-datepicker__expand_open datepicker__expand_open');

    this.$down.css({
      height: '0px',
      border: '0px solid rgba(31, 32, 65, 0)',
      transition: `height ${DURATION_OPEN}ms, border ${DURATION_OPEN}ms`,
    });
  }

  setTimeFocus(time) {
    this.timeFocus = time;
  }

  isRollbackable() {
    return !((
      this.dates[0] === this.$arrival.val()
      && this.dates[1] === this.$departure.val()
    ) || (
      this.dates[1] === this.$arrival.val()
      && this.dates[0] === this.$departure.val()
    ));
  }

  rollback() {
    let arrival = this.$arrival.val();
    const departure = this.$departure.val();

    this.$expandArrival.attr('data-date', arrival);
    this.$expandDeparture.attr('data-date', departure);

    if (arrival) {
      this.$valueArrival.text(arrival.split('-').reverse().join('.'));
    } else {
      this.$valueArrival.text('ДД.ММ.ГГГГ');
    }
    if (departure) {
      this.$valueDeparture.text(departure.split('-').reverse().join('.'));
    } else {
      this.$valueDeparture.text('ДД.ММ.ГГГГ');
    }

    this.dates[0] = arrival;
    this.dates[1] = departure;

    if (
      arrival === ''
      && departure === ''
    ) {
      this.$valueFilter.text('Укажите даты пребывания');
    } else if (
      arrival !== ''
      && departure !== ''
    ) {
      const dateArrival = new Date(arrival);
      const dateDeparture = new Date(departure);

      this.$valueFilter.text(
        `${dateArrival.getDate()} ${SHORT_MONTHS[dateArrival.getMonth()]} - ${dateDeparture.getDate()} ${SHORT_MONTHS[dateDeparture.getMonth()]}`,
      );
    } else {
      arrival = `${arrival}${departure}`;
      const date = new Date(arrival);

      this.$valueFilter.text(
        `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`,
      );

      this.dates[0] = '';
      this.dates[1] = arrival;
    }

    this.updateCalendar();
  }

  isOpen() {
    return $('.js-datepicker__expand_open', this.$datepicker).length > 0
      || this.$datepicker.hasClass('datepicker_format_demo');
  }

  updateCalendar() {
    if (
      this.today.getMonth() === this.calendarMonth.getMonth()
      && this.today.getFullYear() === this.calendarMonth.getFullYear()
    ) {
      this.#$back.prop('disabled', true);
    } else {
      this.#$back.prop('disabled', false);
    }

    this.#$monthYear.text(`${MONTHS[this.calendarMonth.getMonth()]} ${this.calendarMonth.getFullYear()}`);

    const cycleDate = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth());

    // 0 - понедельник, 1 - вторник, 2 - среда...
    const dayOfWeek = cycleDate.getDay() ? cycleDate.getDay() - 1 : 6;
    cycleDate.setDate(cycleDate.getDate() - dayOfWeek);

    const period = !!this.dates[0] && !!this.dates[1];

    let arrival = new Date(this.dates[0]);
    let departure = new Date(this.dates[1]);

    arrival.setHours(0, 0, 0);
    departure.setHours(0, 0, 0);

    if (period) {
      if (arrival > departure) {
        [arrival, departure] = [departure, arrival];
      }
    }

    this.#weeks = 1;

    let calendarHTML = CALENDAR_HEAD;

    do {
      this.#weeks += 1;

      calendarHTML += '<tr class="datepicker__row">';

      for (let i = 0; i < 7; i += 1) {
        let cellClasses = '';
        let cellPeriod = '';

        if (
          cycleDate.getTime() === arrival.getTime()
          || cycleDate.getTime() === departure.getTime()
        ) {
          cellClasses += ' datepicker__cell_selected';
        } else if (cycleDate.getTime() === this.today.getTime()) {
          cellClasses += ' datepicker__cell_date_today datepicker__cell_clickable';
        } else if (cycleDate > this.today) {
          cellClasses += ' datepicker__cell_clickable';
        }

        if (cycleDate.getMonth() !== this.calendarMonth.getMonth()) {
          cellClasses += ' datepicker__cell_date_other-month';
        }

        if (period) {
          if (cycleDate.getTime() === arrival.getTime()) {
            if (i < 6) {
              cellPeriod = '<div class="datepicker__cell-period datepicker__cell-period_date_arrival"></div>';
            }
          } else if (cycleDate.getTime() === departure.getTime()) {
            if (i > 0) {
              cellPeriod = '<div class="datepicker__cell-period datepicker__cell-period_date_departure"></div>';
            }
          } else if (
            arrival < cycleDate
            && cycleDate < departure
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

    this.#$calendar.html(calendarHTML);

    if (this.isOpen()) {
      const openHeight = EMPTY_CALENDAR_HEIGHT + this.#weeks * parseInt($('td', this.#$calendar).css('height'), 10);

      this.$down.css({
        height: `${openHeight}px`,
        border: '1px solid rgba(31, 32, 65, 0.25)',
        transition: 'height 0ms, border 0ms',
      });
    }

    if (!!this.dates[0] || !!this.dates[1]) {
      this.#$clear.prop('disabled', false);
    } else {
      this.#$clear.prop('disabled', true);
    }

    if (this.isRollbackable()) {
      this.#$confirm.prop('disabled', false);
    } else {
      this.#$confirm.prop('disabled', true);
    }
  }
}

$('.js-datepicker').each((index, element) => {
  const datepicker = new Datepicker(element);
  datepicker.init();
});
