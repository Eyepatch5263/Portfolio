'use client'
import { useState, useEffect } from 'react'
import './header.css'
import Image from 'next/image'

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
                    <Image height={48} width={48} alt='logo' src="/logo.webp" style={{ width: "48px", paddingTop: "0.5rem" }} />
                </a>
                <div className={Toggle ? "nav__menu  show-menu" : "nav__menu"}>
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" onClick={() => { setActiveNav("#home") }} className={activeNav === "#home" ? "nav__link active-link" : "nav__link"}>
                                <i className="fas fa-home nav__icon"></i>Home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link">
                                <i className="fas fa-user nav__icon"></i>About
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#skills" className="nav__link">
                                <i className="fas fa-file-alt nav__icon"></i>Skills
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#services" className="nav__link">
                                <i className="fas fa-briefcase nav__icon"></i>Services
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#projects" className="nav__link">
                                <i className="fas fa-images nav__icon"></i>Portfolio
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="/blog" className="nav__link">
                                <i className="fas fa-blog nav__icon"></i>Blog
                            </a>
                        </li>
                        <li className="nav__item">
                            <a onClick={() => { setActiveNav("#contact") }} href="#contact" className="nav__link">
                                <i className="fas fa-envelope nav__icon"></i>Contact
                            </a>
                        </li>
                    </ul>
                    <i className="fas fa-times nav__close" onClick={() => showMenu(!Toggle)} ></i>
                </div>
                <div className="nav__toggle" onClick={() => showMenu(!Toggle)}>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
            </nav>
        </header>
    )
}

export default Header
