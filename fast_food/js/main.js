// class Calculator {
//     constructor(container='.total') {
//         this.container = container;
//         this.render();
//         this.sumPrice();
//         this.sumCalories();
//     }
//     sumPrice(){

//     }
//     sumCalories(){

//     }
//     render(){
//         document.querySelector(this.container).insertAdjacentHTML("beforeend",div())// Дописать откуда берется див
//     }
// }

// const calculation = new Calculator()

class Result {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
        this.render();
    }
    render() {
        let totalPrice = document.querySelector(".total");
        totalPrice.innerHTML = '';
        totalPrice.insertAdjacentHTML("beforeend", `
        <div>Ваш бургер стоит ${this.price} рублей и содержит ${this.calories} каллорий </div>`)
    }
}
class Calculator {
    constructor() {
        this.get();
    }
    get() {
        let order = document.querySelector('form');

        order.addEventListener('submit', function (event) {
            let price = 0;
            let calories = 0;
            let orderInput = event.target;
            for (let param of orderInput) {
                if (param.checked) {
                    if (param.id == 'small') {
                        price += 50;
                        calories += 20;
                    } else if (param.id == 'big') {
                        price += 100;
                        calories += 40;
                    } else if (param.id == 'cheese') {
                        price += 10;
                        calories += 20;
                    } else if (param.id == 'salad') {
                        price += 20;
                        calories += 5;
                    } else if (param.id == 'potatoes') {
                        price += 15;
                        calories += 10;
                    } else if (param.id == 'spice') {
                        price += 15;
                    } else if (param.id == 'sauce') {
                        price += 20;
                        calories += 5;
                    }
                    console.log(param.id)
                }
            }
            let result = new Result(price, calories);
        })
    }
}

let reciept = new Calculator();
