import css from './ticker.module.css'

type TickerProps = {
    data: string
}

const Ticker: React.FC<TickerProps> = ({data}) => {
    return ( 
        <article className={css.ticker}>
            <div className={css.tickerInner}>
                <p>{data} &nbsp;*&nbsp; {data}</p> 
            </div>
        </article>
    )
}

export default Ticker