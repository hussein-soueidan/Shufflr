import React from 'react';
import { FileInfo } from '../types';
import { FileIcon, FolderIcon } from './icons';

interface FileTableProps {
  files: FileInfo[];
  selected: Set<string>;
  onToggle: (path: string) => void;
  onToggleAll: () => void;
}

const FileTable: React.FC<FileTableProps> = ({ files, selected, onToggle, onToggleAll }) => {
  const allSelected = files.length > 0 && selected.size === files.length;

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
        <FolderIcon className="w-12 h-12 mb-4" />
        <p>No files loaded. Use "Import Folder" to begin.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full text-sm border-separate border-spacing-y-1">
      <thead className="text-xs uppercase text-slate-500 dark:text-slate-400">
        <tr>
          <th className="px-2"><input type="checkbox" checked={allSelected} onChange={onToggleAll} /></th>
          <th className="text-left px-2">File Name</th>
          <th className="text-left px-2">New Filename</th>
          <th className="text-right px-2">Size</th>
          <th className="text-right px-2">Date Modified</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => (
          <tr key={file.path} className={selected.has(file.path) ? 'bg-cyan-500/10' : ''}>
            <td className="px-2"><input type="checkbox" checked={selected.has(file.path)} onChange={() => onToggle(file.path)} /></td>
            <td className="px-2 flex items-center gap-2">
              {file.isDir ? <FolderIcon className="w-5 h-5" /> : <FileIcon className="w-5 h-5" />}
              {file.name}
            </td>
            <td className="px-2">{file.newName}</td>
            <td className="px-2 text-right">{file.size ? (file.size / 1024).toFixed(1) + ' KB' : '-'}</td>
            <td className="px-2 text-right">{file.modified || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
