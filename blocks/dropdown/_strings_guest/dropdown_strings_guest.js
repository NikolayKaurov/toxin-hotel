//let $ = require('jquery');

console.log('ИМПОРТИРОВАНО dropdown_strings_guest');

export default function dropdown_strings_guest() {
  let commonValueStringArray = [];
  let stringGuest = numberString(this.values['item0'] + this.values['item1'], 'гость','гостя','гостей');
  let stringBaby = numberString(this.values['item2'], 'младенец','младенца','младенцев');

  function numberString(number, stringOne, stringFromTwoToFour, stringFromFiveToTen) {
    if (!number) return '';
    if ((number % 10 == 0) || (number % 10 > 4) || ((number > 10) && (number < 15))) return number + ' ' + stringFromFiveToTen;
    if (number % 10 == 1) return number + ' ' + stringOne;
    return number + ' ' + stringFromTwoToFour;
  }

  if (stringGuest) commonValueStringArray.push(stringGuest);
  if (stringBaby) commonValueStringArray.push(stringBaby);

  return {
    commonValueString: commonValueStringArray.join(', ') || 'Сколько гостей',
    itemStrings: {
      item0: 'взрослые',
      item1: 'дети',
      item2: 'младенцы'
    }
  }
}
