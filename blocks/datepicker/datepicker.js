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
}
