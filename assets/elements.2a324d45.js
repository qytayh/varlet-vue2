import{i as d,d as i,t as b,k as x}from"./shared.f8da68a0.js";function R(t){const{left:n}=t.getBoundingClientRect();return n+(document.body.scrollLeft||document.documentElement.scrollLeft)}function E(t){const{top:n}=t.getBoundingClientRect();return n+(document.body.scrollTop||document.documentElement.scrollTop)}function F(t){const n="scrollTop"in t?t.scrollTop:t.pageYOffset;return Math.max(n,0)}function S(t){const n="scrollLeft"in t?t.scrollLeft:t.pageXOffset;return Math.max(n,0)}function A(){return new Promise(t=>{window.requestAnimationFrame(()=>{window.requestAnimationFrame(t)})})}function N(t){window.requestAnimationFrame(()=>{window.requestAnimationFrame(t)})}async function k(t){await A();const{top:n,bottom:o,left:r,right:e}=t.getBoundingClientRect(),{innerWidth:a,innerHeight:s}=window,c=r<=a&&e>=0,l=n<=s&&o>=0;return c&&l}function O(t){const{transform:n}=window.getComputedStyle(t);return+n.slice(n.lastIndexOf(",")+2,n.length-1)}function L(t){let n=t;for(;n&&!(!n.parentNode||(n=n.parentNode,n===document.body||n===document.documentElement));){const o=/(scroll|auto)/,{overflowY:r,overflow:e}=window.getComputedStyle(n);if(o.test(r)||o.test(e))return n}return window}function z(t){const n=[];let o=t;for(;o!==window;)o=L(o),n.push(o);return n}const w=t=>i(t)&&t.endsWith("rem"),P=t=>i(t)&&t.endsWith("px")||d(t),W=t=>i(t)&&t.endsWith("%"),p=t=>i(t)&&t.endsWith("vw"),g=t=>i(t)&&t.endsWith("vh"),q=t=>{if(d(t))return t;if(P(t))return+t.replace("px","");if(p(t))return+t.replace("vw","")*window.innerWidth/100;if(g(t))return+t.replace("vh","")*window.innerHeight/100;if(w(t)){const n=+t.replace("rem",""),o=window.getComputedStyle(document.documentElement).fontSize;return n*parseFloat(o)}return i(t)?b(t):0},B=t=>{if(t!=null)return W(t)||p(t)||g(t)||w(t)?t:`${q(t)}px`};function f(t){return globalThis.requestAnimationFrame?globalThis.requestAnimationFrame(t):globalThis.setTimeout(t,16)}function I(t){globalThis.cancelAnimationFrame?globalThis.cancelAnimationFrame(t):globalThis.clearTimeout(t)}function V(t,{top:n=0,left:o=0,duration:r=300,animation:e}){const a=Date.now(),s=F(t),c=S(t);return new Promise(l=>{const u=()=>{const m=(Date.now()-a)/r;if(m<1){const h=s+(n-s)*e(m),T=c+(o-c)*e(m);t.scrollTo(T,h),f(u)}else t.scrollTo(o,n),l()};f(u)})}function j(t){return Object.entries(t!=null?t:{}).reduce((n,[o,r])=>{const e=o.startsWith("--")?o:`--${x(o)}`;return n[e]=r,n},{})}export{E as a,q as b,L as c,S as d,F as e,A as f,R as g,I as h,k as i,z as j,O as k,j as l,N as n,f as r,V as s,B as t};
