<template>
  <div id="app">
    <div v-if="loggedIn" class="navigation">
      <md-toolbar class="md-accent navigation-title" md-elevation="5">
        <h3>Geomon IoT Portal</h3>
      </md-toolbar>
      <md-toolbar class="md-primary navigation-toolbar" md-elevation="5">
        <breadcrumb/>
        <div class="navigation-user-info">
          <div class="user-info">
            <div>{{firstName}} {{lastName}}</div>
            <div class="user-mail">{{mail}}</div>
          </div>
          <md-menu md-size="auto" :md-offset-y="20" :mdCloseOnClick="true">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>expand_more</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item v-if="manageable">
                <md-icon>admin_panel_settings</md-icon>
                <router-link :to="{ name: 'ManageInstallations' }" class="navigation-menu-item">System management</router-link>
              </md-menu-item>
              <md-menu-item>
                <md-icon>manage_accounts</md-icon>
                <router-link :to="{ name: 'Informations' }" class="text-decoration: none">Account settings</router-link>
              </md-menu-item>
              <md-menu-item>
                <md-icon>logout</md-icon>
              <router-link :to="{ name: 'Logout' }" class="text-decoration: none">Log out</router-link>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-toolbar>
    </div>
    <router-view v-if="loggedIn === false"></router-view>
    <router-view v-else-if="isMounted" style="position: fixed; top: 80px; width: 100%;" @updateUserInfo="updateUserInfo" @updateAbility="updateAbility"></router-view>
  </div>
</template>

<style scoped>
element {
  --navigation-bar-height: 80px;
}

.router{
  position: fixed;
  top: var(--navigation-bar-height);
}

.navigation{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: stretch;
  height: var(--navigation-bar-height);
  width: 100%;
}

.navigation-title{
  min-width: 300px;
  max-width: 300px;
  justify-content: center;
}

.navigation-toolbar{
  display: flex;
  justify-content: space-between;
}

.navigation-user-info{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  line-height: normal;
  margin-right: 20px;
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
}

.user-mail {
  font-size: 0.7em;
}

.navigation-menu-item{
  text-decoration: none;
}
</style>

<script>
import Breadcrumb from './components/template/Breadcrumb'

export default {
    name: 'App'
,
components: {
    Breadcrumb
  },
  data (){
    return{
      firstName:'',
      lastName:'',
      mail:'',
      isMounted : false,
      manageable : false
    }
  },
  created(){
    this.updateUserInfo()
    this.updateAbility()
    this.isMounted = true
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  methods:{
    updateUserInfo(){
      this.firstName = this.$store.getters.getFirstName;
      this.lastName = this.$store.getters.getLastName;
      this.mail = this.$store.getters.getMail;
    },
    updateAbility(){
      this.$store.commit('setAbility')
      this.manageable = this.$store.getters.getAbility.can('manage','organization') || this.$store.getters.getAbility.can('manage','all')
      return true;
    }
  }
}
</script>
