
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Settings, RotateCcw, Download, Grid3X3, Triangle, Crosshair, Square, Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import GridOverlay from '@/components/GridOverlay';
import GridSelector from '@/components/GridSelector';

export type GridType = 
  | 'none'
  | 'rule-of-thirds'
  | 'golden-ratio'
  | 'golden-spiral'
  | 'triangles'
  | 'diagonals'
  | 'center-cross'
  | 'grid'
  | 'quadrant'
  | 'symmetry'
  | 'leading-lines'
  | 'dynamic-symmetry';

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedGrid, setSelectedGrid] = useState<GridType>('rule-of-thirds');
  const [gridOpacity, setGridOpacity] = useState(0.7);
  const [showGrid, setShowGrid] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [saveBothVersions, setSaveBothVersions] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const { toast } = useToast();

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to blob for saving
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      
      const cleanImage = blob;
      
      // If saving both versions, create one with overlay
      if (saveBothVersions && showGrid && selectedGrid !== 'none') {
        // Draw grid overlay on canvas
        drawGridOnCanvas(ctx, canvas.width, canvas.height);
        
        canvas.toBlob((overlayBlob) => {
          if (overlayBlob) {
            downloadImage(overlayBlob, 'photo-with-grid.jpg');
          }
        }, 'image/jpeg', 0.9);
      }
      
      // Save clean version (or only version if not saving both)
      if (saveBothVersions || !showGrid || selectedGrid === 'none') {
        downloadImage(cleanImage, 'photo-clean.jpg');
      } else {
        // If only saving one version and grid is on, save with grid
        drawGridOnCanvas(ctx, canvas.width, canvas.height);
        canvas.toBlob((overlayBlob) => {
          if (overlayBlob) {
            downloadImage(overlayBlob, 'photo-with-grid.jpg');
          }
        }, 'image/jpeg', 0.9);
      }
      
      toast({
        title: "Photo Captured!",
        description: saveBothVersions ? "Saved with and without grid overlay" : "Photo saved successfully"
      });
      
      setIsCapturing(false);
    }, 'image/jpeg', 0.9);
  };

  const drawGridOnCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`;
    ctx.lineWidth = 2;
    
    // Draw the selected grid
    switch (selectedGrid) {
      case 'rule-of-thirds':
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(width / 3, 0);
        ctx.lineTo(width / 3, height);
        ctx.moveTo((2 * width) / 3, 0);
        ctx.lineTo((2 * width) / 3, height);
        // Horizontal lines
        ctx.moveTo(0, height / 3);
        ctx.lineTo(width, height / 3);
        ctx.moveTo(0, (2 * height) / 3);
        ctx.lineTo(width, (2 * height) / 3);
        ctx.stroke();
        break;
      
      case 'golden-ratio':
        const goldenRatio = 1.618;
        const gw1 = width / goldenRatio;
        const gw2 = width - gw1;
        const gh1 = height / goldenRatio;
        const gh2 = height - gh1;
        
        ctx.beginPath();
        ctx.moveTo(gw1, 0);
        ctx.lineTo(gw1, height);
        ctx.moveTo(gw2, 0);
        ctx.lineTo(gw2, height);
        ctx.moveTo(0, gh1);
        ctx.lineTo(width, gh1);
        ctx.moveTo(0, gh2);
        ctx.lineTo(width, gh2);
        ctx.stroke();
        break;
      
      // Add more grid patterns here
      default:
        break;
    }
    
    ctx.restore();
  };

  const downloadImage = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Camera View */}
      <div className="relative w-full h-screen">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Grid Overlay */}
        {showGrid && selectedGrid !== 'none' && (
          <GridOverlay
            type={selectedGrid}
            opacity={gridOpacity}
            className="absolute inset-0 pointer-events-none"
          />
        )}
        
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={switchCamera}
            className="bg-black/50 hover:bg-black/70 text-white border-none"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowGrid(!showGrid)}
              className="bg-black/50 hover:bg-black/70 text-white border-none"
            >
              {showGrid ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="bg-black/50 hover:bg-black/70 text-white border-none"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Grid Selector */}
        <GridSelector
          selectedGrid={selectedGrid}
          onGridSelect={setSelectedGrid}
          className="absolute bottom-32 left-4 right-4 z-10"
        />
        
        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center items-center z-10">
          <Button
            onClick={capturePhoto}
            disabled={isCapturing}
            className="w-20 h-20 rounded-full bg-white hover:bg-gray-200 text-black border-4 border-white"
          >
            <Camera className="h-8 w-8" />
          </Button>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <Card className="absolute top-20 right-4 w-80 bg-black/90 border-gray-700 text-white z-20">
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Grid Opacity</label>
                <Slider
                  value={[gridOpacity]}
                  onValueChange={(value) => setGridOpacity(value[0])}
                  max={1}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{Math.round(gridOpacity * 100)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Save Both Versions</label>
                <Switch
                  checked={saveBothVersions}
                  onCheckedChange={setSaveBothVersions}
                />
              </div>
              
              <p className="text-xs text-gray-400">
                {saveBothVersions 
                  ? "Saves one photo with grid overlay and one clean photo"
                  : "Saves only one version based on current grid visibility"
                }
              </p>
            </div>
          </Card>
        )}
      </div>
      
      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Index;
