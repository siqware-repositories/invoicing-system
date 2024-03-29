/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
              },
                {
                    path: '/user',
                    name: 'user',
                    component: () => import('./views/user/User'),
                    meta: {
                        breadcrumb: [
                            { title: 'ទំព័រដើម', url: '/' },
                            { title: 'អ្នកប្រើប្រាស់', active: true },
                        ],
                        pageTitle: 'អ្នកប្រើប្រាស់',
                        rule: 'editor'
                    }
                },
                {
                    path: '/settings',
                    name: 'setting',
                    component: () => import('./views/setting/Setting'),
                    meta: {
                        breadcrumb: [
                            { title: 'ទំព័រដើម', url: '/' },
                            { title: 'ការកំណត់', active: true },
                        ],
                        pageTitle: 'ការកំណត់',
                        rule: 'editor'
                    }
                },
                {
                    path: '/supplier',
                    name: 'supplier',
                    component: () => import('./views/supplier/Supplier.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'ទំព័រដើម', url: '/' },
                            { title: 'អ្នកផ្គត់ផ្គង់', active: true },
                        ],
                        pageTitle: 'អ្នកផ្គត់ផ្គង់',
                        rule: 'editor'
                    }
                },
                {
                    path: '/customer',
                    name: 'customer',
                    component: () => import('./views/customer/Customer.vue'),
                    meta: {
                        breadcrumb: [
                            { title: 'ទំព័រដើម', url: '/' },
                            { title: 'អតិថិជន', active: true },
                        ],
                        pageTitle: 'អតិថិជន',
                        rule: 'editor'
                    }
                },
              {
                path: '/page2',
                name: 'page-2',
                component: () => import('./views/Page2.vue')
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/pages/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
