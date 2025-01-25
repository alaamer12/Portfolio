import { block } from 'million/react';

// OptimizedBlock: Use for components that rarely update
export const OptimizedBlock = block.div();

// OptimizedLoop: Use for rendering lists efficiently
export const OptimizedLoop = ({ items, renderItem }) => {
  return (
    <>
      {items.map((item, index) => (
        <OptimizedBlock key={item.id || index}>
          {renderItem(item, index)}
        </OptimizedBlock>
      ))}
    </>
  );
};
