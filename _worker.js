let socks5s = [];
let FileName = 'Socks2VLESS订阅生成器';
let SUBUpdateTime = 6;
let subConverter = 'subapi.cmliussss.net';
let subConfig = 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini';
const fakeUserID = '00000000-0000-0000-0000-000000000000';
const fakeHostName = 'www.baidu.com';
let 网络备案 = `提供维护 - <a href='https://t.me/eziyuan'>🆉🆈🅵🆇|节点|软件|TG代理|VPN</a>`;//写你自己的维护者广告
let 网站图标, 网站背景;

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const 路径 = url.pathname;
        const userAgentHeader = request.headers.get('User-Agent');
        const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";

        subConverter = env.SUBAPI || subConverter;
        subConfig = env.SUBCONFIG || subConfig;
        FileName = env.SUBNAME || FileName;
        网站图标 = env.ICO ? `<link rel="icon" sizes="32x32" href="${env.ICO}">` : '';
        网络备案 = env.BEIAN || env.BY || 网络备案;
        if (env.IMG) {
            const imgs = await 整理(env.IMG);
            网站背景 = `background-image: url('${imgs[Math.floor(Math.random() * imgs.length)]}');`;
        } else 网站背景 = 'background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);';

        if (路径 === '/sub') {
            const 优选域名 = url.searchParams.get('address') || 'icook.hk';
            const 优选端口 = url.searchParams.get('port') || '443';
            //判断是否有参数host和uuid
            if (!url.searchParams.has('host') || !(url.searchParams.has('uuid') || url.searchParams.has('password') || url.searchParams.has('pw'))) {
                return new Response('缺少参数host或uuid', { status: 400 });
            }
            const host = url.searchParams.get('host');
            const uuid = url.searchParams.get('uuid') || url.searchParams.get('password') || url.searchParams.get('pw');
            let subConverterUrl = 替换虚假ID(url.href, uuid, host);

            // const fakeUserIDMD5 = await MD5MD5(host + uuid);
            // fakeUserID = fakeUserIDMD5.slice(0, 8) + "-" + fakeUserIDMD5.slice(8, 12) + "-" + fakeUserIDMD5.slice(12, 16) + "-" + fakeUserIDMD5.slice(16, 20) + "-" + fakeUserIDMD5.slice(20);
            // fakeHostName = fakeUserIDMD5.slice(6, 9) + "." + fakeUserIDMD5.slice(13, 19) + ".xyz";

            if (!userAgent.includes('subconverter') && (userAgent.includes('clash') && !userAgent.includes('nekobox') && !userAgent.includes('cf-workers-sub'))) {
                subConverterUrl = `https://${subConverter}/sub?target=clash&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
            } else if (!userAgent.includes('subconverter') && (userAgent.includes('sing-box') || userAgent.includes('singbox') && !userAgent.includes('cf-workers-sub'))) {
                subConverterUrl = `https://${subConverter}/sub?target=singbox&url=${encodeURIComponent(subConverterUrl)}&insert=false&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
            } else {
                const 协议类型 = url.searchParams.has('uuid') ? atob('dmxlc3M=') : 'trojan';

                if (url.searchParams.has('socks5api') && url.searchParams.get('socks5api') !== '') {
                    const socks5api = await 整理(decodeURIComponent(url.searchParams.get('socks5api')));
                    socks5s = await 获取socks5api(socks5api);
                } else {
                    const 内置socks5api = env.SOCKS5API ? await 整理(env.SOCKS5API) : ['https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json'];
                    socks5s = await 获取socks5api(内置socks5api);
                }

                const links = socks5s.map(socks5带地址 => {
                    const socks5 = socks5带地址.split('#')[0];
                    const hostMatch = socks5.match(/socks5:\/\/(?:.*@)?([^:\/]+):/);
                    const host名称 = hostMatch ? hostMatch[1] : '未知';

                    const 落地国家 = socks5带地址.split('#').length > 1 ? socks5带地址.split('#')[1] : host名称;

                    const link = `${协议类型}://${uuid}@${优选域名}:${优选端口}?encryption=none&security=tls&sni=${host}&fp=randomized&type=ws&host=${host}&path=%2F${encodeURIComponent(socks5)}&allowInsecure=1&fragment=1,40-60,30-50,tlshello#${encodeURIComponent(落地国家)}`;
                    return link;
                }).join('\n');

                return new Response(btoa(还原真实ID(links, uuid, host)), {
                    headers: {
                        "Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
                        "content-type": "text/plain; charset=utf-8",
                        "Profile-Update-Interval": `${SUBUpdateTime}`,
                        //"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
                    },
                });
            }
            //console.log(`subConverterUrl: ${subConverterUrl}`);

            try {
                const subConverterResponse = await fetch(subConverterUrl);

                if (!subConverterResponse.ok) {
                    throw new Error(`Error fetching subConverterUrl: ${subConverterResponse.status} ${subConverterResponse.statusText}`);
                }

                let subConverterContent = await subConverterResponse.text();
                subConverterContent = 还原真实ID(subConverterContent, uuid, host);
                return new Response(subConverterContent, {
                    headers: {
                        "Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
                        "content-type": "text/plain; charset=utf-8",
                        "Profile-Update-Interval": `${SUBUpdateTime}`,
                        //"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
                    },
                });
            } catch (error) {
                return new Response(`Error: ${error.message}`, {
                    status: 500,
                    headers: { 'content-type': 'text/plain; charset=utf-8' },
                });
            }

        } else {
            const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
            if (envKey) {
                const URLs = await 整理(env[envKey]);
                if (URLs.includes('nginx')) {
                    return new Response(await nginx(), {
                        headers: {
                            'Content-Type': 'text/html; charset=UTF-8',
                        },
                    });
                }
                const URL = URLs[Math.floor(Math.random() * URLs.length)];
                return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
            }
            return await Html(request);
        }
    },
};

async function 获取socks5api(API数组) {
    if (!API数组 || API数组.length === 0) return [];

    // 定义新数组，用于存储处理后的结果
    let api = [];
    let socks5数组 = [];

    for (const element of API数组) {
        if (element.toLowerCase().startsWith('socks5://')) {
            socks5数组.push(element);
        } else if (element.toLowerCase().startsWith('http')) {
            api.push(element);
        }
    }

    // 创建一个AbortController对象，用于控制fetch请求的取消
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort(); // 取消所有请求
    }, 2000); // 2秒后触发

    try {
        // 使用Promise.allSettled等待所有API请求完成，无论成功或失败
        // 对api数组进行遍历，对每个API地址发起fetch请求
        const responses = await Promise.allSettled(api.map(apiUrl => fetch(apiUrl, {
            method: 'get',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;',
                'User-Agent': FileName + atob('IGNtbGl1L1NvY2tzMlZsZXNzc3Vi')
            },
            signal: controller.signal // 将AbortController的信号量添加到fetch请求中，以便于需要时可以取消请求
        }).then(response => response.ok ? response.text() : Promise.reject())));

        // 遍历所有响应
        for (const [index, response] of responses.entries()) {
            // 检查响应状态是否为'fulfilled'，即请求成功完成
            if (response.status === 'fulfilled') {
                // 获取响应的内容
                const content = await response.value;
                if (content.startsWith('[') && content.endsWith(']')) {
                    const jsonContent = JSON.parse(content);
                    for (const item of jsonContent) {
                        if (item.proxy) {
                            let country = '';
                            // 优先使用直接的country字段
                            if (item.country) {
                                country = item.country;
                            }
                            // 如果没有直接的country字段，则使用geolocation.country
                            else if (item.geolocation && item.geolocation.country) {
                                country = item.geolocation.country;
                            }

                            if (country) {
                                socks5数组.push(`${item.proxy}#${country}`);
                            } else {
                                // 如果没有国家信息，只添加代理地址
                                socks5数组.push(item.proxy);
                            }
                        }
                    }
                } else if (content.startsWith('{') && content.endsWith('}')) {
                    const jsonContent = JSON.parse(content);
                    if (jsonContent.data && Array.isArray(jsonContent.data)) {
                        for (const item of jsonContent.data) {
                            if (item.proxy) {
                                let country = '';
                                // 优先使用直接的country字段
                                if (item.country) {
                                    country = item.country;
                                }
                                // 如果没有直接的country字段，则使用geolocation.country
                                else if (item.geolocation && item.geolocation.country) {
                                    country = item.geolocation.country;
                                }

                                if (country) {
                                    socks5数组.push(`${item.proxy}#${country}`);
                                } else {
                                    // 如果没有国家信息，只添加代理地址
                                    socks5数组.push(item.proxy);
                                }
                            }
                        }
                    }
                } else {
                    const lines = content.split(/\r?\n/);
                    for (const line of lines) {
                        if (line.startsWith('socks5://')) socks5数组.push(line);
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        // 无论成功或失败，最后都清除设置的超时定时器
        clearTimeout(timeout);
    }

    // 返回处理后的结果
    return socks5数组;
}

async function 整理(内容) {
    var 替换后的内容 = 内容.replace(/[\r\n]+/g, '|').replace(/\|+/g, '|');
    const 地址数组 = 替换后的内容.split('|');
    const 整理数组 = 地址数组.filter((item, index) => {
        return item !== '' && 地址数组.indexOf(item) === index;
    });

    return 整理数组;
}

function 还原真实ID(content, userID, hostName) {
    content = content.replace(new RegExp(fakeUserID, 'g'), userID).replace(new RegExp(fakeHostName, 'g'), hostName);
    return content;
}

function 替换虚假ID(content, userID, hostName) {
    content = content.replace(new RegExp(userID, 'g'), fakeUserID).replace(new RegExp(hostName, 'g'), fakeHostName);
    return content;
}

async function MD5MD5(text) {
    const encoder = new TextEncoder();

    const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
    const firstPassArray = Array.from(new Uint8Array(firstPass));
    const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
    const secondPassArray = Array.from(new Uint8Array(secondPass));
    const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return secondHex.toLowerCase();
}

async function nginx() {
    const text = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Welcome to nginx!</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
    </head>
    <body>
    <h1>Welcome to nginx!</h1>
    <p>If you see this page, the nginx web server is successfully installed and
    working. Further configuration is required.</p>
    
    <p>For online documentation and support please refer to
    <a href="http://nginx.org/">nginx.org</a>.<br/>
    Commercial support is available at
    <a href="http://nginx.com/">nginx.com</a>.</p>
    
    <p><em>Thank you for using nginx.</em></p>
    </body>
    </html>
    `
    return text;
}

async function Html(request) {
    const url = new URL(request.url);
    const host = url.host;
    return new Response(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${FileName}</title>
    ${网站图标}
    <style>
        :root {
            --primary-color: #4361ee;
            --secondary-color: #3f37c9;
            --accent-color: #4895ef;
            --success-color: #4cc9f0;
            --warning-color: #f72585;
            --light-bg: #f8f9fa;
            --dark-text: #212529;
            --border-radius: 8px;
            --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --transition-speed: 0.3s;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            ${网站背景}
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-color: var(--bg-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            background-color: rgba(255, 255, 255, 0.6); /* 降低不透明度 */
            backdrop-filter: blur(10px); /* 添加模糊效果 */
            -webkit-backdrop-filter: blur(10px); /* Safari 兼容性 */
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            width: 100%;
            max-width: 900px;
            padding: 30px;
            margin: 20px auto;
            position: relative;
            overflow: hidden;
        }
        
        h1 {
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 30px;
            font-weight: 600;
            position: relative;
            padding-bottom: 10px;
        }
        
        h1::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--success-color), var(--accent-color), var(--primary-color));
            background-size: 200% 100%;
            animation: flowingLight 2s linear infinite;
            border-radius: 2px;
        }
        
        @keyframes flowingLight {
            0% {
                background-position: 200% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .section {
            background-color: var(--light-bg);
            border-radius: var(--border-radius);
            padding: 20px;
            margin-bottom: 25px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: box-shadow var(--transition-speed);
        }
        
        .section:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            color: var(--secondary-color);
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(0, 0, 0, 0.05);
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            position: relative; /* 改用相对定位 */
        }
        
        /* 为左侧的圆点重新设置样式 */
        .section-title::before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            background-color: var(--primary-color);
            margin-right: 10px;
            border-radius: 50%;
            flex-shrink: 0; /* 防止缩小 */
        }
        
        /* 为信息图标调整样式 */
        .section-title .info-icon {
            margin-left: auto; /* 推到最右边 */
        }
        
        /* 添加: 信息图标样式 */
        .info-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            font-size: 14px;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.2s, background-color 0.2s;
        }
        
        .info-icon:hover {
            transform: scale(1.1);
            background-color: var(--secondary-color);
        }
        
        /* 添加: 信息提示框样式 */
        .info-tooltip {
            display: none;
            position: fixed;
            background: white;
            border: 1px solid var(--primary-color);
            border-radius: 8px;
            padding: 15px;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            min-width: 250px;
            max-width: 900px;
            width: max-content;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
            line-height: 1.6;
            font-size: 14px;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
            animation: fadeInScale 0.3s ease-out;
        }
        
        /* 添加: 提示框动画 */
        @keyframes fadeInScale {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-row {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        @media (max-width: 768px) {
            .form-row {
                flex-direction: column;
                gap: 10px;
            }
        }
        
        .form-row .form-group {
            flex: 1;
            margin-bottom: 0;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--secondary-color);
            font-size: 0.95rem;
        }
        
        input[type="text"], textarea {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            font-size: 1rem;
            transition: border var(--transition-speed), box-shadow var(--transition-speed);
            background-color: white;
        }
        
        input[type="text"]:focus, textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3);
        }
        
        textarea {
            height: 120px;
            resize: vertical;
        }
        
        .button {
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: var(--border-radius);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform var(--transition-speed), box-shadow var(--transition-speed);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 150px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12);
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(0, 0, 0, 0.15);
        }
        
        .button:active {
            transform: translateY(0);
        }
        
        .button::before {
            content: "↗";
            margin-right: 8px;
            font-size: 1.2rem;
        }
        
        .output-container {
            display: flex;
            align-items: stretch;
            gap: 15px;
        }
        
        @media (max-width: 600px) {
            .output-container {
                flex-direction: column;
            }

            .github-corner:hover .octo-arm {
                animation: none;
            }
            .github-corner .octo-arm {
                animation: octocat-wave 560ms ease-in-out;
            }
        }
        
        .output {
            background-color: white;
            border: 1px solid #e0e0e0;
            border-radius: var(--border-radius);
            padding: 12px 15px;
            flex: 1;
            min-height: 50px;
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: relative;
            cursor: pointer;
            transition: background-color var(--transition-speed);
            padding-right: 80px; /* 修改: 添加右侧填充，为"点击复制"文本留出空间 */
        }
        
        .output:hover {
            background-color: #f0f7ff;
        }
        
        .output::after {
            //content: "点击复制";
            position: absolute;
            right: 15px;
            color: var(--primary-color);
            font-size: 0.8rem;
            opacity: 0.7;
        }
        
        .error {
            color: var(--warning-color);
            font-size: 0.85rem;
            margin-top: 6px;
            display: none; /* 修改: 默认不显示 */
            align-items: center;
        }
        
        .error::before {
            content: "⚠";
            margin-right: 5px;
        }
        
        .error.show {  /* 添加: 显示错误时的类 */
            display: flex;
        }
        
        a {
            color: var(--primary-color);
            text-decoration: none;
            transition: color var(--transition-speed);
        }
        
        a:hover {
            color: var (--secondary-color);
            text-decoration: underline;
        }
        
        .tooltip {
            position: relative;
        }
        
        .tooltip .tooltip-text {
            visibility: hidden;
            background-color: #333;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 10px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 0.8rem;
            width: max-content;
            max-width: 250px;
        }
        
        .tooltip:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 0.9rem;
            color: #666;
        }
        
        /* 复制成功动画 */
        @keyframes copied {
            0% { background-color: var(--success-color); }
            100% { background-color: white; }
        }
        
        .copied {
            animation: copied 1.5s;
        }

        .github-corner svg {
            fill: #4a60ea;
            color: #f0f7ff;
            position: absolute;
            top: 0;
            right: 0;
            border: 0;
            width: 80px;
            height: 80px;
            z-index: 1000; /* 增加 z-index 确保在最前面图层 */
        }

        /* 章鱼猫的摇尾巴动效 */
        @keyframes octocat-wave {
            0%, 100% { transform: rotate(0); }
            20%, 60% { transform: rotate(-25deg); }
            40%, 80% { transform: rotate(10deg); }
        }

        /* 鼠标悬浮时才触发动画 */
        .github-corner:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }

        .beian-info {
            text-align: center;
            font-size: 13px;
        }

        .beian-info a {
            color: var(--primary-color);
            text-decoration: none;
            border-bottom: 1px dashed var(--primary-color);
            padding-bottom: 2px;
        }

        .beian-info a:hover {
            border-bottom-style: solid;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"></script>
</head>
<body>
    <a href="https://github.com/cmliu/Socks2Vlesssub" target="_blank" class="github-corner" aria-label="View source on Github">
        <svg viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
        </svg>
    </a>
    <div class="container fade-in">
        <h1>${FileName}</h1>
        
        <!-- 第一个板块：节点信息 -->
        <div class="section">
            <h2 class="section-title">节点信息</h2>
            <div class="form-group">
                <label for="nodeLink">节点链接：</label>
                <input type="text" id="nodeLink" placeholder="请输入 vless://... 或 trojan://... 格式的节点链接">
                <div id="nodeLinkError" class="error"></div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="preferredDomain">优选域名：</label>
                    <input type="text" id="preferredDomain" placeholder="icook.hk">
                </div>
                <div class="form-group">
                    <label for="preferredPort">优选端口：</label>
                    <input type="text" id="preferredPort" placeholder="443">
                </div>
            </div>
            <div class="form-group tooltip">
                <p><small>需自行部署 <a href="https://github.com/cmliu/edgetunnel" target="_blank">edgetunnel</a>、<a href="https://github.com/cmliu/epeius" target="_blank">epeius</a> 项目</small></p>
            </div>
        </div>
        
        <!-- 第二个板块：SOCKS5信息 -->
        <div class="section">
            <h2 class="section-title">SOCKS5</h2>
            <div class="form-group">
                <label for="socks5Api">Socks5落地：</label>
<textarea id="socks5Api" rows="4" style="height: auto;" placeholder="socks5://66.42.224.229:41679#US
socks5://123:123@64.226.95.45:1080#DE
https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json
https://raw.githubusercontent.com/cmliu/Socks2Vlesssub/refs/heads/main/socks5api.txt"></textarea>
                <p><small>每行一个 Socks5链接 或 API链接，API支持 <a href="https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/socks5/data.json" target="_blank">Json</a> 和 <a href="https://raw.githubusercontent.com/cmliu/Socks2Vlesssub/refs/heads/main/socks5api.txt" target="_blank">txt</a> 格式</small></p>
            </div>
        </div>
        
        <!-- 第三个板块：生成订阅 -->
        <div class="section">
            <h2 class="section-title">
                订阅链接
                <span class="info-icon" id="infoIcon">!</span>
            </h2>
            <div id="infoTooltip" class="info-tooltip">
                <strong>安全提示</strong>：使用优选订阅生成器时，需要您提交 <strong>节点配置信息</strong> 用于生成优选订阅链接。这意味着订阅器的维护者可能会获取到该节点信息。<strong>请自行斟酌使用风险。</strong><br>
                <br>
                订阅转换后端：<strong>${subConverter}</strong><br>
                订阅转换配置文件：<strong>${subConfig}</strong>
            </div>
            <div class="output-container">
                <button id="generateBtn" class="button">生成订阅</button>
                <div id="subscriptionLink" class="output">点击按钮生成订阅链接</div>
            </div>
            <div class="output-container" style="margin-top: 15px;">
                <button id="generateShortUrl" class="button" style="background: linear-gradient(90deg, #10b981, #059669); opacity: 0.6; cursor: not-allowed;" disabled>生成短链</button>
                <div id="ShortUrl" class="output">点击按钮生成短链接</div>
            </div>
            <div style="display: flex; justify-content: center; margin-top: 15px; margin-bottom: -15px;">
                <label id="qrcode"></label>
            </div>
        </div>
        
        <div class="beian-info" style="text-align: center; font-size: 13px;">
            ${网络备案}
        </div>
    </div>

    <script>
        // 为输出文本框添加点击复制功能
        document.getElementById('subscriptionLink').addEventListener('click', function() {
            const text = this.textContent;
            if (text && !text.includes('点击左侧按钮')) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = this.textContent;
                    this.classList.add('copied');
                    this.textContent = '已复制到剪贴板!';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    console.error('复制失败: ', err);
                });
            }
        });
        
        // 为ShortUrl添加点击复制功能
        document.getElementById('ShortUrl').addEventListener('click', function() {
            const text = this.textContent;
            if (text && !text.includes('点击左侧按钮')) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = this.textContent;
                    this.classList.add('copied');
                    this.textContent = '已复制到剪贴板!';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    console.error('复制失败: ', err);
                });
            }
        });
        
        // 添加: 处理信息图标点击事件
        document.getElementById('infoIcon').addEventListener('click', function(event) {
            event.stopPropagation(); // 阻止事件冒泡
            const tooltip = document.getElementById('infoTooltip');
            tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
        });
        
        // 添加: 点击页面其他区域关闭提示框
        document.addEventListener('click', function(event) {
            const tooltip = document.getElementById('infoTooltip');
            const infoIcon = document.getElementById('infoIcon');
            
            if (!tooltip.contains(event.target) && !infoIcon.contains(event.target)) {
                tooltip.style.display = 'none';
            }
        });

        // 生成订阅链接按钮的事件监听
        document.getElementById('generateBtn').addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // 获取输入值
            const nodeLink = document.getElementById('nodeLink').value.trim();
            let preferredDomain = document.getElementById('preferredDomain').value.trim() || 'icook.hk';
            let preferredPort = document.getElementById('preferredPort').value.trim() || '443';
            let socks5Api = document.getElementById('socks5Api').value.trim() || '';
            
            // 重置错误消息
            const nodeLinkErrorElement = document.getElementById('nodeLinkError');
            nodeLinkErrorElement.textContent = '';
            nodeLinkErrorElement.classList.remove('show'); // 隐藏错误提示
            
            const subscriptionLinkElement = document.getElementById('subscriptionLink');
            const generateShortUrlBtn = document.getElementById('generateShortUrl');
            const ShortUrl = document.getElementById('ShortUrl');
            
            // 重置短链接区域
            generateShortUrlBtn.disabled = true;
            generateShortUrlBtn.style.opacity = "0.6";
            generateShortUrlBtn.style.cursor = "not-allowed";
            ShortUrl.textContent = "点击左侧按钮生成短链接";
            
            // 检查节点链接格式
            if (!nodeLink) {
                nodeLinkErrorElement.textContent = '请输入节点链接';
                nodeLinkErrorElement.classList.add('show'); // 显示错误提示
                subscriptionLinkElement.textContent = '请先填写节点链接';
                return;
            }
            
            if (!nodeLink.startsWith('vless://') && !nodeLink.startsWith('trojan://')) {
                nodeLinkErrorElement.textContent = '请输入正确格式的节点链接 (vless:// 或 trojan://)';
                nodeLinkErrorElement.classList.add('show'); // 显示错误提示
                subscriptionLinkElement.textContent = '节点链接格式错误';
                return;
            }

            // 解析节点链接
            let host, uuidOrPassword, linkType;
            try {
                if (nodeLink.startsWith('vless://')) {
                    linkType = 'vless';
                } else if (nodeLink.startsWith('trojan://')) {
                    linkType = 'trojan';
                }

                uuidOrPassword = nodeLink.split('@')[0].split('://')[1];
                host = nodeLink.split('host=')[1].split('&')[0];

                if (!host || !uuidOrPassword) {
                    throw new Error("无法从链接中提取必要的信息");
                }

                // 调试信息
                console.log("解析结果:", {linkType, host, uuidOrPassword});
            } catch (error) {
                nodeLinkErrorElement.textContent = '解析节点链接失败: ' + error.message;
                nodeLinkErrorElement.classList.add('show'); // 显示错误提示
                subscriptionLinkElement.textContent = '解析节点链接失败';
                return;
            }

            // 处理 SOCKS5 API，替换换行为 | 并进行URL编码
            const processedSocks5Api = encodeURIComponent(socks5Api.replace(/[\\r\\n]+/g, '|'));

            // 生成订阅链接
            let subscriptionLink;
            if (linkType === 'vless') {
                subscriptionLink = \`https://${host}/sub?host=\${encodeURIComponent(host)}&uuid=\${encodeURIComponent(uuidOrPassword)}&address=\${encodeURIComponent(preferredDomain)}&port=\${encodeURIComponent(preferredPort)}&socks5api=\${processedSocks5Api}\`;
            } else {
                subscriptionLink = \`https://${host}/sub?host=\${encodeURIComponent(host)}&pw=\${encodeURIComponent(uuidOrPassword)}&address=\${encodeURIComponent(preferredDomain)}&port=\${encodeURIComponent(preferredPort)}&socks5api=\${processedSocks5Api}\`;
            }

            // 显示结果，添加渐变效果
            subscriptionLinkElement.classList.add('copied');
            setTimeout(() => {
                subscriptionLinkElement.classList.remove('copied');
            }, 300);
            subscriptionLinkElement.textContent = subscriptionLink;
            
            // 启用生成短链按钮
            generateShortUrlBtn.disabled = false;
            generateShortUrlBtn.style.opacity = "1";
            generateShortUrlBtn.style.cursor = "pointer";
            
            // 添加调试信息
            console.log("生成的订阅链接:", subscriptionLink);

            // 更新二维码
            const qrcodeDiv = document.getElementById('qrcode');
            qrcodeDiv.innerHTML = '';
            new QRCode(qrcodeDiv, {
                text: subscriptionLink,
                width: 220, // 调整宽度
                height: 220, // 调整高度
                colorDark: "#4a60ea", // 二维码颜色
                colorLight: "#ffffff", // 背景颜色
                correctLevel: QRCode.CorrectLevel.L, // 设置纠错级别
                scale: 1 // 调整像素颗粒度
            });
        });
        
        // 生成短链接按钮的事件监听
        document.getElementById('generateShortUrl').addEventListener('click', function() {
            if (this.disabled) return;
            
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            const subscriptionLink = document.getElementById('subscriptionLink').textContent;
            const ShortUrl = document.getElementById('ShortUrl');
            
            // 显示加载状态
            ShortUrl.textContent = "正在生成短链接...";
            
            // Base64编码
            const base64Encoded = btoa(subscriptionLink);
            
            // 发送POST请求到短链接服务
            fetch('https://v1.mk/short', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'longUrl=' + encodeURIComponent(base64Encoded)
            })
            .then(response => response.json())
            .then(data => {
                console.log("短链接响应:", data);
                if (data.Code === 1 && data.ShortUrl) {
                    ShortUrl.textContent = data.ShortUrl;
                    // 更新二维码
                    const qrcodeDiv = document.getElementById('qrcode');
                    qrcodeDiv.innerHTML = '';
                    new QRCode(qrcodeDiv, {
                        text: ShortUrl.textContent,
                        width: 220, // 调整宽度
                        height: 220, // 调整高度
                        colorDark: "#4a60ea", // 二维码颜色
                        colorLight: "#ffffff", // 背景颜色
                        correctLevel: QRCode.CorrectLevel.L, // 设置纠错级别
                        scale: 1 // 调整像素颗粒度
                    });
                    ShortUrl.classList.add('copied');
                    setTimeout(() => {
                        ShortUrl.classList.remove('copied');
                    }, 300);
                } else {
                    ShortUrl.textContent = "短链接生成失败，请重试";
                }
            })
            .catch(error => {
                console.error("生成短链接错误:", error);
                ShortUrl.textContent = "短链接生成失败，请重试";
            });
        });
        
        // 为输入字段添加回车键生成功能
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('generateBtn').click();
                }
            });
        });
    </script>
</body>
</html>`, {
        headers: {
            "content-type": "text/html;charset=UTF-8",
        },
    });
}
