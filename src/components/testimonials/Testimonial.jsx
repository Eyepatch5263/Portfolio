'use client'
import './testimonial.css'
import { Data } from './Data'
import {Swiper,SwiperSlide} from 'swiper/react'
import Image from 'next/image' 

import "swiper/css"
import "swiper/css/pagination"


import { Pagination } from "swiper/modules"


const Testimonial = () => {
    return (
        <section className="testimonial container section">
            <h2 className="section__title">My Client Say</h2>
            <span className="section__subtitle">Testimonial</span>
            <Swiper className="testimonial__container"
            loop={true}
            grabCursor={true}
            spaceBetween={24}
            pagination={{clickable:true}}
            breakpoints={{
                576:{
                    slidesPerView:2
                },
                768:{
                    slidesPerView:2,
                    spaceBetween:48,
                }
            }}
            modules={[Pagination]}
            >
                {Data.map(({id,image,title,description})=>{
                    return (
                        <SwiperSlide className='testimonial__card' key={id}>
                            <Image loading='lazy'  width={100} height={100} className='testimonial__img' src={image} alt={title}/>
                            <h3 className="testimonial__name">{title}</h3>
                            <p className="testimonial__description">
                                {description}
                            </p>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}

export default Testimonial
