Page({
  data: {
    title: "快读资讯",
    newsList: [],
    hidden: false,
    page: 1,
    tab: "gn",
    clickId:"",
    newsTopTitle:"",
    newsTopSource:"",
    newsTopDate:"",
    newsTopImage:"",
    newsTitle:"",
    newsSource:"",
    newsDate:"",
    newsImage:"",
    contentItemTitle:[
      { name: "国内", id: "gn" },
      { name: "国际", id: "gj" },
      { name: "财经", id: "cj" },
      { name: "娱乐", id: "yl" },
      { name: "军事", id: "js" },
      { name: "体育", id: "ty" },
      { name: "其他", id: "other" },
    ]
  },
                      
  //标题的点击事件
  onContentItemClick:function(e){
  //console.log(e)
  //console.log(e.currentTarget.dataset.id)
    this.setData({
      tab: e.currentTarget.dataset.id,
    })
    this.getNewsData()
  },

  //新闻的点击事件
  onNewsItemClick:function(e){
    //console.log(e)
    let clickId = e.currentTarget.dataset.id
    //console.log(clickId)
    
    //跳转
    wx.navigateTo({
      url: '/pages/content/content?clickId=' + this.data.clickId,
    })
  },


  onLoad() {
    //console.log(1)
    this.getNewsData();
  },

//获取api的数据
  getNewsData(){
    
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.tab
      },
      success: res => {
        //console.log(res)
        let result = res.data.result
        //console.log(result)
        this.setTopNewsData(result)   
        this.setNewsData(result)  
      }
    });
  },

  //设置第一个大图新闻
  setTopNewsData(result){
    let id = result[0].id
    let newsTopTitle = result[0].title 
    let newsTopDate = result[0].date.substring(11, 16)
    let newsTopSource = result[0].source
    let newsTopImage = result[0].firstImage
    //console.log(newsTopDate)
    
    this.setData({
      newsTopTitle: newsTopTitle,
      newsTopDate: newsTopDate,
      newsTopSource: newsTopSource,
      newsTopImage: newsTopImage, 
    })
  },

  //设置其他的新闻
  setNewsData(result){
    let newsList = []
    for(let i=1;i<9;i++){
      newsList.push({
        id: result[i].id,
        newsTitle: result[i].title,
        newsDate: result[i].date.substring(11, 16),
        newsSource: result[i].source,
        newsImage: result[i].firstImage
      })  
    }
    //console.log(newsList)
    this.setData({
      newsList: newsList
    })
  }

})
