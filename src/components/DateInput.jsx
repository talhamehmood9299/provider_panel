import DatePicker from "react-datepicker";
import { SlCalender } from "react-icons/sl";

const DateInput = ({ label, date, setDate }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="font-bold text-lg">{label}</div>
      <div className="relative flex items-center border rounded-lg p-3 bg-white shadow-md">
        <SlCalender className="text-blue-800 mr-2" />
        <DatePicker
          selected={date}
          onChange={setDate}
          className="focus:outline-none border-none text-gray-700"
          dateFormat="dd MMM yyyy"
          calendarClassName="rounded-lg bg-white shadow-lg"
          dayClassName={(d) =>
            d.getDate() === date.getDate()
              ? "bg-blue-300 text-blue-900 font-bold"
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default DateInput;
