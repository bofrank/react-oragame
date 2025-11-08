import React, { useState } from "react";
import Masonry from "react-masonry-css";
import logo from "../assets/oragame.png";
import nounBerries from "../assets/noun_berries_481390.png";
import adagio from "../assets/adagio.png";

// API: https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken

function Search() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!ingredient.trim()) return;
    await loadRecipes();
  }

  async function loadRecipes() {
    setLoading(true);
    setRecipes([]);

    const recipeUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
      const response = await fetch(recipeUrl);
      const data = await response.json();

      // Set recipes
      setRecipes(data.meals || []);

      // Optional: promo logic
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
  }

  const breakpointColumnsObj = {
    default: 5,
    900: 2,
    600: 1,
  };

  return (
    <div className="section-header">
      <div id="hero" className="section-home">

        <header className="site-header">
          <div className="container-fluid">
            <span id="menu-toggle">
              <i className="hamburger"></i> 
            </span>
            <img alt="Oragame" src={logo} style={{paddingTop:10 + 'px',height:60 + 'px'}} />
          </div>
          <div id="birdhouse" className="">  
            <img src={nounBerries} alt="berries by Imogen Oh from the Noun Project" />
            <p>Our Affiliates</p>
          </div>
          <div id="birdhouse-popup" style={{display:'none'}}>
            <p>Oraga.me is part of Adagio family, the world leader in tea with over 1 million listings and tea. We offer the largest selection of teas for any recipe. We’re committed to helping chefs find a perfect recipe to create unforgettable food experiences with tea.</p>
            <a href="http://www.kqzyfj.com/click-7903156-241010" target="_blank"><img alt="Adagio Teas" src={adagio} style={{width:252 + 'px',height:55 + 'px'}} /></a>
          </div>
        </header>

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
                    onChange={(e) => setIngredient(e.target.value)}
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

          <div style={{ marginTop: "2rem" }}>
            {!loading && recipes.length === 0 && ingredient && (
              <p>No recipes found for “{ingredient}”</p>
            )}

            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="grid"
              columnClassName="grid-column"
            >
              {recipes.map((r) => (
                <div className="grid-item" key={r.idMeal} onClick={r.link}>
                  <img
                    src={r.strMealThumb}
                    alt={r.strMeal}
                    className="grid-item-image"
                  />
                  <div className="grid-item-title">{r.strMeal}</div>
                </div>
              ))}
            </Masonry>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Search;
