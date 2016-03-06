'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function calc_rental_date(pd, rd) {
	var p_date = new Date(pd),
		p = p_date.getDate(),
		r_date = new Date(rd),
		r = r_date.getDate();
	return (r-p) + 1;
}


function calc_rentals() {
	rentals.map(function (rental) {
		var car_id = rental.carId,
			car_inf = cars.filter(car => car.id == car_id)[0],
			days = calc_rental_date(rental.pickupDate, rental.returnDate),
			time_price = car_inf.pricePerDay * days,
			distance_price = car_inf.pricePerKm * rental.distance,
			total_price = time_price + distance_price;
		rental.price = total_price;
	});
	// console.log(rentals);			// Print the result
}
calc_rentals();

function pricing_decreace() {
	rentals.map(function (rental) {
		var car_id = rental.carId,
			car_inf = cars.filter(car => car.id == car_id)[0],
			days = calc_rental_date(rental.pickupDate, rental.returnDate),
			distance_price = car_inf.pricePerKm * rental.distance,
			time_price,
			total_price;

		var daily_price = car_inf.pricePerDay;

		if(days == 1) {
			time_price = daily_price;
		}
		else if(days > 1 && days <= 4) {
			time_price = daily_price+daily_price*0.9*(days-1);
		}
		else if(days > 4 && days <= 10) {
			time_price = daily_price
						+ daily_price*0.9*3
						+ daily_price*0.7*(days-4);
		}
		else if(days > 10) {
			time_price = daily_price
						+ daily_price*0.9*3
						+ daily_price*0.7*6
						+ daily_price*0.5*(days-10);
		}
		total_price = time_price + distance_price;
		rental.price = total_price;
	});
	// console.log(rentals);					// Print the result
}
pricing_decreace();

function calc_commission() {
	rentals.map(function (rental) {
		var commission = rental.price*0.3;
		rental.commission.insurance = commission*0.5;
		rental.commission.assistance = calc_rental_date(rental.pickupDate, rental.returnDate);
		rental.commission.drivy = commission - rental.commission.insurance - rental.commission.assistance;
	});
	console.log(rentals);					// Print the result
};
calc_commission();
// console.log(cars);
// console.log(rentals);
// console.log(actors);
// console.log(rentalModifications);
