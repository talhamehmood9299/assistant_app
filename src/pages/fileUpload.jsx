import { useState, useEffect } from "react";
import Input from "../components/Input";
import { uploadDocument } from "../api/apiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const locationId = useSelector((state) => state.location.selectedLocationId);
  const [formData, setFormData] = useState({
    patient_name: "",
    location_id: locationId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setFile(reader.result);
  //       setFormData({
  //         ...formData,
  //         file: reader.result,
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("patient_name", formData.patient_name);
    data.append("location_id", formData.location_id);
    if (file) data.append("file", file);

    try {
      const updatedFile = await uploadDocument(data);
      // dispatch(
      //   setProvider({
      //     patient_name: formData.patient_name,
      //     file: formData.file,
      //     location_id: formData.location_id,
      //   })
      // );
      navigate("/assistants/files");
      toast.success(updatedFile.message);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-lg md:text-xl text-blue-900 font-bold pb-2 md:pb-4 mb-3 md:mb-5 border-b">
        Upload File
      </h2>
      <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Patient Name"
          placeholder="Type here"
          value={formData.patient_name}
          onChange={handleChange}
          name="patient_name"
        />
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <label className="w-full sm:w-32 font-semibold text-black text-center sm:text-left">
            File
          </label>
          <div className="w-full">
            <input
              type="file"
              name="file"
              className="file-input file-input-bordered file-input-success bg-white w-full"
              onChange={handleFileChange}
            />
            {file && (
              <div className="mt-2 md:mt-4">
                <p className="text-sm text-gray-600">{file.name}</p>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 -pt-24 sm:mt-24 bg-blue-900 hover:bg-blue-800 text-white py-2 w-full sm:w-auto sm:px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Settings;
