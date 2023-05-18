"use strict";var e=require("bson"),t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},t(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}var n=function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},n.apply(this,arguments)};function o(e,t,r,n){return new(r||(r=Promise))((function(o,i){function c(e){try{s(n.next(e))}catch(e){i(e)}}function a(e){try{s(n.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(c,a)}s((n=n.apply(e,t||[])).next())}))}function i(e,t){var r,n,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(s){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(c=0)),c;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,n=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!(o=c.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}function c(e,t,r){if(r||2===arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}var a,s={common:{PRESERVER_ERROR:{errorCode:156401,errMsg:"不能将循环结构转换为JSON"},UNSET_FIELD_ERROR:{errorCode:156401,errMsg:"不能对未设置字段名的比较命令进行编码"}},serverDate:{SERVER_DATE_PARAM_ERROR:{errorCode:156401,errMsg:"serverDate值必须是一个整型"}},symobl:{SYMBOL_PARAM_ERROR:{errorCode:156401,errMsg:"InternalSymbol不能被新操作符实例化"}},collection:{COLLECTION_PARAM_ERROR:{errorCode:156401,errMsg:"集合名必填"},add:{ADD_PARAM_ERROR:{errorCode:156401,errMsg:"参数必须是对象"},ADD_PARAM_ID_ERROR:{errorCode:156401,errMsg:"_id必须是一个非空字符串"}},where:{WHERE_PARAM_OBJECT_ERROR:{errorCode:156401,errMsg:"查询参数必须为对象"},WHREE_PARAM_UNDEFINED_ERROR:{errorCode:156401,errMsg:"查询参数对象值不能均为undefined"}},"order-by":{ORDER_BY_FIELD_PATH_ERROR:{errorCode:156401,errMsg:"非法排序路径"},ORDER_BY_DIRECTION_ERROR:{errorCode:156401,errMsg:"排序字符不合法"}},limit:{LIMIT_PARAM_ERROR:{errorCode:156401,errMsg:"limit必须是一个整型"}},skip:{SKIP_PARAM_ERROR:{errorCode:156401,errMsg:"skip必须是一个整型"}},field:{FILED_PARAM_ERROR:{errorCode:156401,errMsg:"field参数对象值必须是一个对象，整型或者布尔值"}},update:{UPDATE_PARAM_ERROR:{errorCode:156401,errMsg:"参数必须是非空对象"},UPDATE_ID_ERROR:{errorCode:156401,errMsg:"_id值不能更新"}},remove:{REMOVE_PARAM_ERROR:{errorCode:156401,errMsg:"remove()操作不支持skip,limit,field,orderBy"}}},doc:{set:{SET_PARAM_ERROR:{errorCode:156401,errMsg:"docId必须为非空字符串"},SET_PARAM_OBJECT_ERROR:{errorCode:156401,errMsg:"参数必须是非空对象"},SET_PARAM_HAS_ID_ERROR:{errorCode:156401,errMsg:"_id值不能更新"}},update:{UPDATE_PARAM_ERROR:{errorCode:156401,errMsg:"docId必须为非空字符串"},UPDATE_PARAM_OBJECT_ERROR:{errorCode:156401,errMsg:"参数必须是非空对象"},UPDATE_PARAM_HAS_ID_ERROR:{errorCode:156401,errMsg:"_id值不能更新"}},get:{GET_PARAM_ERROR:{errorCode:156401,errMsg:"docId必须为非空字符串"}}}},l=function(e){function t(t){var r=e.call(this,t.errMsg)||this;return r.errorCode=0,r.errMsg="",Object.defineProperties(r,{message:{get:function(){return"errCode: ".concat(this.errorCode||""," | errMsg: ").concat(this.errMsg)}}}),r.errorCode=t.errorCode||0,r.errMsg=t.errMsg||"",r}return r(t,e),t}(Error),u=function(e,t){var r=new l.reqClass(l.dbConfig);(null==r?void 0:r.paramErrorReport)&&r.paramErrorReport(e.errMsg,t)},d=[],_={},f=function(e){function t(t,r){if(r!==_)throw new l(s.symobl.SYMBOL_PARAM_ERROR);return e.call(this,t)||this}return r(t,e),t.for=function(e){for(var r=0,n=d.length;r<n;r++)if(d[r].tar===e)return d[r].instance;var o=new t(e,_);return d.push({tar:e,instance:o}),o},t}((function(e){Object.defineProperties(this,{target:{enumerable:!1,writable:!1,configurable:!1,value:e}})})),R=f.for("UNSET_FIELD_NAME"),p=f.for("UPDATE_COMMAND"),h=f.for("QUERY_COMMAND"),O=f.for("LOGIC_COMMAND"),E=f.for("SERVER_DATE");!function(e){e.OR_COMMAND="or",e.NOR_COMMAND="nor",e.AND_COMMAND="and"}(a||(a={}));var v,A=function(){function e(e,t,r){if(this._internalType=O,this.handle=e,this.objects=t,this.name=r||R,this.name!==R)if("array"===Object.prototype.toString.call(t).slice(8,-1).toLowerCase()){t=c([],t,!0),this.objects=t;for(var n=0;n<t.length;n++){(M(o=t[n])||m(o))&&(t[n]=o._setName(this.name))}}else{var o;(M(o=t)||m(o))&&(t=o._setName(this.name))}}return e.prototype._setName=function(t){var r=this.objects.map((function(n){return n instanceof e?n._setName(t):r}));return new e(this.handle,r,t)},e.prototype.and=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=Array.isArray(t[0])?t[0]:t;return n=c([this],n,!0),new e(a.AND_COMMAND,n,this.name)},e.prototype.or=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=Array.isArray(t[0])?t[0]:t;return n=c([this],n,!0),new e(a.OR_COMMAND,n,this.name)},e}();function M(e){return e&&e instanceof A&&e._internalType===O}function m(e){return e&&e instanceof A&&e._internalType===h}!function(e){e.EQ_COMMAND="eq",e.NEQ_COMMAND="neq",e.GT_COMMAND="gt",e.GTE_COMMAND="gte",e.LT_COMMAND="lt",e.LTE_COMMAND="lte",e.IN_COMMAND="in",e.NIN_COMMAND="nin"}(v||(v={}));var D,y=function(e){function t(r,n,o){var i=e.call(this,r,n,o)||this;return i.eq=function(e){var r=new t(v.EQ_COMMAND,[e],i.name);return i.and(r)},i.handle=r,i._internalType=h,i}return r(t,e),t.prototype.toJSON=function(){var e,t;switch(this.handle){case v.IN_COMMAND:case v.NIN_COMMAND:return(e={})["$".concat(this.handle)]=this.objects,e;case v.NEQ_COMMAND:return{$ne:this.objects[0]};default:return(t={})["$".concat(this.handle)]=this.objects[0],t}},t.prototype._setName=function(e){return new t(this.handle,this.objects,e)},t.prototype.neq=function(e){var r=new t(v.NEQ_COMMAND,[e],this.name);return this.and(r)},t.prototype.gt=function(e){var r=new t(v.GT_COMMAND,[e],this.name);return this.and(r)},t.prototype.gte=function(e){var r=new t(v.GTE_COMMAND,[e],this.name);return this.and(r)},t.prototype.lt=function(e){var r=new t(v.LT_COMMAND,[e],this.name);return this.and(r)},t.prototype.lte=function(e){var r=new t(v.LTE_COMMAND,[e],this.name);return this.and(r)},t.prototype.in=function(e){var r=new t(v.IN_COMMAND,e,this.name);return this.and(r)},t.prototype.nin=function(e){var r=new t(v.NIN_COMMAND,e,this.name);return this.and(r)},t}(A);function b(e){return e&&e instanceof y&&e._internalType===h}!function(e){e.SET_COMMAND="set"}(D||(D={}));var w,C,g,N=function(e,t,r){this._internalType=p,Object.defineProperties(this,{_internalType:{enumerable:!1,configurable:!1}}),this.handle=e,this.objects=t,this.name=r||R},P="Date",T="Array",I="Object",S=["desc","asc"];!function(e){e.lt="<",e.gt=">",e.lte="<=",e.gte=">=",e.eq="=="}(C||(C={})),(w={})[C.lt]="$lt",w[C.lte]="$lte",w[C.eq]="$eq",w[C.gt]="$gt",w[C.gte]="$gte",function(e){e.DOC="DOC",e.WHERE="WHERE"}(g||(g={}));var j;!function(e){e["database.getDocument"]="database.getDocument",e["database.calculateDocument"]="database.calculateDocument",e["database.updateDocument"]="database.updateDocument",e["database.removeDocument"]="database.removeDocument",e["database.addDocument"]="database.addDocument"}(j||(j={}));var q;!function(e){e.collection="collection",e["collection.get"]="collection.get",e["collection.count"]="collection.count",e["collection.update"]="collection.update",e["collection.remove"]="collection.remove",e["collection.add"]="collection.add",e["collection.where"]="collection.where",e["collection.order-by"]="collection.order-by",e["collection.limit"]="collection.limit",e["collection.skip"]="collection.skip",e["collection.field"]="collection.field",e["collection.doc"]="collection.doc",e["doc.get"]="doc.get",e["doc.set"]="doc.set",e["doc.update"]="doc.update",e["doc.remove"]="doc.remove",e.serverDate="serverDate"}(q||(q={}));var L=function(){function e(e){var t=(void 0===e?{}:e).offset,r=void 0===t?0:t;if(!Number.isInteger(r))throw u(s.serverDate.SERVER_DATE_PARAM_ERROR,q.serverDate),new l(s.serverDate.SERVER_DATE_PARAM_ERROR);this.offset=r}return e.resetHasServerDate=function(){this.isHasServerDate=!1},e.setHasServerDate=function(e){this.isHasServerDate=e},e.getServerDate=function(){return this.isHasServerDate},Object.defineProperty(e.prototype,"_internalType",{get:function(){return E},enumerable:!1,configurable:!0}),e.prototype.parse=function(){return e.setHasServerDate(!0),{$dyc_server_date:{offset:this.offset}}},e}();function U(e){return new L(e)}var F={formatResDocumentData:function(e){return e.map((function(e){return F.formatField(e)}))},formatField:function(t){var r=Object.keys(t),n={};Array.isArray(t)&&(n=[]);for(var o=0,i=r;o<i.length;o++){var c=i[o],a=t[c],s=void 0;switch(F.whichType(a)){case P:s=a;break;case I:if("_id"===c&&e.ObjectId.isValid(a))try{s=a.toString()}catch(e){s=""}else s=F.formatField(a);break;case T:s=F.formatField(a);break;default:s=a}Array.isArray(n)?n.push(s):n[c]=s}return n},whichType:function(e){var t=Object.prototype.toString.call(e).slice(8,-1);return t===P?P:t}},H=function(e){if(!$(e))return e;for(var t in e)void 0===e[t]?delete e[t]:$(e[t])&&(e[t]=H(e[t]));return e},k=function(t){return t=H(t),e.EJSON.stringify(t,{relaxed:!1})};function B(e,t){return e&&Object.prototype.hasOwnProperty.call(e,t)}function J(e){return L.getServerDate()&&(e.has_server_date=!0),L.resetHasServerDate(),e}var Q=function(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()},$=function(e){return"object"===Q(e)},G=function(e){return"string"===Q(e)},W=function(e){return Array.isArray(e)},x=function(e){return"date"===Q(e)},V=function(e){return e&&e._internalType instanceof f},Y=function(e){var t=n({},e);for(var r in e){var o=e[r];if("boolean"==typeof o)t[r]=o?1:0;else if("number"==typeof o)t[r]=o>0?1:0;else{if(!$(o))throw u(s.collection.field.FILED_PARAM_ERROR,q["collection.field"]),new l(s.collection.field.FILED_PARAM_ERROR);var i=Y(o);for(var c in i)t["".concat(r,".").concat(c)]=i[c];delete t[r]}}return t},K={};for(var z in a)Object.prototype.hasOwnProperty.call(a,z)&&(K[z]="$"+z);for(var z in v)Object.prototype.hasOwnProperty.call(v,z)&&(K[z]="$"+z);for(var z in D)Object.prototype.hasOwnProperty.call(D,z)&&(K[z]="$"+z);function X(e){return K[e]||"$"+e}K[v.NEQ_COMMAND]="$ne";var Z={eq:function(e){return new y(v.EQ_COMMAND,[e])},neq:function(e){return new y(v.NEQ_COMMAND,[e])},lt:function(e){return new y(v.LT_COMMAND,[e])},lte:function(e){return new y(v.LTE_COMMAND,[e])},gt:function(e){return new y(v.GT_COMMAND,[e])},gte:function(e){return new y(v.GTE_COMMAND,[e])},in:function(e){return new y(v.IN_COMMAND,e)},nin:function(e){return new y(v.NIN_COMMAND,e)},and:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=W(e[0])?e[0]:e;return new A(a.AND_COMMAND,r)},nor:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=W(e[0])?e[0]:e;return new A(a.NOR_COMMAND,r)},or:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=W(e[0])?e[0]:e;return new A(a.OR_COMMAND,r)}},ee=function e(t,r){e.reqClass=t,l.reqClass=t,l.dbConfig=r,this.config=r,this.command=Z,this.serverDate=U};function te(e){return re(e,[e])}function re(e,t){if(V(e))return e._internalType===E?e.parse():e.toJSON?e.toJSON():e;if(x(e))return e;if(W(e))return e.map((function(e){if(t.includes(e))throw new l(s.common.PRESERVER_ERROR);return re(e,c(c([],t,!0),[e],!1))}));if($(e)){for(var r=n({},e),o={},i=0,a=Object.keys(r);i<a.length;i++){var u=a[i];if(t.includes(r[u]))throw new l(s.common.PRESERVER_ERROR);void 0!==r[u]&&(o[u]=re(r[u],c(c([],t,!0),[r[u]],!1)))}return o}return e}function ne(e){return oe(e,ie,[],[e])}function oe(e,t,r,o){var i=n({},e);for(var a in e)if(!/^\$/.test(a)){var u=e[a];if(void 0!==u){if(u&&$(u)&&!t(u)){if(o.includes(u))throw new l(s.common.PRESERVER_ERROR);var d=oe(u,t,c(c([],r,!0),[a],!1),c(c([],o,!0),[u],!1));i[a]=d;var _=!1;for(var f in d)/^\$/.test(f)?_=!0:(i["".concat(a,".").concat(f)]=d[f],delete i[a][f]);_||delete i[a]}}else delete i[a]}return i}function ie(e){return V(e)||x(e)}function ce(e){return te(e)}var ae=function(){function e(){}return e.encodeEJSON=function(t){var r=new e;return k(r.encodeUpdate(t))},e.prototype.encodeUpdate=function(e){return this.encodeUpdateObject(e)},e.prototype.encodeUpdateObject=function(e){var t=ne(e);for(var r in t)if(!/^\$/.test(r)){var n=t[r];n=ce(n),t[r]=n;var o=new N(D.SET_COMMAND,[n],r),i=this.encodeUpdateCommand(o);this.merge(t,i,r)}return t},e.prototype.encodeUpdateCommand=function(e){return this.encodeFieldUpdateCommand(e)},e.prototype.encodeFieldUpdateCommand=function(e){var t,r;return(t={})[X(e.handle)]=((r={})[e.name]=e.objects[0],r),t},e.prototype.merge=function(e,t,r){for(var n in t[r]||delete e[r],t)e[n]?W(e[n])?e[n].push(t[n]):$(e[n])&&$(t[n])?Object.assign(e[n],t[n]):e[n]=t[n]:e[n]=t[n]},e}(),se=function(){function t(e,t,r){this._db=e,this._coll=t,this.id=r,this._request=new ee.reqClass(this._db.config)}return t.prototype.get=function(){var t,r;return o(this,void 0,void 0,(function(){var n,o,c,a;return i(this,(function(i){switch(i.label){case 0:return n=k({_id:this.id}),o={collection_name:this._coll,query:n,query_type:g.DOC,multi:!1},[4,this._request.send(j["database.getDocument"],o,q["doc.get"])];case 1:return c=i.sent(),a=null===(t=null==c?void 0:c.list)||void 0===t?void 0:t.map((function(t){return console.log("item",t),console.log("parse 后的",e.EJSON.parse(t)),e.EJSON.parse(t)})),[2,{data:F.formatResDocumentData(null!=a?a:[]),requestId:null!==(r=null==c?void 0:c.request_id)&&void 0!==r?r:""}]}}))}))},t.prototype.set=function(e){var t,r;return o(this,void 0,void 0,(function(){var n,o;return i(this,(function(i){switch(i.label){case 0:if(!G(this.id)||""===this.id)throw u(s.doc.set.SET_PARAM_ERROR,q["doc.set"]),new l(s.doc.set.SET_PARAM_ERROR);if(!(e&&"object"===Q(e)&&Object.keys(e).length>0))throw u(s.doc.set.SET_PARAM_OBJECT_ERROR,q["doc.set"]),new l(s.doc.set.SET_PARAM_OBJECT_ERROR);if(B(e,"_id"))throw u(s.doc.set.SET_PARAM_HAS_ID_ERROR,q["doc.set"]),new l(s.doc.set.SET_PARAM_HAS_ID_ERROR);return n={collection_name:this._coll,query_type:g.DOC,update_data:k(te(e)),multi:!1,merge:!1,upsert:!0},this.id&&(n=Object.assign(n,{query:k({_id:this.id})})),[4,this._request.send(j["database.updateDocument"],J(n),q["doc.set"])];case 1:return o=i.sent(),[2,{updated:null!==(t=null==o?void 0:o.updated)&&void 0!==t?t:0,requestId:null!==(r=null==o?void 0:o.request_id)&&void 0!==r?r:""}]}}))}))},t.prototype.update=function(e){var t,r;return o(this,void 0,void 0,(function(){var n,o;return i(this,(function(i){switch(i.label){case 0:if(!G(this.id)||""===this.id)throw u(s.doc.update.UPDATE_PARAM_ERROR,q["doc.update"]),new l(s.doc.update.UPDATE_PARAM_ERROR);if(!(e&&"object"===Q(e)&&Object.keys(e).length>0))throw u(s.doc.update.UPDATE_PARAM_OBJECT_ERROR,q["doc.update"]),new l(s.doc.update.UPDATE_PARAM_OBJECT_ERROR);if(B(e,"_id"))throw u(s.doc.update.UPDATE_PARAM_HAS_ID_ERROR,q["doc.update"]),new l(s.doc.update.UPDATE_PARAM_HAS_ID_ERROR);return n={collection_name:this._coll,update_data:ae.encodeEJSON(e),query_type:g.DOC,multi:!1,merge:!0,upsert:!1},this.id&&(n=Object.assign(n,{query:k({_id:this.id})})),[4,this._request.send(j["database.updateDocument"],J(n),q["doc.update"])];case 1:return o=i.sent(),[2,{updated:null!==(t=null==o?void 0:o.updated)&&void 0!==t?t:0,requestId:null!==(r=null==o?void 0:o.request_id)&&void 0!==r?r:""}]}}))}))},t.prototype.remove=function(){var e,t;return o(this,void 0,void 0,(function(){var r,n,o;return i(this,(function(i){switch(i.label){case 0:return r=k({_id:this.id}),n={collection_name:this._coll,query:r,query_type:g.DOC,multi:!1},[4,this._request.send(j["database.removeDocument"],n,q["doc.remove"])];case 1:return o=i.sent(),[2,{deleted:null!==(e=o.deleted)&&void 0!==e?e:0,requestId:null!==(t=o.request_id)&&void 0!==t?t:""}]}}))}))},t}(),le=function(e){var t=new ue;return k(t.encodeQuery(e))},ue=function(){function e(){}return e.prototype.encodeQuery=function(e,t){if(ie(e)){if(b(e))return this.encodeQueryCommand(e);if(M(e))return this.encodeLogicCommand(e)}return $(e)?this.encodeQueryObject(e):e},e.prototype.encodeLogicCommand=function(e){var t,r,n,o=this;switch(e.handle){case a.NOR_COMMAND:case a.AND_COMMAND:case a.OR_COMMAND:var i=X(e.handle),c=e.objects.map((function(t){return o.encodeQuery(t,e.name)}));return(t={})[i]=c,t;default:i=X(e.handle);if(1===e.objects.length){c=this.encodeQuery(e.objects[0]);return(r={})[i]=c,r}var s=e.objects.map(this.encodeQuery.bind(this));return(n={})[i]=s,n}},e.prototype.encodeQueryCommand=function(e){return this.encodeComparisonCommand(e)},e.prototype.encodeComparisonCommand=function(e){var t,r,n,o,i,c;if(e.name===R)throw new l(s.common.UNSET_FIELD_ERROR);var a=X(e.handle);switch(e.handle){case v.EQ_COMMAND:case v.NEQ_COMMAND:case v.LT_COMMAND:case v.LTE_COMMAND:case v.GT_COMMAND:case v.GTE_COMMAND:return(t={})[e.name]=((r={})[a]=ce(e.objects[0]),r),t;case v.IN_COMMAND:case v.NIN_COMMAND:return(n={})[e.name]=((o={})[a]=ce(e.objects),o),n;default:return(i={})[e.name]=((c={})[a]=ce(e.objects[0]),c),i}},e.prototype.encodeQueryObject=function(e){for(var t=ne(e),r=0,n=Object.keys(t);r<n.length;r++){var o=n[r],i=t[o];if(M(i)){t[o]=i._setName(o);var c=this.encodeLogicCommand(t[o]);this.merge(t,c,o)}else if(b(i)){t[o]=i._setName(o);c=this.encodeComparisonCommand(t[o]);this.merge(t,c,o)}else ie(i)&&(t[o]=ce(i))}return t},e.prototype.merge=function(e,t,r){for(var n in t[r]||delete e[r],t)e[n]?W(e[n])?e[n]=e[n].concat(t[n]):$(e[n])&&$(t[n])?Object.assign(e,t):e[n]=t[n]:e[n]=t[n]},e}(),de=function(){function t(e,t,r,n){this._db=e,this._coll=t,this._fieldFilters=r,this._apiOptions=n||{},this._request=new ee.reqClass(this._db.config)}return t.prototype.where=function(e){if(!$(e))throw u(s.collection.where.WHERE_PARAM_OBJECT_ERROR,q["collection.where"]),new l(s.collection.where.WHERE_PARAM_OBJECT_ERROR);var r=Object.keys(e),o=r.some((function(t){return void 0!==e[t]}));if(r.length>0&&!o)throw u(s.collection.where.WHREE_PARAM_UNDEFINED_ERROR,q["collection.where"]),new l(s.collection.where.WHREE_PARAM_UNDEFINED_ERROR);return new t(this._db,this._coll,le(e),n({},this._apiOptions))},t.prototype.orderBy=function(e,r){var n;if(!/^[\w.-]/.test(e))throw u(s.collection["order-by"].ORDER_BY_FIELD_PATH_ERROR,q["collection.order-by"]),new l(s.collection["order-by"].ORDER_BY_FIELD_PATH_ERROR);if(!S.includes(r))throw u(s.collection["order-by"].ORDER_BY_DIRECTION_ERROR,q["collection.order-by"]),new l(s.collection["order-by"].ORDER_BY_DIRECTION_ERROR);var o=((n={})[e]="desc"===r?-1:1,n),i=this._apiOptions.order||{},c=Object.assign({},this._apiOptions,{order:Object.assign({},i,o)});return new t(this._db,this._coll,this._fieldFilters,c)},t.prototype.limit=function(e){if(!Number.isInteger(e))throw u(s.collection.limit.LIMIT_PARAM_ERROR,q["collection.limit"]),new l(s.collection.limit.LIMIT_PARAM_ERROR);var r=n({},this._apiOptions);return r.limit=e,new t(this._db,this._coll,this._fieldFilters,r)},t.prototype.skip=function(e){if(!Number.isInteger(e))throw u(s.collection.skip.SKIP_PARAM_ERROR,q["collection.skip"]),new l(s.collection.skip.SKIP_PARAM_ERROR);var r=n({},this._apiOptions);return r.offset=e,new t(this._db,this._coll,this._fieldFilters,r)},t.prototype.field=function(e){var r=Y(e),o=n({},this._apiOptions);return o.projection=r,new t(this._db,this._coll,this._fieldFilters,o)},t.prototype.get=function(){var t,r;return o(this,void 0,void 0,(function(){var n,o,c,a,s,l,u;return i(this,(function(i){switch(i.label){case 0:return n=this._apiOptions.order,o={collection_name:this._coll,query_type:g.WHERE},this._fieldFilters&&(o.query=this._fieldFilters),n&&(o.order=k(n)),c=this._apiOptions.offset,o.offset=c||0,a=this._apiOptions.limit,o.limit=a,(s=this._apiOptions.projection)&&(o.projection=k(s)),[4,this._request.send(j["database.getDocument"],J(o),q["collection.get"])];case 1:return l=i.sent(),u=null===(t=null==l?void 0:l.list)||void 0===t?void 0:t.map((function(t){return e.EJSON.parse(t)})),[2,{data:F.formatResDocumentData(null!=u?u:[]),requestId:null!==(r=l.request_id)&&void 0!==r?r:""}]}}))}))},t.prototype.count=function(){var e;return o(this,void 0,void 0,(function(){var t,r;return i(this,(function(n){switch(n.label){case 0:return t={collection_name:this._coll,query_type:g.WHERE},this._fieldFilters&&(t.query=this._fieldFilters),[4,this._request.send(j["database.calculateDocument"],J(t),q["collection.count"])];case 1:return r=n.sent(),[2,{total:null!==(e=null==r?void 0:r.total)&&void 0!==e?e:0,requestId:(null==r?void 0:r.request_id)||""}]}}))}))},t.prototype.update=function(e){var t,r;return o(this,void 0,void 0,(function(){var n,o;return i(this,(function(i){switch(i.label){case 0:if(!(e&&"object"===Q(e)&&Object.keys(e).length>0))throw u(s.collection.update.UPDATE_PARAM_ERROR,q["collection.update"]),new l(s.collection.update.UPDATE_PARAM_ERROR);if(B(e,"_id"))throw u(s.collection.update.UPDATE_ID_ERROR,q["collection.update"]),new l(s.collection.update.UPDATE_ID_ERROR);return n={collection_name:this._coll,query_type:g.WHERE,multi:!0,merge:!0,upsert:!1,update_data:ae.encodeEJSON(e)},this._fieldFilters&&(n=Object.assign(n,{query:this._fieldFilters})),[4,this._request.send(j["database.updateDocument"],J(n),q["collection.update"])];case 1:return o=i.sent(),[2,{updated:null!==(t=null==o?void 0:o.updated)&&void 0!==t?t:0,requestId:null!==(r=null==o?void 0:o.request_id)&&void 0!==r?r:""}]}}))}))},t.prototype.remove=function(){var e,t;return o(this,void 0,void 0,(function(){var r,n,o,c,a,u,d;return i(this,(function(i){switch(i.label){case 0:if(r=this._apiOptions,n=r.offset,o=r.limit,c=r.projection,a=r.order,void 0!==n||void 0!==o||void 0!==c||void 0!==a)throw new l(s.collection.remove.REMOVE_PARAM_ERROR);return u={collection_name:this._coll,query:this._fieldFilters,query_type:g.WHERE,multi:!0},[4,this._request.send(j["database.removeDocument"],J(u),q["collection.remove"])];case 1:return d=i.sent(),[2,{deleted:null!==(e=null==d?void 0:d.deleted)&&void 0!==e?e:0,requestId:null!==(t=null==d?void 0:d.request_id)&&void 0!==t?t:""}]}}))}))},t}(),_e=function(e){function t(t,r,n){var o=e.call(this,t,r,"",n)||this;return L.resetHasServerDate(),o}return r(t,e),t.prototype.getName=function(){return this._coll},t.prototype.doc=function(e){if("string"!=typeof e||""===e)throw u(s.doc.get.GET_PARAM_ERROR,q["collection.doc"]),new l(s.doc.get.GET_PARAM_ERROR);return new se(this._db,this._coll,e)},t.prototype.add=function(e){var t,r;return o(this,void 0,void 0,(function(){var n,o,c;return i(this,(function(i){switch(i.label){case 0:if(n=e,"object"!==Q(e))throw u(s.collection.add.ADD_PARAM_ERROR,q["collection.add"]),new l(s.collection.add.ADD_PARAM_ERROR);if(B(e,"_id")&&(!G(e._id)||""===e._id))throw u(s.collection.add.ADD_PARAM_ID_ERROR,q["collection.add"]),new l(s.collection.add.ADD_PARAM_ID_ERROR);return n=(n=[e]).map((function(e){return k(te(e))})),o={collection_name:this._coll,insert_data:n},[4,this._request.send(j["database.addDocument"],J(o),q["collection.add"])];case 1:return c=i.sent(),[2,{id:(null===(t=null==c?void 0:c.inserted_ids)||void 0===t?void 0:t.length)>0?null==c?void 0:c.inserted_ids[0]:"",requestId:null!==(r=null==c?void 0:c.request_id)&&void 0!==r?r:""}]}}))}))},t}(de),fe=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.collection=function(e){if(!e)throw u(s.collection.COLLECTION_PARAM_ERROR,q.collection),new l(s.collection.COLLECTION_PARAM_ERROR);return new _e(this,e)},t}(ee);exports.DataBaseError=l,exports.Db=fe,exports.databaseAPIActions=["database.getDocument","database.calculateDocument","database.updateDocument","database.removeDocument","database.addDocument"],exports.databaseMethods=["collection","collection.get","collection.count","collection.update","collection.remove","collection.add","collection.where","collection.order-by","collection.limit","collection.skip","collection.field","collection.doc","doc.get","doc.set","doc.update","doc.remove","serverDate"];
