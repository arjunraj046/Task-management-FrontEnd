import { Routes, Route } from "react-router-dom";
import TaskList from "../components/Tasklist";
import PageNotFound from "../components/NotFound";
import Item from "../components/TaskItem";
import AddTask from "../components/AddTaskForm";
import UpdateTask from "../components/editForm";
const TaskRouter: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:taskId" element={<Item />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/taskedit/:taskId" element={<UpdateTask />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default TaskRouter;

//  {/* <Route path="/" element={<Header />}>
//           <Route index element={<TaskList />} />
//         </Route> */}
//   <Route index element={<TaskList />} />
//       <Route path="edit" element={<TaskFrom />} />
