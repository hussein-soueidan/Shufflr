import React from 'react';
import { ExportIcon } from '../icons';

interface UnfoundItemsModalProps {
  unfoundItems: string[];
  onClose: () => void;
  onExport: (items: string[]) => void;
}

const UnfoundItemsModal: React.FC<UnfoundItemsModalProps> = ({ unfoundItems, onClose, onExport }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-lg p-6 border border-slate-200 dark:border-slate-700/50 flex flex-col" style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
      <h2 id="dialog-title" className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Items Not Found</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-4">The following {unfoundItems.length} items from your search were not found:</p>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2 bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-700/50 rounded-md p-3">
        <ul className="space-y-1">
          {unfoundItems.map((item, index) => (
            <li key={index} className="text-slate-700 dark:text-slate-300 font-mono text-sm truncate" title={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-between items-center gap-4 border-t border-slate-200 dark:border-slate-700/50 pt-5">
        <button onClick={() => onExport(unfoundItems)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-md border border-cyan-500/30">
          <ExportIcon className="w-4 h-4" /> Export List
        </button>
        <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md">
          Close
        </button>
      </div>
    </div>
  </div>
);

export default UnfoundItemsModal;
