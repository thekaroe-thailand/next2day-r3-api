const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});
// node --watch server.js
// http://localhost:3001/api/users
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
    ];
    res.json(users);
});
// :id = ค่าที่จะส่งไปใน url
// http://localhost:3001/api/users/2/kob
app.get('/api/users/:id/:name', (req, res) => {
    const users = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
    ];
    const id = parseInt(req.params.id); // ดึงค่า id จาก url มาใช้งาน
    const user = users.find(user => user.id === id); // ค้นหา user ที่มี id ตรงกับค่า id ที่ส่งไป
    if (!user) { // ถ้าไม่มี user ที่ต้องการจะให้ return ค่า 404
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // ถ้ามี user ที่ต้องการจะให้ return ค่า user
});
app.post('/api/users/create', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    res.json({ id: id, name: name });
});
app.put('/api/users/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    res.json({ id: id, name: name });
});
app.delete('/api/users/delete/:id', (req, res) => {
    const id = req.params.id;

    res.json({ id: id });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


