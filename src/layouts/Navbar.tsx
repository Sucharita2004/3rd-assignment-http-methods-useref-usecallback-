import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-[#A7F3D0] font-semibold border-b-2 border-[#A7F3D0] pb-1"
      : "text-white hover:text-[#A7F3D0] transition duration-200";

  return (
    <nav className="bg-[#123B3A] text-white px-6 py-4 shadow-lg">
      <div className="relative max-w-7xl mx-auto flex items-center justify-between">

   
        <div className="text-2xl font-bold tracking-wide text-[#A7F3D0]">
          LOGO
        </div>

        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/large-form" className={navLinkClass}>
            Large Form
          </NavLink>

          <NavLink to="/stopwatch" className={navLinkClass}>
            Stopwatch
          </NavLink>

          <NavLink to="/student-management" className={navLinkClass}>
            Student Management
          </NavLink>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
