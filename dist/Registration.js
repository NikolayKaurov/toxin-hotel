(self.webpackChunkNikolayKaurov_github_io=self.webpackChunkNikolayKaurov_github_io||[]).push([[150],{906:(t,e,s)=>{"use strict";var a=s(755),i=s.n(a);function n(t){var e;!Number.isNaN(Date.parse(t.data.card.$birth.val().split(".").reverse().join("-")))&&t.data.card.$birth.val().match(/^\d{2}\.\d{2}\.\d{4}$/)&&t.data.card.$name.val()&&t.data.card.$surname.val()&&(e=t.data.card.$email.val(),String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))&&t.data.card.$password.val().length>7?t.data.card.$submit.prop("disabled",!1):t.data.card.$submit.prop("disabled",!0)}class d{constructor(t){this.$card=i()(t);const e=i()(".js-text-field__input",this.$card);this.$name=i()(e.get(0)),this.$surname=i()(e.get(1)),this.$birth=i()(e.get(2)),this.$email=i()(e.get(3)),this.$password=i()(e.get(4)),this.$submit=i()(i()(".js-button",this.$card).get(0))}init(){this.$card.on("input",null,{card:this},n)}}i()(".js-card-registration").each(((t,e)=>{new d(e).init()}))},379:(t,e,s)=>{"use strict";var a=s(755),i=s.n(a);i()(".js-checkbox").each(((t,e)=>{i()(".js-checkbox__button",i()(e)).each(((t,s)=>{i()(s).attr("id",`${i()(e).data("name")}-${i()(s).data("name")}`),i()(s).attr("name",`${i()(e).data("name")}-${i()(s).data("name")}`),i()(`.js-checkbox__button-label[data-name='${i()(s).data("name")}']`,i()(e)).attr("for",`${i()(e).data("name")}-${i()(s).data("name")}`)}))}))},610:(t,e,s)=>{"use strict";var a=s(755),i=s.n(a);function n(t){var e;e=i()(t.target).val(),String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?i()(".js-subscription__submit",t.data.subscription.$subscription).prop("disabled",!1):i()(".js-subscription__submit",t.data.subscription.$subscription).prop("disabled",!0)}class d{constructor(t){this.$subscription=i()(t)}init(){i()(".js-subscription__input",this.$subscription).on("input",null,{subscription:this},n)}}i()(".js-subscription").each(((t,e)=>{new d(e).init()}))},234:(t,e,s)=>{"use strict";var a=s(755),i=s.n(a);function n(t){t.preventDefault()}function d(t){const e=t.target,s=i()(e);s.removeClass("text-field__input_invalid");let a=e.selectionStart,n=s.val();const{preValue:d,$double:c}=t.data.textField;if(d.length>n.length)n.match(/^(\d{0,2}\.?|\d{0,2}\.\d{0,2}\.?|\d{0,2}\.\d{0,2}\.\d{0,4})$/)?(n=n.replace(/\.$/,""),n=n.replace(/\.$/,"")):n=d;else if(n.match(/^(\d{0,3}|\d{0,2}\.\d{1,3}|\d{0,2}\.\d{0,2}\.\d{1,4})$/)){let t,e,s,i=0,c=(n.slice(0,a).match(/\./g)||[]).length;if(n.match(/^(3[2-9]|[4-9]\d)$/)?(n=`0${n}`,i+=1,c=1):n.match(/^\d{0,2}\.(1[3-9]|[2-9]\d)$/)&&(n=`${n.slice(0,n.length-2)}0${n.slice(n.length-2,n.length)}`,i+=1,c=2),n.match(/^\d{3}$/)?(t=n.slice(0,2),e=n.slice(2),i+=1,c=1):n.match(/^\d{0,2}\.\d{3}$/)?([t,e]=n.slice(0,n.length-1).split("."),s=n[n.length-1],i+=1,c=2):[t,e,s]=n.split("."),function(t,e,s){let a;a=t?parseInt(t,10):0;let i,n,d="00"===t||a>31;return!d&&(i=e?parseInt(e,10):0,d="00"===e||i>12,!d&&(n=!s||s.length<4&&s.match(/^(19|20)/)||1===s.length||3===s.length?0:2===s.length?parseInt(s,10)<30?parseInt(`20${s}`,10):parseInt(`19${s}`,10):parseInt(s,10),d=a>29&&2===i||a>28&&2===i&&(n%4!=0||1900===n),!d&&(d=31===a&&[4,6,9,11].includes(i),!d)))}(t,e,s)){s&&(s.match(/^(0[1-9]?|1[0-8]|2[1-9]|[3-9]\d?)$/)&&c>1&&(i+=2),s.match(/^(0[1-9]?|1[0-8]|2[1-9])$/)?s=`20${s}`:s.match(/^[3-9]\d?$/)&&(s=`19${s}`)),e&&e.match(/^[2-9]$/)&&(e=`0${e}`,c>0&&(i+=1)),t&&t.match(/^[4-9]$/)&&(t=`0${t}`,i+=1);const d=[];void 0!==t&&d.push(t),void 0!==e&&d.push(e),void 0!==s&&d.push(s),n=d.join("."),a+=i}else n=d,a-=1}else n=d,a-=1;s.val(n),c.attr("placeholder",function(t){const e="ДД.ММ.ГГГГ".split("");return t.split("").forEach(((t,s)=>{e[s]=t})),e.join("")}(n)),e.setSelectionRange(a,a),t.data.textField.setPreValue(n)}function c(t){const e=i()(t.target),s=e.val(),a=s.split(".").reverse().join("-"),{$dateInput:n}=t.data.textField;s.match(/^\d{2}\.\d{2}\.\d{4}$/)&&!Number.isNaN(Date.parse(a))||""===s?(e.removeClass("text-field__input_invalid"),n.val(a)):e.addClass("text-field__input_invalid")}class r{#t;constructor(t){this.#t=i()(t)}init(){i()(".js-text-field__input",this.#t).attr("placeholder","").on("input",null,{textField:this},d).on("change",null,{textField:this},c).on("paste",n);const t=this.#t.data("name");i()(".js-text-field__wrapper",this.#t).append(`<input\n          type="text"\n          class="text-field__input text-field__input_double js-text-field__input js-text-field__input_double"\n          disabled\n          placeholder="ДД.ММ.ГГГГ"\n        >\n        <input\n          type="date"\n          class="text-field__date js-text-field__date"\n          name="${t}-date"\n        >`),this.$double=i()(".js-text-field__input_double",this.#t),this.$dateInput=i()(".js-text-field__date",this.#t),this.preValue=""}setPreValue(t){this.preValue=t}}i()(".js-text-field_type_date").each(((t,e)=>{new r(e).init()}))},718:(t,e,s)=>{const a=s(849);a.keys().forEach(a)},849:(t,e,s)=>{var a={"./android-chrome-192x192.png":50,"./android-chrome-512x512.png":359,"./apple-touch-icon.png":723,"./browserconfig.xml":418,"./favicon-16x16.png":225,"./favicon-32x32.png":916,"./favicon.ico":914,"./mstile-144x144.png":714,"./mstile-150x150.png":443,"./mstile-310x150.png":898,"./mstile-310x310.png":132,"./mstile-70x70.png":809,"./safari-pinned-tab.svg":4,"./site.webmanifest":48};function i(t){var e=n(t);return s(e)}function n(t){if(!s.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}i.keys=function(){return Object.keys(a)},i.resolve=n,t.exports=i,i.id=849},50:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/android-chrome-192x192.png"},359:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/android-chrome-512x512.png"},723:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/apple-touch-icon.png"},418:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/browserconfig.xml"},225:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/favicon-16x16.png"},916:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/favicon-32x32.png"},914:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/favicon.ico"},714:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/mstile-144x144.png"},443:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/mstile-150x150.png"},898:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/mstile-310x150.png"},132:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/mstile-310x310.png"},809:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/mstile-70x70.png"},4:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/safari-pinned-tab.svg"},48:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>a});const a=s.p+"assets/favicons/site.webmanifest"},831:(t,e,s)=>{"use strict";s(379),s(906),s(234),s(610),s(718)}},t=>{var e;e=831,t(t.s=e)}]);
//# sourceMappingURL=Registration.js.map