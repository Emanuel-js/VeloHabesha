import Link from 'next/link';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-content container">
            <h1 className="hero-title">
              Ride with <span className="highlight">VeloHabesha</span>
            </h1>
            <p className="hero-subtitle animate-fade-in">
              Join the ultimate community for bikers. Share adventures, find gear, and connect with riders who share your passion.
            </p>
          </div>
          <div className="hero-actions animate-fade-in">
            <Link href="/adventures" className="btn btn-primary">Start Riding</Link>
            <Link href="/events" className="btn btn-ghost">Explore Community</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories">
        <div className="container">
          <h2 className="section-title">Choose Your Style</h2>
          <div className="category-grid">
            {['Mountain', 'Commuter', 'Road', 'Gravel'].map((cat) => (
              <div key={cat} className="category-card glass-panel">
                <h3>{cat}</h3>
                <p>Explore {cat.toLowerCase()} biking adventures and gear.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Adventures Preview */}
      <section className="section featured">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Adventures</h2>
            <button className="btn btn-ghost">View All</button>
          </div>
          <div className="adventure-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="adventure-card glass-panel">
                <div className="card-image"></div>
                <div className="card-content">
                  <h3>Sunset Ridge Trail</h3>
                  <p>A breathtaking ride through the mountains...</p>
                  <div className="card-meta">
                    <span>Mountain</span>
                    <span>•</span>
                    <span>2h ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
