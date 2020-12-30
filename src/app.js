const fetch = require("node-fetch");
let studentsJson = "";
let wayToFile = "https://raw.githubusercontent.com/Toxa-p07a1330/XMLtoJSONConverter/master/students.json"
let fields = {
    name: 15,
    group: 8,
    avg:6,
    debt: 18
}
let titles = Object.keys(fields);
let delim = "|---------------|--------|------|------------------|";
let getData = async ()=>{
    studentsJson = "students";
    let rezult = await fetch(wayToFile);
    rezult = await rezult.json();
    studentsJson = rezult;
}

async function parse(){
    await getData();
    if (!(studentsJson.items instanceof Array)){
        console.log("Field of items is not array")
        return;
    }
    if (studentsJson._meta.count !== studentsJson.items.length){
        console.log("Not matching array size")
        return;
    }
    console.log("File is correct")
    let outputStr = "|";
    let head = titles.map((value, index, array)=>{
        outputStr+=value;
        for (let i =0; i<fields[value]-value.length; i++)
            outputStr+=" ";
        outputStr+="|";
        return outputStr;
    })[titles.length-1]
    console.log(head)
    console.log(delim)
    studentsJson.items.map((value)=>{
        let row = "|";
        let row_out = titles.map((valueTitle)=>{
           row+=value[valueTitle];
           let spaces = fields[valueTitle]-(value[valueTitle]+"").length
            for (let i =0; i<spaces; i++)
                row+=" ";
            row+="|";
           return row;
        })[titles.length-1]
        console.log(row_out)
        console.log(delim)
    })
}
parse().then((resolve)=>{
}, (reject)=>{
    console.log("Error while loading file")
});