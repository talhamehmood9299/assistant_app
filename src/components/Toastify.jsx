import { Toaster } from "react-hot-toast";

const Toastify = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
        // error: {
        //   style: {
        //     background: "red",
        //   },
        // },
      }}
    />
  );
};

export default Toastify;
