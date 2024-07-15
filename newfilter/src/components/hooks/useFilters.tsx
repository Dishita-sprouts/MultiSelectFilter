import React from "react";

export interface FilterType {
  id: number | string;
  login: string;
}

const useFilters = (defaultFilters: FilterType[] = []) => {
  const [filters, setFilters] = React.useState<FilterType[]>(defaultFilters);
  const [loading, setLoading] = React.useState(false);

  const fetchFilters = async (word: string) => {
     setLoading(true);

     fetch(`https://api.github.com/search/users?q=${word}`)
       .then((response) => response.json())
       .then((data) => {
         setFilters(data.items);
         setLoading(false);
       })
       .catch((e) => console.log("Oops, error", e));
  };

  return [filters, loading, fetchFilters] as const;
};

export default useFilters;
