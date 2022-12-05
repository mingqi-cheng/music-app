import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  
     {path:'/',component:()=>import('../test/test1.vue')},
     {path:'/test2',component:()=>import('../test/test2.vue')},
     {path:'/test3',component:()=>import('../test/test3.vue')},
     {path:'/test4',component:()=>import('../test/test4.vue')},
     {path:'/sousuo',component:()=>import('../test/sousuo.vue')},
     {path:'/geshou',component:()=>import('../test/geshou.vue')},
     {path:'/gedan',name:"gedan",component:()=>import('../test/gedan.vue')}
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router