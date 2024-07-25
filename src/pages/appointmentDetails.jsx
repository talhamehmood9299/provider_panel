import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "../components/DateInput";
import DateCard from "../components/DateCard";
import { times } from "../data";

const AppointmentDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <main className="min-h-screen bg-gray-100 pb-28 flex items-start justify-center">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-7xl h-[100vh]">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
            Select Date & Time
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border rounded-xl p-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
            <DateInput
              label="Start Date:"
              date={startDate}
              setDate={setStartDate}
            />
            <DateInput label="End Date:" date={endDate} setDate={setEndDate} />
            <button className="bg-blue-900 text-white py-2 px-6 rounded-full hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-105">
              GO
            </button>
          </div>
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <DateCard date="WED 18, SEP" times={times} />
            <DateCard date="WED 19, SEP" times={times} />
            <DateCard date="WED 19, SEP" times={times} />
            {/* Add more DateCard components here as needed */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentDetails;
