const DateCard = ({ date, times }) => {
  return (
    <div className="border p-8 rounded-2xl bg-gray-50 h-full">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">{date}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 overflow-y-auto">
        {times &&
          times.map((time, index) => (
            <button
              key={index}
              className="bg-blue-900 text-white py-3 px-6 rounded-xl hover:bg-blue-900 transition duration-300"
            >
              {time}
            </button>
          ))}
      </div>
    </div>
  );
};

export default DateCard;
