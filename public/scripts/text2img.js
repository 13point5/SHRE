$(document).ready(function(){

    var element = $("#bla1"); // global variable
    var getCanvas; // global variable
    
    $("#btn-Preview-Image").on('click', function () {
        html2canvas(element, {
        onrendered: function (canvas) {
            //    $("#previewImage").append(canvas);
               getCanvas = canvas;
            }
        });
   });
    
    $("#encrypted-text-to-img").on('click', function () {

        var imgageData = getCanvas.toDataURL("image/png");
        // Now browser starts downloading it instead of just showing it
        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
        $("#encrypted-text-to-img").attr("download", "shre-bla.png").attr("href", newData);
    });
    
});