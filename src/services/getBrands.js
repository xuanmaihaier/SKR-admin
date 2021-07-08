/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-28 11:17:53
 * @LastEditors: stride
 * @LastEditTime: 2021-04-28 11:28:55
 */
import {GETBRANDS} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function getBrands() {
  return request(GETBRANDS, METHOD.POST, {
  })
}