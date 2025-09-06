'use client'
import React, { useState } from 'react'
import './services.css'
const Services = () => {
    const [toggleState, setToggleState] = useState(0)

    const toggleTab = (index) => {
        setToggleState(index)
    }
    return (
        <section className="services section" id="services">
            <h2 className="section__title">Services</h2>
            <span className="section__subtitle">What i offer</span>
            <div className="services__container container grid">

                <div className="services__content">
                    <div>
                        <i className="fas fa-th-large services__icon"></i>
                        <h3 className="services__title">UI/UX <br /> Designer</h3>
                    </div>

                    <span className="services__button" onClick={() => toggleTab(1)}>View More
                        <i class="fas fa-arrow-right services__button-icon"></i>
                    </span>

                    <div className={toggleState === 1 ? "services__modal" : "active__modal"}>
                        <div className="services__modal-content">
                            <i onClick={() => toggleTab(0)} class="fas fa-times services__modal-close"></i>
                            <h3 className="services__modal-title">
                                UI/UX Designer.
                            </h3>
                            <p className="services__modal-description">
                                Service with more than 1 years of experience. Providing quality works to clients.
                            </p>
                            <ul className="services__modal-services grid">
                                <li className="services__modal-service">
                                    <i class="fas fa-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Develop user interfaces.
                                    </p>
                                </li>

                                <li className="services__modal-service">
                                    <i class="fas fa-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Wire Framing.
                                    </p>
                                </li>

                                <li className="services__modal-service">
                                    <i class="fas fa-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Design and mockups of products for college clubs and Societies.
                                    </p>
                                </li>
                                <li className="services__modal-service">
                                    <i class="fas fa-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Designed Logos and custom vectors.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="services__content">
                    <div>
                        <i className="fas fa-arrow-right services__icon"></i>
                        <h3 className="services__title">Web <br /> Developer</h3>
                    </div>

                    <span onClick={() => toggleTab(2)} className="services__button"  >View More
                        <i class="fas fa-arrow-right services__button-icon"></i>
                    </span>
                    <div className={toggleState === 2 ? "services__modal" : "active__modal"}>
                        <div className="services__modal-content">
                            <i onClick={() => { toggleTab(0) }} class="fas fa-times services__modal-close"></i>
                            <h3 className="services__modal-title">
                                Web Developer
                            </h3>
                            <p className="services__modal-description">
                                Service with more than 1 years of experience. Providing quality works to clients.
                            </p>
                            <ul className="services__modal-services grid">
                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        System Designer.
                                    </p>
                                </li>

                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        API Integration.
                                    </p>
                                </li>

                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Frontend Developer.
                                    </p>
                                </li>
                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Backend Developer.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="services__content">
                    <div>
                        <i className="fas fa-pen services__icon"></i>
                        <h3 className="services__title">App <br /> Developer</h3>
                    </div>

                    <span onClick={() => { toggleTab(3) }} className="services__button" >View More
                        <i class="fas fa-arrow-right services__button-icon"></i>
                    </span>
                    <div className={toggleState === 3 ? "services__modal" : "active__modal"}>
                        <div className="services__modal-content">
                            <i onClick={() => { toggleTab(0) }} class="fas fa-times services__modal-close"></i>
                            <h3 className="services__modal-title">
                                App Developer
                            </h3>
                            <p className="services__modal-description">
                                Service with more than 1 years of experience. Providing quality works to clients.
                            </p>
                            <ul className="services__modal-services grid">
                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Develop User interface.
                                    </p>
                                </li>

                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Follows solid principle for app architecture
                                    </p>
                                </li>

                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Design and mockups of products for companies.
                                    </p>
                                </li>
                                <li className="services__modal-service">
                                    <i class="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">
                                        Design Logos
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Services
