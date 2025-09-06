"use client"
import Image from "next/image";

const WorkItems = ({ item }) => {
    return (
        <div>
            <div className="work__card" key={item.id}>
                <Image width={372} height={312} priority="false" style={{ width: "100%", height: "auto" }} src={item.image} alt={item.title} className='work__img' />
                <h3 className="work__title">{item.title}</h3>

                <div className="flex gap-2 justify-start items-center">
                    <button
                        href={item.link}
                        target="_blank"
                        size="sm"

                        style={{ marginRight: "20px", backgroundColor: "white", fontFamily: "serif" }}
                    >
                        <i style={{ marginRight: "4px" }} class="fa fa-link"></i>
                        Demo
                    </button>

                    {item.category == "web" && <button
                        style={{ backgroundColor: "white", fontFamily: "serif" }}
                        href={item.github}
                        target="_blank"

                    >
                        <i style={{ marginRight: "4px" }} class="fab fa-github"></i>
                        Code
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default WorkItems
