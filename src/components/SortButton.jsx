import { useState } from "react";

export default function SortButton({ onSort }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSorting = (option) => {
        setIsOpen(false) // close dropdown after selection
        onSort(option)   // pass selected option to parent(sort)
    };

    return (
        <div className="sort-button">
        <button onClick={() => setIsOpen(!isOpen)}>Sort</button>
        {isOpen && (
            <ul className="dropdown">
                <li onClick={() => handleSorting("A-Z")}>A-Z</li>
                <li onClick={() => handleSorting("Z-A")}>Z-A</li>
                <li onClick={() => handleSorting("recentlyUpdated")}>Recently Updated</li>
                <li onClick={() => handleSorting("leastRecentlyUpdated")}>Least Recently Updated</li>
            </ul>
        )}
    </div>
    );
}