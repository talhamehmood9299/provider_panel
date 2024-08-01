const ProfileHeader = ({ provider, handleLogout }) => {
  return (
    <div className="w-full py-15 lg:px-10 px-10 sm:py-6 sm:px-2 flex flex-col sm:flex-row bg-white items-center justify-between gap-4 h-auto my-1 border rounded-md border-gray-300">
  
      <div className="flex flex-col flex-1">
        <span className="text-xl sm:text-2xl lg:text-3xl text-[#1E328F] font-bold">
          {provider.name}
        </span>
        <span className="text-xs sm:text-sm text-gray-600">
          {provider.description}
        </span>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-1">
          <div className="avatar">
            <div className="ring-[#1E328F] w-16 sm:w-12 lg:w-12 rounded-full ring ring-offset-2">
              <img
                src={provider.profile}
                alt="Provider Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-[#1E328F] hover:bg-blue-800 text-white rounded-lg z-[1] w-28 p-2 shadow"
        >
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
