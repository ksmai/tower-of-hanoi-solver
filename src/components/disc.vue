<template lang="pug">
  .disc(:class="`disc--size-${size}`")
    .visible-disc
</template>

<script>
  export default {
    name: 'Size',
    props: {
      size: {
        type: Number,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .disc {
    height: 10px;
    width: 100px;
    display: inline-block;
    position: absolute;

    .visible-disc {
      height: 100%;
      border-radius: 5px;
      border: 1px solid #000;
    }

    @for $i from 1 through 10 {
      &--size-#{$i} {
        z-index: 11 - $i;

        .visible-disc {
          width: 20px + 8px * $i;
          margin: auto;
          background: darken(#ddd, 5% * $i);
          background: linear-gradient(
            to right, 
            darken(#ddd, 5% * ($i - 1)),
            darken(#ddd, 5% * ($i + 2))
          );
        }
      }
      &--height-#{$i} {
        bottom: 10px + 10px * $i;
      }
    }

    @for $i from 0 through 2 {
      &--peg-#{$i} {
        left: 110px * $i;
      }
    }
  }
</style>
