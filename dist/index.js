(self.webpackChunkNikolayKaurov_github_io=self.webpackChunkNikolayKaurov_github_io||[]).push([[826],{532:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){const{burger:e}=t.data;Math.abs(t.timeStamp-e.timeStamp)<40||(e.setTimeStamp(t.timeStamp),e.$burger.toggleClass("burger_open"))}function o(t){t.open()}function r(t){const{burger:e}=t.data;Math.abs(t.timeStamp-e.timeStamp)<40||(e.setTimeStamp(t.timeStamp),clearTimeout(e.timerID),e.setTimerID(setTimeout(o,50,e)))}function n(t){t.close()}function p(t){const{burger:e}=t.data;clearTimeout(e.timerID),e.setTimerID(setTimeout(n,50,e))}function c(t){t.stopPropagation()}function l(t){const e=d()(t.target),a=parseFloat(e.attr("data-timeStamp"));Math.abs(t.timeStamp-a)<40||(e.attr("data-timeStamp",t.timeStamp),e.toggleClass("burger__submenu_open"))}function u(t){t.addClass("burger__submenu_open")}function _(t){const e=d()(t.delegateTarget),a=parseFloat(e.attr("data-timeStamp")),s=parseFloat(e.attr("data-timerID"));Math.abs(t.timeStamp-a)<40||(e.attr("data-timeStamp",t.timeStamp),clearTimeout(s),e.attr("data-timerID",setTimeout(u,50,e)))}function h(t){t.removeClass("burger__submenu_open")}function $(t){const e=d()(t.delegateTarget),a=parseFloat(e.attr("data-timerID"));clearTimeout(a),e.attr("data-timerID",setTimeout(h,50,e))}class m{constructor(t){this.$burger=d()(t)}init(){this.timerID=0,this.timeStamp=0,this.$burger.on("mousedown",null,{burger:this},i).on("mousedown",".js-burger__item",{},c).on("focusin",null,{burger:this},r).on("focusout",null,{burger:this},p).on("mousedown",".js-burger__submenu",{},l),d()(".js-burger__submenu",this.$burger).on("focusin",null,{},_).on("focusout",null,{},$)}open(){this.$burger.addClass("burger_open")}close(){this.$burger.removeClass("burger_open")}setTimerID(t){this.timerID=t}setTimeStamp(t){this.timeStamp=t}}d()(".js-burger").each(((t,e)=>{new m(e).init()}))},554:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){const{$arrival:e,$departure:a,$adult:s,$submit:d}=t.data.card,i=a.val()&&e.val()&&parseInt(s.val(),10);d.prop("disabled",!i)}class o{#t;constructor(t){this.#t=d()(t)}init(){this.$arrival=d()(".js-datepicker__input_date_arrival",this.#t),this.$departure=d()(".js-datepicker__input_date_departure",this.#t),this.$adult=d()('.js-dropdown__quantity[name="search-guest-adult"]',this.#t),this.$submit=d()(".js-button",this.#t),this.#t.on("input",null,{card:this},i)}}d()(".js-card-search").each(((t,e)=>{new o(e).init()}))},485:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);const i=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],o=["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"];function r(t){d()(t.target).addClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.open(),t.data.datepicker.setTimeFocus(t.timeStamp)}function n(t){const{$datepicker:e}=t.data.datepicker;e.hasClass("datepicker_keeping-open")?e.removeClass("datepicker_keeping-open"):(d()(t.target).removeClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.isOpen()||(t.data.datepicker.isRollbackable()&&t.data.datepicker.rollback(),t.data.datepicker.close()))}function p(t){if(Math.abs(t.timeStamp-t.data.datepicker.timeFocus)<50)return;const e=d()(t.delegateTarget);e.hasClass("js-datepicker__expand_open")?(e.removeClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.close()):(e.addClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.open())}function c(t){const{$expandDeparture:e}=t.data.datepicker;9===t.which&&e.addClass("datepicker__expand_open js-datepicker__expand_open")}function l(t){const{$datepicker:e,$down:a}=t.data.datepicker;e.addClass("datepicker_keeping-open"),a.addClass("datepicker__down_pressed")}function u(t){const{$datepicker:e,$down:a}=t.data.datepicker;a.hasClass("datepicker__down_pressed")&&(a.removeClass("datepicker__down_pressed"),d()(".js-datepicker__expand_open",e).trigger("focus"))}function _(t){t.setCurrentMonth()}function h(t){const e=d()(t.target),{dateQueue:a,today:s,calendarMonth:i,$arrival:o,$departure:r,$expandArrival:n,$expandDeparture:p,$valueArrival:c,$valueDeparture:l,$valueFilter:u}=t.data.datepicker;if(e.hasClass("js-datepicker__button_action_month-minus"))i.setMonth(i.getMonth()-1),s.getFullYear()===i.getFullYear()&&s.getMonth()===i.getMonth()||t.data.datepicker.setTimerClick(setTimeout(_,1e3,t.data.datepicker));else if(e.hasClass("js-datepicker__button_action_month-plus"))i.setMonth(i.getMonth()+1);else{if(!e.hasClass("js-datepicker__button_action_clear"))return e.prop("disabled",!0),o.val(n.attr("data-date")),r.val(p.attr("data-date")).trigger("input"),void t.data.datepicker.close();a[0]="",a[1]="",n.attr("data-date",""),p.attr("data-date",""),c.text("ДД.ММ.ГГГГ"),l.text("ДД.ММ.ГГГГ"),u.text("Укажите даты пребывания"),o.val(""),r.val("").trigger("input")}t.data.datepicker.updateCalendar()}function $(t){clearTimeout(t.data.datepicker.timerClick)}function m(t){const e=d()(t.target),{dateQueue:a,$datepicker:s,$expandArrival:i,$expandDeparture:r,$valueArrival:n,$valueDeparture:p,$valueFilter:c}=t.data.datepicker;if(!e.hasClass("datepicker__cell_clickable"))return;const l=e.data("date"),u=d()(".js-datepicker__expand_open",s),_=u.hasClass("js-datepicker__expand_date_arrival")||u.hasClass("js-datepicker__expand_date_departure");if(_?a[1]===u.attr("data-date")?a[1]=l:a[0]=l:(a.push(l),a.shift()),""===a[0]){_?(u.attr("data-date",l),d()(".js-datepicker__value",u).text(l.split("-").reverse().join("."))):(i.attr("data-date",l),n.text(l.split("-").reverse().join(".")));const t=new Date(l);c.text(`${t.getDate()} ${o[t.getMonth()]}`)}else{let t,e;a[0]>a[1]?[e,t]=a:[t,e]=a;const s=new Date(t),d=new Date(e);i.attr("data-date",t),n.text(t.split("-").reverse().join(".")),r.attr("data-date",e),p.text(e.split("-").reverse().join(".")),c.text(`${s.getDate()} ${o[s.getMonth()]} - ${d.getDate()} ${o[d.getMonth()]}`)}_&&(i.attr("data-date")===l?(r.addClass("js-datepicker__expand_open datepicker__expand_open"),i.removeClass("js-datepicker__expand_open datepicker__expand_open")):(r.removeClass("js-datepicker__expand_open datepicker__expand_open"),i.addClass("js-datepicker__expand_open datepicker__expand_open"))),t.data.datepicker.updateCalendar()}class k{#e=1;#a;#s;#d;#i;#o;constructor(t){this.$datepicker=d()(t)}init(){this.timeFocus=0,this.timerClick=0;const t=new Date;this.today=new Date(t.getFullYear(),t.getMonth(),t.getDate()),this.calendarMonth=new Date(t.getFullYear(),t.getMonth()),this.dateQueue=["",""],this.$arrival=d()(".js-datepicker__input_date_arrival",this.$datepicker),this.$departure=d()(".js-datepicker__input_date_departure",this.$datepicker);const e=2*this.$datepicker.data("z-index")-1,a=this.$datepicker.data("name");this.$down=d()(".js-datepicker__down",this.$datepicker).css({"z-index":e}).on(`mousedown.datepicker__down.${a}`,null,{datepicker:this},l).on(`mouseup.datepicker__down.${a} mouseout.datepicker__down.${a}`,null,{datepicker:this},u).on(`mousedown.datepicker__button.${a}`,".js-datepicker__button",{datepicker:this},h),this.$datepicker.on(`focusin.datepicker__expand.${a}`,".js-datepicker__expand",{datepicker:this},r).on(`focusout.datepicker__expand.${a}`,".js-datepicker__expand",{datepicker:this},n),d()(".js-datepicker__expand",this.$datepicker).on(`mousedown.datepicker__expand.${a}`,null,{datepicker:this},p),this.$expandArrival=d()(".js-datepicker__expand_date_arrival",this.$datepicker).on(`keydown.datepicker__expand_date_arrival.${a}`,null,{datepicker:this},c),this.$valueArrival=d()(".js-datepicker__value",this.$expandArrival),this.$expandDeparture=d()(".js-datepicker__expand_date_departure",this.$datepicker),this.$valueDeparture=d()(".js-datepicker__value",this.$expandDeparture),this.$expandFilter=d()(".js-datepicker__expand_format_filter",this.$datepicker),this.$valueFilter=d()(".js-datepicker__value",this.$expandFilter),this.#a=d()(".js-datepicker__button_action_month-minus",this.$down).on(`mouseup.month-minus.${a} mouseout.month-minus.${a}`,null,{datepicker:this},$),this.#s=d()(".js-datepicker__month-year",this.$down),this.#d=d()(".js-datepicker__button_action_clear",this.$down),this.#i=d()(".js-datepicker__button_action_confirm",this.$down),this.#o=d()(".js-datepicker__calendar-body",this.$down).on(`mousedown.datepicker__cell.${a}`,".js-datepicker__cell",{datepicker:this},m),this.updateCalendar()}open(){const t=129+this.#e*parseInt(d()("td",this.#o).css("height"),10);this.$down.css({height:`${t}px`,border:"1px solid rgba(31, 32, 65, 0.25)",transition:"height 500ms, border 500ms"})}close(){this.$expandArrival.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$expandDeparture.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$expandFilter.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$down.css({height:"0px",border:"0px solid rgba(31, 32, 65, 0)",transition:"height 500ms, border 500ms"})}setTimeFocus(t){this.timeFocus=t}setTimerClick(t){this.timerClick=t}isRollbackable(){return!(this.dateQueue[0]===this.$arrival.val()&&this.dateQueue[1]===this.$departure.val()||this.dateQueue[1]===this.$arrival.val()&&this.dateQueue[0]===this.$departure.val())}rollback(){let t=this.$arrival.val();const e=this.$departure.val();if(this.$expandArrival.attr("data-date",t),this.$expandDeparture.attr("data-date",e),t?this.$valueArrival.text(t.split("-").reverse().join(".")):this.$valueArrival.text("ДД.ММ.ГГГГ"),e?this.$valueDeparture.text(e.split("-").reverse().join(".")):this.$valueDeparture.text("ДД.ММ.ГГГГ"),this.dateQueue[0]=t,this.dateQueue[1]=e,""===t&&""===e)this.$valueFilter.text("Укажите даты пребывания");else if(""!==t&&""!==e){const a=new Date(t),s=new Date(e);this.$valueFilter.text(`${a.getDate()} ${o[a.getMonth()]} - ${s.getDate()} ${o[s.getMonth()]}`)}else{t=`${t}${e}`;const a=new Date(t);this.$valueFilter.text(`${a.getDate()} ${o[a.getMonth()]}`),this.dateQueue[0]="",this.dateQueue[1]=t}this.updateCalendar()}isOpen(){return d()(".js-datepicker__expand_open",this.$datepicker).length>0||this.$datepicker.hasClass("datepicker_format_demo")}updateCalendar(){this.today.getMonth()===this.calendarMonth.getMonth()&&this.today.getFullYear()===this.calendarMonth.getFullYear()?this.#a.prop("disabled",!0):this.#a.prop("disabled",!1),this.#s.text(`${i[this.calendarMonth.getMonth()]} ${this.calendarMonth.getFullYear()}`);const t=new Date(this.calendarMonth.getFullYear(),this.calendarMonth.getMonth()),e=t.getDay()?t.getDay()-1:6;t.setDate(t.getDate()-e);const a=!!this.dateQueue[0]&&!!this.dateQueue[1];let s=new Date(this.dateQueue[0]),o=new Date(this.dateQueue[1]);s.setHours(0,0,0),o.setHours(0,0,0),a&&s>o&&([s,o]=[o,s]),this.#e=1;let r="";do{this.#e+=1,r+='<tr class="datepicker__row">';for(let e=0;e<7;e+=1){let d="",i="";t.getTime()===s.getTime()||t.getTime()===o.getTime()?d+=" datepicker__cell_selected":t.getTime()===this.today.getTime()?d+=" datepicker__cell_date_today datepicker__cell_clickable":t>this.today&&(d+=" datepicker__cell_clickable"),t.getMonth()!==this.calendarMonth.getMonth()&&(d+=" datepicker__cell_date_other-month"),a&&(t.getTime()===s.getTime()?e<6&&(i='<div class="datepicker__cell-period datepicker__cell-period_date_arrival"></div>'):t.getTime()===o.getTime()?e>0&&(i='<div class="datepicker__cell-period datepicker__cell-period_date_departure"></div>'):s<t&&t<o&&(i=0===e?'<div class="datepicker__cell-period datepicker__cell-period_date_monday"></div>':6===e?'<div class="datepicker__cell-period datepicker__cell-period_date_sunday"></div>':'<div class="datepicker__cell-period"></div>'));const n=t.getMonth()<9?"0":"",p=t.getDate()<10?"0":"";r+=`<td class="js-datepicker__cell datepicker__cell${d}" data-date="${t.getFullYear()}-${n}${t.getMonth()+1}-${p}${t.getDate()}">${t.getDate()}${i}</td>`,t.setDate(t.getDate()+1)}r+="</tr>"}while(t.getMonth()===this.calendarMonth.getMonth());if(this.#o.html(r),this.isOpen()){const t=129+this.#e*parseInt(d()("td",this.#o).css("height"),10);this.$down.css({height:`${t}px`,border:"1px solid rgba(31, 32, 65, 0.25)",transition:"height 0ms, border 0ms"})}this.dateQueue[0]||this.dateQueue[1]?this.#d.prop("disabled",!1):this.#d.prop("disabled",!0),this.isRollbackable()?this.#i.prop("disabled",!1):this.#i.prop("disabled",!0)}setCurrentMonth(){this.calendarMonth.setFullYear(this.today.getFullYear(),this.today.getMonth()),this.updateCalendar()}}d()(".js-datepicker").each(((t,e)=>{new k(e).init()}))},912:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){t.data.dropdown.open(),t.data.dropdown.setTimeFocus(t.timeStamp)}function o(t){t.data.dropdown.$dropdown.hasClass("dropdown_keeping-focus")?t.data.dropdown.$dropdown.removeClass("dropdown_keeping-focus"):(t.data.dropdown.isRollbackable()&&t.data.dropdown.rollback(),t.data.dropdown.close())}function r(t){const e=t.data.dropdown.getCommonValue();t.data.dropdown.$dropdown__value.text(e),t.data.dropdown.$dropdown__buttons.each(((a,s)=>{const i=d()(s);i.hasClass("js-dropdown__button_action_clear")?e===t.data.dropdown.defaultValue?i.prop("disabled",!0):i.prop("disabled",!1):t.data.dropdown.isRollbackable()?i.prop("disabled",!1):i.prop("disabled",!0)}))}function n(t){Math.abs(t.timeStamp-t.data.dropdown.timeFocus)<50||(t.data.dropdown.$dropdown.hasClass("dropdown_open")?t.data.dropdown.close():t.data.dropdown.open())}function p(t){const e=d()(".js-dropdown__quantity",d()(t.delegateTarget)),a=d()(t.target);let s=parseInt(e.val(),10);a.hasClass("js-dropdown__counter-button_action_plus")?s+=1:s-=1,s>0&&s<99&&(t.data.dropdown.$dropdown.addClass("dropdown_keeping-focus"),a.addClass("js-dropdown__counter-button_pressed")),e.val(s).trigger("input")}function c(t){const e=d()(t.target);e.hasClass("js-dropdown__counter-button_pressed")&&(e.removeClass("js-dropdown__counter-button_pressed"),t.data.dropdown.$dropdown.trigger("focus"))}function l({value:t=0,cases:e="units"}={}){if(0===t)return"";let[,a,s,d]=e.split(" ");void 0===a&&(a=e),void 0===s&&(s=a),void 0===d&&(d=s);const i=t%100,o=t%10;return i>4&&i<21||o>4||0===o?`${t} ${d}`:1===o?`${t} ${a}`:`${t} ${s}`}function u(t){const e=d()(t.delegateTarget),a=parseInt(d()(t.target).val(),10);d()(".js-dropdown__counter-button",e).each(((t,e)=>{const s=d()(e);s.hasClass("js-dropdown__counter-button_action_plus")?a<99?s.prop("disabled",!1):s.prop("disabled",!0):a>0?s.prop("disabled",!1):s.prop("disabled",!0)})),e.attr("data-value",l({value:a,cases:e.data("units")})),e.attr("data-quantity",a)}function _(t){t.preventDefault()}function h(t){const e=d()(t.target);if(e.prop("disabled",!0),e.hasClass("js-dropdown__button_action_clear"))return t.data.dropdown.clearSnapshot(),void t.data.dropdown.$dropdown__quantities.each(((t,e)=>{d()(e).val(0).trigger("input")}));t.data.dropdown.takeSnapshot(),t.data.dropdown.close()}class ${#r=[];#n=!1;#p=d()();#c=d()();#l="";#u="42px";constructor(t){this.$dropdown=d()(t),this.defaultValue=t.dataset.defaultValue}init(){this.timeFocus=0,this.$dropdown__value=d()(".js-dropdown__value",this.$dropdown),this.#c=d()(d()(".js-dropdown__item",this.$dropdown).get().reverse()),this.#p=d()(".js-dropdown__down",this.$dropdown),this.$dropdown__quantities=d()(d()(".js-dropdown__quantity",this.$dropdown).get().reverse()),this.$dropdown__buttons=d()(".js-dropdown__button",this.$dropdown),this.#n=this.$dropdown.hasClass("dropdown_guest");let t=51,e=0;this.#c.each(((a,s)=>{const i=d()(s);d()(".js-dropdown__label",i).text(s.dataset.units.split(" ")[0]),d()(".js-dropdown__quantity",i).val(0),t+=37,e+=100,this.#r.push("0")})),this.$dropdown__buttons.length&&(t+=40,e+=100),this.#l=`${t}px`;const a=this.$dropdown.data("z-index");this.#p.css({transition:`height ${e}ms`,height:this.#u,"z-index":()=>2*a-1});const s=this.$dropdown.data("dropdown-name");this.#c.on(`mousedown.dropdown__counter-button.${s}`,".js-dropdown__counter-button",{dropdown:this},p).on(`mouseup.dropdown__counter-button.${s} mouseout.dropdown__counter-button.${s}`,".js-dropdown__counter-button",{dropdown:this},c).on(`input.dropdown__quantity.${s}`,".js-dropdown__quantity",{dropdown:this},u),d()(".js-dropdown__drop",this.$dropdown).css({transition:`border ${e}ms`,"z-index":()=>2*a}).on(`mousedown.dropdown__drop.${s}`,null,{dropdown:this},n),this.$dropdown.on(`focus.dropdown.${s}`,null,{dropdown:this},i).on(`blur.dropdown.${s}`,null,{dropdown:this},o).on(`input.dropdown.${s}`,null,{dropdown:this},r).on(`mousedown.dropdown__quantity.${s}`,".dropdown__quantity",_).on(`mousedown.dropdown__button.${s}`,".dropdown__button",{dropdown:this},h)}open(){this.$dropdown.addClass("dropdown_open"),this.#p.css("height",this.#l)}close(){this.$dropdown.removeClass("dropdown_open"),this.#p.css("height",this.#u)}isRollbackable(){if(!this.$dropdown.hasClass("dropdown_rollbackable"))return!1;let t=!1;return this.$dropdown__quantities.each(((e,a)=>{this.#r[e]!==d()(a).val()&&(t=!0)})),t}setTimeFocus(t){this.timeFocus=t}getCommonValue(){let t="",e=0;if(this.#n){const t=this.#c.get(0),e=this.#c.get(1);let a=0;e&&(a=parseInt(e.dataset.quantity,10)||0,e.dataset.value=""),t&&(a+=parseInt(t.dataset.quantity,10)||0,t.dataset.value=l({value:a,cases:t.dataset.units}))}return this.#c.each(((a,s)=>{""!==s.dataset.value&&(2===e?t+="...":e<2&&(""===t?t=s.dataset.value:t+=`, ${s.dataset.value}`),e+=1)})),""===t?this.defaultValue:t}takeSnapshot(){this.#c.each(((t,e)=>{this.#r[t]=e.dataset.quantity}))}clearSnapshot(){this.#r.forEach(((t,e)=>{this.#r[e]="0"}))}rollback(){this.$dropdown__quantities.each(((t,e)=>{d()(e).val(this.#r[t]).trigger("input")}))}}d()(".js-dropdown").each(((t,e)=>{new $(e).init()}))},610:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){const{$email:e,$submit:a}=t.data;var s;a.prop("disabled",(s=e.val(),!String(s).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))}class o{#_;constructor(t){this.#_=d()(t)}init(){this.$submit=d()(".js-subscription__button",this.#_),this.$email=d()(".js-subscription__input",this.#_),this.$email.on("input",null,{$email:this.$email,$submit:this.$submit},i)}}d()(".js-subscription").each(((t,e)=>{new o(e).init()}))},718:(t,e,a)=>{const s=a(849);s.keys().forEach(s)},849:(t,e,a)=>{var s={"./android-chrome-192x192.png":50,"./android-chrome-512x512.png":359,"./apple-touch-icon.png":723,"./browserconfig.xml":418,"./favicon-16x16.png":225,"./favicon-32x32.png":916,"./favicon.ico":914,"./mstile-144x144.png":714,"./mstile-150x150.png":443,"./mstile-310x150.png":898,"./mstile-310x310.png":132,"./mstile-70x70.png":809,"./safari-pinned-tab.svg":4,"./site.webmanifest":48};function d(t){var e=i(t);return a(e)}function i(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}d.keys=function(){return Object.keys(s)},d.resolve=i,t.exports=d,d.id=849},50:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/android-chrome-192x192.png"},359:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/android-chrome-512x512.png"},723:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/apple-touch-icon.png"},418:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/browserconfig.xml"},225:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/favicon-16x16.png"},916:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/favicon-32x32.png"},914:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/favicon.ico"},714:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-144x144.png"},443:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-150x150.png"},898:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-310x150.png"},132:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-310x310.png"},809:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-70x70.png"},4:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/safari-pinned-tab.svg"},48:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/site.webmanifest"},902:(t,e,a)=>{"use strict";a(532),a(554),a(485),a(912),a(610),a(718)}},t=>{var e;e=902,t(t.s=e)}]);
//# sourceMappingURL=index.js.map