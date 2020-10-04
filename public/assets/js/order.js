let order = [];
// let subtotal = 0;
// if order is in local storage, use that order
if (localStorage.getItem('order')) {
  order = JSON.parse(localStorage.getItem('order'));
}
let drinkID;
let drinkPrice;
let drinkName;

// When a drink-card is clicked, reset drink-options-form and display
// drink-options modal. Set global drink values
$('.drink-card').click(function (event) {
  // event.preventDefault();
  $('#drink-options').modal('show');
  // $('#drink-options-form').trigger('reset');
  drinkID = $(this).data('drinkID');
  drinkName = $(this).data('drinkName');
  drinkPrice = $(this).data('drinkPrice');
});

// When form is submitted, pull values from inputs, create orderItem object, and push into global order array
$('#drink-options-form').submit(function (event) {
  event.preventDefault();
  // initialize orderItem price and drinkId from global drink variables
  const orderItem = {
    price: drinkPrice,
    drinkId: drinkID,
    name: drinkName
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

  // If inputMilk is not Whole or Skim, update drinkNotes.milk and add upcharge to orderItem.price
  switch ($('#inputMilk').val()) {
    case 'Half and Half (+ $0.50)':
    case 'Oat (+ $0.50)':
    case 'Almond (+ $0.50)':
    case 'Soy (+ $0.50)':
      orderItem.price += 0.50;
      break;
  }

  // // add orderItem.price to subtotal
  // subtotal += orderItem.price;

  // save drinkNotes to orderItem.notes as a stringified JSON object
  orderItem.notes = JSON.stringify(drinkNotes);

  // push orderItem into order array
  order.push(orderItem);

  // save order array to local storage
  localStorage.setItem('order', JSON.stringify(order));
});

// When shopping cart icon is clicked, display cart modal
// $('#shopping-cart-button').click(function (event) {
//   event.preventDefault();

//   for (let i = 0; i < order.length; i++) {
//     let itemEl = $('<div>').data(i, order[i]);
//     let itemHeaderEl = $('<h5>').text(order[i].name);
//     let itemNotesEl = $('<p>').text(order.notes);
//   }
//   $('#shopping-cart-div').css('display', 'block');
// });

// When submit-order-button is clicked, if order is empty do nothing, else save order to db
$('submit-order-button').click(function (event) {
  event.preventDefault();

  if (order.length > 0) {
    // API.createOrder???
  }
});

// function orderNotesToString (orderNotesObj) {
//   let flavors;
//   switch (orderNotesObj.flavor.length) {
//     case 0:
//       break;
//     case 1:
//       flavors = `, ${orderNotesObj.flavor[0]}`;
//       break;
//     default:
//       flavors = `, ${orderNotesObj.flavor[0]}`;
//       for (let i = 1; i < orderNotesObj.flavor.length; i++) {
//         flavors += `, ${orderNotesObj.flavor[i]}`;
//       }
//   }
//   return `Size: ${orderNotesObj.size}, Temperature: ${orderNotesObj.temperature}, Milk: ${orderNotesObj.milk}${orderNotesObj.flavor ? flavors : ''}`;
// }
