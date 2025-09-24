import React, { useState, useCallback, useRef } from 'react';
import { StylePreset, InfographicData } from './types';
import { summarizeTextForInfographic, generateInfographicIcons } from './services/geminiService';
import { Infographic } from './components/Infographic';
import { InfographicCanvas } from './components/InfographicCanvas';
import Spinner from './components/Spinner';

// Make jspdf and html2canvas available from the window object loaded via CDN
declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [stylePreset, setStylePreset] = useState<StylePreset>(StylePreset.Corporate);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // State for the new rendering pipeline
  const [infographicData, setInfographicData] = useState<InfographicData | null>(null);
  const [generatedIcons, setGeneratedIcons] = useState<string[] | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!inputText || !apiKey) {
      setError('Please provide the transcript/text and your Gemini API Key.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setInfographicData(null);
    setGeneratedIcons(null);

    try {
      setLoadingStep('Analyzing text...');
      const data = await summarizeTextForInfographic(inputText, apiKey);
      
      setLoadingStep('Generating visual assets...');
      const icons = await generateInfographicIcons(data.insights, stylePreset, apiKey);

      // Set data to render the canvas component off-screen
      setInfographicData(data);
      setGeneratedIcons(icons);

      setLoadingStep('Composing final infographic...');
      // Wait for the state to update and the component to render before capturing
      setTimeout(async () => {
        if (canvasRef.current) {
          const canvas = await window.html2canvas(canvasRef.current, { 
            useCORS: true, 
            backgroundColor: null,
            scale: 2 // Render at 2x resolution for higher quality
          });
          const imageUrl = canvas.toDataURL('image/png', 1.0);
          setGeneratedImage(imageUrl);
          
          // Clean up off-screen canvas data
          setInfographicData(null);
          setGeneratedIcons(null);
          setIsLoading(false);
          setLoadingStep('');
        } else {
            throw new Error("Failed to get a reference to the infographic canvas.")
        }
      }, 100);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleDownload = useCallback(async (format: 'png' | 'pdf') => {
    if (!generatedImage) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = 'infographic.png';
      link.href = generatedImage;
      link.click();
    } else {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [1080, 1920]
      });
      pdf.addImage(generatedImage, 'PNG', 0, 0, 1080, 1920);
      pdf.save('infographic.pdf');
    }
  }, [generatedImage]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {infographicData && generatedIcons && (
        <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', zIndex: -1 }}>
            <InfographicCanvas
                canvasRef={canvasRef}
                data={infographicData}
                style={stylePreset}
                icons={generatedIcons}
            />
        </div>
      )}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">YouTube Transcript Infographic Generator 📜📊</h1>
          <p className="text-gray-600 mt-1">Turn any YouTube transcript into a shareable vertical infographic.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls Column */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <label htmlFor="transcriptText" className="block text-sm font-medium text-gray-700">
                1. Paste Transcript or Text
              </label>
              <textarea
                id="transcriptText"
                rows={8}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the full text you want to summarize here..."
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                2. Enter Your Google Gemini API Key
              </label>
              <input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key here"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-2 text-xs text-gray-500">
                Get your key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>. Your key is used only in your browser.
              </p>
            </div>

            <div>
              <label htmlFor="stylePreset" className="block text-sm font-medium text-gray-700">
                3. Choose a Style
              </label>
              <select
                id="stylePreset"
                value={stylePreset}
                onChange={(e) => setStylePreset(e.target.value as StylePreset)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
              >
                {Object.values(StylePreset).map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (loadingStep || 'Generating...') : 'Generate Infographic'}
            </button>
            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          </div>

          {/* Preview Column */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Preview</h2>
            <div className="w-full max-w-sm aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
              {isLoading && (
                <div className="text-center">
                  <Spinner />
                  <p className="text-gray-600 mt-2">{loadingStep}</p>
                </div>
              )}
              {!isLoading && !generatedImage && <p className="text-gray-500">Your infographic will appear here</p>}
              {generatedImage && (
                 <div className="w-full h-full">
                    <Infographic imageDataUrl={generatedImage} altText="Generated Infographic" />
                 </div>
              )}
            </div>
            {generatedImage && (
              <div className="mt-6 flex space-x-4">
                <button onClick={() => handleDownload('png')} className="bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700 transition-colors">Download PNG</button>
                <button onClick={() => handleDownload('pdf')} className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">Download PDF</button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">Created by <a href="https://www.solomonchrist.com" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-300">Solomon Christ</a></p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="https://www.skool.com/learn-automation/about" target="_blank" rel="noopener noreferrer" className="hover:underline">AI Community</a>
            <a href="https://youtu.be/vihx2ZPvw0M?si=YpUdk4e71wlEiFh-" target="_blank" rel="noopener noreferrer" className="hover:underline">AI Masterclass Lvl 1</a>
            <a href="https://youtu.be/rkIU6R6hPwE?si=BN4YpuWFlVeTzSOZ" target="_blank" rel="noopener noreferrer" className="hover:underline">AI Masterclass Lvl 2</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;