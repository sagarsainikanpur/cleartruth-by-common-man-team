"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload } from 'lucide-react';

interface ContentFormProps {
  onAnalyze: (content: string) => Promise<void>;
  isLoading: boolean;
}

export default function ContentForm({ onAnalyze, isLoading }: ContentFormProps) {
  const [textContent, setTextContent] = useState("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [activeTab, setActiveTab] = useState("text");
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload an image file (e.g., PNG, JPG).",
        });
        setFileName("");
        setFileContent(null);
        event.target.value = ""; // Reset file input
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileContent(reader.result as string);
        setFileName(file.name);
      };
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: "Could not read the selected file.",
        });
        setFileName("");
        setFileContent(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (activeTab === 'text') {
      if (!textContent.trim()) {
        toast({
          variant: "destructive",
          title: "Input Required",
          description: "Please enter some text to analyze.",
        });
        return;
      }
      onAnalyze(textContent);
    } else {
      if (!fileContent) {
        toast({
          variant: "destructive",
          title: "Input Required",
          description: "Please upload a file to analyze.",
        });
        return;
      }
      onAnalyze(fileContent);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verify Content</CardTitle>
        <CardDescription>Paste text or upload an image to check its credibility.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="text" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4"/>Text</TabsTrigger>
              <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4"/>Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-4">
              <Textarea
                placeholder="Paste the text you want to verify here..."
                className="min-h-[150px] resize-y"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                disabled={isLoading}
              />
            </TabsContent>
            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/10 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">Image files (PNG, JPG, etc.)</p>
                  </div>
                  <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" disabled={isLoading} />
                </label>
                {fileName && <p className="text-sm text-muted-foreground">Selected: {fileName}</p>}
              </div>
            </TabsContent>
          </Tabs>
          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
