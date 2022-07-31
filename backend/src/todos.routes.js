const express = require("express");

const allTodos = [{ nome: "Bruno", status: false }];

const todosRoutes = express.Router();

// Prisma
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create
todosRoutes.post("/todos", async(req, res) => {
    const {name} = req.body

    // prisma criando o dado
    const todo = await prisma.todo.create({
         data: {
            name,
    } })
    // allTodos.push({ name, status: false })

    return res.status(201).json(todo);
});

// Read
todosRoutes.get("/todos", async(req, res) => {
    const todos = await prisma.todo.findMany()
    return res.status(200).json(todos);
});

// Update
todosRoutes.put("/todos", async(req, res) => {
    const { name, id, status } = req.body

    // Verifica se está em branco o ID
    if(!id) {
        return res.status(400).json("Id can not be blank!")
    }
    // -------

    // Verifica se o id existe
    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

    if(!todoAlreadyExist) {
        return res.status(404).json("Id is not existent!")
    }
    // -------

    const todo = await prisma.todo.update({ where: {
        id,
    },
    data: {
        name,
        status,
    } })

    return res.status(200).json(todo);
})

// Delete
todosRoutes.delete("/todos/:id", async(req, res) => {
    const { id } = req.params;
    const intId = parseInt(id);

    // Verifica se está em branco o ID
    if(!intId) {
        return res.status(400).json("Id can not be blank!")
    }
    // -------

    // Verifica se o id existe
    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id: intId } });

    if(!todoAlreadyExist) {
        return res.status(404).json("Id is not existent!")
    }
    // -------

    await prisma.todo.delete({ where: { id: intId } });

    return res.status(200).send("Successfully deleted!");
})

module.exports = todosRoutes;