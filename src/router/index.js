import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Logout from '@/components/auth/Logout'
import Register from '@/components/auth/Register'
import Overview from '@/components/installation/installation_overview'
import Manage from '@/components/installation/installation_manage'
import OverviewStation from '@/components/base_station/basestation_overview'
import ConfigurationStation from '@/components/base_station/basestation_config'
import Informations from '@/components/account/account_information'
import AccountLocation from '@/components/account/account_location'
import Password from '@/components/account/account_pwd'
import ManageInstallations from '@/components/management/manage_installations'
import ManageUsers from '@/components/management/manage_users'
import ManageGroup from '@/components/management/manage_group'
import ManageOrganization from '@/components/management/manage_organization'

Vue.use(Router)


var ManageOrganizationsRoute =  {
  path: '/management/organizations',
  name: 'ManageOrganization',
  component: ManageOrganization,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Organization'}] 
  }
}

var ManageGroupsRoute =  {
  path: '/management/groups',
  name: 'ManageGroup',
  component: ManageGroup,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Group'}] 
  }
}

var ManageInstallationsRoute =  {
  path: '/management/installations',
  name: 'ManageInstallations',
  component: ManageInstallations,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Installations'}] 
  }
}

var ManageUsersRoute =  {
  path: '/management/users',
  name: 'ManageUsers',
  component: ManageUsers,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Management'},{name:'Users'}] 
  }
}

var InformationsRoute =  {
  path: '/account-settings/informations',
  name: 'Informations',
  component: Informations,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Personal informations'}] 
  }
}

var LocationRoute =  {
  path: '/account-settings/location',
  name: 'Location',
  component: AccountLocation,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Location'}] 
  }
}

var PwdRoute =  {
  path: '/account-settings/password',
  name: 'Password',
  component: Password,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Account settings'},{name:'Password'}] 
  }
}

var OverviewRoute =  {
  path: '/overview',
  name: 'Overview',
  component: Overview,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Overview'}] 
  }
}

var ManageRoute =  {
  path: '/manage',
  name: 'Manage',
  component: Manage,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Installation'},{name:'Manage'}] 
  }
}

var OverviewStationRoute =  {
  path: '/basestation/overview',
  name: 'OverviewStation',
  component: OverviewStation,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Overview'}] 
  }
}

var ConfigStationRoute =  {
  path: '/basestation/configuration',
  name: 'ConfigurationStation',
  component: ConfigurationStation,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name: 'Home', link: '/' },{name:'Base station'},{name:'Configuration'}] 
  }
}

var HomeRoute = {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    requiresAuth: true,
    breadcrumb:[{name:'Home'}] 
  }
}

var LoginRoute = {
  path: '/login',
  name: 'login',
  component: Login,
 
}

var RegisterRoute = 
{
  path: '/register',
  name: 'Register',
  component: Register,
 
}

var LogoutRoute = {
  path: '/logout',
  name: 'Logout',
  component: Logout,
  meta: {
    requiresAuth: true,
  }
}


export default new Router({
  routes: [
    HomeRoute,
    ManageRoute,
    OverviewRoute,
    OverviewStationRoute,
    ConfigStationRoute,
    LoginRoute,
    RegisterRoute,
    LogoutRoute,
    InformationsRoute,
    LocationRoute,
    PwdRoute,
    ManageInstallationsRoute,
    ManageUsersRoute,
    ManageGroupsRoute,
    ManageOrganizationsRoute,
  ]
})
