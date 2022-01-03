class Form {
    constructor(container = '.message'){
        this.container = container;
        this.validate();
        // this.render();
    }
    validate(){
        let formObj = document.querySelector('form');
        
        formObj.addEventListener('submit', (event) => {
                                   
            document.querySelector('.name-input').innerHTML = '';
            document.querySelector('.phone-input').innerHTML = '';
            document.querySelector('.mail-input').innerHTML = '';
            let strName = event.target.querySelector('#name')
            if (/[-+*/_0-9]/i.test(strName.value)||strName.value == '') {
                strName.style.borderColor = 'red';
                document.querySelector('.name-input').insertAdjacentHTML('beforeend', 'Не верно заполнено поле, введите Ваше име!');
                event.preventDefault();
            } else {
                strName.style.borderColor = 'black';               
            }
            let strPhone = event.target.querySelector('#phone')
            if (/^\+[7][\(]\d{3}\)\d{3}-\d{4}$/.test(strPhone.value)) {
                strPhone.style.borderColor = 'black';               
            } else {
                strPhone.style.borderColor = 'red';
                document.querySelector('.phone-input').insertAdjacentHTML('beforeend', 'Не верно заполнено поле, введите телефон в виде +7(000)000-0000!');
                event.preventDefault();
            }
            let strMail = event.target.querySelector('#mail')
            if (/^[a-zа-я0-9._-]+@[a-z0-9-_]+\.[a-z0-9-_]{2,4}/iu.test(strMail.value)) {
                strMail.style.borderColor = 'black';               
            } else {
                strMail.style.borderColor = 'red';
                document.querySelector('.mail-input').insertAdjacentHTML('beforeend', 'Не верно заполнено поле, введите Ваш email!');
                event.preventDefault();
            }
        })
    }
}

let form = new Form();