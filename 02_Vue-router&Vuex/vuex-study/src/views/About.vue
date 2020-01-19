<template>
  <div>
    <button @click="increment">+</button>
    {{ $store.state.count }}
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: mapActions(['increment', 'decrement'])
}
</script>

<style></style>
