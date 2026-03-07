import { ChevronDown } from "lucide-react";
import type { Item } from "../types/item";
import { useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface Props {
  items: Item[];
  onChange: (value: Item) => void;
  selected: Item;
}

const Dropdown = ({ items, onChange, selected }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(setIsOpen);

  const handleSelect = (item: Item) => {
    setIsOpen(false);
    onChange(item);
  };

  return (
    <div className="w-full relative">
      <div
        className="w-full bg-gray-50 rounded-lg flex justify-between py-2 px-4"
        onClick={() => setIsOpen((prev) => !prev)}>
        <p>{selected ? selected.name : "선택해주세요."}</p>
        <ChevronDown />
      </div>
      {isOpen && (
        <div
          className="w-full absolute top-[calc(100%+4px)] bg-gray-50 rounded-lg"
          ref={ref}>
          {items.map((item, idx, arr) => (
            <div
              key={item.value}
              className={`px-4 py-1 ${arr.length - 1 === idx ? "" : "border-b border-gray-200"}`}
              onClick={() => handleSelect(item)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
