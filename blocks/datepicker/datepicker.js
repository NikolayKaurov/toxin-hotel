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

  this.dateArrival = 0;
  this.dateDeparture = 0;

  $('.datepicker-expand', this.node).on('mousedown', null, {time: this.timeSetFocus}, expandMousedown);
  function expandMousedown(event) {
    let time = Date.now() - event.data.time.timeSetFocus;
    if (time < timeWithoutClick) {
      console.log('ЭКСПАНД: Отмена щелчка; Разница времени: ' + time);
      return;
    }

    $(event.delegateTarget).toggleClass('datepicker-open');
    console.log('ЭКСПАНД: Класс переключен; Разница времени: ' + time);
  }

  $('.datepicker-expand', this.node).on('focusin', null, {time: this.timeSetFocus}, expandFocusin);
  function expandFocusin(event) {
    event.data.time.timeSetFocus = Date.now();

    console.log('ЭКСПАНД В ФОКУСЕ; Время получения фокуса: ' + event.data.time.timeSetFocus);

    $(event.delegateTarget).addClass('datepicker-open');
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


  $('.datepicker-drop', this.node).on('mousedown', null, {time: this.timeSetFocus}, dropMousedown);
  function dropMousedown(event) {
    let time = Date.now() - event.data.time.timeSetFocus;
    if (time < timeWithoutClick) {
      console.log('ДРОП: Отмена щелчка; Разница времени: ' + time);
      return;
    }

    if ($('.datepicker-expand', event.delegateTarget).hasClass('datepicker-open')) {
      $(event.delegateTarget).addClass('datepicker-open');
    } else {
      $(event.delegateTarget).removeClass('datepicker-open');
    }

    console.log('ДРОП: Класс переключен; Разница времени: ' + time);
  }


  $('.datepicker-drop', this.node).on('focusin', null, {time: this.timeSetFocus}, dropFocusin);
  function dropFocusin(event) {
    event.data.time.timeSetFocus = Date.now();
    console.log('ДРОП В ФОКУСЕ');

    if ($('.datepicker-expand', event.delegateTarget).hasClass('datepicker-open')) {
      $(event.delegateTarget).addClass('datepicker-open');
    }
  }

  $('.datepicker-drop', this.node).on('focusout', function() {
    if ($(this).hasClass('keep-focus')) {
      $(this).removeClass('keep-focus');
      console.log('ДРОП ОСТАЛСЯ ОТКРЫТЫМ');
      return;
    }
    if ($('.datepicker-expand', this).hasClass('datepicker-open') === false) {
      $(this).removeClass('datepicker-open');
      console.log('ДРОП ЗАКРЫТ');
    }
  });

  $('.datepicker-forth', this.node).on('mousedown', () => {
    this.date.setMonth(this.date.getMonth() + 1);
    this.writeCalendar();
    this.paintResidence();

    $('.datepicker-back', this.node).prop('disabled', false);

    $('.datepicker-reset', this.node).prop('disabled', false);

    $('.datepicker-drop', this.node).addClass('keep-focus');
    $('.datepicker-expand.datepicker-open', this.node).addClass('keep-focus');
  });

  $('.datepicker-forth', this.node).on('focus', () => {
    $('.datepicker-expand.datepicker-open', this.node).trigger('focus');
  });

  $('.datepicker-back', this.node).on('mousedown', () => {
    this.date.setMonth(this.date.getMonth() - 1);
    this.writeCalendar();
    this.paintResidence();

    $('.datepicker-drop', this.node).addClass('keep-focus');
    $('.datepicker-expand.datepicker-open', this.node).addClass('keep-focus');
  });

  $('.datepicker-back', this.node).on('focus', () => {
    $('.datepicker-expand.datepicker-open', this.node).trigger('focus');
    if (this.date.getMonth() === this.today.getMonth() && this.date.getFullYear() === this.today.getFullYear()) {
      $('.datepicker-back', this.node).prop('disabled', true);

      if (this.dateArrival || this.dateDeparture) return;
      $('.datepicker-reset', this.node).prop('disabled', true);
    }
  });

  $('.datepicker-reset', this.node).on('mousedown', () => {
    $('.date-arrival', this.node).val('');
    $('.date-departure', this.node).val('');
    this.dateArrival = 0;
    this.dateDeparture = 0;

    $('.datepicker-value', $('.datepicker-expand.datepicker-arrival', this.node)).text('ДД.ММ.ГГГГ');
    $('.datepicker-value', $('.datepicker-expand.datepicker-departure', this.node)).text('ДД.ММ.ГГГГ');

/*
    $('.selected.departure', this.node).removeClass('selected departure');
    $('.selected.arrival', this.node).removeClass('selected arrival');
*/

    this.date.setFullYear(this.today.getFullYear(), this.today.getMonth());
    this.writeCalendar();

    $('.datepicker-reset', this.node).prop('disabled', true);

    $('.datepicker-drop', this.node).addClass('keep-focus');
    $('.datepicker-expand.datepicker-open', this.node).addClass('keep-focus');
  })

  $('.datepicker-reset', this.node).on('focus', () => {
    $('.datepicker-expand.datepicker-open', this.node).trigger('focus');
  })

  $('table', this.node).on('mouseover', 'td', {parent: this}, tableMouseover);
  function tableMouseover(event) {
    if ($(event.target).hasClass('selected')) return;

    let date = new Date($(event.target).attr('data-date'));
    date.setHours(0,0,0);

    if ($('.datepicker-expand.datepicker-open', event.data.parent.node).hasClass('datepicker-arrival')) {
      if (event.data.parent.dateDeparture) {
        if (event.data.parent.today.getTime() <= date.getTime() && date.getTime() < event.data.parent.dateDeparture) {
          $(event.target).addClass('highlight');
        }
      } else {
        if (event.data.parent.today.getTime() <= date.getTime()) {
          $(event.target).addClass('highlight');
        }
      }
    } else {
      if (event.data.parent.dateArrival) {
        if (date.getTime() > event.data.parent.dateArrival) {
          $(event.target).addClass('highlight');
        }
      } else {
        if (event.data.parent.today.getTime() < date.getTime()) {
          $(event.target).addClass('highlight');
        }
      }
    }
  }

  $('table', this.node).on('mousedown', 'td', {parent: this}, tableMousedown);
  function tableMousedown(event) {
    let date = new Date($(event.target).attr('data-date'));
    date.setHours(0,0,0);

    let _ = $(event.target).attr('data-date');
    let dateString = _[8] + _[9] + '.' + _[5] + _[6] + '.' + _[0] + _[1] + _[2] + _[3];

    if ($('.datepicker-expand.datepicker-open', event.data.parent.node).hasClass('datepicker-arrival')) {
      if ($(event.target).hasClass('highlight')) {
        $('.date-arrival', event.data.parent.node).val($(event.target).attr('data-date'));
        event.data.parent.dateArrival = date.getTime();

        $('.datepicker-value', $('.datepicker-expand.datepicker-arrival', event.data.parent.node)).text(dateString);

        $('.datepicker-reset', event.data.parent.node).prop('disabled', false);

        // $('.residence', $('.selected.arrival', event.data.parent.node)).remove();
        if ($('.selected.arrival', event.data.parent.node).hasClass('other-month')) {
          $('.selected.arrival', event.data.parent.node).removeClass('selected arrival');
        } else {
          $('.selected.arrival', event.data.parent.node).removeAttr('class');
        }

        $(event.target).removeClass('highlight');
        $(event.target).addClass('selected arrival');

        // if (this.cellIndex < 6) $(this).append('<div class="residence"></div>');

        event.data.parent.paintResidence();

      }
    } else {
        if ($(event.target).hasClass('highlight')) {
          $('.date-departure', event.data.parent.node).val($(event.target).attr('data-date'));
          event.data.parent.dateDeparture = date.getTime();

          $('.datepicker-value', $('.datepicker-expand.datepicker-departure', event.data.parent.node)).text(dateString);

          $('.datepicker-reset', event.data.parent.node).prop('disabled', false);

          // $('.residence', $('.selected.departure', event.data.parent.node)).remove();
          if ($('.selected.departure', event.data.parent.node).hasClass('other-month')) {
            $('.selected.departure', event.data.parent.node).removeClass('selected departure');
          } else {
            $('.selected.departure', event.data.parent.node).removeAttr('class');
          }

          $(event.target).removeClass('highlight');
          $(event.target).addClass('selected departure');

          // if (this.cellIndex > 0) $(this).append('<div class="residence"></div>');

          event.data.parent.paintResidence();
        }
    }

    console.log($(event.target).index());
  }

  $('table', this.node).on('mouseout', 'td', {parent: this}, tableMouseout);
  function tableMouseout(event) {
    if ($(event.target).hasClass('selected')) return;
    if ($(event.target).hasClass('other-month')) {
      $(event.target).removeClass('highlight');
    } else {
      $(event.target).removeAttr('class');
    }
  }

  $('.datepicker-down', this.node).on('mousedown', () => {
    $('.datepicker-drop', this.node).addClass('keep-focus');
    $('.datepicker-expand.datepicker-open', this.node).addClass('keep-focus');
  })

  $('.datepicker-down', this.node).on('focus', () => {
    $('.datepicker-expand.datepicker-open', this.node).trigger("focus");
  })

  this.writeCalendar = function() {
    let months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

    let date = new Date(this.date.getTime());

    let month = date.getMonth();

    $('.datepicker-month-value', this.node).text(months[month] + ' ' + date.getFullYear());

    date.setDate(1);
    let day = date.getDay() ? date.getDay() - 1 : 6;
    date.setDate(date.getDate() - day);

    let innerTable = '<tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>';

    do {
      innerTable += '<tr>';

      for (let i = 0; i < 7; ++i) {

        let classes = '';
        if (month !== date.getMonth()) classes += 'other-month';
        if (date.getTime() === this.dateArrival) {
          classes += ' selected arrival';
        } else {
          if (date.getTime() === this.dateDeparture) {
            classes += ' selected departure';
          }
        }
        if (classes) classes = "class='" + classes + "'";

        let zeroMonth = date.getMonth() < 9 ? '0' : '';
        let zeroDate = date.getDate() < 10 ? '0' : '';
        let dataDate = "data-date='" + date.getFullYear() + "-" + zeroMonth + (date.getMonth() + 1) + "-" + zeroDate + date.getDate() + "'";

        innerTable += "<td " + classes + " " + dataDate + ">" + date.getDate() + "</td>";

        date.setDate(date.getDate() + 1);
      }

      innerTable += '</tr>';

    } while (month === date.getMonth());

    $('.datepicker-table', this.node).html(innerTable);
  }

  this.paintResidence = function() {
    if (!(this.dateArrival && this.dateDeparture)) return;

    let dateArrival = this.dateArrival;
    let dateDeparture = this.dateDeparture;

    $('td', this.node).each(function(index, element) {

      let date = new Date($(element).attr('data-date'));
      date.setHours(0,0,0);

      // if ($('.residence', $(element)).length) console.log(element.cellIndex + ' ' + 'ЕСТЬ ВЫДЕЛЕНИЕ');

      if ($('.residence', $(element)).length === 0) {
        if (($(element).hasClass('selected arrival') && element.cellIndex < 6) ||
          ($(element).hasClass('selected departure') && element.cellIndex > 0) ||
          (dateArrival < date.getTime() && date.getTime() < dateDeparture && element.cellIndex < 6 && element.cellIndex > 0)) {
            $(element).append('<div class="residence"></div>');
        } else {
          if (dateArrival < date.getTime() && date.getTime() < dateDeparture) {
            if (element.cellIndex === 0) {
              $(element).append('<div class="residence left"></div>');
            } else {
              if (element.cellIndex === 6) {
                $(element).append('<div class="residence right"></div>');
              }
            }
          }
        }
      } else {
        if (($(element).hasClass('selected') === false) &&
          (dateArrival > date.getTime() || date.getTime() > dateDeparture)) {
          $('.residence', $(element)).remove();
        } else {
          if (element.cellIndex === 0) {
            if ($(element).hasClass('selected arrival')) {
              $('.residence', $(element)).removeClass('left');
            } else {
              if ($(element).hasClass('selected departure')) {
                $('.residence', $(element)).remove();
              } else {
                $('.residence', $(element)).addClass('left');
              }
            }
          } else {
            if (element.cellIndex === 6) {
              if ($(element).hasClass('selected arrival')) {
                $('.residence', $(element)).remove();
              } else {
                if ($(element).hasClass('selected departure')) {
                  $('.residence', $(element)).removeClass('right');
                } else {
                  $('.residence', $(element)).addClass('right');
                }
              }
            }
          }
        }
      }
    })

  }


  let now = new Date();
  this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  this.date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  this.writeCalendar();
}
