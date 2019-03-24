var oDoc;
function initDoc() {
    oDoc = document.getElementById("editor-textbox"); 
 }
  
  function formatDoc(sCmd, sValue) {
     document.execCommand(sCmd, false, sValue); 
     oDoc.focus(); 
    }

$(".toolbar a").click(function(){
    $(this).toggleClass("selected")
});

function add_image() {
  var url =document.getElementById("image-url").value;
  var width=document.getElementById("image-url").value;
  var height=document.getElementById("image-height").value;
  document.execCommand("insertImage", false, url); 
  oDoc.focus(); 
  var image=$("img");
  image.css("display", "block");
  image.css("margin","auto");
  image.css("width",width+"px");
  image.css("height",height+"px");
}

function add_url(){
  var url =document.getElementById("urls-url").value;
  var s ="<a href="+url+">";
  /*if($("#blank_check").value=="on")
    s+="target=\"blank\">"+$(#url-disp_text).value+"</a>";
  else*/
    s+=$("#url-disp_text").val()+"</a>";
//console.log(s);
  document.execCommand("insertHTML", false, s); 
}


function save_doc()
{
  var data={
    name:$("#doc-name").val(),
    owner:$("#doc-owner").val(),
    content:String(document.getElementById("editor-textbox").innerHTML),
  };
  console.log(document.getElementById("editor-textbox").innerHTML);
  $.post("/docs",data,function(data,status){
  });
}
