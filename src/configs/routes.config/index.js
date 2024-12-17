import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [
    ...authRoute
]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/home/index')),
        authority: [],
    },
    {
        key: 'items',
        path: '/items/*',
        component: React.lazy(() => import('views/items/index')),
        authority: [],
    },
    {
        key: 'terms',
        path: '/terms',
        component: React.lazy(() => import('views/terms')),
        authority: [],
        meta: {
            header: 'Terms of Service',
            footer: false
        }
    },
    {
        key: 'privacy-policy',
        path: '/privacy-policy',
        component: React.lazy(() => import('views/privacy-policy')),
        authority: [],
        meta: {
            header: 'Privacy Policy',
            footer: false,
        }
    },
]