function Column(id, name) { 
        var self = this;
        this.id = id; 
        this.name = name;
        this.$element = createColumn(); 
        
        function createColumn() { 
            var $column = $('<div data-column-id="' + self.id + '">').addClass('column'), 
                $columnTitle = $('<h2>').addClass('column-title').text(self.name), 
                $columnCardList = $('<ul>').addClass('column-card-list'), 
                $columnDelete = $('<button>').addClass('btn-delete').text('x'), 
                $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            $columnDelete.click(function() { 
                self.removeColumn(); 
            });

            $columnAddCard.click(function(event) {
                
                swal({
                    title: "Card name",
                    text: "Enter the name of the card",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    inputPlaceholder: "card name"
                },
                
                function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("Your card need a name");
                    return false
                }

                cardName = inputValue;
                
                event.preventDefault();
                
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: cardName,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, cardName);
                        self.addCard(card);
                    }
                });
                swal("OK", "Card " + "'" + inputValue + "'" + " created", "success"); 
            });
        });    

            $column.append($columnTitle) 
                    .append($columnDelete) 
                    .append($columnAddCard) 
                    .append($columnCardList); 
            return $column;
        }
    }
    
    Column.prototype = { 
        addCard: function(card) { 
            this.$element.children('ul').append(card.$element); 
        }, 
        removeColumn: function() { 
            var self = this;
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'DELETE',
                success: function (response) {
                    self.$element.remove(); 
                }
            });
        }
    };