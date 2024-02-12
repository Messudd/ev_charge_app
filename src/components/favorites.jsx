import React from "react";
import "../css/favorite.css";

const Favorites = () => {
  return (
    <>
      <header className="fav-header"></header>
      <main className="fav-main">
        <section className="links-fav">
            <button>Add Favorite</button>
            <button>Favorite List</button>
        </section>
        <section className="container-fav">
          <article className="add-fav"></article>
          <article className="show-favList"></article>
        </section>
      </main>
    </>
  );
};

export default Favorites;
