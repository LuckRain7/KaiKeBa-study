<template>
  <div id="app">
    <div id="nav">
      <router-link to="/a">pageA</router-link> |
      <router-link to="/a/1">/a/1</router-link> |
      <router-link to="/a/2">/a/2</router-link> |
      <router-link to="/b">pageB</router-link> |
      <router-link :to="{ name: 'pageA' }">{name:'pageA'}</router-link>
    </div>
    <router-view />
    <router-view name="david" />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
