import MaterialSymbol from "./MaterialSymbol.jsx";

export default function WhatsappPreview({
  schoolName,
  docType,
  status,
  reviewerNote,
  qrLink,
  onClose,
  onSend,
}) {
  const statusLabel =
    ({
      verified: "Disetujui",
      revision: "Perlu Revisi",
      pending: "Pending",
      draft: "Draft",
    }[status] ?? status);

  const waMessage = `📋 *Verifikasi Dokumen*\n\nSekolah: *${schoolName}*\nDokumen: *${docType}*\nStatus: *${statusLabel}*\n${reviewerNote ? `Catatan: ${reviewerNote}` : ""}${qrLink ? `\n🔗 Lembar Pengesahan: ${qrLink}` : ""}`;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-green-500 px-4 py-3 flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MaterialSymbol icon="chat" className="text-white text-xl" />
          </div>
          <div>
            <p className="font-bold text-sm">WhatsApp</p>
            <p className="text-xs opacity-80">Pratinjau Pesan</p>
          </div>
          <button
            className="ml-auto text-white/80 hover:text-white"
            onClick={onClose}
          >
            <MaterialSymbol icon="close" />
          </button>
        </div>

        <div className="bg-[#f0f0f0] p-4 mx-4 mt-3 rounded-xl rounded-tl-none relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <MaterialSymbol icon="person" className="text-green-600 text-sm" />
            </div>
            <span className="text-xs font-bold text-on-surface">Kepala Sekolah</span>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm max-w-[85%]">
            <p className="text-sm whitespace-pre-wrap text-on-surface">
              {waMessage}
            </p>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-on-surface-variant">
              {new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 flex flex-col gap-2">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition-colors"
            onClick={() => onSend(waMessage)}
          >
            <MaterialSymbol icon="send" className="text-lg" />
            Kirim Notifikasi WA
          </button>
          <button
            className="w-full py-2 text-on-surface-variant text-sm font-bold hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}