const DateCard = ({ date, slots }) => {
  return (
    <div className={`border p-8 rounded-2xl h-full`}>
      <h3 className="text-xl font-semibold text-blue-900 mb-4">{date}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 overflow-y-auto">
        {slots.map((slot, index) => (
          <button
            key={index}
            className={`py-3 px-6 rounded-xl transition duration-300 ${
              slot.booked
                ? "bg-gray-500 text-white"
                : "bg-blue-900 text-white hover:bg-blue-900 transform hover:scale-105"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateCard;
