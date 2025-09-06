import React from 'react'

const Info = () => {
  return (
    <div>
    <div className="about__info grid">
        <div className="about__box ">
        <i class='fas fa-award about__icon'></i>
            <h3 className="about__title">Experience</h3>
            <span className="about__subtitle">1 Years Working</span>
        </div>

        <div className="about__box">
        <i class='fas fa-briefcase about__icon' ></i>
            <h3 className="about__title">Completed</h3>
            <span className="about__subtitle">10 + Projects</span>
        </div>

        <div className="about__box">
        <i class='fas fa-headset about__icon' ></i>
            <h3 className="about__title">Support</h3>
            <span className="about__subtitle">Online 24/7</span>
        </div>
    </div>
    </div>
  )
}

export default Info
