import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <header className="bg-blue-500 p-4 flex justify-between items-center ">
      <div className="text-white text-2xl font-bold">Task Management</div>
      <button onClick={handleNavigateToHome} className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600">
        Home
      </button>
    </header>
  );
};

export default Header;
