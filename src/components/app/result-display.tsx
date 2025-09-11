"use client";

import { useEffect, useState } from 'react';
import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content-for-credibility";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";
import { Share2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Label, Pie, PieChart, Cell } from "recharts";

interface ResultDisplayProps {
  result: AnalyzeContentOutput;
}

const getScoreInfo = (score: number) => {
  if (score > 0.7) {
    return {
      color: "#22c55e" /* green-500 */,
      label: "High Credibility",
      icon: <CheckCircle className="mr-1 h-4 w-4" />,
    };
  }
  if (score > 0.4) {
    return {
      color: "#f59e0b" /* yellow-500 */,
      label: "Medium Credibility",
      icon: <AlertTriangle className="mr-1 h-4 w-4" />,
    };
  }
  return {
    color: "#ef4444" /* red-500 */,
    label: "Low Credibility",
    icon: <XCircle className="mr-1 h-4 w-4" />,
  };
};

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const score = result.credibilityScore;
  const scoreIn100 = Math.round(score * 100);
  const scoreInfo = getScoreInfo(score);

  const chartData = [
    { name: 'score', value: scoreIn100 },
    { name: 'background', value: 100 - scoreIn100 },
  ];

  const chartConfig = {};

  const handleShare = async () => {
    const shareText = `Clear Truth Analysis:\nCredibility Score: ${scoreIn100}/100 (${scoreInfo.label})\n\nExplanation: ${result.explanation.substring(0, 200)}...`;

    if (isClient && navigator.share) {
      try {
        await navigator.share({
          title: 'Credibility Analysis Result',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
            variant: "destructive",
            title: "Sharing Failed",
            description: "Could not share the results. This might be due to browser permissions or lack of HTTPS.",
        });
      }
    } else if (isClient && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to Clipboard",
          description: "The analysis results have been copied.",
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Copy Failed",
          description: "Could not copy results to clipboard.",
        });
      }
    }
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader className="items-center text-center">
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>
            Credibility score and explanation based on AI analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-center gap-4">
             <div className="h-48 w-48">
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
            <Badge variant="outline" className="py-1 px-3 text-base" style={{ color: scoreInfo.color, borderColor: scoreInfo.color }}>
                {scoreInfo.icon}
                {scoreInfo.label}
            </Badge>
          </div>
          <Card className="bg-background/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-xl">Detailed Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {result.explanation}
              </p>
            </CardContent>
          </Card>
          {isClient && (navigator.share || navigator.clipboard) && (
            <Button onClick={handleShare} variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" /> Share Findings
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
