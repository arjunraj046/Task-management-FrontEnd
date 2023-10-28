import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useGetTaskListQuery } from "../redux/features/api";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Initialize tasks as an empty array
  const [Loading, setLoading] = useState(true); // Initialize tasks as an empty array
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Destructure the query result here
  // console.log(data);

  const { data, error, isLoading } = useGetTaskListQuery();

  useEffect(() => {
    if (!isLoading && !error && data) {
      setLoading(false);
      setTasks(data?.data); // Set tasks when the data is available
      console.log("state", tasks);
    }
  }, [data, isLoading, error]); // Include dependencies in the dependency array

  const handleAddTask = () => {
    navigate("/addtask");
  };

  // Ensure that filteredTasks is an array before using map
  const filteredTasks = filter === "all" ? tasks : (tasks || []).filter((task) => task.priority === filter);

  const handleTaskClick = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <>
      <Header />

      <div className="container mx-auto p-4 flex-col">
        <div className="flex-row flex justify between items-center">
          <div className="my-4 flex">
            <label htmlFor="priorityFilter" className="mr-2">
              Filter by Priority:
            </label>
            <select id="priorityFilter" onChange={(e) => setFilter(e.target.value)} value={filter} className="p-2 border border-gray-400 rounded">
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex">
            <button onClick={handleAddTask} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover-bg-blue-600">
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-4">
          {Loading ? (
            <p>Loading...</p>
          ) : (
            filteredTasks.map((task: any) => (
              <div key={task.id} className="bg-white border p-4 rounded-lg cursor-pointer" onClick={() => handleTaskClick(task.id)}>
                <img src={task.imageUrl} alt={task.heading} className="w-auto h-44 mb-2" />
                <h2 className="text-xl font-bold">{task.heading}</h2>
                <p>
                  Priority: <span className="text-blue-600">{task.priority}</span>
                </p>
                <p>
                  Date & Time: {task.date} at {task.time}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TaskList;
