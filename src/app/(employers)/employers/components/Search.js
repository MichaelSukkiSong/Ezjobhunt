"use client";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox } from "react-instantsearch";

const searchClient = algoliasearch(
  "PZ8WUG2CSE",
  "d2a254690cc4542fa5ac4c76510c2cb6"
);

export function Search() {
  return (
    <InstantSearch indexName="resumes" searchClient={searchClient}>
      <SearchBox />
    </InstantSearch>
  );
}
