/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-04 13:29:20
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 16:36:15
 */
import { GETVOUCHER,ADDVOUCHER,EDITVOUTER,DELETEVOUTER } from '@/services/api'
import { request, METHOD, } from '@/utils/request'
export async function getVoucher(store_id) {
  return request(GETVOUCHER, METHOD.POST, {store_id})
}
export async function addVoucher(options) {
  return request(ADDVOUCHER, METHOD.POST, options)
}
export async function editVoucher(options) {
  return request(EDITVOUTER, METHOD.POST, options)
}
export async function deleteVoucher(id) {
  return request(DELETEVOUTER, METHOD.POST, {id})
}