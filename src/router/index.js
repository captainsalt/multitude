import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isAuthenticated } from "@/services/twitch-service.js";

Vue.use(VueRouter);

async function redirectIfAuth(to, from, next) {
  if (await isAuthenticated()) {
    next("/");
  }
  else {
    next();
  }
}

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    beforeEnter: redirectIfAuth
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/Auth.vue"),
    beforeEnter: redirectIfAuth
  },
  {
    path: "*",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
