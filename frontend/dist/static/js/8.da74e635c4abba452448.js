webpackJsonp([8],{LFvD:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("bOdI"),a=i.n(r),s=i("mtWM"),n=i.n(s),o={components:{"search-filter":i("KI//").a},props:{id:Number,pageSize:Number,height:Number},data:function(){return{matching_entries:[],parameter_dialogFormVisible:!1,edit_parameter:{},options:[{value:"search",label:"全部搜索"},{value:"submit_user__username",label:"筛选：举报者"},{value:"user__username",label:"筛选：被举报者"},{value:"type",label:"筛选：举报类型"},{value:"verdict_type",label:"筛选：状态"}],select:"search",input:"",data:{count:0},Status:{GUI:"有罪",INN:"无罪",UNT:"未处理"},Types:{SCM:"诈骗行为",HRS:"恶意骚扰",ADV:"推销广告",PRN:"低俗色情",ILL:"违法信息",SPM:"垃圾内容",CPY:"侵权行为",OTH:"其他"},reports_notice:[]}},created:function(){var e=this;n.a.get("/matching-entries/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.matching_entries=t.data.results;for(var i=0;i<e.matching_entries.length;i++)0==e.matching_entries[i].notified?e.matching_entries[i].notified="未通知":1==e.matching_entries[i].notified&&(e.matching_entries[i].notified="已通知")}).catch(function(e){alert("error:"+e)}),n.a.get("/matching-hyperparameters/get-hyper/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.edit_parameter=t.data}).catch(function(e){alert("error:"+e)})},methods:{editMatchingParameters:function(){var e=this;n.a.post("/matching-hyperparameters/update-hyper/",this.edit_parameter,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.$message({type:"success",message:"发送成功!"}),location.reload()}).catch(function(e){alert("error:"+e)})},filterType:function(e,t){return t.type===e},handleMessage:function(e,t){var i=this;n.a.post("/matching-entries/"+t.id+"/matching-notify/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){i.$message({type:"success",message:"发送成功!"}),location.reload()}).catch(function(e){alert("error:"+e)})},sortChange:function(e,t,i){var r=this,a=void 0;a="descending"==e.order?"-"+e.prop:e.prop,n.a.get("/matching-entries",{params:{ordering:a,offset:0,limit:this.pageSize},headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){r.matching_entries=e.data.results;for(var t=0;t<r.matching_entries.length;t++)"false"==r.matching_entries[t].notified?r.matching_entries[t].notified="未通知":"true"==r.matching_entries[t].notified&&(r.matching_entries[t].notified="已通知")}).catch(function(e){console.log(e),r.$alert(e.response.data)})},enter:function(e){},searchAndFilter:function(e,t){this.select=e,this.input=t,this.changePage(1)},changePage:function(e){var t,i=this;n.a.get("/reports",{params:(t={},a()(t,this.select,this.input),a()(t,"offset",(e-1)*this.pageSize),a()(t,"limit",this.pageSize),t),headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){i.reports=e.data.results;for(var t=0;t<i.reports.length;t++)i.reports[t].created_at=i.extractTime(i.reports[t].created_at),i.reports[t].verdict_type=i.Status[i.reports[t].verdict_type],i.reports[t].type=i.Types[i.reports[t].type]}).catch(function(e){console.log(e),i.$alert(e.response.data)})}}},l={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-card",{staticClass:"title-card"},[e._v("\n    所有匹配信息\n    "),i("div",{staticClass:"edit"},[i("el-button",{staticClass:"change",attrs:{id:e.id,target:"rent-application",type:"primary"},on:{click:function(t){e.parameter_dialogFormVisible=!0}}},[e._v("修改匹配参数")])],1)]),e._v(" "),i("el-dialog",{staticClass:"edit_parameter",attrs:{title:"修改匹配参数",visible:e.parameter_dialogFormVisible,width:"40%"},on:{"update:visible":function(t){e.parameter_dialogFormVisible=t}}},[i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form",{attrs:{"label-width":"180px"}},[i("el-form-item",{attrs:{label:"启事匹配阈值"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:1,size:"mini",width:"60%"},model:{value:e.edit_parameter.matching_threshold,callback:function(t){e.$set(e.edit_parameter,"matching_threshold",t)},expression:"edit_parameter.matching_threshold"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"启事“地点”权重"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:10,size:"mini",width:"60%"},model:{value:e.edit_parameter.notice_location_weight,callback:function(t){e.$set(e.edit_parameter,"notice_location_weight",t)},expression:"edit_parameter.notice_location_weight"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"启事“时间”权重"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:10,size:"mini",width:"60%"},model:{value:e.edit_parameter.notice_time_weight,callback:function(t){e.$set(e.edit_parameter,"notice_time_weight",t)},expression:"edit_parameter.notice_time_weight"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"启事“描述”权重"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:10,size:"mini",width:"60%"},model:{value:e.edit_parameter.notice_desc_weight,callback:function(t){e.$set(e.edit_parameter,"notice_desc_weight",t)},expression:"edit_parameter.notice_desc_weight"}})],1)],1)],1),e._v(" "),i("el-col",{attrs:{span:12}},[i("el-form",{attrs:{"label-width":"120px"}},[i("el-form-item",{attrs:{label:"启事“其他”权重"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:10,size:"mini",width:"60%"},model:{value:e.edit_parameter.notice_extra_weight,callback:function(t){e.$set(e.edit_parameter,"notice_extra_weight",t)},expression:"edit_parameter.notice_extra_weight"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"物品“属性”权重"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:10,size:"mini",width:"60%"},model:{value:e.edit_parameter.prop_tag_weight,callback:function(t){e.$set(e.edit_parameter,"prop_tag_weight",t)},expression:"edit_parameter.prop_tag_weight"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"物品“描述”权重"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:10,size:"mini",width:"60%"},model:{value:e.edit_parameter.prop_desc_weight,callback:function(t){e.$set(e.edit_parameter,"prop_desc_weight",t)},expression:"edit_parameter.prop_desc_weight"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"物品“其他”权重"}},[i("el-input-number",{attrs:{precision:1,step:.1,"controls-position":"right",min:0,max:10,size:"mini",width:"60%"},model:{value:e.edit_parameter.prop_extra_weight,callback:function(t){e.$set(e.edit_parameter,"prop_extra_weight",t)},expression:"edit_parameter.prop_extra_weight"}})],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("div",{staticClass:"foot"},[i("el-button",{on:{click:function(t){e.parameter_dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.editMatchingParameters}},[e._v("确 定")])],1)])],1),e._v(" "),i("el-card",{staticClass:"table-card"},[i("el-table",{staticClass:"table",attrs:{data:e.matching_entries,stripe:"",id:"users-table"},on:{"row-click":e.enter,"sort-change":e.sortChange}},[i("el-table-column",{attrs:{prop:"id",label:"ID",width:"120",sortable:"custom"}}),e._v(" "),i("el-table-column",{attrs:{prop:"lost_property_name",label:"失物名称",width:"150",sortable:"custom","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{prop:"lost_notice_description",label:"失物描述",width:"250",sortable:"custom","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{prop:"found_property_name",label:"拾物名称",width:"150",sortable:"custom","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{prop:"found_notice_description",label:"拾物描述",width:"250",sortable:"custom","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{prop:"matching_degree",label:"匹配相似度",width:"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"notified",label:"状态",filters:[{text:"已通知",value:"已通知"},{text:"未通知",value:"未通知"}],"filter-method":e.filterType,width:"130"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"danger"},nativeOn:{click:function(i){return i.stopPropagation(),e.handleMessage(t.$index,t.row)}}},[e._v("通知")])]}}])})],1),e._v(" "),i("el-pagination",{staticClass:"page-chooser",attrs:{background:"",layout:"prev, pager, next",total:1},on:{"current-change":e.changePage}})],1)],1)},staticRenderFns:[]};var c={components:{"matching-entries-table":i("VU/8")(o,l,!1,function(e){i("icn8")},"data-v-4047a505",null).exports},methods:{},created:function(){"true"!=this.$store.getters.getUserLoginStatus&&this.$router.push("/login")}},p={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("matching-entries-table",{staticClass:"table",attrs:{id:-1,height:700,pageSize:10}})],1)},staticRenderFns:[]};var m=i("VU/8")(c,p,!1,function(e){i("fBrZ")},"data-v-6e7eb41a",null);t.default=m.exports},fBrZ:function(e,t){},icn8:function(e,t){}});
//# sourceMappingURL=8.da74e635c4abba452448.js.map