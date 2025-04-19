<template>
    <div>
        <a href="/">Назад к списку</a>
        <br>
        <h1>Изменить сотрудника</h1>
        <div class="form" v-if="data">
            <span>Фамилия</span>
        <input type="text" v-model="data.Lastname" placeholder="">
        <span>Имя</span>
        <input type="text" v-model="data.Firstname" placeholder="">
        <span>Отчество</span>
        <input type="text" v-model="data.Surname" placeholder="">
        <span>паспорт серия</span>
        <input type="text" v-model="data.PassportSerial" placeholder="">
        <span>Паспорт номер</span>
        <input type="text" v-model="data.PassportNumber" placeholder="">
        <span>Адресс</span>
        <input type="text" v-model="data.Address" placeholder="">
        <span>Компания</span>
        <select v-model="data.CompanyId" v-if="companies">
        <option v-for="n in companies" :key="n._id" :value="n.Id" :text="n.Name"></option>
      </select>

        <span>Должность</span>
        <select v-model="data.JobId" v-if="jobs">
        <option v-for="n in jobs" :key="n._id" :value="n.Id" :text="n.Name"></option>
      </select>

        <span>Номер телефона</span>
        <input type="text" v-model="data.Phone" placeholder="">
        <span>Почта</span>
        <input type="email" v-model="data.Email" placeholder="">

        <span>Дата приема</span>
        <input type="text" v-model="data.Accepted" placeholder="">
        </div>
        
     

        <button @click="save">Сохранить</button>
    </div>
</template>


<script>
import axios from "axios";

export default {
    methods: {
        async save() {
            try {
               await axios.put(`http://10.10.3.24:3000/employe/${this.$route.params.id}`, this.data);
                this.$notify({type: 'success', title: "Успешно сохранено"});
                this.$router.push('/')

            }catch(e) {
        this.$notify({type: 'error', title: e.response.data.msg || "Не удалось соединится с сервером"});
      }

        },
     
    },
    data() {
        return {
            data: undefined,
            companies: undefined,
            jobs: undefined,
        }
    },
    async created() {
        try {
      let res = await axios.get(`http://10.10.3.24:3000/employe/${this.$route.params.id}`);
      this.data = res.data;


      let s1 = await axios.get("http://10.10.3.24:3000/jobs");
      this.jobs = s1.data;


      let s2 = await axios.get("http://10.10.3.24:3000/companies");
      this.companies = s2.data;

    }catch(e) {
        this.$notify({type: 'error', title: e.response.data.msg || "Не удалось соединится с сервером"});
      }
    }
}
</script>

<style>
.form {
    display: flex;
    gap: 8px;
    flex-direction: column;
}</style>