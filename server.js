const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

// สร้างตัวแปร expressFileUpload เพื่อใช้งาน express-fileupload
const expressFileUpload = require('express-fileupload');
//
// [/] authentication
//
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json());
app.use(expressFileUpload()); // สำหรับรับ file จาก client
app.use('/images', express.static('uploads'));

// http://localhost:3001/images/Snipaste_2024-08-23_17-55-28.png

//
// [/] controllers
//
const EmployeeController = require('./controllers/EmployeeController');
app.get('/api/employees/list', EmployeeController.list);
app.get('/api/employees/info/:id', EmployeeController.info);
app.post('/api/employees/create', EmployeeController.create);
app.put('/api/employees/update/:id', EmployeeController.update);
app.delete('/api/employees/delete/:id', EmployeeController.delete);
app.get('/api/employees/list-with-relations', EmployeeController.listWithRelations);


app.get('/', (req, res) => {
    res.send('Hello World');
});

//
// [/] authentication
//
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'admin' && password === 'admin') {
        const payload = { id: 100, name: 'kob' }
        const key = process.env.SECRET_KEY;
        const expiresIn = { expiresIn: '1d' }; // 1 วัน
        const token = jwt.sign(payload, key, expiresIn);

        res.json({ token: token });
    } else {
        res.status(401).json({ message: 'user not found' });
    }
})

app.get('/user-info', (req, res) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoia29iIiwiaWF0IjoxNzQyMDk3NTE2LCJleHAiOjE3NDIxODM5MTZ9.0CJ99w9QE10nlwN_KvO-xLkM5oJpNAne93472yjGmgI';
    const key = process.env.SECRET_KEY;

    const decoded = jwt.verify(token, key); // ถอดรหัส token
    res.json(decoded);
})

app.get('/user-info-from-token', (req, res) => {
    const headers = req.headers['authorization'];
    const token = headers.split(' ')[1]; // "Bearer toke"
    const key = process.env.SECRET_KEY;

    const decoded = jwt.verify(token, key); // ถอดรหัส token
    res.json(decoded);
})

app.post('/upload', (req, res) => {
    const myFile = req.files.myFile;

    myFile.mv('./uploads/' + myFile.name, (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'success' });
    })
})

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

