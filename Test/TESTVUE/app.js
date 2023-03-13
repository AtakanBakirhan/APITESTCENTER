//const home={template:'<h1> This is Home</h1>'}
//const department={template:'<h1> This is department</h1>'}

const routes=[
    {path:'/home', component:home},
    {path:'/department', component:department},
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')
