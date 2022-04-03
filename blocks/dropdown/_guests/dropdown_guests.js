import $ from 'jquery';

import { Dropdown, getValueWithCaseSelect } from '../dropdown';

/* eslint-disable-next-line */
class Dropdown_guests extends Dropdown {
  getCommonValue() {
    const firstItem = this.$dropdown__items.get(0);
    const secondItem = this.$dropdown__items.get(1);

    let guestsValue = 0;

    if (secondItem) {
      guestsValue = parseInt(secondItem.dataset.quantity, 10) || 0;
      secondItem.dataset.value = '';
    }

    if (firstItem) {
      guestsValue += parseInt(firstItem.dataset.quantity, 10) || 0;
      firstItem.dataset.value = getValueWithCaseSelect({
        value: guestsValue,
        cases: firstItem.dataset.units,
      });
    }

    return super.getCommonValue();
  }
}

$('.js-dropdown_guests').each((index, element) => {
  const dropdown = new Dropdown_guests(element);
  dropdown.init();
  console.log('Гости');
});
