let $ = require('jquery');

$('.datepicker').each((index, node) => {
  new datepicker(node);
})

export default function datepicker(node) {
  this.node = node;

  this.timeSetFocus = {
    timeSetFocus: 0
  };

  const timeWithoutClick = 50;
  // const durationOpen = '0.5s';

  $('.datepicker-expand', this.node).on('mousedown', {time: this.timeSetFocus}, expandMousedown);
  function expandMousedown(event) {
    let time = Date.now() - event.data.time.timeSetFocus;
    if (time < timeWithoutClick) {
      console.log('ЭКСПАНД: Отмена щелчка; Разница времени: ' + time);
      return;
    }

    $(this).toggleClass('datepicker-open');
    console.log('ЭКСПАНД: Класс переключен; Разница времени: ' + time);
  }

  $('.datepicker-expand', this.node).on('focusin', {time: this.timeSetFocus}, expandFocusin);
  function expandFocusin(event) {
    event.data.time.timeSetFocus = Date.now();

    console.log('ЭКСПАНД В ФОКУСЕ; Время получения фокуса: ' + event.data.time.timeSetFocus);

    $(this).addClass('datepicker-open');
  }

  $('.datepicker-expand', this.node).on('focusout', function() {
    if ($(this).hasClass('keep-focus')) {
      $(this).removeClass('keep-focus');
      console.log('Экспанд ОСТАЛСЯ ОТКРЫТЫМ');
      return;
    }
    $(this).removeClass('datepicker-open');
    console.log('Экспанд ЗАКРЫТ');
  });


  $('.datepicker-drop', this.node).on('mousedown', {time: this.timeSetFocus}, dropMousedown);
  function dropMousedown(event) {
    let time = Date.now() - event.data.time.timeSetFocus;
    if (time < timeWithoutClick) {
      console.log('ДРОП: Отмена щелчка; Разница времени: ' + time);
      return;
    }

    if ($('.datepicker-expand', this).hasClass('datepicker-open')) {
      $(this).addClass('datepicker-open');
    } else {
      $(this).removeClass('datepicker-open');
    }

    console.log('ДРОП: Класс переключен; Разница времени: ' + time);
  }


  $('.datepicker-drop', this.node).on('focusin', {time: this.timeSetFocus}, dropFocusin);
  function dropFocusin(event) {
    event.data.time.timeSetFocus = Date.now();
    console.log('ДРОП В ФОКУСЕ');

    if ($('.datepicker-expand', this).hasClass('datepicker-open')) {
      $(this).addClass('datepicker-open');
    }
  }

  $('.datepicker-drop', this.node).on('focusout', function() {
    if ($(this).hasClass('keep-focus')) {
      $(this).removeClass('keep-focus');
      console.log('ДРОП ОСТАЛСЯ ОТКРЫТЫМ');
      return;
    }
    if ($('.datepicker-expand', this).hasClass('datepicker-open') == 0) {
      $(this).removeClass('datepicker-open');
      console.log('ДРОП ЗАКРЫТ');
    }
  });

  $('.datepicker-forth', this.node).on('mousedown', () => {
    this.date.setMonth(this.date.getMonth() + 1);
    this.writeCalendar();

    $('.datepicker-back', this.node).prop('disabled', false);

    $('.datepicker-drop', this.node).addClass('keep-focus');
    $('.datepicker-expand.datepicker-open', this.node).addClass('keep-focus');
  });

  $('.datepicker-forth', this.node).on('focus', () => {
    $('.datepicker-expand.datepicker-open', this.node).focus();
  });

  $('.datepicker-back', this.node).on('mousedown', () => {
    this.date.setMonth(this.date.getMonth() - 1);
    this.writeCalendar();

    $('.datepicker-drop', this.node).addClass('keep-focus');
    $('.datepicker-expand.datepicker-open', this.node).addClass('keep-focus');
  });

  $('.datepicker-back', this.node).on('focus', () => {
    $('.datepicker-expand.datepicker-open', this.node).focus();
    if (this.date.getMonth() == this.today.getMonth() && this.date.getFullYear() == this.today.getFullYear()) {
      $('.datepicker-back', this.node).prop('disabled', true);
    }
  });

  $('table', this.node).on('mouseover', 'td', {parent: this}, tableMouseover);
  function tableMouseover(event) {
    // let date = new Date(Date.parse($(this).attr('data-date')));
    // console.log(date + ' ' + event.data.parent.today);
    if (event.data.parent.today.getTime() <= Date.parse($(this).attr('data-date'))) {
      $(this).addClass('highlight');
    }
  }

  $('table', this.node).on('mouseout', 'td', {parent: this}, tableMouseout);
  function tableMouseout(event) {
    // console.log($(this).attr('data-date'));
    // let date = Date.parse($(this).attr('data-date'));
/*
    if (event.data.parent.date.getTime() >= Date.parse($(this).attr('data-date'))) {
      $( this ).addClass('highlight');
    }
*/
    $(this).removeClass('highlight');
  }

  /*
  $('table', this.node).on('mouseover', 'td', function() {
    $( this ).addClass('highlight');
  });

  $('table', this.node).on('mouseout', 'td', function() {
    $( this ).removeClass('highlight');
  });
*/

  this.writeCalendar = function() {
    let months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

    let date = new Date(this.date.getTime());

    let month = date.getMonth();

    $('.datepicker-month-value', this.node).text(months[month] + ' ' + date.getFullYear());

    date.setDate(1);
    let day = date.getDay() ? date.getDay() - 1 : 6;
    date.setDate(date.getDate() - day);

    let innerTable = '<tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>';

    // let numberString = 0;

    do {
      innerTable += '<tr>';

      for (let i = 0; i < 7; ++i) {
        let dataDate = "data-date='" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "'";
        if (month != date.getMonth()) {
          innerTable += "<td class='other-month' " + dataDate + ">" + date.getDate() + "</td>";
        } else {
          innerTable += "<td "+ dataDate + ">" + date.getDate() + "</td>";
        }
        date.setDate(date.getDate() + 1);
      }

      innerTable += '</tr>';
      // ++numberString;

    } while (month == date.getMonth());


/*
    if (numberString > 5) {
      $('.datepicker-down', this.node).css('transition-duration', '0s');
      $('.datepicker-drop.datepicker-open ~ .datepicker-down', this.node).css('height', '409px');
      // $('.datepicker-down', this.node).css('height', '409px');
      $('.datepicker-down', this.node).css('transition-duration', durationOpen);
      $('.datepicker-calendar', this.node).css('height', '320px');
    } else {
      $('.datepicker-calendar', this.node).css('height', '280px');
      $('.datepicker-down', this.node).css('transition-duration', '0s');
      $('.datepicker-drop.datepicker-open ~ .datepicker-down', this.node).css('height', '369px');
      // $('.datepicker-down', this.node).css('height', '369px');
      $('.datepicker-down', this.node).css('transition-duration', durationOpen);
    }
*/

    $('.datepicker-table', this.node).html(innerTable);
  }


  let now = new Date();
  this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  this.writeCalendar();
}
