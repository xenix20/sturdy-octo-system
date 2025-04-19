<template>
  <!--<router-link to="/">Home</router-link> -->

  <div v-if="isAuth" class="header">
    <div style="display: flex; align-items: center;">
      <img src="@/assets/logo.png">
      <span style="margin-left: 32px">Мои сотрудники</span>
    </div>
    <div>
        <span>{{ currentUser.Lastname }} {{ currentUser.Firstname[0] }}. {{ currentUser.Surname[0] }}.</span>
        <button style="margin-left: 9px" @click="Logout">Выйти</button>
    </div>
  </div>

  <notifications />
  <div style="padding: 32px;">
    <router-view />
  </div>
</template>


<script>
export default  {
  provide() {
    return {currentUser: this.currentUser}
  },  
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated
    },
    currentUser() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    Logout() {
      this.$store.dispatch("logout");
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.header img {
  width: 48px;
}
.header {
  width: 100%;
  border-bottom: 1px solid black;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 12px;
  justify-content: space-between;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
