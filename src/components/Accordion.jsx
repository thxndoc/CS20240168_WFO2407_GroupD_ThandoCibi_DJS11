import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons/faPlusSquare";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons/faMinusSquare";

export default function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                <h3>{title}</h3>
                <button className="toggle-button">
                    {isOpen ? 
                    <FontAwesomeIcon icon={faMinusSquare}/> : 
                    <FontAwesomeIcon icon={faPlusSquare} />
                    }
                </button>
            </div>

            {isOpen && <div className="accordion-content">{content}</div>}
        </div>
    )
}

