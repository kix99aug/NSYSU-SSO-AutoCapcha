// ==UserScript==
// @name         NSYSU SSO AutoCaptcha
// @namespace    https://keybo.space/
// @version      1.0
// @description  Get rid of captcha!
// @author       Kix
// @match        https://sso.nsysu.edu.tw/
// @match        https://sso.nsysu.edu.tw/index.php/passport/login
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.nsysu.edu.tw
// @supportURL   https://github.com/kix99aug/NSYSU-SSO-AutoCaptcha
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    var ans = ""
    while(ans.length != 4){
        var response = await fetch("https://sso.nsysu.edu.tw/views/index/showpic.php");
        var content = await response.blob();
        var formData = new FormData();
        formData.append("file", content);
        formData.append("filetype", "jpg");
        formData.append("OCREngine", "2");
        response = await fetch("https://api.ocr.space/parse/image",{
            headers:{
                "apikey":"K86777676288957"},
            method:"POST",
            body:formData
        })
        content = await response.json();
        content = content.ParsedResults[0].ParsedText.toLowerCase()
        let array = [...content.matchAll(/[a-z]/g)];
        for(let i = 0;i<array.length;i++){
            if(!array[i]) array.splice(i--,1)
        }
        ans = array.join("")
    }
    document.getElementById("anscheck").value = ans
})();
