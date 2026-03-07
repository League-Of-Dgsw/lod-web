import type { Item } from "../types/item";

interface Props {
  items: Item[];
  onChange: (value: Item) => void;
  selected: Item | null;
}

const Segment = ({ items, onChange, selected }: Props) => {
  return (
    <div className="w-full bg-gray-50 rounded-lg p-2 flex items-center">
      {items.map((item) => (
        <div
          className={`flex-1 rounded text-center py-2 text-sm transition-all active:scale-95 ${selected?.value === item.value ? "bg-blue-500 text-white" : ""}`}
          onClick={() => onChange(item)}
          key={item.value}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Segment;
