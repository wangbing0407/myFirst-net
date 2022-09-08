const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g


// 对模板进行编译处理
function parseHTML(html) {
    function advance(n) {
        html = html.substring(n)
    }
    function parseStartTag() {
        const start = html.match(startTagOpen)
        if(start) {
            const match = {
                tagName: start[1], // 标签名
                attrs: []
            }
            advance(start[0].length)
            // console.log(match)
        }
        // 如果不是开始标签的结束，就一直匹配下去
        let attr;
        while(!html.match(startTagClose) && (attr = html.match(attribute))) {
            advance(attr[0].length)
        }
        console.log(html)

        return false; // 不是开始标签
        // console.log(start);
    }
    while(html) {
        let textEnd = html.indexOf('<')

        if(textEnd === 0) {
            parseStartTag()
            break;
        }
    }
}

export function compileToFunction(template) {
    // 1.就是将template转换成ast语法树
    // 2.生成render方法（render方法执行后的返回就是虚拟dom）
    // console.log(template)
    parseHTML(template)
}