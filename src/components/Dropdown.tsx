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
        className="w-full bg-white border-b border-gray-300 flex justify-between items-center py-2.5 cursor-pointer hover:border-gray-900 transition-colors duration-150"
        onClick={() => setIsOpen((prev) => !prev)}>
        <p className="text-sm text-gray-900">{selected ? selected.name : "선택해주세요."}</p>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div
          className="w-full absolute top-[calc(100%+2px)] bg-white border border-gray-200 z-50 overflow-hidden"
          ref={ref}>
          {items.map((item, idx, arr) => (
            <div
              key={item.value}
              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors duration-100 ${
                arr.length - 1 === idx ? "" : "border-b border-gray-100"
              } ${selected?.value === item.value ? "font-semibold text-gray-900" : "text-gray-700"}`}
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
