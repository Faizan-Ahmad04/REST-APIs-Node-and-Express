const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const PORT = 80;

//middleware
app.use(express.urlencoded({extended: false}));

app.use((req, res, next)=> {
  console.log('Hello from middleware 1');
  req.myUserName = 'Faizan Ahmad';
  next();
});

app.use((req, res, next) => {
  console.log('Hello from middleware 2',req.myUserName);
  // res. end("Hello from middleware 2");
  next();
})

//Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  // get user
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  // edit user with id
  .patch((req, res) => {
    return res.json({ status: "panding" });
  })
  // delete user with id
  .delete((req, res) => {
    return res.json({ status: "panding" });
  });

  // add news user
  app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (req, res)=> {
        return res.json({status:'sucess', id:users.length+1})
    })
  })

app.listen(PORT, () => console.log(`server Started at Port ${PORT}`));
