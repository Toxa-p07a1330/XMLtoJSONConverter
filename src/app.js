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


async function parse(){
    let sem = await getData();
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlString, "text/xml");
    console.log(xmlDoc)
}
parse();