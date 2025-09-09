"use client";

// Yeh component AI analysis ke result ko display karta hai.

import { useEffect, useState } from 'react';
import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content-for-credibility";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";
import { Share2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Label, Pie, PieChart, Cell } from "recharts";
import { useI18n } from '@/lib/i18n';

interface ResultDisplayProps {
  result: AnalyzeContentOutput;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  
  // `useEffect` ka istemal client-side APIs (jaise navigator) ko safely access karne ke liye.
  useEffect(() => {
    setIsClient(true);
  }, []);

  const score = result.credibilityScore;
  const scoreIn100 = Math.round(score * 100);

  // Yeh function credibility score ke hisab se color, label, aur icon return karta hai.
  const getScoreInfo = (score: number) => {
    if (score > 0.7) {
      return {
        color: "#22c55e", // Green for High Credibility
        label: t('resultDisplay.credibility.high'),
        icon: <CheckCircle className="mr-2 h-5 w-5" />, // Green Tick Icon
      };
    }
    if (score > 0.4) {
      return {
        color: "#f59e0b", // Yellow for Medium Credibility
        label: t('resultDisplay.credibility.medium'),
        icon: <AlertTriangle className="mr-2 h-5 w-5" />, // Warning Icon
      };
    }
    return {
      color: "#ef4444", // Red for Low Credibility
      label: t('resultDisplay.credibility.low'),
      icon: <XCircle className="mr-2 h-5 w-5" />, // Red X Icon
    };
  };

  const scoreInfo = getScoreInfo(score);


  // Yeh function explanation text mein se markdown links ([text](url)) ko actual <a> tags mein convert karta hai.
  const renderExplanation = (explanation: string) => {
    // Regular expression to find markdown-style links.
    const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = explanation.split(urlRegex);

    return parts.map((part, index) => {
      // Har teesra element link text hota hai.
      if (index % 3 === 1) {
        const linkText = part;
        const linkUrl = parts[index + 1];
        return (
          <a
            key={index}
            href={linkUrl}
            target="_blank" // Link naye tab mein khulega.
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80 break-all"
          >
            {linkText}
          </a>
        );
      }
      // Har chautha element URL hota hai, jise hum already handle kar chuke hain.
      if (index % 3 === 2) {
        return null;
      }
      // Baki ke parts normal text hain.
      return part;
    }).filter(Boolean); // null values ko array se hata dete hain.
  };


  // Pie chart ke liye data.
  const chartData = [
    { name: 'score', value: scoreIn100 },
    { name: 'background', value: 100 - scoreIn100 },
  ];

  const chartConfig = {};

  // Share button ka logic.
  const handleShare = async () => {
    const shareText = `Clear Truth Analysis:\nCredibility Score: ${scoreIn100}/100 (${scoreInfo.label})\n\nExplanation: ${result.explanation.substring(0, 200)}...`;

    // Web Share API ka istemal, agar browser support karta hai.
    if (isClient && navigator.share) {
      try {
        await navigator.share({
          title: 'Credibility Analysis Result',
          text: shareText,
        });
      } catch (error) {
        // Agar share karne mein error aata hai (e.g., user permission deny karta hai).
        console.error('Error sharing:', error);
        toast({
            variant: "destructive",
            title: t('resultDisplay.share.failedTitle'),
            description: t('resultDisplay.share.failedDescription'),
        });
      }
    } else if (isClient && navigator.clipboard) {
      // Agar Web Share API available nahi hai, to clipboard par copy karo.
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: t('resultDisplay.share.copiedTitle'),
          description: t('resultDisplay.share.copiedDescription'),
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: t('resultDisplay.share.copyFailedTitle'),
          description: t('resultDisplay.share.copyFailedDescription'),
        });
      }
    }
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader className="items-center text-center">
          <CardTitle>{t('resultDisplay.title')}</CardTitle>
          <CardDescription>
            {t('resultDisplay.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-center gap-4">
             <div className="h-48 w-48">
                {/* Credibility score ka Pie Chart */}
                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full w-full">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={65}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={450}
                      strokeWidth={0}
                      animationDuration={800}
                    >
                        <Cell key="score" fill={scoreInfo.color} />
                        <Cell key="background" fill="hsl(var(--muted))" />
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="fill-foreground text-5xl font-bold"
                                        >
                                            {scoreIn100}
                                        </text>
                                    );
                                }
                            }}
                        />
                    </Pie>
                  </PieChart>
                </ChartContainer>
            </div>
            {/* Credibility label aur icon ke saath Badge */}
            <Badge variant="outline" className="py-2 px-4 text-lg" style={{ color: scoreInfo.color, borderColor: scoreInfo.color }}>
                {scoreInfo.icon}
                {scoreInfo.label}
            </Badge>
          </div>
          <Card className="bg-background/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-xl">{t('resultDisplay.explanationTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* `whitespace-pre-wrap` se text formatting (jaise new lines) preserve hoti hai. */}
              <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
                {renderExplanation(result.explanation)}
              </p>
            </CardContent>
          </Card>
          {/* Share button sirf client-side par dikhega aur tabhi jab browser support kare. */}
          {isClient && (navigator.share || navigator.clipboard) && (
            <Button onClick={handleShare} variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" /> {t('resultDisplay.share.button')}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
