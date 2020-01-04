<template>
  <div>
    this is pageB
    <br />
    {{ $route.params.id }}
    <br />
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
