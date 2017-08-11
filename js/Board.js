var board = { 
        name: 'Kanban Board', 
        addColumn: function(column) { 
            this.$element.append(column.$element); 
            initSortable(); 
        }, 
        $element: $('#board .column-container') 
    };
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder',
            update: function(event, ui) {
                if (ui.sender) {
                    $(ui.item).trigger('card:move', {event: event})
                }
            }
        }).disableSelection();
    }    
    
    $('.create-column').click(function() { 
        
        swal({
            title: "Column name",
            text: "Enter the column name",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            inputPlaceholder: "column name",
        },
            function (inputValue) {
                if (inputValue === false) 
                    return false;

                if (inputValue === "") {
                    swal.showInputError("Your column need a name");
                    return false
                }

        $.ajax({
    		url: baseUrl + '/column',
    		method: 'POST',
    		data: {
                name: inputValue
    		},
    		success: function(response) {
    			board.addColumn(new Column(response.id, inputValue)); 
                swal("OK", "Column " + "'" + inputValue + "'" + " created", "success"); 
            }
        });
          
    });
});