 import Vue from "vue";
import Router from 'vue-router'
 import NoteList from "@/components/NoteList";
 import TodoList from "@/components/TodoList";

 Vue.use(Router);
let router = new Router({
    mode : "history",
    routes: [
        {
            path: '/',
            name: 'NoteList',
            component: NoteList,
            props : true
        },
        {
            path: '/note',
            name: 'TodoList',
            component: TodoList,
        }
    ]
})

 export default router