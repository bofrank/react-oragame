import React, { useState } from "react";
import bgImage from "../assets/cabinet-contemporary-counter-1080721.jpg";

function Search() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loadRecipes();
  };

  const handleChange = (e) => {
    setIngredient(e.target.value);
  };

  const loadRecipes = async () => {
    if (!ingredient.trim()) return;

    setLoading(true);
    setRecipes([]);

    const recipeUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
      const response = await fetch(recipeUrl);
      const data = await response.json();

      // ✅ TheMealDB returns data.meals (array or null)
      setRecipes(data.meals || []);

      // 🎁 Promo logic (unchanged)
      let promoHTML = null;
      if (ingredient === "lemon") {
        promoHTML = {
          image:
            "https://www.botanicchoice.com/_productimages/liquid%20extracts/243x440/p000006126-x.jpg",
          title: "Lemon Balm Liquid Extract",
          text: "Having a delicate lemon scent...",
          link: "https://www.dpbolvw.net/click-100122465-13566323",
        };
      } else if (ingredient === "coffee") {
        promoHTML = {
          image:
            "https://www.illy.com/on/demandware.static/-/Library-Sites-illySharedLibrary/default/dwc9d994a9/images/subscription/coffee-subscription/coffee-auto-delivery4-1920x789.jpg",
          title: "20% off + FREE Shipping",
          text: "Sign up for illy a casa recurring coffee deliveries...",
          link: "https://www.tkqlhce.com/click-100122465-13491331",
        };
      } else if (["fish", "salmon"].includes(ingredient)) {
        promoHTML = {
          image: "https://www.ftjcfx.com/image-7903156-14026812",
          title: "FREE Shipping",
          text: "Free Shipping On Wild Seafood & Organic Fare!",
          link: "https://www.tkqlhce.com/click-100122465-11848684",
        };
      }

      setPromo(promoHTML);
    } catch (err) {
      console.error("fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-header">
      <div id="hero" className="section-home">
        <div id="hero-bg">
          <div className="bg" style={{ backgroundImage: `url(${bgImage})` }} />
        </div>

        <div id="hero-gradient" />

        <div id="hero-search">
          <h2>Discover the best recipes</h2>

          <form
            onSubmit={handleSubmit}
            className="container-fluid container-constrain"
          >
            <div className="row row-condensed">
              <div className="col-sm-12">
                <div className="form-element">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={handleChange}
                    placeholder="What ingredient do you want to use?"
                    className="form-control input-lg form-control-icon icon-location"
                  />
                </div>
              </div>
            </div>
          </form>

          {loading && <p>Loading...</p>}

          {promo && (
            <a
              href={promo.link}
              target="_blank"
              rel="noreferrer"
              className="item photo promo-card"
            >
              <div className="content">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="grid-item-image"
                />
                <div className="grid-item-title">{promo.title}</div>
                <div className="grid-text">{promo.text}</div>
              </div>
            </a>
          )}

          {/* 🧱 Masonry Grid */}
          <div className="grid">
            {!loading && recipes.length > 0 ? (
              recipes.map((r) => (
                <div key={r.idMeal} className="grid-item">
                  <img
                    src={r.strMealThumb}
                    //src="https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg"
                    alt={r.strMeal}
                    className="grid-item-image"
                  />
                  <div className="grid-item-title">{r.strMeal}</div>
                </div>
              ))
            ) : (
              !loading &&
              ingredient && <p>No recipes found for "{ingredient}"</p>
            )}
          </div>

          <div style={{ width: 300, height: 300, border: "2px solid blue" }}>
            <img
              src="https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg"
              alt="Test"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Search;
