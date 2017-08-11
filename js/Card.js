function Card(id, name) { 
        var self = this; 
        this.id = id;
        this.name = name; 
        this.$element = createCard(); 
        
        function createCard() {
            var $card = $('<li data-id="' + self.id + '">').addClass('card'), 
                $cardDescription = $('<p>').addClass('card-description').text(self.name), 
                $cardDelete = $('<button>').addClass('btn-delete').text('x');
        
            $cardDelete.click(function() { 
                self.removeCard(); 
            });

            $card.on('card:move', function(event, data) {
                self.update($(data.event.target).parents('.column').data('column-id'))
            })

            $card.append($cardDelete) 
                .append($cardDescription); 
            
            return $card;
        }
    }    

    Card.prototype = { 
        removeCard: function() {
            var self = this;
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'DELETE',
                success: function() { 
                    self.$element.remove(); 
                }
            });
        },
        update: function(newCardId) {
            var self = this;
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: self.name,
                    bootcamp_kanban_column_id: newCardId
                }
            });
        } 
    };