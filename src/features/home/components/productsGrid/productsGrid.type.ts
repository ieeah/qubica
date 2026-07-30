export type ProductsGridProps = {
  category: string | null;
  searchQuery: string | null;
};

export type ProductsGridHeaderProps = {
  category: string | null;
  searchQuery: string | null;
  onClearFilters?: () => void;
};

export type ProductsSkeletonProps = {
  count?: number;
};