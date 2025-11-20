'use client';

const products = [
    {
        id: 1,
        name: "Pro Mountain Helmet",
        price: "3,500 ETB",
        category: "Gear",
        image: "linear-gradient(135deg, #333 0%, #000 100%)",
        shop: "Addis Bike Center"
    },
    {
        id: 2,
        name: "All-Terrain Tires",
        price: "1,200 ETB",
        category: "Parts",
        image: "linear-gradient(135deg, #444 0%, #111 100%)",
        shop: "Velocity Cycles"
    },
    {
        id: 3,
        name: "Hydration Pack",
        price: "2,800 ETB",
        category: "Accessories",
        image: "linear-gradient(135deg, #555 0%, #222 100%)",
        shop: "Ethio Sports"
    }
];

const shops = [
    {
        id: 1,
        name: "Addis Bike Center",
        location: "Bole, Addis Ababa",
        rating: 4.8,
        specialty: "Mountain & Road"
    },
    {
        id: 2,
        name: "Velocity Cycles",
        location: "Piassa, Addis Ababa",
        rating: 4.5,
        specialty: "Repairs & Parts"
    }
];

export default function ShopPage() {
    return (
        <div className="page-container">
            <div className="shop-bg"></div>
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Gear & <span className="highlight-text">Shops</span></h1>
                        <p className="page-subtitle">Curated recommendations and trusted local bike shops.</p>
                    </div>
                </div>

                <section className="shop-section">
                    <h2 className="section-title">Featured Gear</h2>
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card glass-panel animate-fade-in">
                                <div className="product-image" style={{ background: product.image }}></div>
                                <div className="product-details">
                                    <span className="product-category">{product.category}</span>
                                    <h3>{product.name}</h3>
                                    <p className="product-price">{product.price}</p>
                                    <p className="product-shop">Available at {product.shop}</p>
                                    <button className="btn btn-ghost btn-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="shop-section">
                    <h2 className="section-title">Local Shops</h2>
                    <div className="shops-grid">
                        {shops.map(shop => (
                            <div key={shop.id} className="shop-card glass-panel animate-fade-in">
                                <div className="shop-info">
                                    <h3>{shop.name}</h3>
                                    <p className="shop-location">📍 {shop.location}</p>
                                    <p className="shop-specialty">{shop.specialty}</p>
                                </div>
                                <div className="shop-rating">
                                    <span className="star">★</span>
                                    <span>{shop.rating}</span>
                                </div>
                                <button className="btn btn-primary btn-sm">Get Directions</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
