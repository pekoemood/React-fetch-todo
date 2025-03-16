import { useDebugValue } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const App = () => {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState('');

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
			updatedAt: new Date().toISOString()
		}


		const response = fetch('http://localhost:4000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		setText('');
		setTodos((pre) => [...pre, data]);
	};

	const handleDelete = async (todoId) => {
		fetch(`http://localhost:4000/todos/${todoId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		setTodos((pre) => pre.filter((todo) => todo.id !== todoId));
	};

	console.log(todos);
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
					<input onChange={(e) => setText(e.target.value)} type="text" placeholder="ここにタスクを入力" />
				</div>
				<ul className="list bg-base-100 rounded-box shadow-md">
					<li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
						タスク一覧
					</li>
					{todos.map((todo) => (
						<li className="list-row flex justify-between" key={todo.id}>
							<div className="justify-self-start">{todo.title}</div>
							<button
								onClick={() => handleDelete(todo.id)}
								type="button"
								className="btn btn-error"
							>
								削除
							</button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default App;
