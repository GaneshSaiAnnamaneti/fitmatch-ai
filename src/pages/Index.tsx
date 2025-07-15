import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, Briefcase, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnalysisResults from "@/components/AnalysisResults";

const Index = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File, type: 'resume' | 'jd') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (type === 'resume') {
        setResumeText(text);
        setResumeFile(file);
      } else {
        setJobDescription(text);
        setJdFile(file);
      }
    };
    reader.readAsText(file);
  };

  const analyzeMatch = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast({
        title: "Missing Input",
        description: "Please provide both resume/profile and job description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Simulate AI analysis - replace with actual AI API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult = {
        overallMatch: 78,
        skillsMatch: 85,
        experienceMatch: 72,
        timeEstimate: "3-4 months",
        successRate: 75,
        failureRate: 25,
        contributions: [
          "Strong technical skills in required technologies",
          "Good problem-solving abilities",
          "Experience with similar project types"
        ],
        gaps: [
          "Limited experience with specific framework",
          "May need additional training in domain knowledge"
        ],
        recommendations: [
          "Provide mentorship for framework-specific tasks",
          "Allow extra time for learning curve",
          "Pair with senior developer initially"
        ]
      };
      
      setAnalysisResult(mockResult);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the match. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearData = () => {
    setResumeText("");
    setJobDescription("");
    setResumeFile(null);
    setJdFile(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            FitMatch AI
          </h1>
          <p className="text-xl text-muted-foreground">
            Intelligent Resume-Job Matching & Performance Analysis
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resume Input */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume / Employee Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="resume-file">Upload Resume (Optional)</Label>
                <Input
                  id="resume-file"
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'resume');
                  }}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="resume-text">Or Paste Resume Content</Label>
                <Textarea
                  id="resume-text"
                  placeholder="Paste resume content, skills, experience, education, projects..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[200px] mt-1"
                />
              </div>
              {resumeFile && (
                <p className="text-sm text-muted-foreground">
                  File uploaded: {resumeFile.name}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Job Description Input */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Description / Project Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jd-file">Upload Job Description (Optional)</Label>
                <Input
                  id="jd-file"
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'jd');
                  }}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="jd-text">Or Paste Job Description</Label>
                <Textarea
                  id="jd-text"
                  placeholder="Paste job description, required skills, responsibilities, project details..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] mt-1"
                />
              </div>
              {jdFile && (
                <p className="text-sm text-muted-foreground">
                  File uploaded: {jdFile.name}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={analyzeMatch}
            disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
            size="lg"
            className="px-8"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="mr-2 h-5 w-5" />
                FitMatch
              </>
            )}
          </Button>
          
          <Button
            onClick={clearData}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Clear Data
          </Button>
        </div>

        {/* Analysis Results */}
        {analysisResult && <AnalysisResults data={analysisResult} />}
      </div>
    </div>
  );
};

export default Index;
