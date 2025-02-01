import css from "./ticker.module.css";

type TickerProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any;
};

const Ticker: React.FC<TickerProps> = ({ data }) => {
	return (
		<article className={css.ticker}>
			<div className={css.tickerInner}>
				<p>{data} &nbsp;</p>
				<p>{data} &nbsp;</p>
			</div>
		</article>
	);
};

export default Ticker;
