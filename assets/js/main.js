//  1. Добавить обработчик на кнопки "ADD TO CART", реализовать делегирование
//  2. реализовать счетчик добавленных в корзину товаров
//  3. реализовать 2 секундную блокировку всех кнопок между нажатиями
//  4. получить цену из родителькой ноды, распарсить с помощью регулярки
//  5. цену выводить в кнопку вместо основного текста на время блокировки,
//     затем восстановить исходное сообщение
//  6. реализовать счет всех товаров, добавленных в корзину,
//     учесть ошибку JS при работе с дробной частью

const buttonsContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');
let cartCounter = 0;
let cartPrice = 0;

const btnClickHandler = (e) => {
  const target = e.target;
  
  if (target && target.matches('button.item-actions__cart')) {

    cartCounterLabel.innerHTML = `${++cartCounter}`;
    if (cartCounter === 1) cartCounterLabel.style.display = 'block';

    const mockData = +target
      .parentElement
      .previousElementSibling
      .innerHTML
      .replace(/^\$(\d+)\s\D+(\d+).*$/,'$1.$2');

      cartPrice = Math.round((cartPrice * 100) + (mockData * 100)) / 100;

      const restoreHTML = target.innerHTML;

      target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
      target.disabled = true;
      buttonsContainer.removeEventListener('click', btnClickHandler);

      setTimeout(() => {
        target.innerHTML = restoreHTML;
        target.disabled = false;
        buttonsContainer.addEventListener('click', btnClickHandler);
      },2000);
  } 
};

buttonsContainer.addEventListener('click', btnClickHandler);
