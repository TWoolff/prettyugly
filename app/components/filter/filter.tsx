'use client'
import { useMemo } from 'react'
import { useAppContext } from '@/app/context'
import Input from '../formelements/input'
import css from './filter.module.css'


const Filter: React.FC = () => {
    const { state, dispatch } = useAppContext()
    const { isSearchVisible, data } = state

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({ type: 'SET_FILTER', payload: { key: name, value } })
    }

    const uniqueCategories = useMemo(() => {
        return Array.from(new Set(data?.map((product: { product: { metadata: { category: any } } }) => product.product.metadata.category)))
    }, [data])

    if (!isSearchVisible) {
        return null
    }

    return (
        <section className={css.filter}>
            <h1>Filter</h1>
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
        </section>
    )
}

export default Filter
