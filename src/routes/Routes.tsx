import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserWrapper from "../layouts/UserWrapper";
import LargeFormOptimizer from "../pages/LargeFormOptimizer/LargeFormOptimizer";
import Stopwatch from "../pages/Stopwatch/Stopwatch";
import Notfound from "../pages/Notfound";
import EditStudent from "../pages/StudentManagementCURDApp/EditStudent";
import AddStudent from "../pages/StudentManagementCURDApp/AddStudent";
import StudentHome from "../pages/StudentManagementCURDApp/StudentHome";
import StudentManagementCURDApp from "../pages/StudentManagementCURDApp/StudentManagementCURDApp";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "large-form",
        element: <LargeFormOptimizer />,
      },

      {
        path: "stopwatch",
        element: <Stopwatch />,
      },

      {
        path: "student-management",
        element: <StudentManagementCURDApp />,
        children: [
          {
            path: "",
            element: <StudentHome />,
          },
          {
            path: "add",
            element: <AddStudent />,
          },
          {
            path: "edit/:id",
            element: <EditStudent />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Notfound />,
  },
]);

export default Routes;
