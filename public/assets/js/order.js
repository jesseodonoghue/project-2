const taxRate = 0.06;
let subtotalTracker;
let taxTracker;
let totalTracker;

// The API object contains methods for each kind of request we'll make
const API = {
  getDrinks: function () {
    return $.ajax({
      url: 'api/drinks',
      type: 'GET'
    });
  },
  getCustOrders: function (id) {
    return $.ajax({
      url: 'api/custOrders/' + id,
      type: 'GET'
    });
  },
  createOrder: function (id) {
    return $.ajax({
      type: 'POST',
      url: 'api/order/' + id
    });
  },
  createOrderItem: function (orderItem) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/orderItem',
      data: JSON.stringify(orderItem)
    });
  }
};

function renderCart () {
  $('#cart-body').empty();

  let subtotal = 0;
  let tax;
  for (let i = 0; i < order.length; i++) {
    console.log('order[i]------\n', order[i]);
    subtotal += order[i].price;
    const itemEl = $('<div>').data('id', i).addClass('cart-item');
    const itemNameEl = $('<span>').text(order[i].name).addClass('cart-item-name');
    const itemPriceEl = $('<span>').text('$' + order[i].price.toFixed(2)).addClass('cart-item-price');
    const itemNotesEl = $('<p>').text(order[i].notesString);
    const removeItemEl = $('<a>').data('id', i).attr('href', '#').addClass('remove-item').text('[Remove Item]');

    itemNotesEl.append(removeItemEl);
    itemEl.append(itemNameEl).append(itemPriceEl).append(itemNotesEl);
    $('#cart-body').append(itemEl);
  }

  tax = subtotal * taxRate;
  tax = Math.round(tax * 100) / 100;
  const total = subtotal + tax;

  subtotalTracker = subtotal;
  taxTracker = tax;
  totalTracker = total;

  $('#subtotal-value').text('$' + subtotal.toFixed(2));
  $('#tax-value').text('$' + tax);
  $('#total-value').text('$' + total.toFixed(2));

  $('.remove-item').click(function (event) {
    order.splice($(this).data('id'), 1);
    localStorage.setItem('order', JSON.stringify(order));
    renderCart();
    renderCartBadge(order.length.toString());
  });
}

function renderCartBadge (count) {
  const li = $('#cart-list-item');
  const a = $('<a>').addClass('nav-link').attr('href', '#');
  const span = $('<span>').addClass('fa-stack fa-sm has-badge').attr('id', 'shopping-cart-span').attr('data-count', count);
  const i = $('<i>').addClass('fa fa-stack-lg fa-inverse');
  const cartImg = $('<i>').attr('id', 'shopping-cart-button').addClass('fa fa-shopping-cart fa-stack-2x aquamarine-cart');

  span.append(i).append(cartImg);
  a.append(span);
  li.html(a);

  $('#cart-list-item').click(function (event) {
    renderCart();
    $('#shopping-cart').modal('show');
  });
}

renderCartBadge('0');

if (localStorage.getItem('totalInfo')) {
  const totalObj = JSON.parse(localStorage.getItem('totalInfo'));
  $('#confirm-subtotal').text('$' + totalObj.subtotal.toFixed(2));
  $('#confirm-tax').text('$' + totalObj.tax.toFixed(2));
  $('#confirm-total').text('$' + totalObj.total.toFixed(2));
}

let order = [];
// let subtotal = 0;
// if order is in local storage, use that order
if (localStorage.getItem('order')) {
  order = JSON.parse(localStorage.getItem('order'));
  renderCartBadge(order.length.toString());
}
let drinkID;
let drinkPrice;
let drinkName;

// When a drink-card is clicked, reset drink-options-form and display
// drink-options modal. Set global drink values
$('.drink-card').click(function (event) {
  $('#drink-options').modal('show');
  $('#drink-options-form').trigger('reset');
  drinkID = $(this).data('id');
  drinkName = $(this).data('name');
  drinkPrice = parseFloat($(this).data('price'));
});

// When form is submitted, pull values from inputs, create orderItem object, and push into global order array
$('#drink-options-form').submit(function (event) {
  event.preventDefault();
  // initialize orderItem price and drinkId from global drink variables
  const orderItem = {
    price: drinkPrice,
    DrinkId: drinkID,
    name: drinkName
  };

  // initialize drinkNotes with required values
  const drinkNotes = {
    size: $('#inputSize').val(),
    temperature: $('#inputTemperature').val(),
    milk: $('#inputMilk').val().split('(')[0].trim(),
    notes: $('#inputNotes').val()
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
  orderItem.notes = drinkNotes;
  orderItem.notesString = orderNotesToString(drinkNotes);

  // push orderItem into order array
  order.push(orderItem);

  // save order array to local storage
  localStorage.setItem('order', JSON.stringify(order));

  $('#drink-options').modal('toggle');
  renderCart();
  renderCartBadge(order.length.toString());
  $('#shopping-cart').modal('show');
});

// When submit-order-button is clicked, if order is empty do nothing, else save order to db
$('#order-submit-button').click(function (event) {
  event.preventDefault();
  let orderID;
  if (order.length > 0) {
    API.createOrder($(this).data('id')).then(function (data) {
      orderID = data.id;
      for (let i = 0; i < order.length; i++) {
        order[i].OrderId = data.id;
        order[i].notes = JSON.stringify(order[i].notes);
      }
      console.log('order array \n', order);
      API.createOrderItem(order).then(function (data) {
        console.log('order submitted!\n', data);
        order = [];
        renderCartBadge(order.length.toString());
        localStorage.removeItem('order');
        const totalObj = {
          subtotal: subtotalTracker,
          tax: taxTracker,
          total: totalTracker
        };
        localStorage.setItem('totalInfo', JSON.stringify(totalObj));
      }).then(function (data) {
        window.location.replace('/confirm/' + orderID);
      });
    });
  };
});

$('.add-item-to-cart').click(function (event) {
  console.log('notes!-----\n', $(this).data('notes'));
  const newItem = {
    id: $(this).data('drink-id'),
    name: $(this).data('drink-name'),
    price: parseFloat($(this).data('drink-price')),
    notes: $(this).data('notes'),
    notesString: orderNotesToString($(this).data('notes'))
  };

  order.push(newItem);
  localStorage.setItem('order', JSON.stringify(order));
  renderCart();
  renderCartBadge(order.length.toString());
  $('#shopping-cart').modal('show');
});

function orderNotesToString (orderNotesObj) {
  let noteString = '';
  let flavors = '';

  noteString = `Size: ${orderNotesObj.size}, Temperature: ${orderNotesObj.temperature}, Milk: ${orderNotesObj.milk}`;

  if (orderNotesObj.flavor) {
    switch (orderNotesObj.flavor.length) {
      case 1:
        flavors = `, Flavors: ${orderNotesObj.flavor[0]}`;
        break;
      default:
        flavors = `, Flavors: ${orderNotesObj.flavor[0]}`;
        for (let i = 1; i < orderNotesObj.flavor.length; i++) {
          flavors += `, ${orderNotesObj.flavor[i]}`;
        }
    }
    noteString += flavors;
  }

  if (orderNotesObj.extraShots) {
    noteString += `, Shots: ${orderNotesObj.extraShots}`;
  }

  if (orderNotesObj.notes) {
    noteString += `, Notes: ${orderNotesObj.notes}`;
  }

  return noteString;
}
