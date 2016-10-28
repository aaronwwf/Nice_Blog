hljs.initHighlightingOnLoad();

$(document).ready(function(){
    $("#article-body").find("h2,h3,h4,h5,h6").each(function(i,item){
	    var tag = $(item).get(0).localName;
	    var level = parseInt(tag.substr(1));
	    $(item).attr("id","dir"+i);
	    var $element = $('<a class="dir-'+tag+'" href="#dir'+i+'">'+$(this).text()+'</a></br>')
	    $element.css("margin-left",level*20-15); 
	    $element.appendTo($("#directory"));
    });
    var currentLan=$.cookie("lan");
    console.log(currentLan);
    if(!currentLan){
    	currentLan="en";
    }
    changeLanguage(currentLan);
});

function changeLanguage(lan){
	var currentLan=$.cookie("lan");
    $("."+currentLan).hide();
    $("."+lan).show();
	$.cookie("lan",lan,{path:'/'});
} 
$(".changeLan").click(function(){
    var lan = $(this).attr("lan");
    changeLanguage(lan);
    return false;
});
$(".jumpLan").click(function(){
    var lan = $(this).attr("lan");
    var url = window.location.href;
    //replace langage "*-<oldlan>.html" to "*-<newlan>.html"
    //replace tag name
    var tmp = url.split('/');
    var title = tmp[tmp.length-1];
    var category = tmp[tmp.length-2];
   	category = category.split("_")[0];
    if (lan !="en"){
    	category = category+"_"+lan+"_"+CategoryMap[category][lan]
    }
    if(!category){
    	return;
    }
    var tmp_t = title.split('-');
    tmp_t[tmp_t.length-1]=lan+".html";
    title = tmp_t.join('-');
    tmp[tmp.length-1]=title;
    tmp[tmp.length-2]=category;
    url = tmp.join('/');
    window.location.href=url;
    return false;
});