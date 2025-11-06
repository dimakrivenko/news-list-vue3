import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "", name: "home", component: () => import("@/pages/Home.vue") },
        { path: "/news", name: "news", component: () => import("@/pages/News.vue") },
        { path: "/ui-kit", name: "ui-kit", component: () => import("@/pages/UIKit.vue") },
    ],
});

export default router;
