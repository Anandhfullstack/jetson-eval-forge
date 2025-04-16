
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsFormProps {
  initialValues: {
    llmUrl: string;
    tokenKey: string;
    tokenCount: string;
  };
  onSave: (values: any) => void;
}

const SettingsForm = ({ initialValues, onSave }: SettingsFormProps) => {
  const [showToken, setShowToken] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formValues);
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="llmUrl">LLM URL:</Label>
        <Input
          id="llmUrl"
          name="llmUrl"
          value={formValues.llmUrl}
          onChange={handleChange}
          placeholder="Enter LLM URL"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tokenKey">Token Key:</Label>
        <div className="relative">
          <Input
            id="tokenKey"
            name="tokenKey"
            type={showToken ? "text" : "password"}
            value={formValues.tokenKey}
            onChange={handleChange}
            placeholder="Enter token key"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowToken(!showToken)}
          >
            {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tokenCount">VLLM token count:</Label>
        <Input
          id="tokenCount"
          name="tokenCount"
          type="number"
          value={formValues.tokenCount}
          onChange={handleChange}
          placeholder="Enter token count"
        />
      </div>
      
      <Button 
        type="submit"
        className="w-full bg-jetson-blue hover:bg-blue-600 text-white flex items-center justify-center gap-2"
      >
        <Save className="h-4 w-4" />
        Save Settings
      </Button>
    </form>
  );
};

export default SettingsForm;
