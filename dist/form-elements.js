(self.webpackChunkNikolayKaurov_github_io=self.webpackChunkNikolayKaurov_github_io||[]).push([[466],{485:(t,e,s)=>{"use strict";var i=s(755),a=s.n(i);const d=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],r=["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"];function o(t){a()(t.target).addClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.open(),t.data.datepicker.setTimeFocus(t.timeStamp)}function n(t){const{$datepicker:e}=t.data.datepicker;e.hasClass("datepicker_keeping-open")?e.removeClass("datepicker_keeping-open"):(a()(t.target).removeClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.isOpen()||(t.data.datepicker.isRollbackable()&&t.data.datepicker.rollback(),t.data.datepicker.close()))}function l(t){if(Math.abs(t.timeStamp-t.data.datepicker.timeFocus)<50)return;const e=a()(t.delegateTarget);e.hasClass("js-datepicker__expand_open")?(e.removeClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.close()):(e.addClass("datepicker__expand_open js-datepicker__expand_open"),t.data.datepicker.open())}function h(t){const{$expandDeparture:e}=t.data.datepicker;9===t.which&&e.addClass("datepicker__expand_open js-datepicker__expand_open")}function c(t){const{$datepicker:e,$down:s}=t.data.datepicker;e.addClass("datepicker_keeping-open"),s.addClass("datepicker__down_pressed")}function p(t){const{$datepicker:e,$down:s}=t.data.datepicker;s.hasClass("datepicker__down_pressed")&&(s.removeClass("datepicker__down_pressed"),a()(".js-datepicker__expand_open",e).trigger("focus"))}function u(t){t.setCurrentMonth()}function _(t){const e=a()(t.target),{dateQueue:s,today:i,calendarMonth:d,$arrival:r,$departure:o,$expandArrival:n,$expandDeparture:l,$valueArrival:h,$valueDeparture:c,$valueFilter:p}=t.data.datepicker;if(e.hasClass("js-datepicker__button_action_month-minus"))d.setMonth(d.getMonth()-1),i.getFullYear()===d.getFullYear()&&i.getMonth()===d.getMonth()||t.data.datepicker.setTimerClick(setTimeout(u,1e3,t.data.datepicker));else if(e.hasClass("js-datepicker__button_action_month-plus"))d.setMonth(d.getMonth()+1);else{if(!e.hasClass("js-datepicker__button_action_clear"))return e.prop("disabled",!0),r.val(n.attr("data-date")),o.val(l.attr("data-date")).trigger("input"),void t.data.datepicker.close();s[0]="",s[1]="",n.attr("data-date",""),l.attr("data-date",""),h.text("ДД.ММ.ГГГГ"),c.text("ДД.ММ.ГГГГ"),p.text("Укажите даты пребывания"),r.val(""),o.val("").trigger("input")}t.data.datepicker.updateCalendar()}function m(t){clearTimeout(t.data.datepicker.timerClick)}function $(t){const e=a()(t.target),{dateQueue:s,$datepicker:i,$expandArrival:d,$expandDeparture:o,$valueArrival:n,$valueDeparture:l,$valueFilter:h}=t.data.datepicker;if(!e.hasClass("datepicker__cell_clickable"))return;const c=e.data("date"),p=a()(".js-datepicker__expand_open",i),u=p.hasClass("js-datepicker__expand_date_arrival")||p.hasClass("js-datepicker__expand_date_departure");if(u?s[1]===p.attr("data-date")?s[1]=c:s[0]=c:(s.push(c),s.shift()),""===s[0]){u?(p.attr("data-date",c),a()(".js-datepicker__value",p).text(c.split("-").reverse().join("."))):(d.attr("data-date",c),n.text(c.split("-").reverse().join(".")));const t=new Date(c);h.text(`${t.getDate()} ${r[t.getMonth()]}`)}else{let t,e;s[0]>s[1]?[e,t]=s:[t,e]=s;const i=new Date(t),a=new Date(e);d.attr("data-date",t),n.text(t.split("-").reverse().join(".")),o.attr("data-date",e),l.text(e.split("-").reverse().join(".")),h.text(`${i.getDate()} ${r[i.getMonth()]} - ${a.getDate()} ${r[a.getMonth()]}`)}u&&(d.attr("data-date")===c?(o.addClass("js-datepicker__expand_open datepicker__expand_open"),d.removeClass("js-datepicker__expand_open datepicker__expand_open")):(o.removeClass("js-datepicker__expand_open datepicker__expand_open"),d.addClass("js-datepicker__expand_open datepicker__expand_open"))),t.data.datepicker.updateCalendar()}class v{#t=1;#e;#s;#i;#a;#d;constructor(t){this.$datepicker=a()(t)}init(){this.timeFocus=0,this.timerClick=0;const t=new Date;this.today=new Date(t.getFullYear(),t.getMonth(),t.getDate()),this.calendarMonth=new Date(t.getFullYear(),t.getMonth()),this.dateQueue=["",""],this.$arrival=a()(".js-datepicker__input_date_arrival",this.$datepicker),this.$departure=a()(".js-datepicker__input_date_departure",this.$datepicker);const e=2*this.$datepicker.data("z-index")-1,s=this.$datepicker.data("name");this.$down=a()(".js-datepicker__down",this.$datepicker).css({"z-index":e}).on(`mousedown.datepicker__down.${s}`,null,{datepicker:this},c).on(`mouseup.datepicker__down.${s} mouseout.datepicker__down.${s}`,null,{datepicker:this},p).on(`mousedown.datepicker__button.${s}`,".js-datepicker__button",{datepicker:this},_),this.$datepicker.on(`focusin.datepicker__expand.${s}`,".js-datepicker__expand",{datepicker:this},o).on(`focusout.datepicker__expand.${s}`,".js-datepicker__expand",{datepicker:this},n),a()(".js-datepicker__expand",this.$datepicker).on(`mousedown.datepicker__expand.${s}`,null,{datepicker:this},l),this.$expandArrival=a()(".js-datepicker__expand_date_arrival",this.$datepicker).on(`keydown.datepicker__expand_date_arrival.${s}`,null,{datepicker:this},h),this.$valueArrival=a()(".js-datepicker__value",this.$expandArrival),this.$expandDeparture=a()(".js-datepicker__expand_date_departure",this.$datepicker),this.$valueDeparture=a()(".js-datepicker__value",this.$expandDeparture),this.$expandFilter=a()(".js-datepicker__expand_format_filter",this.$datepicker),this.$valueFilter=a()(".js-datepicker__value",this.$expandFilter),this.#e=a()(".js-datepicker__button_action_month-minus",this.$down).on(`mouseup.month-minus.${s} mouseout.month-minus.${s}`,null,{datepicker:this},m),this.#s=a()(".js-datepicker__month-year",this.$down),this.#i=a()(".js-datepicker__button_action_clear",this.$down),this.#a=a()(".js-datepicker__button_action_confirm",this.$down),this.#d=a()(".js-datepicker__calendar-body",this.$down).on(`mousedown.datepicker__cell.${s}`,".js-datepicker__cell",{datepicker:this},$),this.updateCalendar()}open(){const t=129+this.#t*parseInt(a()("td",this.#d).css("height"),10);this.$down.css({height:`${t}px`,border:"1px solid rgba(31, 32, 65, 0.25)",transition:"height 500ms, border 500ms"})}close(){this.$expandArrival.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$expandDeparture.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$expandFilter.removeClass("js-datepicker__expand_open datepicker__expand_open"),this.$down.css({height:"0px",border:"0px solid rgba(31, 32, 65, 0)",transition:"height 500ms, border 500ms"})}setTimeFocus(t){this.timeFocus=t}setTimerClick(t){this.timerClick=t}isRollbackable(){return!(this.dateQueue[0]===this.$arrival.val()&&this.dateQueue[1]===this.$departure.val()||this.dateQueue[1]===this.$arrival.val()&&this.dateQueue[0]===this.$departure.val())}rollback(){let t=this.$arrival.val();const e=this.$departure.val();if(this.$expandArrival.attr("data-date",t),this.$expandDeparture.attr("data-date",e),t?this.$valueArrival.text(t.split("-").reverse().join(".")):this.$valueArrival.text("ДД.ММ.ГГГГ"),e?this.$valueDeparture.text(e.split("-").reverse().join(".")):this.$valueDeparture.text("ДД.ММ.ГГГГ"),this.dateQueue[0]=t,this.dateQueue[1]=e,""===t&&""===e)this.$valueFilter.text("Укажите даты пребывания");else if(""!==t&&""!==e){const s=new Date(t),i=new Date(e);this.$valueFilter.text(`${s.getDate()} ${r[s.getMonth()]} - ${i.getDate()} ${r[i.getMonth()]}`)}else{t=`${t}${e}`;const s=new Date(t);this.$valueFilter.text(`${s.getDate()} ${r[s.getMonth()]}`),this.dateQueue[0]="",this.dateQueue[1]=t}this.updateCalendar()}isOpen(){return a()(".js-datepicker__expand_open",this.$datepicker).length>0||this.$datepicker.hasClass("datepicker_format_demo")}updateCalendar(){this.today.getMonth()===this.calendarMonth.getMonth()&&this.today.getFullYear()===this.calendarMonth.getFullYear()?this.#e.prop("disabled",!0):this.#e.prop("disabled",!1),this.#s.text(`${d[this.calendarMonth.getMonth()]} ${this.calendarMonth.getFullYear()}`);const t=new Date(this.calendarMonth.getFullYear(),this.calendarMonth.getMonth()),e=t.getDay()?t.getDay()-1:6;t.setDate(t.getDate()-e);const s=!!this.dateQueue[0]&&!!this.dateQueue[1];let i=new Date(this.dateQueue[0]),r=new Date(this.dateQueue[1]);i.setHours(0,0,0),r.setHours(0,0,0),s&&i>r&&([i,r]=[r,i]),this.#t=1;let o="";do{this.#t+=1,o+='<tr class="datepicker__row">';for(let e=0;e<7;e+=1){let a="",d="";t.getTime()===i.getTime()||t.getTime()===r.getTime()?a+=" datepicker__cell_selected":t.getTime()===this.today.getTime()?a+=" datepicker__cell_date_today datepicker__cell_clickable":t>this.today&&(a+=" datepicker__cell_clickable"),t.getMonth()!==this.calendarMonth.getMonth()&&(a+=" datepicker__cell_date_other-month"),s&&(t.getTime()===i.getTime()?e<6&&(d='<div class="datepicker__cell-period datepicker__cell-period_date_arrival"></div>'):t.getTime()===r.getTime()?e>0&&(d='<div class="datepicker__cell-period datepicker__cell-period_date_departure"></div>'):i<t&&t<r&&(d=0===e?'<div class="datepicker__cell-period datepicker__cell-period_date_monday"></div>':6===e?'<div class="datepicker__cell-period datepicker__cell-period_date_sunday"></div>':'<div class="datepicker__cell-period"></div>'));const n=t.getMonth()<9?"0":"",l=t.getDate()<10?"0":"";o+=`<td class="js-datepicker__cell datepicker__cell${a}" data-date="${t.getFullYear()}-${n}${t.getMonth()+1}-${l}${t.getDate()}">${t.getDate()}${d}</td>`,t.setDate(t.getDate()+1)}o+="</tr>"}while(t.getMonth()===this.calendarMonth.getMonth());if(this.#d.html(o),this.isOpen()){const t=129+this.#t*parseInt(a()("td",this.#d).css("height"),10);this.$down.css({height:`${t}px`,border:"1px solid rgba(31, 32, 65, 0.25)",transition:"height 0ms, border 0ms"})}this.dateQueue[0]||this.dateQueue[1]?this.#i.prop("disabled",!1):this.#i.prop("disabled",!0),this.isRollbackable()?this.#a.prop("disabled",!1):this.#a.prop("disabled",!0)}setCurrentMonth(){this.calendarMonth.setFullYear(this.today.getFullYear(),this.today.getMonth()),this.updateCalendar()}}a()(".js-datepicker").each(((t,e)=>{new v(e).init()}))},912:(t,e,s)=>{"use strict";var i=s(755),a=s.n(i);function d(t){t.data.dropdown.open(),t.data.dropdown.setTimeFocus(t.timeStamp)}function r(t){t.data.dropdown.$dropdown.hasClass("dropdown_keeping-focus")?t.data.dropdown.$dropdown.removeClass("dropdown_keeping-focus"):(t.data.dropdown.isRollbackable()&&t.data.dropdown.rollback(),t.data.dropdown.close())}function o(t){const e=t.data.dropdown.getCommonValue();t.data.dropdown.$dropdown__value.text(e),t.data.dropdown.$dropdown__buttons.each(((s,i)=>{const d=a()(i);d.hasClass("js-dropdown__button_action_clear")?e===t.data.dropdown.defaultValue?d.prop("disabled",!0):d.prop("disabled",!1):t.data.dropdown.isRollbackable()?d.prop("disabled",!1):d.prop("disabled",!0)}))}function n(t){Math.abs(t.timeStamp-t.data.dropdown.timeFocus)<50||(t.data.dropdown.$dropdown.hasClass("dropdown_open")?t.data.dropdown.close():t.data.dropdown.open())}function l(t){const e=a()(".js-dropdown__quantity",a()(t.delegateTarget)),s=a()(t.target);let i=parseInt(e.val(),10);s.hasClass("js-dropdown__counter-button_action_plus")?i+=1:i-=1,i>0&&i<99&&(t.data.dropdown.$dropdown.addClass("dropdown_keeping-focus"),s.addClass("js-dropdown__counter-button_pressed")),e.val(i).trigger("input")}function h(t){const e=a()(t.target);e.hasClass("js-dropdown__counter-button_pressed")&&(e.removeClass("js-dropdown__counter-button_pressed"),t.data.dropdown.$dropdown.trigger("focus"))}function c({value:t=0,cases:e="units"}={}){if(0===t)return"";let[,s,i,a]=e.split(" ");void 0===s&&(s=e),void 0===i&&(i=s),void 0===a&&(a=i);const d=t%100,r=t%10;return d>4&&d<21||r>4||0===r?`${t} ${a}`:1===r?`${t} ${s}`:`${t} ${i}`}function p(t){const e=a()(t.delegateTarget),s=parseInt(a()(t.target).val(),10);a()(".js-dropdown__counter-button",e).each(((t,e)=>{const i=a()(e);i.hasClass("js-dropdown__counter-button_action_plus")?s<99?i.prop("disabled",!1):i.prop("disabled",!0):s>0?i.prop("disabled",!1):i.prop("disabled",!0)})),e.attr("data-value",c({value:s,cases:e.data("units")})),e.attr("data-quantity",s)}function u(t){t.preventDefault()}function _(t){const e=a()(t.target);if(e.prop("disabled",!0),e.hasClass("js-dropdown__button_action_clear"))return t.data.dropdown.clearSnapshot(),void t.data.dropdown.$dropdown__quantities.each(((t,e)=>{a()(e).val(0).trigger("input")}));t.data.dropdown.takeSnapshot(),t.data.dropdown.close()}class m{#r=[];#o=!1;#n=a()();#l=a()();#h="";#c="42px";constructor(t){this.$dropdown=a()(t),this.defaultValue=t.dataset.defaultValue}init(){this.timeFocus=0,this.$dropdown__value=a()(".js-dropdown__value",this.$dropdown),this.#l=a()(a()(".js-dropdown__item",this.$dropdown).get().reverse()),this.#n=a()(".js-dropdown__down",this.$dropdown),this.$dropdown__quantities=a()(a()(".js-dropdown__quantity",this.$dropdown).get().reverse()),this.$dropdown__buttons=a()(".js-dropdown__button",this.$dropdown),this.#o=this.$dropdown.hasClass("dropdown_guest");let t=51,e=0;this.#l.each(((s,i)=>{const d=a()(i);a()(".js-dropdown__label",d).text(i.dataset.units.split(" ")[0]),a()(".js-dropdown__quantity",d).val(0),t+=37,e+=100,this.#r.push("0")})),this.$dropdown__buttons.length&&(t+=40,e+=100),this.#h=`${t}px`;const s=this.$dropdown.data("z-index");this.#n.css({transition:`height ${e}ms`,height:this.#c,"z-index":()=>2*s-1});const i=this.$dropdown.data("dropdown-name");this.#l.on(`mousedown.dropdown__counter-button.${i}`,".js-dropdown__counter-button",{dropdown:this},l).on(`mouseup.dropdown__counter-button.${i} mouseout.dropdown__counter-button.${i}`,".js-dropdown__counter-button",{dropdown:this},h).on(`input.dropdown__quantity.${i}`,".js-dropdown__quantity",{dropdown:this},p),a()(".js-dropdown__drop",this.$dropdown).css({transition:`border ${e}ms`,"z-index":()=>2*s}).on(`mousedown.dropdown__drop.${i}`,null,{dropdown:this},n),this.$dropdown.on(`focus.dropdown.${i}`,null,{dropdown:this},d).on(`blur.dropdown.${i}`,null,{dropdown:this},r).on(`input.dropdown.${i}`,null,{dropdown:this},o).on(`mousedown.dropdown__quantity.${i}`,".dropdown__quantity",u).on(`mousedown.dropdown__button.${i}`,".dropdown__button",{dropdown:this},_)}open(){this.$dropdown.addClass("dropdown_open"),this.#n.css("height",this.#h)}close(){this.$dropdown.removeClass("dropdown_open"),this.#n.css("height",this.#c)}isRollbackable(){if(!this.$dropdown.hasClass("dropdown_rollbackable"))return!1;let t=!1;return this.$dropdown__quantities.each(((e,s)=>{this.#r[e]!==a()(s).val()&&(t=!0)})),t}setTimeFocus(t){this.timeFocus=t}getCommonValue(){let t="",e=0;if(this.#o){const t=this.#l.get(0),e=this.#l.get(1);let s=0;e&&(s=parseInt(e.dataset.quantity,10)||0,e.dataset.value=""),t&&(s+=parseInt(t.dataset.quantity,10)||0,t.dataset.value=c({value:s,cases:t.dataset.units}))}return this.#l.each(((s,i)=>{""!==i.dataset.value&&(2===e?t+="...":e<2&&(""===t?t=i.dataset.value:t+=`, ${i.dataset.value}`),e+=1)})),""===t?this.defaultValue:t}takeSnapshot(){this.#l.each(((t,e)=>{this.#r[t]=e.dataset.quantity}))}clearSnapshot(){this.#r.forEach(((t,e)=>{this.#r[e]="0"}))}rollback(){this.$dropdown__quantities.each(((t,e)=>{a()(e).val(this.#r[t]).trigger("input")}))}}a()(".js-dropdown").each(((t,e)=>{new m(e).init()}))},339:(t,e,s)=>{"use strict";var i=s(755),a=s.n(i);function d(t){const{$like:e,$number:s}=t.data,i=parseInt(e.attr("data-likes"),10);e.hasClass("like_active")?(e.removeClass("like_active").attr("data-likes",""+(i-1)),s.text(""+(i-1))):(e.addClass("like_active").attr("data-likes",`${i+1}`),s.text(`${i+1}`))}class r{constructor(t){this.$like=a()(t)}init(){this.$like.on("mousedown",null,{$like:this.$like,$number:a()(".js-like__number",this.$like)},d)}}a()(".js-like").each(((t,e)=>{new r(e).init()}))},779:(t,e,s)=>{"use strict";var i=s(755),a=s.n(i);function d(t){t.data.rate.$rate.attr("data-rating",a()(t.target).data("rating"))}function r(t){const{$rate:e,rating:s}=t.data.rate;e.attr("data-rating",s)}function o(t){t.data.rate.setRating(a()(t.target).data("rating"))}class n{constructor(t){this.$rate=a()(t),this.rating=this.$rate.data("rating")}init(){this.$rate.on("mouseover",".js-rate__star",{rate:this},d).on("mouseout",".js-rate__star",{rate:this},r).on("mousedown",".js-rate__star",{rate:this},o)}setRating(t){this.rating=t}}a()(".js-rate").each(((t,e)=>{new n(e).init()}))},335:(t,e,s)=>{"use strict";var i=s(755),a=s.n(i);class d{constructor({start:t=0,end:e=0,step:s=0,from:i=0,to:a=0,range:d=!1}={}){this.start=t,this.end=e,this.step=s,this.from=i,this.to=a,this.range=d,this.normalize()}setStart(t){this.start=t,this.normalize()}setEnd(t){this.end=t,this.normalize()}setStep(t){this.step=t,this.normalize()}setFrom(t){this.from=this.adjust(t),this.order()}setTo(t){this.to=this.adjust(t),this.order()}setRange(t){this.range=t,t&&this.order()}updateValue({full:t=0,part:e=0,previousValue:s=0}={}){this.range?(0===t?Math.abs(e-this.from)<Math.abs(e-this.to)?this.from=e:this.to=e:s===this.from?this.from=this.adjust(e*(this.end-this.start)/t+this.start):this.to=this.adjust(e*(this.end-this.start)/t+this.start),this.order()):this.from=0===t?e:this.adjust(e*(this.end-this.start)/t+this.start)}static blank(){return new d}normalize(){this.adjustStep(),this.from=this.adjust(this.from),this.to=this.adjust(this.to),this.order()}order(){this.range&&(this.start>this.end?this.from<this.to&&([this.from,this.to]=[this.to,this.from]):this.from>this.to&&([this.from,this.to]=[this.to,this.from]))}adjustStep(){Math.abs(this.step)>Math.abs(this.end-this.start)&&(this.step=this.end-this.start),(this.end>this.start&&this.step<0||this.end<this.start&&this.step>0)&&(this.step*=-1)}adjust(t){let e=t;if(this.start>this.end){if(t>this.start)e=this.start;else if(t<this.end)e=this.end;else if(0!==this.step){const s=this.start-this.end+this.step*Math.floor((this.end-this.start)/this.step);e=t<this.end+s/2?this.end:t<this.end+s?this.end+s:this.start+this.step*Math.round((t-this.start)/this.step)}}else if(t<this.start)e=this.start;else if(t>this.end)e=this.end;else if(0!==this.step){const s=this.end-this.start-this.step*Math.floor((this.end-this.start)/this.step);e=t>this.end-s/2?this.end:t>this.end-s?this.end-s:this.start+this.step*Math.round((t-this.start)/this.step)}return e}}function r(t){let e,s=0;t.data.thumb.vertical?t.clientY&&(s=t.clientY-t.data.thumb.shift-t.data.thumb.$container.offset().top):t.clientX&&(s=t.clientX-t.data.thumb.shift-t.data.thumb.$container.offset().left),s<0&&(s=0),e=t.data.thumb.vertical?t.data.thumb.$container.outerHeight()-t.data.thumb.$thumb.outerHeight():t.data.thumb.$container.outerWidth()-t.data.thumb.$thumb.outerWidth(),s>e&&(s=e),t.data.thumb.vertical?t.data.thumb.$thumb.css("top",`${s}px`):t.data.thumb.$thumb.css("left",`${s}px`);const i=t.data.thumb.vertical?e-s:s;t.data.thumb.indent=i/e,t.data.thumb.$container.trigger("update-value",{part:i,full:e,previousValue:t.data.thumb.value})}function o(t){a()(document).off("mousemove pointermove",r),a()(document).off("mouseup pointerup",o),t.data.thumb.dragging=!1,t.data.thumb.fallIntoPlace(),t.data.thumb.$container.trigger("update-value",{part:t.data.thumb.value,full:0,previousValue:0})}function n(t){t.preventDefault();let e=0;t.data.thumb.vertical?t.clientY&&(e=t.clientY-t.data.thumb.$thumb.offset().top):t.clientX&&(e=t.clientX-t.data.thumb.$thumb.offset().left),t.data.thumb.shift=e,a()(document).on("mousemove pointermove",null,{thumb:t.data.thumb},r),a()(document).on("mouseup pointerup",null,{thumb:t.data.thumb},o),t.data.thumb.dragging=!0}function l(){return!1}class h{constructor({$thumb:t=a()(),$container:e=a()(),vertical:s=!1,value:i=0,position:d=0,tip:r=!1,units:o=""}={}){this.$thumb=a()(),this.$container=a()(),this.$tip=a()(),this.vertical=!1,this.value=0,this.position=0,this.drag=!1,this.offset=0,this.tip=!1,this.units="",this.dent=0,this.$thumb=t,this.$container=e,this.vertical=s,this.value=i,this.position=d,this.dragging=!1,this.shift=0,this.tip=r,this.units=o,this.indent=0}init(){this.$tip=a()(".js-slider__tip",this.$thumb),this.$thumb.on("mousedown pointerdown",null,{thumb:this},n),this.$thumb.on("dragstart",l),this.update({vertical:this.vertical,position:this.position,value:this.value,tip:this.tip})}update({vertical:t=!1,position:e=0,value:s=0,tip:i=!1}={}){this.vertical=t,this.position=e,this.value=s,this.tip=i,this.tip?this.$tip.css("display","block"):this.$tip.css("display","none"),this.$tip.text(`${new Intl.NumberFormat("ru-RU").format(this.value)}${this.units}`),this.fallIntoPlace()}set shift(t){this.offset=t}get shift(){return this.offset}set dragging(t){this.drag=t,t?this.$thumb.addClass("slider__thumb_dragging"):this.$thumb.removeClass("slider__thumb_dragging")}get dragging(){return this.drag}fallIntoPlace(){this.dragging||(this.vertical?(this.$thumb.css({left:"0",top:100-100*this.position+"%"}),this.indent=this.position):(this.$thumb.css({top:"0",left:100*this.position+"%"}),this.indent=this.position))}set indent(t){this.dent=t}get indent(){return this.dent}}function c({start:t=0,end:e=0,step:s=0,units:i=""}={}){const a=Math.abs(s);let d=`\n    <div class="slider__thumb slider__thumb_format_half-spacer"></div>\n    <div class="slider__scale js-slider__scale">  \n      <div class="slider__point" style="flex: ${a} ${a} 0%">\n        <div class="slider__point-value js-slider__point-value" data-value="${t}">\n          ${new Intl.NumberFormat("ru-RU").format(t)}${i}\n        </div>\n      </div>`,r=0,o=e;0!==s&&(e>t?r=e-t-s*Math.floor((e-t)/s):e<t&&(r=t-e+s*Math.floor((e-t)/s)),o=t+s*Math.floor((e-t)/s));let n=1;if(e>t&&0!==s)for(let e=t+s;e<o;e=t+n*s)d+=`\n        <div class="slider__point" style="flex: ${2*a} ${2*a} 0%">\n          <div class="slider__point-value js-slider__point-value" data-value="${e}">\n            ${new Intl.NumberFormat("ru-RU").format(e)}${i}\n          </div>\n        </div>`,n+=1;else if(t>e&&0!==s)for(let e=t+s;e>o;e=t+n*s)d+=`\n        <div class="slider__point" style="flex: ${2*a} ${2*a} 0%">\n          <div class="slider__point-value js-slider__point-value" data-value="${e}">\n            ${new Intl.NumberFormat("ru-RU").format(e)}${i}\n          </div>\n        </div>`,n+=1;return d+=r?`\n      <div class="slider__point slider__point_penult" style="flex: ${a} ${a} 0%">\n        <div class="slider__point-value js-slider__point-value" data-value="${o}">\n          ${new Intl.NumberFormat("ru-RU").format(o)}${i}\n        </div>\n      </div>\n      <div class="slider__point" style="flex-grow: ${2*r}; flex-basis: 0;">\n        <div class="slider__point-value js-slider__point-value" data-value="${e}">\n          ${new Intl.NumberFormat("ru-RU").format(e)}${i}\n        </div>\n      </div>`:`\n      <div class="slider__point" style="flex: ${a} ${a} 0%">\n        <div class="slider__point-value js-slider__point-value" data-value="${e}">\n          ${new Intl.NumberFormat("ru-RU").format(e)}${i}\n        </div>\n      </div>`,d+='\n    </div>\n    <div class="slider__thumb slider__thumb_format_half-spacer"></div>',d}function p(t){t.data.scale.$scale.trigger("update-value",{part:parseFloat(t.target.dataset.value),full:0,previousValue:0})}class u{constructor({$scale:t=a()(),start:e=0,end:s=0,step:i=0,scaleView:d=!1,units:r=""}={}){this.$scale=t,this.start=e,this.end=s,this.step=i,this.scaleView=d,this.units=r}init(){this.scaleView?this.$scale.css("display","flex"):this.$scale.css("display","none"),this.$scale.html(c({start:this.start,end:this.end,step:this.step,units:this.units})),this.$scale.on("mousedown",".js-slider__point-value",{scale:this},p)}update({start:t=0,end:e=0,step:s=0,scaleView:i=!1}){this.scaleView=i,this.scaleView?this.$scale.css("display","flex"):this.$scale.css("display","none"),t===this.start&&e===this.end&&s===this.step||(this.start=t,this.end=e,this.step=s,this.$scale.html(c({start:this.start,end:this.end,step:this.step,units:this.units})))}static blank(){return new u}}class _{constructor({$bar:t=a()(),$thumbs:e=a()(),$container:s=a()()}={}){this.$bar=t,this.$thumbs=e,this.$container=s}update({vertical:t=!1,barView:e=!1}){const s=[];e?this.$bar.css("display","block"):this.$bar.css("display","none");let i=t?this.$container.outerHeight():this.$container.outerWidth();void 0===i&&(i=0);let d=t?this.$thumbs.outerHeight():this.$thumbs.outerWidth();void 0===d&&(d=0),this.$thumbs.each(((e,i)=>{t?"none"!==a()(i).css("display")&&s.push(parseFloat(a()(i).css("top"))):"none"!==a()(i).css("display")&&s.push(parseFloat(a()(i).css("left")))})),s.sort(((t,e)=>t-e)),t?s.length>1?this.$bar.css({left:"0",width:"6px",top:100*s[0]/(i-d)+"%",height:100*(s[1]-s[0])/(i-d)+"%"}):this.$bar.css({left:"0",width:"6px",top:100*s[0]/(i-d)+"%",height:100-100*s[0]/(i-d)+"%"}):s.length>1?this.$bar.css({top:"0",height:"6px",left:100*s[0]/(i-d)+"%",width:(100*(s[1]-s[0])+d)/(i-d)+"%"}):this.$bar.css({top:"0",height:"6px",left:"0",width:100*s[0]/(i-d)+"%"})}static blank(){return new _}}class m{constructor({$slider:t=a()(),model:e=d.blank(),vertical:s=!1,tipView:i=!1,scaleView:r=!1,barView:o=!1,units:n=""}={}){this.$from=a()(),this.$to=a()(),this.model=d.blank(),this.thumbs=[],this.scale=u.blank(),this.bar=_.blank(),this.$slider=t,this.model=e,this.vertical=s,this.units=n,this.scaleView=r,this.barView=o,this.tipView=i}init(t=""){a()(".js-slider__thumb",this.$slider).each(((t,e)=>{this.thumbs.push(new h({value:this.model.start,position:0,vertical:this.vertical,$thumb:a()(e),$container:this.$slider,tip:this.tipView,units:this.units}))})),this.thumbs.forEach((t=>t.init())),this.scale=new u({$scale:a()(".js-slider__scale-container",this.$slider),start:this.model.start,end:this.model.end,step:this.model.step,scaleView:this.scaleView,units:this.units}),this.scale.init(),this.model.range||this.$slider.addClass("slider_without-range"),this.bar=new _({$bar:a()(".js-slider__bar",this.$slider),$thumbs:a()(".js-slider__thumb",this.$slider),$container:this.$slider}),this.$from=a()(".js-slider__input_from",this.$slider),this.$to=a()(".js-slider__input_to",this.$slider),this.$from.attr("name",`${t}-from`),this.$to.attr("name",`${t}-to`),this.update()}update(){if(this.$from.val(this.model.from),this.$to.val(this.model.to),this.vertical?this.$slider.addClass("slider_vertical"):this.$slider.removeClass("slider_vertical"),this.model.range)this.$slider.removeClass("slider_without-range"),this.thumbs[1].$thumb.css("display","block"),this.thumbs.sort(((t,e)=>t.indent-e.indent)),this.thumbs.forEach(((t,e)=>{const s=e?this.model.to:this.model.from,i=Math.abs(this.model.end-this.model.start),a=i?Math.abs(s-this.model.start)/i:0;t.update({value:s,position:a,vertical:this.vertical,tip:this.tipView})}));else{this.$slider.addClass("slider_without-range"),this.thumbs[1].$thumb.css("display","none");const t=Math.abs(this.model.end-this.model.start),e=t?Math.abs(this.model.from-this.model.start)/t:0;this.thumbs[0].update({value:this.model.from,position:e,vertical:this.vertical,tip:this.tipView})}this.scale.update({start:this.model.start,end:this.model.end,step:this.model.step,scaleView:this.scaleView}),this.bar.update({vertical:this.vertical,barView:this.barView})}setVertical(t){this.vertical=t}setScaleView(t){this.scaleView=t}setBarView(t){this.barView=t}setTipView(t){this.tipView=t}get scope(){return this.model.range?`${new Intl.NumberFormat("ru-RU").format(this.model.from)}${this.units} - ${new Intl.NumberFormat("ru-RU").format(this.model.to)}${this.units}`:`${new Intl.NumberFormat("ru-RU").format(this.model.from)}${this.units}`}static blank(){return new m}}function $(t,e){t.data.controller.model.updateValue(e),t.data.controller.view.update(),t.data.controller.view.$slider.trigger("slide",{scope:t.data.controller.view.scope,from:t.data.controller.model.from,to:t.data.controller.model.to})}function v(t,e){void 0!==e.start&&t.data.controller.model.setStart(e.start),void 0!==e.end&&t.data.controller.model.setEnd(e.end),void 0!==e.step&&t.data.controller.model.setStep(e.step),void 0!==e.from&&void 0!==e.to?t.data.controller.model.end>t.data.controller.model.start?e.to<e.from?t.data.controller.model.to<e.to?(t.data.controller.model.setTo(e.from),t.data.controller.model.setFrom(e.to)):(t.data.controller.model.setFrom(e.to),t.data.controller.model.setTo(e.from)):t.data.controller.model.to<e.from?(t.data.controller.model.setTo(e.to),t.data.controller.model.setFrom(e.from)):(t.data.controller.model.setFrom(e.from),t.data.controller.model.setTo(e.to)):e.to>e.from?t.data.controller.model.to>e.to?(t.data.controller.model.setTo(e.from),t.data.controller.model.setFrom(e.to)):(t.data.controller.model.setFrom(e.to),t.data.controller.model.setTo(e.from)):t.data.controller.model.to>e.from?(t.data.controller.model.setTo(e.to),t.data.controller.model.setFrom(e.from)):(t.data.controller.model.setFrom(e.from),t.data.controller.model.setTo(e.to)):void 0!==e.to?t.data.controller.model.setTo(e.to):void 0!==e.from&&t.data.controller.model.setFrom(e.from),void 0!==e.vertical&&t.data.controller.view.setVertical(e.vertical),void 0!==e.range&&t.data.controller.model.setRange(e.range),void 0!==e.tipView&&t.data.controller.view.setTipView(e.tipView),void 0!==e.scaleView&&t.data.controller.view.setScaleView(e.scaleView),void 0!==e.barView&&t.data.controller.view.setBarView(e.barView),t.data.controller.view.update()}class f{constructor({model:t=d.blank(),view:e=m.blank()}={}){this.model=t,this.view=e}init(){this.view.$slider.on("update-value",null,{controller:this},$),this.view.$slider.trigger("slide",{scope:this.view.scope,from:this.model.from,to:this.model.to}),this.view.$slider.on("set",null,{controller:this},v)}}function b(t,{scope:e}){a()(".js-slider-toxin__value",t.data.$slider).text(e)}a().fn.Slider=function({start:t=0,end:e=0,step:s=0,from:i=0,to:r=0,vertical:o=!1,range:n=!1,tipView:l=!1,scaleView:h=!1,barView:c=!1,units:p="",name:u="undefined-name"}){return this.each(((_,$)=>{let v=u;_>0&&(v=`${u}${_}`);const b=a()($);b.html('<div class="slider js-slider">\n  <input class="slider__input slider__input_from js-slider__input_from" type="number">\n  <input class="slider__input slider__input_to js-slider__input_to" type="number">\n  <div class="slider__body js-slider__body">\n    <div class="slider__strip-container">\n      <div class="slider__strip"></div>\n    </div>\n    <div class="slider__thumb-container">\n      <div class="slider__thumb-container">\n        <div class="slider__thumb-container">\n          <div class="js-slider__thumb slider__thumb">\n            <div class="slider__tip js-slider__tip"></div>\n          </div>\n        </div>\n        <div class="slider__thumb slider__thumb_format_spacer"></div>\n      </div>\n    </div>\n    <div class="slider__thumb-container">\n      <div class="slider__thumb-container">\n        <div class="slider__thumb-container">\n          <div class="js-slider__thumb slider__thumb">\n            <div class="slider__tip js-slider__tip"></div>\n          </div>\n        </div>\n        <div class="slider__thumb slider__thumb_format_spacer"></div>\n      </div>\n    </div>\n    <div class="slider__bar-container">\n      <div class="slider__bar-container">\n        <div class="slider__thumb slider__thumb_format_half-spacer"></div>\n        <div class="slider__bar-container">\n          <div class="slider__bar js-slider__bar"></div>\n        </div>\n        <div class="slider__thumb slider__thumb_format_half-spacer"></div>    \n      </div>\n    </div>\n  </div>\n  <div class="slider__scale-container js-slider__scale-container">\n  </div>\n</div>');const w=a()(".js-slider",b),g=new d({start:t,end:e,step:s,from:i,to:r,range:n}),k=new m({$slider:w,model:g,vertical:o,tipView:l,scaleView:h,barView:c,units:p});k.init(v);new f({model:g,view:k}).init()}))},a().fn.slider=function(t={start:void 0,end:void 0,step:void 0,from:void 0,to:void 0,range:void 0,vertical:void 0,tipView:void 0,scaleView:void 0,barView:void 0}){return this.each(((e,s)=>{a()(".js-slider",a()(s)).trigger("set",t)}))},a()(".js-slider-toxin").each(((t,e)=>{a()(".js-slider-toxin__body",a()(e)).on("slide",null,{$slider:a()(e)},b).Slider({start:parseFloat(e.dataset.start),end:parseFloat(e.dataset.end),step:parseFloat(e.dataset.step),from:parseFloat(e.dataset.from),to:parseFloat(e.dataset.to),range:!0,barView:!0,units:"₽",name:e.dataset.name})}))},610:(t,e,s)=>{"use strict";var i=s(755),a=s.n(i);function d(t){const{$email:e,$submit:s}=t.data;var i;s.prop("disabled",(i=e.val(),!String(i).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))}class r{#p;constructor(t){this.#p=a()(t)}init(){this.$submit=a()(".js-subscription__button",this.#p),this.$email=a()(".js-subscription__input",this.#p),this.$email.on("input",null,{$email:this.$email,$submit:this.$submit},d)}}a()(".js-subscription").each(((t,e)=>{new r(e).init()}))},234:(t,e,s)=>{"use strict";var i=s(755),a=s.n(i);function d(t){t.preventDefault()}function r(t){const e=t.target,s=a()(e);s.removeClass("text-field__input_invalid");let i=e.selectionStart,d=s.val();const{preValue:r,$double:o}=t.data.textField;if(r.length>d.length)d.match(/^(\d{0,2}\.?|\d{0,2}\.\d{0,2}\.?|\d{0,2}\.\d{0,2}\.\d{0,4})$/)?(d=d.replace(/\.$/,""),d=d.replace(/\.$/,"")):d=r;else if(d.match(/^(\d{0,3}|\d{0,2}\.\d{1,3}|\d{0,2}\.\d{0,2}\.\d{1,4})$/)){let t,e,s,a=0,o=(d.slice(0,i).match(/\./g)||[]).length;if(d.match(/^(3[2-9]|[4-9]\d)$/)?(d=`0${d}`,a+=1,o=1):d.match(/^\d{0,2}\.(1[3-9]|[2-9]\d)$/)&&(d=`${d.slice(0,d.length-2)}0${d.slice(d.length-2,d.length)}`,a+=1,o=2),d.match(/^\d{3}$/)?(t=d.slice(0,2),e=d.slice(2),a+=1,o=1):d.match(/^\d{0,2}\.\d{3}$/)?([t,e]=d.slice(0,d.length-1).split("."),s=d[d.length-1],a+=1,o=2):[t,e,s]=d.split("."),function(t,e,s){let i;i=t?parseInt(t,10):0;let a,d,r="00"===t||i>31;return!r&&(a=e?parseInt(e,10):0,r="00"===e||a>12,!r&&(d=!s||s.length<4&&s.match(/^(19|20)/)||1===s.length||3===s.length?0:2===s.length?parseInt(s,10)<30?parseInt(`20${s}`,10):parseInt(`19${s}`,10):parseInt(s,10),r=i>29&&2===a||i>28&&2===a&&(d%4!=0||1900===d),!r&&(r=31===i&&[4,6,9,11].includes(a),!r)))}(t,e,s)){s&&(s.match(/^(0[1-9]?|1[0-8]|2[1-9]|[3-9]\d?)$/)&&o>1&&(a+=2),s.match(/^(0[1-9]?|1[0-8]|2[1-9])$/)?s=`20${s}`:s.match(/^[3-9]\d?$/)&&(s=`19${s}`)),e&&e.match(/^[2-9]$/)&&(e=`0${e}`,o>0&&(a+=1)),t&&t.match(/^[4-9]$/)&&(t=`0${t}`,a+=1);const r=[];void 0!==t&&r.push(t),void 0!==e&&r.push(e),void 0!==s&&r.push(s),d=r.join("."),i+=a}else d=r,i-=1}else d=r,i-=1;s.val(d),o.attr("placeholder",function(t){const e="ДД.ММ.ГГГГ".split("");return t.split("").forEach(((t,s)=>{e[s]=t})),e.join("")}(d)),e.setSelectionRange(i,i),t.data.textField.setPreValue(d)}function o(t){const e=a()(t.target),s=e.val(),i=s.split(".").reverse().join("-"),{$dateInput:d}=t.data.textField;s.match(/^\d{2}\.\d{2}\.\d{4}$/)&&!Number.isNaN(Date.parse(i))||""===s?(e.removeClass("text-field__input_invalid"),d.val(i)):e.addClass("text-field__input_invalid")}class n{#u;constructor(t){this.#u=a()(t)}init(){a()(".js-text-field__input",this.#u).attr("placeholder","").on("input",null,{textField:this},r).on("change focusout",null,{textField:this},o).on("paste",d);const t=this.#u.data("name");a()(".js-text-field__wrapper",this.#u).append(`\n        <input\n          type="text"\n          class="text-field__input text-field__input_double js-text-field__input_double"\n          disabled\n          placeholder="ДД.ММ.ГГГГ"\n        >\n        <input\n          type="date"\n          class="text-field__date js-text-field__date"\n          name="${t}-date"\n        >`),this.$double=a()(".js-text-field__input_double",this.#u),this.$dateInput=a()(".js-text-field__date",this.#u),this.preValue=""}setPreValue(t){this.preValue=t}}a()(".js-text-field_type_date").each(((t,e)=>{new n(e).init()}))},718:(t,e,s)=>{const i=s(849);i.keys().forEach(i)},849:(t,e,s)=>{var i={"./android-chrome-192x192.png":50,"./android-chrome-512x512.png":359,"./apple-touch-icon.png":723,"./browserconfig.xml":418,"./favicon-16x16.png":225,"./favicon-32x32.png":916,"./favicon.ico":914,"./mstile-144x144.png":714,"./mstile-150x150.png":443,"./mstile-310x150.png":898,"./mstile-310x310.png":132,"./mstile-70x70.png":809,"./safari-pinned-tab.svg":4,"./site.webmanifest":48};function a(t){var e=d(t);return s(e)}function d(t){if(!s.o(i,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return i[t]}a.keys=function(){return Object.keys(i)},a.resolve=d,t.exports=a,a.id=849},50:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/android-chrome-192x192.png"},359:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/android-chrome-512x512.png"},723:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/apple-touch-icon.png"},418:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/browserconfig.xml"},225:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/favicon-16x16.png"},916:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/favicon-32x32.png"},914:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/favicon.ico"},714:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/mstile-144x144.png"},443:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/mstile-150x150.png"},898:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/mstile-310x150.png"},132:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/mstile-310x310.png"},809:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/mstile-70x70.png"},4:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/safari-pinned-tab.svg"},48:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>i});const i=s.p+"assets/favicons/site.webmanifest"},925:(t,e,s)=>{"use strict";s(234),s(912),s(485),s(610),s(339),s(779),s(335);var i=s(755),a=s.n(i);function d(t){const{$paginator:e,$description:s}=t.data;let i=parseFloat(e.attr("data-active"));const d=a()(t.target).attr("data-number");"back"===d?i-=1:"forward"===d?i+=1:i=parseFloat(d),e.attr("data-active",i),s.text(`${12*(i-1)+1} – ${12*i} из 100+ вариантов аренды`)}class r{constructor(t){this.$paginator=a()(t)}init(){this.$description=a()(".js-paginator__description",this.$paginator),this.$paginator.on("mousedown",".js-paginator__item",{$paginator:this.$paginator,$description:this.$description},d)}}a()(".js-paginator").each(((t,e)=>{new r(e).init()}));s(718)}},t=>{var e;e=925,t(t.s=e)}]);
//# sourceMappingURL=form-elements.js.map