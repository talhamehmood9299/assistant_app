import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDocument } from "../api/apiEndpoints";

const Files = () => {
  const locationId = useSelector((state) => state.location.selectedLocationId);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="px-4 sm:px-0">
        <h2 className="text-lg md:text-xl text-blue-900 font-bold pb-2 md:pb-4 mb-3 md:mb-5 border-b">
          All Documents
        </h2>
      </div>
      <div className="mt-6 border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
            <dt className="text-md font-bold leading-6 text-gray-600">Id</dt>
            <dt className="text-md font-bold leading-6 text-gray-600">
              Patient Name
            </dt>
            <dt className="text-md font-bold leading-6 text-gray-600">
              Attachments
            </dt>
            <dt className="text-md font-bold leading-6 text-gray-600">
              Actions
            </dt>
          </div>
          {loading ? (
            <div className="text-center py-4">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            documents.map((document) => (
              <div
                key={document.id}
                className="px-4 py-2 items-center sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0"
              >
                <dd className="text-sm leading-6 text-gray-700">
                  {document.id}
                </dd>
                <dd className="text-sm leading-6 text-gray-700">
                  {document.patient_name}
                </dd>
                <dd className="text-sm text-gray-900">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
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
                          {/* <span className="flex-shrink-0 text-gray-400">
                          2.4mb
                        </span> */}
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={document.file_path}
                          download={document.file_path.split("/").pop()}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
                <dd className="text-sm font-medium leading-6 text-red-600">
                  <button>Delete</button>
                </dd>
              </div>
            ))
          )}
        </dl>
      </div>
    </div>
  );
};

export default Files;
