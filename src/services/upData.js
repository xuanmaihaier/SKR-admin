/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-30 16:28:59
 * @LastEditors: stride
 * @LastEditTime: 2021-04-30 20:44:02
 */
import { UPDATA } from '@/services/api'
import { request, METHOD, } from '@/utils/request'
export async function upData(options) {
  return request(UPDATA, METHOD.POST, options)
}