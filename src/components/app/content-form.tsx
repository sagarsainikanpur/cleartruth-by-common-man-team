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
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();
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
          title: t('contentForm.fileReadError.title'),
          description: t('contentForm.fileReadError.description'),
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
        errorMessage = t('contentForm.error.textRequired');
      } else {
        contentToAnalyze = textContent;
      }
    } else if (activeTab === "url") {
      if (!urlContent.trim()) {
        errorMessage = t('contentForm.error.urlRequired');
      } else {
        contentToAnalyze = urlContent;
      }
    } else if (activeTab === "upload") {
      if (!fileContent) {
        errorMessage = t('contentForm.error.fileRequired');
      } else {
        contentToAnalyze = fileContent;
      }
    }

    if (errorMessage) {
      toast({
        variant: "destructive",
        title: t('contentForm.error.inputRequired'),
        description: errorMessage,
      });
      return;
    }

    onAnalyze(contentToAnalyze);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('contentForm.title')}</CardTitle>
        <CardDescription>
          {t('contentForm.description')}
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
            <TabsList className="grid w-full h-auto grid-cols-1 sm:grid-cols-3 sm:h-10">
              <TabsTrigger value="text">
                <FileText className="mr-2 h-4 w-4" />
                {t('contentForm.tabs.text')}
              </TabsTrigger>
              <TabsTrigger value="url">
                <LinkIcon className="mr-2 h-4 w-4" />
                {t('contentForm.tabs.url')}
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                {t('contentForm.tabs.upload')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-4">
              <Textarea
                placeholder={t('contentForm.placeholders.text')}
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
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">
                        {t('contentForm.upload.click')}
                      </span>{" "}
                      {t('contentForm.upload.dragAndDrop')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('contentForm.upload.anyFile')}
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
                  <p className="text-sm text-muted-foreground break-all">
                    {t('contentForm.upload.selected')}: {fileName}
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? t('common.analyzing') : t('common.analyze')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
