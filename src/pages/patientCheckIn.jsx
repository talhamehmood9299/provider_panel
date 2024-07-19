import { patients } from "../data";

const tableHeaders = [
  { label: "SR #", class: "text-center" },
  { label: "First Name", class: "text-center" },
  { label: "Last Name", class: "text-center" },
  { label: "Gender", class: "text-center" },
  { label: "Date Of Birth", class: "text-center" },
  { label: "Appt time", class: "text-center" },
  { label: "Action", class: "text-center" },
  { label: "Status", class: "text-center" },
];

const cellClassName = "px-6 py-4 whitespace-nowrap text-sm text-black";

const PatientCheckIn = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-6xl">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.label}
                  className={`px-6 py-3 ${header.class} text-xs font-medium text-gray-500 uppercase tracking-wider`}
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
                  <span className="bg-blue-100 text-black px-4 py-2 rounded-lg">
                    {patient.status}
                  </span>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
