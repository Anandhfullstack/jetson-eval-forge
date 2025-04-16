
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="text"
        placeholder="Search models..."
        className="pl-9 pr-4 py-2 h-10 border-gray-200 rounded-md bg-white focus:border-jetson-blue focus:ring-1 focus:ring-jetson-blue"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
