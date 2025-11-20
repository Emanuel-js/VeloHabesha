export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Velo<span className="highlight">Habesha</span></h3>
          <p>Connecting riders, exploring Ethiopia.</p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4>Community</h4>
            <a href="#">Adventures</a>
            <a href="#">Events</a>
            <a href="#">Forum</a>
          </div>
          <div className="link-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Safety</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>

      <div className="container copyright">
        <p>&copy; 2024 Biker Community App. All rights reserved.</p>
      </div>
    </footer>
  );
}
