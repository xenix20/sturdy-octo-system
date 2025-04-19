<template>
  <div>
    <h1>Войти</h1>
    <input placeholder="Электронная почта" type="text" v-model="data.login" />
    <input placeholder="Серия паспорта" type="password" v-model="data.password" />
    <button @click="Login()">Войти</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      data: {
        login: "",
        password: "",
      },
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },

  methods: {
    async Login() {
      try {

      let res = await axios.post(`http://localhost:3000/login/`, this.data);
      if (!res.data) return this.$notify({type: 'error', title: "Неудачная попытка авторизации!"});

      this.$store.dispatch("login", res.data);
        this.$router.push("/");
      }catch(e) {
        this.$notify({type: 'error', title: e.response.data.msg || "Не удалось соединится с сервером"});
      }
    },

    async doLogin() {
      let res = await axios.post("http://10.10.3.24:3000/login", this.data);
      console.log(res.data);
    },
  },
};
</script>


