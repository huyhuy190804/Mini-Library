import { User, Library, RefreshCcw, BarChart2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { name: "Authors", icon: User, path: "/authors" },
    { name: "Books", icon: Library, path: "/books" },
    { name: "Borrowings", icon: RefreshCcw, path: "/borrowings" },
    { name: "Stats", icon: BarChart2, path: "/stats" },
  ];

  return (
    <aside className="w-[280px] h-screen bg-[#f4f7fb] flex flex-col p-6 font-sans">
      {/* Logo / Header */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-[#0044cc] tracking-tight">Library Manager</h1>
        <p className="text-sm text-gray-500 font-medium">Digital Curator</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-4 px-4 py-3.5 bg-[#eaf2ff] text-[#0044cc] border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_#0044cc] font-medium transition-all"
                : "flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:text-gray-900 hover:bg-black/5 rounded-2xl font-medium transition-all"
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#0044cc]' : 'text-gray-500'}`} strokeWidth={2.5} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="mt-8 pt-6 border-t border-gray-200/60 flex items-center gap-3 px-2">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0A192F] flex-shrink-0 shadow-sm border border-black/10">
           <img 
             src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=0a192f&skinColor=f8d25c&top=shortHairShortCurly" 
             alt="Avatar" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-tight">Alex Curator</span>
          <span className="text-xs text-gray-500 font-medium mt-0.5">Senior Librarian</span>
        </div>
      </div>
    </aside>
  );
}
