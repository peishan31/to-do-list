import React, { useState } from 'react';

export default function Todo(props) {
    const { todo, setTodos } = props;
    const [inputValue, setInputValue] = useState(todo.todo);

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos
                .filter((currentTodo) => (currentTodo._id !== todoId));
            })
        }
    };

    const handleInputChange = (todoId) => async (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    
        const res = await fetch(`/api/todosname/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ todo: newValue }),
            headers: {
                "Content-Type": "application/json"
            },
        });
    
        const json = await res.json();
        if (!json.acknowledged) {
            console.error("Failed to update todo");
        }
    };

    return (
        <div className="todo">
            <p>
                <input 
                    type="text"
                    // value={todo.todo}
                    value={inputValue}
                    className="form__input"
                    onChange={handleInputChange(todo._id)}
                    />
            </p>
            <div className="mutations">
                <button
                    className="todo__status"
                    onClick={() => updateTodo(todo._id, todo.status)}
                >
                    {(todo.status) ? "☑" : "☐"}
                </button>
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    )
}