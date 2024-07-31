import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Footer = () => {
  const selectedAddress = useSelector(
    (state) => state.location.selectedAddress
  );
  return (
    <div className="relative w-full z-[1000]">
      <div className="absolute bottom-0 w-full py-3 bg-blue-900 text-white px-24 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <IoLocationOutline size={32} />
          <div className="w-[60%]">
            <p>{selectedAddress}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaPhoneVolume size={32} />
          <p>609-890-1050</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
