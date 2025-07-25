import React from 'react';
import { ShufflrLogoIcon, HelpCircleIcon, FolderIcon } from './icons';

interface HeaderProps {
  onImport: () => void;
  onHelp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onImport, onHelp }) => (
  <header
    className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-4 px-4 py-2 bg-slate-800/60 backdrop-blur-md text-slate-200 border-b border-slate-700/50"
    data-tauri-drag-region
  >
    <div className="flex items-center gap-3">
      <ShufflrLogoIcon className="w-6 h-6 text-cyan-500" />
      <h1 className="font-bold text-lg">Shufflr</h1>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onImport}
        className="px-4 py-1.5 text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-md flex items-center gap-2"
      >
        <FolderIcon className="w-5 h-5" /> Import Folder
      </button>
      <button
        onClick={onHelp}
        className="p-2 rounded-md hover:bg-slate-700/50"
        aria-label="Help"
      >
        <HelpCircleIcon className="w-5 h-5" />
      </button>
    </div>
  </header>
);

export default Header;
