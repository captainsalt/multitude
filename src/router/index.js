import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isAuthenticated } from "@/services/twitch-service.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next("/");
      }
      else {
        next();
      }
    }
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/Auth.vue"),
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next("/");
      }
      else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
