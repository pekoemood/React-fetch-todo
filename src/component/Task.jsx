import { useState } from "react";

const Task = ({ todo, handleEdit, handleDelete, activeTaskId, setActiveTaskId }) => {
	const [titleText, setTitleText] = useState("");
  const isActive = todo.id === activeTaskId
  console.log(isActive)

	return (
		<li className="list-row flex justify-end">
			<div className="justify-self-start">
				{isActive ? (
					<input
						type="text"
						value={titleText}
						onChange={(e) => setTitleText(e.target.value)}
					/>
				) : (
					todo.title
				)}
			</div>
			{isActive ? (
				<button
					onClick={() => {
						setActiveTaskId(null);
						handleEdit(titleText, todo.id);
					}}
					type="button"
					className="btn btn-info"
				>
					保存
				</button>
			) : (
				<button
					onClick={() => {
						setActiveTaskId(todo.id);
						setTitleText(todo.title);
					}}
					type="button"
					className="btn btn-info"
				>
					編集
				</button>
			)}

			<button
				onClick={() => handleDelete(todo.id)}
				type="button"
				className="btn btn-error"
			>
				削除
			</button>
		</li>
	);
};

export default Task;
