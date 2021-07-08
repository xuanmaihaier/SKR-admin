/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-01 14:01:08
 * @LastEditors: stride
 * @LastEditTime: 2021-05-03 21:15:40
 */
import {GETORDER,ORDERDETAIL,UPORDER,ADDORDER,DELETEORDER} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function getOrder(store_id,count,page) {
  return request(GETORDER, METHOD.POST, {
    store_id,
    count,
    page
  })
}
export async function getOrderDetail(order_id) {
  return request(ORDERDETAIL, METHOD.POST, {
    order_id
  })
}
export async function updateOrder(opition) {
  return request(UPORDER, METHOD.POST,opition)
}
export async function addOrder(opition) {
  return request(ADDORDER, METHOD.POST,opition)
}
export async function deletOrder(id) {
  return request(DELETEORDER, METHOD.POST,{id})
}