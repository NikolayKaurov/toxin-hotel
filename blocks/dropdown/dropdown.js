import dropdown_strings_room from './_strings_room/dropdown_strings_room';
import dropdown_strings_guest from './_strings_guest/dropdown_strings_guest';
let $ = require('jquery');

/*
let strings_guest = function() {
  return {
    commonValueString: 'Сколько гостей',
    itemStrings: {
      item0: 'младенцы',
      item1: 'дети',
      item2: 'взрослые'
    }
  }
}
*/

console.log('ИСХОДНЫЙ ФАЙЛ');


$('.dropdown').each((index, node) => {
  new dropdown(node);
  console.log('НОВЫЙ ДРОПДАУН');
})


export default function dropdown(node) {

  this.node = node;

  // this.withResetAndConfirm = false;


  this.values = {
    item0: 1,
    item1: 2,
    item2: 3,
  };

  this.inputs = {};

/*
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
*/


  let stringsModifier = $(this.node).attr('class').match(/dropdown_strings_[a-z]([a-z0-9-]*[a-z0-9])?/i) || [];
  console.log(stringsModifier[0]);

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

  /*this.itemStrings = this.strings.itemStrings;
  this.commonValueString = this.strings.commonValueString;
*/
/*
  if (dropdown_strings) {
    this.itemStrings = dropdown_strings().itemStrings;
    this.commonValueString = dropdown_strings().commonValueString;
  } else {

    this.itemStrings = {
      item0: 'младенцы',
      item1: 'дети',
      item2: 'взрослые',
    }

    this.commonValueString = () => {
      return 'Сколько комнат';
    }
  }
*/

  $('.dropdown-common-value', this.node).text(this.strings().commonValueString);
  console.log(this.strings().commonValueString);

  $('.dropdown-item', this.node).each( (index, element) => {
    let nameInput;
    if (nameInput = $('.dropdown-input', element).attr('name').match(/item.*$/i)[0]) {
      this.inputs[nameInput] = $('.dropdown-input', element);
      this.inputs[nameInput].val(this.values[nameInput]);
      //  console.log(this.values[nameInput]);
       console.log(nameInput);
      $('.dropdown-label', element).text(this.strings().itemStrings[nameInput]);
    }
  })
}


