/**
 * featured_image -> featureImage
 * @param string 
 */

export default function underscore2Camel(string) {
    let arr = string.split('')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '_') {
            arr[i + 1] = arr[i + 1].toUpperCase()
        }
    }
    let rst = arr.join('')
    rst = rst.replace('_', '')
    return rst
}

/**
 * 把对象的key,从下划线都改成小驼峰
 * @param obj 
 */
export const makeAttributeCamel = obj => {
    if(!obj)return{}
    let keys = Object.keys(obj)
    let destObj = {}
    if(keys.length) {
        keys.forEach(k=>{
            // if (Array.isArray(obj[k])) {
                
            // }
            if(typeof obj[k] === 'object') {
                obj[k] = makeAttributeCamel(obj[k])
            }

            destObj[underscore2Camel(k)] = obj[k]
        })
    }
    return destObj
}

