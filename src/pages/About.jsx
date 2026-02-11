import aboutHeader from "../assets/about_header.png"
import { Link } from "react-router"

export default function About() {
  return (
    <>
      <img src={aboutHeader}/>
      <main className="about-main">
        <h1 className="home-title">Do not squeeze in a sedan when you could relax in a van.</h1>
        <p className="home-text">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
        (Hitch costs extra 😉) 
        
        Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
        <div className="about-explore-container">
          <h2 className="about-explore-title">Your destination is waiting.
          Your van is ready.</h2>
          <div className='home-btn-container'>
            <Link to="../vans" className="about-explore-btn">Explore our vans</Link>
          </div>
        </div>
      </main>
      </>
    )
}