import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePicker = ({ value, onChange }) => {
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    onChange({ startDate: start, endDate: end });
  };

  return (
    <div className=" mb-4">
      <DatePicker
        selected={value.startDate}
        onChange={handleDateChange}
        startDate={value.startDate}
        endDate={value.endDate}
        selectsRange
        placeholderText="Select Date Range"
        className="border w-[410px] border-blue-800 bg-white rounded-md p-2"
        isClearable
        clearButtonClassName="react-datepicker__close-icon"
      />
    </div>
  );
};
