import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ to, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
          isActive ? 'text-cyan-600 font-bold' : 'text-slate-600 hover:text-slate-900'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span>{label}</span>
          {isActive && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-600 rounded-full shadow-[0_0_8px_rgba(0,168,232,0.8)]" />
          )}
        </>
      )}
    </NavLink>
  );
};
