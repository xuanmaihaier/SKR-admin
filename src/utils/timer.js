/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-04 13:49:04
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 13:49:22
 */
export default function package_data_format(item, fotmat) {
  let nowData = new Date(parseInt(item))
  let dateobj = {
    YYYY: nowData.getFullYear(),
    MM: nowData.getMonth() + 1,
    DD: nowData.getDate(),
    hh: nowData.getHours(),
    mm: nowData.getMinutes(),
    ss: nowData.getSeconds(),
  }
  for (let x in dateobj) {
    if (dateobj[x] < 10) {
      dateobj[x] = '0' + dateobj[x]
    }
    fotmat = fotmat.replace([x], dateobj[x])
  }
  return fotmat
}