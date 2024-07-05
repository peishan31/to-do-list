import React, { useState } from 'react';

const Todo = ({ todo, setTodos }) => {
    const [inputValue, setInputValue] = useState(todo.todo);

    const updateTodo = async (todoId, todoStatus) => {
        try {
            const res = await fetch(`/api/todos/${todoId}`, {
                method: "PUT",
                body: JSON.stringify({ status: todoStatus }),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.msg || "Network response was not ok");
            }
    
            const json = await res.json();
            if (json.acknowledged) {
                setTodos(currentTodos => {
                    return currentTodos.map((currentTodo) => {
                        if (currentTodo._id === todoId) {
                            return { ...currentTodo, status: !currentTodo.status, updatedAt: json.updatedAt };
                        }
                        return currentTodo;
                    });
                });
            } else {
                alert("Update error has occurred! Please try again later!");
            }
        } catch (error) {
            alert(error.message || "Network error has occurred! Please try again later!");
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            const res = await fetch(`/api/todos/${todoId}`, {
                method: "DELETE"
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.msg || "Network response was not ok");
            }
    
            const json = await res.json();
            if (json.acknowledged) {
                setTodos(currentTodos => {
                    return currentTodos.filter(currentTodo => currentTodo._id !== todoId);
                });
            } else {
                alert("Deletion error has occurred! Please try again later!");
            }
        } catch (error) {
            alert(error.message || "Network error has occurred! Please try again later!");
        }
    };

    const handleInputChange = async (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        try {
            const res = await fetch(`/api/todosname/${todo._id}`, {
                method: "PUT",
                body: JSON.stringify({ todo: newValue }),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.msg || "Network response was not ok")
            }

            const json = await res.json();
            if (json.acknowledged) {
                setTodos(currentTodos => {
                    return currentTodos.map((currentTodo) => {
                        if (currentTodo._id === todo._id) {
                            return { ...currentTodo, todo: newValue, updatedAt: json.updatedAt };
                        }
                        return currentTodo;
                    });
                });
            } else {
                console.error("Failed to update todo");
            }
        } catch (error) {
            console.error("Network error occurred:", error);
        }
    };

    return (
        <div className="todo">
            <div>
                <p>
                    <input 
                        type="text"
                        value={inputValue}
                        className="form__input"
                        onChange={handleInputChange}
                    />
                </p>
                {todo.createdAt && !isNaN(Date.parse(todo.createdAt)) && (
                    <small>Created At: {new Date(todo.createdAt).toLocaleString()}</small>
                )}
                <br />
                {todo.updatedAt && !isNaN(Date.parse(todo.updatedAt)) && (
                    <small>Updated At: {new Date(todo.updatedAt).toLocaleString()}</small>
                )}
            </div>
            <div className="mutations">
                <button
                    className="todo__status"
                    onClick={() => updateTodo(todo._id, todo.status)}
                >
                    {todo.status ? "☑" : "☐"}
                </button>
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default Todo;
