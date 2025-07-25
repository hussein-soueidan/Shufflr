import React, { useState } from 'react';
import Header from './components/Header';
import FileTable from './components/FileTable';
import HelpModal from './components/modals/HelpModal';
import { scanDirectory } from './services/fileUtils';
import { open } from '@tauri-apps/api/dialog';
import { FileInfo } from './types';
import { searchDocumentation, getDocumentation } from './services/geminiService';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showHelp, setShowHelp] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    const dir = await open({ directory: true });
    if (dir && typeof dir === 'string') {
      const list = await scanDirectory(dir, true);
      setFiles(list.filter(f => !f.isDir));
      setSelected(new Set());
    }
  };

  const toggle = (path: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === files.length) setSelected(new Set());
    else setSelected(new Set(files.map(f => f.path)));
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResult('');
      return;
    }
    setLoading(true);
    const result = await searchDocumentation(query);
    setSearchResult(result);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen pt-14 font-sans">
      <Header onImport={handleImport} onHelp={() => setShowHelp(true)} />
      <main className="p-4">
        <FileTable files={files} selected={selected} onToggle={toggle} onToggleAll={toggleAll} />
      </main>
      {showHelp && (
        <HelpModal
          onClose={() => setShowHelp(false)}
          onSearch={handleSearch}
          searchResult={searchResult}
          isLoading={loading}
          documentation={getDocumentation()}
        />
      )}
    </div>
  );
};

export default App;
