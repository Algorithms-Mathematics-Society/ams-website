/** Valid App Check tokens are single-use and restricted to this website app. */
export function createAttestationVerifier({ appCheck, appId }) {
  return async req => {
    const token = req.get('X-Firebase-AppCheck');
    const expected = appId();
    if (!expected || typeof token !== 'string' || token.length < 20 || token.length > 4096) return false;
    const result = await appCheck.verifyToken(token, { consume: true });
    return result.appId === expected && result.alreadyConsumed === false;
  };
}
