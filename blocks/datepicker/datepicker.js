let $ = require('jquery');

$('.datepicker').each((index, node) => {
  new datepicker(node);
})

export default function datepicker(node) {
  this.node = node;

  $('.datepicker-expand', this.node).on('mousedown', function() {
    $(this).toggleClass('datepicker-open');
  });

  $('.datepicker-expand', this.node).on('focusin', function() {
    $(this).addClass('datepicker-open');
  });

  $('.datepicker-expand', this.node).on('focusout', function() {
    $(this).removeClass('datepicker-open');
  });

  $('.datepicker-drop', this.node).on('mousedown', function() {
    if ($('.datepicker-expand', this).hasClass('datepicker-open')) {
      $(this).addClass('datepicker-open');
    } else {
      $(this).removeClass('datepicker-open');
    }
  });


  $('.datepicker-drop', this.node).on('focusin', function() {
    if ($('.datepicker-expand', this).hasClass('datepicker-open')) {
      $(this).addClass('datepicker-open');
    }
  });

  $('.datepicker-drop', this.node).on('focusout', function() {
    if ($('.datepicker-expand', this).hasClass('datepicker-open') == 0) {
      $(this).removeClass('datepicker-open');
    }
  });

  let date = new Date();
  let month = date.getMonth();

  date.setDate(1);

  let day = date.getDay() ? date.getDay() - 1 : 6;

  date.setDate(date.getDate() - day);

  let appendString = '';

  do {
    appendString += '<tr>';

    for (let i = 0; i < 7; ++i) {
      if (month != date.getMonth()) {
        appendString += "<td class='other-month'>" + date.getDate() + "</td>";
      } else {
        appendString += "<td>" + date.getDate() + "</td>";
      }
      date.setDate(date.getDate() + 1);
    }

    appendString += '</tr>';

  } while (month == date.getMonth());

  $('.datepicker-table', this.node).append(appendString);
}
