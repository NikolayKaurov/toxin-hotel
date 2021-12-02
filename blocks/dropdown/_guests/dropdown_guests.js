import $ from 'jquery';

import { Dropdown, NUMBER_ITEMS_IN_VALUE } from '../dropdown';

const GUESTS_NOMINATIVE = 'гость';
const GUESTS_GENITIVE = 'гостя';
const GUESTS_GENITIVE_PLURAL = 'гостей';

/* eslint-disable-next-line */
class Dropdown_guests extends Dropdown {
  getCommonValue() {
    let value = '';
    let guestsValue = 0;
    let numberItems = 0;

    this.$dropdown__items.each((index, item) => {
      if (index === 0) {
        if (item.dataset.value !== '') {
          guestsValue = parseInt(item.dataset.value.split(' ')[0], 10);
        }
      } else if (index === 1) {
        if (item.dataset.value !== '') {
          guestsValue += parseInt(item.dataset.value.split(' ')[0], 10);
        }
        if (guestsValue > 0) {
          if (
            (guestsValue > 4 && guestsValue < 21)
            || guestsValue % 10 > 4
            || guestsValue % 10 === 0
          ) {
            value = `${guestsValue} ${GUESTS_GENITIVE_PLURAL}`;
          } else if (guestsValue % 10 === 1) {
            value = `${guestsValue} ${GUESTS_NOMINATIVE}`;
          } else {
            value = `${guestsValue} ${GUESTS_GENITIVE}`;
          }
          numberItems = 1;
        }
      } else if (item.dataset.value !== '') {
        if (numberItems === NUMBER_ITEMS_IN_VALUE) {
          value += '...';
        } else if (numberItems < NUMBER_ITEMS_IN_VALUE) {
          if (value === '') {
            value = item.dataset.value;
          } else {
            value += `, ${item.dataset.value}`;
          }
        }
        numberItems += 1;
      }
    });

    if (value === '') {
      return this.defaultValue;
    }

    return value;
  }
}

$('.js-dropdown_guests').each((index, element) => {
  const dropdown = new Dropdown_guests(element);
  dropdown.init();
});
