import { Outlet, NavLink } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div style={{ position: 'fixed', inset: 0 }} className="flex bg-[#1a1a1a] text-gray-200">
      {/* Sidebar */}
      <aside className="w-16 bg-[#111111] flex flex-col items-center py-6 gap-6 border-r border-[#2a2a2a] shrink-0">
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `p-3 rounded-xl transition-colors ${isActive ? 'bg-[#2a2a2a] text-white' : 'text-gray-500 hover:text-gray-300'}`
          }
        >
          ✨
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `p-3 rounded-xl transition-colors ${isActive ? 'bg-[#2a2a2a] text-white' : 'text-gray-500 hover:text-gray-300'}`
          }
        >
          📅
        </NavLink>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}