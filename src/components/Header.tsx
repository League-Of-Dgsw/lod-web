const Header = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-2 bg-white">
      <div className="flex items-center gap-2">
        <p className="font-bold text-xl">LEAGUE OF</p>
        <img src="/dgsw.png" alt="DGSW" className="w-20" />
      </div>
      <button className="px-6 py-2 bg-blue-500 active:scale-95 transition-transform text-white rounded-lg cursor-pointer">
        로그인
      </button>
    </div>
  );
};

export default Header;
