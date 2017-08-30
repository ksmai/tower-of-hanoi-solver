<template lang="pug">
  select(@input="handleInput")
    option(
      v-for="option in options"
      :value="option"
      :key="option"
    ) {{option}}
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return {
        options: [5, 6, 7, 8, 9, 10],
      };
    },
    methods: {
      ...mapMutations(['reset']),
      handleInput(evt) {
        this.reset({ nDiscs: parseInt(evt.target.value, 10) });
      },
    },
  };
</script>
