/* eslint-disable prettier/prettier */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

 import { createRouter, createWebHistory, RouterOptions } from 'vue-router'

 import Index from './pages/index.vue'

 const routes = [
   {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/button',
    children: [{
      title: '按钮',
      name: 'Button',
      path: '/Button',
      component: () => import('../docs/Button/index.md'),
    },{
      title: '输入框',
      name: 'Input',
      path: '/Input',
      component: () => import('../docs/Input/index.md'),
    },{
      title: '上传',
      name: 'Upload',
      path: '/Upload',
      component: () => import('../docs/Upload/index.md'),
    },{
      title: '图片',
      name: 'Img',
      path: '/Img',
      component: () => import('../docs/Img/index.md'),
    },{
      title: '表格',
      name: 'TableTable',
      path: '/TableTable',
      component: () => import('../docs/TableTable/index.md'),
    },{
      title: '输入框',
      name: 'Input1',
      path: '/Input1',
      component: () => import('../docs/Input1/index.md'),
    }]
    }
  ];
 
 const routerConfig = {
   history: createWebHistory(),
   routes,
   scrollBehavior(to: any, from: any) {
     if (to.path !== from.path) {
       return { top: 0 };
     }
   },
 };
 
 const router = createRouter(routerConfig as RouterOptions);
 
 export default router;
