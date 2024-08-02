import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDateTime } from "../helpers";
import toast from "react-hot-toast";
import Popup from "../components/Popup.jsx";
import Pusher from "pusher-js";
import TableRow from "../components/TableRow.jsx";
import { callPatient, endPatient, getPatients } from "../api/apiEndpoints.js";
import { tableHeaders } from "../data/index.js";

const PatientCheckIn = () => {
  const locationId = useSelector((state) => state.location.selectedLocationId);
  const provider = useSelector((state) => state.provider.providers);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedPatientId(id);
    setIsPopupOpen(true);
  };
  // handle Popup
  const handleConfirm = async () => {
    if (selectedPatientId !== null) {
      setIsDeleting(true);
      try {
        const data = await endPatient(selectedPatientId);
        setPatients((prevPatients) =>
          prevPatients.filter(
            (patient) => patient.patient_id !== selectedPatientId
          )
        );
        toast.success(data.message);
      } catch (error) {
        console.error("Error removing patient:", error);
      } finally {
        setIsDeleting(false);
        setIsPopupOpen(false);
      }
    }
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  const getPatientsDetail = async () => {
    // const storedData = localStorage.getItem("persist:root");
    // const parsedData = JSON.parse(storedData);
    // const providerData = JSON.parse(parsedData.provider || "{}");
    try {
      setLoading(true);
      const response = await getPatients(locationId);
      const fetchedPatients = response.patients || [];
      const filteredPatients = fetchedPatients.filter(
        (item) => item.provider_id === provider.azz_id
      );
      setPatients(filteredPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "mt1",
    });
    const callChannel = pusher.subscribe("add-channel");
    callChannel.bind("add-event", function (data) {
      getPatientsDetail();
    });

    return () => {
      callChannel.unbind("add-event");
      pusher.unsubscribe("add-channel");
    };
  }, []);

  useEffect(() => {
    getPatientsDetail();
  }, [locationId]);

  const handleCallPatient = async (id) => {
    try {
      const data = await callPatient(id);
      toast.success(data.message);
    } catch (error) {
      console.error("Error in calling patient:", error);
    }
  };

  return (
    <>
      <div className="overflow-y-auto md:h-[70vh]">
        <div className="md:overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={header.label}
                    className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-bold text-black capitalize tracking-wider"
                    colSpan={index === tableHeaders.length - 1 ? 2 : 1}
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
                    <span className="loading loading-bars loading-lg"></span>
                  </td>
                </tr>
              ) : (
                patients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-100 border-b last:border-none"
                  >
                    <TableRow additionalClasses="font-medium text-gray-900">
                      {`${index + 1}`}
                    </TableRow>
                    <TableRow>{patient.first_name}</TableRow>
                    <TableRow>{patient.lastname}</TableRow>
                    <TableRow>{patient.gender}</TableRow>
                    <TableRow>{patient.dob}</TableRow>
                    <TableRow>{patient.appt_time}</TableRow>
                    <TableRow additionalClasses="font-medium">
                      <button
                        className="bg-[#1E328F] text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                        onClick={() => handleCallPatient(patient.patient_id)}
                      >
                        Call Patient
                      </button>
                    </TableRow>
                    <TableRow>
                      <button
                        className="bg-blue-100 hover:bg-blue-200 text-black px-4 py-2 rounded-lg"
                        onClick={() => handleDeleteClick(patient.patient_id)}
                      >
                        Done
                      </button>
                    </TableRow>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        isLoading={isDeleting}
      />
    </>
  );
};

export default PatientCheckIn;
