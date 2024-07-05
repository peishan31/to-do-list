import Todo from "./Todo"
import { useEffect, useState } from "react";

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        async function getTodos() {
            try {
                const res = await fetch("/api/todos");
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message);
                }
                const todos = await res.json();

                console.log("todos: ", todos);
                setTodos(todos);
            }
            catch (err) {
                alert(err.message);
            }

        }
        getTodos();
    }, []);

    const createNewTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/todos", {
                method: "POST",
                body: JSON.stringify({ todo: content }),
                headers: {
                "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.msg);
            }

            const newTodo = await res.json();
    
            setContent("");
            setTodos([...todos, newTodo]);
            // alert('Todo added successfully');
        } catch (err) {
            alert(err.message);
        }
    }


    return (
        <main className="container">
            <h1 className="title">To Do List ✏️</h1>
            <form className="form" onSubmit={createNewTodo}>
                <input 
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your Todo..."
                className="form__input"
                required 
                />
                <button className="form__button" type="submit">➕</button>
            </form>
            <div className="todos">
                {(todos.length > 0) &&
                todos.map((todo) => (
                    <Todo key={todo._id} todo={todo} setTodos={setTodos}   />
                ))
                }
            </div>
        </main>
    )
}

export default TodoList