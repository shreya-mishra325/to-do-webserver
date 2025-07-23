const express = require('express');
const app = express();

app.use(express.json());
let todos = [];
let id = 1;

app.get('/', (req,res)=>{
    console.log(req.method);
    res.send(`server started`);
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req,res) => {
    const {task} = req.body;
    if(!task || typeof task !== 'string')
        return res.status(400).json({error: 'task not written as a string.'});

const newItem = {
    id: id++,
    task: task.trim(),
}
todos.push(newItem);
res.status(201).json(newItem);
});

app.delete('/todos/:id', (req,res) => {
    const id1 = Number(req.params.id);
    const index = todos.findIndex(item => item.id === id1);
    if(index === -1) {
        return res.status(404).json({error: `task not found with id ${id1}`});
    }

const deleted = todos.splice(index, 1);
res.json({message: `deleted successfully`, deleted});
});

app.listen(3000, () => {
    console.log(`server running at port 3000`);
});
