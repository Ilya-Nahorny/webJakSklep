window.onload=()=>{const e=document.querySelectorAll("nav > ul > li > a");let t=null;for(let n=0;n<e.length;n++){const r=e[n],a=r.nextElementSibling;r.addEventListener("click",(e=>{if(t&&t!==r){t.classList.remove("opened");const e=t.nextElementSibling;if(e){e.classList.remove("opened");e.querySelectorAll("ul").forEach((e=>e.classList.remove("opened")))}}if(a){if("A"===e.target.tagName&&e.clientX>e.target.getBoundingClientRect().right){r.classList.toggle("opened"),a.classList.toggle("opened");a.querySelectorAll("ul").forEach((e=>{e.classList.toggle("opened")})),e.preventDefault()}else window.location.href=r.href}else window.location.href=r.href;t=r.classList.contains("opened")?r:null}))}const n=document.getElementById("search-component"),r=document.getElementById("search-input"),a=document.getElementById("results");document.addEventListener("click",(e=>{e.target!==r&&(a.innerHTML="")})),r.addEventListener("input",(async e=>{let t=e.target.value;await async function(e){if(""!==e)try{n.classList.add("loading");const t=await fetch(`https://dummyjson.com/products/search?q=${e}&limit=5&delay=1000`),r=(await t.json()).products.map((e=>`<li><a href="#"><span>${e.title}</span><span>$${e.price}</span></a></li>`)).join("");a.innerHTML=r}catch(e){console.error("Error:",e)}finally{n.classList.remove("loading")}else a.innerHTML=""}(t)}));const i=document.querySelector(".terminal_input"),s=document.querySelector(".terminal_result"),o=localStorage.getItem("lastLogin"),l=[],c=-1;localStorage.setItem("lastLogin",(new Date).toString());const p={clear:()=>s.innerHTML="",help:()=>Object.keys(p).join(", "),quote:async()=>{const e=await fetch("https://dummyjson.com/quotes/random"),t=await e.json();if(t)return t.quote},double:e=>isNaN(e)?"Not a number":2*e,...{hello:{msg:"Hello"},weather:async e=>{const t=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&appid=7bb96bdc43ef502bc36c78a30db8b2da`),n=await t.json();n&&(s.innerHTML+=`<pre>Weather in ${e}:</pre>\n      <pre>Temperature: ${n.main.temp} °C,</pre>\n      <pre>Feels like: ${n.main.feels_like} °C,</pre>\n      <pre>Wind speed: ${n.wind.speed} m/s,</pre>\n      <pre>Humidity: ${n.main.humidity}%,</pre>\n      <pre>Pressure: ${n.main.pressure} hPa</pre>`)}}};s.innerHTML+=`<pre>Last login: ${o}</pre>`,i.addEventListener("keydown",(function(e){if("Enter"===e.key){const e=this.value.split(" "),t=p[e[0]];if(t){const n=t(e[1]);n instanceof Promise?n.then((e=>s.innerHTML+=`<pre>${e}</pre>`)):s.innerHTML+=`<pre>${n}</pre>`}else s.innerHTML+=`<pre>Nieznana komenda: ${e[0]}</pre>`;l.push(this.value),c=l.length-1,this.value=""}else"ArrowUp"===e.key?c>=0&&(this.value=l[c],c--):"ArrowDown"===e.key&&c<l.length-1&&(c++,this.value=l[c])}))};