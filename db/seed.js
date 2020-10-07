module.exports = (db) => {
  db.User.create({
    firstName: 'Adam',
    lastName: 'Gates',
    email: 'adam@gates.com',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true
  }).then(() => {
    db.User.create({
      firstName: 'Uma',
      lastName: 'Pearson',
      email: 'uma@pearson.com',
      password: process.env.USER_PWD,
      isAdmin: false
    });
  });

  db.Drink.create({
    name: 'Drip Coffee',
    description: 'Our famous hot coffee is made from high-quality 100% Arabica beans and is freshly ground and brewed continually throughout the day.',
    basePrice: 2.50,
    img: 'assets/images/coffee.png'
  }).then(() => {
    db.Drink.create({
      name: 'Latte',
      description: 'Made with steamed, frothy milk, blended with our rich, freshly ground and brewed espresso. Our Latte has a layer of foam and is the perfect balance of creamy and smooth to get you goin',
      basePrice: 4.00,
      img: 'assets/images/latte.png'
    });
  }).then(() => {
    db.Drink.create({
      name: 'Cappuccino',
      description: 'Our Cappuccino is a warm cup of blended espresso and frothy, bold deliciousness. Made with high-quality espresso beans, freshly ground, freshly brewed and then blended with steamed milk. This beverage has a thick layer of creamy foam for your delight.',
      basePrice: 4.00,
      img: 'assets/images/cappuccino.png'
    });
  }).then(() => {
    db.Drink.create({
      name: 'Espresso Double Shot',
      description: 'We roast and grind the finest, high-quality Arabica beans. Every shot of espresso is brewed fresh for every beverage a guest orders. Every sip is balanced with sweet caramel and bittersweet chocolate for a smooth and bold flavor.',
      basePrice: 2.00,
      img: 'assets/images/espresso.png'
    });
  }).then(() => {
    db.Drink.create({
      name: 'Macchiato',
      description: 'Did someone say layers on layers of hand-crafted deliciousness? Made with creamy milk and topped with two shots of espresso, our Macchiato is just what you\'re looking for.',
      basePrice: 4.00,
      img: 'assets/images/macchiato.png'
    });
  }).then(() => {
    db.Drink.create({
      name: 'Americano',
      description: 'Our hot Americano puts the oh! in Americano by combining two shots of 100% Rainforest Alliance Certified™ espresso with hot water creating a rich, robust drink.',
      basePrice: 3.00,
      img: 'assets/images/americano.png'
    });
  }).then(() => {
    db.Drink.create({
      name: 'Hot Cocoa',
      description: 'Cozy up with one of our creamy, craveable hot chocolates. Available in a variety of flavors sure to warm your soul.',
      basePrice: 3.00,
      img: 'assets/images/hot-cocoa.png'
    });
  }).then(() => {
    db.Drink.create({
      name: 'Vanilla Spice',
      description: 'Treat yourself to a rich, creamy blend of vanilla flavor, spices and steamed milk.',
      basePrice: 3.00,
      img: 'assets/images/vanilla-spice.png'
    });
  });
};
