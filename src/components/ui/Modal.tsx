'use client'

import { useEffect } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  onSave?: () => void
  saveLabel?: string
  saveDisabled?: boolean
  children: React.ReactNode
  width?: string
  footer?: React.ReactNode
}

export function Modal({
  title,
  onClose,
  onSave,
  saveLabel = 'Save',
  saveDisabled = false,
  children,
  width = '500px',
  footer,
}: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: 'rgba(20,18,46,.45)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="bg-c-surface border border-c-border rounded-[20px] p-7 max-w-[95vw] max-h-[90vh] overflow-y-auto animate-modal-in"
        style={{ width, boxShadow: '0 24px 64px rgba(30,27,58,.22)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="font-display text-[19px] font-semibold tracking-[-0.02em] text-c-text mb-6">{title}</div>
        )}
        <div>{children}</div>
        {footer !== undefined ? (
          footer
        ) : (
          <div className="flex justify-end gap-2 mt-7">
            <button
              onClick={onClose}
              className="border border-c-border2 bg-c-surface3 text-c-text2 rounded-app-sm px-4 py-[9px] text-[13px] font-semibold cursor-pointer hover:bg-c-surface2 transition-all"
            >
              Cancel
            </button>
            {onSave && (
              <button
                onClick={onSave}
                disabled={saveDisabled}
                className="bg-c-purple text-white rounded-app-sm px-5 py-[9px] text-[13px] font-semibold cursor-pointer hover:bg-c-purple-l transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saveLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function ConfirmModal({
  title,
  message,
  onClose,
  onConfirm,
}: {
  title: string
  message: string
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      width="380px"
      footer={
        <div className="flex justify-end gap-2 mt-7">
          <button
            onClick={onClose}
            className="border border-c-border2 bg-c-surface3 text-c-text2 rounded-app-sm px-4 py-[9px] text-[13px] font-semibold cursor-pointer hover:bg-c-surface2 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-c-red-d text-c-red border border-[#F0997B55] rounded-app-sm px-4 py-[9px] text-[13px] font-semibold cursor-pointer hover:bg-[#FCEEE9] transition-all"
          >
            Delete
          </button>
        </div>
      }
    >
      <p className="text-[14px] text-c-text2 leading-[1.6]">{message}</p>
    </Modal>
  )
}
