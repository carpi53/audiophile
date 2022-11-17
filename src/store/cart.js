import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state() {
    let initialCart = []
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      initialCart.push(JSON.parse(localStorage.getItem(key)))
    }
    return{
      cart: initialCart,
      reveal: false,
      route: ""
    }
  },
  getters: {
    getCart(){
      return this.cart;
    },
    getTotal(){
      const initialValue = 0;
      return this.cart.reduce((a,b) => a + (b.quantity * b.price), initialValue);
    },
    getVat(){
      const initialValue = 0;
      return (this.cart.reduce((a,b) => a + (b.quantity * b.price), initialValue) * 0.2).toFixed(0);
    },
    getTotalWithVat(){
      const initialValue = 0;
      return (this.cart.reduce((a,b) => a + (b.quantity * b.price), initialValue) * 1.2).toFixed(0);
    },
    getNumberCart(){
      const initialValue = 0;
      return (this.cart.reduce((a,b) => a + (b.quantity), initialValue));
    }
  },
  actions: {
    removeAll(){
      this.cart = [];
      localStorage.clear();
    },
    decreaseQuantity(name){
      const index = this.cart.findIndex(element => element.name === name)
      this.cart[index].quantity--;
      localStorage.setItem(this.cart[index].name, JSON.stringify(this.cart[index]));
      if(this.cart[index].quantity === 0){
        localStorage.removeItem(this.cart[index].name)
        this.cart.splice(index, 1)
      }
    },
    increaseQuantity(name){
      const index = this.cart.findIndex(element => element.name === name)
      this.cart[index].quantity++;
      localStorage.setItem(this.cart[index].name, JSON.stringify(this.cart[index]));
    },
    toggleReveal(){
      this.reveal = !this.reveal;
    }
  }
});
