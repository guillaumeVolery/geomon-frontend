<template>
  <md-list-item md-expand>
    <span class="md-list-item-text">Rover {{rover.system_id}}</span>

    <md-list slot="md-expand">
      <md-list-item :to="{ name: 'RoverOverview', params: { roverid: rover.system_id }}" class="md-inset">Overview</md-list-item>
      <md-list-item :to="{ name: 'RoverEvent', params: { roverid: rover.system_id }}" class="md-inset disabled">Events</md-list-item>
    </md-list>
  </md-list-item>
</template>

<script>
export default {
    name: 'rover-item',
    props:{
      rover: {
          type: Object,
          required : true
      }
    }
}
</script>