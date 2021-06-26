function Dropdown(node) {

  this.state = 'closed';
  this.node = node;
  this.node.querySelector('.dropdown-quantity').innerHTML = 'Нет гостей';
  // this.number = 7;
  node.querySelector('.dropdown-arrow').innerHTML = 'expand_more';
  node.querySelector('.dropdown-adult').querySelector('.dropdown-label').innerHTML = 'взрослые';
  node.querySelector('.dropdown-child').querySelector('.dropdown-label').innerHTML = 'дети';
  node.querySelector('.dropdown-baby').querySelector('.dropdown-label').innerHTML = 'младенцы';

  this.node.querySelector('.dropdown-drop').addEventListener('click', () => this.open());

  this.open = function() {
    if (this.state == 'closed') {
      this.node.querySelector('.dropdown-down').classList.add('dropdown-open');
      this.state = 'open';
    } else {
      this.node.querySelector('.dropdown-down').classList.remove('dropdown-open');
      this.state = 'closed';
    }

//    this.node.querySelector('.dropdown-quantity').innerHTML = 'Сколько гостей';
//     console.log(this.number);
  };
}

// let dropdowns = {};

document.querySelectorAll('.dropdown').forEach(node => {
  // Dropdown(node);
  // let name = node.querySelector('.dropdown-counter').getAttribute('name').replace(/_dropdown.*$/i, '');
  /*dropdowns[name] =*/ /*new Dropdown(node);*/
  // node.querySelector('.dropdown-drop').addEventListener('click', dropdowns[name].open);
  // dropdowns[name].open();
  // console.log(name);
})