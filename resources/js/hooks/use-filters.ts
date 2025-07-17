import { useState, useCallback } from 'react';

// Define types for the hook
type FilterValue = string | number | boolean | null | undefined;

type FiltersObject = Record<string, FilterValue>;

type OnFiltersApplied = (filters: FiltersObject) => void;

interface UseFiltersReturn<T extends FiltersObject> {
  filters: T;
  setFilter: (key: keyof T, value: FilterValue) => void;
  applyFilters: () => void;
  setAndApplyFilters: (key: keyof T, value: FilterValue) => void;
  resetFilters: () => void;
}
export function useFilters<T extends FiltersObject>(
  rawFilters: T,
  onFiltersApplied: OnFiltersApplied,
  resetFiltersObj?: Partial<T> | null
): UseFiltersReturn<T> {
  const [filters, setFilters] = useState<T>({ ...rawFilters });

  const setFilter = useCallback((key: keyof T, value: FilterValue) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const applyFilters = useCallback(() => {
    const filteredObj: FiltersObject = {};

    // Only include filters that have truthy values
    for (const key in filters) {
      if (filters[key]) {
        filteredObj[key] = filters[key];
      }
    }

    onFiltersApplied(filteredObj);
  }, [filters, onFiltersApplied]);

  const setAndApplyFilters = useCallback((key: keyof T, value: FilterValue) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [key]: value
      };

      // Apply filters with the new state
      const filteredObj: FiltersObject = {};
      for (const filterKey in newFilters) {
        if (newFilters[filterKey]) {
          filteredObj[filterKey] = newFilters[filterKey];
        }
      }

      // Call onFiltersApplied asynchronously to ensure state update
      setTimeout(() => onFiltersApplied(filteredObj), 0);

      return newFilters;
    });
  }, [onFiltersApplied]);

  const resetFilters = useCallback(() => {
    let newFilters: T;

    if (!resetFiltersObj) {
      // Reset all filters to null
      newFilters = Object.keys(rawFilters).reduce((acc, key) => {
        (acc as any)[key as keyof T] = null as FilterValue;
        return acc;
      }, {} as T);
    } else {
      // Reset to specific values from resetFiltersObj
      newFilters = { ...rawFilters };
      Object.entries(resetFiltersObj).forEach(([key, value]) => {
        if (key in newFilters) {
          (newFilters as any)[key as keyof T] = value as FilterValue;
        }
      });
    }

    setFilters(newFilters);

    // Apply the reset filters
    const filteredObj: FiltersObject = {};
    for (const key in newFilters) {
      if (newFilters[key]) {
        filteredObj[key] = newFilters[key];
      }
    }

    setTimeout(() => onFiltersApplied(filteredObj), 0);
  }, [rawFilters, resetFiltersObj, onFiltersApplied]);

  return {
    filters,
    setFilter,
    applyFilters,
    setAndApplyFilters,
    resetFilters,
  };
}
