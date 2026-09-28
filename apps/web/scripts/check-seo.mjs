import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Run after next build. Checks the HTML crawlers receive.
process.chdir(resolve(import.meta.dirname, ".."));
const base = 'https://www.amshq.in';
const built = resolve('.next/server/app');
const posts = readdirSync(resolve('../../blogs'), { withFileTypes: true })
  .filter(entry => entry.isDirectory()).map(entry => `/blog/${entry.name}`);
const routes = ['/', '/derive', '/ascent', '/access', '/gallery', '/team', '/faq', '/blog', ...posts];
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const titles = new Set();
const descriptions = new Set();
const organizationId = `${base}/#organization`;
const websiteId = `${base}/#website`;
const allowedTypes = new Set(['Organization', 'Country', 'WebSite', 'CollectionPage', 'ItemList', 'ListItem', 'Person', 'FAQPage', 'Question', 'Answer', 'BlogPosting', 'WebPage', 'Event', 'Place', 'PostalAddress']);
function validateNode(node) {
  if (!node || typeof node !== 'object') return;
  if (node['@type']) assert(allowedTypes.has(node['@type']), `Unknown schema type: ${node['@type']}`);
  if (node['@id']) assert(node['@id'].startsWith(base), `Unexpected entity host: ${node['@id']}`);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(validateNode);
    else validateNode(value);
  }
}

for (const route of routes) {
  const html = readFileSync(resolve(built, route === '/' ? 'index.html' : `${route.slice(1)}.html`), 'utf8');
  const canonical = `${base}${route}`;
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: H1`);
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  assert(title.includes('AMS') && !titles.has(title), `${route}: unique branded title`);
  titles.add(title);
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = key => tags.find(tag => tag.name === key || tag.property === key)?.content;
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  assert.equal(new URL(links.find(link => link.rel === 'canonical')?.href).href, canonical);
  assert.equal(new URL(meta('og:url')).href, canonical);
  assert.equal(meta('og:site_name'), 'AMS');
  assert.equal(meta('og:locale'), 'en_IN');
  assert.equal(meta('og:title'), title);
  assert.equal(meta('twitter:title'), title);
  assert.equal(meta('twitter:card'), 'summary_large_image');
  assert(meta('description') && !descriptions.has(meta('description')), `${route}: unique description`);
  descriptions.add(meta('description'));
  assert.equal(meta('og:description'), meta('description'));
  assert.equal(meta('twitter:description'), meta('description'));
  assert.equal(meta('og:image:width'), '1200');
  assert.equal(meta('og:image:height'), '630');
  assert(meta('og:image').startsWith(base));
  assert.equal(meta('twitter:image'), meta('og:image'));
  assert(!/noindex/i.test(meta('robots') || ''), `${route}: indexable`);
  const data = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(([, json]) => JSON.parse(json));
  data.forEach(validateNode);
  const org = data.find(node => node['@type'] === 'Organization');
  assert.equal(org['@id'], organizationId);
  assert.equal(org.name, 'Algorithms & Mathematics Society');
  assert(org.alternateName.includes('AMS'));
  assert(org.sameAs.includes('https://www.linkedin.com/company/amshq/'));
  assert(!org.sameAs.includes('https://amsderive.in'));
  assert.equal(data.find(node => node['@type'] === 'WebSite').publisher['@id'], organizationId);
  assert.equal(data.find(node => node['@type'] === 'WebSite')['@id'], websiteId);
  if (route === '/team') {
    const team = data.find(node => node['@type'] === 'CollectionPage').mainEntity.itemListElement;
    assert.equal(team.length, 5);
    team.forEach((entry, index) => {
      assert.equal(entry.position, index + 1);
      assert.equal(entry.item['@type'], 'Person');
      assert.equal(entry.item.memberOf['@id'], organizationId);
      assert(entry.item.sameAs[0].startsWith('https://www.linkedin.com/in/'));
      assert(html.includes(`id="${entry.item['@id'].split('#')[1]}"`));
      assert(decode(html).includes(entry.item.name));
      assert(decode(html).includes(entry.item.jobTitle));
    });
  }
  if (route === '/faq') {
    const faq = data.find(node => node['@type'] === 'FAQPage');
    const visible = decode(html.replace(/<script\b[^>]*>.*?<\/script>/gs, ''));
    assert.equal(faq.mainEntity.length, 10);
    faq.mainEntity.forEach(question => {
      assert.equal(question['@type'], 'Question');
      assert.equal(question.acceptedAnswer['@type'], 'Answer');
      assert(visible.includes(question.name));
      assert(visible.includes(question.acceptedAnswer.text));
    });
  }
  if (route.startsWith('/blog/')) {
    const article = data.find(node => node['@type'] === 'BlogPosting');
    assert.equal(article.publisher['@id'], organizationId);
    assert.equal(article.url, canonical);
    assert(!Number.isNaN(Date.parse(article.datePublished)));
    assert.equal(article.mainEntityOfPage.isPartOf['@id'], websiteId);
    const source = readFileSync(resolve('../../blogs', route.split('/').at(-1), 'index.md'), 'utf8');
    const authorName = source.match(/^author: "(.*?)"/m)?.[1];
    assert.equal(article.author['@type'], authorName === 'AMS Team' ? 'Organization' : 'Person');
    assert.equal(article.author.name, authorName === 'AMS Team' ? org.name : authorName);
    if (authorName === 'AMS Team') assert.equal(article.author.url, base);
    else assert(article.author.url.startsWith(`${base}/team#`));
  }
  if (route === '/derive') {
    const event = data.find(node => node['@type'] === 'Event');
    assert.equal(event.organizer['@id'], organizationId);
    assert(Date.parse(event.endDate) >= Date.parse(event.startDate));
    assert.equal(event.location.address.addressCountry, 'IN');
  }
}
const sitemap = readFileSync(resolve(built, 'sitemap.xml.body'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url.replace(/\/$/, ''));
assert.deepEqual(sitemapUrls.sort(), routes.map(route => `${base}${route}`.replace(/\/$/, '')).sort());
assert(readFileSync(resolve(built, 'robots.txt.body'), 'utf8').includes(`Sitemap: ${base}/sitemap.xml`));
assert(!readFileSync(resolve('public/llms.txt'), 'utf8').includes('https://amshq.in'));
console.log(`SEO checks passed for ${routes.length} static pages: metadata, entity and schema shapes, team identities, FAQ parity, article authors, event, sitemap, robots and llms links.`);
