import React, { useCallback, useState } from 'react';
import Header from './components/Header';
import FileTable from './components/FileTable';
import FileActionsToolbar from './components/FileActionsToolbar';
import RenamingPanel from './components/RenamingPanel';
import ImportOptionsModal from './components/modals/ImportOptionsModal';
import HelpModal from './components/modals/HelpModal';
import { open } from '@tauri-apps/api/dialog';
import { scanDirectory } from './services/fileUtils';
import { searchDocumentation, getDocumentation } from './services/geminiService';
import type { FileInfo, ActiveModal } from './types';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === files.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(files.map((f) => f.id)));
    }
  };

  const handleImportDirectory = async (options: { includeSubdirectories: boolean; replace: boolean }) => {
    setActiveModal(null);
    const dir = await open({ directory: true });
    if (typeof dir !== 'string') return;
    const scanned = await scanDirectory(dir, options.includeSubdirectories);
    setFiles(options.replace ? scanned : [...files, ...scanned]);
  };

  const handleHelpSearch = useCallback(async (q: string) => {
    setSearchLoading(true);
    const result = await searchDocumentation(q);
    setSearchResult(result);
    setSearchLoading(false);
  }, []);

  const applyRename = (updated: FileInfo[]) => {
    setFiles(updated);
    setIsRenaming(false);
    setSelected(new Set());
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      <Header onImportClick={() => setActiveModal('import')} onHelpClick={() => setActiveModal('help')} />
      {files.length > 0 && !isRenaming && (
        <FileActionsToolbar disabled={selected.size === 0} onRename={() => setIsRenaming(true)} />
      )}
      <main className="flex-1 overflow-auto">
        <FileTable files={files} selected={selected} onToggle={toggleSelect} onToggleAll={toggleSelectAll} />
      </main>
      {isRenaming && (
        <RenamingPanel
          files={files.filter((f) => selected.has(f.id))}
          onApply={applyRename}
          onCancel={() => setIsRenaming(false)}
        />
      )}

      {activeModal === 'import' && (
        <ImportOptionsModal
          onClose={() => setActiveModal(null)}
          onImport={handleImportDirectory}
          isListPopulated={files.length > 0}
        />
      )}
      {activeModal === 'help' && (
        <HelpModal
          onClose={() => setActiveModal(null)}
          onSearch={handleHelpSearch}
          searchResult={searchResult}
          isLoading={searchLoading}
          documentation={getDocumentation()}
        />
      )}
    </div>
  );
};

export default App;
