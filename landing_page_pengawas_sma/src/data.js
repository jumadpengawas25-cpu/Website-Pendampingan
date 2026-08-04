import logoWeb from "./public/Logo web baru.png";

export const supervisor = {
  name: "Drs. Ahmad M.Pd",
  title: "Pengawas Madya SMA",
  photo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQ2p8URMfWzzmNQR61WWcQJKT1YMPjrPBQNpPNene7P3mbXKyMTwtKS1XKBTltShrCatp12Kq6eFvNll4peZl_gSbJ78UODl8OKJ5IKNlJHLfFfTCHYyvCXsuSgyPLPnxKaZxHvl-uP4ZZ2UVauoQ4cW6IR8Z4-YnY5nvnFdlWyMYew4xGX_ei8_sn0sNQdchhhA7f3InGVU4j9PHExb-BO9-wkUqrvUA-zW87PKIPAZ5mSrnqKxN",
  quote:
    "Pendidikan adalah fondasi kemajuan bangsa, dan pengawasan adalah instrumen untuk menjaga kualitas fondasi tersebut tetap kokoh di era digital.",
  education: [
    { icon: "school", label: "S2 Manajemen Pendidikan", sub: "Universitas Indonesia" },
    { icon: "verified", label: "Sertifikasi Asesor Nasional", sub: "BAN-S/M" },
  ],
  stats: [
    { value: "9", label: "Sekolah Binaan" },
    { value: "450+", label: "Guru Damping" },
    { value: "1200", label: "Jam Kerja" },
    { value: "800+", label: "Dokumen" },
  ],
};

export const programs = [
  {
    icon: "analytics",
    title: "Audit Mutu Internal",
    desc: "Evaluasi berkala terhadap 8 Standar Nasional Pendidikan (SNP) secara komprehensif.",
  },
  {
    icon: "psychology",
    title: "Clinical Supervision",
    desc: "Pendampingan personal bagi guru untuk meningkatkan efektivitas metode pembelajaran di kelas.",
  },
  {
    icon: "groups",
    title: "Pemberdayaan MGMP",
    desc: "Mengaktifkan Musyawarah Guru Mata Pelajaran sebagai wadah berbagi praktik baik.",
  },
  {
    icon: "devices",
    title: "Digitalisasi Laporan",
    desc: "Implementasi sistem pelaporan berbasis cloud untuk transparansi dan akuntabilitas data.",
  },
];

export const schools = [
  {
    id: 1,
    slug: "sman-1-pagak",
    name: "SMAN 1 Pagak",
    address:
      "Jl. Raya Kahuripan 4 RT 23 RW 6 Sumbermanjing Kulon Kec. Pagak",
    accreditation: { text: "Akreditasi A", class: "bg-green-100 text-green-700" },
    accent: "bg-primary",
    logo:
      "/src/public/sekolah/Logo SMAN 1 Pagak.jpg",
    logoAlt: "Official logo of SMAN 1 Pagak, featuring a classic academic crest with educational symbols like an open book and a torch, rendered in traditional navy blue and gold colors on a clean white background.",
  },
  {
    id: 2,
    slug: "sma-muhammadiyah-1-kepanjen",
    name: "SMA Muhammadiyah 1 Kepanjen",
    address:
      "Jalan KH. Ahmad Dahlan Nomor 34, Kepanjen, Kabupaten Malang",
    accreditation: { text: "Akreditasi B", class: "bg-amber-100 text-amber-700" },
    accent: "bg-secondary-container",
    logo:
      "/src/public/sekolah/Logo SMA Muhammadiyah 1 Kepanjen.jpg",
    logoAlt: "Official school logo for SMA Muhammadiyah 1 Kepanjen, minimalist and modern design with a blue geometric abstract shield and a rising sun symbol, clean white background, professional vector aesthetic.",
  },
  {
    id: 3,
    slug: "sma-ar-rohmah-putra",
    name: "SMA Ar Rohmah Putra",
    address:
      "Jl. Raya Apel No. 61, Desa Sumbersekar, Kecamatan Dau, Kabupaten Malang",
    accreditation: { text: "Akreditasi A", class: "bg-green-100 text-green-700" },
    accent: "bg-primary-fixed",
    logo:
      "/src/public/sekolah/Logo SMA Ar Rohmah Putra.jpg",
    logoAlt: "Traditional school crest for SMA Ar Rohmah Putra, featuring an ornate shield with historical symbols and a ribbon banner, classic red and gold color palette, official and prestigious appearance.",
  },
  {
    id: 4,
    slug: "sma-mambaunnur-bululawang",
    name: "SMA Mamba'unnur Bululawang",
    address:
      "Jl. Wahid Hasyim III, Gading Kecamatan Bululawang Kabupaten Malang",
    accreditation: { text: "Akreditasi B", class: "bg-amber-100 text-amber-700" },
    accent: "bg-error",
    logo:
      "/src/public/sekolah/Logo SMA Mamba`unur Bululawang.jpg",
    logoAlt: "Modern high school emblem for SMA Mamba'unnur Bululawang, incorporating a stylized book and a soaring eagle, vibrant blue and white color scheme, corporate educational style.",
  },
  {
    id: 5,
    slug: "sma-islam-al-hikmah-bululawang",
    name: "SMA Islam Al Hikmah Bululawang",
    address:
      "Jalan Raya Tanjungsari No. 150, Desa Kuwolu, Kecamatan Bululawang, Kabupaten Malang",
    accreditation: { text: "Akreditasi A", class: "bg-green-100 text-green-700" },
    accent: "bg-primary",
    logo:
      "/src/public/sekolah/Logo SMA Islam Al Hikmah Bululawang.jpg",
    logoAlt: "Official logo of SMA Islam Al Hikmah Bululawang, featuring a classic academic crest with educational symbols like an open book and a torch, rendered in traditional navy blue and gold colors on a clean white background.",
  },
  {
    id: 6,
    slug: "sma-al-munawwariyyah-bululawang",
    name: "SMA Al Munawwariyyah Bululawang",
    address:
      "Jl. Raya Sudimoro No. 09, Sudimoro, Kecamatan Bululawang, Kabupaten Malang",
    accreditation: { text: "Akreditasi B", class: "bg-amber-100 text-amber-700" },
    accent: "bg-secondary-container",
    logo:
      "/src/public/sekolah/Logo SMA Al Munawariyah Bululawang.jpg",
    logoAlt: "Official school logo for SMA Al Munawwariyyah Bululawang, minimalist and modern design with a blue geometric abstract shield and a rising sun symbol, clean white background, professional vector aesthetic.",
  },
  {
    id: 7,
    slug: "sma-mahaputra-ampelgading",
    name: "SMA Mahaputra Ampelgading",
    address: "Jl. Bali No 37 - 38 Tirtomarto Ampelgading",
    accreditation: { text: "Akreditasi B", class: "bg-amber-100 text-amber-700" },
    accent: "bg-primary-fixed",
    logo:
      "/src/public/sekolah/Logo SMA Mahaputra Ampelgading.jpg",
    logoAlt: "Traditional school crest for SMA Mahaputra Ampelgading, featuring an ornate shield with historical symbols and a ribbon banner, classic red and gold color palette, official and prestigious appearance.",
  },
  {
    id: 8,
    slug: "sma-ampelgading",
    name: "SMA Ampelgading",
    address:
      "Jalan Raya Tirtomarto No. 6, RT 3/RW 1, Desa Tirtomarto, Kecamatan Ampelgading",
    accreditation: { text: "Akreditasi C", class: "bg-red-100 text-red-700" },
    accent: "bg-error",
    logo:
      "/src/public/sekolah/Logo SMA Ampelgading.jpg",
    logoAlt: "Modern high school emblem for SMA Ampelgading, incorporating a stylized book and a soaring eagle, vibrant blue and white color scheme, corporate educational style.",
  },
  {
    id: 9,
    slug: "sma-ybpk-pujiharjo-tirtoyudo",
    name: "SMA YBPK Pujiharjo Tirtoyudo",
    address: "JL. Gereja 469 Kecamatan Tirtoyudo Kabupaten Malang",
    accreditation: { text: "Akreditasi B", class: "bg-amber-100 text-amber-700" },
    accent: "bg-primary",
    logo:
      "/src/public/sekolah/Logo SMA YBPK Pujiharjo Tirtoyudo.jpg",
    logoAlt: "Official logo of SMA YBPK Pujiharjo Tirtoyudo, featuring a classic academic crest with educational symbols like an open book and a torch, rendered in traditional navy blue and gold colors on a clean white background.",
  },
];

export function getSchoolBySlug(slug) {
  return schools.find((school) => school.slug === slug);
}

export function getSchoolById(id) {
  return schools.find((school) => school.id === id);
}

export const news = [
  {
    id: 1,
    tag: { text: "Berita Resmi", class: "bg-primary text-on-primary" },
    date: "12 Okt 2024",
    author: "Admin",
    title: "Pedoman Pelaksanaan Supervisi Digital Semester Ganjil 2024",
    excerpt:
      "Dinas Pendidikan merilis panduan teknis terbaru untuk pengawasan berbasis cloud guna mempermudah sinkronisasi data antar sekolah...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAW7rixpoZRVcRKEYdWMKKSVJhWF8RD6gQv_RLajrBs9XpEX7ylEgr45joJJmgr5el_whZ396hL_kJZzGWwbKH_RoCQHAGLaTCbzgFoPKRz2RlIkT4Yxoi3rFKoVGvSbqel4DVZXkRKQ35ETXrHiEaxmbe26wUs7bvbav2bOC6nebmt-we8T9Q8tJwgtgGNX8lBr1UuYCvKozcQ8vV_Z4jFF3vv4j6-oEi1XDJslSkWG28xXJvkJtYj",
    imageAlt:
      "A wide-angle shot of a high-level educational seminar in a modern auditorium. Professional educators and supervisors are seated in rows, listening to a presentation about digital curriculum. The room is brightly lit with cool, professional tones, and the atmosphere is formal and studious.",
  },
  {
    id: 2,
    tag: { text: "Artikel", class: "bg-secondary-container text-on-secondary-container" },
    date: "08 Okt 2024",
    author: "Drs. Ahmad M.Pd",
    title: "Strategi Pembelajaran Berdiferensiasi di Tingkat Menengah Atas",
    excerpt:
      "Menghadapi keberagaman siswa memerlukan pendekatan yang personal. Artikel ini mengupas bagaimana guru dapat menyesuaikan konten...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDA8VlQqv2JeBonRjnBCSzia5xbvxGDW2F2USlMA8pkdLu5GEnYdiunbq1p-47sZ7Nn6WHpdGKlxnayPeRLGHJ-O9BZjN07YRFthBsqXKyDZynvBtQnlEErGNlSzs9jEqEwrXAPwJSOspwa6rOw7NNxvLvkHHSMz5WUxUWq2qI86-qI1NktSvh7HOwQptDcuzksIFUwwOyAVkxae4OnC6s9qNdwkAi7v7MyQJpZ4_J0R3KZfFVCTPVy",
    imageAlt:
      "Close-up of a teacher using a tablet and interactive whiteboard in a brightly colored, modern classroom. The image conveys a sense of technological advancement in education. Lighting is soft and natural, emphasizing a positive and innovative learning environment.",
  },
  {
    id: 3,
    tag: { text: "Pengumuman", class: "bg-primary text-on-primary" },
    date: "01 Okt 2024",
    author: "Kepegawaian",
    title: "Pendaftaran Workshop Sertifikasi Asesor Sekolah Tahun 2025",
    excerpt:
      "Kesempatan bagi tenaga pendidik senior untuk mengikuti pelatihan sertifikasi sebagai bagian dari program penguatan mutu...",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSEFpj7pd6uRw64iYVFU6OFkgHKwOrUb5CAXydWePsrBbncSEcq8_sPLMu0TDPJ_upg-Sxu-O951Vd6BB3VTwUDPFrVUIuwmmKHrxF1lLdgiObWv8hiJxn7vb7iAz0_8pYZfrZWUm9qUqfSWe2X-hLrykJKYD1-4wxIgLj6zF59Q0OgDCqCh8tD0ozhmD7_vlwqIT0odgsuPNa1xoJhKI65vzHl5r0LFpDbXok-F8IkPUTW-EP326m",
    imageAlt:
      "A professional certificate lying on a clean wooden desk next to a modern laptop and a pair of spectacles. The lighting is bright and airy, suggesting a focus on professional development and academic achievement. The style is clean, corporate, and aspirational.",
  },
];

export const gallery = [
  {
    id: 0,
    span: "md:col-span-2 md:row-span-2",
    src:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH483NI-IcSWlaUCeqc2DeLhwyOdmfAPzO7a4UiovWmVqkoAltpo7nQN9D6-6K9Mq4W5g6StgTQmaLsKoka8Zdvc8ho795ZSdrFZay1wXpXEka8cEz6cPS8dtPrcCzwrKonA4gjZPYIQoq4oN62lEOdMI6M6BcjmoUz-Kpi8RvuFnn-iTW1aEerBvWvOlUCLwEPwLv1KLnn3O8MzEdB4S4F1mARy6zk0DEgxdLbCxSa1dsUOku7AVo",
    alt:
      "A group of teachers and a school supervisor in formal batik attire posing for a group photo in front of a modern school building with a large 'SMAN Unggul' sign. The scene is outdoors on a sunny day, with vibrant colors and a professional yet joyful atmosphere.",
    zoom: "text-4xl",
  },
  {
    id: 1,
    span: "",
    src:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChNxOy_rykYm7tY_TePuWt_Gi6bT9EEXq2mD6PC4gHL40Jn6HmnUbZGRqeabSjHcr1yAapOUzoNrcBqgyTg00OeRRjm3T7n0SMUB6tgaPkDPYDKwU369wCqo4_4grTjrJCEgHOAFhTtJCDuesyZGpo1tX_Oc0UcAgzxgu-ftAbQ3XZscwfzXK492YIgZ96R1DzAz9-YrsHPXv8nIPI0zm_Vyp67SdLpdYBUUA2TpT7Fe9bomz3VBq8",
    alt:
      "A school supervisor closely examining a digital dashboard on a large screen with school staff in a tech-ready conference room. The lighting is focused and professional, highlighting a collaborative effort in data analysis.",
    zoom: "text-2xl",
  },
  {
    id: 2,
    span: "",
    src:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlkk1gkuWWAnH3jDhj0GLkU-DlW85jQZr8P8M3uUQy5vh122hYUD4p2KDiNnlLq6NYCMxPtRKTmneuhn7XWDC28GVJT2gUmER0vR23o-gGkpi1n8IFAZbZQL28pU84fsyYV4u4VY9Wi6oL6rAobBgD02juSBZvtnBrnVUhB71-LSf-CH058KW7PGKgkaAMIzPW5NVQ7n1h9bbwB6FBNU2-JzRddbG5OoeyZnC8_wu_r_18yROPPQTs",
    alt:
      "Candid shot of a teacher and a supervisor having a one-on-one discussion in a library setting, with bookshelves in the blurred background. The interaction is professional and supportive, with warm natural light.",
    zoom: "text-2xl",
  },
  {
    id: 3,
    span: "md:col-span-2",
    src:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA35U82ljS_9YvlMrkE5uoACk052Sewi0_1ZSBjDyKxEfalGwBBZNCnKZjsGFoUPsb1NN8fhcNmbWuUM67hGNzosbGVIQPK0ul6qzCcqxX52RfF3-GNJgJqo9c82jZBRGhylPScNz5M_fpzjaaUK7m-zLH-rTHOR9sukVUusGZ1yaOdDh4d1AzQcq5YlUE22t1KKax_9KyYjn4C3907ihLDdsLJAJ-EmXhh0Xd73OWHOM8Wq3Cgz18k",
    alt:
      "A wide view of a regional educational workshop with many participants engaged in group discussions at round tables. The venue is a grand hotel ballroom with elegant lighting and professional branding everywhere.",
    zoom: "text-2xl",
  },
];

export const siteInfo = {
  logo: logoWeb,
  logoAlt: "Logo RuangJumad",
  name: "RuangJumad",
  brandSubtitle: "Portal Pengawas SMA Kab. Malang",
  tagline:
    "Meningkatkan kualitas pendidikan melalui pendampingan berkelanjutan dan pengawasan berbasis data yang transparan.",
  contact: {
    address: "Dinas Pendidikan Provinsi - Gedung B Lt. 3, Jln. Sudirman Kav 12",
    phone: "0853-3130-4333",
    email: "jumadpengawas25@gmail.com",
  },
  year: 2024,
};
