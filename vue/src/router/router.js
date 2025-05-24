import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import PostDetail from '../components/Posts/PostDetail.vue'
import EditPost from '../components/Posts/EditPost.vue'
import CreatePost from '../components/Posts/CreatePost.vue'

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/posts/:id', name: 'PostDetail', component: PostDetail, props: true},
    {path: '/posts/:id/', name: 'EditPost', component: EditPost, props: true},
    {path: '/posts/create', name: 'CreatePosts', component: CreatePost, props: true}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;