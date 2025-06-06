
import React from 'react';
import { Grid3X3, Triangle, Crosshair, Square, Zap, Move, RotateCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type GridType = 
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

interface GridSelectorProps {
  selectedGrid: GridType;
  onGridSelect: (grid: GridType) => void;
  className?: string;
}

const gridOptions = [
  { type: 'none' as const, icon: Square, label: 'None' },
  { type: 'rule-of-thirds' as const, icon: Grid3X3, label: 'Rule of Thirds' },
  { type: 'golden-ratio' as const, icon: RotateCw, label: 'Golden Ratio' },
  { type: 'golden-spiral' as const, icon: Zap, label: 'Golden Spiral' },
  { type: 'triangles' as const, icon: Triangle, label: 'Triangles' },
  { type: 'diagonals' as const, icon: Move, label: 'Diagonals' },
  { type: 'center-cross' as const, icon: Crosshair, label: 'Center Cross' },
  { type: 'grid' as const, icon: Layers, label: 'Grid' },
];

const GridSelector: React.FC<GridSelectorProps> = ({ 
  selectedGrid, 
  onGridSelect, 
  className 
}) => {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2", className)}>
      {gridOptions.map(({ type, icon: Icon, label }) => (
        <Button
          key={type}
          variant="ghost"
          size="icon"
          onClick={() => onGridSelect(type)}
          className={cn(
            "min-w-12 h-12 bg-black/50 hover:bg-black/70 border-none text-white",
            selectedGrid === type && "bg-white/20 ring-2 ring-white/50"
          )}
          title={label}
        >
          <Icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
};

export default GridSelector;
