/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-03 13:36:05
 * @LastEditors: stride
 * @LastEditTime: 2021-05-03 21:16:24
 */
import { GETBRANCE, UPBRAND, ADDBRAND, DELETBRAND } from '@/services/api'
import { request, METHOD, } from '@/utils/request'
export async function getBrands(store_id) {
  return request(GETBRANCE, METHOD.POST, {
    store_id
  })
}
export async function updataBrand(Options) {
  return request(UPBRAND, METHOD.POST,
    Options
  )
}
export async function addBrand(Options) {
  return request(ADDBRAND, METHOD.POST,
    Options
  )
}
export async function deletBrand(id) {
  return request(DELETBRAND, METHOD.POST,
    { id }
  )
}
