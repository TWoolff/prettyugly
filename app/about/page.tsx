'use client'
import { useAppContext } from "../context"

const About = () => {
    const { state, dispatch } = useAppContext()
    console.log(state)
    return ( 
        <section>
            <h1>About</h1>
        </section>
    )
}

export default About