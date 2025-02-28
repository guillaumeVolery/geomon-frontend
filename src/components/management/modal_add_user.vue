<template>
  <div class="modal-backdrop">
    <div class="modal">
        <header class="modal-header">
        <div name="header">
          <h1 v-if="!isAdmin" class="installation-title">Add user</h1>
          <h1 v-if="isAdmin" class="installation-title">Add Responsible</h1>
        </div>
          <button type="button" class="btn-close" @click="close"><font-awesome-icon class="close" icon="times" size="2x"/></button>
      </header>
      <section class="modal-body">
        <div name="body">
          <form novalidate class="md-layout" @submit.prevent="onSubmit" style="display: flex;align-content: space-around; flex-direction: column; justify-content: center;">
            <md-field :class="getValidationClass('selected_user')" class="multi-input"  style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="name">Select a user to add : </label>
              <multiselect  v-model="selected_user" :options="users" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this user" deselect-label="Remove this user" track-by="id" :searchable="false" :close-on-select="true" :class="{ 'hasError': $v.selected_user.$error }"></multiselect> 
              <span class="md-error" v-if="!$v.selected_user.required">You must select a user</span>
            </md-field>
            <md-field v-if="isAdmin" class="multi-input"  style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="organizations">Is organization admin for</label>
              <multiselect disabled v-model="organization_selected" :options="organization" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this organization" deselect-label="Remove this organization" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" ></multiselect> 
            </md-field>
            <md-field :class="getValidationClass('final_groups_selected')" class="multi-input"  style="width: 300px; margin-right: 50px; margin-left: 50px;">
              <label for="groups">User's group</label>
              <multiselect v-model="final_groups_selected" :disabled="isAdmin || group_id !=null ? true : false" :options="groups" label="name" :showLabels="true"  selectedLabel="Selected" selectLabel="Select this group" deselect-label="Remove this group" track-by="id" :taggable="true" :searchable="false" :close-on-select="true" :multiple="true" :class="{ 'hasError': $v.final_groups_selected.$error }"></multiselect> 
              <span class="md-error" v-if="!$v.selected_user.required">You must select a group</span>
            </md-field>
          </form>
        </div>
      </section>
      <md-dialog-actions>
        <md-button class="md-primary"  @click.prevent="onUpdate">Add user</md-button>
      </md-dialog-actions>
    </div>
  </div>
</template>

<script>
import API from '../../http-constants'
import { required } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'

  export default {
    name: 'add-user',
    props:{
      isAdmin : Boolean,
      organization_id : String,
      group_id : String
  },
    components:{
        Multiselect
    },
    data(){
        return{
          selected_user : '',
            users : [],
            final_groups_selected : [],
            errorMessage: '',
            errors: [],
            responseMessage: '',
            groups : [],
            organization : [],
            organization_selected : [],
        }
    },
    validations: {
        selected_user:{
          required
        },
        final_groups_selected:{
          required
        }
   },
    async created(){
        await this.getUsers()
        if(this.group_id == null){
          await this.getOrganizations()
        }
        else{
          await this.getGroups()
        }
        this.setSelectedGroups()
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getUsers(){
          var url = ''
          if(this.group_id == null){
            if(this.isAdmin)
              url = '/api/availableAdminsForOrganization/'+this.organization_id
            else
              url = '/api/availableUsersForOrganization/'+this.organization_id
          }
          else{
            url = '/api/availableUsersForGroup/'+this.group_id
          }
          return API.get(url)
          .then(response => {
                this.users = response.data
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      getOrganizations(){
          var url = ''
          url = '/api/organizationWithGroups/'+this.organization_id
          return API.get(url).then(response => {
                this.organization = [response.data]
                if(this.isAdmin)
                  this.organization_selected = this.organization
                this.groups = response.data.groups
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      getGroups(){
          var url = ''
          url = '/api/getGroupWithOrganization/'+this.group_id
          return API.get(url).then(response => {
                this.groups = [response.data]
                this.organization = response.data.organization
            })
            .catch(e => {
                this.errorMessage = e
            })
      },
      setSelectedGroups(){
        if(this.isAdmin){
            this.groups.forEach(group => {
              group['$isDisabled'] = true
            });
        }
        this.final_groups_selected = this.groups
      },
      addUser: function (){
          var newUserOrganizationRelations = []
          this.organization_selected.forEach(group => {
              var pivot = {
                  'user_id':this.selected_user.id,
                  'organization_id' :group.id
              }
              newUserOrganizationRelations.push(pivot);
          });
          var newUserGroupRelations = []
          this.final_groups_selected.forEach(group => {
              var pivot = {
                  'user_id':this.selected_user.id,
                  'group_id' :group.id
              }
              newUserGroupRelations.push(pivot);
          });
          API.post('/api/addUserOrganizations',{'user_id':this.selected_user.id,'userorganizations' : newUserOrganizationRelations})
          .then(response => {
                API.post('/api/addUserGroups',{'user_id':this.selected_user.id,'usergroups' : newUserGroupRelations})
                .then(response => {
                      this.responseMessage = response.data
                      this.$emit('close');
                      this.$emit('updateList');
                      this.$emit('displaySuccess','added',true,'User')
                  })
                  .catch(e => {
                      this.errorMessage = e
                      this.$emit('close');
                      this.$emit('displaySuccess','added',false,'User')
                  })
            })
            .catch(e => {
                this.errorMessage = e
                this.$emit('close');
                this.$emit('displaySuccess','update',false,'User')
            })
      },
      onUpdate: function() {
          this.$v.$touch();
          if(this.$v.$error) return
          this.addUser();
      },
      getValidationClass (fieldName) {
        const field = this.$v[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      }
    },
  };
</script>