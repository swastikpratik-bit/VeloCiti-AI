"use client";

interface ResultsHeaderProps {
  filteredCount: number;
  totalCount: number;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export function ResultsHeader({ filteredCount, totalCount, sortBy, onSortChange }: ResultsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-muted-foreground">
        Showing {filteredCount} of {totalCount} cars
      </p>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-background/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
      >
        <option value="newest">Sort by: Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="mileage-low">Mileage: Low to High</option>
      </select>
    </div>
  );
}