
import React from 'react';
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

interface GridOverlayProps {
  type: GridType;
  opacity: number;
  className?: string;
}

const GridOverlay: React.FC<GridOverlayProps> = ({ type, opacity, className }) => {
  if (type === 'none') return null;

  const renderGrid = () => {
    switch (type) {
      case 'rule-of-thirds':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Vertical lines */}
            <line x1="33.33" y1="0" x2="33.33" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="66.66" y1="0" x2="66.66" y2="100" stroke="white" strokeWidth="0.2" />
            {/* Horizontal lines */}
            <line x1="0" y1="33.33" x2="100" y2="33.33" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="66.66" x2="100" y2="66.66" stroke="white" strokeWidth="0.2" />
          </svg>
        );
      
      case 'golden-ratio':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Golden ratio lines (1:1.618) */}
            <line x1="38.2" y1="0" x2="38.2" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="61.8" y1="0" x2="61.8" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="38.2" x2="100" y2="38.2" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="61.8" x2="100" y2="61.8" stroke="white" strokeWidth="0.2" />
          </svg>
        );
      
      case 'golden-spiral':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Golden spiral approximation */}
            <path
              d="M 61.8 0 L 61.8 38.2 L 100 38.2 L 100 100 L 0 100 L 0 61.8 L 38.2 61.8 L 38.2 0 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.2"
            />
            {/* Spiral curve */}
            <path
              d="M 61.8 0 Q 100 0 100 38.2 Q 100 100 0 100 Q 0 61.8 38.2 61.8 Q 61.8 61.8 61.8 0"
              fill="none"
              stroke="white"
              strokeWidth="0.3"
            />
          </svg>
        );
      
      case 'triangles':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Diagonal triangles */}
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="50" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="50" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.2" />
          </svg>
        );
      
      case 'diagonals':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.2" />
          </svg>
        );
      
      case 'center-cross':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.2" />
          </svg>
        );
      
      case 'grid':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* 4x4 grid */}
            {[25, 50, 75].map(pos => (
              <g key={pos}>
                <line x1={pos} y1="0" x2={pos} y2="100" stroke="white" strokeWidth="0.15" />
                <line x1="0" y1={pos} x2="100" y2={pos} stroke="white" strokeWidth="0.15" />
              </g>
            ))}
          </svg>
        );
      
      case 'quadrant':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.2" />
          </svg>
        );
      
      case 'symmetry':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.2" />
            <line x1="25" y1="0" x2="25" y2="100" stroke="white" strokeWidth="0.1" />
            <line x1="75" y1="0" x2="75" y2="100" stroke="white" strokeWidth="0.1" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeWidth="0.1" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="white" strokeWidth="0.1" />
          </svg>
        );
      
      case 'leading-lines':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Perspective lines leading to center */}
            <line x1="0" y1="0" x2="50" y2="50" stroke="white" strokeWidth="0.2" />
            <line x1="100" y1="0" x2="50" y2="50" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.2" />
            <line x1="100" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.2" />
          </svg>
        );
      
      case 'dynamic-symmetry':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Dynamic symmetry based on square root rectangles */}
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.2" />
            <line x1="0" y1="29.3" x2="100" y2="70.7" stroke="white" strokeWidth="0.15" />
            <line x1="0" y1="70.7" x2="100" y2="29.3" stroke="white" strokeWidth="0.15" />
            <line x1="29.3" y1="0" x2="70.7" y2="100" stroke="white" strokeWidth="0.15" />
            <line x1="70.7" y1="0" x2="29.3" y2="100" stroke="white" strokeWidth="0.15" />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={cn("absolute inset-0", className)}
      style={{ opacity }}
    >
      {renderGrid()}
    </div>
  );
};

export default GridOverlay;
