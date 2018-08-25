Page({
  data:{
    clickId: "",
  },
  onLoad(options){
    this.setData({
      clickId: options.clickId,
    })
    console.log(clickId)
  }
})