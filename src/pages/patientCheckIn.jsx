import { useEffect } from "react";
import { patients } from "../data";
import { getPatientsDetail } from "../services";

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
  useEffect(() => {
    getPatientsDetail();
  }, []);

  return (
    <div className="flex justify-center">
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
          {patients.map((patient, index) => (
            <tr
              key={patient.id}
              className="hover:bg-gray-100 border-b last:border-none"
            >
              <TableCell additionalClasses="font-medium text-gray-900">
                {`0${index + 1}`}
              </TableCell>
              <TableCell>{patient.firstName}</TableCell>
              <TableCell>{patient.lastName}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.dob}</TableCell>
              <TableCell>{patient.time}</TableCell>
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
          ))}
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
