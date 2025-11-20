'use client';

const tips = [
    {
        id: 1,
        title: "High Altitude Training",
        category: "Training",
        author: "Coach Bekele",
        content: "Training at altitude improves your aerobic capacity. Start slow and stay hydrated. The Entoto mountains are perfect for acclimation rides."
    },
    {
        id: 2,
        title: "Bike Maintenance 101",
        category: "Maintenance",
        author: "Addis Bike Center",
        content: "Keep your chain clean and lubricated, especially after dusty rides. Check tire pressure before every ride to avoid pinch flats."
    },
    {
        id: 3,
        title: "Nutrition for Long Rides",
        category: "Health",
        author: "Dr. Sarah",
        content: "Carb-load the night before. On the ride, aim for 60g of carbs per hour. Teff-based snacks are excellent for sustained energy."
    },
    {
        id: 4,
        title: "Safe City Commuting",
        category: "Safety",
        author: "Commuter Club",
        content: "Always wear a helmet and high-vis gear. Use hand signals and make eye contact with drivers. Stick to designated bike lanes where available."
    }
];

export default function TipsPage() {
    return (
        <div className="page-container">
            <div className="community-bg"></div>
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Tips & <span className="highlight-text">Resources</span></h1>
                        <p className="page-subtitle">Expert advice to elevate your riding experience.</p>
                    </div>
                </div>

                <div className="tips-grid">
                    {tips.map(tip => (
                        <div key={tip.id} className="tip-card glass-panel animate-fade-in">
                            <div className="tip-header">
                                <span className="category-tag">{tip.category}</span>
                            </div>
                            <h3>{tip.title}</h3>
                            <p className="tip-content">{tip.content}</p>
                            <div className="tip-footer">
                                <span className="tip-author">By {tip.author}</span>
                                <button className="btn btn-ghost btn-sm">Read More</button>
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

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }

        .tip-card {
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          transition: var(--transition-fast);
        }

        .tip-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
        }

        .tip-header {
          margin-bottom: 1rem;
        }

        .tip-card h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .tip-content {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .tip-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .tip-author {
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}
