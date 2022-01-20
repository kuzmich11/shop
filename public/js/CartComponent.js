Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({
                    quantity: 1
                }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${ item.id_product }`, {
                        quantity: -1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${ item.id_product }`, item)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
        minusItem(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        }
    },
    template: `
    <div class="header__cart-icon">
        <img src="img/cart.svg" alt="cart" @click="showCart=!showCart">
        <div class="header__cart-contain" v-show="showCart">
            <cart-item v-for="item of cartItems"
            :key="item.id_product"
            :img="item.imgPath"
            :cart-item="item"
            @remove="remove"
            
            @add="addProduct">
            </cart-item>
        </div>
    </div>
    
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="header__cart-item">
        <div class="header__cart-product">
            <img height="100px" :src="img" alt="Some img">
            <div class="header__product-desc">
                <div class="header__product-title">{{cartItem.product_name}}</div>
                <div class="header__product-price">Price: $ {{cartItem.price}}.00</div>
                <div class="header__product-price"> Quantity: {{ cartItem.quantity }}</div>
                <div class="header__product-totalprice">Total: $ {{cartItem.quantity*cartItem.price}}</div>
            </div>
        </div>
        <div class="right-block">
            <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
        </div>
    </div>
    `
})