import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { useGetTaskQuery, useDeleteTaskMutation } from "../redux/features/api";
import { useEffect, useState } from "react";

const Item: React.FC = () => {
  const { taskId } = useParams();
  console.log(taskId);
  const { data, error, isLoading } = useGetTaskQuery(Number(taskId));
  const navigate = useNavigate();
  console.log(data, error, isLoading);
  const [DeleteTask] = useDeleteTaskMutation();

  // Provide initial values for itemDetails
  const initialItemDetails = {
    id: "",
    heading: "",
    description: "",
    date: "",
    time: "",
    imageSrc: "",
  };

  // Use useState to set itemDetails
  const [itemDetails, setItemDetails] = useState(initialItemDetails);

  useEffect(() => {
    // Update itemDetails when data is available
    if (data?.data) {
      setItemDetails({
        id: data.data.id,
        heading: data.data.heading,
        description: data.data.description,
        date: data.data.date,
        time: data.data.time,
        imageSrc: data.data.imageUrl,
      });
    }
  }, [data]);

  const editData = () => {
    // console.log("ooooooooooooi");
    navigate(`/taskedit/${itemDetails.id}`);

  };
  const deleteTask = async (id: string) => {
    try {
      const Id = Number(id);
      const data = await DeleteTask(Id).unwrap();
  
      if (data?.status === "success") {
        alert("Task Deleted");
        navigate("/");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Item: {itemDetails.heading}</h1>
          <div className="p-4 border border-gray-300 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Item Details</h2>
            <p className="text-gray-600 mb-2">Description: {itemDetails.description}</p>
            <p className="text-gray-600 mb-2">Date: {itemDetails.date}</p>
            <p className="text-gray-600 mb-2">Time: {itemDetails.time}</p>
            <img src={itemDetails.imageSrc} alt={itemDetails.heading} className="w-full rounded-lg" />
          </div>
          <div className="mt-4 text-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mx-2" onClick={editData}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mx-2" onClick={() => deleteTask(itemDetails.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
