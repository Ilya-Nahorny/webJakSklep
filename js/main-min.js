window.onload=()=>{const e=document.querySelectorAll("nav > ul > li > a");let t=null;for(let n=0;n<e.length;n++){const r=e[n],i=r.nextElementSibling;r.addEventListener("click",(e=>{if(t&&t!==r){t.classList.remove("opened");const e=t.nextElementSibling;if(e){e.classList.remove("opened");e.querySelectorAll("ul").forEach((e=>e.classList.remove("opened")))}}if(i){if("A"===e.target.tagName&&e.clientX>e.target.getBoundingClientRect().right){r.classList.toggle("opened"),i.classList.toggle("opened");i.querySelectorAll("ul").forEach((e=>{e.classList.toggle("opened")})),e.preventDefault()}else window.location.href=r.href}else window.location.href=r.href;t=r.classList.contains("opened")?r:null}))}const n=document.getElementById("search-component"),r=document.getElementById("search-input"),i=document.getElementById("results");document.addEventListener("click",(e=>{e.target!==r&&(i.innerHTML="")})),r.addEventListener("input",(async e=>{let t=e.target.value;await async function(e){if(""!==e)try{n.classList.add("loading");const t=await fetch(`https://dummyjson.com/products/search?q=${e}&limit=5&delay=1000`),r=(await t.json()).products.map((e=>`<li><a href="#"><span>${e.title}</span><span>$${e.price}</span></a></li>`)).join("");i.innerHTML=r}catch(e){console.error("Error:",e)}finally{n.classList.remove("loading")}else i.innerHTML=""}(t)}));const l=document.querySelector(".terminal_input"),a=document.querySelector(".terminal_result"),s=localStorage.getItem("lastLogin"),o=[];let c=-1;const p={clear:()=>a.innerHTML="",help:()=>Object.keys(p).join(", "),quote:async()=>{let e=await fetch("https://dummyjson.com/quotes/random"),t=await e.json();if(t)return t.quote},double:e=>isNaN(e)?"Not a number":2*e,...{hello:{msg:"Hello"},weather:{fetch:async e=>{let t=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&appid=7bb96bdc43ef502bc36c78a30db8b2da`),n=await t.json();if(n)return`<pre>Weather in ${e}:</pre>\n        <pre>Temperature: ${n.main.temp} °C,</pre>\n        <pre>Feels like: ${n.main.feels_like} °C,</pre>\n        <pre>Wind speed: ${n.wind.speed} m/s,</pre>\n        <pre>Humidity: ${n.main.humidity}%,</pre>\n        <pre>Pressure: ${n.main.pressure} hPa</pre>`}}}};localStorage.setItem("lastLogin",(new Date).toString()),a.innerHTML+=`<pre>Last login: ${s}</pre>`,l.addEventListener("keydown",(function(e){if("Enter"===e.key){const e=this.value.split(" "),t=p[e[0]];if(t){let n;"function"==typeof t?n=t(e[1]):t.fetch?n=t.fetch(e[1]):t.msg&&(n=t.msg),n instanceof Promise?n.then((e=>a.innerHTML+=`<pre>${e}</pre>`)):a.innerHTML+=`<pre>${n}</pre>`}else a.innerHTML+=`<pre>Nieznana komenda: ${e[0]}</pre>`;a.scrollTop=a.scrollHeight,o.push(this.value),c=o.length-1,this.value=""}else"ArrowUp"===e.key?c>=0&&(this.value=o[c],c--):"ArrowDown"===e.key&&c<o.length-1&&(c++,this.value=o[c])}))};