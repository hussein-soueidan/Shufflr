import React from 'react';
import { FolderIcon, HelpCircleIcon, ShufflrLogoIcon } from './icons';

interface HeaderProps {
  onImportClick: () => void;
  onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onImportClick, onHelpClick }) => (
  <header
    className="flex items-center justify-between px-4 h-12 backdrop-blur-sm bg-slate-900/60 text-slate-100 select-none"
    data-tauri-drag-region
  >
    <div className="flex items-center gap-2">
      <ShufflrLogoIcon className="w-6 h-6 text-cyan-500" />
      <span className="font-semibold text-lg">Shufflr</span>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onImportClick}
        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium px-3 py-1.5 rounded-md"
      >
        <FolderIcon className="w-4 h-4" /> Import Folder
      </button>
      <button
        onClick={onHelpClick}
        className="p-2 rounded-md hover:bg-white/10"
        aria-label="Help"
      >
        <HelpCircleIcon className="w-5 h-5" />
      </button>
    </div>
  </header>
);

export default Header;
