webpackJsonp([12],{"5btk":function(e,t){},"6kXm":function(e,t){},ybdr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mtWM"),r=a.n(i),s={components:{"search-filter":a("KI//").a},props:{id:Number,pageSize:Number,height:Number},data:function(){return{verification_applications:[],options:[{value:"search",label:"全部搜索"},{value:"user__username",label:"筛选：申请者"},{value:"status",label:"筛选：状态"}],select:"search",input:"",data:{count:0},Status:{ACC:"通过",REJ:"拒绝",TBD:"未处理"},certifications_sum:0,pageSize:10}},created:function(){var e=this;r.a.get("/user-verification-applications/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.verification_applications=t.data.results;for(var a=0;a<e.verification_applications.length;a++)e.getUserName(a),e.verification_applications[a].created_at=e.extractTime(e.verification_applications[a].created_at),e.verification_applications[a].status=e.Status[e.verification_applications[a].status];e.certifications_sum=t.data.count,console.log(e.certifications_sum/e.pageSize)}).catch(function(e){alert("error:"+e)}),this.changePage(1)},methods:{getUserName:function(e){var t=this;r.a.get("/users/"+this.verification_applications[e].user+"/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(a){t.verification_applications[e].user=a.data.username}).catch(function(e){alert("error:"+e)})},enter:function(e){this.$router.push({name:"certification-application",params:{certificationApplicationId:e.id}})},searchAndFilter:function(e,t){this.select=e,this.input=t,this.changePage(1)},changePage:function(e){var t=this;r.a.get("/user-verification-applications",{params:{page:e},headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){t.verification_applications=e.data.results;for(var a=0;a<t.verification_applications.length;a++)t.getUserName(a),t.verification_applications[a].created_at=t.extractTime(t.verification_applications[a].created_at),t.verification_applications[a].status=t.Status[t.verification_applications[a].status]}).catch(function(e){console.log(e),t.$alert(e.response.data)})},extractTime:function(e){var t=e.split("T"),a=t[0].split("-"),i=t[1].split("+")[0].split(":"),r=new Date,s=new Date,n=new Date;s.setDate(r.getDate()-1),n.setDate(r.getDate()-2);var c=void 0;if(Number(r.getFullYear())===Number(a[0])&&Number(r.getMonth()+1)===Number(a[1])&&Number(r.getDate())===Number(a[2]))if(Number(r.getHours())===Number(i[0])||Number(r.getHours())===Number(i[0])+1&&r.getMinutes()<Number(i[0])){var o=Number(r.getMinutes())<Number(i[1])?60+Number(r.getMinutes())-Number(i[1]):Number(r.getMinutes())-Number(i[1]);c=0===o?"不到1分钟前":String(o)+"分钟前"}else c=i[0]+":"+i[1];else c=Number(s.getFullYear())===Number(a[0])&&Number(s.getMonth()+1)===Number(a[1])&&Number(s.getDate())===Number(a[2])?"昨天 "+i[0]+":"+i[1]:Number(n.getFullYear())===Number(a[0])&&Number(n.getMonth()+1)===Number(a[1])&&Number(n.getDate())===Number(a[2])?"前天 "+i[0]+":"+i[1]:Number(r.getFullYear())!==Number(a[0])?t[0]+" "+i[0]+":"+i[1]:a[1]+"-"+a[2]+" "+i[0]+":"+i[1];return c}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"title-card"},[e._v("所有认证申请")]),e._v(" "),a("search-filter",{attrs:{options:e.options},on:{search:e.searchAndFilter}}),e._v(" "),a("el-card",{staticClass:"table-card"},[a("el-table",{staticClass:"table",attrs:{data:e.verification_applications,stripe:"",id:"users-table"},on:{"row-click":e.enter}},[a("el-table-column",{attrs:{prop:"id",label:"ID",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"created_at",label:"创建时间",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"user",label:"申请者",width:"800"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"150"}})],1),e._v(" "),a("el-pagination",{staticClass:"page-chooser",attrs:{background:"",layout:"prev, pager, next",total:e.certifications_sum},on:{"current-change":e.changePage}})],1)],1)},staticRenderFns:[]};var c={components:{"certification-application-table":a("VU/8")(s,n,!1,function(e){a("6kXm")},"data-v-1027e792",null).exports},methods:{},created:function(){"true"!=this.$store.getters.getUserLoginStatus&&this.$router.push("/login")}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("certification-application-table",{staticClass:"table",attrs:{id:-1,height:700,pageSize:10}})],1)},staticRenderFns:[]};var u=a("VU/8")(c,o,!1,function(e){a("5btk")},"data-v-e9feaa70",null);t.default=u.exports}});
//# sourceMappingURL=12.bd7cd62fea382ff77b24.js.map