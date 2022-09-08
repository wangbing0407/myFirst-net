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
    const ELEMENT_TYPE = 1
    const TEXT_TYPE = 3;
    const stack = [] // 用于存放元素
    let currentParant;  // 指向的是栈中的最后一个
    let root;

    // 最终需要转换成一颗抽象语法树
    function createASTElement(tag, attrs) {
        return {
            tag,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null
        }
    }

    // 利用栈型结构来构造一颗树
    function start(tag, attrs) {
        let node = createASTElement(tag, attrs) // 创造一个ast节点
        if(!root) { // 看一下是否是空树
            root = node
        }
        if(currentParant) {
            node.parent = currentParant;
            currentParant.children.push(node)
        }
        stack.push(node)
        currentParant = node // currentParant为栈中的最后一个
    }
    function chars(text) { // 文本直接放到当前指向的节点中
        text = text.replace(/\s/g, '') // 如果空格超过2，就删除2个以上的
        text && currentParant.children.push({
            type: TEXT_TYPE,
            text,
            parent: currentParant
        })
    }
    function end() {
        let node = stack.pop() // 弹出最后一个，校验标签是否合法
        currentParant = stack.at(-1)
    }
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

            // 如果不是开始标签的结束，就一直匹配下去
            let attr, end;
            while(!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
                advance(attr[0].length)
                match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5] || true})
            }
            if(end) {
                advance(end[0].length)
            }
            return match
        }
        return false; // 不是开始标签
    }
    while(html) {
        // 如果textEnd为0 说明是一个开始的标签或者结束标签
        // 如果textEnd>0 说明就是文本的结束位置
        let textEnd = html.indexOf('<')

        if(textEnd === 0) {
            const startTagMatch = parseStartTag()
            if(startTagMatch) { // 解析到的开始标签
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue;
            }
            let endTagMatch = html.match(endTag)
            if(endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue;
            }
        }
        if(textEnd > 0) {
            let text = html.substring(0, textEnd) // 文本内容
            if(text) {
                chars(text)
                advance(text.length) // 解析到的文本
            }
        }
    }
    console.log(root)
}

export function compileToFunction(template) {
    // 1.就是将template转换成ast语法树
    // 2.生成render方法（render方法执行后的返回就是虚拟dom）
    // console.log(template)
    parseHTML(template)
}