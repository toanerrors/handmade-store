import { Outlet } from "react-router-dom";
import Header from "./layout/header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
