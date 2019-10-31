var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    addressList: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAddressList();
  },
  getAddressList ()
  {
    let that = this;
    var userInfo=wx.getStorageSync('userInfo');
    if(userInfo!="")
    {
      var userid = userInfo.Id;
      util.request(api.AddressList, { UserID: userid},'GET').then(function (res) {
        if (res.Status === 100) 
        {
          that.setData({addressList: res.Data});
        }
      });
    }
    
  },
  addressAddOrUpdate (event) {
    wx.navigateTo({
      url: '/pages/ucenter/addressAdd/addressAdd'
    })
  },
  deleteAddress:function(event){
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.AddressDelete, { id: addressId },'GET').then(function (res) {
            if (res.Status === 100) {
              that.getAddressList();
            }
          });
        }
      }
    })
    return false;
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})