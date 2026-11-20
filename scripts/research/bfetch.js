const { chromium } = require('playwright'); const fs = require('fs');
const todo = JSON.parse(fs.readFileSync('browser_todo.json')); fs.mkdirSync('sites_b', { recursive: true });
const KEY = /expung|expunction|seal|record|clear|clean-slate|set-aside|nondisclosure|non-disclosure|pardon|1203|restor/i;
const clean = t => t.replace(/\s+/g, ' ').trim();
(async () => {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const browser = await chromium.launch(proxy ? { proxy: { server: proxy } } : {});
  let idx = 0;
  async function worker() {
    while (idx < todo.length) {
      const a = todo[idx++]; const f = `sites_b/${a.i}.json`; if (fs.existsSync(f)) continue;
      const out = { i: a.i, name: a.name, domain: a.domain, status: 0, pages: [] };
      const ctx = await browser.newContext({ ignoreHTTPSErrors: false, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' });
      const page = await ctx.newPage();
      try {
        const r = await page.goto('https://' + a.domain, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(2500);
        out.status = r ? r.status() : 0;
        const txt = clean(await page.evaluate(() => document.body ? document.body.innerText : ''));
        if (txt.length > 300) out.pages.push({ url: page.url(), text: txt.slice(0, 6000) });
        const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map(x => [x.href, x.innerText || '']));
        const host = new URL(page.url()).host; const seen = new Set([page.url().replace(/\/$/, '')]); const picked = [];
        const scored = links.filter(([u]) => { try { return new URL(u).host === host && !/\.(pdf|jpg|png)$/i.test(u) && !u.includes('#'); } catch { return false; } })
          .map(([u, t]) => [(/expung|expunction|seal/i.test(u + ' ' + t) ? 6 : KEY.test(u + ' ' + t) ? 3 : /about|attorney|our-firm|fees/i.test(u + ' ' + t) ? 1 : 0), u]).filter(x => x[0] > 0).sort((x, y) => y[0] - x[0]);
        for (const [, u] of scored) { const k = u.replace(/\/$/, ''); if (seen.has(k)) continue; seen.add(k); picked.push(u); if (picked.length === 2) break; }
        for (const u of picked) {
          try { await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 25000 }); await page.waitForTimeout(1500);
            const t = clean(await page.evaluate(() => document.body ? document.body.innerText : '')); if (t.length > 300) out.pages.push({ url: page.url(), text: t.slice(0, 5000) }); } catch (e) {}
        }
      } catch (e) { out.error = String(e).slice(0, 120); }
      await ctx.close(); fs.writeFileSync(f, JSON.stringify(out));
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker)); await browser.close();
  const files = fs.readdirSync('sites_b'); let ok = 0; for (const f of files) { const d = JSON.parse(fs.readFileSync('sites_b/' + f)); if (d.pages.reduce((n, p) => n + p.text.length, 0) >= 1200) ok++; }
  console.log('browser fetched', files.length, 'usable', ok);
})();
