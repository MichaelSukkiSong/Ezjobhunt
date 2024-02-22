"use client";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { RefinementList } from "./RefinementList";
import { Hit } from "./Hit";

const searchClient = algoliasearch(
  "PZ8WUG2CSE",
  "d2a254690cc4542fa5ac4c76510c2cb6"
);

export function SearchCandidates() {
  return (
    <div className="md:p-6 min-h-full">
      <InstantSearch indexName="resumes" searchClient={searchClient}>
        {/* <RefinementList attribute="headline" /> */}
        <SearchBox
          placeholder="Job Title / Experience / Required Skills..."
          autoFocus
          classNames={{
            root: "flex flex-col justify-center p-4",
            form: "flex items-center bg-white  border border-gray-300 focus-within:border-black",
            input:
              "pl-3 pt-1 pb-1 grow outline-none placeholder:text-sm placeholder:md:text-base",
            submit: "bg-gray-100 text-gray-800 p-2",
            reset: "bg-gray-100 text-gray-800 p-2",
            loadingIndicator: "bg-gray-100 text-gray-800 p-2",
            submitIcon: "",
            resetIcon: "",
            loadingIcon: "",
          }}
        />

        <Hits
          hitComponent={Hit}
          classNames={{
            list: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ",
          }}
        />
      </InstantSearch>
    </div>
  );
}
