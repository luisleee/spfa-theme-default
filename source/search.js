$("#search-btn").click(function(event){
    var name=$("#search-name").val();
    open("post/"+name+"/index.html","_blank");
});