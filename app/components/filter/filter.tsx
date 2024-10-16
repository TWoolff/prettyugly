'use client'
import { useMemo, useState } from 'react'
import { useAppContext } from '@/app/context'
import { useChangeCurrency } from '@/app/utils/useChangeCurrency'
import Input from '../formelements/input'
import Dropdown from '../formelements/dropdown'
import css from './filter.module.css'

const Filter: React.FC = () => {
  const { state, dispatch } = useAppContext()
  const { data } = state
  const [searchTerm, setSearchTerm] = useState('')
  const { changeCurrency } = useChangeCurrency();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_FILTER', payload: { key: name, value } })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: e.target.value } })
  }

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(data?.map((product: { product: { metadata: { category: any } } }) => product.product.metadata.category)))
  }, [data])

  const uniqueColors = useMemo(() => {
    const allColors = data?.flatMap((product: { product: { metadata: { color: string } } }) =>
      product.product.metadata.color ? product.product.metadata.color.split(',').map(color => color.trim().toLowerCase()) : []
    )
    return Array.from(new Set(allColors))
  }, [data])

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeCurrency(e.target.value as 'DKK' | 'EUR' | 'SEK');
  };

  return (
    <section className={`${css.filter} grid`}>
      <h2>Filter</h2>
      <div>
        <h2>Currency</h2>
        <Dropdown onChange={handleCurrencyChange} value={state.currency ?? ''} options={['DKK', 'EUR', 'SEK']} name={'Currency'} className={''} />
      </div>
      <div>
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <h2>Categories</h2>
        <Input
          key='All'
          onChange={handleFilterChange}
          name='category'
          label='All'
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
            checked={state.filters.category === category}
          />
        ))}
      </div>
      <div>
        <h2>Colors</h2>
        <Input
          key='AllColors'
          onChange={handleFilterChange}
          name='color'
          label='All'
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
            checked={state.filters.color === color}
          />
        ))}
      </div>
    </section>
  )
}

export default Filter
