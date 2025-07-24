import React, { useState } from 'react';
import type { FileInfo } from '../types';
import { useRenameHistory } from '../services/useRenameHistory';

interface RenamingPanelProps {
  files: FileInfo[];
  onApply: (files: FileInfo[]) => void;
  onCancel: () => void;
}

const RenamingPanel: React.FC<RenamingPanelProps> = ({ files, onApply, onCancel }) => {
  const { state, push, undo, redo, canUndo, canRedo } = useRenameHistory(files);
  const [removeText, setRemoveText] = useState('');

  const removeTextFromNames = () => {
    const updated = state.map((f) => ({ ...f, newName: f.newName.replaceAll(removeText, '') }));
    push(updated);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-slate-100 p-4 animate-fade-in-slow">
      <div className="flex items-end gap-3">
        <div>
          <label className="text-sm">Remove Text</label>
          <input
            type="text"
            value={removeText}
            onChange={(e) => setRemoveText(e.target.value)}
            className="ml-2 px-2 py-1 rounded-md bg-slate-700"
          />
          <button onClick={removeTextFromNames} className="ml-2 px-3 py-1 bg-cyan-600 rounded-md">
            Apply
          </button>
        </div>
        <div className="flex-grow" />
        <button onClick={undo} disabled={!canUndo} className="px-3 py-1 bg-slate-700 rounded-md disabled:opacity-50 mr-2">
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo} className="px-3 py-1 bg-slate-700 rounded-md disabled:opacity-50 mr-2">
          Redo
        </button>
        <button onClick={() => onApply(state)} className="px-4 py-1 bg-cyan-600 rounded-md">
          Commit All Renames
        </button>
        <button onClick={onCancel} className="ml-2 px-3 py-1 bg-slate-600 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RenamingPanel;
