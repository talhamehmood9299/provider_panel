import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Footer = () => {
  const selectedAddress = useSelector(
    (state) => state.location.selectedAddress
  );
  return (
    <div className="relative w-full z-[1000]">
      <div className="absolute bottom-0 w-full py-3 bg-blue-900 text-white px-4 md:px-24 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2 md:space-x-4">
          <IoLocationOutline className="w-6 h-6 md:h-8" />
          <div className="w-full md:w-[60%]">
            <p className="text-xs md:text-base text-center md:text-left">
              {selectedAddress}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <FaPhoneVolume className="w-6 h-6 md:w-8 md:h-8" />
          <p className="text-xs md:text-base text-center md:text-left">
            609-890-1050
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
