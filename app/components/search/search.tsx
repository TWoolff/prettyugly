import { useAppContext } from '@/app/context'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import css from './search.module.css'

const Search = () => {
  const { state } = useAppContext()
  const { language } = state
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('search', searchTerm.trim())
      router.push(`/products?${params.toString()}`)
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
