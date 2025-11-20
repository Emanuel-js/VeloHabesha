'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
    const { isModalOpen, modalMode, closeModal, openModal } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isLoginMode = modalMode === 'login';

    if (!isModalOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLoginMode) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: fullName });
            }
            closeModal();
            resetForm();
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setFullName('');
        setError('');
    };

    const toggleMode = () => {
        openModal(isLoginMode ? 'signup' : 'login');
        setError('');
    };

    return (
        <div className="modal-overlay">
            <div className="modal glass-panel animate-fade-in">
                <h2>{isLoginMode ? 'Welcome Back' : 'Join the Community'}</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleAuth}>
                    {!isLoginMode && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                required
                                className="input-field"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up')}
                        </button>
                    </div>
                </form>

                <div className="auth-switch">
                    <p>
                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                        <button className="link-btn" onClick={toggleMode}>
                            {isLoginMode ? 'Join Now' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
        }

        .modal {
          width: 90%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          padding: var(--spacing-lg);
          background: var(--surface);
          border-radius: var(--radius-md);
        }

        .modal h2 {
          margin-bottom: var(--spacing-md);
          text-align: center;
        }

        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: inherit;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-lg);
        }

        .error-message {
          background: rgba(255, 0, 0, 0.1);
          color: #ff4444;
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1rem;
          font-size: 0.9rem;
          text-align: center;
        }

        .auth-switch {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .link-btn {
          background: none;
          border: none;
          color: var(--primary);
          cursor: pointer;
          font-weight: 600;
          padding: 0;
          font-family: inherit;
        }

        .link-btn:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
}
