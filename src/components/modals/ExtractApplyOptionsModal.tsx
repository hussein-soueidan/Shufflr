import React, { useState } from 'react';

interface ExtractApplyOptionsModalProps {
  onClose: () => void;
  onApply: (choice: 'to_new_name' | 'new_column', header: string) => void;
}

const ExtractApplyOptionsModal: React.FC<ExtractApplyOptionsModalProps> = ({ onClose, onApply }) => {
  const [headerName, setHeaderName] = useState('Substring');

  const handleApplyNewColumn = () => { if (headerName.trim()) onApply('new_column', headerName.trim()) };
  const handleApplyToNewName = () => onApply('to_new_name', '');

  const inputClass = "w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm rounded-md focus:ring-2 focus:ring-cyan-500 p-2 transition";
  const primaryButtonClass = "w-full px-5 py-2 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed";
  const secondaryButtonClass = "w-full px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700/50" onClick={e => e.stopPropagation()}>
        <h2 id="dialog-title" className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Apply Extracted Substring</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">How would you like to use the extracted text?</p>
        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Create New Column</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Add the result as a new column. This does not change the filename.</p>
            <div className="space-y-2">
              <label htmlFor="column-name" className="text-xs font-bold text-slate-600 dark:text-slate-400">NEW COLUMN NAME</label>
              <input id="column-name" type="text" value={headerName} onChange={e => setHeaderName(e.target.value)} className={inputClass} placeholder="e.g., Product ID" />
              <button onClick={handleApplyNewColumn} disabled={!headerName.trim()} className={primaryButtonClass}>Create Column</button>
            </div>
          </div>
          <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
             <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Apply to New Filename</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Overwrite the 'New Filename' field with the extracted text for renaming.</p>
            <button onClick={handleApplyToNewName} className={secondaryButtonClass}>Apply to "New Filename"</button>
          </div>
        </div>
        <div className="mt-6 flex justify-end border-t border-slate-200 dark:border-slate-700/50 pt-4">
          <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExtractApplyOptionsModal;
