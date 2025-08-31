'use client'
import React, { useEffect } from 'react'
import './scrollup.css'

const Scrollup = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollUp = document.querySelector(".scrollup")
            //when the scroll is higher than 560 viewport height, add the show-scroll class to a tag with the scroll-top class
            if(window.scrollY >= 560){
                scrollUp?.classList.add("show-scroll")
            } else {
                scrollUp?.classList.remove("show-scroll")
            }
        }
        
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    
    return (
        <a href="#" className="scrollup">
            <i className="uil uil-arrow-up scrollup__icon">

            </i>
        </a>
    )
}

export default Scrollup
