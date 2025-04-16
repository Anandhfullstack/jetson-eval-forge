
import { useModelData } from "@/contexts/ModelDataContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ModelSelector = () => {
  const { models, selectedModel, selectModel } = useModelData();

  return (
    <div className="w-48">
      <Select
        value={selectedModel || undefined} 
        onValueChange={(value) => selectModel(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name} {model.version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
