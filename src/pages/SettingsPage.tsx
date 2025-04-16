
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SettingsForm from "@/components/settings/SettingsForm";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    llmUrl: "localhost/",
    tokenKey: "********",
    tokenCount: "1000",
  });

  const handleSave = (newSettings: typeof settings) => {
    console.log("Saving settings:", newSettings);
    setSettings(newSettings);
    // Here you would typically save these settings to a backend or local storage
  };

  return (
    <AppLayout>
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <CardDescription>
                Configure your LLM evaluation environment settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm 
                initialValues={settings}
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </div>
      </AppLayout>
  );
};

export default SettingsPage;
