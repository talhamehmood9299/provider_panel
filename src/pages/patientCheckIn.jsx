import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, getPatients } from "../api/service.js";
import { formatDate } from "../helpers";
import { logout } from "../redux/reducers/authReducer.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const tableHeaders = [
  { label: "SR #" },
  { label: "First Name" },
  { label: "Last Name" },
  { label: "Gender" },
  { label: "Date Of Birth" },
  { label: "Appt time" },
  { label: "Action" },
  { label: "Status" },
];

const cellClassName = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

const PatientCheckIn = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const provider = useSelector((state) => state.provider.providers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("You are now logged out");
  };

  const getPatientsDetail = async () => {
    const locationId = "12";
    const data = await getPatients(locationId);
    setPatients(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getPatientsDetail()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full py-15 px-10 flex items-center justify-between gap-4 h-[80px] my-1 border rounded-md border-gray-300">
        <div className="flex flex-col">
          <span className="text-3xl text-[#1E328F] font-bold">
            {provider.name}
          </span>
          <span className="text-sm text-gray-600">{provider.description}</span>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            <div className="avatar">
              <div className="ring-[#1E328F]  w-12 rounded-full ring ring-offset-2">
                <img src={provider.profile} />
              </div>
            </div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content menu bg-[#1E328F] text-white  rounded-lg z-[1] w-28 p-2 shadow"
          >
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header.label}
                className={`px-6 py-6 text-center text-sm font-bold text-black capitalize tracking-wider`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                <span className="loading loading-bars loading-lg"></span>{" "}
                {/* Loader */}
              </td>
            </tr>
          ) : (
            patients.map((patient, index) => (
              <tr
                key={patient.id}
                className="hover:bg-gray-100 border-b last:border-none"
              >
                <TableCell additionalClasses="font-medium text-gray-900">
                  {`0${index + 1}`}
                </TableCell>
                <TableCell>{patient.first_name}</TableCell>
                <TableCell>{patient.lastname}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{formatDate(patient.updated_at)}</TableCell>
                <TableCell additionalClasses="font-medium">
                  <button className="bg-[#1E328F] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                    Call Patient
                  </button>
                </TableCell>
                <TableCell>
                  <button className="bg-blue-100 hover:bg-blue-200 text-black px-4 py-2 rounded-lg">
                    {patient.status}
                  </button>
                </TableCell>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientCheckIn;

const TableCell = ({ children, additionalClasses = "" }) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap border-r text-sm text-black text-center ${additionalClasses}`}
    >
      {children}
    </td>
  );
};
