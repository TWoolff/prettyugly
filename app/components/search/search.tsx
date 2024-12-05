import { useAppContext } from '@/app/context'
import { useState } from 'react'
import css from './search.module.css'

const Search = () => {
  const { state, dispatch } = useAppContext()
  const { language } = state
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: e.target.value } })
	}

	return <input type='text' placeholder={language === 'da-DK' ? 'Søg...' : 'Search...'} value={searchTerm} onChange={handleSearchChange} className={css.search} />

}

export default Search
