let $ = require('jquery');

export default function dropdown_reset() {

  $('.dropdown-reset', this.node).on('mousedown', () => {
    this.confirmed = true;

    console.log('RESET');

    for (let item in this.values) {
      this.valuesConfirmed[item] = 0;
      this.values[item] = 0;
      this.inputs[item].val(0);
    }

    $('.dropdown-reset', this.node).prop('disabled', true);
    $('.dropdown-confirm', this.node).prop('disabled', true);

    $('.dropdown-item', this.node).each( (index, element) => {
        $('.dropdown-minus', element).prop('disabled', true);
        $('.dropdown-plus', element).prop('disabled', false);
    });

    $('.dropdown-common-value', this.node).text(this.strings().commonValueString);
  });

}