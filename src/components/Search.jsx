import React, { useState } from "react";
import Masonry from "react-masonry-css";
import logo from "../assets/oragame.png";
import nounBerries from "../assets/noun_berries_481390.png";
import adagio from "../assets/adagio.png";
import bgImage from "../assets/cabinet-contemporary-counter-1080721.jpg";

// API: TheMealDB
// https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken

function Search() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState(null);

  const breakpointColumnsObj = {
    default: 5,
    900: 2,
    600: 1,
  };

  const handleChange = (e) => setIngredient(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredient.trim()) return;
    await loadRecipes();
  };

  const loadRecipes = async () => {
    setLoading(true);
    setRecipes([]);
    setPromo(null);

    const recipeUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
      const response = await fetch(recipeUrl);
      const data = await response.json();

      setRecipes(data.meals || []);

      // Promo logic
      let promoHTML = null;
      if (ingredient.toLowerCase() === "lemon") {
        promoHTML = {
          image:
            "https://www.botanicchoice.com/_productimages/liquid%20extracts/243x440/p000006126-x.jpg",
          title: "Lemon Balm Liquid Extract",
          text: "Having a delicate lemon scent...",
          link: "https://www.dpbolvw.net/click-100122465-13566323",
        };
      } else if (ingredient.toLowerCase() === "coffee") {
        promoHTML = {
          image:
            "https://www.illy.com/on/demandware.static/-/Library-Sites-illySharedLibrary/default/dwc9d994a9/images/subscription/coffee-subscription/coffee-auto-delivery4-1920x789.jpg",
          title: "20% off + FREE Shipping",
          text: "Sign up for illy a casa recurring coffee deliveries...",
          link: "https://www.tkqlhce.com/click-100122465-13491331",
        };
      } else if (["fish", "salmon"].includes(ingredient.toLowerCase())) {
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
      {/* Hero Section */}
      <div
        id="hero"
        className="section-home"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.1), rgba(10,10,10,0.01)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingBottom: "4rem", // ensures grid isn't clipped
        }}
      >
        {/* Header */}
        <header className="site-header">
          <div className="container-fluid">
            <span id="menu-toggle">
              <i className="hamburger"></i>
            </span>
            <img
              alt="Oragame"
              src={logo}
              style={{ paddingTop: "10px", height: "60px" }}
            />
          </div>
          <div id="birdhouse">
            <img src={nounBerries} alt="berries by Imogen Oh" />
            <p>Our Affiliates</p>
          </div>
          <div id="birdhouse-popup" style={{ display: "none" }}>
            <p>
              Oraga.me is part of Adagio family, the world leader in tea with
              over 1 million listings and tea. We offer the largest selection
              of teas for any recipe. We’re committed to helping chefs find a
              perfect recipe to create unforgettable food experiences with tea.
            </p>
            <a
              href="http://www.kqzyfj.com/click-7903156-241010"
              target="_blank"
              rel="noreferrer"
            >
              <img src={adagio} alt="Adagio Teas" style={{ width: 252, height: 55 }} />
            </a>
          </div>
        </header>

        {/* Search */}
        <div id="hero-search" style={{ marginTop: "2rem" }}>
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

          {loading && <p style={{ marginTop: "1rem" }}>Loading...</p>}

          {promo && (
            <a
              href={promo.link}
              target="_blank"
              rel="noreferrer"
              className="promo-item"
              style={{
                display: "block",
                margin: "2rem auto",
                maxWidth: "300px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="content">
                <img
                  src={promo.image}
                  alt={promo.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                  }}
                />
                <div className="grid-item-title">{promo.title}</div>
                <div className="grid-text">{promo.text}</div>
              </div>
            </a>
          )}

          {!loading && recipes.length === 0 && ingredient && (
            <p>No recipes found for "{ingredient}"</p>
          )}

          {/* Masonry Grid */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="grid"
            columnClassName="grid-column"
          >
            {recipes.map((r) => (
              <div className="grid-item" key={r.idMeal}>
                <img
                  src={r.strMealThumb}
                  alt={r.strMeal}
                  className="grid-item-image"
                  loading="lazy"
                />
                <div className="grid-item-title">{r.strMeal}</div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}

export default Search;
