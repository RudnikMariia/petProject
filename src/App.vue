<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>


export default {
  name: 'App'
}
</script>

<style>
#app {
  min-height: 100vh;
  background: #D3E7E4;
  font-family: "Montserrat", sans-serif;
  color: #023636;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
</style>
