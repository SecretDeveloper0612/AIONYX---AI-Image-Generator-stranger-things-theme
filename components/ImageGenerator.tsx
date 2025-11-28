import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';
import { Wand2, Image as ImageIcon, PenTool, Upload, Download, RefreshCw, Maximize2, Sparkles, X, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { GeneratedImage, GeneratorMode } from '../types';

const SUGGESTIONS = [
  "Retro sci-fi poster 80s style",
  "Dark forest with red fog",
  "Demogorgon concept art",
  "Neon arcade interior night",
  "Distorted reality glitch art"
];

export const ImageGenerator: React.FC = () => {
  const [mode, setMode] = useState<GeneratorMode>('text');
  const [prompt, setPrompt] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImages = async () => {
    if (!process.env.API_KEY) {
      setError("API Key is missing. Please check your configuration.");
      return;
    }
    
    if (mode === 'text' && !prompt.trim()) {
      setError("Please enter a description for your image.");
      return;
    }

    if ((mode === 'image' || mode === 'logo') && !uploadedImage) {
      setError("Please upload an image reference first.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResults([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash-image';
      
      // Prepare prompt based on mode
      let finalPrompt = prompt;
      if (mode === 'logo') {
        finalPrompt = `Transform this sketch/image into a dark, retro 80s horror style logo. ${prompt}`;
      } else if (mode === 'image') {
        finalPrompt = `Enhance and reimagine this image with a dark sci-fi aesthetic. ${prompt}`;
      }

      const promises = Array(4).fill(0).map(async (_, index) => {
        try {
          const parts: any[] = [];
          
          if (uploadedImage) {
             const base64Data = uploadedImage.split(',')[1];
             const mimeType = uploadedImage.split(';')[0].split(':')[1];
             
             parts.push({
               inlineData: {
                 mimeType: mimeType,
                 data: base64Data
               }
             });
          }
          
          parts.push({ text: finalPrompt + ` (Variation ${index + 1})` });

          const response = await ai.models.generateContent({
            model: model,
            contents: { parts },
          });

          const candidates = response.candidates;
          if (candidates && candidates.length > 0) {
            for (const part of candidates[0].content.parts) {
               if (part.inlineData) {
                 return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
               }
            }
          }
          return null;
        } catch (e) {
          console.error("Generation error", e);
          return null;
        }
      });

      const generatedData = await Promise.all(promises);
      const validImages = generatedData
        .filter(img => img !== null)
        .map((url, idx) => ({
          id: Date.now().toString() + idx,
          url: url as string,
          prompt: finalPrompt
        }));

      if (validImages.length === 0) {
        throw new Error("Failed to generate images. The model might be busy or the prompt was flagged.");
      }

      setResults(validImages);

    } catch (err: any) {
      setError(err.message || "Something went wrong during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `aionyx-stranger-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionWrapper id="generator" className="min-h-screen pt-32 bg-black bg-[radial-gradient(circle_at_center,_#200000_0%,_#000000_70%)]">
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 relative">
           <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 text-stranger-glow text-stranger-red uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
             The Lab
           </h1>
           <p className="text-gray-400 font-serif italic text-lg">Experiment with the unknown.</p>
        </div>

        {/* Main Interface Card */}
        <div className="bg-[#050505] border border-stranger-red/30 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(200,0,0,0.1)] flex flex-col md:flex-row min-h-[600px] relative">
          
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] opacity-20"></div>

          {/* Left Panel: Controls */}
          <div className="w-full md:w-[400px] bg-[#080808] p-6 border-r border-stranger-red/20 flex flex-col relative z-30">
            
            {/* Tabs */}
            <div className="flex p-1 bg-black rounded mb-6 border border-stranger-red/20">
               <button 
                 onClick={() => setMode('text')}
                 className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all font-display ${mode === 'text' ? 'bg-stranger-red text-white shadow-[0_0_10px_rgba(255,0,0,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 <Wand2 size={16} /> Text
               </button>
               <button 
                 onClick={() => setMode('image')}
                 className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all font-display ${mode === 'image' ? 'bg-stranger-red text-white shadow-[0_0_10px_rgba(255,0,0,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 <ImageIcon size={16} /> Image
               </button>
               <button 
                 onClick={() => setMode('logo')}
                 className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-all font-display ${mode === 'logo' ? 'bg-stranger-red text-white shadow-[0_0_10px_rgba(255,0,0,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 <PenTool size={16} /> Logo
               </button>
            </div>

            {/* Input Area */}
            <div className="flex-1 flex flex-col gap-4">
              
              {/* Image Upload Zone */}
              {(mode === 'image' || mode === 'logo') && (
                <div 
                  className="relative border-2 border-dashed border-stranger-red/30 rounded p-4 transition-all hover:border-stranger-red hover:bg-stranger-red/5 cursor-pointer group h-40 flex items-center justify-center"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                  
                  {uploadedImage ? (
                    <div className="relative w-full h-full">
                       <img src={uploadedImage} alt="Upload" className="w-full h-full object-contain rounded opacity-80" />
                       <button 
                         onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
                         className="absolute top-0 right-0 p-1 bg-red-600 rounded-full text-white transform translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform shadow-[0_0_10px_red]"
                       >
                         <X size={12} />
                       </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 group-hover:scale-105 transition-transform">
                      <div className="w-10 h-10 rounded bg-white/5 mx-auto flex items-center justify-center border border-white/10 group-hover:border-stranger-red">
                        <Upload size={18} className="text-gray-400 group-hover:text-stranger-red transition-colors" />
                      </div>
                      <p className="text-xs text-gray-400 font-mono">INSERT DISK OR IMAGE</p>
                    </div>
                  )}
                </div>
              )}

              {/* Text Prompt */}
              <div className="flex-col flex gap-2">
                <label className="text-xs font-bold text-stranger-red uppercase tracking-widest font-display">Prompt Input</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={mode === 'text' ? "Describe the horror..." : mode === 'logo' ? "Describe the entity..." : "Describe the mutation..."}
                  className="w-full h-32 bg-black border border-stranger-red/30 rounded p-4 text-sm text-white focus:outline-none focus:border-stranger-red focus:shadow-[0_0_15px_rgba(255,0,0,0.3)] resize-none placeholder:text-gray-700 font-mono"
                />
              </div>

              {/* Suggestions */}
              {mode === 'text' && (
                <div className="flex flex-wrap gap-2 mt-2">
                   {SUGGESTIONS.map((s) => (
                     <button 
                       key={s}
                       onClick={() => setPrompt(s)}
                       className="px-3 py-1 bg-white/5 hover:bg-stranger-red/20 rounded border border-white/10 hover:border-stranger-red text-[10px] text-gray-400 hover:text-white transition-colors font-mono"
                     >
                       {s}
                     </button>
                   ))}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-500/50 rounded flex items-center gap-2 text-red-400 text-xs font-mono animate-pulse">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <Button 
                onClick={generateImages} 
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                   <span className="flex items-center gap-2 text-black">
                     <RefreshCw className="animate-spin" size={16} /> PROCESSING...
                   </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} /> INITIATE {mode === 'logo' ? 'LOGO' : 'SEQUENCE'}
                  </span>
                )}
              </Button>
            </div>

          </div>

          {/* Right Panel: Output */}
          <div className="flex-1 bg-black/80 p-6 md:p-8 overflow-y-auto relative z-30">
            
             {results.length === 0 && !isGenerating ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-50 space-y-4">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <ImageIcon size={48} />
                  </div>
                  <p className="font-mono text-sm tracking-widest uppercase">AWAITING INPUT...</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {isGenerating ? (
                    // Loading Skeletons
                    Array(4).fill(0).map((_, i) => (
                      <div key={i} className="aspect-square rounded bg-[#100000] border border-stranger-red/20 animate-pulse flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-stranger-red/10 to-transparent animate-flicker"></div>
                        <Sparkles className="text-stranger-red w-8 h-8 animate-spin-slow" />
                      </div>
                    ))
                 ) : (
                    // Results
                    results.map((img) => (
                      <motion.div 
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative aspect-square rounded overflow-hidden border border-stranger-red/30 bg-black shadow-[0_0_15px_rgba(255,0,0,0.1)]"
                      >
                         <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
                         
                         {/* Overlay Actions */}
                         <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                            <button 
                              onClick={() => setSelectedImage(img)}
                              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                              title="View Fullscreen"
                            >
                               <Maximize2 size={20} />
                            </button>
                            <button 
                              onClick={() => handleDownload(img.url, img.id)}
                              className="p-3 rounded-full bg-stranger-red hover:bg-red-700 text-white transition-colors shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                              title="Download"
                            >
                               <Download size={20} />
                            </button>
                         </div>
                      </motion.div>
                    ))
                 )}
               </div>
             )}

          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center text-xs text-gray-600 font-mono uppercase tracking-widest">
           System Powered by Gemini API • Generates 4 Mutations per cycle • Caution Advised
        </div>

      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
             <button 
               className="absolute top-4 right-4 p-2 text-white/50 hover:text-stranger-red transition-colors"
               onClick={() => setSelectedImage(null)}
             >
               <X size={32} />
             </button>
             
             <div className="max-w-5xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <img 
                  src={selectedImage.url} 
                  alt="Full view" 
                  className="max-h-[80vh] w-auto rounded border border-stranger-red/50 shadow-[0_0_100px_rgba(255,0,0,0.3)]" 
                />
                <div className="mt-6 flex gap-4">
                  <Button onClick={() => handleDownload(selectedImage.url, selectedImage.id)} withArrow>
                    Download Mutation
                  </Button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </SectionWrapper>
  );
};