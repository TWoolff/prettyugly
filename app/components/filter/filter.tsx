'use client'
import { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '@/app/context'
import { useChangeCurrency } from '@/app/utils/useChangeCurrency'
import Input from '../formelements/input'
import Dropdown from '../formelements/dropdown'
import css from './filter.module.css'

const Filter: React.FC = () => {
  const { state, dispatch } = useAppContext()
  const { data, language } = state
  const [searchTerm, setSearchTerm] = useState('')
  const { changeCurrency } = useChangeCurrency();

  console.log(state)
  const languageSuffix = language === 'da-DK' ? '_da' : '_en'

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(data?.map((item: any) => item.product.metadata[`category${languageSuffix}`])))
  }, [data, languageSuffix])
  
  const uniqueColors = useMemo(() => {
    const allColors = data?.flatMap((item: any) => {
      const color = item.product.metadata[`color${languageSuffix}`]
      return color ? color.split(',').map((c: string) => c.trim().toLowerCase()) : []
    })
    return Array.from(new Set(allColors))
  }, [data, languageSuffix])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_FILTER', payload: { key: name, value } })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: e.target.value } })
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeCurrency(e.target.value as 'DKK' | 'EUR' | 'SEK');
  };

  useEffect(() => {
    dispatch({ type: 'RESET_FILTERS' })
    setSearchTerm('')
  }, [language, dispatch])

  return (
    <section className={`${css.filter} grid`}>
      <h2>Filter</h2>
      <div>
        <h2>{language === 'da-DK' ? 'Valuta' : 'Currency'}</h2>
        <Dropdown onChange={handleCurrencyChange} value={state.currency ?? ''} options={['DKK', 'EUR', 'SEK']} name={'Currency'} className={''} />
      </div>
      <div>
        <h2>{language === 'da-DK' ? 'Søg' : 'Search'}</h2>
        <input
          type="text"
          placeholder={language === 'da-DK' ? 'Søg...' : 'Search...'}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <h2>{language === 'da-DK' ? 'Kategorier' : 'Categories'}</h2>
        <Input
          key='All'
          onChange={handleFilterChange}
          name='category'
          label={language === 'da-DK' ? 'Alle' : 'All'}
          value=''
          type='radio'
          id='All'
          checked={state.filters.category === ''}
        />
        {uniqueCategories.map((category, i) => (
          <Input
            key={i}
            onChange={handleFilterChange}
            name='category'
            label={category as string}
            value={category as string}
            type='radio'
            id={category as string}
            checked={state.filters.category?.toLowerCase() === (category as string)?.toLowerCase()}
          />
        ))}
      </div>
      <div>
        <h2>{language === 'da-DK' ? 'Farver' : 'Colors'}</h2>
        <Input
          key='AllColors'
          onChange={handleFilterChange}
          name='color'
          label={language === 'da-DK' ? 'Alle' : 'All'}
          value=''
          type='radio'
          id='AllColors'
          checked={state.filters.color === ''}
        />
        {uniqueColors.map((color, i) => (
          <Input
            key={i}
            onChange={handleFilterChange}
            name='color'
            label={color as string}
            value={color as string}
            type='radio'
            id={color as string}
            checked={state.filters.color?.toLowerCase() === (color as string)?.toLowerCase()}
          />
        ))}
      </div>
    </section>
  )
}

export default Filter
