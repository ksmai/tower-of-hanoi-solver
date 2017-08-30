<template lang="pug">
  .selector
    label.label {{transitionInterval | msToS}}
    .input-wrapper
      input.input(
        type="range"
        max="3000"
        min="100"
        step="100"
        :value="transitionInterval"
        @input="handleInput"
      )
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'IntervalSelector',
    computed: mapState(['transitionInterval']),
    filters: {
      msToS(ms) {
        return (Number(ms) / 1000).toFixed(2) + 's';
      },
    },
    methods: {
      ...mapMutations(['updateInterval']),
      handleInput(evt) {
        this.updateInterval({
          interval: parseInt(evt.target.value, 10) || 0,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .selector {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .label {
    margin-right: 20px;
  }
  .input-wrapper {
    flex: 1;
  }
  .input {
    width: 100%;
  }
</style>
