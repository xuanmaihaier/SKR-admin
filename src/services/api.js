/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-26 10:03:33
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 23:33:38
 */
//跨域代理前缀
const API_PROXY_PREFIX = '/dev-api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  LOGIN: `${BASE_URL}/store/login`,
  TYPEONE: `${BASE_URL}/type/getParentName`,
  TYPETWO: `${BASE_URL}/wares/getSecond`,
  GETLIST: `${BASE_URL}/wares/getSpu`,
  GETSTOCK: `${BASE_URL}/wares/getStock`,
  GETBRANDS: `${BASE_URL}/store/getBrands`,
  ADDSPU: `${BASE_URL}/store/addSpu`,
  GETIMG: `${BASE_URL}/upload/upload`,
  GETSHOP: `${BASE_URL}/store/getSpu`,
  ADDSKU: `${BASE_URL}/store/addSku`,
  DELETE: `${BASE_URL}/store/deleteSpu`,
  UPDATA: `${BASE_URL}/store/updateQuick`,
  UPMODIFY: `${BASE_URL}/store/infoModify`,
  GETORDER: `${BASE_URL}/order/getOrder`,
  ORDERDETAIL: `${BASE_URL}/order/getOrderDetail`,
  UPORDER: `${BASE_URL}/order/updateOrder`,
  GETDELIVERY: `${BASE_URL}/delivery/getDelivery`,
  ADDORDER: `${BASE_URL}/order/addOrder`,
  DELETEORDER: `${BASE_URL}/order/deleteOrder`,
  GETBRANCE: `${BASE_URL}/wares/getBrands`,
  UPBRAND: `${BASE_URL}/wares/updataBrand`,
  ADDBRAND: `${BASE_URL}/wares/addBrand`,
  DELETBRAND: `${BASE_URL}/wares/deleteBrand`,
  GETVOUCHER:`${BASE_URL}/voucher/getVoucher`,
  ADDVOUCHER:`${BASE_URL}/voucher/addVoucher`,
  EDITVOUTER:`${BASE_URL}/voucher/editVoucheer`,
  DELETEVOUTER:`${BASE_URL}/voucher/deleteVoucher`,
  GETSHOPLIST:`${BASE_URL}/store/getShopList`
}
