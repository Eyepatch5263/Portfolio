import './home.css'
import Social from './Social'
import Data from './Data'
import ScrollDown from './ScrollDown'
import Image from 'next/image'
const Home = () => {
    return (
        <section className='home section' id="home">
            <div className="home__container container grid">
                <div className="home__content grid">
                    <Social />
                    <Image
                        src="/profile.webp"
                        alt="Profile"
                        width={300}
                        height={350}
                        priority
                        className="home__img"
                        style={{ objectFit: "cover" }}
                    />                
                <Data />
            </div>
            <ScrollDown />
        </div>
    </section >
    )
}

export default Home
