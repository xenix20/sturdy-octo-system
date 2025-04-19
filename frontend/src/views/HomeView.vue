<template>
  <div class="home">
    <h2>Список сотрудников</h2>

    <div>

      <span>Поиск</span>
      <input type="text" v-model="filter.search" />
    </div>

    <div>
      <span>Должность</span>
      <select v-model="filter.job" v-if="jobs">
        <option v-for="n in jobs" :key="n._id" :value="n.Id" :text="n.Name"></option>
      </select>
    </div>

    <table style="margin-top: 8px" v-if="employes != undefined">
      <thead>

        <tr>
          <th scope="col">УИД</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
          <th scope="col">Паспорт номер/серия</th>
          <th scope="col">Адресс</th>
          <th scope="col">Компания</th>
          <th scope="col">Должность</th>
          <th scope="col">Номер телефона</th>
          <th scope="col">Почта</th>
          <th scope="col">Дата приема на работу</th>
          <th scope="col">Уже проработал</th>
          <th scope="col">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in employesList" :key="n._id">
          <td>{{ n.Id }}</td>
          <td>{{ n.Lastname }}</td>
          <td>{{ n.Firstname }}</td>
          <td>{{ n.Surname }}</td>
          <td>{{ n.PassportSerial }} / {{ n.PassportNumber}}</td>
          <td>{{ n.Address }}</td>
          <td>{{ n.Company?.Name }}</td>
          <td>{{ n.Job?.Name }}</td>
          <td>{{ n.Phone }}</td>
          <td>{{ n.Email }}</td>
          <td>{{ locaze(new Date(n.Accepted))}}</td>
          <td>{{ CalculateDays(n.Accepted) }} дней</td>

          <td class="actions">
            <button @click="Delete(n.Id)" v-if="currentUser?.Role == 1000">Удалить</button>
            
            <a :href="`/edit/${n.Id}`">
              <button>Изменить</button>
            </a>
            
          </td>
        </tr>
        
      </tbody>
     
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      jobs: undefined,
      filter: {
        search: undefined,
        job: undefined,
      },
      employes: undefined
    }
  },
  methods: {
    locaze(date) {
let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
return (`${day}.${month}.${year}`);
},
    CalculateDays(dn) {
      let x1 = new Date(dn);
      let x2 = Date.now();
      console.log(x2)
      return Math.round((x2 - x1) / (1000 * 60 * 60 * 24));
    },
    async sync() {

      try {
      let res = await axios.get("http://10.10.3.24:3000/employes");
      this.employes = res.data;


      let s = await axios.get("http://10.10.3.24:3000/jobs");
      this.jobs = s.data;

    }catch(e) {
        this.$notify({type: 'error', title: e.response.data.msg || "Не удалось соединится с сервером"});
      }
    },
    async Delete(id) {
      if (confirm('Вы дейстивтельно хотите удалить данного сотрудника?')) {
        try {
          await axios.delete(`http://10.10.3.24:3000/employe/${id}`);
          this.$notify({type: "success", text: "Сотрудник удален", title: "Успешный запрос"})
   await this.sync();

  }catch(e) {
        this.$notify({type: 'error', title: e.response.data.msg || "Не удалось соединится с сервером"});
      }
        }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.getUser
    },
    employesList() {
          let p1 = this.employes;
          if(this.filter.search) 
            p1 = p1.filter(x => x.Lastname.toLowerCase().includes(this.filter.search?.toLowerCase()) || x.Firstname.toLowerCase().includes(this.filter.search?.toLowerCase()) || x.Surname.toLowerCase().includes(this.filter.search?.toLowerCase()));

          if(this.filter.job) 
            p1 = p1.filter(x => x.JobId == this.filter.job);

            return p1;
          }
    },

  async created() {
   await this.sync();
  }
};
</script>



<style scoped>
.actions {
  display: flex;
  flex-direction: column;
  gap: 9px
}
table {
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
  width: 100%;
}

caption {
  caption-side: bottom;
  padding: 10px;
  font-weight: bold;
}


th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

tbody > tr:nth-of-type(even) {
  background-color: rgb(237 238 242);
}

tfoot th {
  text-align: right;
}

tfoot td {
  font-weight: bold;
}
</style>