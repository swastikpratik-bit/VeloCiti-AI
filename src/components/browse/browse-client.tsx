"use client";

import {
  SearchControls,
  ResultsHeader,
  CarsGrid,
  LoadMoreButton,
} from "@/src/components/browse";
import { useBrowseLogic } from "@/src/components/browse/use-browse-logic";
import { useEffect, useState } from "react";
import { BROWSE_CARS_v2 } from "@/src/constants/browse-cars";


export function BrowseClient() {

 const [BROWSE_CARS , setBROWSE_CARS ] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const res = await fetch("/api/cars");
      const data = await res.json();
      setBROWSE_CARS(data);
    }
    fetchCars();
  }, []);


  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    selectedFilters,
    likedCars,
    isMobile,
    sortBy,
    setSortBy,
    filteredCars,
    toggleFilter,
    toggleLike,
  } = useBrowseLogic(BROWSE_CARS);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SearchControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isMobile={isMobile}
          selectedFilters={selectedFilters}
          onToggleFilter={toggleFilter}
        />
        
        <ResultsHeader
          filteredCount={filteredCars.length}
          totalCount={BROWSE_CARS.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CarsGrid
            cars={filteredCars}
            viewMode={viewMode}
            isMobile={isMobile}
            likedCars={likedCars}
            onToggleLike={toggleLike}
          />
          
          <LoadMoreButton />
        </div>
      </section>
    </>
  );
}