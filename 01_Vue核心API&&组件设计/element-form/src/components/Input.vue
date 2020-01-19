<template>
  <div>
    {{someval}}
    <input :type="type" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  inject: ["someval"],
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput(e) {
      let value = e.target.value;
      this.$emit("input", value);
      this.$parent.$emit('validate')
    }
  }
};
</script>

<style></style>
