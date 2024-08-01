import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import DateInput from "../components/DateInput";
import DateCard from "../components/DateCard";
import { getSlotsByProvider } from "../api/apiEndpoints";
import { useSelector } from "react-redux";
import { formatDate, formatTime } from "../helpers";

const AppointmentDetails = () => {
  const provider = useSelector((state) => state.provider.providers);
  const selectedLocationId = useSelector(
    (state) => state.location.selectedLocationId
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // Separate state variables
  const [dates, setDates] = useState([]);
  const [slotsNameByLocation, setSlotsNameByLocation] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const ensureDateObject = (date) => {
    if (typeof date === "string") {
      const parsedDate = new Date(date);
      return isNaN(parsedDate) ? null : parsedDate;
    }
    return date instanceof Date && !isNaN(date.getTime()) ? date : null;
  };
  const fetchSlotsByProviders = async () => {
    setLoading(true);
    try {
      const validStartDate = ensureDateObject(startDate);
      const validEndDate = ensureDateObject(endDate);
      if (!validStartDate || !validEndDate) {
        throw new Error("Invalid date object");
      }
      if (provider && provider.azz_id) {
        const response = await getSlotsByProvider(
          provider.azz_id,
          validStartDate,
          validEndDate
        );

        const { data, locations } = response;

        if (data && Array.isArray(data)) {
          const extractedDates = data.map((item) => new Date(item.date));
          setDates(extractedDates);

          // Extract slots by location
          const extractedSlotsNameByLocation = data.flatMap((item) =>
            item.slots_by_location.map((location) => ({
              locationId: location.location_id,
              locationName: location.location_name,
            }))
          );
          setSlotsNameByLocation(extractedSlotsNameByLocation);

          const extractedSlots = data.flatMap((item) =>
            item.slots_by_location
              .filter((location) => location.location_id === selectedLocationId)
              .flatMap((location) =>
                location.slots.map((slot) => ({
                  booked: slot.booked,
                  startTime: new Date(slot.start_time),
                  endTime: new Date(slot.end_time),
                }))
              )
          );
          setSlots(extractedSlots);
        } else {
          console.error("Unexpected data format:", data);
        }

        if (locations && Array.isArray(locations)) {
          const locationsData = locations.map((loc) => ({
            id: loc.id,
            name: loc.name,
          }));
        } else {
          console.error("Unexpected locations format:", locations);
        }
      } else {
        console.error("Provider azz_id not found or provider is not an object");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();

    // Convert to Date if necessary
    const validStartDate = ensureDateObject(startDate);
    const validEndDate = ensureDateObject(endDate);

    if (validStartDate && validEndDate) {
      fetchSlotsByProviders();
    } else {
      console.error("Invalid date input");
    }
  };

  return (
    <main className="bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full h-[70vh]">
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
            <button
              onClick={handleDateSubmit}
              className="bg-blue-900 text-white py-2 px-6 rounded-full hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
            >
              GO
            </button>
          </div>
          <div className="space-y-6 max-h-[calc(70vh-200px)] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            ) : (
              dates.map((date, index) => {
                const dateSlots = slots.filter(
                  (slot) =>
                    slot.startTime.toDateString() === date.toDateString()
                );
                const formattedSlots = dateSlots.map((slot) => ({
                  time: `${formatTime(slot.startTime)}`,
                  booked: slot.booked,
                }));

                return (
                  <DateCard
                    key={index}
                    date={formatDate(date)}
                    slots={formattedSlots}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentDetails;
