import dropdown_strings_room from './_strings_room/dropdown_strings_room';
import dropdown_strings_guest from './_strings_guest/dropdown_strings_guest';
import dropdown_reset from './_reset/dropdown_reset';
import dropdown_confirm from './_confirm/dropdown_confirm';

let $ = require('jquery');

$('.dropdown').each((index, node) => {
  new dropdown(node);
})

export default function dropdown(node) {

  const MAX = 99;
  const timeWithoutClick = 50;

  this.node = node;

  this.values = {
    item0: 0,
    item1: 0,
    item2: 0,
  };

  this.valuesConfirmed = {
    item0: 0,
    item1: 0,
    item2: 0,
  }

  this.keepFocus = false;

  this.inputs = {};

  this.timeSetFocus = 0;

  this.withConfirm = $(this.node).hasClass('dropdown_confirm');
  this.withReset = $(this.node).hasClass('dropdown_reset');

  this.confirmed = true;

  let stringsModifier = $(this.node).attr('class').match(/dropdown_strings_[a-z]([a-z0-9-]*[a-z0-9])?/i) || [];

  switch (stringsModifier[0]) {
    case 'dropdown_strings_guest':
      this.strings = dropdown_strings_guest;
      break;
    case 'dropdown_strings_room':
      this.strings = dropdown_strings_room;
      break;
    default:
      this.strings = function() {
        return {
          commonValueString: 'empty',
          itemStrings: {
            item0: 'empty',
            item1: 'empty',
            item2: 'empty'
          }
        }
      }
  }

  $(this.node).on('focus', () => {
    $(this.node).addClass('dropdown-open');
    this.timeSetFocus = Date.now();
    console.log('ОТКРЫТО');
  });

  $(this.node).on('blur', () => {
    console.log('BLUR dropdown: ' + this.keepFocus);
    if (this.keepFocus) {
      this.keepFocus = false;
      return;
    }

    $(this.node).removeClass('dropdown-open');
    console.log('ЗАКРЫТО');

    if (!this.confirmed) {
      for (let item in this.values) {
        this.values[item] = this.valuesConfirmed[item];
        this.inputs[item].val(this.values[item]);
      }

      this.confirmed = true;

      $('.dropdown-item', this.node).each( (index, element) => {
        console.log($('.dropdown-input', element).val());
        if ($('.dropdown-input', element).val() <= 0) {
          console.log('ОТКЛЮЧАЮ МИНУС');
          $('.dropdown-minus', element).prop('disabled', true);
          $('.dropdown-plus', element).prop('disabled', false);
        } else if ($('.dropdown-input', element).val() >= MAX) {
          console.log('ОТКЛЮЧАЮ ПЛЮС');
          $('.dropdown-minus', element).prop('disabled', false);
          $('.dropdown-plus', element).prop('disabled', true);
        } else {
          $('.dropdown-minus', element).prop('disabled', false);
          $('.dropdown-plus', element).prop('disabled', false);
        }
      });

      $('.dropdown-common-value', this.node).text(this.strings().commonValueString);

      $('.dropdown-confirm', this.node).prop('disabled', true);

      if ((this.withReset) && (this.values['item0'] + this.values['item1'] + this.values['item2'] == 0)) {
        $('.dropdown-reset', this.node).prop('disabled', true);
      } else if (this.withReset) {
        $('.dropdown-reset', this.node).prop('disabled', false);
      }

      console.log('СБРОШЕНО');
    }
  });

  $('.dropdown-drop', this.node).on('mousedown', () => {
    if (Date.now() - this.timeSetFocus < timeWithoutClick) return;
    $(this.node).toggleClass('dropdown-open');
    console.log('ЩЕЛЧОК ПО ДРОПУ');
  });

  $('.dropdown-common-value', this.node).text(this.strings().commonValueString);

  $('.dropdown-item', this.node).each( (index, element) => {
    let nameInput;
    if (nameInput = $('.dropdown-input', element).attr('name').match(/item.*$/i)[0]) {
      this.inputs[nameInput] = $('.dropdown-input', element);
      this.inputs[nameInput].val(this.values[nameInput]);
      $('.dropdown-label', element).text(this.strings().itemStrings[nameInput]);

      $('.dropdown-minus', element).on('mousedown', () => {

        --this.values[nameInput];
        this.inputs[nameInput].val(this.values[nameInput]);

        console.log(this.values[nameInput]);

        $('.dropdown-common-value', this.node).text(this.strings().commonValueString);

        if (this.values[nameInput] <= 0) {
          $('.dropdown-minus', element).prop('disabled', true);
        } else {
          this.keepFocus = true;
          console.log('-:' + this.keepFocus);
        }

        $('.dropdown-plus', element).prop('disabled', false);

        if (this.withConfirm) {
          this.confirmed = false;
          $('.dropdown-confirm', this.node).prop('disabled', false);
        }

        if ((this.withReset) && (this.values['item0'] + this.values['item1'] + this.values['item2'] == 0)) {
          $('.dropdown-reset', this.node).prop('disabled', true);
        }
      });

      $('.dropdown-minus', element).on('blur', () => {
        console.log('КНОПКА — ТЕРЯЕТ ФОКУС');
      });

      $('.dropdown-minus', element).on('focus', () => {
        console.log('КНОПКА — ПОЛУЧАЕТ ФОКУС');
        console.log('ФОКУС СЕЙЧАС БУДЕТ ПЕРЕДАН');
        $(this.node).focus();
        console.log('ФОКУС ПЕРЕДАН');
      });

      $('.dropdown-plus', element).on('mousedown', () => {

        ++this.values[nameInput];
        this.inputs[nameInput].val(this.values[nameInput]);

        console.log(this.values[nameInput]);

        $('.dropdown-common-value', this.node).text(this.strings().commonValueString);

        if (this.values[nameInput] >= MAX) {
          $('.dropdown-plus', element).prop('disabled', true);
        } else {
          this.keepFocus = true;
          console.log('+:' + this.keepFocus);
        }

        $('.dropdown-minus', element).prop('disabled', false);

        if (this.withConfirm) {
          this.confirmed = false;
          $('.dropdown-confirm', this.node).prop('disabled', false);
        }

        if (this.withReset) {
          $('.dropdown-reset', this.node).prop('disabled', false);
        }

      });

      $('.dropdown-plus', element).on('blur', () => {
        console.log('КНОПКА + ТЕРЯЕТ ФОКУС');
      });

      $('.dropdown-plus', element).on('focus', () => {
        console.log('КНОПКА + ПОЛУЧАЕТ ФОКУС');
        console.log('ФОКУС СЕЙЧАС БУДЕТ ПЕРЕДАН');
        $(this.node).focus();
        console.log('ФОКУС ПЕРЕДАН');
      });
    }
  })

  if (this.withConfirm) {
    this.dropdown_confirm = dropdown_confirm;
    this.dropdown_confirm();
  }

  if (this.withReset) {
    this.dropdown_reset = dropdown_reset;
    this.dropdown_reset();
  }

}


