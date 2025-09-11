"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Link as LinkIcon } from "lucide-react";

interface ContentFormProps {
  onAnalyze: (content: string) => Promise<void>;
  isLoading: boolean;
  formKey?: number; // replaces reserved "key"
}

export default function ContentForm({
  onAnalyze,
  isLoading,
  formKey,
}: ContentFormProps) {
  const [textContent, setTextContent] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [activeTab, setActiveTab] = useState("text");
  const { toast } = useToast();

  // Reset state when formKey changes
  useEffect(() => {
    setTextContent("");
    setUrlContent("");
    setFileContent(null);
    setFileName("");
    setActiveTab("text");
  }, [formKey]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

    let contentToAnalyze = "";
    let errorMessage = "";

    if (activeTab === "text") {
      if (!textContent.trim()) {
        errorMessage = "Please enter some text to analyze.";
      } else {
        contentToAnalyze = textContent;
      }
    } else if (activeTab === "url") {
      if (!urlContent.trim()) {
        errorMessage = "Please enter a URL to analyze.";
      } else {
        contentToAnalyze = urlContent;
      }
    } else if (activeTab === "upload") {
      if (!fileContent) {
        errorMessage = "Please upload a file to analyze.";
      } else {
        contentToAnalyze = fileContent;
      }
    }

    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: errorMessage,
      });
      return;
    }

    onAnalyze(contentToAnalyze);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Verify Content</CardTitle>
        <CardDescription>
          Paste text, enter a URL, or upload a file to check its credibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs
            defaultValue="text"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text">
                <FileText className="mr-2 h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="url">
                <LinkIcon className="mr-2 h-4 w-4" />
                URL
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </TabsTrigger>
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

            <TabsContent value="url" className="mt-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                disabled={isLoading}
              />
            </TabsContent>

            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/10 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Upload any file
                    </p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    accept="*/*"
                  />
                </label>
                {fileName && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {fileName}
                  </p>
                )}
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
