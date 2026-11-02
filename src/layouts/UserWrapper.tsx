import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const UserWrapper = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default UserWrapper;
