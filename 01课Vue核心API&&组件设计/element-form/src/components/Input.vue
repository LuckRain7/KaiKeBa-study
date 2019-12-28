<template>
  <div>
    <input type="text" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["value"],
  methods: {
    onInput(e) {
        let value = e.target.value
        this.$emit('input',value)
    }
  }
};
</script>

<style></style>
