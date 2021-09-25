<template>
  <fields :check-page="checkPage" :data="data"></fields>
</template>
<script>
import Fields from "./Fields";

export default {
  name: "Edit",

  props : ['data'],

  data() {
    return {
      checkPage: 'edit'
    }
  },

  components: {
    Fields,
  }
}
</script>