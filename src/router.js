import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
    {
        path: "/",
        //name: "admin",
        component: importComponent('DashboardLayout'),
        children: [
        //Dashboard

            {
                path: "/",
                name: "Root",
                component: importComponent('Dashboard'),
            },
                // To do list
            {
                path: "/profile",
                name: "Profile",
                meta: {title: 'Profile'},
                component: importComponent('TodoList/Profile'),
            },
            {
                path: "/order",
                name: "Order",
                meta: {title: 'Order'},
                component: importComponent('TodoList/Order'),
            },
            {
                path: "/history",
                name: "History",
                component: importComponent('TodoList/History'),
            },
            {
                path: "/promo",
                name: "Promo",
                component: importComponent('TodoList/Promo'),
            },

            // {
            //     path: "/register",
            //     name: "Register",
            //     component: importComponent('TodoList/Register'),
            // },

            {
                path: "/about",
                name: "About",
                component: importComponent('TodoList/About'),
            },

        ]
    },

    {
        path: "/admin",
        name: "admin",
        component: importComponent('DashboardLayoutAdmin'),
        children: [
            //Dashboard
            {
                path: "/admin/dashboardAdmin",
                name: "DashboardAdmin",
                meta: { title: 'DashboardAdmin' },
                component: importComponent('Admin/Dashboard'),
            },
            {
                path: "/admin/item",
                name: "Item List",
                meta: { title: 'Item List' },
                component: importComponent('Admin/List'),
            },
            {
                path: "/admin/order",
                name: "Order",
                meta: { title: 'Order' },
                component: importComponent('Admin/Order'),
            },
            {
                path: "/admin/history",
                name: "History",
                meta: { title: 'Order' },
                component: importComponent('Admin/History'),
            },
            {
                path: "/admin/promo",
                name: "Promo",
                meta: { title: 'Promo' },
                component: importComponent('Admin/Promo'),
            },
        ],
    },

    {
        path: "/login",
        name: "Login",
        meta: {title: 'Login'},
        component: importComponent('Login'),
    },

    {
        path: "/admin/loginAdmin",
        name: "LoginAdmin",
        meta: { title: 'LoginAdmin' },
        component: importComponent('LoginAdmin'),
    },
    {
        path: "/landingpage",
        name: "LandingPage",
        meta: { title: 'LandingPage' },
        component: importComponent('LandingPage'),
    },
    {
        path: '*',
        redirect: '/'

    },
]});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title


    // if(to.name != 'Login' && localStorage.getItem('token') == ''){
    //     next({ path: '/login' })
    // }
    // else if(to.name == 'Login' && localStorage.getItem('token') != ''){
    //     next({ path: '/profile'})
    // }

    // if(to.name == 'LoginAdmin' && localStorage.getItem('tokenAdmin' == '')){
    //     next({ path: '/admin/loginAdmin' })
    // }


     next()
});

export default router;

