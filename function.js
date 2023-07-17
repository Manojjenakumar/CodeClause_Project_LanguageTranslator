const text1 =document.querySelector(".text-1");
const text2 =document.querySelector(".text-2");
selectTag=document.querySelectorAll("select");
exchange=document.querySelector(".change");
translateBtn=document.querySelector("button");
icon=document.querySelectorAll(".control i")
selectTag.forEach((tag,id) => {
    for (const country_code in countries) {
       let selected;
       if(id==0 && country_code=="en-GB"){
        selected="selected";
       }else if(id==1 && country_code=="hi-IN"){
        selected="selected";
       }
        let option=`<option value="${country_code}" ${selected} >${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});
exchange.addEventListener("click",() =>{
     let tempText=text1.value,
     tempLang=selectTag[0].value;
     text1.value=text2.value;
     selectTag[0].value=selectTag[1].value;
     text2.value=tempText;
     selectTag[1].value=tempLang;
})

translateBtn.addEventListener("click",() =>{
       let text= text1.value,
       translateFrom= selectTag[0].value,
       translateTO= selectTag[1].value;
       if(!text)return;
       text2.setAttribute("placeholder","translating");
       let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${ translateFrom}|${translateTO}`;
       fetch(apiUrl).then(res => res.json()).then(data=> {
        console.log(data);
        text2.value=data.responseData.translatedText;
        text2.setAttribute("placeholder","translation");
       });
});

icon.forEach(icon =>{
    icon.addEventListener("click",({target})=>{
     if(target.classList.contains("fa-copy")) {
        if(target.id=="icon1"){
            navigator.clipboard.writeText(text1.value);
        }else{
            navigator.clipboard.writeText(text2.value);
        }
     }else{
       let sound;
       if(target.id=="icon1"){
         sound=new SpeechSynthesisUtterance(text1.value);
         sound.lang=selectTag[0].value;
       }else{
         sound=new SpeechSynthesisUtterance(text2.value);
         sound.lang=selectTag[1].value;
       }
        speechSynthesis.speak(sound)
     } 

    });
})