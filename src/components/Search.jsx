import React, { useState } from "react";
import bgImage from "../assets/cabinet-contemporary-counter-1080721.jpg";

const APP_ID = "5fb37b30";
const APP_KEY = "f3060af875eda52baf4d68b1fdbdbf43";

function Search() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    await loadRecipes();
  }

  function handleChange(e) {
    setIngredient(e.target.value);
  }

  async function loadRecipes() {
    setLoading(true);
    setRecipes([]);

    const recipeUrl = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${ingredient}`;

    try {
      const response = await fetch(recipeUrl);
      const data = await response.json();

      // Promo logic
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
      setRecipes(data.hits || []);
    } catch (err) {
      console.error("fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section-header">
      <div id="hero" className="section-home">
        <div id="hero-bg">
          <div
            className="bg"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        </div>

        <div id="hero-gradient" />

        <div id="hero-search">
          <h2>Discover the best recipes</h2>

          <form onSubmit={handleSubmit} className="container-fluid container-constrain">
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
              className="item photo"
            >
              <div className="content">
                <img src={promo.image} alt={promo.title} className="grid-item-image" />
                <div className="grid-item-title">{promo.title}</div>
                <div className="grid-text">{promo.text}</div>
              </div>
            </a>
          )}

          <div className="grid">
            {recipes.length > 0 ? (
              recipes.map((r, index) => (
                <a
                  key={index}
                  href={r.recipe.url}
                  target="_blank"
                  rel="noreferrer"
                  className="item photo"
                >
                  <div className="content">
                    <img
                      src={r.recipe.image}
                      alt={r.recipe.label}
                      className="grid-item-image"
                    />
                    <div className="grid-item-title">{r.recipe.label}</div>
                    <div className="grid-text">
                      {r.recipe.ingredientLines.map((ing, i) => (
                        <div key={i}>{ing}</div>
                      ))}
                    </div>
                  </div>
                </a>
              ))
            ) : (
              !loading &&
              ingredient && <p>No recipes found for "{ingredient}"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
