═══════════════════════════════════════════════════════════════
  SERVIS KÖSTLER – Návod k nasazení na VEDOS Webhosting
  Datum přípravy: 2026-06-12
═══════════════════════════════════════════════════════════════

OBSAH BALÍČKU
─────────────
  index.html              Hlavní stránka webu
  favicon.svg             Ikona webu (zobrazuje se v záložce prohlížeče)
  robots.txt              Instrukce pro vyhledávací roboty
  sitemap.xml             Mapa stránek pro Google/SEO
  .htaccess               Konfigurace Apache (cache, komprese, MIME typy)
  css/
    style.css             Kompletní styly webu
  js/
    main.js               Logika webu (jazyk, animace, přepínač měst)
    translations.js       Překlady CZ / DE
  images/
    logo.png              Logo firmy
    hero.jpg              Fotografie v hero sekci
    loading-bg.webp       Obrázek načítací obrazovky
    service-klimatizace.jpg
    service-tepelne-cerpadlo.jpg
    service-chlazeni.jpg
    service-podlahove-vytapeni.jpg
    flags/
      cz.svg              Vlajka – česká verze
      de.svg              Vlajka – německá verze


POSTUP NAHRÁNÍ NA VEDOS
───────────────────────

1. Přihlásit se na https://panel.vedos.cz
   (nebo na adresu, kterou vám VEDOS poskytl)

2. V administraci otevřít "WebFTP" nebo "Správce souborů"

3. Přejít do složky /www  (nebo public_html – záleží na nastavení)

4. Smazat VŠECHNY stávající soubory a složky v /www
   (nebo je přesunout do zálohy)

5. Nahrát OBSAH složky VEDOS_DEPLOY do /www
   Důležité: nahrajte OBSAH složky, NE složku samotnou!
   Po nahrání musí být struktura:
     /www/index.html
     /www/.htaccess
     /www/favicon.svg
     /www/robots.txt
     /www/sitemap.xml
     /www/css/style.css
     /www/js/main.js
     /www/js/translations.js
     /www/images/...

6. Ověřit funkčnost:
   - Otevřít web v prohlížeči
   - Zkontrolovat, že se načítá v češtině (výchozí jazyk = CZ)
   - Kliknout na vlajku DE → web se přepne do němčiny
   - V sekci Servicegebiet zkontrolovat česká / německá města
   - Zkontrolovat, že footer a kontakt zobrazují IČO: 87833859


AKTIVACE HTTPS NA VEDOS (doporučeno)
─────────────────────────────────────
1. V VEDOS panelu aktivujte bezplatný SSL certifikát (Let's Encrypt)
2. Po aktivaci otevřete soubor .htaccess a odkomentujte blok
   "HTTPS vynucení" (odstraňte # před řádky s RewriteEngine)


POZNÁMKY
────────
- Web je statický (HTML/CSS/JS) – nevyžaduje PHP ani databázi
- Fonty se načítají z Google Fonts – web potřebuje připojení k internetu
- Mapa v sekci Kontakt se načítá z Google Maps – také vyžaduje internet
- Soubor .htaccess aktivuje gzip kompresi a cache hlavičky automaticky

Velikosti obrázků (pro informaci):
  logo.png               1.1 MB  ← větší soubor, načítá se jednou a cachuje
  service-chlazeni.jpg   1.3 MB  ← větší soubor
  loading-bg.webp        540 KB
  Ostatní obrázky        < 200 KB každý


PODPORA
───────
Web připravil: Claude Code
Kontakt na firmu: servis.kostler@seznam.cz | +420 776 792 419

═══════════════════════════════════════════════════════════════
