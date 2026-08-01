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
    version: "V.2",
    versionClass: "bg-primary-fixed text-on-primary-fixed-variant",
    date: "12 Okt 2024",
    status: "verified",
  },
  {
    id: "d2",
    title: "Anggaran ARKAS 2025",
    subtitle: "Pengajuan Awal Tahun",
    category: "arkas",
    version: "V.1",
    versionClass: "bg-surface-container-high text-on-surface-variant",
    date: "15 Okt 2024",
    status: "pending",
  },
  {
    id: "d3",
    title: "Evaluasi AKM Siswa",
    subtitle: "Data Sampling Kelas XI",
    category: "akm",
    version: "V.1",
    versionClass: "bg-surface-container-high text-on-surface-variant",
    date: "08 Okt 2024",
    status: "revision",
  },
];

export const statusMeta = {
  draft: { label: "DRAFT", class: "status-draft", icon: "schedule" },
  pending: { label: "PENDING", class: "status-pending", icon: "pending" },
  verified: { label: "TERVERIFIKASI", class: "status-verified", icon: "verified" },
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
