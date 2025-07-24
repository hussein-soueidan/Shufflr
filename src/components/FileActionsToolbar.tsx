import React from 'react';

interface FileActionsToolbarProps {
  disabled: boolean;
  onRename: () => void;
}

const FileActionsToolbar: React.FC<FileActionsToolbarProps> = ({ disabled, onRename }) => (
  <div className="flex items-center justify-between p-3 bg-slate-800 text-slate-100 border-b border-slate-700">
    <div className="space-x-3 text-sm">
      <button className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600" disabled>
        Search & Collect
      </button>
      <button className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600" disabled>
        Invert Selection
      </button>
    </div>
    <div className="space-x-3 text-sm">
      <button className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500" disabled>
        Delete Permanently
      </button>
      <button
        onClick={onRename}
        disabled={disabled}
        className="px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600"
      >
        Rename Selected ({disabled ? 0 : ''})
      </button>
    </div>
  </div>
);

export default FileActionsToolbar;
