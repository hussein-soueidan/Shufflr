import React, { useState } from 'react';
import { TrashIcon } from '../icons';

interface ReplacePair {
  id: number;
  find: string;
  replaceWith: string;
}

interface MultiReplaceModalProps {
  onApply: (pairs: { find: string, replaceWith: string }[]) => void;
  onClose: () => void;
}

const MultiReplaceModal: React.FC<MultiReplaceModalProps> = ({ onApply, onClose }) => {
  const [pairs, setPairs] = useState<ReplacePair[]>([{ id: Date.now(), find: '', replaceWith: '' }]);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const rows = pastedText.split(/[\r\n]+/).filter(row => row.trim());
    const newPairs: ReplacePair[] = rows.map((row, index) => {
      const columns = row.split('\t'); // Tab-separated for Excel/Sheets
      return { id: Date.now() + index, find: columns[0] || '', replaceWith: columns[1] || '' };
    });
    if (newPairs.length > 0) setPairs(newPairs);
  };

  const handlePairChange = (id: number, field: 'find' | 'replaceWith', value: string) => {
    setPairs(currentPairs => currentPairs.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addRow = () => setPairs(p => [...p, { id: Date.now(), find: '', replaceWith: '' }]);
  const removeRow = (id: number) => setPairs(p => p.filter(pair => pair.id !== id));
  
  const handleApplyClick = () => {
    const validPairs = pairs.map(({ find, replaceWith }) => ({ find, replaceWith })).filter(p => p.find.trim());
    onApply(validPairs);
  };

  const inputClass = "w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm rounded-md focus:ring-2 focus:ring-cyan-500 p-1.5 transition";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-4xl p-6 border border-slate-200 dark:border-slate-700/50 flex flex-col" style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
        <h2 id="dialog-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Batch Find &amp; Replace</h2>
        <div className="mb-4">
          <label htmlFor="paste-area" className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Paste from spreadsheet (Tab-separated)</label>
          <textarea id="paste-area" onPaste={handlePaste} className="w-full h-24 bg-slate-100 dark:bg-[#0D1117] border border-slate-300 dark:border-slate-700 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 transition" placeholder="Paste multiple rows from Excel or a similar app. Column 1: Find, Column 2: Replace." />
        </div>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          <table className="min-w-full text-sm">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-950/75 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-4 py-3 w-1/2 text-left">Find</th>
                <th scope="col" className="px-4 py-3 w-1/2 text-left">Replace With</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair, index) => (
                <tr key={pair.id} className="border-b border-slate-200 dark:border-slate-800/50">
                  <td className="p-2"><input type="text" value={pair.find} onChange={e => handlePairChange(pair.id, 'find', e.target.value)} className={`${inputClass} text-cyan-700 dark:text-cyan-300`} placeholder={`Find text ${index + 1}`} /></td>
                  <td className="p-2"><input type="text" value={pair.replaceWith} onChange={e => handlePairChange(pair.id, 'replaceWith', e.target.value)} className={inputClass} placeholder={`Replace with ${index + 1}`} /></td>
                  <td className="p-2 text-right"><button onClick={() => removeRow(pair.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-500 p-1" aria-label={`Remove row ${index + 1}`}><TrashIcon /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button onClick={addRow} className="px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-md border border-cyan-500/30">+ Add Row</button>
        </div>
        <div className="mt-6 flex justify-end gap-4 border-t border-slate-200 dark:border-slate-700/50 pt-5">
          <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md">Cancel</button>
          <button onClick={handleApplyClick} className="px-6 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-md">Apply Replacements</button>
        </div>
      </div>
    </div>
  );
};

export default MultiReplaceModal;
