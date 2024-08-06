import "./App.css";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Protected";
import Toastify from "./components/Toastify";
import {
  AppointmentDetails,
  Provider,
  Footer,
  Header,
  Login,
  NotFound,
  PatientCheckIn,
  Settings,
  TitanAi,
  Unauthorized,
} from "./pages";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import addNotification, { Notifications } from "react-push-notification";
import icon from "/public/favicon.ico";

const Root = () => (
  <>
    {/* <Header /> */}
    <Toastify />
    <Notifications />
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
        path: "/provider",
        element: (
          <ProtectedRoute>
            <Provider />
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
          {
            path: "settings",
            element: <Settings />,
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
  const user = useSelector((state) => state.auth.user);
  const storedData = localStorage.getItem("persist:root");
  const parsedData = JSON.parse(storedData);
  const providerData = JSON.parse(parsedData.provider || "{}");
  const assistantEmail = providerData.providers.assistant_email;

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "mt1",
    });
    const callChannel = pusher.subscribe("add-channel");
    callChannel.bind("add-event", function (data) {
      if (user.email === assistantEmail) {
        addNotification({
          title: `${data.lastName} ${data.firstName}, (${data.dob}) is checked in`,
          icon: `${icon}`,
          theme: "darkblue",
          native: true,
          vibrate: 3,
        });
      }
    });

    return () => {
      callChannel.unbind("add-event");
      pusher.unsubscribe("add-channel");
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
