(self.webpackChunkNikolayKaurov_github_io=self.webpackChunkNikolayKaurov_github_io||[]).push([[438],{213:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){const{$days:e,$totalPrice:a,$total:s,$submit:d,$arrival:i,$departure:r,$adult:n,price:o,discount:c,fee:p,feeAdd:l}=t.data.card,_=r.val()&&i.val()&&parseInt(n.val(),10);if(d.prop("disabled",!_),r.val()&&i.val()){const t=(Date.parse(r.val())-Date.parse(i.val()))/864e5;let d;d=t%10==1&&t%100!=11?" сутки":" суток",e.text(`${t}${d}`),a.text(`${new Intl.NumberFormat("ru-RU").format(t*o)}₽`),s.text(`${new Intl.NumberFormat("ru-RU").format(t*o+p+l-c)}₽`)}else e.text("0 суток"),a.text("0₽"),s.text("0₽")}class r{constructor(t){this.$card=d()(t),this.price=parseFloat(t.dataset.price),this.discount=parseFloat(t.dataset.discount),this.fee=parseFloat(t.dataset.fee),this.feeAdd=parseFloat(t.dataset.feeadd)}init(){this.$days=d()(".js-card-details__calc-days",this.$card),this.$totalPrice=d()(".js-card-details__total-price",this.$card),this.$total=d()(".js-card-details__total",this.$card),this.$submit=d()(".js-button",this.$card),this.$arrival=d()(".js-datepicker__input_date_arrival",this.$card),this.$departure=d()(".js-datepicker__input_date_departure",this.$card),this.$adult=d()('.js-dropdown__quantity[name="details-guest-adult"]',this.$card),this.$card.on("input",null,{card:this},i)}}d()(".js-card-details").each(((t,e)=>{new r(e).init()}))},906:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){var e;!Number.isNaN(Date.parse(t.data.card.$birth.val().split(".").reverse().join("-")))&&t.data.card.$birth.val().match(/^\d{2}\.\d{2}\.\d{4}$/)&&t.data.card.$name.val()&&t.data.card.$surname.val()&&(e=t.data.card.$email.val(),String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))&&t.data.card.$password.val().length>7?t.data.card.$submit.prop("disabled",!1):t.data.card.$submit.prop("disabled",!0)}class r{constructor(t){this.$card=d()(t);const e=d()(".js-text-field__input",this.$card);this.$name=d()(e.get(0)),this.$surname=d()(e.get(1)),this.$birth=d()(e.get(2)),this.$email=d()(e.get(3)),this.$password=d()(e.get(4)),this.$submit=d()(d()(".js-button__input",this.$card).get(0))}init(){this.$card.on("input",null,{card:this},i)}}d()(".js-card-registration").each(((t,e)=>{new r(e).init()}))},929:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){let e=parseInt(t.data.$card.attr("data-slide"),10);e-=1,e<0&&(e=3),t.data.$card.attr("data-slide",e)}function r(t){let e=parseInt(t.data.$card.attr("data-slide"),10);e+=1,e>3&&(e=0),t.data.$card.attr("data-slide",e)}function n(t){t.data.$card.attr("data-slide",parseInt(t.target.dataset.slide,10))}class o{constructor(t){this.$card=d()(t),this.$back=d()(".js-card-room__back",this.$card),this.$forward=d()(".js-card-room__forward",this.$card),this.$nav=d()(".js-card-room__nav",this.$card)}init(){this.$back.on("mousedown",null,{$card:this.$card},i),this.$forward.on("mousedown",null,{$card:this.$card},r),this.$nav.on("mousedown",".js-card-room__nav-item",{$card:this.$card},n)}}d()(".js-card-room").each(((t,e)=>{new o(e).init()}))},554:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){parseInt(t.data.card.$adult.val(),10)&&t.data.card.$arrival.val()&&t.data.card.$departure.val()?t.data.card.$submit.prop("disabled",!1):t.data.card.$submit.prop("disabled",!0)}class r{constructor(t){this.$card=d()(t),this.$arrival=d()(".js-datepicker__input_arrival",this.$card),this.$departure=d()(".js-datepicker__input_departure",this.$card),this.$adult=d()(d()(".js-dropdown__quantity",this.$card).get(2)),this.$submit=d()(".js-button__input",this.$card)}init(){this.$card.on("input",null,{card:this},i)}}d()(".js-card-search").each(((t,e)=>{new r(e).init()}))},378:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){var e;e=t.data.card.$email.val(),String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)&&t.data.card.$password.val().length>7?t.data.card.$submit.prop("disabled",!1):t.data.card.$submit.prop("disabled",!0)}class r{constructor(t){this.$card=d()(t),this.$email=d()(d()(".js-text-field__input",this.$card).get(0)),this.$password=d()(d()(".js-text-field__input",this.$card).get(1)),this.$submit=d()(".js-button__input",this.$card)}init(){this.$card.on("input",null,{card:this},i)}}d()(".js-card-sign").each(((t,e)=>{new r(e).init()}))},379:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);d()(".js-checkbox").each(((t,e)=>{d()(".js-checkbox__button",d()(e)).each(((t,a)=>{d()(a).attr("id",`${d()(e).data("name")}-${d()(a).data("name")}`),d()(a).attr("name",`${d()(e).data("name")}-${d()(a).data("name")}`),d()(`.js-checkbox__button-label[data-name='${d()(a).data("name")}']`,d()(e)).attr("for",`${d()(e).data("name")}-${d()(a).data("name")}`)}))}))},485:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);const i=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],r=["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"];function n(t){d()(t.target).addClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.open(),t.data.datepicker.setTimeFocus(t.timeStamp)}function o(t){const{$datepicker:e}=t.data.datepicker;e.hasClass("datepicker_keeping-open")?e.removeClass("datepicker_keeping-open"):(d()(t.target).removeClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.isOpen()||(t.data.datepicker.isRollbackable()&&t.data.datepicker.rollback(),t.data.datepicker.close()))}function c(t){if(Math.abs(t.timeStamp-t.data.datepicker.timeFocus)<50)return;const e=d()(t.delegateTarget);e.hasClass("js-datepicker__expand_open")?(e.removeClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.close()):(e.addClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.open())}function p(t){const{$expandDeparture:e}=t.data.datepicker;9===t.which&&e.addClass("datepicker__expand_open js-datepicker__expand_open")}function l(t){const{$datepicker:e,$down:a}=t.data.datepicker;e.addClass("datepicker_keeping-open"),a.addClass("datepicker__down_pressed")}function _(t){const{$datepicker:e,$down:a}=t.data.datepicker;a.hasClass("datepicker__down_pressed")&&(a.removeClass("datepicker__down_pressed"),d()(".js-datepicker__expand_open",e).trigger("focus"))}function h(t){t.setCurrentMonth()}function u(t){const e=d()(t.target),{dateQueue:a,today:s,calendarMonth:i,$arrival:r,$departure:n,$expandArrival:o,$expandDeparture:c,$valueArrival:p,$valueDeparture:l,$valueFilter:_}=t.data.datepicker;if(e.hasClass("js-datepicker__button_action_month-minus"))i.setMonth(i.getMonth()-1),s.getFullYear()===i.getFullYear()&&s.getMonth()===i.getMonth()||t.data.datepicker.setTimerClick(setTimeout(h,1e3,t.data.datepicker));else if(e.hasClass("js-datepicker__button_action_month-plus"))i.setMonth(i.getMonth()+1);else{if(!e.hasClass("js-datepicker__button_action_clear"))return e.prop("disabled",!0),r.val(o.attr("data-date")),n.val(c.attr("data-date")).trigger("input"),void t.data.datepicker.close();a[0]="",a[1]="",o.attr("data-date",""),c.attr("data-date",""),p.text("ДД.ММ.ГГГГ"),l.text("ДД.ММ.ГГГГ"),_.text("Укажите даты пребывания"),r.val(""),n.val("").trigger("input")}t.data.datepicker.updateCalendar()}function $(t){clearTimeout(t.data.datepicker.timerClick)}function k(t){const e=d()(t.target),{dateQueue:a,$datepicker:s,$expandArrival:i,$expandDeparture:n,$valueArrival:o,$valueDeparture:c,$valueFilter:p}=t.data.datepicker;if(!e.hasClass("datepicker__cell_clickable"))return;const l=e.data("date"),_=d()(".js-datepicker__expand_open",s),h=_.hasClass("js-datepicker__expand_date_arrival")||_.hasClass("js-datepicker__expand_date_departure");if(h?a[1]===_.attr("data-date")?a[1]=l:a[0]=l:(a.push(l),a.shift()),""===a[0]){h?(_.attr("data-date",l),d()(".js-datepicker__value",_).text(l.split("-").reverse().join("."))):(i.attr("data-date",l),o.text(l.split("-").reverse().join(".")));const t=new Date(l);p.text(`${t.getDate()} ${r[t.getMonth()]}`)}else{let t,e;a[0]>a[1]?[e,t]=a:[t,e]=a;const s=new Date(t),d=new Date(e);i.attr("data-date",t),o.text(t.split("-").reverse().join(".")),n.attr("data-date",e),c.text(e.split("-").reverse().join(".")),p.text(`${s.getDate()} ${r[s.getMonth()]} - ${d.getDate()} ${r[d.getMonth()]}`)}h&&(i.attr("data-date")===l?(n.addClass("js-datepicker__expand_open datepicker__expand_open"),i.removeClass("js-datepicker__expand_open datepicker__expand_open")):(n.removeClass("js-datepicker__expand_open datepicker__expand_open"),i.addClass("js-datepicker__expand_open datepicker__expand_open"))),t.data.datepicker.updateCalendar()}class w{#t=1;#e;#a;#s;#d;#i;constructor(t){this.$datepicker=d()(t)}init(){this.timeFocus=0,this.timerClick=0;const t=new Date;this.today=new Date(t.getFullYear(),t.getMonth(),t.getDate()),this.calendarMonth=new Date(t.getFullYear(),t.getMonth()),this.dateQueue=["",""],this.$arrival=d()(".js-datepicker__input_date_arrival",this.$datepicker),this.$departure=d()(".js-datepicker__input_date_departure",this.$datepicker);const e=2*this.$datepicker.data("z-index")-1,a=this.$datepicker.data("name");this.$down=d()(".js-datepicker__down",this.$datepicker).css({"z-index":e}).on(`mousedown.datepicker__down.${a}`,null,{datepicker:this},l).on(`mouseup.datepicker__down.${a} mouseout.datepicker__down.${a}`,null,{datepicker:this},_).on(`mousedown.datepicker__button.${a}`,".js-datepicker__button",{datepicker:this},u),this.$datepicker.on(`focusin.datepicker__expand.${a}`,".js-datepicker__expand",{datepicker:this},n).on(`focusout.datepicker__expand.${a}`,".js-datepicker__expand",{datepicker:this},o),d()(".js-datepicker__expand",this.$datepicker).on(`mousedown.datepicker__expand.${a}`,null,{datepicker:this},c),this.$expandArrival=d()(".js-datepicker__expand_date_arrival",this.$datepicker).on(`keydown.datepicker__expand_date_arrival.${a}`,null,{datepicker:this},p),this.$valueArrival=d()(".js-datepicker__value",this.$expandArrival),this.$expandDeparture=d()(".js-datepicker__expand_date_departure",this.$datepicker),this.$valueDeparture=d()(".js-datepicker__value",this.$expandDeparture),this.$expandFilter=d()(".js-datepicker__expand_format_filter",this.$datepicker),this.$valueFilter=d()(".js-datepicker__value",this.$expandFilter),this.#e=d()(".js-datepicker__button_action_month-minus",this.$down).on(`mouseup.month-minus.${a} mouseout.month-minus.${a}`,null,{datepicker:this},$),this.#a=d()(".js-datepicker__month-year",this.$down),this.#s=d()(".js-datepicker__button_action_clear",this.$down),this.#d=d()(".js-datepicker__button_action_confirm",this.$down),this.#i=d()(".js-datepicker__calendar",this.$down).on(`mousedown.datepicker__cell.${a}`,".js-datepicker__cell",{datepicker:this},k),this.updateCalendar()}open(){const t=129+this.#t*parseInt(d()("td",this.#i).css("height"),10);this.$down.css({height:`${t}px`,border:"1px solid rgba(31, 32, 65, 0.25)",transition:"height 500ms, border 500ms"})}close(){this.$expandArrival.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$expandDeparture.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$expandFilter.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$down.css({height:"0px",border:"0px solid rgba(31, 32, 65, 0)",transition:"height 500ms, border 500ms"})}setTimeFocus(t){this.timeFocus=t}setTimerClick(t){this.timerClick=t}isRollbackable(){return!(this.dateQueue[0]===this.$arrival.val()&&this.dateQueue[1]===this.$departure.val()||this.dateQueue[1]===this.$arrival.val()&&this.dateQueue[0]===this.$departure.val())}rollback(){let t=this.$arrival.val();const e=this.$departure.val();if(this.$expandArrival.attr("data-date",t),this.$expandDeparture.attr("data-date",e),t?this.$valueArrival.text(t.split("-").reverse().join(".")):this.$valueArrival.text("ДД.ММ.ГГГГ"),e?this.$valueDeparture.text(e.split("-").reverse().join(".")):this.$valueDeparture.text("ДД.ММ.ГГГГ"),this.dateQueue[0]=t,this.dateQueue[1]=e,""===t&&""===e)this.$valueFilter.text("Укажите даты пребывания");else if(""!==t&&""!==e){const a=new Date(t),s=new Date(e);this.$valueFilter.text(`${a.getDate()} ${r[a.getMonth()]} - ${s.getDate()} ${r[s.getMonth()]}`)}else{t=`${t}${e}`;const a=new Date(t);this.$valueFilter.text(`${a.getDate()} ${r[a.getMonth()]}`),this.dateQueue[0]="",this.dateQueue[1]=t}this.updateCalendar()}isOpen(){return d()(".js-datepicker__expand_open",this.$datepicker).length>0||this.$datepicker.hasClass("datepicker_format_demo")}updateCalendar(){this.today.getMonth()===this.calendarMonth.getMonth()&&this.today.getFullYear()===this.calendarMonth.getFullYear()?this.#e.prop("disabled",!0):this.#e.prop("disabled",!1),this.#a.text(`${i[this.calendarMonth.getMonth()]} ${this.calendarMonth.getFullYear()}`);const t=new Date(this.calendarMonth.getFullYear(),this.calendarMonth.getMonth()),e=t.getDay()?t.getDay()-1:6;t.setDate(t.getDate()-e);const a=!!this.dateQueue[0]&&!!this.dateQueue[1];let s=new Date(this.dateQueue[0]),r=new Date(this.dateQueue[1]);s.setHours(0,0,0),r.setHours(0,0,0),a&&s>r&&([s,r]=[r,s]),this.#t=1;let n='<tr class="datepicker__calendar-header"><th class="datepicker__cell">Пн</th><th class="datepicker__cell">Вт</th><th class="datepicker__cell">Ср</th><th class="datepicker__cell">Чт</th><th class="datepicker__cell">Пт</th><th class="datepicker__cell">Сб</th><th class="datepicker__cell">Вс</th></tr>';do{this.#t+=1,n+='<tr class="datepicker__row">';for(let e=0;e<7;e+=1){let d="",i="";t.getTime()===s.getTime()||t.getTime()===r.getTime()?d+=" datepicker__cell_selected":t.getTime()===this.today.getTime()?d+=" datepicker__cell_date_today datepicker__cell_clickable":t>this.today&&(d+=" datepicker__cell_clickable"),t.getMonth()!==this.calendarMonth.getMonth()&&(d+=" datepicker__cell_date_other-month"),a&&(t.getTime()===s.getTime()?e<6&&(i='<div class="datepicker__cell-period datepicker__cell-period_date_arrival"></div>'):t.getTime()===r.getTime()?e>0&&(i='<div class="datepicker__cell-period datepicker__cell-period_date_departure"></div>'):s<t&&t<r&&(i=0===e?'<div class="datepicker__cell-period datepicker__cell-period_date_monday"></div>':6===e?'<div class="datepicker__cell-period datepicker__cell-period_date_sunday"></div>':'<div class="datepicker__cell-period"></div>'));const o=t.getMonth()<9?"0":"",c=t.getDate()<10?"0":"";n+=`<td class="js-datepicker__cell datepicker__cell${d}" data-date="${t.getFullYear()}-${o}${t.getMonth()+1}-${c}${t.getDate()}">${t.getDate()}${i}</td>`,t.setDate(t.getDate()+1)}n+="</tr>"}while(t.getMonth()===this.calendarMonth.getMonth());if(this.#i.html(n),this.isOpen()){const t=129+this.#t*parseInt(d()("td",this.#i).css("height"),10);this.$down.css({height:`${t}px`,border:"1px solid rgba(31, 32, 65, 0.25)",transition:"height 0ms, border 0ms"})}this.dateQueue[0]||this.dateQueue[1]?this.#s.prop("disabled",!1):this.#s.prop("disabled",!0),this.isRollbackable()?this.#d.prop("disabled",!1):this.#d.prop("disabled",!0)}setCurrentMonth(){this.calendarMonth.setFullYear(this.today.getFullYear(),this.today.getMonth()),this.updateCalendar()}}d()(".js-datepicker").each(((t,e)=>{new w(e).init()}))},912:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){t.data.dropdown.open(),t.data.dropdown.setTimeFocus(t.timeStamp)}function r(t){t.data.dropdown.$dropdown.hasClass("dropdown_keeping-focus")?t.data.dropdown.$dropdown.removeClass("dropdown_keeping-focus"):(t.data.dropdown.isRollbackable()&&t.data.dropdown.rollback(),t.data.dropdown.close())}function n(t){const e=t.data.dropdown.getCommonValue();t.data.dropdown.$dropdown__value.text(e),t.data.dropdown.$dropdown__buttons.each(((a,s)=>{const i=d()(s);i.hasClass("js-dropdown__button_action_clear")?e===t.data.dropdown.defaultValue?i.prop("disabled",!0):i.prop("disabled",!1):t.data.dropdown.isRollbackable()?i.prop("disabled",!1):i.prop("disabled",!0)}))}function o(t){Math.abs(t.timeStamp-t.data.dropdown.timeFocus)<50||(t.data.dropdown.$dropdown.hasClass("dropdown_open")?t.data.dropdown.close():t.data.dropdown.open())}function c(t){const e=d()(".js-dropdown__quantity",d()(t.delegateTarget)),a=d()(t.target);let s=parseInt(e.val(),10);a.hasClass("js-dropdown__counter-button_action_plus")?s+=1:s-=1,s>0&&s<99&&(t.data.dropdown.$dropdown.addClass("dropdown_keeping-focus"),a.addClass("js-dropdown__counter-button_pressed")),e.val(s).trigger("input")}function p(t){const e=d()(t.target);e.hasClass("js-dropdown__counter-button_pressed")&&(e.removeClass("js-dropdown__counter-button_pressed"),t.data.dropdown.$dropdown.trigger("focus"))}function l({value:t=0,cases:e="units"}={}){if(0===t)return"";let[,a,s,d]=e.split(" ");void 0===a&&(a=e),void 0===s&&(s=a),void 0===d&&(d=s);const i=t%100,r=t%10;return i>4&&i<21||r>4||0===r?`${t} ${d}`:1===r?`${t} ${a}`:`${t} ${s}`}function _(t){const e=d()(t.delegateTarget),a=parseInt(d()(t.target).val(),10);d()(".js-dropdown__counter-button",e).each(((t,e)=>{const s=d()(e);s.hasClass("js-dropdown__counter-button_action_plus")?a<99?s.prop("disabled",!1):s.prop("disabled",!0):a>0?s.prop("disabled",!1):s.prop("disabled",!0)})),e.attr("data-value",l({value:a,cases:e.data("units")})),e.attr("data-quantity",a)}function h(t){t.preventDefault()}function u(t){const e=d()(t.target);if(e.prop("disabled",!0),e.hasClass("js-dropdown__button_action_clear"))return t.data.dropdown.clearSnapshot(),void t.data.dropdown.$dropdown__quantities.each(((t,e)=>{d()(e).val(0).trigger("input")}));t.data.dropdown.takeSnapshot(),t.data.dropdown.close()}class ${#r=[];#n=!1;#o=d()();#c=d()();#p="";#l="42px";constructor(t){this.$dropdown=d()(t),this.defaultValue=t.dataset.defaultValue}init(){this.timeFocus=0,this.$dropdown__value=d()(".js-dropdown__value",this.$dropdown),this.#c=d()(d()(".js-dropdown__item",this.$dropdown).get().reverse()),this.#o=d()(".js-dropdown__down",this.$dropdown),this.$dropdown__quantities=d()(d()(".js-dropdown__quantity",this.$dropdown).get().reverse()),this.$dropdown__buttons=d()(".js-dropdown__button",this.$dropdown),this.#n=this.$dropdown.hasClass("dropdown_guest");let t=51,e=0;this.#c.each(((a,s)=>{const i=d()(s);d()(".js-dropdown__label",i).text(s.dataset.units.split(" ")[0]),d()(".js-dropdown__quantity",i).val(0),t+=37,e+=100,this.#r.push("0")})),this.$dropdown__buttons.length&&(t+=40,e+=100),this.#p=`${t}px`;const a=this.$dropdown.data("z-index");this.#o.css({transition:`height ${e}ms`,height:this.#l,"z-index":()=>2*a-1});const s=this.$dropdown.data("dropdown-name");this.#c.on(`mousedown.dropdown__counter-button.${s}`,".js-dropdown__counter-button",{dropdown:this},c).on(`mouseup.dropdown__counter-button.${s} mouseout.dropdown__counter-button.${s}`,".js-dropdown__counter-button",{dropdown:this},p).on(`input.dropdown__quantity.${s}`,".js-dropdown__quantity",{dropdown:this},_),d()(".js-dropdown__drop",this.$dropdown).css({transition:`border ${e}ms`,"z-index":()=>2*a}).on(`mousedown.dropdown__drop.${s}`,null,{dropdown:this},o),this.$dropdown.on(`focus.dropdown.${s}`,null,{dropdown:this},i).on(`blur.dropdown.${s}`,null,{dropdown:this},r).on(`input.dropdown.${s}`,null,{dropdown:this},n).on(`mousedown.dropdown__quantity.${s}`,".dropdown__quantity",h).on(`mousedown.dropdown__button.${s}`,".dropdown__button",{dropdown:this},u)}open(){this.$dropdown.addClass("dropdown_open"),this.#o.css("height",this.#p)}close(){this.$dropdown.removeClass("dropdown_open"),this.#o.css("height",this.#l)}isRollbackable(){if(!this.$dropdown.hasClass("dropdown_rollbackable"))return!1;let t=!1;return this.$dropdown__quantities.each(((e,a)=>{this.#r[e]!==d()(a).val()&&(t=!0)})),t}setTimeFocus(t){this.timeFocus=t}getCommonValue(){let t="",e=0;if(this.#n){const t=this.#c.get(0),e=this.#c.get(1);let a=0;e&&(a=parseInt(e.dataset.quantity,10)||0,e.dataset.value=""),t&&(a+=parseInt(t.dataset.quantity,10)||0,t.dataset.value=l({value:a,cases:t.dataset.units}))}return this.#c.each(((a,s)=>{""!==s.dataset.value&&(2===e?t+="...":e<2&&(""===t?t=s.dataset.value:t+=`, ${s.dataset.value}`),e+=1)})),""===t?this.defaultValue:t}takeSnapshot(){this.#c.each(((t,e)=>{this.#r[t]=e.dataset.quantity}))}clearSnapshot(){this.#r.forEach(((t,e)=>{this.#r[e]="0"}))}rollback(){this.$dropdown__quantities.each(((t,e)=>{d()(e).val(this.#r[t]).trigger("input")}))}}d()(".js-dropdown").each(((t,e)=>{new $(e).init()}))},877:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);d()(".js-radio").each(((t,e)=>{d()(".js-radio__button",d()(e)).each(((t,a)=>{d()(a).attr("id",`${d()(e).data("name")}-${d()(a).data("name")}`),d()(a).attr("name",`${d()(e).data("name")}`),d()(`.js-radio__button-label[data-name='${d()(a).data("name")}']`,d()(e)).attr("for",`${d()(e).data("name")}-${d()(a).data("name")}`)}))}))},234:(t,e,a)=>{"use strict";var s=a(755),d=a.n(s);function i(t){t.preventDefault()}function r(t){const e=t.target,a=d()(t.target);let s=e.selectionStart,i=a.val();const{length:r}=i;console.log(r);const{preValue:n,$double:o}=t.data.textField;if(n.length>r)i.match(/^(\d{0,2}\.?|\d{0,2}\.\d{0,2}\.?|\d{0,2}\.\d{0,2}\.\d{0,4})$/)?(i=i.replace(/\.$/,""),i=i.replace(/\.$/,"")):i=n;else if(i.match(/^(\d{0,3}|\d{0,2}\.\d{1,3}|\d{0,2}\.\d{0,2}\.\d{1,4})$/)){let t,e,a,d=0;if(i.match(/^3[2-9]$/)&&(i=`0${i}`,d+=1),i.match(/^\d{0,2}\.1[3-9]$/)&&(i=`${i.slice(0,i.length)}`,d+=1),i.match(/^\d{3}$/)?(t=i.slice(0,2),e=i.slice(2)):i.match(/^\d{0,2}\.\d{3}$/)?([t,e]=i.slice(0,i.length-1).split("."),a=i[i.length-1]):[t,e,a]=i.split("."),function(t,e,a){let s;s=t?parseInt(t,10):0;let d,i,r="00"===t||s>31;return!r&&(d=e?parseInt(e,10):0,r="00"===e||d>12,!r&&(i=!a||a.length<4&&a.match(/^(19|20)/)||1===a.length||3===a.length?0:2===a.length?parseInt(a,10)<30?parseInt(`20${a}`,10):parseInt(`19${a}`,10):parseInt(a,10),r=s>29&&2===d||s>28&&2===d&&(i%4!=0||1900===i),!r&&(r=31===s&&[4,6,9,10].includes(d),!r)))}(t,e,a)){if(t&&t.match(/^[4-9]$/)&&(t=`0${t}`),e&&e.match(/^[2-9]$/)&&(e=`0${e}`),a){2===a.length&&!a.match(/^(19|20)$/)&&(a=parseInt(a,10)<30?parseInt(`20${a}`,10):parseInt(`19${a}`,10))}const s=[];void 0!==t&&s.push(t),void 0!==e&&s.push(e),void 0!==a&&s.push(a),i=s.join(".")}else i=n,s-=1}else i=n,s-=1;a.val(i),o.attr("placeholder",function(t){const e="ДД.ММ.ГГГГ".split("");return t.split("").forEach(((t,a)=>{e[a]=t})),e.join("")}(i)),e.setSelectionRange(s,s),t.data.textField.setPreValue(i)}function n(t){const e=d()(t.target),a=e.val();a.match(/^\d{2}\.\d{2}\.\d{4}$/)&&!Number.isNaN(Date.parse(a.split(".").reverse().join("-")))||""===a?e.removeClass("text-field__input_invalid"):e.addClass("text-field__input_invalid")}class o{constructor(t){this.$textField=d()(t)}init(){d()(".js-text-field__input",this.$textField).attr("placeholder","").on("input",null,{textField:this},r).on("change",null,{textField:this},n).on("paste",i),d()(".js-text-field__wrapper",this.$textField).append('<input\n          type="text"\n          class="text-field__input text-field__input_double js-text-field__input js-text-field__input_double"\n          disabled\n          placeholder="ДД.ММ.ГГГГ"\n        >'),this.$double=d()(".js-text-field__input_double",this.$textField),this.preValue=""}setPreValue(t){this.preValue=t}}d()(".js-text-field_mask_date").each(((t,e)=>{new o(e).init()}))},718:(t,e,a)=>{const s=a(849);s.keys().forEach(s)},849:(t,e,a)=>{var s={"./android-chrome-192x192.png":50,"./android-chrome-512x512.png":359,"./apple-touch-icon.png":723,"./browserconfig.xml":418,"./favicon-16x16.png":225,"./favicon-32x32.png":916,"./favicon.ico":914,"./mstile-144x144.png":714,"./mstile-150x150.png":443,"./mstile-310x150.png":898,"./mstile-310x310.png":132,"./mstile-70x70.png":809,"./safari-pinned-tab.svg":4,"./site.webmanifest":48};function d(t){var e=i(t);return a(e)}function i(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}d.keys=function(){return Object.keys(s)},d.resolve=i,t.exports=d,d.id=849},50:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/android-chrome-192x192.png"},359:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/android-chrome-512x512.png"},723:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/apple-touch-icon.png"},418:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/browserconfig.xml"},225:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/favicon-16x16.png"},916:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/favicon-32x32.png"},914:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/favicon.ico"},714:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-144x144.png"},443:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-150x150.png"},898:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-310x150.png"},132:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-310x310.png"},809:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/mstile-70x70.png"},4:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/safari-pinned-tab.svg"},48:(t,e,a)=>{"use strict";a.r(e),a.d(e,{default:()=>s});const s=a.p+"assets/favicons/site.webmanifest"},841:(t,e,a)=>{"use strict";a(554),a(485),a(912),a(906),a(234),a(877),a(379),a(213),a(378),a(929),a(718)}},t=>{var e;e=841,t(t.s=e)}]);
//# sourceMappingURL=Cards.js.map