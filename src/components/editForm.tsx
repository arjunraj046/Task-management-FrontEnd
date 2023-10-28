import React, { ChangeEvent, useState } from "react";
import Header from "./Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetTaskQuery, useEditTaskMutation } from "../redux/features/api";

const UpdateTask: React.FC = () => {
  const { taskId } = useParams();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { data: taskData } = useGetTaskQuery(Number(taskId));
  const [updateTaskApiCall] = useEditTaskMutation();

  const [image, setImage] = useState<File | null>(null);

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const formik = useFormik({
    initialValues: {
      id: taskData?.data?.id || "",
      heading: taskData?.data?.heading || "",
      description: taskData?.data?.description || "",
      date: taskData?.data?.date || "",
      time: taskData?.data?.time || "",
      priority: taskData?.data?.priority || "",
      image: null, // Initial value for the image field
    },
    validationSchema: Yup.object({
      heading: Yup.string().required("Heading is required").min(5, "Heading must be at least 5 characters"),
      description: Yup.string().required("Description is required").min(50, "Description must be at least 50 characters"),
      date: Yup.string().required("Date is required"),
      time: Yup.string().required("Time is required"),
      priority: Yup.string().required("Priority is required"),
    }),

    onSubmit: async (values) => {
      try {
        if (values) {
          const formData = new FormData();
          formData.append("id", Number(taskId).toString());
          formData.append("heading", values.heading);
          formData.append("description", values.description);
          formData.append("date", values.date);
          formData.append("time", values.time);
          formData.append("priority", values.priority);
          if (image) {
            formData.append("image", image);
          }
          console.log(Object.fromEntries(formData));

          const res: any = await updateTaskApiCall(formData);
          console.log(res);

          if (res?.data?.status === "success") {
            alert("Task updated");
            navigate(`/task/${taskId}`);
          }
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert("Something went wrong");
      }
    },
  });

  function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    setImage(file);
    formik.setFieldValue("image", file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Update Task</h2>

        <div className="lg:flex lg:justify-center">
          <form className="w-full lg:w-1/2" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
                Heading
              </label>
              <input type="text" id="heading" className="form-input border border-black-300 rounded px-3 py-2" {...formik.getFieldProps("heading")} />
              {formik.touched.heading && formik.errors.heading && <div className="text-red-500">{formik.errors.heading.toString()}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select id="priority" className="form-select border border-black-300 rounded px-3 py-2" {...formik.getFieldProps("priority")}>
                <option value="" label="Select Priority" />
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.priority && formik.errors.priority && <div className="text-red-500">{formik.errors.priority.toString()}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea id="description" className="form-textarea border border-black-300 rounded px-3 py-2" rows={4} {...formik.getFieldProps("description")} />
              {formik.touched.description && formik.errors.description && <div className="text-red-500">{formik.errors.description.toString()}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input type="date" id="date" className="form-input border border-black-300 rounded px-3 py-2" {...formik.getFieldProps("date")} />
              {formik.touched.date && formik.errors.date && <div className="text-red-500">{formik.errors.date.toString()}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input type="time" id="time" className="form-input border border-black-300 rounded px-3 py-2" {...formik.getFieldProps("time")} />
              {formik.touched.time && formik.errors.time && <div className="text-red-500">{formik.errors.time.toString()}</div>}
            </div>

            {previewImage && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image Preview</label>
                <div className="w-40 h-40 border border-black-300 rounded-lg">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input type="file" id="image" name="image" accept="image/*" className="form-input border border-black-300 rounded px-3 py-2" onChange={handleImageChange} />
              {formik.touched.image && formik.errors.image && <div className="text-red-500">{formik.errors.image.toString()}</div>}
            </div>

            <div className="mt-4">
              <button type="submit" className="bg-blue-500 hover.bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out">
                Update
              </button>
              <Link to={`/task/${taskId}`}>
                <button type="button" className="bg-red-500 hover.bg-red-600 text-white px-4 py-2 rounded-lg ml-2 transition duration-300 ease-in-out">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateTask;
