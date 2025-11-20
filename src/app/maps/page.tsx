'use client';

import { useState } from 'react';

const routes = [
    {
        id: 1,
        name: "Entoto Forest Loop",
        category: "Mountain",
        difficulty: "Hard",
        distance: "25 km",
        elevation: "500m",
        location: "Addis Ababa",
        description: "A challenging climb through the eucalyptus forests of Entoto. Technical descents and amazing city views."
    },
    {
        id: 2,
        name: "Bole to Piassa",
        category: "Commuter",
        difficulty: "Easy",
        distance: "12 km",
        elevation: "100m",
        location: "Addis Ababa",
        description: "The most direct route connecting the airport district to the old city center. Mostly flat with bike lanes."
    },
    {
        id: 3,
        name: "Wenchi Crater Rim",
        category: "Gravel",
        difficulty: "Medium",
        distance: "35 km",
        elevation: "400m",
        location: "Wenchi",
        description: "Scenic gravel roads around the crater lake. Perfect for endurance riding and nature lovers."
    },
    {
        id: 4,
        name: "Meskel Square Laps",
        category: "Road",
        difficulty: "Easy",
        distance: "5 km",
        elevation: "20m",
        location: "Addis Ababa",
        description: "Smooth tarmac perfect for speed training or casual evening rides."
    }
];

const categories = ['All', 'Mountain', 'Road', 'Gravel', 'Commuter'];

export default function MapsPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredRoutes = activeCategory === 'All'
        ? routes
        : routes.filter(r => r.category === activeCategory);

    return (
        <div className="page-container">
            <div className="community-bg"></div>
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Ride <span className="highlight-text">Maps</span></h1>
                        <p className="page-subtitle">Explore the best routes curated by the community.</p>
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

                <div className="routes-grid">
                    {filteredRoutes.map(route => (
                        <div key={route.id} className="route-card glass-panel animate-fade-in">
                            <div className="route-map-preview">
                                <div className="map-placeholder">Map Preview</div>
                            </div>
                            <div className="route-content">
                                <div className="route-header">
                                    <span className="category-tag">{route.category}</span>
                                    <span className={`difficulty-tag ${route.difficulty.toLowerCase()}`}>{route.difficulty}</span>
                                </div>
                                <h3>{route.name}</h3>
                                <p className="route-location">📍 {route.location}</p>
                                <div className="route-stats">
                                    <span>📏 {route.distance}</span>
                                    <span>⛰️ {route.elevation}</span>
                                </div>
                                <p className="route-description">{route.description}</p>
                                <button className="btn btn-primary btn-sm">View Route</button>
                            </div>
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

        .routes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-md);
        }

        .route-card {
          overflow: hidden;
          transition: var(--transition-fast);
        }

        .route-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }

        .route-map-preview {
          height: 200px;
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--glass-border);
        }

        .map-placeholder {
          color: var(--text-secondary);
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .route-content {
          padding: var(--spacing-md);
        }

        .route-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .difficulty-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .difficulty-tag.hard { color: #FF4444; background: rgba(255, 68, 68, 0.1); }
        .difficulty-tag.medium { color: #FFAA00; background: rgba(255, 170, 0, 0.1); }
        .difficulty-tag.easy { color: #00CC44; background: rgba(0, 204, 68, 0.1); }

        .route-location {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .route-stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .route-description {
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .btn-sm {
          width: 100%;
        }
      `}</style>
        </div>
    );
}
