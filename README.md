# grafibee

Static HTML/CSS/JavaScript website for Grafibee.

No build step required — open `index.html` directly in a browser, or use a
minimal local server for proper client-side routing.

## Running locally

### Option A – open directly

Just double-click `index.html` or open it in your browser with
`File → Open File`.

> **Note:** Client-side navigation to `/adatkezelesi-tajekoztato` and
> `/impresszum` requires serving the files over HTTP.  All other functionality
> (home page, carousel, cookie banner, hash navigation) works with `file://`.

### Option B – local HTTP server (recommended)

Any static-file server will do.  A few one-liners:

```bash
# Node.js (npx, no install needed)
npx serve .

# Python 3
python3 -m http.server 3000

# PHP
php -S localhost:3000
```

Then open <http://localhost:3000> in your browser.

## Project structure

```
├── index.html        Main HTML file (all pages / sections)
├── style.css         Human-readable CSS (no Tailwind, no minification)
├── script.js         Vanilla JS (routing, carousel, cookie consent, …)
├── public/
│   ├── favicon.svg
│   └── grafibee_logo.svg
└── munkak/
    ├── autoluce.png
    ├── zorapluskft.png
    └── holzimaxkft.png
```

## Pages

| URL                              | Description              |
|----------------------------------|--------------------------|
| `/`                              | Home (Hero, Works, Services, Contact) |
| `/adatkezelesi-tajekoztato`      | Privacy policy           |
| `/impresszum`                    | Impresszum               |

Hash links (`/#work`, `/#services`, `/#contact`) scroll to the matching
section on the home page.

