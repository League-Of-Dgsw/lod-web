const Header = () => {
  return (
    <div className="w-full h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="font-black text-base tracking-widest text-black uppercase">League of</span>
        <img src="/dgsw.png" alt="DGSW" className="w-14" />
      </div>
      <button className="px-4 py-1.5 border border-gray-900 text-gray-900 text-xs font-bold tracking-wide rounded active:opacity-60 transition-opacity cursor-pointer">
        로그인
      </button>
    </div>
  );
};

export default Header;
