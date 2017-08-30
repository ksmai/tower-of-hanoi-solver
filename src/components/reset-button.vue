<template lang="pug">
  button(type="button" @click="reset") Reset
</template>

<script>
  export default {
    name: 'ResetButton',
    computed: {
      nDiscs() {
        return this.$store.getters.nDiscs;
      },
    },
    methods: {
      reset() {
        this.$store.commit('reset', { nDiscs: this.nDiscs });
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
