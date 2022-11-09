import { defineStore } from "pinia";
import DATA from "../data.json";

export const useProductsStore = defineStore("products", {
  state() {
    return{
      products: JSON.parse(JSON.stringify(DATA))
    }
  },
  getters: {
    getProducts(){
      return this.products;
    },
    getHeroProduct(){
      return this.products[3];
    },
    getMainBannerProduct(){
      return this.products[5];
    },
    getBannerProduct(){
      return this.products[4];
    },
    getSecondaryBannerProduct(){
      return this.products[0];
    },
    getHeadphones(){
      return this.products.filter(element => element.category === "headphones").reverse();
    },
    getSpeakers(){
      return this.products.filter(element => element.category === "speakers");
    },
    getEarphones(){
      return this.products.filter(element => element.category === "earphones");
    }
  }
});
