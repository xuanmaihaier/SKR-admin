/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-26 14:07:07
 * @LastEditors: stride
 * @LastEditTime: 2021-04-27 11:43:35
 */
// 获取一级
import {TYPEONE,TYPETWO} from '@/services/api'
import {request, METHOD,} from '@/utils/request'
export async function getTypeOne() {
  return request(TYPEONE, METHOD.POST, {
  })
}
// 根据一级获取二级
export async function getTypeTwo(parent_name) {
  return request(TYPETWO, METHOD.POST, {
    parent_name
  })
}