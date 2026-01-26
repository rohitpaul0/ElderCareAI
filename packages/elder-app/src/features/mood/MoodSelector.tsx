import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Sparkles } from "lucide-react";
import { CameraMoodDetector } from "./CameraMoodDetector";
import useAICompanion from "@/hooks/useAICompanion";
import { motion, AnimatePresence } from "framer-motion";

export const MoodSelector = () => {
    const { detectMoodFromImage, detectedImageMood } = useAICompanion({ elderId: "elder-demo", autoConnect: true });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    // Handle image capture from camera
    const handleCapture = (imageData: string) => {
        setIsAnalyzing(true);
        detectMoodFromImage(imageData);
    };

    // Watch for results
    useEffect(() => {
        if (detectedImageMood) {
            setIsAnalyzing(false);
            setFeedback(detectedImageMood);

            // Auto hide feedback after 5 seconds
            const timer = setTimeout(() => {
                setFeedback(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [detectedImageMood]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="xl" className="flex-col gap-2 h-auto py-8 hover:bg-green-100 hover:border-green-500">
                    <Smile size={64} className="text-green-500" />
                    <span className="text-xl">Happy</span>
                </Button>
                <Button variant="outline" size="xl" className="flex-col gap-2 h-auto py-8 hover:bg-yellow-100 hover:border-yellow-500">
                    <Meh size={64} className="text-yellow-500" />
                    <span className="text-xl">Okay</span>
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" size="xl" className="flex-col gap-2 h-auto py-8 hover:bg-red-100 hover:border-red-500">
                    <Frown size={64} className="text-red-500" />
                    <span className="text-xl">Sad</span>
                </Button>

                {/* Camera Detector Button */}
                <div className="col-span-1">
                    <CameraMoodDetector
                        onCapture={handleCapture}
                        isAnalyzing={isAnalyzing}
                    />
                </div>
            </div>

            {/* AI Feedback Area */}
            <AnimatePresence>
                {(feedback || isAnalyzing) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800 text-center"
                    >
                        {isAnalyzing ? (
                            <p className="text-indigo-600 dark:text-indigo-300 animate-pulse">
                                Analyzing your beautiful smile...
                            </p>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <Sparkles className="text-amber-400 h-6 w-6" />
                                <p className="text-lg font-medium text-indigo-900 dark:text-indigo-100">
                                    I think you look <span className="font-bold text-indigo-600 dark:text-indigo-300 capitalize">{feedback}</span>!
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
