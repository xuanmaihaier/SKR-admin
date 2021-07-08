/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-01 20:59:44
 * @LastEditors: stride
 * @LastEditTime: 2021-05-01 21:01:47
 */
import {GETDELIVERY} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function getDelivery(order_id) {
  return request(GETDELIVERY, METHOD.POST, {
    order_id
  })
}