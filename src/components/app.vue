<template lang="pug">
  .app
    transition-group(name="disc" class="discs" tag="div")
      .base(key="base")
      .peg(v-for="i in 3" :class="`peg peg--${i}`" :key="`peg-${i}`")
      template(v-for="(peg, i) in pegs")
        disc(
          v-for="(disc, j) in peg"
          :size="disc"
          :key="disc"
          :class="`disc--height-${peg.length - j} disc--peg-${i}`"
        )
    .buttons
      start-button.start-button
      reset-button.reset-button
      disc-selector.disc-selector
    interval-selector
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  import Disc from './disc';
  import StartButton from './start-button';
  import DiscSelector from './disc-selector';
  import IntervalSelector from './interval-selector';
  import ResetButton from './reset-button';

  export default {
    name: 'App',
    components: {
      Disc,
      StartButton,
      DiscSelector,
      IntervalSelector,
      ResetButton,
    },
    data() {
      return {
        timeoutID: null,
      };
    },
    computed: mapState(['pegs', 'started', 'solver', 'transitionInterval']),
    methods: {
      ...mapMutations(['move']),
      queueNextMove() {
        this.timeoutID = setTimeout(() => {
          this.nextMove();
        }, this.transitionInterval);
      },
      nextMove() {
        const { value, done } = this.solver.next();
        if (!done) {
          this.move(value);
          this.queueNextMove();
        }
      },
    },
    watch: {
      started(toStart) {
        if (toStart && !this.timeoutID) {
          this.nextMove();
        } else {
          clearTimeout(this.timeoutID);
          this.timeoutID = null;
        }
      },
      transitionInterval: {
        handler: function(interval) {
          document.documentElement.style
            .setProperty('--interval', `${interval}ms`);
          if (this.started) {
            clearTimeout(this.timeoutID);
            this.queueNextMove();
          }
        },
        immediate: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .app {
    border: 1px solid #000;
    border-radius: 6px;
    width: 95%;
    max-width: 400px;
    margin: 20px auto 0;
    padding: 20px 40px;
    box-shadow:
      0 1px 3px -2px rgba(0, 0, 0, .2),
      0 2px 2px 0 rgba(0, 0, 0, .14),
      0 5px 1px 0 rgba(0, 0, 0, .12);
  }
  .discs {
    height: 140px;
    position: relative;
  }
  .disc-move {
    transition: transform var(--interval, 1s) cubic-bezier(.4, 0, .2, 1);
  }
  .base {
    position: absolute;
    width: 100%;
    bottom: 10px;
    height: 10px;
    background-color: #ccc;
  }
  .peg {
    position: absolute;
    top: 0;
    width: 5px;
    height: 120px;
    background-color: #666;

    @for $i from 1 through 3 {
      &--#{$i} {
        left: 47.5px + 110px * ($i - 1);
      }
    }
  }
  .buttons {
    display: flex;
  }
  .start-button,
  .reset-button,
  .disc-selector {
    flex: 1;
  }
</style>
