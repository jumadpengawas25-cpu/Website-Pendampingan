export const academicPeriods = [
  { id: "ganjil-2024/2025", label: "Ganjil 2024/2025" },
  { id: "genap-2024/2025", label: "Genap 2024/2025" },
  { id: "ganjil-2025/2026", label: "Ganjil 2025/2026" },
  { id: "genap-2025/2026", label: "Genap 2025/2026" },
  { id: "ganjil-2026/2027", label: "Ganjil 2026/2027" },
  { id: "genap-2026/2027", label: "Genap 2026/2027" },
];

const STORAGE_PREFIX = "portal_docs_";

export function getDocumentsKey(schoolId) {
  return `${STORAGE_PREFIX}${schoolId}`;
}

export function loadDocuments(schoolId) {
  try {
    const key = getDocumentsKey(schoolId);
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return initialDocuments.map((doc) => ({
    ...doc,
    schoolId,
    period: "ganjil-2024/2025",
  }));
}

export function saveDocuments(schoolId, docs) {
  try {
    const key = getDocumentsKey(schoolId);
    localStorage.setItem(key, JSON.stringify(docs));
  } catch {
    // ignore
  }
}

export const portalCategories = [
  {
    id: "ksp",
    label: "KSP / KOSP",
    sub: "Kurikulum Operasional Satuan Pendidikan",
    icon: "description",
    color: "text-primary",
    bg: "bg-primary-fixed",
    aiTip:
      "Pastikan lampiran KOSP dilampirkan dalam format PDF yang dapat dipindai serta stempel basah tertuang jelas.",
  },
  {
    id: "arkas",
    label: "ARKAS",
    sub: "Rencana Kegiatan & Anggaran Sekolah",
    icon: "account_balance_wallet",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    aiTip:
      "Dokumen ARKAS harus dilengkapi dengan perhitungan anggaran dan daftar biaya per barang.",
  },
  {
    id: "akm",
    label: "Hasil TKA/AKM",
    sub: "Asesmen Kompetensi Minimum",
    icon: "assessment",
    color: "text-amber-700",
    bg: "bg-amber-50",
    aiTip:
      "Lampirkan hasil AKM yang sudah ditandatangani dan berisi data sampling kelas.",
  },
  {
    id: "perencanaan",
    label: "Pengelolaan Kinerja",
    sub: "Dokumen Perencanaan Berbasis Data",
    icon: "analytics",
    color: "text-violet-700",
    bg: "bg-violet-50",
    aiTip:
      "Sertakan analisis data Kinerja Sekolah (KKS) beserta rencana peningkatan.",
  },
];

export const initialDocuments = [
  {
    id: "d1",
    title: "Laporan KOSP Semester 1",
    subtitle: "Sesuai Peraturan No. 12/2024",
    category: "ksp",
    date: "12 Okt 2024",
    status: "verified",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    schoolId: null,
    period: "ganjil-2024/2025",
  },
  {
    id: "d2",
    title: "Anggaran ARKAS 2025",
    subtitle: "Pengajuan Awal Tahun",
    category: "arkas",
    date: "15 Okt 2024",
    status: "pending",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    schoolId: null,
    period: "ganjil-2024/2025",
  },
  {
    id: "d3",
    title: "Evaluasi AKM Siswa",
    subtitle: "Data Sampling Kelas XI",
    category: "akm",
    date: "08 Okt 2024",
    status: "revision",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    schoolId: null,
    period: "ganjil-2024/2025",
  },
];

export const statusMeta = {
  draft: { label: "DRAFT", class: "status-draft", icon: "schedule" },
  pending: { label: "PENDING", class: "status-pending", icon: "pending" },
  verified: {
    label: "TERVERIFIKASI",
    class: "status-verified",
    icon: "verified",
  },
  revision: { label: "REVISI", class: "status-revision", icon: "feedback" },
};

export const initialActivity = [
  {
    id: "a1",
    dot: "bg-emerald-500",
    title: "ARKAS V2 Terverifikasi",
    sub: "Oleh Pengawas: Drs. Ahmad M.Pd",
    time: "2 jam yang lalu",
  },
  {
    id: "a2",
    dot: "bg-amber-500",
    title: "KOSP V1 Butuh Revisi",
    sub: "Halaman 12-14 kurang lengkap",
    time: "Kemarin, 14:30",
  },
];

export const portalInfo = {
  school: "SMA Negeri 1 Jakarta",
  title: "Portal Unggah Laporan",
  subtitle: "Manajemen verifikasi dokumen satuan pendidikan",
  semester: "Semester Ganjil 2024/2025",
  supervisor: "Drs. Ahmad M.Pd",
};
