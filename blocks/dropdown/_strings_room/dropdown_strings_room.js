//let $ = require('jquery');

console.log('ИМПОРТИРОВАНО dropdown_strings_room');

export default function dropdown_strings_room() {
  let commonValueStringArray = [];

  let stringRoom = numberString(this.values['item0'], 'спальня','спальни','спален' );
  let stringBed = numberString(this.values['item1'], 'кровать','кровати','кроватей' );
  let stringBath = numberString(this.values['item2'], 'ванная','ванных','ванных' );

  function numberString(number, stringOne, stringFromTwoToFour, stringFromFiveToTen) {
    if (!number) return '';
    if ((number % 10 == 0) || (number % 10 > 4) || ((number > 10) && (number < 15))) return number + ' ' + stringFromFiveToTen;
    if (number % 10 == 1) return number + ' ' + stringOne;
    return number + ' ' + stringFromTwoToFour;
  }

  if (stringRoom) commonValueStringArray.push(stringRoom);
  if (stringBed) commonValueStringArray.push(stringBed);
  if (stringBath) commonValueStringArray.push(stringBath);

  let commonValueString = commonValueStringArray.join(', ');
  if (commonValueString && ((!stringRoom) || (!stringBed) || (!stringBath)) ) commonValueString += '...';

  return {
    commonValueString: commonValueString || 'Сколько комнат',
    itemStrings: {
      item0: 'спальни',
      item1: 'кровати',
      item2: 'ванные комнаты'
    }
  }
}
