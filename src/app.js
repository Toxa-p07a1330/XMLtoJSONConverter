const fetch = require("node-fetch");
console.log("XML to JSON converter")
let xmlString = "";
let getData = async ()=>{
    xmlString = "someXML";
    fetch("https://raw.githubusercontent.com/Toxa-p07a1330/XMLtoJSONConverter/master/XMLExample").then(
        (response)=>{
            response.text().then(
                (text)=>{
                    xmlString = text;
                    return text;
                },
                (reason) =>{
                    console.log(reason)
                })
        },
        (reject)=>{
            console.log(reject)
        }
    )
}
let parceXmlToObject= async ()=>{

}

async function xmlConvertJson() {
let test = await getData();
console.log(test)
}
xmlConvertJson();

