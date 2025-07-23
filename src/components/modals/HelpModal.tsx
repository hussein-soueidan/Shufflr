import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HelpCircleIcon, SearchIcon, ShufflrLogoIcon } from '../icons';

interface HelpModalProps {
    onClose: () => void;
    onSearch: (query: string) => Promise<void>;
    searchResult: string;
    isLoading: boolean;
    documentation: string;
}

const SimpleMarkdownRenderer: React.FC<{ text: string }> = React.memo(({ text }) => {
    const content = text
        .replace(/^# (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3">$1</h2>')
        .replace(/^## (.*$)/gim, '<h3 class="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-5 mb-2">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-1 bg-slate-200 dark:bg-slate-700 rounded-md font-mono text-sm text-cyan-600 dark:text-cyan-400">$1</code>')
        .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc mb-1">$1</li>')
        .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
        .replace(/<\/ul>\n<ul>/g, '')
        .replace(/\n/g, '<br />');

    return <div className="text-slate-600 dark:text-slate-300 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: content }} />;
});

const HelpModal: React.FC<HelpModalProps> = ({ onClose, onSearch, searchResult, isLoading, documentation }) => {
    const [query, setQuery] = useState('');
    const debounceTimeout = useRef<number | null>(null);

    const debouncedSearch = useCallback((searchQuery: string) => {
        if (debounceTimeout.current) window.clearTimeout(debounceTimeout.current);
        debounceTimeout.current = window.setTimeout(() => {
            onSearch(searchQuery);
        }, 500);
    }, [onSearch]);

    useEffect(() => {
        debouncedSearch(query);
        return () => {
            if (debounceTimeout.current) window.clearTimeout(debounceTimeout.current);
        };
    }, [query, debouncedSearch]);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl border border-slate-200 dark:border-slate-700/50 flex flex-col" style={{ height: '90vh' }} onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <HelpCircleIcon className="w-8 h-8 text-cyan-500" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Help & Documentation</h2>
                    </div>
                    <div className="relative flex-grow max-w-sm">
                        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask Gemini: How do I replace text?" className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm rounded-full focus:ring-2 focus:ring-cyan-500 p-2.5 pl-11 transition" aria-label="Search documentation" />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
                             <ShufflrLogoIcon className="w-16 h-16 animate-pulse text-cyan-500" />
                             <p className="mt-4 text-lg">Searching for an answer...</p>
                        </div>
                    ) : (query && searchResult) ? (
                        <div>
                            <h3 className="text-sm uppercase font-bold text-slate-500 dark:text-slate-400 mb-3">AI Search Result for "{query}"</h3>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                <SimpleMarkdownRenderer text={searchResult} />
                            </div>
                        </div>
                    ) : (
                        <SimpleMarkdownRenderer text={documentation} />
                    )}
                </div>

                <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 rounded-md">Close</button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
