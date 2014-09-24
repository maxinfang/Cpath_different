function drawarrowbox(type,data,conn){
  
     //judge the element and see how it goes.
     if(type=="arrow"){
       var dropL;
       var dropLid; 
       
     // console.log("test"+data.h);
     if(data.activity==""){ 
       data.activity=0;
       dropL=addarrowDroplist();
       dropLid=$(dropL).prop('id');
       $(dropL).width('90%'); 
     }
     
     else{
      dropL=addarrowDroplist(data.activity);
      dropLid=$(dropL).prop('id'); 
      $(dropL).width('90%');
      
      
    }    
    var dataLeft= $(newdiv).position().left;
    var dataTop= $(newdiv).position().top; 
    datadiv= document.createElement('div');
    $(datadiv).uniqueId();
    
    var datadivId=$(datadiv).attr("id");
    //  data.id=datadivId;
    $(datadiv).addClass("datatable");
    
    
    // console.log(datadiv);
    
    var element = document.createElement('span');
    element.className = "normal short";
    
    //$(element).append(durationdiv);
    
    var oNewP = document.createElement("div");
    oNewP.style.display = 'block'; 
   // var durationL= addlabel("Duration: "+du[data.activity]);
    //$(durationL).uniqueId();
   // var durationId = $(durationL).attr('id');
  ///  $(oNewP).append(durationL); 
    $(datadiv).append(dropL.show());
    $(datadiv).append(oNewP);
   
     
   var ESTdata = document.createElement("div");
       var EST=(data.EST=="") ? addtext("EST") : addtext("EST",data.EST);
   ESTdata.style.display = 'block'; 
       $(ESTdata).append(addlabel(" Lead Time:"));
   $(datadiv).append(ESTdata);
         $(ESTdata).append(EST); 
    
  
   
 }
 var returndiv= document.createElement('div');
 $(returndiv).append(datadiv)
 
 return datadiv;
}

