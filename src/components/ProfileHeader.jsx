const ProfileHeader = ({ provider, handleLogout }) => {
  return (
    <div className="w-full py-15 px-10 flex items-center justify-between gap-4 h-[80px] my-1 border rounded-md border-gray-300">
      <div className="flex flex-col">
        <span className="text-3xl text-[#1E328F] font-bold">
          {provider.name}
        </span>
        <span className="text-sm text-gray-600">{provider.description}</span>
      </div>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-1">
          <div className="avatar">
            <div className="ring-[#1E328F] w-12 rounded-full ring ring-offset-2">
              <img src={provider.profile} alt="Provider Profile" />
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-[#1E328F] text-white rounded-lg z-[1] w-28 p-2 shadow"
        >
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
