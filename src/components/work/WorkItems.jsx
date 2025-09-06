import React from 'react'
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

const WorkItems = ({ item }) => {
    return (
        <div>
            <div className="work__card" key={item.id}>
                <img src={item.image} alt={item.title} className='work__img' />
                <h3 className="work__title">{item.title}</h3>

                <div className="flex gap-2 justify-start items-center">
                    <Button
                        as={Link}
                        href={item.link}
                        target="_blank"
                        size="sm"
                        color="default"
                        variant="shadow"
                        style={{ marginRight: "20px" }}
                        startContent={<Icon icon="lucide:external-link" style={{ marginRight: "4px" }} />}
                    >
                        Demo
                    </Button>
                    {item.category == "web" && <Button
                        as={Link}
                        href={item.github}
                        target="_blank"
                        size="sm"
                        variant="light"
                        startContent={<Icon icon="logos:github-icon" style={{ marginRight: "4px" }} />}
                    >
                        Code
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default WorkItems
