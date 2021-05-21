import React from "react";
import ShowList from "../../components/ShowList/ShowList";
import Search from "../../components/Search/Search";
import { populars } from "../../mock/popular-tv-show";

export default function HomePage() {
  const shows = populars.results;

  return (
    <div className="page">
      <div className="page__content-wrapper">
        <Search />
        <ShowList title="popular shows" shows={shows} />
      </div>
    </div>
  );
}
