const fetch = require("node-fetch");
console.log("XML to JSON converter")
let xmlString = "";
let getData = async ()=>{
    xmlString = "someXML";
    let rezult = await fetch("https://raw.githubusercontent.com/Toxa-p07a1330/XMLtoJSONConverter/master/XMLExample");
    rezult = await rezult.text();
    xmlString = rezult;
    return rezult
}
let parceXmlToObject= async ()=>{

}
function count(str, ch) {
    let counter=0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ch) counter++;
    }
    return counter;
}

let getRootTagWithAttr = (xml)=>{

    if (xml.indexOf(">") > xml.indexOf(" "))
        return xml.substr(1, xml.indexOf(">")-1)
    else
        return getRootTagWithoutAttr(xml);
}
let getRootTagWithoutAttr = (xml)=>{
        return xml.substr(1, xml.indexOf(">")-1)
}
let getValueFromBaseBlock = (xml)=>{
    return xml.substring(xml.indexOf(">"+1), xml.indexOf("<"));
}
let convertShortToClassic = (xml)=>{
    let replacer = xml.match(/<.*?\/>/);
    if (replacer)
        for (let i of replacer) {
            i = i.substring(0, i.length-2);
            xml = xml.replace("<"+i+"/>", "<"+i+">"+"</"+i+">")
           // console.log(xml)
        }
    return xml;
}
let removeRoot = (xml)=>{
    let root1Size = getRootTagWithAttr(xml).length;
    let root2Size = getRootTagWithoutAttr(xml).length;
    let withoutRoot = xml.substr(root1Size+2, xml.length-root1Size-root2Size-5);
    return withoutRoot;
}
let getBaseBlockCollection = (xml)=>{
    withoutRoot = removeRoot(xml);
    let withoutLogic = withoutRoot.substr(1, withoutRoot.length-2)
        .split("><").map((value, index, array)=>{
        return "<"+value+">"
    })
    let splittedArray = [];
    let buffer = "";
    let braceCountLeft = 0;
    let slashCount = 0;
    for (let i =0; i<withoutLogic.length; i++) {
        let str = withoutLogic[i];
        braceCountLeft+=count(str, "<");
        slashCount+=count(str, "/");
        if (braceCountLeft === slashCount*2) {
            buffer+=str;
            splittedArray.push(buffer)
            buffer="";
            braceCountLeft = 0;
            slashCount=0;
        }
        else{
            buffer+=str;
        }
    }
    return splittedArray;
}
let getValuesFromAttr = (rootWithArrtibutes)=>{
    rootWithArrtibutes = rootWithArrtibutes.substring(rootWithArrtibutes.indexOf(" "),
        rootWithArrtibutes.indexOf(">"));
    let attributes = {};
    let arr = rootWithArrtibutes.split(" ");
        arr.map((value, index, array)=>{
            let key = value.split("=")[0];
            let val = value.split("=")[1];
            if (val){
                val = val.replace(/\'|\"/g, "");
                attributes[key] = val;
            }
        })
    console.log(attributes)
    return attributes;
}
let switchBlockType = (xml)=>{

}
async function xmlConvertJson() {
    let data = await getData();
    let withoutNewLines = xmlString.replace(/>\n/g,">").replace(/>\s*?</g, "><");
    let withoutXMLVerson = (()=>{
        if (withoutNewLines[1]!=="?")
            return  withoutNewLines;
        return withoutNewLines.substr(withoutNewLines.indexOf(">")+1)
    })()
    let withoutShortTags = convertShortToClassic(withoutXMLVerson);

    let finalObject = {};

}

let XMLtoJSONStep = (xml)=>{
    let object = {};
    if (removeRoot(xml).indexOf("</")===-1) {
        if (xml.substr(0, xml.indexOf(">")).indexOf(" ")!==-1) {
            object=getValuesFromAttr(xml);
        }
        let tag = getRootTagWithoutAttr();
        tag = tag.replace("<","").replace(">","");
        object[tag]=removeRoot(xml);
    }
}
xmlConvertJson();

