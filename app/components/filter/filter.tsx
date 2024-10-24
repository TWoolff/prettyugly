'use client'
import { useEffect, useMemo, useState } from 'react'
import { useAppContext } from '@/app/context'
import { useChangeCurrency } from '@/app/utils/useChangeCurrency'
import { getProducts } from '@/app/utils/getProducts'
import Dropdown from '../formelements/dropdown'
import Button from '../formelements/button'
import css from './filter.module.css'

interface FilterProps {
  onButtonClick: () => void;
}

const Filter: React.FC<FilterProps> = ({ onButtonClick }) => {
  const { state, dispatch } = useAppContext()
  const { data, language, allProducts } = state

  const [searchTerm, setSearchTerm] = useState('')
  const { changeCurrency } = useChangeCurrency();
  const languageSuffix = language === 'da-DK' ? '_da' : '_en'

  const uniqueCategories = useMemo(() => {
    if (!allProducts) return []
    const categories = allProducts
        .map((item: { metadata: Record<string, string> }) => item.metadata[`category${languageSuffix}`])
        .filter((category: string | null | undefined): category is string => category !== undefined && category !== null)
    return Array.from(new Set(categories))
  }, [allProducts, languageSuffix]) 
  
  const uniqueColors = useMemo(() => {
    if (!allProducts) return []
    const allColors = allProducts.flatMap((item: any) => {
      const color = item.metadata[`color${languageSuffix}`]
      return color ? color.split(',').map((c: string) => c.trim().toLowerCase()) : []
    })
    return Array.from(new Set(allColors)).filter(Boolean)
  }, [allProducts, languageSuffix])

  const handleFilterChange = async (name: string, value: string) => {
    dispatch({ type: 'SET_FILTER', payload: { key: name, value } })

    if (name === 'category') {
      const products = await getProducts(value || undefined, language)
      const sanitizedProducts = products.map((product: { description: any }) => ({
          ...product,
          description: product.description || ''
      }))
      dispatch({ 
        type: 'SET_STATE', 
        payload: { 
            data: sanitizedProducts,
            allProducts: state.allProducts || sanitizedProducts,
            filters: state.filters,
            language: state.language,
            currency: state.currency
        }
      })
    }

    onButtonClick()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch({ type: 'SET_FILTER', payload: { key: 'search', value: e.target.value } })
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeCurrency(e.target.value as 'DKK' | 'EUR' | 'SEK');
  };

  useEffect(() => {
    // Preserve the category and color filters when changing language
    const currentCategory = state.filters.category;
    const currentColor = state.filters.color;
    dispatch({ type: 'RESET_FILTERS' });
    if (currentCategory) {
      dispatch({ type: 'SET_FILTER', payload: { key: 'category', value: currentCategory } });
    }
    if (currentColor) {
      dispatch({ type: 'SET_FILTER', payload: { key: 'color', value: currentColor } });
    }
    setSearchTerm('');
  }, [language, dispatch]);

  // Add this useEffect at the component level
  useEffect(() => {
    const initializeProducts = async () => {
        if (!state.allProducts) {
            const products = await getProducts()
            if (products) {
                const sanitizedProducts = products.map((product: { description: any }) => ({
                    ...product,
                    description: product.description || ''
                }))
                dispatch({ 
                    type: 'SET_STATE', 
                    payload: { 
                        data: sanitizedProducts,
                        allProducts: sanitizedProducts
                    }
                })
            }
        }
    }
    initializeProducts()
  }, [])

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
        <Button 
            onClick={() => handleFilterChange('category', '')} 
            title={language === 'da-DK' ? 'Alle' : 'All'} 
        />
        {uniqueCategories.map((category, i) => (
            <Button 
                key={i} 
                onClick={() => handleFilterChange('category', category as string)} 
                title={category as string} 
            />
        ))}
      </div>
      <div>
        <h2>{language === 'da-DK' ? 'Farver' : 'Colors'}</h2>
        <Button 
            onClick={() => handleFilterChange('color', '')} 
            title={language === 'da-DK' ? 'Alle' : 'All'} 
        />
        {uniqueColors.map((color, i) => (
            <Button 
                key={i} 
                onClick={() => handleFilterChange('color', color as string)} 
                title={color as string} 
            />
        ))}
      </div>
    </section>
  )
}

export default Filter
