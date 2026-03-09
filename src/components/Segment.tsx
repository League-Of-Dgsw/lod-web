import type { Item } from "../types/item";

interface Props {
  items: Item[];
  onChange: (value: Item) => void;
  selected: Item | null;
}

const Segment = ({ items, onChange, selected }: Props) => {
  return (
    <div className="w-full flex items-center border-b border-gray-200">
      {items.map((item) => (
        <div
          className={`flex-1 text-center py-2.5 text-sm font-medium transition-all duration-50 cursor-pointer ${
            selected?.value === item.value
              ? "text-gray-900 border-b-2 border-gray-900 -mb-px"
              : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => onChange(item)}
          key={item.value}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Segment;
