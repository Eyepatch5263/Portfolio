"use client"
import Link from 'next/link'
import './not-found.css'

export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found__container">
                <div className="not-found__content">
                    <div className="not-found__number">404</div>
                    <h1 className="not-found__title">Page Not Found</h1>
                    <p className="not-found__description">
                        Oops! The page you&apos;re looking for doesn&apos;t exist.
                        It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                    <div className="not-found__actions">
                        <Link style={{ fontFamily: "cursive" }} href="/" className="not-found__button not-found__button--primary">
                            <i className="uil uil-estate"></i>
                            Go Home
                        </Link>

                    </div>
                </div>
                <div className="not-found__illustration">
                    <div className="not-found__circle">
                        <i className="uil uil-exclamation-triangle"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
