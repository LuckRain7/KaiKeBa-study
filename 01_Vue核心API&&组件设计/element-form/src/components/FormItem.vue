<template>
  <div>
    <label for="">{{ label }}</label>
    <div>
      <!-- 插槽 -->
      <slot></slot>
      <p v-if="errStatus">{{ errMessage }}</p>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['KForm'],
  data() {
    return {
      errMessage: '',
      errStatus: false
    }
  },
  props: ['label', 'prop'],
  mounted() {
    this.$on('validate', this.validator)
  },

  methods: {
    validator() {
      // 进行校验
      const rules = this.KForm.rules[this.prop]
      const value = this.KForm.model[this.prop]
      const descriptor = { [this.prop]: rules }
      const schema = new Schema(descriptor)
      schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errMessage = errors[0].message
          this.errStatus = true
        } else {
          this.errMessage = ''
          this.errStatus = false
        }
      })
    }
  }
}
</script>

<style></style>
