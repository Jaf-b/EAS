import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/types";
import { GeminiService } from "@/lib/gemini";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VideoVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (videoUrl: string) => void;
  task: Task;
}

export default function VideoVerificationModal({ isOpen, onClose, onSuccess, task }: VideoVerificationModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const f = e.target.files[0];
        setFile(f);
        setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const handleVerify = async () => {
    if (!file) return;

    setIsVerifying(true);
    try {
        const result = await GeminiService.verifyTaskCompletion(task, file);
        
        if (result.verified) {
            toast({
                title: "Verification Successful",
                description: result.feedback,
            });
            onSuccess(previewUrl!); // In real app, upload to cloud and get URL
        } else {
            toast({
                variant: "destructive",
                title: "Verification Failed",
                description: result.feedback,
            });
        }
    } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Verification process failed." });
    } finally {
        setIsVerifying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isVerifying && !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Task Completion</DialogTitle>
          <DialogDescription>
            Upload a video providing proof of work for <strong>"{task.title}"</strong>.
            AI will analyze it against the task description.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
            {!previewUrl ? (
                <div 
                    className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to upload video</p>
                    <p className="text-xs text-muted-foreground">MP4, WebM up to 50MB</p>
                    <input 
                        ref={fileInputRef} 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border bg-black aspect-video relative">
                         <video src={previewUrl} controls className="w-full h-full" />
                         <Button 
                            variant="secondary" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => { setFile(null); setPreviewUrl(null); }}
                            disabled={isVerifying}
                         >
                            Change
                         </Button>
                    </div>
                </div>
            )}
            
            {isVerifying && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <div className="text-sm">
                        <p className="font-semibold">Analyzing Video Content...</p>
                        <p className="text-xs opacity-90">Checking against task requirements</p>
                    </div>
                </div>
            )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isVerifying}>Cancel</Button>
          <Button onClick={handleVerify} disabled={!file || isVerifying} className="gap-2">
            {isVerifying ? 'Verifying...' : 'Verify & Complete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
