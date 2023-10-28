import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import TaskRouter from "./router/TaskRouter";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<TaskRouter />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
