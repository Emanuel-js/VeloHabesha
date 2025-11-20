'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    doc,
    arrayUnion,
    serverTimestamp
} from 'firebase/firestore';

const categories = ['All', 'Mountain', 'Commuter', 'Road', 'Gravel'];

export default function AdventuresPage() {
    const { user, openModal } = useAuth();
    const [activeCategory, setActiveCategory] = useState('All');
    const [adventures, setAdventures] = useState<any[]>([]);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [expandedComments, setExpandedComments] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'adventures'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const adventuresData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAdventures(adventuresData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching adventures:", error);
            if (error.code === 'permission-denied') {
                alert("DATABASE LOCKED: Please update your Firestore Security Rules in the Firebase Console to 'allow read, write: if true;'");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredAdventures = activeCategory === 'All'
        ? adventures
        : adventures.filter(adv => adv.category === activeCategory);

    const handleLike = async (id: string, currentLikes: number) => {
        if (!user) {
            openModal('login');
            return;
        }
        const adventureRef = doc(db, 'adventures', id);
        await updateDoc(adventureRef, {
            likes: currentLikes + 1
        });
    };

    const toggleComments = (id: string) => {
        setExpandedComments(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const handleAddComment = async (e: React.FormEvent, id: string) => {
        e.preventDefault();
        if (!user) {
            openModal('login');
            return;
        }
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem('comment') as HTMLInputElement;
        const newComment = input.value;

        if (newComment.trim()) {
            const adventureRef = doc(db, 'adventures', id);
            await updateDoc(adventureRef, {
                comments: arrayUnion({
                    text: newComment,
                    user: user.displayName || 'Anonymous',
                    createdAt: new Date().toISOString()
                })
            });
            input.value = '';
        }
    };

    const handleShareClick = () => {
        if (user) {
            setIsShareModalOpen(true);
        } else {
            openModal('login');
        }
    };

    const handleShareAdventure = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await addDoc(collection(db, 'adventures'), {
                title: formData.get('title'),
                category: formData.get('category'),
                author: user.displayName || 'Anonymous',
                time: new Date().toLocaleDateString(), // Simplified for now
                createdAt: serverTimestamp(),
                image: "linear-gradient(45deg, #FF5F1F, #121212)", // Default for now
                description: formData.get('description'),
                likes: 0,
                comments: []
            });
            setIsShareModalOpen(false);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="page-container">
            <div className="adventures-bg"></div>
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Community <span className="highlight-text">Adventures</span></h1>
                        <p className="page-subtitle">Discover stories from riders across Ethiopia.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {adventures.length === 0 && (
                            <button
                                className="btn btn-ghost"
                                onClick={async () => {
                                    const initialAdventures = [
                                        {
                                            title: "Sunset Ridge Trail",
                                            category: "Mountain",
                                            author: "Dawit Abebe",
                                            time: "2h ago",
                                            image: "linear-gradient(45deg, #FF5F1F, #121212)",
                                            description: "A breathtaking ride through the Simien Mountains. The sunset views were absolutely unmatched.",
                                            likes: 24,
                                            comments: [],
                                            createdAt: serverTimestamp()
                                        },
                                        {
                                            title: "Addis Commute",
                                            category: "Commuter",
                                            author: "Sarah Jones",
                                            time: "5h ago",
                                            image: "linear-gradient(45deg, #00E5FF, #121212)",
                                            description: "Navigating the busy streets of Addis Ababa. Found a new shortcut near Bole!",
                                            likes: 15,
                                            comments: [],
                                            createdAt: serverTimestamp()
                                        }
                                    ];
                                    for (const adv of initialAdventures) {
                                        await addDoc(collection(db, 'adventures'), adv);
                                    }
                                }}
                            >
                                Seed Data
                            </button>
                        )}
                        <button className="btn btn-primary" onClick={handleShareClick}>Share Adventure</button>
                    </div>
                </div>

                <div className="filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="loading">Loading adventures...</div>
                ) : (
                    <div className="adventures-grid">
                        {filteredAdventures.map(adventure => (
                            <div key={adventure.id} className="adventure-card glass-panel animate-fade-in">
                                <div className="card-image" style={{ background: adventure.image }}></div>
                                <div className="card-content">
                                    <div className="card-header">
                                        <span className="category-tag">{adventure.category}</span>
                                        <span className="time">{adventure.time}</span>
                                    </div>
                                    <h3>{adventure.title}</h3>
                                    <p className="description">{adventure.description}</p>
                                    <div className="card-footer">
                                        <div className="author">
                                            <div className="avatar"></div>
                                            <span>{adventure.author}</span>
                                        </div>
                                        <div className="card-actions">
                                            <button className="action-btn" onClick={() => toggleComments(adventure.id)}>
                                                💬 {(adventure.comments || []).length}
                                            </button>
                                            <button className="like-btn" onClick={() => handleLike(adventure.id, adventure.likes)}>
                                                ❤️ {adventure.likes}
                                            </button>
                                        </div>
                                    </div>

                                    {expandedComments.includes(adventure.id) && (
                                        <div className="comments-section animate-fade-in">
                                            <div className="comments-list">
                                                {(adventure.comments || []).map((comment: any, idx: number) => (
                                                    <div key={idx} className="comment">
                                                        <span className="comment-user">{comment.user}:</span> {comment.text}
                                                    </div>
                                                ))}
                                            </div>
                                            <form className="comment-form" onSubmit={(e) => handleAddComment(e, adventure.id)}>
                                                <input name="comment" type="text" placeholder="Add a comment..." className="comment-input" />
                                                <button type="submit" className="btn btn-ghost btn-xs">Post</button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isShareModalOpen && (
                <div className="modal-overlay">
                    <div className="modal glass-panel animate-fade-in">
                        <h2>Share Your Adventure</h2>
                        <form onSubmit={handleShareAdventure}>
                            <div className="form-group">
                                <label>Title</label>
                                <input name="title" type="text" required className="input-field" placeholder="e.g., Morning Ride" />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" className="input-field">
                                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" required className="input-field" rows={3} placeholder="How was the ride?"></textarea>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-ghost" onClick={() => setIsShareModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Post Adventure</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
        .loading {
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
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

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--glass-border);
        }
        
        .card-actions {
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }

        .action-btn:hover {
          color: var(--primary);
        }
        
        .like-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }
        
        .like-btn:hover {
          color: var(--primary);
          transform: scale(1.1);
        }

        .comments-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.2);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
        }

        .comment {
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }

        .comment-user {
          color: var(--secondary);
          font-weight: 600;
          margin-right: 0.5rem;
        }

        .comment-form {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .comment-input {
          flex-grow: 1;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 0.25rem 0.75rem;
          color: var(--text-primary);
          font-size: 0.85rem;
        }

        .comment-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .btn-xs {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
        }

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
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: var(--spacing-lg);
          background: var(--surface);
          border-radius: var(--radius-md);
        }

        .modal h2 {
          margin-bottom: var(--spacing-md);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-lg);
        }
      `}</style>
        </div>
    );
}
