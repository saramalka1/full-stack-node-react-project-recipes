import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import "./search.css"

const Search = ({placeholder,className}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get("q")
  return (
    <div className={`search-container ${className}`}>
        <MdSearch />
        <input type='text'
        defaultValue={q||""}
        placeholder={placeholder}
        onChange={(e)=>setSearchParams({q:e.target.value})}
        className='search-input' />
    </div>
  )
}

export default Search