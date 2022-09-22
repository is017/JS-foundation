function queryStringify(obj) {
    let str = ''
    for (let k in obj) str += `${k}=${obj[k]}&`
    return str.slice(0, -1)
}

function ajax(options) {
    let defaultoptions = {
        url: "",
        method: "GET",
        async: true,
        data: {},
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function () { },
        error: function () { }
    }
    let { url, method, async, data, headers, success, error } = {
        ...defaultoptions,
        ...options

    }


    console.log(url, method, async, data, headers, success, error)

    if (typeof data === 'object' && headers["content-type"]?.indexOf("json") > -1) {
        data = JSON.stringify(data)
    } else {
        data = queryStringify(data)
    }

    if(/^get$/i.test(method) && data) url += '?' + data

    const xhr = new XMLHttpRequest()
    xhr.open(method, url, async)
    xhr.onload = function () {
        if (!/^2\d{2}$/.test(xhr.status)) {
            error(`状态码错误：${xhr.status}`)
            return
        }
        // 执行解析
        try {
            let result = JSON.parse(xhr.responseText)
            success(result)
        } catch (err) {
            error(`解析失败`)
        }
    }

    for (let k in headers) xhr.setRequestHeader(k, headers[k])
    if (/^get$/i.test(method)) {
        xhr.send()
    } else {
        xhr.send(data)
    }

    // xhr.send(data)
}

function pajax(options){
    return new Promise((resolve,reject) =>{
        ajax({
            ...options,
            success(res){
                resolve(res)
            },
            error(err){
                reject(err)
            }
        })

    })
}

// export default ajax                                                                      