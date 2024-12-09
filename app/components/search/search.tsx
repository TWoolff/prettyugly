import { useAppContext } from '@/app/context'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import css from './search.module.css'

const Search = () => {
  const { state, dispatch } = useAppContext()
  const { language } = state
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: e.target.value } })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: searchTerm } })
      router.push('/products')
    }
  }

  return (
    <input 
      type='text' 
      placeholder={language === 'da-DK' ? 'Søg...' : 'Search...'} 
      value={searchTerm} 
      onChange={handleSearchChange}
      onKeyDown={handleKeyPress}
      className={css.search} 
    />
  )
}

export default Search
