(self.webpackChunkNikolayKaurov_github_io=self.webpackChunkNikolayKaurov_github_io||[]).push([[129],{906:(t,s,e)=>{"use strict";var i=e(755),n=e.n(i);function a(t){const{$name:s,$surname:e,$birth:i,$email:n,$password:a,$submit:c}=t.data.card,l=s.val()&&e.val()&&10===i.val().length&&!i.hasClass("text-field__input_invalid")&&(r=n.val(),String(r).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))&&a.val().length>7;var r;c.prop("disabled",!l)}class c{#t;constructor(t){this.#t=n()(t)}init(){const t=n()(".js-text-field__input",this.#t);this.$name=n()(t.get(0)),this.$surname=n()(t.get(1)),this.$birth=n()(t.get(2)),this.$email=n()(t.get(3)),this.$password=n()(t.get(4)),this.$submit=n()(".js-button",this.#t),this.#t.on("input",null,{card:this},a)}}n()(".js-card-registration__form").each(((t,s)=>{new c(s).init()}))},610:(t,s,e)=>{"use strict";var i=e(755),n=e.n(i);function a(t){var s;s=n()(t.target).val(),String(s).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?n()(".js-subscription__submit",t.data.subscription.$subscription).prop("disabled",!1):n()(".js-subscription__submit",t.data.subscription.$subscription).prop("disabled",!0)}class c{constructor(t){this.$subscription=n()(t)}init(){n()(".js-subscription__input",this.$subscription).on("input",null,{subscription:this},a)}}n()(".js-subscription").each(((t,s)=>{new c(s).init()}))},234:(t,s,e)=>{"use strict";var i=e(755),n=e.n(i);function a(t){t.preventDefault()}function c(t){const s=t.target,e=n()(s);e.removeClass("text-field__input_invalid");let i=s.selectionStart,a=e.val();const{preValue:c,$double:l}=t.data.textField;if(c.length>a.length)a.match(/^(\d{0,2}\.?|\d{0,2}\.\d{0,2}\.?|\d{0,2}\.\d{0,2}\.\d{0,4})$/)?(a=a.replace(/\.$/,""),a=a.replace(/\.$/,"")):a=c;else if(a.match(/^(\d{0,3}|\d{0,2}\.\d{1,3}|\d{0,2}\.\d{0,2}\.\d{1,4})$/)){let t,s,e,n=0,l=(a.slice(0,i).match(/\./g)||[]).length;if(a.match(/^(3[2-9]|[4-9]\d)$/)?(a=`0${a}`,n+=1,l=1):a.match(/^\d{0,2}\.(1[3-9]|[2-9]\d)$/)&&(a=`${a.slice(0,a.length-2)}0${a.slice(a.length-2,a.length)}`,n+=1,l=2),a.match(/^\d{3}$/)?(t=a.slice(0,2),s=a.slice(2),n+=1,l=1):a.match(/^\d{0,2}\.\d{3}$/)?([t,s]=a.slice(0,a.length-1).split("."),e=a[a.length-1],n+=1,l=2):[t,s,e]=a.split("."),function(t,s,e){let i;i=t?parseInt(t,10):0;let n,a,c="00"===t||i>31;return!c&&(n=s?parseInt(s,10):0,c="00"===s||n>12,!c&&(a=!e||e.length<4&&e.match(/^(19|20)/)||1===e.length||3===e.length?0:2===e.length?parseInt(e,10)<30?parseInt(`20${e}`,10):parseInt(`19${e}`,10):parseInt(e,10),c=i>29&&2===n||i>28&&2===n&&(a%4!=0||1900===a),!c&&(c=31===i&&[4,6,9,11].includes(n),!c)))}(t,s,e)){e&&(e.match(/^(0[1-9]?|1[0-8]|2[1-9]|[3-9]\d?)$/)&&l>1&&(n+=2),e.match(/^(0[1-9]?|1[0-8]|2[1-9])$/)?e=`20${e}`:e.match(/^[3-9]\d?$/)&&(e=`19${e}`)),s&&s.match(/^[2-9]$/)&&(s=`0${s}`,l>0&&(n+=1)),t&&t.match(/^[4-9]$/)&&(t=`0${t}`,n+=1);const c=[];void 0!==t&&c.push(t),void 0!==s&&c.push(s),void 0!==e&&c.push(e),a=c.join("."),i+=n}else a=c,i-=1}else a=c,i-=1;e.val(a),l.attr("placeholder",function(t){const s="ДД.ММ.ГГГГ".split("");return t.split("").forEach(((t,e)=>{s[e]=t})),s.join("")}(a)),s.setSelectionRange(i,i),t.data.textField.setPreValue(a)}function l(t){const s=n()(t.target),e=s.val(),i=e.split(".").reverse().join("-"),{$dateInput:a}=t.data.textField;e.match(/^\d{2}\.\d{2}\.\d{4}$/)&&!Number.isNaN(Date.parse(i))||""===e?(s.removeClass("text-field__input_invalid"),a.val(i)):s.addClass("text-field__input_invalid")}class r{#s;constructor(t){this.#s=n()(t)}init(){n()(".js-text-field__input",this.#s).attr("placeholder","").on("input",null,{textField:this},c).on("change focusout",null,{textField:this},l).on("paste",a);const t=this.#s.data("name");n()(".js-text-field__wrapper",this.#s).append(`\n        <input\n          type="text"\n          class="text-field__input text-field__input_double js-text-field__input_double"\n          disabled\n          placeholder="ДД.ММ.ГГГГ"\n        >\n        <input\n          type="date"\n          class="text-field__date js-text-field__date"\n          name="${t}-date"\n        >`),this.$double=n()(".js-text-field__input_double",this.#s),this.$dateInput=n()(".js-text-field__date",this.#s),this.preValue=""}setPreValue(t){this.preValue=t}}n()(".js-text-field_type_date").each(((t,s)=>{new r(s).init()}))},718:(t,s,e)=>{const i=e(849);i.keys().forEach(i)},849:(t,s,e)=>{var i={"./android-chrome-192x192.png":50,"./android-chrome-512x512.png":359,"./apple-touch-icon.png":723,"./browserconfig.xml":418,"./favicon-16x16.png":225,"./favicon-32x32.png":916,"./favicon.ico":914,"./mstile-144x144.png":714,"./mstile-150x150.png":443,"./mstile-310x150.png":898,"./mstile-310x310.png":132,"./mstile-70x70.png":809,"./safari-pinned-tab.svg":4,"./site.webmanifest":48};function n(t){var s=a(t);return e(s)}function a(t){if(!e.o(i,t)){var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}return i[t]}n.keys=function(){return Object.keys(i)},n.resolve=a,t.exports=n,n.id=849},50:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/android-chrome-192x192.png"},359:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/android-chrome-512x512.png"},723:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/apple-touch-icon.png"},418:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/browserconfig.xml"},225:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/favicon-16x16.png"},916:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/favicon-32x32.png"},914:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/favicon.ico"},714:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/mstile-144x144.png"},443:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/mstile-150x150.png"},898:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/mstile-310x150.png"},132:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/mstile-310x310.png"},809:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/mstile-70x70.png"},4:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/safari-pinned-tab.svg"},48:(t,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>i});const i=e.p+"assets/favicons/site.webmanifest"},355:(t,s,e)=>{"use strict";e(906),e(234),e(610),e(718)}},t=>{var s;s=355,t(t.s=s)}]);
//# sourceMappingURL=registration.js.map