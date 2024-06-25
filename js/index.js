let startNum;
let endNum;

startNum = Number(prompt("ingresa el valor inicial"));
endNum = Number(prompt("ingresa el valor final"));

if(startNum<endNum){
    for(let i=startNum; i<=endNum; i++){
        if(i%2==0){
            console.log(`el ${i} es par`);
        }else{
            console.log(`el ${i} es impar`);
        }
    }
}else{
    for(let i=startNum; i>=endNum; i--){
        if(i%2==0){
            console.log(`el ${i} es par`);
        }else{
            console.log(`el ${i} es impar`);
        }
    }
}