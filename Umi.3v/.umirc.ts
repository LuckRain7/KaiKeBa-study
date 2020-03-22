import { defineConfig } from 'umi';

export default defineConfig({
    routes: [
        { path: "/", component: "@/pages/index" },
        {
            path: "/admin",
            wrappers: [
                '@/wrappers/auth',
            ], component: "@/pages/admin"
        },
        { path: "/login", component: "@/pages/login" },
        {
            path: "/user",
            component: "@/pages/user/_layout",
            routes: [
                { path: "/user/", component: "./user/index" },
                { path: "/user/:id", component: "./user/[id]" },
            ]
        },
        { component: "@/pages/404" }
    ]
});
