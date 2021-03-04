<template>
  <div class="color-swatch" :class="{ selected: selected }">
    <div
      class="color-swatch-inner"
      :style="{ 'background-color': colorCode }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    selected: Boolean
  },
  computed: {
    colorCode() {
      switch (this.color) {
        case 'Light Gray':
          return '#b4abab'
        case 'Light Brown':
          return '#e6dabf'
        case 'Brown':
          return '#D2691E'
        case 'Blue':
          return '#719ec5'
        case 'Blue Gray':
          return '#627579'
        case 'Black':
          return '#292929'
        default:
          return '#fff'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.color-swatch {
  align-self: center;
  width: 12px;
  height: 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.color-swatch-inner {
  width: 8px;
  height: 8px;
  border-radius: 16px;
}
.selected {
  border: 1px solid gray;
}
</style>
