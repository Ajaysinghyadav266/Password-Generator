
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn =document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn =document.querySelector(".generateBtn");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='`~!@#$%^&*()_+={[}]:;"<,>.?/';


 let password="";
 let passwordLength=10;
 let checkCount=0;

 //set Strength circle color to grey

handelSlider();

 //handel Silder
 function handelSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";


 }
setIndicator("#ccc")
 //set indicator
 function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow 
    indicator.style.boxShadow = "60px   grey";

 }

 function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
 }

 function generateRandomNumber(){
    return getRndInteger(0,9);
 }

 function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));

 }
 function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
    
 }
 function generateSymbol(){
  const index=getRndInteger(0,symbols.length-1);
  return symbols.charAt(index);
 }

 function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checkced) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;
if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8)
setIndicator("#0f0");
else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6){
    setIndicator("#ff0");
} else {
    setIndicator("#f00");
}

 }
 
 async function copyContent(){
    try{
   await navigator.clipboard.writeText(passwordDisplay.value);
   copyMsg.innerText="copied";
    }
    catch(e){
     copyMsg.innerText="failed";
    }
    // Visible span copywaala
    copyMsg.classList.add("active");
    setTimeout(()=> {
copyMsg.classList.remove("active");
    },2000);
      
 }
 function handelCheckBoxChange(){
   checkCount=0;
   allCheckBox.forEach((checkbox)=>{
      if(checkbox.checked)
      checkCount++;
   });

   if(passwordLength<checkCount) {
      passwordLength=checkCount;
      handelSlider();
   }
  

 }

 function shuffelPassword(array){
   // fisher Yates Methods
   for(let i=array.length-1;i>=0;i--){
      const j=Math.floor(Math.random()*(i+1));
      const temp=array[i];
      array[i]=array[j];
      array[j]=temp;
      
   }
   let str="";
   array.forEach((e)=>(str+=e));
   return str;

 }
 
 allCheckBox.forEach( (checkbox) => {
   checkbox.addEventListener('change', handelCheckBoxChange);
})


inputSlider.addEventListener('input',(e)=>{
   passwordLength=e.target.value;
   console.log("inputslider");
   handelSlider();
})

copyBtn.addEventListener('click',() =>{
 if(passwordDisplay.value){
   copyContent();
 }
})
generateBtn.addEventListener('click',()=>{
   //none of the checkbox are selected
   if(checkCount<=0) return ;

   if(passwordLength<checkCount)
   {
      passwordLength=checkCount;
      handelSlider();
   }
   // let's start the journey to find new password

   // remove all password
   password="";
   //
   // lets put staff mentioned by checkbox
   // if(uppercaseCheck.checkced){
   //    password+=generateUpperCase();
   // }
   // if(lowercaseCheck.checked){
   //    password+=generateLowerCase();

   // }
   // if(numbersCheck.checked){
   //    password+=generateLowerCase();
   // }
   // if(symbolsCheck.checked){
   //    password+=generateSymbol();
   // }
   let funArr=[];

   if(uppercaseCheck.checked)
   funArr.push(generateUpperCase);

   if(lowercaseCheck.checked)
   funArr.push(generateLowerCase);

   if(numbersCheck.checked)
   funArr.push(generateRandomNumber);

   if(symbolsCheck.checked)
   funArr.push(generateSymbol);
// cpmpulsory
   for(let i=0;i<funArr.length;i++)
  {
   password+= funArr[i]();
  }

   /// Remanning
   for(let i=0;i<passwordLength-funArr.length;i++){
      let randomIdx=getRndInteger(0,funArr.length);
      password+= funArr[randomIdx]();

   }
   //shuffle password
   password=shuffelPassword(Array.from(password));

 passwordDisplay.value=password;
 calcStrength();

});


