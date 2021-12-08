import $ from 'jquery';

// minimum interval between getting focus and clicking the mouse 50 milliseconds
const INTERVAL = 50;

const EMPTY_CALENDAR_HEIGHT = 129;
const ROW_CALENDAR_HEIGHT = 40;

const DURATION_OPEN = 500;

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

function handleExpandMousedown(event) {
  if ($(event.delegateTarget).hasClass('js-datepicker__expand_arrival')) {
    event.data.datepicker.setActiveDate('arrival');
    // console.log('SET ARRIVAL');
  } else {
    event.data.datepicker.setActiveDate('departure');
    // console.log('SET DEPARTURE');
  }

  if (Math.abs(event.timeStamp - event.data.datepicker.timeFocus) < INTERVAL) {
    // console.log('ОТМЕНА ЩЕЛЧКА');
    return;
  }

  $(event.delegateTarget).toggleClass('datepicker__expand_open');
  // console.log('TOGGLE');
}

function handleExpandFocusin(event) {
  $(event.delegateTarget).removeClass('datepicker__expand_keeping-focus');
  // console.log('ПРЕДОХРАНИТЕЛЬ УДАЛЁН');

  event.data.datepicker.setTimeFocus(event.timeStamp);

  $(event.delegateTarget).addClass('datepicker__expand_open');
  // console.log(`${$(event.delegateTarget).attr('class')} ЭКСПАНД ПОЛУЧАЕТ ФОКУС`);
}

function handleExpandFocusout(event) {
  // console.log('произошёл фокусоут');
  if ($(event.delegateTarget).hasClass('datepicker__expand_keeping-focus')) {
    $(event.delegateTarget).removeClass('datepicker__expand_keeping-focus');
    // console.log(
    // `${$(event.delegateTarget).attr('class')} ЭКСПАНД ТЕРЯЕТ ФОКУС но остаётся открытым`
    // );
    return;
  }

  $(event.delegateTarget).removeClass('datepicker__expand_open');
  // console.log(`${$(event.delegateTarget).attr('class')} ЭКСПАНД ТЕРЯЕТ ФОКУС`);
}

function handleMousedown(event) {
  if (event.data.datepicker.$datepicker.hasClass('datepicker_open')) {
    if (
      event.data.datepicker.activeDate === 'arrival'
      && event.data.datepicker.$datepicker__expand_arrival.hasClass('datepicker__expand_open')
    ) {
      event.data.datepicker.$datepicker__expand_arrival.addClass('datepicker__expand_keeping-focus');
      // console.log('ARRIVAL ставим предохранитель');
    } else if (
      event.data.datepicker.activeDate === 'departure'
      && event.data.datepicker.$datepicker__expand_departure.hasClass('datepicker__expand_open')
    ) {
      event.data.datepicker.$datepicker__expand_departure.addClass('datepicker__expand_keeping-focus');
      // console.log('DEPARTURE ставим предохранитель');
    }
  }

  // const dateArrival = new Date(event.data.datepicker.$datepicker__input_arrival.val());
  // console.log(dateArrival.getMonth());
  // console.log(event.data.datepicker.$datepicker__input_arrival.val());

  if (event.data.datepicker.$datepicker__expands.hasClass('datepicker__expand_open')) {
    event.data.datepicker.open();
  } else {
    event.data.datepicker.close();
  }
}

function handleFocusin(event) {
  event.data.datepicker.open();
}

function handleFocusout(event) {
  /*
  if (
    event.data.datepicker.activeDate === 'arrival'
    && event.data.datepicker.$datepicker__expand_arrival.hasClass('datepicker__expand_open')
  ) {
    console.log('ФОКУС БУДЕТ ПЕРЕДАН АРРИВАЛУ');
    event.data.datepicker.$datepicker__expand_arrival.trigger('focus');
    console.log('ФОКУС ПЕРЕДАЛ АРРИВАЛУ');
  } else if (
    event.data.datepicker.activeDate === 'departure'
    && event.data.datepicker.$datepicker__expand_departure.hasClass('datepicker__expand_open')
  ) {
    console.log('ФОКУС БУДЕТ ПЕРЕДАН ДЕПАРТУРЕ');
    event.data.datepicker.$datepicker__expand_departure.trigger('focus');
    console.log('ФОКУС ПЕРЕДАЛ ДЕПАРТУРЕ');
  }
  */
  if (!(event.data.datepicker.$datepicker__expands.hasClass('datepicker__expand_open'))) {
    event.data.datepicker.close();
  } else if (
    event.data.datepicker.activeDate === 'arrival'
    && event.data.datepicker.$datepicker__expand_arrival.hasClass('datepicker__expand_open')
  ) {
    event.data.datepicker.$datepicker__expand_arrival.trigger('focus');
  } else if (
    event.data.datepicker.activeDate === 'departure'
    && event.data.datepicker.$datepicker__expand_departure.hasClass('datepicker__expand_open')
  ) {
    event.data.datepicker.$datepicker__expand_departure.trigger('focus');
  }
}

class Datepicker {
  constructor(datepicker) {
    this.$datepicker = $(datepicker);
    this.$datepicker__input_arrival = $('.js-datepicker__input_arrival', this.$datepicker);
    this.$datepicker__input_departure = $('.js-datepicker__input_departure', this.$datepicker);
    this.$datepicker__drop = $('.js-datepicker__drop', this.$datepicker);
    this.$datepicker__down = $('.js-datepicker__down', this.$datepicker);
    this.$datepicker__expands = $('.js-datepicker__expand', this.$datepicker__drop);
    this.$datepicker__expand_arrival = $('.js-datepicker__expand_arrival', this.$datepicker__drop);
    this.$datepicker__expand_departure = $('.js-datepicker__expand_departure', this.$datepicker__drop);
    this.$datepicker__monthYear = $('.js-datepicker__month-year', this.$datepicker__down);
    this.$datepicker__calendar = $('.js-datepicker__calendar', this.$datepicker__down);

    this.name = datepicker.dataset.name;
    this.zIndex = 2 * datepicker.dataset.zIndex - 1;

    // this.calendarHTML = '';
    this.calendarHeight = EMPTY_CALENDAR_HEIGHT;

    this.timeFocus = 0;

    this.activeDate = 'both';

    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.todayMonth = new Date(now.getFullYear(), now.getMonth());
    this.calendarMonth = new Date(now.getFullYear(), now.getMonth());
  }

  init() {
    this.$datepicker__monthYear.text(`${MONTHS[this.calendarMonth.getMonth()]} ${this.calendarMonth.getFullYear()}`);
    const calendarHTML = this.getCalendarHTMLandSetCalendarHeight();
    // this.setCalendarHeight();
    this.$datepicker__calendar.html(calendarHTML);

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

  open() {
    if (!(this.$datepicker.hasClass('datepicker_open'))) {
      this.$datepicker.addClass('datepicker_open');
      this.$datepicker__down.css({
        height: `${this.calendarHeight}px`,
        border: '1px solid rgba(31, 32, 65, 0.25)',
        transition: `height ${DURATION_OPEN}ms, border ${DURATION_OPEN}ms`,
        'z-index': this.zIndex,
      });
    }
  }

  close() {
    this.$datepicker.removeClass('datepicker_open');
    this.$datepicker__down.css({
      height: 0,
      border: '0px solid rgba(31, 32, 65, 0)',
      transition: `height ${DURATION_OPEN}ms, border ${DURATION_OPEN}ms`,
      'z-index': this.zIndex,
    });
  }

  setCalendarHeight() {
    this.$datepicker__down.css({
      height: `${this.calendarHeight}px`,
      border: '1px solid rgba(31, 32, 65, 0.25)',
      transition: `height 0, border ${DURATION_OPEN}ms`,
      'z-index': this.zIndex,
    });
  }

  getCalendarHTMLandSetCalendarHeight() {
    const calendarDate = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth());
    const arrivalDate = new Date(this.$datepicker__input_arrival.val());
    const departureDate = new Date(this.$datepicker__input_departure.val());

    // 0 - понедельник, 1 - вторник, 2 - среда...
    const dayOfWeek = calendarDate.getDay() ? calendarDate.getDay() - 1 : 6;
    calendarDate.setDate(calendarDate.getDate() - dayOfWeek);

    this.calendarHeight = EMPTY_CALENDAR_HEIGHT + ROW_CALENDAR_HEIGHT;

    let calendarHTML = '<tr class="datepicker__calendar-header"><th class="datepicker__cell">Пн</th><th class="datepicker__cell">Вт</th><th class="datepicker__cell">Ср</th><th class="datepicker__cell">Чт</th><th class="datepicker__cell">Пт</th><th class="datepicker__cell">Сб</th><th class="datepicker__cell">Вс</th></tr>';

    do {
      this.calendarHeight += ROW_CALENDAR_HEIGHT;

      calendarHTML += '<tr class="datepicker__row">';

      for (let i = 0; i < 7; i += 1) {
        let cellClasses = '';

        if (calendarDate.getTime() === arrivalDate.getTime()) {
          cellClasses += ' datepicker__cell_arrival';
        } else if (calendarDate.getTime() === departureDate.getTime()) {
          cellClasses += ' datepicker__cell_departure';
        }

        if (calendarDate.getMonth() !== this.calendarMonth.getMonth()) {
          cellClasses += ' datepicker__cell_other-month';
        }

        const zeroMonth = calendarDate.getMonth() < 9 ? '0' : '';
        const zeroDate = calendarDate.getDate() < 10 ? '0' : '';

        calendarHTML += `<td class="datepicker__cell${cellClasses}" data-date="${calendarDate.getFullYear()}-${zeroMonth}${calendarDate.getMonth() + 1}-${zeroDate}${calendarDate.getDate()}">${calendarDate.getDate()}</td>`;

        calendarDate.setDate(calendarDate.getDate() + 1);
      }

      calendarHTML += '</tr>';

    } while (calendarDate.getMonth() === this.calendarMonth.getMonth());

    return calendarHTML;
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
