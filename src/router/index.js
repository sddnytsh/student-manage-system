import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import StudentView from '@/views/StudentView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/student',
    name: 'student',
    component: StudentView,
    meta: { requiresAuth: true },
    redirect: '/student/home',
    children: [
      { path: 'home', component: () => import('@/views/StudentHomeView.vue') },
      { path: 'courses', component: () => import('@/views/StudentCoursesView.vue') },
      { path: 'grades', component: () => import('@/views/StudentGradesView.vue') },
      { path: 'profile', component: () => import('@/views/StudentProfileView.vue') },
      { path: 'contact', component: () => import('@/views/ContactView.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export const roleRoutes = {
  student: [
    {
      path: '/student',
      component: () => import('@/views/StudentView.vue') //,
      // children: [
      //   { path: 'home', component: () => import('@/views/student/Home.vue') },
      //   { path: 'courses', component: () => import('@/views/student/Courses.vue') },
      //   { path: 'grades', component: () => import('@/views/student/Grades.vue') }
      // ]
    }
  ] //,
  // teacher: [
  //   {
  //     path: '/teacher',
  //     component: () => import('@/views/TeacherView.vue'),
  //     children: [
  //       { path: 'dashboard', component: () => import('@/views/teacher/Dashboard.vue') }
  //     ]
  //   }
  // ]
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
