import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'
import Index from '@/views/index/index.vue'
import Benefits from '@/views/benefits/index.vue'
import Explore from '@/views/explore/index.vue'
import News from '@/views/news/index.vue'
import Community from '@/views/community/index.vue'

export const asyncRoutes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/home',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Index',
                component: Index,
                meta: {
                    title: 'Index'
                }
            }
        ]
    },
    {
        path: '/benefits',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Benefits',
                component: Benefits,
                meta: {
                    title: 'Benefits'
                }
            }
        ]
    },
    {
        path: '/explore',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Explore',
                component: Explore,
                meta: {
                    title: 'Explore'
                }
            }
        ]
    },
    {
        path: '/community',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Community',
                component: Community,
                meta: {
                    title: 'Community'
                }
            }
        ]
    },
    {
        path: '/news',
        component: Layout,
        children: [
            {
                path: '',
                name: 'News',
                component: News,
                meta: {
                    title: 'News'
                }
            }
        ]
    }
]

export const constantRoutes = []

const router = createRouter({
    history: createWebHistory(),
    routes: asyncRoutes
})

export default router
