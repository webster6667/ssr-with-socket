import {Main, Profile, Login} from "@pages";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Main
  },
  {
    path: "/profile",
    component: Profile,
    isLockForGuest: true
  },
  {
    path: "/login",
    component: Login,
    isLockForAuth: true,
    redirectUrl: '/profile'
  }
];
