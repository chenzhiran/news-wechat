Page({
  data:{
    clickId: 1523074607656,
    //clickId:"",
    id: 1523074607656,
    newsContent:[],
    newsDetailTitle:"新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题",
    newsDetailSource: "新闻来源",
    newsDetailDate: "新闻日期",
    newsDetailReader: "阅读数量",
    newsDetailFirstImage: "/images/news-png0.png",
    newsDetailImage:"",
    contentId:"",
    contentType:"",
    contentText:""
  },
  onLoad(options) {
    this.setData({
      clickId: options.clickId
    })
    this.getNewsDetail();
  },
  
  //获取api的数据
  getNewsDetail() {
    
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        //id: this.data.clickId
        id: 1523074607650

      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setNewsDetail(result)
      }
    });
  },
  setNewsDetail(result){
    let newsDetailId = result.id
    let newsDetailTitle = result.title
    let newsDetailDate = result.date.substring(11, 16)
    let newsDetailSource = result.source
    let newsDetailReader = result.readCount
    let newsDetailFirstImage = result.firstImage
    let content = result.content
    //console.log(content)
    
    let newsContent = []
    for (let i = 1; i < 50; i++) {
      newsContent.push({
        contentId: content[i].id,
        contentType: content[i].type,
        contentText: content[i].text
        //contentSrc: content.source,
      })
    }  

    this.setData({
      newsDetailTitle: newsDetailTitle,
      newsDetailDate: newsDetailDate,
      newsDetailSource: newsDetailSource,
      newsDetailReader: "阅读：" + newsDetailReader,
      newsDetailFirstImage: newsDetailFirstImage,
      newsContent: newsContent
    })
  }
})