/* ---------------------------------------------------------
Author: Marta García
Module name: listeners.js
Date: 29/05/2016 
--------------------------------------------------------- */
(function (document){
    
    $(document).ready(function(){
            
        $("#mycarousel").carousel( { interval: 2000 } );

        $("#carousel-pause").click(function(){
            $("#mycarousel").carousel('pause');
        });

        $("#carousel-play").click(function(){
            $("#mycarousel").carousel('cycle');
        });
    });

        
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data('whatever'); // Extract info from data-* attributes
        var modal = $(this);

        modal.find('.modal-body input').val(recipient);
        console.log (recipient);
    })
     
})(document);