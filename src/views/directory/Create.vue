<template>
  <fields :check-page="checkPage"></fields>
</template>

<script>
import Fields from "./Fields";

export default {
name: "Create",
  data() {
    return  {
      checkPage : 'create'
    }
  },
  components: {
    Fields,
  }
}
</script>

<style scoped>

</style>