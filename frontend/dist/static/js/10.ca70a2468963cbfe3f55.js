webpackJsonp([10],{"3Sr7":function(e,t){},nXOw:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("mtWM"),i=a.n(s),r=a("75LY"),n=a("Y9SB"),l=a("zAap"),o=a("exit"),u={components:{"lost-table":r.a,"found-table":n.a,"change-button":l.a,"del-button":o.a},props:{id:Number},data:function(){return{block_dialogFormVisible:!1,block_content:"",isAdmin:!0,isOwner:!0,user_data:[],user_origin:[],foundList:[],lostList:[],data:[{id:0,last_login:"2020.11.4 15:19",first_name:"一峰",last_name:"丁",email:"123@qq.com",date_joined:"2020.11.1 12:58",nickname:"natedingyifeng",phone:"12318012345",status:"未认证"},{id:1,last_login:"2020.11.4 15:20",first_name:"敬恒",last_name:"苏",email:"456@qq.com",date_joined:"2020.11.2 21:23",nickname:"hengsoosoo",phone:"12132012345",status:"未认证"}],dialogVisible:!1,status_options:[{value:"ACT",label:"活跃中"},{value:"INA",label:"不活跃"},{value:"SUS",label:"已禁用"}],Status:{PUB:"公开中",RET:"已归还",CLS:"已关闭",DFT:"草稿中"},notEdit:!0,user_image_visible:!1,user_image_url:"",user_images:[],user_images_urls:[],upload_show:!1,user_image_change:!1}},created:function(){var e=this;i.a.get("/users/"+this.id+"/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.user_data=t.data,e.user_origin=t.data;e.user_data.date_joined;null==e.user_data.wechat_avatar?(e.upload_show=!1,e.user_images_urls=[],e.user_images={}):(e.upload_show=!0,e.user_images_urls.push({url:e.user_data.wechat_avatar}),e.user_images={url:e.user_data.wechat_avatar})}).catch(function(e){alert("error:"+e)}),i.a.get("/found-notices/",{params:{author__id:this.id}}).then(function(t){e.foundList=t.data;for(var a=0;a<e.foundList.results.length;a++){var s=e.foundList.results[a].found_datetime,i=e.foundList.results[a].created_at,r=e.foundList.results[a].updated_at;e.foundList.results[a].found_datetime=e.extractTime(s),e.foundList.results[a].created_at=e.extractTime(i),e.foundList.results[a].updated_at=e.extractTime(r),e.foundList.results[a].status=e.Status[e.foundList.results[a].status]}}).catch(function(t){e.$alert(t.response.data)}),i.a.get("/lost-notices/",{params:{author__id:this.id}}).then(function(t){e.lostList=t.data;for(var a=0;a<e.lostList.results.length;a++){var s=e.lostList.results[a].lost_datetime,i=e.lostList.results[a].created_at,r=e.lostList.results[a].updated_at;e.lostList.results[a].lost_datetime=e.extractTime(s),e.lostList.results[a].created_at=e.extractTime(i),e.lostList.results[a].updated_at=e.extractTime(r),e.lostList.results[a].status=e.Status[e.lostList.results[a].status]}}).catch(function(t){e.$alert(t.response.data)})},methods:{handleUserImagePreview:function(e){this.user_image_url=e.url,this.user_image_visible=!0},handleUserImageRemove:function(e){var t=new FormData;t.append("url",this.user_images_urls[0].url),t.append("id",this.user_data.id),this.user_images={},this.user_images_urls=[],this.upload_show=!1,this.imageUserDeleteUpdate()},imageUserDeleteUpdate:function(){var e=this;this.user_data.wechat_avatar=null,this.user_origin.wechat_avatar=null,i.a.put("/users/"+this.id+"/",this.user_origin,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.upload_show=!1}).catch(function(t){e.$alert(t.response.data)}),this.$message({type:"success",message:"删除成功!"})},imageNoticeAddUpdate:function(){var e=this;this.user_data.wechat_avatar=this.user_images_urls[0].url,this.user_origin.images=this.user_images_urls[0].url,i.a.put("/users/"+this.id+"/",this.user_origin,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.upload_show=!0}).catch(function(t){e.$alert(t.response.data)}),this.$message({type:"success",message:"添加成功!"})},handleUserImageRemoveConfirm:function(e){var t=this;return this.$confirm("此操作将删除该图片, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.handleUserImageRemove(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})}),!1},saveImage:function(e,t){var a=this;this.user_images=e.raw,this.user_image_change=!0;var s=new FormData;s.append(e.name,e.raw),s.append("id",this.user_data.id),i()({url:"/users/upload-avatar/",method:"post",data:s,headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){a.upload_show=!0,a.user_images_urls=[{url:e.data.url[0]}],a.imageNoticeAddUpdate()}).catch(function(e){alert("error:"+e)})},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，本次选择了 "+e.length+" 个文件，共选择了 "+(e.length+t.length)+" 个文件")},DeleteUser:function(){var e=this;i.a.delete("/users/"+this.id+"/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.$router.push("/user-list")}).catch(function(e){alert("error:"+e)}),this.$message({type:"success",message:"删除成功!"})},DeleteUserConfirm:function(){var e=this;return this.$confirm("此操作将删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.DeleteUser()}).catch(function(){e.$message({type:"info",message:"已取消删除"})}),!1},blockUserConfirm:function(){var e=this;return this.$confirm("此操作将封禁该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.blockUser()}).catch(function(){e.$message({type:"info",message:"已取消封禁"})}),!1},blockUser:function(){var e=this;this.user_data.status="SUS",this.user_data.suspended_reason=this.block_content,i.a.put("/users/"+this.id+"/",this.user_data,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){location.reload()}).catch(function(t){e.$alert(t.response.data)}),this.$message("修改成功"),this.notEdit=!0},extractTime:function(e){var t=e.split("T"),a=t[0].split("-"),s=t[1].split("+")[0].split(":"),i=new Date,r=new Date,n=new Date;r.setDate(i.getDate()-1),n.setDate(i.getDate()-2);var l=void 0;if(Number(i.getFullYear())===Number(a[0])&&Number(i.getMonth()+1)===Number(a[1])&&Number(i.getDate())===Number(a[2]))if(Number(i.getHours())===Number(s[0])||Number(i.getHours())===Number(s[0])+1&&i.getMinutes()<Number(s[0])){var o=Number(i.getMinutes())<Number(s[1])?60+Number(i.getMinutes())-Number(s[1]):Number(i.getMinutes())-Number(s[1]);l=0===o?"不到1分钟前":String(o)+"分钟前"}else l=s[0]+":"+s[1];else l=Number(r.getFullYear())===Number(a[0])&&Number(r.getMonth()+1)===Number(a[1])&&Number(r.getDate())===Number(a[2])?"昨天 "+s[0]+":"+s[1]:Number(n.getFullYear())===Number(a[0])&&Number(n.getMonth()+1)===Number(a[1])&&Number(n.getDate())===Number(a[2])?"前天 "+s[0]+":"+s[1]:Number(i.getFullYear())!==Number(a[0])?t[0]+" "+s[0]+":"+s[1]:a[1]+"-"+a[2]+" "+s[0]+":"+s[1];return l},change:function(){this.notEdit=!1},confirm:function(){var e=this;i.a.put("/users/"+this.id+"/",this.user_data,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){location.reload()}).catch(function(t){e.$alert(t.response.data)}),this.$message("修改成功"),this.notEdit=!0},enterFoundNotice:function(e){this.$router.push({name:"found",params:{foundId:e}})},enterLostNotice:function(e){this.$router.push({name:"lost",params:{lostId:e}})},openDialog:function(){this.dialogVisible=!1,this.dialogVisible=!0}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-card",{staticClass:"title_card",staticStyle:{"font-size":"24px"}},[e._v("\n    "+e._s("用户详情#"+this.id)+"\n    "),a("div",{staticClass:"edit"},[e.isAdmin?a("el-button",{staticClass:"change",attrs:{id:e.id,data:e.data,target:"user",disabled:!e.notEdit,type:"primary"},on:{click:e.change}},[e._v("修改")]):e._e(),e._v(" "),e.isAdmin?a("el-button",{staticClass:"change",attrs:{id:e.id,data:e.data,target:"user",disabled:e.notEdit,type:"primary"},on:{click:e.confirm}},[e._v("确定")]):e._e(),e._v(" "),e.isAdmin?a("el-button",{staticClass:"change",attrs:{id:e.id,data:e.data,target:"user",type:"danger"},on:{click:function(t){e.block_dialogFormVisible=!0}}},[e._v("封禁")]):e._e(),e._v(" "),e.isAdmin?a("el-button",{staticClass:"change",attrs:{id:e.id,target:"user",type:"danger"},on:{click:e.DeleteUserConfirm}},[e._v("删除")]):e._e()],1)]),e._v(" "),a("el-dialog",{staticClass:"new_type",attrs:{title:"封禁原因",visible:e.block_dialogFormVisible},on:{"update:visible":function(t){e.block_dialogFormVisible=t}}},[a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:"封禁原因"}},[a("el-input",{attrs:{autocomplete:"off",type:"textarea"},model:{value:e.block_content,callback:function(t){e.block_content=t},expression:"block_content"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"foot"},[a("el-button",{on:{click:function(t){e.block_dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.blockUserConfirm}},[e._v("确 定")])],1)])],1),e._v(" "),a("el-card",{staticClass:"card"},[a("el-form",{staticClass:"form",attrs:{"label-width":"100px"}},[a("el-divider",[e._v("账户信息")]),e._v(" "),a("el-form-item",{attrs:{label:"ID"}},[a("el-row",[a("el-col",{attrs:{span:2}},[a("el-input",{staticStyle:{width:"100%"},attrs:{disabled:!0},model:{value:e.id,callback:function(t){e.id=t},expression:"id"}})],1),e._v(" "),a("el-col",{attrs:{span:7}},[a("el-form-item",{staticClass:"label",attrs:{label:"创建时间"}},[a("el-date-picker",{attrs:{type:"datetime",disabled:e.notEdit,placeholder:"创建时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.user_data.date_joined,callback:function(t){e.$set(e.user_data,"date_joined",t)},expression:"user_data.date_joined"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:7}},[a("el-form-item",{staticClass:"label",attrs:{label:"上次登陆"}},[a("el-date-picker",{attrs:{type:"datetime",disabled:e.notEdit,placeholder:"上次登陆",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.user_data.last_login,callback:function(t){e.$set(e.user_data,"last_login",t)},expression:"user_data.last_login"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticClass:"label",attrs:{label:"用户身份"}},[a("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_superuser,callback:function(t){e.$set(e.user_data,"is_superuser",t)},expression:"user_data.is_superuser"}},[e._v("超级用户")]),e._v(" "),a("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_staff,callback:function(t){e.$set(e.user_data,"is_staff",t)},expression:"user_data.is_staff"}},[e._v("员工")])],1)],1)],1)],1),e._v(" "),a("el-divider",[e._v("用户信息")]),e._v(" "),a("el-form-item",{attrs:{label:"姓名"}},[a("el-row",[a("el-col",{attrs:{span:10}},[e._v("\n            姓\n            "),a("el-input",{staticStyle:{width:"35%"},attrs:{disabled:e.notEdit},model:{value:e.user_data.last_name,callback:function(t){e.$set(e.user_data,"last_name",t)},expression:"user_data.last_name"}}),e._v("\n            名\n            "),a("el-input",{staticStyle:{width:"35%"},attrs:{disabled:e.notEdit},model:{value:e.user_data.first_name,callback:function(t){e.$set(e.user_data,"first_name",t)},expression:"user_data.first_name"}})],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"昵称"}},[a("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.username,callback:function(t){e.$set(e.user_data,"username",t)},expression:"user_data.username"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"用户状态"}},[a("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_active,callback:function(t){e.$set(e.user_data,"is_active",t)},expression:"user_data.is_active"}},[e._v("活跃中")]),e._v(" "),a("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_verified,callback:function(t){e.$set(e.user_data,"is_verified",t)},expression:"user_data.is_verified"}},[e._v("已认证")])],1)],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"Email"}},[a("el-row",[a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.email,callback:function(t){e.$set(e.user_data,"email",t)},expression:"user_data.email"}})],1),e._v(" "),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"电话号码"}},[a("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.phone,callback:function(t){e.$set(e.user_data,"phone",t)},expression:"user_data.phone"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"微信id"}},[a("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.wechat_id,callback:function(t){e.$set(e.user_data,"wechat_id",t)},expression:"user_data.wechat_id"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"学生证号"}},[a("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.student_id,callback:function(t){e.$set(e.user_data,"student_id",t)},expression:"user_data.student_id"}})],1)],1)],1)],1),e._v(" "),a("el-form-item",{staticClass:"label",attrs:{label:"状态"}},[a("el-select",{attrs:{disabled:e.notEdit},model:{value:e.user_data.status,callback:function(t){e.$set(e.user_data,"status",t)},expression:"user_data.status"}},e._l(e.status_options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"label",attrs:{label:"图片"}},[a("div",{staticStyle:{"text-align":"initial","margin-top":"20px"}},[a("el-upload",{class:{is_hidden:e.upload_show},attrs:{action:"none","on-preview":e.handleUserImagePreview,"before-remove":e.handleUserImageRemoveConfirm,"auto-upload":!1,limit:1,"on-exceed":e.handleExceed,"list-type":"picture-card","file-list":e.user_images_urls,"on-change":e.saveImage,disabled:e.notEdit}},[a("i",{staticClass:"el-icon-plus"})]),e._v(" "),a("el-dialog",{attrs:{visible:e.user_image_visible},on:{"update:visible":function(t){e.user_image_visible=t}}},[a("img",{attrs:{width:"100%",src:e.user_image_url,alt:""}})])],1)]),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-divider",[e._v("失物招领")]),e._v(" "),a("el-timeline",e._l(e.foundList.results,function(t,s){return a("el-timeline-item",{key:s,attrs:{timestamp:t.created_at}},[a("el-link",{attrs:{target:"_blank"},on:{click:function(a){return e.enterFoundNotice(t.id)}}},[e._v(e._s("发布失物招领: "+t.property.name))])],1)}),1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-divider",[e._v("寻物启事")]),e._v(" "),a("el-timeline",e._l(e.lostList.results,function(t,s){return a("el-timeline-item",{key:s,attrs:{timestamp:t.created_at}},[a("el-link",{attrs:{target:"_blank"},on:{click:function(a){return e.enterLostNotice(t.id)}}},[e._v(e._s("发布寻物启事: "+t.property.name))])],1)}),1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var c={components:{"user-card":a("VU/8")(u,d,!1,function(e){a("3Sr7")},"data-v-d4dc9f14",null).exports},data:function(){return{id:parseInt(this.$route.params.userId)}},created:function(){"true"!=this.$store.getters.getUserLoginStatus&&this.$router.push("/login")}},_={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("user-card",{staticClass:"info",attrs:{id:this.id}})],1)},staticRenderFns:[]};var m=a("VU/8")(c,_,!1,function(e){a("ngRv")},"data-v-44d8ffa2",null);t.default=m.exports},ngRv:function(e,t){}});
//# sourceMappingURL=10.ca70a2468963cbfe3f55.js.map