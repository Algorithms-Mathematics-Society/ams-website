import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reqIsoDate, reqInt, reqRecord, optHttpsUrl, optBoolean, reqString, oneOf } from './frontmatter.ts';

for (const value of ['2027-02-29T18:00:00+05:30', '2027-04-31T00:00:00Z', 'January 1, 2027 18:00:00Z', '2027-01-01', '2027-01-01T18:00:00', '2027-01-01T24:00:00Z']) {
  test(`reject invalid or ambiguous schedule: ${value}`, () => {
    assert.throws(() => reqIsoDate({ date: value }, 'date', 'fixture'), /fixture.*date/);
  });
}
for (const value of ['2028-02-29T18:00:00+05:30', '2027-01-01T12:30:00Z']) {
  test(`accept explicit valid instant: ${value}`, () => {
    assert.equal(reqIsoDate({ date: value }, 'date', 'fixture').toISOString(), new Date(value).toISOString());
  });
}
test('bad Date objects fail with an actionable field error', () => {
  assert.throws(() => reqIsoDate({ date: new Date(NaN) }, 'date', 'fixture'), /fixture.*date/);
});
test('integer fields cannot exceed exact JavaScript precision', () => {
  assert.throws(() => reqInt({ number: 9007199254740992 }, 'number', 'fixture'));
});
test('HTTPS fields must be actual URLs without embedded credentials', () => {
  for (const value of ['https://', 'https://bad host/', 'https://user:password@example.com', 'javascript:alert(1)']) {
    assert.throws(() => optHttpsUrl({ url: value }, 'url', 'fixture'), /fixture.*url/);
  }
  assert.equal(optHttpsUrl({ url: 'https://example.com/a?b=c' }, 'url', 'fixture'), 'https://example.com/a?b=c');
});
test('typed fields reject misleading coercions', () => {
  assert.throws(() => optBoolean({ verified: 'false' }, 'verified', 'fixture'));
  assert.throws(() => reqString({ title: '  ' }, 'title', 'fixture'));
  assert.throws(() => reqRecord({ tiers: [] }, 'tiers', 'fixture'));
  assert.throws(() => oneOf('other', ['quant', 'systems'], 'track', 'fixture'));
});
