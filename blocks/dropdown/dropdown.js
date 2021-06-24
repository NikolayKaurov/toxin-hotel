function dropdown(node) {
  node.querySelector('.dropdown-quantity').innerHTML = 'Сколько гостей';
}

document.querySelectorAll('.dropdown').forEach(node => {
  dropdown(node);
})