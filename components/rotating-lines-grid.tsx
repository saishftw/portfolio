'use client'

import React, { useState, useEffect, useRef } from 'react'

const ControlInput = ({ label, value, onChange, min, max }: { label: string, value: number, onChange: (val: number) => void, min: number, max: number }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startValueRef = useRef<number>(value);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startValueRef.current = value;
  };

  const handleMove = (clientX: number) => {
    if (isDragging) {
      const sensitivity = 0.5;
      const delta = (clientX - startXRef.current) * sensitivity;
      const range = max - min;
      const newValue = Math.round(startValueRef.current + (delta / 100) * range);
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleMouseUp = handleEnd;
    const handleTouchEnd = handleEnd;

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, min, max, onChange]);

  return (
    <div className="w-100 flex items-center mr-4 mb-2">
      <label className="mr-2 text-gray-500 font-mono text-xs">{label}</label>
      <div
        ref={inputRef}
        className={`w-12 text-center py-1 text-gray-500 font-mono text-xs cursor-ew-resize select-none ${isDragging ? 'text-white' : ''
          }`}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        {value}
      </div>
    </div>
  );
};

const RotatingLinesGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [horizontalSeparation, setHorizontalSeparation] = useState(20)
  const [verticalSeparation, setVerticalSeparation] = useState(20)
  const [lineWidth, setLineWidth] = useState(25)
  const [lineHeight, setLineHeight] = useState(2)
  const [rows, setRows] = useState(8)
  const [columns, setColumns] = useState(30)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
        setMousePosition({
          x: clientX - rect.left,
          y: clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleMouseMove)
    }
  }, [])

  const calculateRotationAndColor = (lineX: number, lineY: number) => {
    const dx = mousePosition.x - lineX
    const dy = mousePosition.y - lineY
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    const distance = Math.sqrt(dx * dx + dy * dy)
    return { angle, distance }
  }

  const getColor = (distance: number) => {
    const width = containerRef.current?.clientWidth
    const height = containerRef.current?.clientHeight
    const maxDistance = width && height ? Math.sqrt(width ** 2 + height ** 2) : 500
    const intensity = Math.max(0, 1 - distance / (maxDistance * 0.3))
    const baseColor = 128  // Gray color (128, 128, 128)
    const color = Math.round(baseColor + (127 * intensity))
    const opacity = 0.3 + (0.7 * intensity)  // Adjust opacity based on distance
    return `rgba(${color}, ${color}, ${color}, ${opacity})`
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, ${lineWidth}px)`,
    gridTemplateRows: `repeat(${rows}, ${lineHeight}px)`,
    gap: `${verticalSeparation}px ${horizontalSeparation}px`,
    padding: '20px',
    backgroundColor: 'transparent',
    position: 'relative',
  }

  return (
    <div className="w-100 overflow-hidden px-4 bg-transparent">
      {/* <div className="pt-6 px-2 flex flex-wrap justify-center">
        <ControlInput label="H-Sep" value={horizontalSeparation} onChange={setHorizontalSeparation} min={0} max={100} />
        <ControlInput label="V-Sep" value={verticalSeparation} onChange={setVerticalSeparation} min={0} max={100} />
        <ControlInput label="Width" value={lineWidth} onChange={setLineWidth} min={1} max={50} />
        <ControlInput label="Height" value={lineHeight} onChange={setLineHeight} min={1} max={10} />
        <ControlInput label="Rows" value={rows} onChange={setRows} min={1} max={20} />
        <ControlInput label="Columns" value={columns} onChange={setColumns} min={1} max={50} />
      </div> */}
      <div className="flex-grow flex items-center justify-center">
        <div
          ref={containerRef}
          style={gridStyle}
          onTouchMove={(e) => e.preventDefault()}
        >
          {Array.from({ length: rows * columns }).map((_, index) => {
            const row = Math.floor(index / columns)
            const col = index % columns
            const lineX = col * (lineWidth + horizontalSeparation) + lineWidth / 2
            const lineY = row * (lineHeight + verticalSeparation) + lineHeight / 2
            const rotationAndColor = calculateRotationAndColor(lineX, lineY)

            return (
              <div
                key={index}
                style={{
                  width: `${lineWidth}px`,
                  height: `${lineHeight}px`,
                  backgroundColor: getColor(rotationAndColor.distance),
                  transform: `rotate(${rotationAndColor.angle}deg)`,
                  transformOrigin: 'center',
                  transition: 'transform 0.1s ease-out, background-color 0.1s ease-out, opacity 0.1s ease-out',
                }}
              />
            )
          })}
        </div>
      </div>
      {/* <div className="pb-4 text-center">
        <a 
          href="https://x.com/verse_/status/1872711764800069989" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 hover:text-gray-400 font-mono text-xs"
        >
          based on ab's work
        </a>
      </div> */}
    </div>
  )
}

export default RotatingLinesGrid

