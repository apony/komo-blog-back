const Counters = require('./../models/counters')

/**
 * 获取集合的下一个id
 * @param collectionName
 * @returns {Promise<number|sequence|{default, type}>}
 */
async function getNextSequence(collectionName) {
    // 过程略麻烦，待小马哥研究
    let collection = await Counters.findOne({collectionName});
    if(!collection){
        await Counters.create({collectionName});
    }
    await Counters.where({collectionName}).updateOne({$inc: {sequence: 1}})
    const sequenceDocument = await Counters.findOne({collectionName})
    return sequenceDocument.sequence;
}

function dateFormat (date,fmt) {
    if(!fmt){
        fmt = 'yyyy-MM-dd HH:mm:ss' // 默认格式
    }
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(),    //日
        "H+": date.getHours(),   //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S" : date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports = {
    dateFormat,
    getNextSequence
};
