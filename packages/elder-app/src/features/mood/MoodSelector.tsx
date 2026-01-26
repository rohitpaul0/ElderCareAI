<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> dda48d0b4e395be034bb5f22f1c6ec053bf8b854
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Sparkles } from "lucide-react";
import { CameraMoodDetector } from "./CameraMoodDetector";
import useAICompanion from "@/hooks/useAICompanion";
import { motion, AnimatePresence } from "framer-motion";

export const MoodSelector = () => {
<<<<<<< HEAD
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
=======
    const [saving, setSaving] = useState(false);
    const [lastMood, setLastMood] = useState<string | null>(null);

    const handleMoodClick = async (mood: string) => {
        setSaving(true);
        try {
            const { auth, db } = await import("@elder-nest/shared");
            const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
            
            const user = auth.currentUser;
            if (!user) return;

            // Save mood to Firestore
            await addDoc(collection(db, "moods"), {
                userId: user.uid,
                score: mood === 'happy' ? 1.0 : mood === 'okay' ? 0.5 : 0.0,
                label: mood,
                source: 'manual',
                timestamp: serverTimestamp()
            });
            
            setLastMood(mood);
            // Reset selection visual after 2 seconds
            setTimeout(() => setLastMood(null), 3000);

        } catch (error) {
            console.error("Failed to save mood", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex gap-4 justify-center w-full">
            <Button 
                variant={lastMood === 'happy' ? 'default' : 'outline'} 
                size="xl" 
                className={`flex-1 flex-col gap-2 h-auto py-8 transition-all rounded-3xl ${
                    lastMood === 'happy' 
                        ? 'bg-green-500 text-white border-green-600 scale-105 shadow-xl dark:bg-green-600' 
                        : 'bg-white hover:bg-green-50 text-slate-700 border-2 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-green-500'
                }`}
                onClick={() => handleMoodClick('happy')}
                disabled={saving}
            >
                <Smile size={48} className={lastMood === 'happy' ? 'text-white' : 'text-green-500'} />
                <span className="text-xl font-bold">Happy</span>
            </Button>
            
            <Button 
                variant={lastMood === 'okay' ? 'default' : 'outline'} 
                size="xl" 
                className={`flex-1 flex-col gap-2 h-auto py-8 transition-all rounded-3xl ${
                    lastMood === 'okay' 
                        ? 'bg-yellow-400 text-slate-900 border-yellow-500 scale-105 shadow-xl dark:bg-yellow-500' 
                        : 'bg-white hover:bg-yellow-50 text-slate-700 border-2 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-yellow-400'
                }`}
                onClick={() => handleMoodClick('okay')}
                disabled={saving}
            >
                <Meh size={48} className={lastMood === 'okay' ? 'text-slate-900' : 'text-yellow-500'} />
                <span className="text-xl font-bold">Okay</span>
            </Button>
            
            <Button 
                variant={lastMood === 'sad' ? 'default' : 'outline'} 
                size="xl" 
                className={`flex-1 flex-col gap-2 h-auto py-8 transition-all rounded-3xl ${
                    lastMood === 'sad' 
                        ? 'bg-red-500 text-white border-red-600 scale-105 shadow-xl dark:bg-red-600' 
                        : 'bg-white hover:bg-red-50 text-slate-700 border-2 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-red-500'
                }`}
                onClick={() => handleMoodClick('sad')}
                disabled={saving}
            >
                <Frown size={48} className={lastMood === 'sad' ? 'text-white' : 'text-red-500'} />
                <span className="text-xl font-bold">Sad</span>
            </Button>
>>>>>>> dda48d0b4e395be034bb5f22f1c6ec053bf8b854
        </div>
    )
}
