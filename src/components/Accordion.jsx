import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from "@fortawesome/free-regular-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-regular-svg-icons/faChevronDown";

export default function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                <h3>{title}</h3>
                <button className="toggle-button">
                    {isOpen ? 
                    <FontAwesomeIcon icon={faChevronDown}/> : 
                    <FontAwesomeIcon icon={faChevronUp} />
                    }
                </button>
            </div>

            {isOpen && <div className="accordion-content">{content}</div>}
        </div>
    )
}

