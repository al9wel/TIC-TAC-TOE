let cards= document.querySelector(".cards");
let cardArr=[...cards.children];
let turn="X";
let resetBtn=document.getElementById("reset");
let xTurn=document.querySelector(".turn .x");
let oTurn=document.querySelector(".turn .o");
let checkArr=["1","2","3","4","5","6","7","8","9","10"];
let info=document.querySelector(".turn .name");
let re=document.querySelector(".w-d");
let draw=0;
let startButton1=document.getElementById("splash-button-one");
let startButton2=document.getElementById("splash-button-two");
let splash=document.querySelector(".splash");
// عند الضغط على زر لاعب واحد 
// يتم استدعاء فنكشن الاعب الواحد
// وتشغيل الاغنيه و ازاله السبلاش سكريين
startButton1.onclick=function(){
    document.getElementById("background").play();
    splash.remove();
    onePlayer();
}
// عند الضغط على زر لاعبين 
// يتم استدعاء فنكشن اللاعبين
// وتشغيل الاغنيه و ازاله السبلاش سكريين
startButton2.onclick=function(){
    document.getElementById("background").play();
    splash.remove();
    twoPlayers();
}
// عند تصغير المتصفح يتم ايقاف الاغنيه
window.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden'){
        document.getElementById("background").pause();
    }
    else{
    document.getElementById("background").play();
    }
})
// فنكشن اللاعبين
function twoPlayers(){
    // لوب على البطاقات
    cardArr.forEach((card)=>{
        // عند الضغط على اي بطاقه جعل محتواها يساوي الترن
        // واضافه الترن الى مصفوفه التحقق 
        // استدعاء فنكشن التحقق
        card.addEventListener("click",()=>{
            card.textContent=turn;
            document.getElementById("click").play();
            checkArr[card.dataset.number]=turn;
            card.classList.add("noclick");
            checkResult();
            // اذا كان الترن اكس نحوله الى او 
            if(turn==="X"){
                turn="O";
                card.classList.add("green");
                xTurn.classList.add("op");
                oTurn.classList.remove("op");
            }
            // العكس
            else{
                turn="X";
                card.classList.add("blue");
                oTurn.classList.add("op");
                xTurn.classList.remove("op");
            }
        })
    });
}
// فنكشن اللاعب واحد
function onePlayer(){
    // لوب على العناصر 
    // عند الضغط على اي بطاقه جعل محتواها يساوي الترن
    // واضافه الترن الى مصفوفه التحقق 
    // استدعاء فنكشن التحقق
    // وتغيير الترن 
    // ثم استدعاء فنكشن الكمبيوتر ليلعب بعد الضغط على اي بطاقه
    cardArr.forEach((card)=>{
            card.addEventListener("click",()=>{
                card.textContent=turn;
                document.getElementById("click").play();
                checkArr[card.dataset.number]=turn;
                card.classList.add("noclick");
                card.classList.add("green");
                checkResult();
                turn="O";
                xTurn.classList.add("op");
                oTurn.classList.remove("op");
                computerPlay();
            })
    });
}
// فنكشن لعب الكمبيوتر 
function computerPlay(){
    // اذا كانت الحاويه تحتوي على كلاس ايقاف الضغط 
    // نرجع ولاننفذ هاذه الفنكشن
    if(cards.classList.contains("noclick")){
        return;
    }
    // نفلتر العناصر ونجلب العناصر الفارغه بدون اكس او اوه
    // ونخزنها في مصفوفه
    let filteredArr1=cardArr.filter((ele)=>{
        return ele.textContent!="X";
    })
    let filteredArr2=filteredArr1.filter((e)=>{
        return e.textContent!="O";
    })
    // جلب اندكس عشوائي من المصفوفه المفلتره
    let randomIndex=Math.floor(Math.random()*filteredArr2.length);
    // جلب عنصر بحسب الاندكس العشوائي
    let randomCard=filteredArr2[randomIndex];
    // اضافه كلاس عدم الضغط لكي ينتظر الاعب حتى يلعب الكمبيوتر
    cards.classList.add("noclick");
    // الانتظار ثانيه ثم تنفيذ الكود التالي
    setTimeout(()=>{
        cards.classList.remove("noclick");
        randomCard.textContent=turn;
        document.getElementById("click").play();
        checkArr[randomCard.dataset.number]=turn;
        randomCard.classList.add("noclick");
        randomCard.classList.add("blue");
        checkResult();
        turn="X";
        oTurn.classList.add("op");
        xTurn.classList.remove("op");
    },1000)
}
// فنكشن التحقق من الفوز او الخساره او التعادل
function checkResult(){
    if(
        checkArr[0]==checkArr[1]&&checkArr[1]==checkArr[2]||
        checkArr[3]==checkArr[4]&&checkArr[4]==checkArr[5]||
        checkArr[6]==checkArr[7]&&checkArr[7]==checkArr[8]||
        checkArr[0]==checkArr[3]&&checkArr[3]==checkArr[6]||
        checkArr[1]==checkArr[4]&&checkArr[4]==checkArr[7]||
        checkArr[2]==checkArr[5]&&checkArr[5]==checkArr[8]||
        checkArr[0]==checkArr[4]&&checkArr[4]==checkArr[8]||
        checkArr[2]==checkArr[4]&&checkArr[4]==checkArr[6])
        {
            // في حال تحقق الشرط نوقف اللعبه 
            // ونستدعي فنكشن اعلان الفائز ونرسل لها الترن
            stopGame();
            if(turn==="X"){
                w_d(`"X" Won The Game !`,"#90d640");
                return;
            }
            else{
                w_d(`"O" Won The Game !`,"#00d5f0");
                return;
            }
        }
    else{
        // في حال لم يتحقق الشرط 
        // اي تعادل 
        // نقوم بعمل لوب نتحقق اذا كان كل البطاقات ممتلئه 
        // اذا كانت البطاقه ممتلئه نزيد العداد بواحد
        draw=0;
        cardArr.forEach((card)=>{
            if(card.textContent==="X"||card.textContent==="O"){
                draw++;
            }
        });
        // اذا كان العداد يساوي تسعه اي كل البطاقات ممتلئه
        // نوقف اللعبه ونستدعي فنكشن الفوز و التعادل ونرسل لها تعادل
        if(draw===9){
            stopGame();
            w_d("It's a Draw !","#cc5555ed");
        }
    }
}
// فنكشن الريسيت تعيد كل شي الى حالته الطبيعيه
function reset(){
    cardArr.forEach((card)=>{
        card.classList.remove("green");
        card.classList.remove("blue");
        card.classList.remove("noclick");
        card.textContent="";
        turn="X";
    })
    xTurn.classList.remove("op");
    oTurn.classList.remove("op");
    oTurn.classList.add("op");
    checkArr=["1","2","3","4","5","6","7","8","9","10"];
    info.textContent=`X-O Game`;
    draw=0;
    cards.classList.remove("noclick");
}
// عند الضغط على زر الريسيت يتم استدعاء الفنكشن السابقه
resetBtn.onclick=reset;

// فنكشن الفوز و التعادل 
// تظهر بوب اب لاعلان الفوز او التعادل
function w_d(text,color){
    document.getElementById("pop").play();
    Swal.fire({
        title: text,
        color: color,
        background: "#315066",
        confirmButtonColor: color
    });
}
// فنكشن ايقاف اللعبه 
// نجعل الحاويه غير قابله للضغط
function stopGame(){
    cards.classList.add("noclick");
}