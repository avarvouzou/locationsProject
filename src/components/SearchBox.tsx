type SearchBoxProps = {
  onSearch: (term: string) => void;
  initialValue?: string;
};

import React, { useState } from 'react';

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);

  return (
    <div className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search for a trip..."
      />
      <button onClick={() => onSearch(searchTerm)}>
        Search
      </button>
    </div>
  );
}

export default SearchBox