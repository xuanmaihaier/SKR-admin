/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-27 14:08:26
 * @LastEditors: stride
 * @LastEditTime: 2021-04-27 14:09:29
 */
import {GETSTOCK} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function getStock(category_id) {
  return request(GETSTOCK, METHOD.POST, {
    category_id
  })
}