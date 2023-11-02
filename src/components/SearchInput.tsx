import { ChangeEvent } from 'react'

type SearchInputProps = {
  searchTerm: string
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const SearchInput = ({ searchTerm, handleSearch }: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder="Search products ..."
      value={searchTerm}
      onChange={handleSearch}
      className="search-input"
    />
  )
}

export default SearchInput
