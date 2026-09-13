CARA TAMBAH FOTO BOCIL
======================

1. Taruh foto-foto di folder ini (assets/photos/)
2. Rename jadi: photo1.jpg, photo2.jpg, photo3.jpg, dst.
3. Format yang didukung: JPG, PNG, WebP

Kalau mau ganti caption atau nambah foto lebih banyak,
buka file: js/data.js → bagian `export const photos`

Setiap item punya:
  - src: nama file (wajib sama dengan file di folder ini)
  - caption: teks yang muncul di gallery (page 4)
  - closingCaption: teks pendek maks 5 kata di box reveal (page 7)
  - rotation: sudut rotasi polaroid (angka kecil, -5 sampai 5)

Contoh:
  {
    src: "assets/photos/photo7.jpg",
    caption: "literally glowing.",
    closingCaption: "You make it look easy.",
    rotation: -2,
  },

Kalau foto nggak ketemu, website otomatis nampilin
emoji placeholder yang cute kok. Jadi nggak akan error.
