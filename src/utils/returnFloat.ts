/*数字补0*/
export function returnFloat (val:any,type:string = 'other'){
    if(type==='money'&&specialCurrency()){
        return val.toString();
    }else{
        let value = Math.round(parseFloat(val) * 100) / 100;
        let s = value.toString().split(".");
        if (s.length == 1) {
            value = value.toString() + ".00";
            return value.toString();
        }
        if (s.length > 1) {
            if (s[1].length < 2) {
                value = value.toString() + "0";
            }
            return value.toString();
        }
    }
};

export function specialCurrency (){
    if((localStorage.getItem('currency')==='HUF' || localStorage.getItem('currency')==='JPY' || localStorage.getItem('currency')==='TWD' || localStorage.getItem('currency')==='CLP')){
        return true
    }else{
        return false
    }
};