import SavedProducts from '../components/saved/saved'
import css from './profile.module.css'

const Profile: React.FC = () => {
    return ( 
        <section className={`grid ${css.profile}`}>
            <article>
                <h1>Your Profile</h1>
                <h2>Account Information</h2>
                <p>Name: John Doe</p>
                <p>Email:</p>
                <p>Phone:</p>
                <p>Address:</p>
                <h2>Order History</h2>
                <p>Order 1</p>
                UNSUBSCRIBE BTN
            </article>
            <SavedProducts />
        </section>
    )
}

export default Profile