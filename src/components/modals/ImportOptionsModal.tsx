import React, { useState } from 'react';
import { FolderIcon } from '../icons';
import { confirm } from '@tauri-apps/api/dialog';

interface ImportOptionsModalProps {
  onClose: () => void;
  onImport: (options: { includeSubdirectories: boolean; replace: boolean }) => void;
  isListPopulated: boolean;
}

const ImportOptionsModal: React.FC<ImportOptionsModalProps> = ({ onClose, onImport, isListPopulated }) => {
  const [includeSubdirectories, setIncludeSubdirectories] = useState(true);
  const [importBehavior, setImportBehavior] = useState<'append' | 'replace'>('append');

  const handleImport = async () => {
    const options = { includeSubdirectories, replace: importBehavior === 'replace' };
    if (options.replace && isListPopulated) {
      const confirmedAction = await confirm('This will clear all existing files from the table before importing. Are you sure?', {
        title: 'Confirm Replace',
        type: 'warning'
      });
      if (confirmedAction) onImport(options);
    } else {
      onImport(options);
    }
  };

  const radioClass = "w-4 h-4 text-cyan-600 bg-slate-200 dark:bg-slate-800 border-slate-400 dark:border-slate-600 focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900 focus:ring-cyan-500";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={onClose}>
        <div className="bg-white/80 dark:bg-[#10141b]/80 backdrop-blur-lg rounded-lg shadow-2xl w-full max-w-lg p-6 border border-cyan-500/30 shadow-cyan-500/10" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
                <FolderIcon className="w-7 h-7 text-cyan-500" /> Import Folder Options
            </h2>
            <div className="space-y-6 py-2">
                <div className="flex items-center justify-between bg-black/5 dark:bg-black/20 p-4 rounded-md border border-slate-500/20">
                    <div className="text-slate-800 dark:text-slate-200">
                        <p className="font-semibold">Include Subdirectories</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Scan all folders inside the selected one.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={includeSubdirectories} onChange={() => setIncludeSubdirectories(p => !p)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                </div>
                {isListPopulated && (
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Import Behavior</h3>
                        <div className="flex flex-col gap-2 bg-black/5 dark:bg-black/20 p-3 rounded-md border border-slate-500/20">
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-cyan-500/10 cursor-pointer">
                                <input type="radio" name="importBehavior" value="append" checked={importBehavior === 'append'} onChange={() => setImportBehavior('append')} className={radioClass} />
                                <div>
                                    <span className="font-medium text-slate-800 dark:text-slate-200">Append to Current List</span>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Add new files to the table.</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-2 rounded-md hover:bg-cyan-500/10 cursor-pointer">
                                <input type="radio" name="importBehavior" value="replace" checked={importBehavior === 'replace'} onChange={() => setImportBehavior('replace')} className={radioClass} />
                                <div>
                                    <span className="font-medium text-slate-800 dark:text-slate-200">Replace Current List</span>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Clear existing files before importing.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-300/50 dark:border-slate-700/50 pt-5">
                <button onClick={onClose} className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-500/20 hover:bg-slate-500/30 rounded-md transition-colors">Cancel</button>
                <button onClick={handleImport} className="w-full sm:w-auto px-6 py-2 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-md transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/40">Proceed & Import</button>
            </div>
        </div>
    </div>
  );
};

export default ImportOptionsModal;
