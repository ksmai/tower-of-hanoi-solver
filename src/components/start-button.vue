<template lang="pug">
  button.start-button(@click="toggleStart" :disabled="done") {{text}}
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'StartButton',
    computed: {
      ...mapState(['started']),
      ...mapGetters(['done']),
      text() {
        return this.started ? 'Pause' : 'Start';
      },
    },
    methods: {
      ...mapMutations(['start', 'pause']),
      toggleStart() {
        if (this.started) {
          this.pause();
        } else {
          this.start();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
