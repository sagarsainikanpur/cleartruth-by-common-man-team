"use client";

// Yeh ek client component hai jismein user content enter karta hai.

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Link as LinkIcon } from 'lucide-react';

// Component ke props ka interface.
interface ContentFormProps {
  onAnalyze: (content: string) => Promise<void>; // Parent component se aaya function.
  isLoading: boolean; // Loading state.
}

export default function ContentForm({ onAnalyze, isLoading }: ContentFormProps) {
  // State variables for different input types.
  const [textContent, setTextContent] = useState(""); // Text input ke liye.
  const [urlContent, setUrlContent] = useState(""); // URL input ke liye.
  const [fileContent, setFileContent] = useState<string | null>(null); // File content (as data URI).
  const [fileName, setFileName] = useState(""); // Uploaded file ka naam.
  const [activeTab, setActiveTab] = useState("text"); // Kaunsa tab active hai.
  const { toast } = useToast(); // Notifications dikhane ke liye hook.

  // Yeh function file upload ko handle karta hai.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Pehli selected file ko lete hain.
    if (file) {
      const reader = new FileReader();
      // Jab file read ho jaye.
      reader.onloadend = () => {
        setFileContent(reader.result as string); // File content ko data URI ke roop mein save karte hain.
        setFileName(file.name); // File ka naam save karte hain.
      };
      // Agar file read karne mein error aaye.
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: "Could not read the selected file.",
        });
        setFileName("");
        setFileContent(null);
      };
      // File ko as Data URL read karna shuru karte hain.
      reader.readAsDataURL(file);
    }
  };

  // Form submit hone par yeh function call hota hai.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Default form submission ko rokte hain.

    // Active tab ke hisab se content ko analyze ke liye bhejte hain.
    if (activeTab === 'text') {
      if (!textContent.trim()) {
        toast({ variant: "destructive", title: "Input Required", description: "Please enter some text to analyze." });
        return;
      }
      onAnalyze(textContent);
    } else if (activeTab === 'url') {
      if (!urlContent.trim()) {
        toast({ variant: "destructive", title: "Input Required", description: "Please enter a URL to analyze." });
        return;
      }
      onAnalyze(urlContent);
    } else {
      if (!fileContent) {
        toast({ variant: "destructive", title: "Input Required", description: "Please upload a file to analyze." });
        return;
      }
      onAnalyze(fileContent);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verify Content</CardTitle>
        <CardDescription>Paste text, enter a URL, or upload a file to check its credibility.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Tabs component (Text, URL, Upload) */}
          <Tabs defaultValue="text" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4"/>Text</TabsTrigger>
              <TabsTrigger value="url"><LinkIcon className="mr-2 h-4 w-4"/>URL</TabsTrigger>
              <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4"/>Upload</TabsTrigger>
            </TabsList>
            
            {/* Text Input Tab */}
            <TabsContent value="text" className="mt-4">
              <Textarea
                placeholder="Paste the text you want to verify here..."
                className="min-h-[150px] resize-y"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                disabled={isLoading}
              />
            </TabsContent>

            {/* URL Input Tab */}
            <TabsContent value="url" className="mt-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                disabled={isLoading}
              />
            </TabsContent>

            {/* File Upload Tab */}
            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/10 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">Upload any file</p>
                  </div>
                  {/* `accept="*/*"` se sabhi file types allow ho jaate hain. */}
                  <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} disabled={isLoading} accept="*/*" />
                </label>
                {/* Agar file select ho gayi hai to uska naam dikhao. */}
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