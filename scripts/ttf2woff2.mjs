#!/usr/bin/env node
// ttf2woff2.mjs: zero-dependency WOFF2 encoder (null transforms, Brotli from node:zlib).
// For machines where fontTools has no Brotli. Subset first if you need to:
//   python3 -m fontTools.subset in.ttf --unicodes=... --output-file=sub.ttf --layout-features='*'
// Usage: node ttf2woff2.mjs <in.ttf> <out.woff2>. Verify in Chrome that the face loads (document.fonts status).
import fs from 'node:fs'; import zlib from 'node:zlib';
const KNOWN=['cmap','head','hhea','hmtx','maxp','name','OS/2','post','cvt ','fpgm','glyf','loca','prep','CFF ','VORG','EBDT','EBLC','gasp','hdmx','kern','LTSH','PCLT','VDMX','vhea','vmtx','BASE','GDEF','GPOS','GSUB','EBSC','JSTF','MATH','CBDT','CBLC','COLR','CPAL','SVG ','sbix','acnt','avar','bdat','bloc','bsln','cvar','fdsc','feat','fmtx','fvar','gvar','hsty','just','lcar','mort','morx','opbd','prop','trak','Zapf','Silf','Glat','Gloc','Feat','Sill'];
function b128(n){const out=[];do{out.unshift(n&0x7f);n>>>=7;}while(n);for(let i=0;i<out.length-1;i++)out[i]|=0x80;return Buffer.from(out);}
const [inp,outp]=process.argv.slice(2); const f=fs.readFileSync(inp);
const flavor=f.readUInt32BE(0), num=f.readUInt16BE(4); let tables=[];
for(let i=0;i<num;i++){const o=12+16*i;tables.push({tag:f.toString('latin1',o,o+4),off:f.readUInt32BE(o+8),len:f.readUInt32BE(o+12)});}
tables.sort((a,b)=>a.tag<b.tag?-1:a.tag>b.tag?1:0);
// loca must follow glyf
const gi=tables.findIndex(t=>t.tag==='glyf'), li=tables.findIndex(t=>t.tag==='loca');
if(gi>=0&&li>=0){const loca=tables.splice(li,1)[0];const g2=tables.findIndex(t=>t.tag==='glyf');tables.splice(g2+1,0,loca);}
const dir=[]; const data=[]; let sfnt=12+16*num;
for(const t of tables){const k=KNOWN.indexOf(t.tag);const tv=(t.tag==='glyf'||t.tag==='loca')?3:0;
  let flags=(k>=0?k:63)|(tv<<6); const parts=[Buffer.from([flags])]; if(k<0)parts.push(Buffer.from(t.tag,'latin1'));
  parts.push(b128(t.len)); dir.push(Buffer.concat(parts)); data.push(f.subarray(t.off,t.off+t.len)); sfnt+=(t.len+3)&~3;}
const comp=zlib.brotliCompressSync(Buffer.concat(data),{params:{[zlib.constants.BROTLI_PARAM_QUALITY]:11,[zlib.constants.BROTLI_PARAM_MODE]:zlib.constants.BROTLI_MODE_FONT}});
const dirB=Buffer.concat(dir); const hdr=Buffer.alloc(48);
let total=48+dirB.length+comp.length; total=(total+3)&~3;
hdr.write('wOF2',0,'latin1');hdr.writeUInt32BE(flavor,4);hdr.writeUInt32BE(total,8);hdr.writeUInt16BE(num,12);hdr.writeUInt16BE(0,14);
hdr.writeUInt32BE(sfnt,16);hdr.writeUInt32BE(comp.length,20);hdr.writeUInt16BE(1,24);hdr.writeUInt16BE(0,26);
const out=Buffer.alloc(total); Buffer.concat([hdr,dirB,comp]).copy(out); fs.writeFileSync(outp,out);
console.log(outp,total,'bytes');
