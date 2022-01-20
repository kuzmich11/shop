Vue.component('products', {
   data(){
       return {
        //    catalogUrl: '/catalogData.json',
           filtered: [],
           products: []
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<ul class="catalog__list">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img = "item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct">
                </product>
               </ul>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <li class = "catalog__item">
                <img class = "catalog__img" :src="img" alt="Some img">
                <div class = "catalog__alt-img">
                    <button class="catalog__add-cart" @click="$emit ('add-product', product)">
                        <img class="catalog__cart" src="img/cart.svg" alt="add to cart">Add to Cart
                    </button>
                </div> 
                <a class = "catalog__link" href="#">
                <h3 class="catalog__subtitle">{{product.product_name}}</h3>
                <p class = "catalog__description">{{product.description}}</p>
                <p class="catalog__price">$ {{product.price}}.00</p></a>
            </li>
    `
})