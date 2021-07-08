/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-04 23:34:37
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 23:35:38
 */
import { GETSHOPLIST } from '@/services/api'
import { request, METHOD, } from '@/utils/request'
export async function getShopList(store_id) {
  return request(GETSHOPLIST, METHOD.POST, {
    store_id
  })
}