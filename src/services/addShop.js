/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-28 14:58:11
 * @LastEditors: stride
 * @LastEditTime: 2021-04-29 19:17:15
 */
import {ADDSPU,GETSHOP,ADDSKU} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function addShop(options) {
  return request(ADDSPU, METHOD.POST, 
    options
  )
}
export async function getShop(verifyIndex) {
  return request(GETSHOP, METHOD.POST, 
    {verifyIndex}
  )
}
export async function addSku(options) {
  return request(ADDSKU, METHOD.POST, 
    options
  )
}