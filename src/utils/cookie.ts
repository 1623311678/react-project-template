/*用户登录之后，存储一个随机数+时间戳的字符串，来作为登录账号的唯一标识uid*/
export function setCookie(){
    const deviceCookie = getCookie('device')
    if(deviceCookie)return
    let num = "";   //定义用户编号
    for (var i = 0; i < 4; i++) //4位随机数，用以加在时间戳后面。
    {
        num += Math.floor(Math.random() * 10);
    }
    num = new Date().getTime() + num;  //时间戳，用来生成用户编号。
    document.cookie="device=" + num;
}

// 获取指定名称的cookie
export function getCookie(name:any){
    let strcookie = document.cookie;//获取cookie字符串
    let arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}