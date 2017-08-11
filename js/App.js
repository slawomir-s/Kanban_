var baseUrl = 'https://kodilla.com/pl/bootcamp-api';

$.ajaxSetup({
	headers: {
        'X-Client-Id': 1756,
        'X-Auth-Token': '5b846df5a82b25497805de4c570399ce'
    }
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
        card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.addCard(card);
    });
}