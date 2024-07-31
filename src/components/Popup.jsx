const Popup = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 sm:max-w-md md:max-w-lg">
        <p className="text-blue-900">Are you sure you want to remove?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-infinity loading-sm"></span>
            ) : (
              "Yes"
            )}
          </button>
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-1 rounded-lg"
            onClick={onClose}
            disabled={isLoading}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
