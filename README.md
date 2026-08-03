# Nehir Macar — Kişisel Web Sitesi

Nehir Macar'ı (piyano, tenis, proje üretmek, İngilizce/Fransızca) tanıtan tek sayfalık
kişisel web sitesi. Sade HTML/CSS/JS ile yazıldı, build adımı gerektirmez.

## Yerelde çalıştırma

Herhangi bir statik sunucu yeterli. Örneğin:

```bash
python3 -m http.server 3000
```

sonra tarayıcıda `http://localhost:3000` adresini aç. (Doğrudan `index.html`
dosyasını çift tıklayıp açmak da çoğunlukla çalışır, ama fetch/module
gerektiren ileri adımlar için yerel sunucu önerilir.)

## Klasör yapısı

```
index.html        Tüm sayfa içeriği ve bölümler
css/style.css      Tüm stiller (renkler, tipografi, kartlar, responsive)
js/main.js         Karşılama mesajı, sakura animasyonu, etkileşimler
assets/            SVG illüstrasyon ve favicon (harici görsel yok)
```

## Düzenlenmesi kolay yerler

- **Bağlantılar bölümü** (`index.html` içinde `id="baglantilar"`): GitHub,
  LinkedIn, Instagram linklerini kendi profillerinle değiştir.
- **İletişim e-postası**: `index.html` içinde `id="iletisim"` bölümündeki
  `mailto:` linkini değiştir.
- **Başarılar kartları**: `id="basarilar"` bölümündeki kart metinlerini
  kendi başarılarınla güncelle.

## Deploy (Vercel)

Bu proje saf statik bir site olduğundan Vercel'de ekstra ayara gerek yok:

1. Bu klasörü kendi GitHub reposuna push et.
2. [vercel.com](https://vercel.com) üzerinden "New Project" ile repoyu içe aktar.
3. Framework olarak "Other" / "Static" seçili kalabilir, build komutu gerekmez.
4. Deploy et ve verilen linki paylaş.

Proje `.env` dosyası veya API anahtarı içermez.
