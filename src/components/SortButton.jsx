import { useState } from "react";

export default function SortButton({ onSort }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSorting = (option) => {
        setIsOpen(false) // close dropdown after selection
        onSort(option)   // pass selected option to parent(sort)
    };

    return (
       
    );
}