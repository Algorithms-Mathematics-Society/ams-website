import test from 'node:test';
import assert from 'node:assert/strict';
import { createAttestationVerifier } from './attestation.js';
test('reject missing and oversized attestation without verification', async () => {
 let calls=0;
 const verify=createAttestationVerifier({appCheck:{verifyToken:async()=>{calls++;}},appId:()=> 'web-app'});
 for(const value of [undefined,'',[], 'x'.repeat(4097)])assert.equal(await verify({get:()=>value}),false);
 assert.equal(calls,0);
});
test('reject other apps, replays, and ambiguous consumption state', async () => {
 for(const result of [{appId:'other',alreadyConsumed:false},{appId:'web-app',alreadyConsumed:true},{appId:'web-app'}]){
  const verify=createAttestationVerifier({appCheck:{verifyToken:async(token,options)=>{assert.deepEqual(options,{consume:true});return result;}},appId:()=> 'web-app'});
  assert.equal(await verify({get:()=> 'x'.repeat(100)}),false);
 }
});
test('accept verified single-use token for the configured app',async()=>{
 const verify=createAttestationVerifier({appCheck:{verifyToken:async()=>({appId:'web-app',alreadyConsumed:false})},appId:()=> 'web-app'});
 assert.equal(await verify({get:()=> 'x'.repeat(100)}),true);
});
