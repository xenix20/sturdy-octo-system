const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
let database = null;

app.get("/", async (req, res) => {
    let users = ( await database.query("select * from users"))[0];
    let jobs  = ( await database.query("select * from jobs"))[0];
    res.json(users.map(x=>{ return{...x, job: jobs.find(y=>y.id == x.job)}}));
});

app.post("/login", async (req, res) => {
    let data = req.body;
    console.log(data)
    let user = ( await database.query("select * from employes where Email = ? and PassportSerial = ?", [data.login, data.password]))[0][0];

    if(!user?.Id) res.status(401).json({msg: "Неверные учетные данные"});
    let role = ( await database.query("select * from roles where Id = ? ", [user.Role]))[0][0];
    let company = ( await database.query("select * from companies where Id = ? ", [user.CompanyId]))[0][0];
    let job = ( await database.query("select * from jobs where Id = ? ", [user.JobId]))[0][0];

    res.json({...user, role: role,company,job})
});

app.get('/employes', async (req, res) => {
    let users = ( await database.query("select * from employes",))[0];

    let companies = ( await database.query("select * from companies  ",))[0];
    let jobs = ( await database.query("select * from jobs ",))[0];

    res.json(users.map(x=> {return {
        ...x,
        Company: companies.find(y=>y.Id == x.CompanyId),
        Job: jobs.find(y=>y.Id == x.JobId),
    }}));
});

function locaze(date) {
let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
return (`${year}-${month}-${day}`);
}

app.get('/employe/:id', async (req, res) => {
    let users = ( await database.query("select * from employes where id = ?", [req.params.id]))[0];

    let companies = ( await database.query("select * from companies  ",))[0];
    let jobs = ( await database.query("select * from jobs ",))[0];

    res.json(users.map(x=> {return {
        ...x,
        Accepted: locaze(x.Accepted),
        Company: companies.find(y=>y.Id == x.CompanyId),
        Job: jobs.find(y=>y.Id == x.JobId),
    }})[0]);
});



app.put('/employe/:id', async (req, res) => {
    let data = req.body;


    await database.query("update employes set Firstname = ?, Surname = ?, Lastname = ?, PassportSerial = ?, PassportNumber = ?, Address = ?, CompanyId = ?, JobId = ?, Phone = ?, Email = ?, Accepted = ? where Id = ?",
        [
            data.Firstname ,
            data.Surname ,
            data.Lastname ,
            data.PassportSerial ,
            data.PassportNumber ,
            data.Address ,
            data.CompanyId ,
            data.JobId ,
            data.Phone ,
            data.Email ,
            data.Accepted,
            req.params.id
        ]);


    res.json({ok: 1});
});





app.delete('/employe/:id', async (req, res) => {
    await database.query("delete from employes where id = ?", [req.params.id])
    res.json({ok: 1});
});


app.get('/jobs', async (req, res) => {
    let users = ( await database.query("select * from jobs",))[0];

    res.json(users)
});


app.get('/companies', async (req, res) => {
    let users = ( await database.query("select * from companies",))[0];

    res.json(users)
});

app.listen(port, async () => {
    database = await db.connect();
    console.log(`[#] backend server started on ${port} `)
});