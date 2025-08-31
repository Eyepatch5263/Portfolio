'use client'
import React, { useState, useEffect } from 'react'
import './header.css'
export const Header = () => {

    //change background header
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(".header");
            if (window.scrollY >= 80) {
                header.classList.add("scroll-header");
            } else {
                header.classList.remove("scroll-header");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Toggle Menu

    const [Toggle, showMenu] = useState(false)

    const [activeNav, setActiveNav] = useState("#home")
    return (
        <header className="header">
            <nav className="nav container">
                <a href="index.html" className="nav_logo">
                    <img src="/logo.jpg" style={{ width: "48px", paddingTop: "0.5rem" }} />
                </a>
                <div className={Toggle ? "nav__menu  show-menu" : "nav__menu"}>
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" onClick={() => { setActiveNav("#home") }} className={activeNav === "#home" ? "nav__link active-link" : "nav__link"}>
                                <i class="uil uil-estate nav__icon"></i>Home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link">
                                <i class="uil uil-user nav__icon"></i>About
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href=" #skills" className="nav__link">
                                <i class="uil uil-file-info-alt nav__icon"></i>Skills
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#services" className="nav__link">
                                <i class="uil uil-bag nav__icon"></i>Services
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#projects" className="nav__link">
                                <i class="uil uil-scenery nav__icon"></i>Portfolio
                            </a>
                        </li>
                        <li className="nav__item">
                            <a onClick={() => { setActiveNav("#contact") }} href="#contact" className="nav__link">
                                <i class="uil uil-message nav__icon"></i>Contact
                            </a>
                        </li>
                    </ul>
                    <i class="uil uil-multiply nav__close" onClick={() => showMenu(!Toggle)} ></i>
                </div>
                <div className="nav__toggle" onClick={() => showMenu(!Toggle)}>
                    <i class="uil uil-bars"></i>
                </div>
            </nav>
        </header>
    )
}


export default Header
