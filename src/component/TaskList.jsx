import { useState } from "react";
import Task from "./Task";

const TaskList = ({ todos, handleEdit, handleDelete }) => {
  const [activeTaskId, setActiveTaskId] = useState(null);
	return (
		<ul className="list bg-base-100 rounded-box shadow-md">
			<li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">タスク一覧</li>
			{todos.map((todo) => (
				<Task
					key={todo.id}
					todo={todo}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
          activeTaskId={activeTaskId}
          setActiveTaskId={setActiveTaskId}
				/>
			))}
		</ul>
	);
};

export default TaskList;
