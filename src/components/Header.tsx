import { Users, Coffee } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { type User } from 'firebase/auth';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => (
  <header className="header-wrapper">
    <div>
      <h1 className="logo-text">sideTABLE</h1>
      <p className="text-stone-500 text-sm mt-1">Your personal reading nook</p>
    </div>
    <div className="flex gap-6 items-center">
      <Users className="nav-icon" />
      <Coffee className="nav-icon" />
      {user?.photoURL && (
        <img 
          src={user.photoURL} 
          alt="Profile" 
          className="profile-icon-badge" 
        />
      )}
      <button 
        onClick={onLogout}
        className="btn-icon-logout"
        title="Log Out"
        aria-label="Log out"
      >
        <LogOut size={18} />
      </button>
    </div>
  </header>
);