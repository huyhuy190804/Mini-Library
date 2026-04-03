import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

/**
 * Reusable confirm-delete modal.
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - onConfirm: () => void
 *  - title?: string
 *  - description?: string
 *  - itemName?: string   — highlighted inside the description
 *  - isLoading?: boolean
 */
const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Record',
  description = 'This action cannot be undone.',
  itemName,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative bg-white rounded-[24px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.2)] w-full max-w-[400px] mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Red top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ef4444] to-[#f97316]" />

        <div className="p-8">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
            <AlertTriangle size={26} className="text-[#ef4444]" strokeWidth={2} />
          </div>

          {/* Text */}
          <h2 className="text-[20px] font-black text-slate-900 mb-2 tracking-tight">{title}</h2>
          <p className="text-slate-500 text-[13.5px] leading-relaxed mb-1">{description}</p>
          {itemName && (
            <p className="text-slate-500 text-[13.5px] leading-relaxed">
              You are about to delete{' '}
              <span className="font-bold text-slate-800">"{itemName}"</span>.
            </p>
          )}

          {/* Warning pill */}
          <div className="mt-5 flex items-center gap-2 bg-red-50 text-[#ef4444] text-[11px] font-extrabold tracking-widest uppercase px-4 py-2.5 rounded-xl w-fit">
            <Trash2 size={12} strokeWidth={2.5} />
            This action is permanent
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-8 pb-7">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-11 rounded-xl border-2 border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 h-11 rounded-xl bg-[#ef4444] hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_14px_-4px_rgba(239,68,68,0.5)]"
          >
            {isLoading ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Trash2 size={14} strokeWidth={2.5} />
            )}
            {isLoading ? 'Deleting…' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
