import React from 'react'
import './footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container container">
                <h1 className="footer__title">Pratyush</h1>
                <ul className="footer__list">
                    <li>
                        <a href="#about" className="footer__link">About</a>
                    </li>
                    <li>
                        <a href="#projects" className="footer__link">Projects</a>
                    </li>
                    <li>
                        <a href="#Testimonials" className="footer__link">Testimonials</a>
                    </li>
                </ul>
                <div className="footer__social">
                    <a href="https://www.instagram.com/eyepatch_5263/" className="footer__social-link" target='_blank'>
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/pratyush-pragyey-7a95a7258/" className="footer__social-link" target='_blank' aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://www.facebook.com/66bladebreakers/" className="footer__social-link" target='_blank' aria-label="Facebook">
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
                <span className="footer__copy">
                    &copy; Pratyush. All rights reserved
                </span>
            </div>
        </footer>
    )
}

export default Footer
