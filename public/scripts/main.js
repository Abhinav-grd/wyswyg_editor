var oDoc;
var align_btn=$(".toolbar a.align");
var ind_btn=$(".toolbar a.independent");
var list_btn=$(".toolbar a.list");

//console.log(align_btn);
function initDoc() {
    oDoc = $("#editor-textbox"); 
    init_btn_listener();
 }

 function init_btn_listener(){
  
    ind_btn.click(function(){
      $(this).toggleClass("selected");
    });

  align_btn.click(function(){
    
      align_btn.removeClass("selected");
      $(this).addClass("selected");
});
}

  function formatDoc(sCmd, sValue) {
     document.execCommand(sCmd, false, sValue); 
     oDoc.focus(); 
    }

function add_image() {
  oDoc.focus();
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
  oDoc.focus();
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
