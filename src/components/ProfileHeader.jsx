const ProfileHeader = ({ handleLogout }) => {
  return (
    <div className="w-full py-15 px-10 flex bg-white items-center justify-between gap-4 h-[80px] my-1 border rounded-md border-gray-300">
      <div className="flex flex-col">
        <span className="text-3xl text-[#1E328F] font-bold">FrontDesk</span>
        <span className="text-sm text-gray-600">
          Welcome to Assistant Panel
        </span>
      </div>

      <button
        className="bg-[#1E328F] hover:bg-blue-800 text-white rounded-lg z-[1] w-28 p-2 shadow"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileHeader;
