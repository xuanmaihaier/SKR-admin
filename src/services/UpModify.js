/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-30 23:05:12
 * @LastEditors: stride
 * @LastEditTime: 2021-04-30 23:06:19
 */
import { UPMODIFY } from '@/services/api'
import { request, METHOD, } from '@/utils/request'
export async function UpModify(options) {
  return request(UPMODIFY, METHOD.POST, options)
}