<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
    provide(){
        return {
            KForm:this //将自己的实例传递下去
        }
    },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  }
};
</script>

<style></style>
