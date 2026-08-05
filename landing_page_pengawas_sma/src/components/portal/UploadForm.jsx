import { useState, useRef, useCallback, useEffect } from "react";
import { portalCategories } from "../../portalData.js";

const ALLOWED = ["application/pdf", "application/msword"];
const MAX_MB = 10;

export default function UploadForm({
  category,
  onCategoryChange,
  onAddDocument,
  editingDoc = null,
  onUpdateDocument,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const isEditing = !!editingDoc;

  useEffect(() => {
    if (editingDoc) {
      setTitle(editingDoc.title || "");
      setFileName(editingDoc.fileName || "");
      setSelectedFile(null);
      setFileError("");
    } else {
      setTitle("");
      setFileName("");
      setSelectedFile(null);
      setFileError("");
    }
  }, [editingDoc]);

  const validateFile = (file) => {
    if (!file) return "File belum dipilih.";
    if (!ALLOWED.includes(file.type) && !file.name.match(/\.(pdf|docx)$/i)) {
      return "Format tidak didukung. Gunakan PDF atau DOCX.";
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      return `Ukuran melebihi batas maksimal ${MAX_MB} MB.`;
    }
    return "";
  };

  const handleFile = (file) => {
    const err = validateFile(file);
    setFileError(err);
    if (err) {
      setFileName("");
      setSelectedFile(null);
    } else {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [setFileError, setFileName, setSelectedFile],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const cat = portalCategories.find((c) => c.id === category);
    if (!cat) return;

    if (isEditing) {
      const fileUrl = selectedFile
        ? URL.createObjectURL(selectedFile)
        : editingDoc.fileUrl;
      onUpdateDocument({
        ...editingDoc,
        title,
        subtitle: cat.sub,
        category,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: "draft",
        fileUrl,
        fileName: fileName || editingDoc.fileName,
      });
      return;
    }

    if (!title.trim() || !fileName) {
      setFileError(!fileName ? "File belum dipilih." : "");
      return;
    }
    onAddDocument({
      id: `d${Date.now()}`,
      title,
      subtitle: cat.sub,
      category,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "draft",
      fileUrl: URL.createObjectURL(selectedFile),
      fileName,
    });
    setTitle("");
    setFileName("");
    setSelectedFile(null);
    setFileError("");
  };

  return (
    <section className="col-span-8 bg-surface-container-lowest rounded-xl p-stack-lg shadow-sm border border-outline-variant/50">
      <div className="flex items-center gap-3 mb-stack-md">
        <span className="material-symbols-outlined text-primary p-2 bg-primary-fixed rounded-lg">
          upload_file
        </span>
        <h3 className="font-title-md text-title-md text-on-surface">
          {isEditing ? "Edit Dokumen" : "Unggah Dokumen Baru"}
        </h3>
      </div>

      <form className="grid grid-cols-2 gap-stack-lg" onSubmit={handleSubmit}>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-label-md font-bold text-on-surface mb-2">
            Kategori Dokumen
          </label>
          <select
            value={category}
            onChange={onCategoryChange}
            className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            {portalCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} — {c.sub}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-label-md font-bold text-on-surface mb-2">
            Nama Laporan / Judul
          </label>
          <input
            className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Contoh: Laporan KOSP Tahap I"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-span-2">
          <div
            className="border-2 border-dashed border-outline-variant rounded-xl p-stack-lg flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container hover:border-primary transition-all cursor-pointer group"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined text-5xl text-outline mb-4 group-hover:text-primary transition-colors">
              cloud_upload
            </span>
            <p className="text-body-md font-bold text-on-surface">
              Tarik dan lepas file di sini
            </p>
            <p className="text-label-sm text-on-surface-variant mt-1">
              Mendukung Format PDF, DOCX (Maks 10MB)
            </p>
            {fileName && (
              <p className="text-label-sm text-primary font-bold mt-2">
                {fileName}
              </p>
            )}
            {fileError && (
              <p className="text-label-sm text-error font-bold mt-2">
                {fileError}
              </p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-lg font-bold"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Pilih File
            </button>
          </div>
        </div>

        <div className="col-span-2 flex justify-end gap-stack-md">
          {isEditing && (
            <button
              type="button"
              className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest"
              onClick={onCancelEdit}
            >
              Batal Edit
            </button>
          )}
          <button
            type="reset"
            className="px-6 py-3 border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-highest"
            onClick={() => {
              setTitle("");
              setFileName("");
              setSelectedFile(null);
              setFileError("");
            }}
          >
            {isEditing ? "Reset" : "Batalkan"}
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-secondary text-on-secondary rounded-lg font-bold shadow-md hover:opacity-90 transition-all"
            disabled={!isEditing && (!selectedFile || !title.trim())}
          >
            {isEditing ? "Perbarui Dokumen" : "Kirim Dokumen"}
          </button>
        </div>
      </form>
    </section>
  );
}
