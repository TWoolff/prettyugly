import css from './faqs.module.css'

const Faqs: React.FC = () => {
    return ( 
        <section className={`grid ${css.faqs}`}>
            <article>
                <h1>FAQs</h1>
                <h2>What are your shipping policy?</h2>
                <p>Orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.</p>
                <h2>What are your delivery options?</h2>
                <p>We offer free shipping on all orders over $100. For orders under $100, we offer a flat rate of $10 for shipping.</p>
                <h2>How do I track my order?</h2>
                <p>Once your order has shipped, you will receive an email with a tracking number. You can track your order using the tracking number.</p>
                <h2>What is your return policy?</h2>
                <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.</p>
                <h2>How do I return?</h2>
                <p>To start a return, you can contact us at <a href="mailto:hello@prettyugly.fasion">hello@prettyugly.fasion</a>. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>
                <h2>Can I return an item for a refund?</h2>
                <p>If the return is accepted, you’ll receive a full refund to your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
                <h2>Can I exchange an item?</h2>
                <p>Exchanges are not accepted. If you need a different size, color, or product, please return the item and place a new order.</p>
                
            </article>
        </section>
    )
}

export default Faqs