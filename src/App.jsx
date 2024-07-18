import "./App.css";
import ProtectedRoute from "./components/Protected";
import {
  AppointmentDetails,
  Assistant,
  Footer,
  Header,
  Login,
  NotFound,
  PatientCheckIn,
  TitanAi,
  Unauthorized,
} from "./pages";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

const Root = () => (
  <>
    {/* <Header /> */}
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 justify-center items-center h-screen bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/assistants",
        element: (
          <ProtectedRoute>
            <Assistant />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "appointmentDetails",
            element: <AppointmentDetails />,
          },
          {
            path: "patientCheckIn",
            element: <PatientCheckIn />,
          },
          {
            path: "titanAi",
            element: <TitanAi />,
          },
        ],
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
