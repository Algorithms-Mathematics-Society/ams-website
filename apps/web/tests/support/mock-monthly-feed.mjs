// Only the synthetic URL is intercepted. Never contacts a real account or sheet.
import fs from 'node:fs';
const originalFetch = globalThis.fetch;
globalThis.fetch = (input, options) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  if (url === 'https://docs.google.com/spreadsheets/d/e/AMS_SYSTEM_TEST/pub?output=csv') {
    return Promise.resolve(new Response(fs.readFileSync(process.env.AMS_TEST_FEED_FILE, 'utf8')));
  }
  return originalFetch(input, options);
};
