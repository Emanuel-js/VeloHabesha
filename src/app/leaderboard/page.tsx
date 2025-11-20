'use client';

import { useState } from 'react';

const initialRankings = [
    { id: 1, name: "Dawit Abebe", points: 2450, distance: "1,240 km", category: "Mountain", avatar: "linear-gradient(135deg, #FF5F1F, #000)" },
    { id: 2, name: "Sarah Jones", points: 2100, distance: "980 km", category: "Road", avatar: "linear-gradient(135deg, #00E5FF, #000)" },
    { id: 3, name: "Yonas Tadesse", points: 1950, distance: "850 km", category: "Gravel", avatar: "linear-gradient(135deg, #D4FF00, #000)" },
    { id: 4, name: "Helen Kassa", points: 1800, distance: "720 km", category: "Commuter", avatar: "linear-gradient(135deg, #FF9900, #000)" },
    { id: 5, name: "Robel Haile", points: 1650, distance: "690 km", category: "Mountain", avatar: "linear-gradient(135deg, #FF5F1F, #333)" },
];

const categories = ['All', 'Mountain', 'Road', 'Gravel', 'Commuter'];

export default function LeaderboardPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredRankings = activeCategory === 'All'
        ? initialRankings
        : initialRankings.filter(r => r.category === activeCategory);

    return (
        <div className="page-container">
            <div className="community-bg"></div>
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Community <span className="highlight-text">Leaderboard</span></h1>
                        <p className="page-subtitle">Top riders pushing the limits across Ethiopia.</p>
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

                <div className="leaderboard-table glass-panel animate-fade-in">
                    <div className="table-header">
                        <div className="rank">#</div>
                        <div className="rider">Rider</div>
                        <div className="category">Category</div>
                        <div className="stats">Distance</div>
                        <div className="points">Points</div>
                    </div>
                    {filteredRankings.map((rider, index) => (
                        <div key={rider.id} className="table-row">
                            <div className="rank">{index + 1}</div>
                            <div className="rider">
                                <div className="avatar-sm" style={{ background: rider.avatar }}></div>
                                <span>{rider.name}</span>
                            </div>
                            <div className="category">
                                <span className={`tag ${rider.category.toLowerCase()}`}>{rider.category}</span>
                            </div>
                            <div className="stats">{rider.distance}</div>
                            <div className="points">{rider.points} pts</div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .community-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(5, 5, 5, 0.7), rgba(5, 5, 5, 0.9)), url('/community-bg.png');
          background-size: cover;
          background-position: center;
          z-index: -1;
        }

        .leaderboard-table {
          width: 100%;
          overflow: hidden;
        }

        .table-header, .table-row {
          display: grid;
          grid-template-columns: 60px 2fr 1.5fr 1fr 1fr;
          padding: 1rem;
          align-items: center;
        }

        .table-header {
          background: rgba(255, 255, 255, 0.05);
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }

        .table-row {
          border-bottom: 1px solid var(--glass-border);
          transition: var(--transition-fast);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .rank {
          font-weight: 700;
          color: var(--primary);
          font-size: 1.2rem;
        }

        .rider {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        }

        .avatar-sm {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .tag {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
        }

        .points {
          font-weight: 700;
          color: var(--accent);
          text-align: right;
        }

        .stats {
          color: var(--text-secondary);
          text-align: right;
        }

        @media (max-width: 768px) {
          .table-header, .table-row {
            grid-template-columns: 40px 2fr 1fr;
          }
          .category, .stats {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
