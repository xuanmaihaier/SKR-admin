/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-27 11:43:25
 * @LastEditors: stride
 * @LastEditTime: 2021-04-27 14:57:27
 */
import {GETLIST} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function getList(name,page) {
  return request(GETLIST, METHOD.POST, {
    name,
    page
  })
}