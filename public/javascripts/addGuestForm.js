$(document).ready(function() 
{
    $('#addGuestForm')
        .submit(function(e) 
        {
            e.preventDefault(); //STOP default action
            var postData = new Object();
            postData.eventID= $( this ).attr( "eventID" );
            postData.ids = $(this).serializeArray();
            var formURL = $(this).attr("action");
            if(postData.ids.length!=0)
            {
                $.ajax(
                    {
                        url: formURL,
                        type: "POST",
                        data: postData,
                        //dataType: 'json', // Choosing a JSON datatype
                        success: function(data, textStatus, jqXHR) {
                            $( "div.addGuestsModal" ).html(' \
                             <div class="modal-dialog"> \
                                <div class="modal-content"> \
                                    <div class="modal-header"> \
                                        <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">x</span></button> \
                                    </div> \
                                    <div class="modal-body"> \
                                    <div class="alert alert-success" role="alert">Guests Added Successfully!</div> \
                                    </div> \
                                    <div class="modal-footer"> \
                                        <button class="btn btn-success" data-dismiss="modal" type="button">Close</button> \
                                    </div> \
                                </div> \
                            </div>');
                        },
                        error: function(jqXHR, textStatus, errorThrown) {}
                    }
                );
            }
        });
        
});