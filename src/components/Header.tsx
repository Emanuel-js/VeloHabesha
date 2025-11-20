'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, openModal, signOut } = useAuth();

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          Velo<span className="highlight">Habesha</span>
        </div>

        <nav className="nav">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/adventures" className="nav-link">Adventures</Link>
          <Link href="/events" className="nav-link">Events</Link>
          <Link href="/shop" className="nav-link">Shop</Link>
        </nav>

        <div className="user-actions">
          {user ? (
            <div className="user-profile">
              <span className="welcome-text">Hi, {user.displayName || 'Rider'}</span>
              <button className="btn btn-ghost btn-sm" onClick={signOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn btn-ghost" onClick={() => openModal('login')}>
                Sign In
              </button>
              <button className="btn btn-primary" onClick={() => openModal('signup')}>
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .welcome-text {
          color: var(--text-primary);
          font-weight: 500;
        }

        .auth-buttons {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </header>
  );
}
