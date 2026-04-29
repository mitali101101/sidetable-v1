import { BookOpen, UserCircle } from 'lucide-react';
//import { auth, googleProvider } from '../lib/firebase';
//import { signInWithPopup } from 'firebase/auth';

interface LoginViewProps {
  onLogin: () => void;
  onGuestLogin: () => void;
}

export const LoginView = ({ onLogin, onGuestLogin }: LoginViewProps) => {
  return (
    <div className="login-container">
      <div className="login-icon-container">
        <BookOpen className="text-amber-600" size={32} />
      </div>
      <h1 className="login-title">sideTABLE</h1>
      <p className="login-subtitle">
        Your personal reading list, synced across all your devices.
      </p>
      
      <div className="login-buttons-container">
        <button 
          onClick={onLogin}
          className="btn-secondary flex items-center gap-3 text-stone-700"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          Sign in with Google
        </button>
        <button 
          onClick={onGuestLogin}
          className="btn-secondary flex items-center justify-center gap-3 text-sm text-stone-600"
        >
          <UserCircle size={18} />
          Continue as Guest
        </button>
      </div>
    </div>
  );
};