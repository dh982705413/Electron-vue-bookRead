<template>
  <div class="search-input">
    <slot>
      <a-input-search
        placeholder="请输入书名或作者的关键字"
        enter-button
        @search="onSearch"
        :value="keyword"
        @input="$emit('input', $event.target.value)"
        :class="'input-size-' + size"
      />
    </slot>
    <div>
      <slot name="rightMenu"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-input',
  props: {
    keyword: String,
    size: {
      // large medium mini
      type: String,
      default: 'large'
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_var';
@import '../assets/scss/mixin';
.search-input {
  position: sticky;
  top: 0;
  @include flex(space-between, center);
  height: 50px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 2px solid $inputBorder;
  .input-size-mini {
    width: 300px;
  }
  .input-size-medium {
    width: 500px;
  }
  .input-size-large {
    width: 800px;
  }
}
</style>
