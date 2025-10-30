// Bubble pack layout using circle packing algorithm
export interface BubbleNode {
    id: string;
    x: number;
    y: number;
    radius: number;
    value: number;
  }
  
  interface Circle {
    x: number;
    y: number;
    radius: number;
  }
  
  // Calculate distance between two circles
  const distance = (a: Circle, b: Circle): number => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  // Check if two circles overlap
  const overlaps = (a: Circle, b: Circle, padding: number = 2): boolean => {
    return distance(a, b) < (a.radius + b.radius + padding);
  };
  
  // Simple circle packing algorithm
  export const calculateBubblePack = (
    data: Array<{ id: string; value: number }>,
    width: number,
    height: number,
    minRadius: number = 30,
    maxRadius: number = 100
  ): BubbleNode[] => {
    if (data.length === 0) return [];
  
    // Sort by value descending
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    
    // Find min and max values for scaling
    const values = sortedData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    
    // Scale radius based on value
    const scaleRadius = (value: number): number => {
      if (maxValue === minValue) return (minRadius + maxRadius) / 2;
      const normalized = (value - minValue) / (maxValue - minValue);
      return minRadius + normalized * (maxRadius - minRadius);
    };
  
    const bubbles: BubbleNode[] = [];
    const circles: Circle[] = [];
    
    // Center of the container
    const centerX = width / 2;
    const centerY = height / 2;
    
    sortedData.forEach((item, index) => {
      const radius = scaleRadius(item.value);
      let x: number = 0;
      let y: number = 0;
      let attempts = 0;
      const maxAttempts = 1000;
      
      if (index === 0) {
        // First bubble at center
        x = centerX;
        y = centerY;
      } else {
        // Try to place bubble near center without overlapping
        let placed = false;
        
        while (!placed && attempts < maxAttempts) {
          // Generate random position near center with increasing radius
          const angle = Math.random() * Math.PI * 2;
          const spreadRadius = Math.min(attempts * 2, Math.min(width, height) / 2);
          x = centerX + Math.cos(angle) * spreadRadius;
          y = centerY + Math.sin(angle) * spreadRadius;
          
          // Ensure within bounds
          x = Math.max(radius, Math.min(width - radius, x));
          y = Math.max(radius, Math.min(height - radius, y));
          
          const newCircle = { x, y, radius };
          
          // Check if it overlaps with existing circles
          const hasOverlap = circles.some(circle => overlaps(newCircle, circle, 4));
          
          if (!hasOverlap) {
            placed = true;
          }
          
          attempts++;
        }
        
        // If couldn't place after max attempts, force placement
        if (!placed) {
          x = centerX + (Math.random() - 0.5) * width * 0.8;
          y = centerY + (Math.random() - 0.5) * height * 0.8;
          x = Math.max(radius, Math.min(width - radius, x));
          y = Math.max(radius, Math.min(height - radius, y));
        }
      }
      
      circles.push({ x, y, radius });
      bubbles.push({
        id: item.id,
        x,
        y,
        radius,
        value: item.value,
      });
    });
    
    // Apply force-based relaxation to reduce overlaps
    const iterations = 50;
    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
          const a = circles[i];
          const b = circles[j];
          const dist = distance(a, b);
          const minDist = a.radius + b.radius + 4;
          
          if (dist < minDist && dist > 0) {
            // Move circles apart
            const angle = Math.atan2(b.y - a.y, b.x - a.x);
            const overlap = (minDist - dist) / 2;
            
            a.x -= Math.cos(angle) * overlap * 0.5;
            a.y -= Math.sin(angle) * overlap * 0.5;
            b.x += Math.cos(angle) * overlap * 0.5;
            b.y += Math.sin(angle) * overlap * 0.5;
            
            // Keep within bounds
            a.x = Math.max(a.radius, Math.min(width - a.radius, a.x));
            a.y = Math.max(a.radius, Math.min(height - a.radius, a.y));
            b.x = Math.max(b.radius, Math.min(width - b.radius, b.x));
            b.y = Math.max(b.radius, Math.min(height - b.radius, b.y));
            
            // Update bubble positions
            bubbles[i].x = a.x;
            bubbles[i].y = a.y;
            bubbles[j].x = b.x;
            bubbles[j].y = b.y;
          }
        }
      }
    }
    
    return bubbles;
  };