webpackJsonp([8],{icOJ:function(e,t){},nXOw:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mtWM"),i=s.n(a),r=s("75LY"),n=s("Y9SB"),l=s("zAap"),o=s("exit"),u=s("QXW3"),d={components:{"lost-table":r.a,"found-table":n.a,"change-button":l.a,"del-button":o.a,"chat-dialog":u.a},props:{id:Number},data:function(){return{block_dialogFormVisible:!1,block_content:"",isAdmin:!0,isOwner:!0,user_data:[],user_origin:[],foundList:[],lostList:[],data:[{id:0,last_login:"2020.11.4 15:19",first_name:"一峰",last_name:"丁",email:"123@qq.com",date_joined:"2020.11.1 12:58",nickname:"natedingyifeng",phone:"12318012345",status:"未认证"},{id:1,last_login:"2020.11.4 15:20",first_name:"敬恒",last_name:"苏",email:"456@qq.com",date_joined:"2020.11.2 21:23",nickname:"hengsoosoo",phone:"12132012345",status:"未认证"}],dialogVisible:!1,status_options:[{value:"ACT",label:"活跃中"},{value:"INA",label:"不活跃"},{value:"SUS",label:"已禁用"}],Status:{PUB:"公开中",RET:"已归还",CLS:"已关闭",DFT:"草稿中"},notEdit:!0,user_image_visible:!1,user_image_url:"",user_images:[],user_images_urls:[],upload_show:!1,user_image_change:!1}},created:function(){var e=this;i.a.get("/users/"+this.id+"/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.user_data=t.data,e.user_origin=t.data;e.user_data.date_joined;null==e.user_data.wechat_avatar?(e.upload_show=!1,e.user_images_urls=[],e.user_images={}):(e.upload_show=!0,e.user_images_urls.push({url:e.user_data.wechat_avatar}),e.user_images={url:e.user_data.wechat_avatar}),console.log(e.user_images_urls)}).catch(function(e){alert("error:"+e)}),i.a.get("/found-notices/",{params:{author__id:this.id}}).then(function(t){e.foundList=t.data;for(var s=0;s<e.foundList.results.length;s++){var a=e.foundList.results[s].found_datetime,i=e.foundList.results[s].created_at,r=e.foundList.results[s].updated_at;e.foundList.results[s].found_datetime=e.extractTime(a),e.foundList.results[s].created_at=e.extractTime(i),e.foundList.results[s].updated_at=e.extractTime(r),e.foundList.results[s].status=e.Status[e.foundList.results[s].status]}}).catch(function(t){console.log(t),e.$alert(t.response.data)}),i.a.get("/lost-notices/",{params:{author__id:this.id}}).then(function(t){e.lostList=t.data;for(var s=0;s<e.lostList.results.length;s++){var a=e.lostList.results[s].lost_datetime,i=e.lostList.results[s].created_at,r=e.lostList.results[s].updated_at;e.lostList.results[s].lost_datetime=e.extractTime(a),e.lostList.results[s].created_at=e.extractTime(i),e.lostList.results[s].updated_at=e.extractTime(r),e.lostList.results[s].status=e.Status[e.lostList.results[s].status]}}).catch(function(t){console.log(t),e.$alert(t.response.data)}),this.changePage(1)},methods:{handleUserImagePreview:function(e){this.user_image_url=e.url,this.user_image_visible=!0},handleUserImageRemove:function(e){var t=new FormData;console.log(this.user_images_urls[0].url),t.append("url",this.user_images_urls[0].url),t.append("id",this.user_data.id),console.log(t),this.user_images={},this.user_images_urls=[],this.upload_show=!1,this.imageUserDeleteUpdate()},imageUserDeleteUpdate:function(){var e=this;this.user_data.wechat_avatar=null,this.user_origin.wechat_avatar=null,i.a.put("/users/"+this.id+"/",this.user_origin,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.upload_show=!1}).catch(function(t){e.$alert(t.response.data)}),this.$message({type:"success",message:"删除成功!"})},imageNoticeAddUpdate:function(){var e=this;this.user_data.wechat_avatar=this.user_images_urls[0].url,this.user_origin.images=this.user_images_urls[0].url,i.a.put("/users/"+this.id+"/",this.user_origin,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.upload_show=!0}).catch(function(t){e.$alert(t.response.data)}),this.$message({type:"success",message:"添加成功!"})},handleUserImageRemoveConfirm:function(e){var t=this;return this.$confirm("此操作将删除该图片, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.handleUserImageRemove(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})}),!1},saveImage:function(e,t){var s=this;this.user_images=e.raw,this.user_image_change=!0;var a=new FormData;a.append(e.name,e.raw),a.append("id",this.user_data.id),i()({url:"/users/upload-avatar/",method:"post",data:a,headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){s.upload_show=!0,s.user_images_urls=[{url:e.data.url[0]}],s.imageNoticeAddUpdate()}).catch(function(e){alert("error:"+e)})},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，本次选择了 "+e.length+" 个文件，共选择了 "+(e.length+t.length)+" 个文件")},DeleteUser:function(){var e=this;i.a.delete("/users/"+this.id+"/",{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(t){e.$router.push("/user-list")}).catch(function(e){alert("error:"+e)}),this.$message({type:"success",message:"删除成功!"})},DeleteUserConfirm:function(){var e=this;return this.$confirm("此操作将删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.DeleteUser()}).catch(function(){e.$message({type:"info",message:"已取消删除"})}),!1},blockUserConfirm:function(){var e=this;return this.$confirm("此操作将封禁该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.blockUser()}).catch(function(){e.$message({type:"info",message:"已取消封禁"})}),!1},blockUser:function(){var e=this;this.user_data.status="SUS",this.user_data.suspended_reason=this.block_content,i.a.put("/users/"+this.id+"/",this.user_data,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){location.reload()}).catch(function(t){e.$alert(t.response.data)}),this.$message("修改成功"),this.notEdit=!0},extractTime:function(e){var t=e.split("T"),s=t[0].split("-"),a=t[1].split("+")[0].split(":"),i=new Date,r=new Date,n=new Date;r.setDate(i.getDate()-1),n.setDate(i.getDate()-2);var l=void 0;if(Number(i.getFullYear())===Number(s[0])&&Number(i.getMonth()+1)===Number(s[1])&&Number(i.getDate())===Number(s[2]))if(Number(i.getHours())===Number(a[0])||Number(i.getHours())===Number(a[0])+1&&i.getMinutes()<Number(a[0])){var o=Number(i.getMinutes())<Number(a[1])?60+Number(i.getMinutes())-Number(a[1]):Number(i.getMinutes())-Number(a[1]);l=0===o?"不到1分钟前":String(o)+"分钟前"}else l=a[0]+":"+a[1];else l=Number(r.getFullYear())===Number(s[0])&&Number(r.getMonth()+1)===Number(s[1])&&Number(r.getDate())===Number(s[2])?"昨天 "+a[0]+":"+a[1]:Number(n.getFullYear())===Number(s[0])&&Number(n.getMonth()+1)===Number(s[1])&&Number(n.getDate())===Number(s[2])?"前天 "+a[0]+":"+a[1]:Number(i.getFullYear())!==Number(s[0])?t[0]+" "+a[0]+":"+a[1]:s[1]+"-"+s[2]+" "+a[0]+":"+a[1];return l},change:function(){this.notEdit=!1},confirm:function(){var e=this;i.a.put("/users/"+this.id+"/",this.user_data,{headers:{Authorization:"Bearer "+this.$store.getters.getUserAccessToken}}).then(function(e){location.reload()}).catch(function(t){e.$alert(t.response.data)}),this.$message("修改成功"),this.notEdit=!0},enterEquipment:function(e){this.$router.push({name:"user",params:{userId:e.id}})},enterFoundNotice:function(e){this.$router.push({name:"found",params:{foundId:e}})},enterLostNotice:function(e){this.$router.push({name:"lost",params:{lostId:e}})},openDialog:function(){this.dialogVisible=!1,this.dialogVisible=!0}}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-card",{staticClass:"title_card",staticStyle:{"font-size":"24px"}},[e._v("\n    "+e._s("用户详情#"+this.id)+"\n    "),s("div",{staticClass:"edit"},[e.isAdmin?s("el-button",{staticClass:"change",attrs:{id:e.id,data:e.data,target:"user",disabled:!e.notEdit,type:"primary"},on:{click:e.change}},[e._v("修改")]):e._e(),e._v(" "),e.isAdmin?s("el-button",{staticClass:"change",attrs:{id:e.id,data:e.data,target:"user",disabled:e.notEdit,type:"primary"},on:{click:e.confirm}},[e._v("确定")]):e._e(),e._v(" "),e.isAdmin?s("el-button",{staticClass:"change",attrs:{id:e.id,data:e.data,target:"user",type:"danger"},on:{click:function(t){e.block_dialogFormVisible=!0}}},[e._v("封禁")]):e._e(),e._v(" "),e.isAdmin?s("el-button",{staticClass:"change",attrs:{id:e.id,target:"user",type:"danger"},on:{click:e.DeleteUserConfirm}},[e._v("删除")]):e._e()],1)]),e._v(" "),s("el-dialog",{staticClass:"new_type",attrs:{title:"封禁原因",visible:e.block_dialogFormVisible},on:{"update:visible":function(t){e.block_dialogFormVisible=t}}},[s("el-form",{attrs:{"label-width":"100px"}},[s("el-form-item",{attrs:{label:"封禁原因"}},[s("el-input",{attrs:{autocomplete:"off",type:"textarea"},model:{value:e.block_content,callback:function(t){e.block_content=t},expression:"block_content"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("div",{staticClass:"foot"},[s("el-button",{on:{click:function(t){e.block_dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.blockUserConfirm}},[e._v("确 定")])],1)])],1),e._v(" "),s("el-card",{staticClass:"card"},[s("el-form",{staticClass:"form",attrs:{"label-width":"100px"}},[s("el-divider",[e._v("账户信息")]),e._v(" "),s("el-form-item",{attrs:{label:"ID"}},[s("el-row",[s("el-col",{attrs:{span:"2"}},[s("el-input",{staticStyle:{width:"100%"},attrs:{disabled:!0},model:{value:e.id,callback:function(t){e.id=t},expression:"id"}})],1),e._v(" "),s("el-col",{attrs:{span:"7"}},[s("el-form-item",{staticClass:"label",attrs:{label:"创建时间"}},[s("el-date-picker",{attrs:{type:"datetime",disabled:e.notEdit,placeholder:"创建时间",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.user_data.date_joined,callback:function(t){e.$set(e.user_data,"date_joined",t)},expression:"user_data.date_joined"}})],1)],1),e._v(" "),s("el-col",{attrs:{span:"7"}},[s("el-form-item",{staticClass:"label",attrs:{label:"上次登陆"}},[s("el-date-picker",{attrs:{type:"datetime",disabled:e.notEdit,placeholder:"上次登陆",format:"yyyy-MM-dd HH:mm:ss"},model:{value:e.user_data.last_login,callback:function(t){e.$set(e.user_data,"last_login",t)},expression:"user_data.last_login"}})],1)],1),e._v(" "),s("el-col",{attrs:{span:"8"}},[s("el-form-item",{staticClass:"label",attrs:{label:"用户身份"}},[s("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_superuser,callback:function(t){e.$set(e.user_data,"is_superuser",t)},expression:"user_data.is_superuser"}},[e._v("超级用户")]),e._v(" "),s("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_staff,callback:function(t){e.$set(e.user_data,"is_staff",t)},expression:"user_data.is_staff"}},[e._v("员工")])],1)],1)],1)],1),e._v(" "),s("el-divider",[e._v("用户信息")]),e._v(" "),s("el-form-item",{attrs:{label:"姓名"}},[s("el-row",[s("el-col",{attrs:{span:"10"}},[e._v("\n            姓\n            "),s("el-input",{staticStyle:{width:"35%"},attrs:{disabled:e.notEdit},model:{value:e.user_data.last_name,callback:function(t){e.$set(e.user_data,"last_name",t)},expression:"user_data.last_name"}}),e._v("\n            名\n            "),s("el-input",{staticStyle:{width:"35%"},attrs:{disabled:e.notEdit},model:{value:e.user_data.first_name,callback:function(t){e.$set(e.user_data,"first_name",t)},expression:"user_data.first_name"}})],1),e._v(" "),s("el-col",{attrs:{span:"6"}},[s("el-form-item",{attrs:{label:"昵称"}},[s("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.username,callback:function(t){e.$set(e.user_data,"username",t)},expression:"user_data.username"}})],1)],1),e._v(" "),s("el-col",{attrs:{span:"8"}},[s("el-form-item",{attrs:{label:"用户状态"}},[s("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_active,callback:function(t){e.$set(e.user_data,"is_active",t)},expression:"user_data.is_active"}},[e._v("活跃中")]),e._v(" "),s("el-checkbox",{attrs:{disabled:e.notEdit},model:{value:e.user_data.is_verified,callback:function(t){e.$set(e.user_data,"is_verified",t)},expression:"user_data.is_verified"}},[e._v("已认证")])],1)],1)],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"Email"}},[s("el-row",[s("el-col",{attrs:{span:"5"}},[s("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.email,callback:function(t){e.$set(e.user_data,"email",t)},expression:"user_data.email"}})],1),e._v(" "),s("el-col",{attrs:{span:"5"}},[s("el-form-item",{attrs:{label:"电话号码"}},[s("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.phone,callback:function(t){e.$set(e.user_data,"phone",t)},expression:"user_data.phone"}})],1)],1),e._v(" "),s("el-col",{attrs:{span:"7"}},[s("el-form-item",{attrs:{label:"微信id"}},[s("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.wechat_id,callback:function(t){e.$set(e.user_data,"wechat_id",t)},expression:"user_data.wechat_id"}})],1)],1),e._v(" "),s("el-col",{attrs:{span:"7"}},[s("el-form-item",{attrs:{label:"学生证号"}},[s("el-input",{attrs:{disabled:e.notEdit},model:{value:e.user_data.student_id,callback:function(t){e.$set(e.user_data,"student_id",t)},expression:"user_data.student_id"}})],1)],1)],1)],1),e._v(" "),s("el-form-item",{staticClass:"label",attrs:{label:"状态"}},[s("el-select",{attrs:{disabled:e.notEdit},model:{value:e.user_data.status,callback:function(t){e.$set(e.user_data,"status",t)},expression:"user_data.status"}},e._l(e.status_options,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),s("el-form-item",{staticClass:"label",attrs:{label:"图片"}},[s("div",{staticStyle:{"text-align":"initial","margin-top":"20px"}},[s("el-upload",{class:{is_hidden:e.upload_show},attrs:{action:"none","on-preview":e.handleUserImagePreview,"before-remove":e.handleUserImageRemoveConfirm,"auto-upload":!1,limit:1,"on-exceed":e.handleExceed,"list-type":"picture-card","file-list":e.user_images_urls,"on-change":e.saveImage,disabled:e.notEdit}},[s("i",{staticClass:"el-icon-plus"})]),e._v(" "),s("el-dialog",{attrs:{visible:e.user_image_visible},on:{"update:visible":function(t){e.user_image_visible=t}}},[s("img",{attrs:{width:"100%",src:e.user_image_url,alt:""}})])],1)]),e._v(" "),s("el-row",[s("el-col",{attrs:{span:12}},[s("el-divider",[e._v("失物招领")]),e._v(" "),s("el-timeline",{attrs:{reverse:e.reverse}},e._l(e.foundList.results,function(t,a){return s("el-timeline-item",{key:a,attrs:{timestamp:t.created_at}},[s("el-link",{attrs:{target:"_blank"},on:{click:function(s){return e.enterFoundNotice(t.id)}}},[e._v(e._s("发布失物招领: "+t.property.name))])],1)}),1)],1),e._v(" "),s("el-col",{attrs:{span:12}},[s("el-divider",[e._v("寻物启事")]),e._v(" "),s("el-timeline",{attrs:{reverse:e.reverse}},e._l(e.lostList.results,function(t,a){return s("el-timeline-item",{key:a,attrs:{timestamp:t.created_at}},[s("el-link",{attrs:{target:"_blank"},on:{click:function(s){return e.enterLostNotice(t.id)}}},[e._v(e._s("发布寻物启事: "+t.property.name))])],1)}),1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var _={components:{"user-card":s("VU/8")(d,c,!1,function(e){s("icOJ")},null,null).exports},data:function(){return{id:parseInt(this.$route.params.userId)}},created:function(){"true"!=this.$store.getters.getUserLoginStatus&&this.$router.push("/login")}},m={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("user-card",{staticClass:"info",attrs:{id:this.id}})],1)},staticRenderFns:[]};var h=s("VU/8")(_,m,!1,function(e){s("ngRv")},"data-v-44d8ffa2",null);t.default=h.exports},ngRv:function(e,t){}});
//# sourceMappingURL=8.5b0c1236aae592b7fce5.js.map