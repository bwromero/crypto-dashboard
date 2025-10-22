// Simple treemap layout algorithm using squarified treemap
export interface TreemapNode {
    id: string;
    value: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  interface LayoutRect {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export const calculateTreemap = (
    data: Array<{ id: string; value: number }>,
    width: number,
    height: number
  ): TreemapNode[] => {
    // Sort data by value descending
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    
    // Calculate total value
    const totalValue = sortedData.reduce((sum, d) => sum + d.value, 0);
    
    // Initialize result
    const nodes: TreemapNode[] = [];
    
    // Initial rectangle
    const rect: LayoutRect = { x: 0, y: 0, width, height };
    
    // Squarify algorithm
    const squarify = (items: typeof sortedData, rect: LayoutRect) => {
      if (items.length === 0) return;
      
      if (items.length === 1) {
        nodes.push({
          ...items[0],
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        });
        return;
      }
      
      // Calculate scaled values
      const scaleFactor = (rect.width * rect.height) / totalValue;
      const scaledItems = items.map(item => ({
        ...item,
        scaledValue: item.value * scaleFactor,
      }));
      
      // Use simple slicing algorithm for better performance
      let currentY = rect.y;
      let currentX = rect.x;
      const isVertical = rect.width > rect.height;
      
      scaledItems.forEach((item, index) => {
        const ratio = item.value / totalValue;
        
        if (isVertical) {
          const itemWidth = rect.width * ratio;
          nodes.push({
            id: item.id,
            value: item.value,
            x: currentX,
            y: rect.y,
            width: Math.max(itemWidth, 20),
            height: rect.height,
          });
          currentX += itemWidth;
        } else {
          const itemHeight = rect.height * ratio;
          nodes.push({
            id: item.id,
            value: item.value,
            x: rect.x,
            y: currentY,
            width: rect.width,
            height: Math.max(itemHeight, 20),
          });
          currentY += itemHeight;
        }
      });
    };
    
    squarify(sortedData, rect);
    
    return nodes;
  };
  
  // Better treemap implementation using binary space partitioning
  export const calculateTreemapBSP = (
    data: Array<{ id: string; value: number }>,
    containerWidth: number,
    containerHeight: number
  ): TreemapNode[] => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const totalValue = sortedData.reduce((sum, d) => sum + d.value, 0);
    
    const nodes: TreemapNode[] = [];
    
    const partition = (
      items: typeof sortedData,
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      if (items.length === 0) return;
      
      if (items.length === 1) {
        nodes.push({
          id: items[0].id,
          value: items[0].value,
          x,
          y,
          width,
          height,
        });
        return;
      }
      
      // Calculate split point
      const sum = items.reduce((s, item) => s + item.value, 0);
      let leftSum = 0;
      let splitIndex = 0;
      
      for (let i = 0; i < items.length - 1; i++) {
        leftSum += items[i].value;
        if (leftSum >= sum / 2) {
          splitIndex = i + 1;
          break;
        }
      }
      
      const leftItems = items.slice(0, splitIndex);
      const rightItems = items.slice(splitIndex);
      
      const leftValue = leftItems.reduce((s, item) => s + item.value, 0);
      const rightValue = rightItems.reduce((s, item) => s + item.value, 0);
      
      // Decide whether to split horizontally or vertically
      if (width > height) {
        // Split vertically
        const leftWidth = (leftValue / sum) * width;
        partition(leftItems, x, y, leftWidth, height);
        partition(rightItems, x + leftWidth, y, width - leftWidth, height);
      } else {
        // Split horizontally
        const leftHeight = (leftValue / sum) * height;
        partition(leftItems, x, y, width, leftHeight);
        partition(rightItems, x, y + leftHeight, width, height - leftHeight);
      }
    };
    
    partition(sortedData, 0, 0, containerWidth, containerHeight);
    
    return nodes;
  };
  