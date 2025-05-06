import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import PostDetail from '../components/Posts/PostDetail.vue'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/posts/:id', name: 'PostDetail', component: PostDetail, props: true}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;