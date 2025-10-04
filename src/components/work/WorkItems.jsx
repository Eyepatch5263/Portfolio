"use client"
import Image from "next/image";

const WorkItems = ({ item }) => {
    return (
        <div>
            <div className="work__card" key={item.id}>
                <Image width={372} height={312} priority="false" style={{ width: "100%", height: "auto" }} src={item.image} alt={item.title} className='work__img' />
                <h3 className="work__title">{item.title}</h3>

                <div className="flex gap-2 justify-start items-center">
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginRight: "20px", backgroundColor: "white", fontFamily: "serif", padding: "6px 12px", borderRadius: "4px", display: "inline-block", textDecoration: "none", color: "inherit" }}
                    >
                        <i style={{ marginRight: "4px" }} className="fa fa-link"></i>
                        Demo
                    </a>

                    {item.category == "web" && (
                        <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: "white", fontFamily: "serif", padding: "6px 12px", borderRadius: "4px", display: "inline-block", textDecoration: "none", color: "inherit" }}
                        >
                            <i style={{ marginRight: "4px" }} className="fab fa-github"></i>
                            Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WorkItems
