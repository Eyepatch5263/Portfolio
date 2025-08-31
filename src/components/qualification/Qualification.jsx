'use client'
import React,{useState} from 'react'
import './qualification.css'
const Qualification = () => {

    const [toggleState,setToggleState]=useState(1)

    const toggleTab=(index)=>{
        setToggleState(index)
    }
    return (
        <section className="qualification section">
            <h2 className="section__title">Qualifications</h2>
            <span className="section__subtitle">My Personal Journey</span>
            <div className="qualification__container container">
                <div className="qualification__tabs">
                    <div className={toggleState===1?"qualification__button qualification__active button--flex":"qualification__button  button--flex"} onClick={()=>{toggleTab(1)}}>

                        <i class="uil uil-graduation-cap qualification__icon"></i>Education
                    </div>

                    <div className={toggleState===2?"qualification__button qualification__active button--flex":"qualification__button  button--flex"} onClick={()=>toggleTab(2)}>
                        <i class="uil uil-briefcase-alt qualification__icon"></i>Experience
                    </div>
                </div>
                <div className="qualification__sections">
                    <div className={toggleState===1?"qualification__content qualification__content-active":"qualification__content"}>
                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">Web Design</h3>
                                <span className="qualification__subtitle">
                                    National Institute of Technology, Hamirpur
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2022 - present
                                </div>
                            </div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                        </div>

                        <div className="qualification__data">
                            <div></div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                            <div>
                                <h3 className="qualification__title">Ui/Ux Designer</h3>
                                <span className="qualification__subtitle">
                                    National Institute of Technology, Hamirpur
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2023 - present
                                </div>
                            </div>

                        </div>

                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">Web Development</h3>
                                <span className="qualification__subtitle">
                                    National Institute of Technology, Hamirpur
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2022 - present
                                </div>
                            </div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                        </div>

                        <div className="qualification__data">
                            <div></div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                            <div>
                                <h3 className="qualification__title">App Development</h3>
                                <span className="qualification__subtitle">
                                    National Institute of Technology, Hamirpur
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2023 - 2024
                                </div>
                            </div>

                        </div>
                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">DevOps</h3>
                                <span className="qualification__subtitle">
                                    National Institute of Technology, Hamirpur
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2024 - present
                                </div>
                            </div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                        </div>
                    </div>

                    <div className={toggleState===2?"qualification__content qualification__content-active":"qualification__content"}>
                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">Ui/Ux Designer</h3>
                                <span className="qualification__subtitle">
                                    UI/Ux Intern - Innovyasa
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2024 Jan - 2024 Feb
                                </div>
                            </div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                        </div>

                        <div className="qualification__data">
                            <div></div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                            <div>
                                <h3 className="qualification__title">Web Developer</h3>
                                <span className="qualification__subtitle">
                                    CSEC - NIT Hamirpur
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2023 Oct - present
                                </div>
                            </div>

                        </div>

                        <div className="qualification__data">
                            <div>
                                <h3 className="qualification__title">Frontend Dev</h3>
                                <span className="qualification__subtitle">
                                    Frontend Intern - Ctrlb
                                </span>
                                <div className="qualification__calender">
                                    <i class="uil uil-calendar-alt"></i>
                                    2025 Feb - 2025 Jun
                                </div>
                            </div>
                            <div>
                                <span className="qualification__rounder"></span>
                                <span className="qualification__line"></span>
                            </div>
                        </div>

                        

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Qualification
