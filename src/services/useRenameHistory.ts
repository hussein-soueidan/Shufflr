import { useState } from 'react';

/**
 * Simple undo/redo history hook used by the RenamingPanel.
 */
export function useRenameHistory<T>(initial: T) {
  const [history, setHistory] = useState([initial]);
  const [index, setIndex] = useState(0);

  const push = (state: T) => {
    setHistory((prev) => {
      const next = prev.slice(0, index + 1);
      next.push(state);
      return next;
    });
    setIndex((prev) => prev + 1);
  };

  const undo = () => setIndex((i) => (i > 0 ? i - 1 : i));
  const redo = () => setIndex((i) => (i < history.length - 1 ? i + 1 : i));

  return {
    state: history[index],
    push,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  } as const;
}
