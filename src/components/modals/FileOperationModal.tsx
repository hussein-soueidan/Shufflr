import React, { useState } from 'react';

interface FileOperationModalProps {
  action: 'copy' | 'cut';
  onClose: () => void;
  onGenerateScript: (destinationPath: string) => void;
  onPerformDirectly: () => Promise<void>;
}

const FileOperationModal: React.FC<FileOperationModalProps> = ({ action, onClose, onGenerateScript, onPerformDirectly }) => {
  const [destinationPath, setDestinationPath] = useState('');

  const handleGenerate = () => { if (destinationPath.trim()) onGenerateScript(destinationPath.trim())};
  const handleDirectActionClick = async () => onPerformDirectly();
  
  const opName = action === 'copy' ? 'Copy' : 'Move';
  const inputClass = "w-full bg-slate-100 dark:bg-[#0D1117] border border-slate-300 dark:border-slate-700 text-sm rounded-md focus:ring-2 focus:ring-cyan-500 p-2.5 transition";
  const primaryButtonClass = "w-full px-5 py-2 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl p-6 border border-slate-200 dark:border-slate-700/50" onClick={e => e.stopPropagation()}>
        <h2 id="dialog-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Perform {opName} Action</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Choose your preferred method to {action} the selected files.</p>
        <div className="space-y-6">
          <div className="border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/10 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Method 1: Perform Action Directly (Recommended)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Use the native file dialog to securely select a destination and {action} files immediately.</p>
            <button onClick={handleDirectActionClick} className={primaryButtonClass}>Select Destination &amp; {opName} Files</button>
          </div>
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 font-semibold">OR</div>
          <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Method 2: Generate a PowerShell script (.ps1)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Create a script to run on your computer. The script will contain full, absolute paths.</p>
            <div className="space-y-2">
              <label htmlFor="dest-path" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Full Destination Folder Path</label>
              <input id="dest-path" type="text" value={destinationPath} onChange={e => setDestinationPath(e.target.value)} className={inputClass} placeholder="e.g., D:\\My_Backups\\New_Location" />
              <button onClick={handleGenerate} disabled={!destinationPath.trim()} className="w-full sm:w-auto px-6 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-md disabled:bg-slate-400 disabled:cursor-not-allowed mt-2">Generate Script</button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700/50 pt-5">
          <button onClick={onClose} className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FileOperationModal;
