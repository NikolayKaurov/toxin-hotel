const MAX = 99; // максимальное значение счётчика
// минимальное значение 0

let $ = require('jquery');

$('.js-dropdown__item').each(function() {
  new Dropdown__item(this);
})

function Dropdown__item(dropdown__item) {
  this.$dropdown__item = $(dropdown__item);

  this.dropdownName = dropdown__item.dataset.dropdownName;
  this.name = this.dropdownName + '-' + dropdown__item.dataset.itemName;
  this.$dropdown = $('.js-dropdown[data-dropdown-name="' + this.dropdownName + '"]');

  this.$dropdown__label =     $('.js-dropdown__label',      this.$dropdown__item);
  this.$dropdown__plus =      $('.js-dropdown__plus',       this.$dropdown__item);
  this.$dropdown__minus =     $('.js-dropdown__minus',      this.$dropdown__item);
  this.$dropdown__quantity =  $('.js-dropdown__quantity',   this.$dropdown__item);

  this.$dropdown__quantity.val(0);

  this.$dropdown__plus.on('mousedown.js-dropdown__plus.' + this.name,
                          null,
                          {$dropdown: this.$dropdown, $dropdown__quantity: this.$dropdown__quantity},
                          handlePlusMousedown);
  function handlePlusMousedown( event ) {
    event.data.$dropdown.addClass('dropdown_keeping-focus');

    event.data.$dropdown__quantity.val(parseInt(event.data.$dropdown__quantity.val()[0], 10) + 1);
  }

  this.$dropdown__plus.on('focus.js-dropdown__plus.' + this.name,
      null,
      {$dropdown: this.$dropdown},
      handlePlusFocus);
  function handlePlusFocus( event ) {
    event.data.$dropdown.trigger('focus');
  }

  // this.$dropdown__plus.on('mousedown', () => {
  //   this.$dropdown__quantity.val(this.value);
  // });



  // $(this.$dropdown__item).on('mousedown', () => {
  //   $(this.$dropdown).attr('data-test',this.name);
  //   console.log(this.dropdownName);
  // })
}