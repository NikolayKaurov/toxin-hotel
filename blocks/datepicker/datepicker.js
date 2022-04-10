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
  $(event.target).addClass('datepicker__expand_open');

  event.data.datepicker.open();

  event.data.datepicker.setTimeFocus(event.timeStamp);
}

function handleExpandFocusout(event) {
  const { $datepicker } = event.data.datepicker;

  if ($datepicker.hasClass('datepicker_keeping-open')) {
    $datepicker.removeClass('datepicker_keeping-open');

    return;
  }

  $(event.target).removeClass('datepicker__expand_open');

  if ($('.datepicker__expand_open', $datepicker).length === 0) {
    event.data.datepicker.close();
  }
}

function handleExpandMousedown(event) {
  if (Math.abs(event.timeStamp - event.data.datepicker.timeFocus) < INTERVAL) {
    return;
  }

  const $expand = $(event.delegateTarget);

  if ($expand.hasClass('datepicker__expand_open')) {
    $expand.removeClass('datepicker__expand_open');
    event.data.datepicker.close();
  } else {
    $expand.addClass('datepicker__expand_open');
    event.data.datepicker.open();
  }
}

function handleExpandKeydown(event) {
  if (event.which === 9) {
    $('.js-datepicker__expand_date_departure', event.data.datepicker.$datepicker)
      .addClass(
        'datepicker__expand_open',
      );
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

    $('.datepicker__expand_open', $datepicker).trigger('focus');
  }
}

function handleButtonMousedown(event) {
  const $button = $(event.target);
  const month = event.data.datepicker.calendarMonth;

  if ($button.hasClass('datepicker__button_action_month-minus')) {
    month.setMonth(month.getMonth() - 1);
  } else if ($button.hasClass('datepicker__button_action_month-plus')) {
    month.setMonth(month.getMonth() + 1);
  }

  event.data.datepicker.updateCalendar();
}

class Datepicker {
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

    $('.js-datepicker__expand_date_arrival', this.$datepicker)
      .on(
        `keydown.datepicker__expand_arrival.${name}`,
        null,
        { datepicker: this },
        handleExpandKeydown,
      );

    this.$back = $('.js-datepicker__button_action_month-minus', this.$down);
    this.$monthYear = $('.js-datepicker__month-year', this.$down);
    this.$clear = $('.js-datepicker__button_action_clear', this.$down);
    this.$confirm = $('.js-datepicker__button_action_confirm', this.$down);
    this.$calendar = $('.js-datepicker__calendar', this.$down);

    this.updateCalendar();
  }

  open() {
    const openHeight = EMPTY_CALENDAR_HEIGHT + $('tr', this.$calendar).length * parseInt($('td', this.$calendar).css('height'), 10);

    this.$down.css({
      height: `${openHeight}px`,
      border: '1px solid rgba(31, 32, 65, 0.25)',
      transition: `height ${DURATION_OPEN}ms, border ${DURATION_OPEN}ms`,
    });
  }

  close() {
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

  isOpen() {
    return $('.datepicker__expand_open', this.$datepicker).length > 0
      || this.$datepicker.hasClass('datepicker_format_demo');
  }

  updateCalendar() {
    if (
      this.today.getMonth() === this.calendarMonth.getMonth()
      && this.today.getFullYear() === this.calendarMonth.getFullYear()
    ) {
      this.$back.prop('disabled', true);
    } else {
      this.$back.prop('disabled', false);
    }

    this.$monthYear.text(`${MONTHS[this.calendarMonth.getMonth()]} ${this.calendarMonth.getFullYear()}`);

    const cycleDate = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth());

    // 0 - понедельник, 1 - вторник, 2 - среда...
    const dayOfWeek = cycleDate.getDay() ? cycleDate.getDay() - 1 : 6;
    cycleDate.setDate(cycleDate.getDate() - dayOfWeek);

    const period = !!this.dates[0] && !!this.dates[1];

    let arrival = new Date(this.dates[0]);
    let departure = new Date(this.dates[1]);

    if (period) {
      if (arrival > departure) {
        [arrival, departure] = [departure, arrival];
      }
    }

    let weeks = 1;

    let calendarHTML = CALENDAR_HEAD;

    do {
      weeks += 1;

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
          cellClasses += ' datepicker__cell_date_today';
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

        calendarHTML += `<td class="datepicker__cell${cellClasses}" data-date="${cycleDate.getFullYear()}-${zeroMonth}${cycleDate.getMonth() + 1}-${zeroDate}${cycleDate.getDate()}">${cycleDate.getDate()}${cellPeriod}</td>`;

        cycleDate.setDate(cycleDate.getDate() + 1);
      }
      calendarHTML += '</tr>';
    } while (cycleDate.getMonth() === this.calendarMonth.getMonth());

    this.$calendar.html(calendarHTML);

    if (this.isOpen()) {
      const openHeight = EMPTY_CALENDAR_HEIGHT + weeks * parseInt($('td', this.$calendar).css('height'), 10);

      this.$down.css({
        height: `${openHeight}px`,
        border: '1px solid rgba(31, 32, 65, 0.25)',
        transition: 'height 0ms, border 0ms',
      });
    }

    if (!!this.dates[0] || !!this.dates[1]) {
      this.$clear.prop('disabled', false);
    } else {
      this.$clear.prop('disabled', true);
    }

    if (this.isRollbackable()) {
      this.$confirm.prop('disabled', false);
    } else {
      this.$confirm.prop('disabled', true);
    }
  }
}

$('.js-datepicker').each((index, element) => {
  const datepicker = new Datepicker(element);
  datepicker.init();
});
