import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteDocument, getDocument } from "../api/apiEndpoints";
import Popup from "../components/Popup";
import toast from "react-hot-toast";

const Files = () => {
  const locationId = useSelector((state) => state.location.selectedLocationId);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);

  const getAllDocuments = async () => {
    setLoading(true);
    try {
      const response = await getDocument(locationId);
      setDocuments(response.documents);
    } catch (error) {
      console.log("Error fetching documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedDocumentId(id);
    setIsPopupOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedDocumentId !== null) {
      setIsDeleting(true);
      try {
        const data = await deleteDocument(selectedDocumentId);
        const updatedDocuments = documents.filter(
          (document) => document.id !== selectedDocumentId
        );
        setDocuments(updatedDocuments);
        toast.success(data.message);
      } catch (error) {
        console.error("Error removing patient:", error);
      } finally {
        setIsDeleting(false);
        setIsPopupOpen(false);
        setSelectedDocumentId(null);
      }
    }
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setSelectedDocumentId(null);
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="px-4 sm:px-0">
          <h2 className="text-xl text-blue-900 font-bold pb-4 mb-5 border-gray-200">
            All Documents
          </h2>
        </div>
        <div className="mt-6 border-t border-gray-200">
          <div className="overflow-x-auto">
            <div className="max-h-[595px] overflow-y-auto">
              {" "}
              {/* Adjust max-h as needed */}
              <dl className="divide-y divide-gray-200">
                <div className="py-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-md font-bold text-gray-600 text-left">
                          Id
                        </th>
                        <th className="px-4 py-2 text-md font-bold text-gray-600 text-left">
                          Patient Name
                        </th>
                        <th className="px-8 py-2 text-md font-bold text-gray-600 text-left">
                          Attachments
                        </th>
                        <th className="px-8 py-2 text-md font-bold text-gray-600 text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4">
                            <span className="loading loading-bars loading-lg"></span>
                          </td>
                        </tr>
                      ) : (
                        documents.map((document) => (
                          <tr
                            key={document.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-4 text-sm leading-6 text-gray-700">
                              {document.id}
                            </td>
                            <td className="px-4 py-4 text-sm leading-6 text-gray-700">
                              {document.patient_name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">
                              <ul
                                role="list"
                                className="divide-y divide-gray-100 rounded-md border border-gray-200"
                              >
                                <li className="flex items-center justify-between py-2 pl-4 pr-5 text-sm leading-6">
                                  <div className="flex w-0 flex-1 items-center">
                                    <svg
                                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                      <a
                                        href={document.file_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="truncate font-medium text-gray-600 hover:text-blue-700"
                                      >
                                        {document.file_path.split("/").pop()}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <a
                                      href={document.file_path}
                                      download={document.file_path
                                        .split("/")
                                        .pop()}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium leading-6 text-red-600 text-right">
                              <button
                                onClick={() => handleDeleteClick(document.id)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded-md"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Files;
