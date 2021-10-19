/*重量单位转换成中文*/
import {weightUnitOptions} from '@src/common/constant'
export function getWeightUnit (val:string){
    let unit = ''
    weightUnitOptions.forEach(item=>{
        if(item.value === val){
            unit = item.label
        }
    })
    return unit
};