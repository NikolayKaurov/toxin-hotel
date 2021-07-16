let $ = require('jquery');

export default function dropdown_confirm() {

  $('.dropdown-confirm', this.node).on('mousedown', () => {
    this.confirmed = true;

    console.log('CONFIRM');

    for (let item in this.values) {
      this.valuesConfirmed[item] = this.values[item];
      console.log(this.values[item]);
    }

    $(this.node).toggleClass('dropdown-open');

    $('.dropdown-confirm', this.node).prop('disabled', true);
  });

}