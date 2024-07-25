import DatePicker from "react-datepicker";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";

const DateInput = ({ label, date, setDate }) => {
  const handleDateChange = (selectedDate) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    setDate(formattedDate);
  };
  return (
    <div className="flex items-center gap-4">
      <div className="font-bold text-lg text-black">{label}</div>
      <div className="relative flex items-center border rounded-lg p-3 bg-white shadow-md">
        <SlCalender className="text-blue-800 mr-2" />
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          className="focus:outline-none border-none bg-white text-gray-700"
          dateFormat="dd MMM yyyy"
          calendarClassName="rounded-lg bg-white shadow-lg"
          dayClassName={(d) =>
            d.getDate() === new Date(date).getDate()
              ? "bg-blue-300 text-blue-900 font-bold"
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default DateInput;
