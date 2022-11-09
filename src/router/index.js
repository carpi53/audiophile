import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/headphones",
      name: "headphones",
      component: () => import("../views/HeadphonesView.vue"),
    },
    {
      path: "/speakers",
      name: "speakers",
      component: () => import("../views/SpeakersView.vue"),
    },
    {
      path: "/earphones",
      name: "earphones",
      component: () => import("../views/EarphonesView.vue"),
    },
    {
      path: "/product/:slug",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/CheckoutView.vue"),
    },
  ],
});

export default router;
