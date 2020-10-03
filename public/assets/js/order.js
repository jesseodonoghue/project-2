let order = [];

// if order is in local storage, use that order
if (localStorage.getItem('order')) {
  order = JSON.parse(localStorage.getItem('order'));
}
let drinkID;
let drinkPrice;

// When a drinkCard is clicked, reset drink-options-form and display
// drink-options modal. Set global drink values
$('.drinkCard').click(function () {
  $('#drink-options-form').trigger('reset');
  $('#drinkOptions').css('display', 'block');
  drinkID = $(this).data('drinkID');
  drinkPrice = $(this).data('drinkPrice');
});

// When form is submitted, pull values from inputs, create orderItem object, and push into global order array
$('#drink-options-form').submit(function (event) {
  event.preventDefault();
  // initialize orderItem price and drinkId from global drink variables
  const orderItem = {
    price: drinkPrice,
    drinkId: drinkID
  };

  // initialize drinkNotes with required values
  const drinkNotes = {
    size: $('#inputSize').val(),
    temperature: $('#inputTemperature').val(),
    milk: $('#inputMilk').val().split('(')[0].trim()
  };

  // If size is not small, update drinkNotes.size and add upcharge to orderItem.price
  switch ($('#inputSize').val()) {
    case 'Medium':
      orderItem.price += 0.50;
      break;
    case 'Large':
      orderItem.price += 1;
      break;
  }

  // If extra shots > 0, update drinkNotes.extraShots and add upcharge to orderItem.price
  switch ($('#inputShots').val()) {
    case '+1':
      orderItem.price += 0.25;
      drinkNotes.extraShots = 1;
      break;
    case '+2':
      orderItem.price += 0.50;
      drinkNotes.extraShots = 2;
      break;
    case '+3':
      orderItem.price += 0.75;
      drinkNotes.extraShots = 3;
      break;
    case '+4':
      orderItem.price += 1;
      drinkNotes.extraShots = 4;
      break;
  }

  // If inputVanilla is checked
  if ($('#inputVanilla').is(':checked')) {
    // if existing flavor in drinkNotes, push 'vanilla'
    if (drinkNotes.flavor) {
      drinkNotes.flavor.push('vanilla');
      // else create drinkNotes.flavor array ['vanilla']
    } else drinkNotes.flavor = ['vanilla'];
    // add upcharge to orderItem.price
    orderItem.price += 0.50;
  }

  if ($('#inputChocolate').is(':checked')) {
    // if existing flavor in drinkNotes, push 'chocolate'
    if (drinkNotes.flavor) {
      drinkNotes.flavor.push('chocolate');
      // else create drinkNotes.flavor array ['chocolate']
    } else drinkNotes.flavor = ['chocolate'];
    // add upcharge to orderItem.price
    orderItem.price += 0.50;
  }

  if ($('#inputCaramel').is(':checked')) {
    // if existing flavor in drinkNotes, push 'caramel'
    if (drinkNotes.flavor) {
      drinkNotes.flavor.push('caramel');
      // else create drinkNotes.flavor array ['caramel']
    } else drinkNotes.flavor = ['caramel'];
    // add upcharge to orderItem.price
    orderItem.price += 0.50;
  }

  // If inputMilk is not Whole, update drinkNotes.milk and add upcharge to orderItem.price
  switch ($('#inputMilk').val()) {
    case 'Half and Half (+ $0.50)':
    case 'Oat (+ $0.50)':
    case 'Almond (+ $0.50)':
    case 'Soy (+ $0.50)':
      console.log('should be updating price!');
      orderItem.price += 0.50;
      break;
  }

  // save drinkNotes to orderItem.notes as a stringified JSON object
  orderItem.notes = JSON.stringify(drinkNotes);

  // push orderItem into order array
  order.push(orderItem);

  // save order array to local storage
  localStorage.setItem('order', JSON.stringify(order));
});
