import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import TaskList from "./component/TaskList";

const App = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState("");


	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:4000/todos");
			const data = await response.json();
			setTodos(data);
		};
		fetchData();
	}, []);

	const handleAddTodo = async () => {
		const data = {
			id: uuid(),
			title: text,
			completed: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		fetch("http://localhost:4000/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		setText("");
		setTodos((pre) => [...pre, data]);
	};

	const handleDelete = async (todoId) => {
		fetch(`http://localhost:4000/todos/${todoId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		setTodos((pre) => pre.filter((todo) => todo.id !== todoId));
	};

	const handleEdit = async (text, todoId) => {
		const data = {
			title: text,
			updatedAt: new Date().toISOString(),
		};

		fetch(`http://localhost:4000/todos/${todoId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		setTodos((pre) =>
			pre.map((todo) =>
				todo.id === todoId ? { ...todo, title: text } : todo,
			),
		);
	};

	return (
		<>
			<div className="m-8 flex flex-col items-center space-y-4">
				<div className="input flex justify-end">
					<button
						type="button"
						onClick={handleAddTodo}
						onKeyDown={handleAddTodo}
						className="label cursor-pointer hover:bg-base-300 rounded-lg transform"
					>
						タスクの追加
					</button>
					<input
						onChange={(e) => setText(e.target.value)}
						type="text"
						placeholder="ここにタスクを入力"
					/>
				</div>
				<TaskList todos={todos} handleEdit={handleEdit} handleDelete={handleDelete}/>
			</div>
		</>
	);
};

export default App;
