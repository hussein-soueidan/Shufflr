import React, { useState } from 'react';
import { FileIcon, SearchIcon } from '../icons';
import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';

interface SearchAndCollectModalProps {
    onSearch: (keywords: string[], searchType: 'exact' | 'contains') => void;
    onClose: () => void;
}

const SearchAndCollectModal: React.FC<SearchAndCollectModalProps> = ({ onSearch, onClose }) => {
    const [keywords, setKeywords] = useState('');
    const [searchType, setSearchType] = useState<'exact' | 'contains'>('contains');

    const handleFileImport = async () => {
      try {
        const selected = await open({
            multiple: false,
            filters: [{ name: 'Text Files', extensions: ['txt', 'csv'] }]
        });
        if (typeof selected === 'string') {
            const content = await readTextFile(selected);
            setKeywords(content);
        }
      } catch(e) {
        console.error("Failed to import keywords:", e);
      }
    };

    const handleSearchClick = () => {
        const keywordList = keywords.split(/[\n,;]+/).map(k => k.trim()).filter(Boolean);
        if (keywordList.length > 0) onSearch(keywordList, searchType);
    };

    const radioClass = "w-4 h-4 text-cyan-600 bg-slate-200 dark:bg-slate-800 border-slate-400 dark:border-slate-600 focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900 focus:ring-cyan-500";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl p-6 border border-slate-200 dark:border-slate-700/50" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
                    <SearchIcon className="w-7 h-7 text-cyan-500" /> Search & Collect Files
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Enter keywords (separated by new lines, commas, or semicolons) to find and select files. The search is on filenames without extensions.</p>
                <div className="space-y-4">
                    <div>
                        <textarea
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full h-40 bg-slate-100 dark:bg-[#0D1117] border border-slate-300 dark:border-slate-700 rounded-md p-3 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-cyan-500 transition"
                            placeholder="ITEM123_main&#10;ITEM456_angle&#10;PRODUCT_CODE_ABC"
                        />
                         <button onClick={handleFileImport} className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 mt-2 transition-colors">
                            <FileIcon className="w-4 h-4" /> or Import from a .txt/.csv file
                        </button>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Search Options</h3>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-md border border-slate-200 dark:border-slate-700/50">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="searchType" value="contains" checked={searchType === 'contains'} onChange={() => setSearchType('contains')} className={radioClass} />
                                <span className="text-slate-700 dark:text-slate-200">Name contains keyword</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="searchType" value="exact" checked={searchType === 'exact'} onChange={() => setSearchType('exact')} className={radioClass} />
                                <span className="text-slate-700 dark:text-slate-200">Exact name match</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-200 dark:border-slate-700/50 pt-5">
                    <button onClick={onClose} className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md transition-colors">Cancel</button>
                    <button onClick={handleSearchClick} disabled={!keywords.trim()} className="w-full sm:w-auto px-6 py-2 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed">Find &amp; Select</button>
                </div>
            </div>
        </div>
    );
};

export default SearchAndCollectModal;
