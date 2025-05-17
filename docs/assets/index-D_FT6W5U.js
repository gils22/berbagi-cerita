var se=t=>{throw TypeError(t)};var z=(t,e,n)=>e.has(t)||se("Cannot "+n);var f=(t,e,n)=>(z(t,e,"read from private field"),n?n.call(t):e.get(t)),y=(t,e,n)=>e.has(t)?se("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),B=(t,e,n,r)=>(z(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),S=(t,e,n)=>(z(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const T="https://story-api.dicoding.dev/v1",R={SUBSCRIBE:`${T}/notifications/subscribe`,UNSUBSCRIBE:`${T}/notifications/subscribe`,STORIES:`${T}/stories`,GUEST_STORIES:`${T}/stories/guest`,LOGIN:`${T}/login`,REGISTER:`${T}/register`},be=async(t,e,n)=>{try{return await(await fetch(R.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:n})})).json()}catch(r){return{error:!0,message:r.message}}},ye=async(t,e)=>{try{return await(await fetch(R.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})})).json()}catch(n){return{error:!0,message:n.message}}},we=async(t,e=!1,n=1,r=10)=>{try{const s=`${R.STORIES}?location=${e?1:0}&page=${n}&size=${r}`;return await(await fetch(s,{headers:{Authorization:`Bearer ${t}`}})).json()}catch(s){return{error:!0,message:s.message}}},ve=async(t,e)=>{try{return await(await fetch(`${R.STORIES}/${t}`,{headers:{Authorization:`Bearer ${e}`}})).json()}catch(n){return{error:!0,message:n.message}}},xe=async(t,e)=>{try{return await(await fetch(R.STORIES,{method:"POST",headers:{Authorization:`Bearer ${e}`},body:t})).json()}catch(n){return{error:!0,message:n.message}}};async function ke({endpoint:t,keys:{p256dh:e,auth:n}}){const r=localStorage.getItem("token"),s=JSON.stringify({endpoint:t,keys:{p256dh:e,auth:n}}),a=await fetch(R.SUBSCRIBE,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:s});return{...await a.json(),ok:a.ok}}const V={async fetchStories(t){const e=await we(t);return e.error?(console.error("Error fetching stories:",e.message),{error:!0,message:e.message}):e},async getLocationName(t,e){try{return(await(await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${t}&lon=${e}&format=json`)).json()).display_name||"Lokasi tidak ditemukan"}catch(n){return console.error("Error fetching location name:",n),"Lokasi tidak ditemukan"}},async checkImage(t){return new Promise(e=>{const n=new Image;n.onload=()=>e(t),n.onerror=()=>e("https://via.placeholder.com/150"),n.src=t})}},W=(t,e)=>e.some(n=>t instanceof n);let oe,ie;function Le(){return oe||(oe=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Be(){return ie||(ie=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const K=new WeakMap,q=new WeakMap,F=new WeakMap;function Ee(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",o)},a=()=>{n(P(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",o)});return F.set(e,t),e}function Se(t){if(K.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",o),t.removeEventListener("abort",o)},a=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",o),t.addEventListener("abort",o)});K.set(t,e)}let J={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return K.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return P(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ge(t){J=t(J)}function Ie(t){return Be().includes(t)?function(...e){return t.apply(Y(this),e),P(this.request)}:function(...e){return P(t.apply(Y(this),e))}}function Pe(t){return typeof t=="function"?Ie(t):(t instanceof IDBTransaction&&Se(t),W(t,Le())?new Proxy(t,J):t)}function P(t){if(t instanceof IDBRequest)return Ee(t);if(q.has(t))return q.get(t);const e=Pe(t);return e!==t&&(q.set(t,e),F.set(e,t)),e}const Y=t=>F.get(t);function Te(t,e,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const o=indexedDB.open(t,e),u=P(o);return r&&o.addEventListener("upgradeneeded",i=>{r(P(o.result),i.oldVersion,i.newVersion,P(o.transaction),i)}),n&&o.addEventListener("blocked",i=>n(i.oldVersion,i.newVersion,i)),u.then(i=>{a&&i.addEventListener("close",()=>a()),s&&i.addEventListener("versionchange",m=>s(m.oldVersion,m.newVersion,m))}).catch(()=>{}),u}const De=["get","getKey","getAll","getAllKeys","count"],Ce=["put","add","delete","clear"],_=new Map;function ce(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(_.get(e))return _.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Ce.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||De.includes(n)))return;const a=async function(o,...u){const i=this.transaction(o,s?"readwrite":"readonly");let m=i.store;return r&&(m=m.index(u.shift())),(await Promise.all([m[n](...u),s&&i.done]))[0]};return _.set(e,a),a}ge(t=>({...t,get:(e,n,r)=>ce(e,n)||t.get(e,n,r),has:(e,n)=>!!ce(e,n)||t.has(e,n)}));const Ae=["continue","continuePrimaryKey","advance"],le={},Q=new WeakMap,fe=new WeakMap,Re={get(t,e){if(!Ae.includes(e))return t[e];let n=le[e];return n||(n=le[e]=function(...r){Q.set(this,fe.get(this)[e](...r))}),n}};async function*$e(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,Re);for(fe.set(n,e),F.set(n,Y(e));e;)yield n,e=await(Q.get(n)||e.continue()),Q.delete(n)}function de(t,e){return e===Symbol.asyncIterator&&W(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&W(t,[IDBIndex,IDBObjectStore])}ge(t=>({...t,get(e,n,r){return de(e,n)?$e:t.get(e,n,r)},has(e,n){return de(e,n)||t.has(e,n)}}));const Me="berbagicerita",Oe=1,$="stories",U=Te(Me,Oe,{upgrade(t){t.createObjectStore($,{keyPath:"id"})}}),H={async putReport(t){if(!Object.hasOwn(t,"id"))throw new Error("`id` is required to save.");return(await U).put($,t)},async getStoryById(t){return await(await U).get($,t)},async getAllStories(){return await(await U).getAll($)},async deleteStoryById(t){return await(await U).delete($,t)}};class je{constructor(){this.page=1,this.pageSize=3}async render(){return`
      <section class="px-8 py-8 max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Daftar Cerita</h2>
        <div class="mb-6">
          <input 
            id="searchInput" 
            type="text" 
            placeholder="Cari cerita..." 
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div id="storiesContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <!-- Stories will be displayed here -->
        </div>
        <div id="pagination" class="flex justify-between mt-6 mb-10">
          <button id="prevButton" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300" disabled>
            Previous
          </button>
          <button id="nextButton" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300">
            Next
          </button>
        </div>
        <div>
          <h3 class="text-2xl font-semibold text-blue-700 mb-4">Peta Lokasi Cerita</h3>
          <div id="map" class="w-full h-[400px] rounded-lg shadow-md"></div>
        </div>
      </section>
    `}async afterRender(){const e=document.getElementById("searchInput"),n=document.getElementById("storiesContainer"),r=document.getElementById("prevButton"),s=document.getElementById("nextButton"),a=localStorage.getItem("token");if(!a){alert("Anda harus login untuk melihat cerita"),window.location.hash="/login";return}const o=await V.fetchStories(a);if(o.error){alert("Gagal mengambil cerita: "+o.message);return}const u=async d=>{n.innerHTML="";for(const c of d){const x=document.createElement("div");x.classList.add("bg-white","p-4","rounded-lg","shadow-md","flex","flex-col","items-center","justify-center");const E=await V.checkImage(c.photoUrl),G=c.lat&&c.lon?await V.getLocationName(c.lat,c.lon):"Lokasi tidak tersedia";x.innerHTML=`
          <img src="${E}" alt="Story Photo" class="w-full h-48 object-cover rounded-lg mb-4">
          <h3 class="text-lg font-semibold">${c.name}</h3>
          <p class="text-gray-600 text-sm">${c.description.length>100?c.description.slice(0,100)+"...":c.description}</p>
          <p class="text-sm text-gray-500 mt-2">Lokasi: ${G}</p>
          <div class="mt-4 flex space-x-4">
            <button class="saveButton text-yellow-600 hover:text-yellow-800" data-id="${c.id}">
              <i class="fas fa-save"></i> Simpan
            </button>
          </div>
        `,n.appendChild(x)}document.querySelectorAll(".saveButton").forEach(c=>{c.addEventListener("click",async()=>{const x=c.getAttribute("data-id");await pe(x)})})},i=async d=>{const v=(this.page-1)*this.pageSize,c=this.page*this.pageSize,x=d.slice(v,c);await u(x),r.disabled=this.page===1,s.disabled=this.page*this.pageSize>=d.length};await i(o.listStory),s.addEventListener("click",async()=>{this.page*this.pageSize<o.listStory.length&&(this.page++,await i(o.listStory))}),r.addEventListener("click",async()=>{this.page>1&&(this.page--,await i(o.listStory))}),e.addEventListener("input",async()=>{const d=e.value.toLowerCase(),v=o.listStory.filter(c=>c.name.toLowerCase().includes(d)||c.description.toLowerCase().includes(d));this.page=1,await i(v)});const m=L.map("map").setView([-2.5,118],5);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(m),o.listStory.forEach(d=>{d.lat&&d.lon&&L.marker([d.lat,d.lon]).addTo(m).bindPopup(`<strong>${d.name}</strong><br>${d.description.slice(0,100)}...`)})}}async function pe(t){console.log("Mencari cerita dengan ID:",t);let e=await H.getStoryById(t);if(e)console.log("Cerita sudah ada di IndexedDB:",e);else{console.log("Cerita tidak ditemukan di IndexedDB, mengambil dari API...");const n=localStorage.getItem("token"),r=await ve(t,n);if(r.error){console.error("Gagal mengambil cerita dari API:",r.message),alert("Gagal mengambil cerita dari API.");return}if(!r||!r.story){console.error("Cerita tidak ditemukan di respons API:",r),alert("Cerita tidak ditemukan.");return}e=r.story,await H.putReport(e),console.log("Cerita telah disimpan:",e)}alert("Cerita telah disimpan")}window.saveStory=pe;var w,D;class Ne{constructor({view:e,model:n}){y(this,w);y(this,D);B(this,w,e),B(this,D,n)}async initialGalleryAndMap(){f(this,w).showReportsListLoading();try{const e=await f(this,D).getAllStories();e.length>0?f(this,w).populateBookmarkedReports("Daftar cerita yang tersimpan",e):f(this,w).populateBookmarkedReportsListEmpty()}catch(e){console.error("Error mengambil cerita:",e),f(this,w).populateBookmarkedReportsError(e.message)}finally{f(this,w).hideReportsListLoading()}}async removeReport(e){try{await f(this,D).deleteStoryById(e)}catch(n){console.error("removeReport: error:",n),f(this,w).populateBookmarkedReportsError(n.message)}}}w=new WeakMap,D=new WeakMap;var I;class Ue{constructor(){y(this,I)}async render(){return`
      <section class="px-8 py-8 max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Daftar Cerita Tersimpan</h2>
        <div class="reports-list__container">
          <div id="reports-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"></div>
          <div id="reports-list-loading-container"></div>
        </div>
      </section>
    `}async afterRender(){B(this,I,new Ne({view:this,model:H})),await f(this,I).initialGalleryAndMap()}populateBookmarkedReports(e,n){if(n.length<=0){this.populateBookmarkedReportsListEmpty();return}const r=n.reduce((s,a)=>s.concat(`
        <div class="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <img src="${a.photoUrl||"https://via.placeholder.com/150"}" alt="Story Photo" class="w-full h-48 object-cover rounded-lg mb-4">
          <h3 class="text-lg font-semibold">${a.name}</h3>
          <p class="text-gray-600 text-sm">${a.description.length>100?a.description.slice(0,100)+"...":a.description}</p>
          <p class="text-sm text-gray-500 mt-2">Lokasi: ${a.lat&&a.lon?"Tersedia":"Tidak tersedia"}</p>
          <div class="mt-4 flex space-x-4">
            <button class="btn-detail text-green-600 hover:text-green-800" data-id="${a.id}">
              <i class="fas fa-eye"></i> Detail
            </button>
            <button class="btn-remove text-yellow-600 hover:text-yellow-800" data-id="${a.id}">
              <i class="fas fa-trash"></i> Hapus
            </button>
          </div>
        </div>
      `),"");document.getElementById("reports-list").innerHTML=r,document.querySelectorAll(".btn-remove").forEach(s=>{s.addEventListener("click",async()=>{const a=s.getAttribute("data-id");await f(this,I).removeReport(a),await f(this,I).initialGalleryAndMap()})}),document.querySelectorAll(".btn-detail").forEach(s=>{s.addEventListener("click",()=>{const a=s.getAttribute("data-id");window.location.hash=`#/detail/${a}`})})}populateBookmarkedReportsListEmpty(){document.getElementById("reports-list").innerHTML="Tidak ada cerita yang tersimpan."}populateBookmarkedReportsError(e){document.getElementById("reports-list").innerHTML=`<p class="text-red-600">Error: ${e}</p>`}showReportsListLoading(){document.getElementById("reports-list-loading-container").innerHTML="Loading..."}hideReportsListLoading(){document.getElementById("reports-list-loading-container").innerHTML=""}}I=new WeakMap;const He={async submitStory(t,e){return await xe(t,e)}};class Fe{async render(){return`
      <section class="px-6 py-10 max-w-2xl mx-auto">
        <h2 class="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">Tambah Cerita Baru</h2>
        <form id="formStory" class="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <div>
            <label for="description" class="block text-sm font-semibold mb-1 text-gray-700">
              <i class="fas fa-align-left mr-2 text-blue-500"></i>Deskripsi Cerita
            </label>
            <textarea id="description" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" rows="4" required aria-label="Deskripsi Cerita"></textarea>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-700">
              <i class="fas fa-camera-retro mr-2 text-blue-500"></i>Pilih Foto Cerita
            </label>
            <div class="flex gap-4">
              <button type="button" id="cameraButton" class="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm" aria-label="Ambil foto menggunakan kamera">
                <i class="fas fa-camera mr-2"></i> Ambil Foto
              </button>
              <button type="button" id="galleryButton" class="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-sm" aria-label="Pilih foto dari galeri">
                <i class="fas fa-image mr-2"></i> Dari Galeri
              </button>
            </div>
            <video id="video" class="w-full mt-4 border rounded-lg" autoplay aria-label="Preview video kamera" style="display: none;"></video>
            <button type="button" id="captureButton" class="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition hidden">
              <i class="fas fa-check-circle mr-2"></i> Ambil Foto
            </button>
            <canvas id="canvas" class="hidden"></canvas>
            <input type="file" id="photo" class="hidden" accept="image/*" />
            <div id="photoPreviewContainer" class="mt-4 hidden">
              <p class="text-sm text-gray-600 mb-2">Preview Foto:</p>
              <img id="photoPreview" class="w-full max-h-[400px] object-contain rounded-lg shadow" alt="Preview Foto Cerita" />
              <button type="button" id="deletePhoto" class="w-full bg-red-600 text-white py-2 mt-3 rounded-md hover:bg-red-700 transition">
                <i class="fas fa-trash mr-2"></i> Hapus Foto
              </button>
            </div>
          </div>
          <div id="mapContainer">
            <label class="block text-sm font-semibold mb-1 text-gray-700">
              <i class="fas fa-map-marker-alt mr-2 text-blue-500"></i> Lokasi Cerita
            </label>
            <div id="map" class="w-full h-64 border rounded-lg shadow-sm"></div>
            <p class="text-xs text-gray-500 mt-1">Klik peta untuk memilih lokasi</p>
          </div>
          <button type="submit" class="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 font-semibold tracking-wide transition">
            <i class="fas fa-plus-circle mr-2"></i> Tambahkan Cerita
          </button>
        </form>
      </section>
    `}async afterRender(){const e=L.map("map").setView([-2.5,118],5);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(e);let n=51.505,r=-.09,s=L.marker([n,r],{draggable:!0}).addTo(e);s.bindPopup("Lokasi Anda").openPopup();try{const l=await this.getCurrentLocation();n=l.coords.latitude,r=l.coords.longitude,e.setView([n,r],13),s.setLatLng([n,r])}catch{alert("Tidak dapat mendeteksi lokasi Anda. Menggunakan lokasi default.")}const a=document.getElementById("video"),o=document.getElementById("captureButton"),u=document.getElementById("canvas"),i=document.getElementById("photo"),m=document.getElementById("photoPreview"),d=document.getElementById("photoPreviewContainer"),v=document.getElementById("deletePhoto");let c;const x=async()=>{if(location.protocol!=="https:"&&location.hostname!=="localhost"){alert("Akses kamera hanya diizinkan melalui HTTPS atau localhost.");return}const l=document.createElement("p");l.innerText="Mengaktifkan kamera...",l.className="text-center text-sm text-gray-500 mt-2",a.parentNode.insertBefore(l,a);try{if(!(await navigator.mediaDevices.enumerateDevices()).some(h=>h.kind==="videoinput")){alert("Kamera tidak ditemukan pada perangkat ini.");return}c=await navigator.mediaDevices.getUserMedia({video:{width:720,height:480,facingMode:"user"}}),a.srcObject=c,a.style.display="block",o.classList.remove("hidden"),i.classList.add("hidden")}catch(g){console.error("Gagal mengakses kamera:",g),alert("Tidak dapat mengakses kamera: "+g.message)}finally{l.remove()}},E=()=>{c&&c.getTracks().forEach(l=>l.stop()),a.style.display="none",o.classList.add("hidden")},G=l=>{const g=atob(l.split(",")[1]),p=new ArrayBuffer(g.length),h=new Uint8Array(p);for(let k=0;k<g.length;k++)h[k]=g.charCodeAt(k);return new Blob([h],{type:"image/jpeg"})},ae=l=>{m.src=l,d.classList.remove("hidden")};document.getElementById("cameraButton").addEventListener("click",()=>{E(),x()}),document.getElementById("galleryButton").addEventListener("click",()=>{E(),i.classList.remove("hidden"),i.click()}),o.addEventListener("click",()=>{u.width=a.videoWidth,u.height=a.videoHeight,u.getContext("2d").drawImage(a,0,0);const g=u.toDataURL("image/jpeg"),p=G(g),h=new File([p],"photo.jpg",{type:"image/jpeg"}),k=new DataTransfer;k.items.add(h),i.files=k.files,ae(g)}),i.addEventListener("change",()=>{const l=i.files[0];if(l){if(l.size>2*1024*1024){alert("Ukuran gambar terlalu besar. Maksimal 2MB."),i.value="";return}const g=new FileReader;g.onload=p=>ae(p.target.result),g.readAsDataURL(l)}}),v.addEventListener("click",()=>{i.value="",m.src="",d.classList.add("hidden"),E()});const N=document.getElementById("formStory");N.addEventListener("submit",async l=>{l.preventDefault();const g=N.description.value,p=N.photo.files[0],h=new FormData;h.append("description",g),h.append("photo",p),h.append("lat",n),h.append("lon",r);const k=localStorage.getItem("token"),re=await He.submitStory(h,k);re.error?alert(`Gagal menambahkan cerita: ${re.message}`):(alert("Cerita berhasil ditambahkan!"),N.reset(),m.src="",d.classList.add("hidden"),window.location.hash="/")}),window.addEventListener("beforeunload",E),window.addEventListener("hashchange",E),e.on("click",function(l){const{lat:g,lng:p}=l.latlng;s.setLatLng([g,p]),n=g,r=p,s.bindPopup(`Lokasi: Latitude: ${g}, Longitude: ${p}`).openPopup()})}getCurrentLocation(){return new Promise((e,n)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e,n):n("Geolocation is not supported by this browser.")})}}const Ge={async login({email:t,password:e}){return await ye(t,e)}};class ze{async render(){return`
      <section class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Masuk ke Akunmu</h2>
          <form id="loginForm" class="space-y-5">
            <div>
              <label for="email" class="block text-sm font-medium">Email</label>
              <input type="email" id="email" name="email" class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium">Password</label>
              <input type="password" id="password" name="password" class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
          </form>
          <p class="text-center text-sm text-gray-600 mt-4">Belum punya akun? 
            <a href="#/register" class="text-blue-700 font-semibold hover:underline">Daftar di sini</a>
          </p>
        </div>
      </section>
    `}async afterRender(){const e=document.getElementById("loginForm");e.addEventListener("submit",async n=>{n.preventDefault();const r=e.email.value,s=e.password.value,a=await Ge.login({email:r,password:s});a.error?alert(`Login gagal: ${a.message}`):(localStorage.setItem("token",a.loginResult.token),localStorage.setItem("name",a.loginResult.name),alert("Login berhasil!"),window.location.hash="/")})}}const Ve={async register({name:t,email:e,password:n}){return await be(t,e,n)}};class qe{async render(){return`
      <section class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Buat Akun Baru</h2>
          <form id="registerForm" class="space-y-5" novalidate>
            <div>
              <label for="name" class="block text-sm font-medium">Nama</label>
              <input type="text" id="name" name="name" class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium">Email</label>
              <input type="email" id="email" name="email" class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium">Password</label>
              <input type="password" id="password" name="password" class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" minlength="8" required />
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Daftar</button>
          </form>
          <p class="text-center text-sm text-gray-600 mt-4">Sudah punya akun? 
            <a href="#/login" class="text-blue-700 font-semibold hover:underline">Login di sini</a>
          </p>
        </div>
      </section>
    `}async afterRender(){const e=document.getElementById("registerForm");e.addEventListener("submit",async n=>{n.preventDefault();const r=e.name.value.trim(),s=e.email.value.trim(),a=e.password.value.trim();if(!r||!s||!a){alert("Semua kolom wajib diisi!");return}const o=await Ve.register({name:r,email:s,password:a});o.error?alert(`Registrasi gagal: ${o.message}`):(alert("Registrasi berhasil! Silakan login."),window.location.hash="/login")})}}const _e={"/":new je,"/bookmark":new Ue,"/form":new Fe,"/login":new ze,"/register":new qe};function he(t){const e=t.split("/");return{resource:e[1]||null,id:e[2]||null}}function We(t){let e="";return t.resource&&(e=e.concat(`/${t.resource}`)),t.id&&(e=e.concat("/:id")),e||"/"}function ne(){return location.hash.replace("#","")||"/"}function Ke(){return ne()}function Je(){const t=ne(),e=he(t);return We(e)}function Ye(){const t=ne();return he(t)}const ue=(t,e="")=>`
    <button id="${`${e}subscribeToggleBtn`}" class="hover:bg-blue-700 px-3 py-2 rounded transition flex items-center text-white text-sm">
      <i class="fas ${t?"fa-bell-slash":"fa-bell"} mr-1"></i> ${t?"Unsubscribe":"Subscribe"}
    </button>
  `,me=(t=!1)=>{const e=!!localStorage.getItem("token");return`
    <header class="bg-blue-600 text-white shadow fixed w-full top-0 z-50">
      <div class="mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#/" class="text-xl font-bold flex items-center gap-2">
          <i class="fas fa-book-open"></i> Berbagi Cerita
        </a>
        <button id="drawer-button" class="md:hidden text-2xl"><i class="fas fa-bars"></i></button>
        <nav id="nav-menu" class="hidden md:flex gap-4 text-sm items-center">
          ${ue(t)}
          <a href="#/" class="hover:bg-blue-700 px-3 py-2 rounded transition flex items-center">
            <i class="fas fa-home mr-1"></i> Beranda
          </a>
          <a href="#/form" class="hover:bg-blue-700 px-3 py-2 rounded transition flex items-center">
            <i class="fas fa-plus mr-1"></i> Tambah Cerita
          </a>
          <a href="#/bookmark" class="hover:bg-blue-700 px-3 py-2 rounded transition flex items-center">
            <i class="fas fa-bookmark mr-1"></i> Tersimpan
          </a>
          ${e?`<button id="logoutBtn" class="hover:bg-red-700 px-3 py-2 rounded transition flex items-center text-white">
                  <i class="fas fa-sign-out-alt mr-1"></i> Logout
                </button>`:""}
        </nav>
      </div>
    </header>
    <div class="h-12"></div>

    <div id="drawer" class="fixed left-0 top-0 w-64 h-full bg-white shadow-md transform -translate-x-full transition-transform duration-300 z-50">
      <div class="flex flex-col p-4 space-y-4 text-left">
        <a href="#/" class="drawer-link text-base text-gray-800 hover:text-blue-600 flex items-center">
          <i class="fas fa-home mr-2"></i> Beranda
        </a>
        <a href="#/form" class="drawer-link text-base text-gray-800 hover:text-blue-600 flex items-center">
          <i class="fas fa-plus mr-2"></i> Tambah Cerita
        </a>
        <a href="#/about" class="drawer-link text-base text-gray-800 hover:text-blue-600 flex items-center">
          <i class="fas fa-bookmark mr-2"></i> Tersimpan
        </a>
        ${ue(t,"drawer-")}
        ${e?`<button id="logoutBtnDrawer" class="text-base text-red-600 hover:text-red-800 rounded w-fit flex items-center">
                <i class="fas fa-sign-out-alt mr-2"></i> Logout
              </button>`:""}
      </div>
    </div>
  `};function Qe(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/-/g,"+").replace(/_/g,"/"),r=atob(n),s=new Uint8Array(r.length);for(let a=0;a<r.length;a++)s[a]=r.charCodeAt(a);return s}const Xe="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";function Ze(){return"Notification"in window}function et(){return Notification.permission==="granted"}async function tt(){if(!Ze())return console.error("Browser tidak mendukung Notification API."),!1;if(et())return!0;switch(await Notification.requestPermission()){case"granted":return!0;case"denied":return alert("Izin notifikasi ditolak."),!1;case"default":default:return alert("Izin notifikasi belum dipilih atau ditutup."),!1}}async function nt(){try{const t=await navigator.serviceWorker.getRegistration();return(t==null?void 0:t.pushManager.getSubscription())||null}catch(t){return console.error("Gagal mengambil push subscription:",t),null}}async function X(){return!!await nt()}function at(){return{userVisibleOnly:!0,applicationServerKey:Qe(Xe)}}async function rt(){if(await tt()){if(await X()){alert("Kamu sudah berlangganan notifikasi.");return}console.log("Memulai proses berlangganan push notification...");try{const t=await navigator.serviceWorker.getRegistration();if(!t)throw new Error("Service Worker belum terdaftar.");const e=await t.pushManager.subscribe(at()),{endpoint:n,keys:r}=e.toJSON(),s=await ke({endpoint:n,keys:r});if(!s.ok){console.error("Gagal menyimpan langganan di server:",s),await e.unsubscribe(),alert("Gagal mengaktifkan push notification.");return}alert("Berhasil berlangganan push notification!")}catch(t){console.error("Kesalahan saat berlangganan:",t),alert("Gagal mengaktifkan push notification.")}}}async function st(){try{const t=await navigator.serviceWorker.getRegistration(),e=await(t==null?void 0:t.pushManager.getSubscription());if(!e){alert("Kamu belum berlangganan notifikasi.");return}await e.unsubscribe(),alert("Berhasil berhenti berlangganan notifikasi.")}catch(t){console.error("Gagal berhenti berlangganan:",t),alert("Terjadi kesalahan saat menghentikan langganan.")}}var C,M;class ot{constructor({view:e,model:n}){y(this,C);y(this,M);B(this,C,e),B(this,M,n)}async loadStoryDetail(e){try{if(!e)throw new Error("ID cerita tidak valid");const n=await f(this,M).getStoryById(e);f(this,C).renderStoryDetail(n)}catch(n){console.error("loadStoryDetail error:",n),f(this,C).renderError(n.message)}}}C=new WeakMap,M=new WeakMap;var O,j;class it{constructor(e){y(this,O);y(this,j);B(this,j,e)}async render(){return`
      <section class="px-8 py-8 max-w-4xl mx-auto">
        <div id="detail-container" class="bg-white p-6 rounded-lg shadow-md">
          <p>Loading detail cerita...</p>
        </div>
      </section>
    `}async afterRender(){B(this,O,new ot({view:this,model:H})),await f(this,O).loadStoryDetail(f(this,j))}renderStoryDetail(e){if(!e){document.getElementById("detail-container").innerHTML='<p class="text-red-600">Cerita tidak ditemukan.</p>';return}document.getElementById("detail-container").innerHTML=`
      <h2 class="text-2xl font-bold mb-4">${e.name}</h2>
      <img src="${e.photoUrl||"https://via.placeholder.com/600x400"}" alt="Foto Cerita" class="w-full rounded-lg mb-4 object-cover max-h-96" />
      <p class="mb-4">${e.description}</p>
      <p><strong>Lokasi:</strong> ${e.lat&&e.lon?`Latitude: ${e.lat}, Longitude: ${e.lon}`:"Tidak tersedia"}</p>
    `}renderError(e){document.getElementById("detail-container").innerHTML=`<p class="text-red-600">Error: ${e}</p>`}}O=new WeakMap,j=new WeakMap;var A,b,Z,ee,te;class ct{constructor({content:e}){y(this,b);y(this,A);B(this,A,e)}async renderPage(){const e=Ke(),n=Je(),r=Ye(),s=!!localStorage.getItem("token");if(document.body.classList.remove("login-page","register-page"),e==="/login"?document.body.classList.add("login-page"):e==="/register"&&document.body.classList.add("register-page"),!s&&e!=="/login"&&e!=="/register"){window.location.hash="/login";return}if(n==="/detail/:id"&&r.id){const i=new it(r.id),m=await i.render();f(this,A).innerHTML=m,await i.afterRender();return}const a=_e[n]||{render:async()=>'<p class="text-center text-red-500">Halaman tidak ditemukan</p>',afterRender:async()=>{}},o=document.getElementById("header-container");o&&(o.innerHTML=me());const u=async()=>{const i=await a.render();f(this,A).innerHTML=i,a.afterRender&&await a.afterRender();const m=document.querySelector(".skip-to-content"),d=document.getElementById("main-content");m&&d&&m.addEventListener("click",v=>{v.preventDefault(),d.setAttribute("tabindex","-1"),d.focus()})};document.startViewTransition?document.startViewTransition(u):await u(),S(this,b,Z).call(this),S(this,b,ee).call(this),S(this,b,te).call(this)}}A=new WeakMap,b=new WeakSet,Z=function(){const e=document.getElementById("drawer"),n=document.getElementById("drawer-button");e&&n&&(n.addEventListener("click",()=>{e.classList.toggle("-translate-x-full")}),document.querySelectorAll(".drawer-link").forEach(s=>{s.addEventListener("click",()=>{e.classList.add("-translate-x-full")})}),document.body.addEventListener("click",s=>{const a=!e.contains(s.target)&&!n.contains(s.target);!e.classList.contains("-translate-x-full")&&a&&e.classList.add("-translate-x-full")}),e.classList.add("-translate-x-full"))},ee=function(){const e=document.getElementById("logoutBtn"),n=document.getElementById("logoutBtnDrawer");[e,n].forEach(r=>{r&&r.addEventListener("click",()=>{localStorage.removeItem("token"),window.location.hash="/login"})})},te=async function(){if(!("serviceWorker"in navigator)||!("PushManager"in window)){console.warn("Push notification tidak didukung.");return}try{const e=await navigator.serviceWorker.register("./sw.js");if(console.log("Service Worker terdaftar:",e),await Notification.requestPermission()!=="granted"){console.warn("Izin notifikasi tidak diberikan");return}const r=await X();console.log(`Status subscription: ${r?"SUDAH":"BELUM"} terdaftar`),await(async()=>{const a=["subscribeToggleBtn","drawer-subscribeToggleBtn"];for(const o of a){const u=document.getElementById(o);u&&(u.textContent=r?"Unsubscribe":"Subscribe",u.innerHTML=r?'<i class="fas fa-bell-slash mr-1"></i> Unsubscribe':'<i class="fas fa-bell mr-1"></i> Subscribe',u.className=r?"bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition flex items-center":"bg-white text-blue-600 px-3 py-2 rounded hover:bg-blue-100 transition flex items-center",u.onclick=async()=>{r?await st():await rt();const i=document.getElementById("header-container");if(i){const m=await X();i.innerHTML=me(m),S(this,b,Z).call(this),S(this,b,ee).call(this),S(this,b,te).call(this)}})}})()}catch(e){console.error("Gagal setup push notification:",e)}};document.addEventListener("DOMContentLoaded",async()=>{const t=new ct({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});await t.renderPage(),window.addEventListener("hashchange",async()=>{await t.renderPage()})});
