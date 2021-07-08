/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-30 13:40:19
 * @LastEditors: stride
 * @LastEditTime: 2021-04-30 13:41:49
 */
import {DELETE} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function deletShop(id) {
  return request(DELETE, METHOD.POST, {
    id
  })
}