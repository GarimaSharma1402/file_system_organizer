
const { type } = require("os");
const path = require("path");

let inputArr=process.argv.slice(2);
//console.log(inputArr);
let command=inputArr[0];
let types= {
    media: ["mp4" , "mkv"],
    archives: ["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","odg","odf","txt","ps","tex"],
    app:["exe","dmg","pkg","deb"]
}
switch(command){
    case ('tree'):
        treeFn(inputArr[1])
        break;
    case ('organize'):
        organizeFn(inputArr[1])
        break;
    case ('help'):
        helpFn;
        break;
    default:
        console.log("Please 😫 input right command")
        break;  
}

function treeFn(dirPath){
    //let destPath;
    if(dirPath==undefined) {
        treeHelper(process.cwd()," ");
        return;
    } else{
    
    
}
function organizeFn(dirPath){
    //console.log("Organize command executed for", dirPath)
    //1. input->dir path given
    let destPath
    if(dirPath==undefined) {
        destPath=process.cwd();
        return;
    } else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist) {
            treeHelper(dirPath," ");

        }else {
            console.log("Kindly 😑🤨 enter correct path");
            return;
        }
}
function treeHelper(dirPath, indent){
        //is file or folder
        let isFile=fs.lstatSync(dirPath).isFile();
        if(isFile==true) {
            let fileName=path.basename(dirPath);
            console.log(indent+ "|-----"+filename)
        }else {
            let dirName=path.basename(dirPath);
            console.log(indent+ "|----"+dirName);
            let children=fs.readdirSync(dirPath);
            for(let i=0;i<children.length;i++)
            {
                let childPath=path.join( dirPath,children[i])
                treeHelper(childPath,indent+"\t");
            }

        }
organizeHelper(dirPath,destPath);
}
function organizeHelper(src, dest) {
    //3. Identify categories of all files present in input directory
    let childName=fs.readdirSync(src);
    //console.log(childName);
    for(let i=0;i<childName.length;i++) {
        let childAddress=path.join(src,childName[i]);
        let isFile= fs.lstatSync(childAddress.isFile());
        if(isFile) {
            console.log(childName[i]);
            let category=getCategory(childName[i]);
            console.log(childName[i],"belongs to -->", category);
            //4. Copy/cut files to that organized directory to respective folder
            sendFiles(childAddress,dest,category);
        }
    }

}

    
function helpFn(){
    console.log(`
    List of all commands:
           node main.js tree "directoryPath"
           node main.js organize "directoryPath"
           node main.js help`)
}
function sendFiles(srcFile,dest,category) {
    let categoryPath=path.join(dest,category)
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath)
    console.log(fileName,"copied to", category);
}
function getCategory(name) {
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types) {
        let cTypeArray=types[type];
        for(;et i=0;i<cTypeArray.length;i++)
        {
            if(ext==cTypeArray[i]) {
                return type;
            }
        }

    }
    
}
