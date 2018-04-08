export let myGlobalClass = new class myClass {
    constructor() { }
    stopFunc(e) { e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true; }
    /**
        * 转[{text:'',value:''}]
        * @param {object} arr 数组 [{a:1,b:2},{a:3,b:4}]
        */
    getFaultArr(arr) {
        let arr_classify = [];

        for (let i = 0; i < arr.length; i++) {
            for (let key in arr[i]) {
                let json_classify = {
                    value: '',
                    text: ''
                };
                json_classify.value = key;
                json_classify.text = arr[i][key];
                arr_classify.push(json_classify);
            }
        }
        return arr_classify;
    }
    /**
   * 获取时间
   */
    getNowDateTime(_date) {
        var date = _date;
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            " " + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds();
        return currentdate;
    }
    //获取之前或者之后的时间
    computingAfterBeforeDateTime(daynum,dd=new Date()) {
        //var dd = new Date();
        dd.setDate(dd.getDate() + daynum); //获取AddDayCount天后的日期    
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0    
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0    
        return y + "-" + m + "-" + d + ' ' + dd.getHours() + ':' + dd.getMinutes() + ':' + dd.getSeconds();
    }
    /**
         * 数据归类 （分页格式）[[{a:1,b:2},{a:3,b:4}],[{a:5,b:6}]]//每页2条数据
         * @param {object} 加载的到的数据[{a:1,b:2},{a:3,b:4},{a:5,b:6}]
         * @param {number} 每页几条数据
         */
    dataRank(_data, _num) {
        let b = [
            []
        ];
        for (let i = 0; i < _data.length; i++) {
            for (let key in _data[i]) {
                _data[i][key] = _data[i][key] == '&nbsp;' ? '' : _data[i][key];
            }
            b[b.length - 1].push(_data[i]);
            if ((i % _num === (_num - 1))) b.push([]);
        }
        if(b[b.length-1].length===0){
            b.pop()
        }
        return b;
    }
    /**
    * 添加text和value值
    * @param {object} _data 得到的数据 [{},{}]
    * @param {string} name 名字
    * @param {number} id 标识
    */
    arrangementData(_data, _name, _id) {
        for (let i = 0; i < _data.length; i++) {
            _data[i]["text"] = _data[i][_name];
            _data[i]["value"] = _data[i][_id];
        }
        return _data;
    }
    /**
   * 获取地址栏参数
   * @param {string} str 地址栏键名
   */
    getQueryString(str) {
        var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
    /**
     * 寻找省份
     * @param {object} provinceData 得到的数据 [{},{}]
     * @param {number} value 省份标识
     */
    findProvince(provinceData, _value) {
        for (let i = 0; i < provinceData.length; i++) {
            for (var key in provinceData[i]) {
                if (provinceData[i]['value'] == _value) {
                    return provinceData[i]['text'];
                }
            }
        }
    }
    substrText(val,num=50){
    return val.length>num?val.substr(0,num)+'…':val
    }
}()

export default {
    name: 'globalVariable',
    url: [{
        urlIp1: 'http://eshangtech.com:6060',
        // urlIp1: 'http://192.168.11.192:6060',
        //urlIp1:'http://192.168.12.110:6060',
        urlPath1: '/MobileServicePlatform/Handler/handler_ajax.ashx?action_type=',
        //返回数据列表
        urlName1: 'GetProblemCollection',
        //获取省份数据
        urlName2: 'GetProvince',
        //获取服务区数据
        urlName3: 'GetServerpart',
        //每日报修统计
        urlName4: 'GetWarrantyStatistics',
        //每日保修统计（10天数据）
        urlName5:'GetMultipleWarrantyStatistics',
        //查询疑难问题（模糊查询 省份、内容、服务区、人）
        urlName6:'GetProblemCollectionVague'
    }],
    arr: [{
        //故障类型
        parameter: 'fault_type',
        name: '故障类型',
        keyName: 'faultType',
        _arr: [
        //     {
        //     sort:'-1',
        //     index: '',
        //     value: '全部'
        // },
        {
            sort:'0',
            index: '1',
            value: '数据上传类'
        },
        {
            sort:'1',
            index: '2',
            value: '硬件故障类'
        },
        {
            sort:'2',
            index: '3',
            value: '技术故障类'
        },
        {
            sort:'3',
            index: '4',
            value: '误报'
        }, 
        {
            sort:'4',
            index: '5',
            value: '其他类'
        },
        {
            sort:'5',
            index: '6',
            value: '功能指导类'
        },
        {
            sort:'6',
            index: '7',
            value: '收银主机故障'
        },
        {
            sort:'7',
            index: '8',
            value: '打印机故障'
        },
        {
            sort:'8',
            index: '9',
            value: '钱箱故障'
        },
        {
            sort:'9',
            index: '10',
            value: '显客故障'
        },
        {
            sort:'10',
            index: '11',
            value: '键盘故障'
        }]
    },
    //功能模块类型
    {
        parameter: 'module_type',
        name: '功能模块',
        keyName: 'moduleType',
        _arr: [
        //     {
        //     sort:'-1',
        //     index: '',
        //     value: '全部'
        // },
        {
            sort:'0',
            index: '1',
            value: '仓储类'
        },
        {
            sort:'1',
            index: '2',
            value: '进销存类'
        },
        {
            sort:'2',
            index: '3',
            value: '合同类'
        },
        {
            sort:'3',
            index: '4',
            value: '财务报销类'
        }, 
        {
            sort:'4',
            index: '5',
            value: '应收账款类'
        },
        {
            sort:'5',
            index: '6',
            value: '数据校验类'
        },
        {
            sort:'6',
            index: '7',
            value: '商品数据类'
        },
        {
            sort:'7',
            index: '8',
            value: '其他类'
        }]
    },
    //解决类型
    {
        parameter: 'issolved',
        name: '解决类型',
        keyName: 'isSolved',
        _arr: [
        //     {
        //     sort:'-1',
        //     index: '',
        //     value: '全部'
        // },
        {
            sort:'0',
            index: '0',
            value: '未处理'
        },
        {
            sort:'1',
            index: '1',
            value: '已解决'
        },
        {
            sort:'2',
            index: '2',
            value: '未解决'
        },
        {
            sort:'3',
            index: '3',
            value: '现场解决'
        },
        {
            sort:'4',
            index: '4',
            value: '寄件解决'
        }]
    },
    //维护类型
    {
        parameter: 'problem_type',
        name: '维护类型',
        keyName: 'problemType',
        _arr: [
        //     {
        //     sort:'-1',
        //     index: '',
        //     value: '全部'
        // },
        {
            sort:'0',
            index: '1',
            value: '软件维护'
        },
        {
            sort:'1',
            index: '2',
            value: '硬件维护'
        }]
    }
    ]


}