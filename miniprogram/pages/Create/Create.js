// pages/Create/Create.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnActive : false,
    title:null,
    fileList:[]
  },

// --------------------自定义--------------------
afterRead:function (event) {
  let files = event.detail.file;//选中的文件属性（type\url\thumb\size）
  let tempFileList = this.data.fileList;
  let sunLength = tempFileList.length;

  if(tempFileList.length != 0){
    for(let i = 0 ; i < files.length ; i++){
      tempFileList.push({number:sunLength + i , url:files[i].url , type:"image"})
    }
    this.setData({
      fileList:tempFileList
    })
  }else{
    for(let i = 0 ; i < files.length ; i++){
      tempFileList.push({number:i , url:files[i].url , type:"image"})
    }
    this.setData({
      fileList:tempFileList
    })
  }
},
//--------------------uploadAndUpdate-------------
uploadAndUpdate:function() {

  let files = this.data.fileList;

  for(let i  = 0; i< files.length; i++){
    const date = Date.parse(new Date()) / 1000;//时间戳
    wx.cloud.uploadFile({
      cloudPath:"uploadFiles/"+date+"("+ i +")"+".png",
      filePath:files[i].url,
    }).then(res => {
      this.data.fileList[i].url = res.fileID;
    })
}
this.setData({
  fileList:files
})
 



    


},



add:function(){
  db.collection('imageObject').add({
    data:{
      fileList:this.data.fileList,
      date:new Date()
    }
  })
},



ccccc:function (res) {
  console.log(res)
  console.log(this.data.fileList)
},

bindTextAreaBlur:function (params) {
  console.log(params.detail)
  if(params.detail.cursor == 0){
    this.setData({
      title:null
    })
  }else{this.setData({
    title:params.detail.value
  })}
  
},

//--------------------submit---------------------
submit:function () {
  this.uploadAndUpdate()
  // setTimeout(this.add,9000)
  wx.getUserProfile({
    desc: '用户获取头像和名称',
    success:(res) => {
      db.collection('imageObject').add({
        data:{
          fileList:this.data.fileList,
          date:new Date(),
          userName:res.userInfo.nickName,
          userImage:res.userInfo.avatarUrl,
          title:this.data.title
        }
      })
      console.log(res)},
    fail:(res) => {console.log(res)},
    complete:(res) => {
      wx.navigateBack();
      console.log(res)}
  })
},

//--------------------deleteImage----------------
deleteImage:function(event){
  let index = event.detail.index;
  this.data.fileList.splice(index,1);
  let arr = this.data.fileList;
  for(let i = index; i < arr.length; i++){
    arr[i].number = arr[i].number - 1;
  }

  this.setData({
    fileList:arr
  })





},

// --------------------自定义--------------------





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})