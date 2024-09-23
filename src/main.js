import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import AOS from 'aos';
import 'aos/dist/aos.css';

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

// import Login from "@/views/auth/Login.vue";
// import Register from "@/views/auth/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";

// User View
import UserMainPage from "@/views/user/userHomepage.vue";
import UserRewardPage from "@/views/user/userReward.vue";
import UserFoodPage from "@/views/user/userFoodNBeverage.vue";
import UserFacilityPage from "@/views/user/userBookFacility.vue";
import UserEventPage from "@/views/user/userEventNPromotion.vue";

import UserFacilitySchedule from "@/views/user/BookFacility/userFacilitySchedule.vue";
import UserFacilityBooking from "@/views/user/BookFacility/userFacilityBookingDetails.vue";
import UserBookingPayment from "@/views/user/BookFacility/userFacilityBookingPayment.vue";
import Test from "@/views/user/BookFacility/test.vue";

import UserProfilePage from "@/views/user/myProfile.vue";
import UserBookingHistory from "@/views/user/userBookingHistory.vue";
import FoodMenu from "@/views/user/MenuPage/userFoodMenu.vue";

import UserRegister from "@/views/auth/UserRegister.vue";
import UserLogin from "@/views/auth/UserLogin.vue";

//Admin Pages
import Facilities from "@/views/admin/FacilityTable.vue";
import Events from "@/views/admin/EventTable.vue";
import EditUser from "@/views/admin/EditUserPage.vue";
import EditEvent from "@/views/admin/EditEventPage.vue";
import CreateEvent from "@/views/admin/CreateEventPage.vue";
import EditFacility from "@/views/admin/EditFacilityPage.vue"
import CreateFacility from "@/views/admin/CreateFacilityPage.vue";


//Plugin


// routes

const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        name: "adminDashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
      //Start From Here
      {
        path: "/admin/facilities",
        component: Facilities,
      },
      {
        path: "/admin/events",
        component: Events,
      },
      {
        path: "/admin/editUser",
        name: "EditUser",
        component: EditUser,
      },
      {
        path: "/admin/editEvent",
        name: "EditEvent",
        component: EditEvent,
      },
      {
        path: "/admin/createEvent",
        name: "CreateEvent",
        component: CreateEvent,
      },
      {
        path: "/admin/editFacility",
        name: "EditFacility",
        component: EditFacility,
      },
      {
        path: "/admin/createFacility",
        name: "createFacility",
        component: CreateFacility,
      },
    ],
  },

  //Authentication Default
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: UserLogin,
      },
      {
        path: "/auth/register",
        name: "userRegister",
        component: UserRegister,
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },

  // Start From Here
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
  {
    path: "/",
    name: "main",
    component: UserMainPage,
  },
  {
    path: "/reward",
    name: "reward",
    component: UserRewardPage,
    beforeEnter: (to, from, next) => {
      const isLoggedIn = localStorage.getItem('memberID'); // Assuming 'memberID' is stored when logged in
      if (isLoggedIn) {
        next();
      } else {
        alert('Please login to access reward page');
        next(false); // Prevent navigation
      }
    },

  },
  {
    path: "/foodandbeverage",
    name: "food&beverage",
    component: UserFoodPage,
  },
  {
    path: "/facilities",
    name: "facilities",
    component: UserFacilityPage,
  },
  {
    path: "/Scheduler",
    name: "Scheduler",
    component: UserFacilitySchedule,
  },
  {
    path: "/Booking",
    name: "Booking",
    component: UserFacilityBooking,

  },
  {
    path: "/BookingPayment",
    name: "BookingPayment",
    component: UserBookingPayment,

  },
  {
    path: "/eventandpromotion",
    name: "event&promotion",
    component: UserEventPage,
  },
  {
    path: "/myProfile",
    name: "myProfile",
    component: UserProfilePage,

  },
  {
    path: "/bookingHistory",
    name: "bookingHistory",
    component: UserBookingHistory,

  },
  {
    path: "/foodMenu",
    name: "foodMenu",
    component: FoodMenu,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);



app.mount("#app");

AOS.init();

// createApp(App).use(router).mount("#app");
