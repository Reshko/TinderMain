import VueRouter from 'vue-router';

import Main from '../src/components/HelloWorld';
import Information from '../src/components/Information';
import Create from '../src/components/Create';


export default new VueRouter({
    mode:"history",
    routes :[
        { path :"",component: Main },
        { path: "/Info",component: Information},
        { path : "/Create", component: Create}
    ]
})