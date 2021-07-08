/*
 * @Descripttion: 时间
 * @version: 
 * @Author: stride
 * @Date: 2021-04-26 10:43:00
 * @LastEditors: stride
 * @LastEditTime: 2021-05-05 19:23:08
 */
const timeList = [
  {
    CN: '早上好',
    US: 'Good morning',
  },{
    CN: '上午好',
    US: 'Good morning',
  },{
    CN: '中午好',
    US: 'Good afternoon',
  },{
    CN: '下午好',
    US: 'Good afternoon',
  },{
    CN: '晚上好',
    US: 'Good evening',
  }
]
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? timeList[0] : (hour <= 11 ? timeList[1] : (hour <= 13 ? timeList[2] : (hour <= 20 ? timeList[3] : timeList[4])))
}