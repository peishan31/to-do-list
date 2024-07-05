const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;
}

// GET /todos
router.get("/todos", async (req, res) => {
    try {

        if (req.query.triggerError) {
            throw new Error("Intentional error triggered");
        }

        const collection = getCollection();
        const todos = await collection.find({}).toArray();

        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

// POST /todos
router.post("/todos", async (req, res) => {
    try {
        const collection = getCollection();
        let { todo } = req.body;

        if (!todo) {
            return res.status(400).json({ msg: "Error: No todo found"});
        }

        todo = (typeof todo === "string") ? todo : JSON.stringify(todo);
        if (todo.length <= 1) {
            return res.status(400).json({ msg: "Error: Todo content must have length greater than 1" });
        }

        const newTodo = await collection.insertOne({ todo, status: false, createdAt: new Date() });

        res.status(201).json({ todo, status: false, _id: newTodo.insertedId, createdAt: new Date() });
    }
    catch (error) {
        res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
    try {
        const collection = getCollection();
        const _id = new ObjectId(req.params.id);

        const deletedTodo = await collection.deleteOne({ _id });

        if (deletedTodo.deletedCount === 0) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});

// PUT /todos/:id --> change status
router.put("/todos/:id", async (req, res) => {
    try {
        const collection = getCollection();
        const _id = new ObjectId(req.params.id);
        const { status } = req.body;

        if (typeof status !== "boolean") {
            return res.status(400).json({ msg: "invalid status"});
        }

        const updatedAt = new Date();
        const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status, updatedAt: updatedAt } });

        if (updatedTodo.matchedCount === 0) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        // res.status(200).json(updatedTodo);
        res.status(200).json({ acknowledged: true, updatedAt: updatedAt });
    } catch (error) {
        res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});

// PUT /todosname/:id --> change todo
router.put("/todosname/:id", async (req, res) => {
    try {
        const collection = getCollection();
        const _id = new ObjectId(req.params.id);
        const { todo } = req.body;

        if (typeof todo !== "string" || todo.trim() === "") {
            return res.status(400).json({ msg: "Invalid todo" });
        }

        const updatedAt = new Date();
        const updatedTodo = await collection.updateOne(
            { _id },
            { $set: { todo: todo, updatedAt: updatedAt } }
        );

        if (updatedTodo.matchedCount === 0) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json({ acknowledged: true, updatedAt: updatedAt });
    } catch (error) {
        res.status(500).json({ msg: error.message || "Internal Server Error" });
    }
});

module.exports = router;