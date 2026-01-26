$(document).ready(function() {
    var search_i = $('#searchTerms, #searchTarget, #searchTheme').selectize({
        plugins: ["clear_button", "remove_button", "restore_on_backspace"],
        create: true,
        valueField: 'value',
        labelField: 'text',
        searchField: 'text',
        load: function (query, callback) {
            if (query.length < 1) {
                callback([]);
                return;
            }
            $.request('onSearchEvents', {
                data: {query: query},
                success: function (response) {
                    callback(response);
                }
            });
        },
        render: {
            option_create: function (data, escape) {
                return '<div class="create">Search for: <strong>' + escape(data.input) + '</strong>&hellip;</div>';
            }
        },
        highlight: true,
        sortField: 'text',
        loadThrottle: 300,
        noResultsText: 'No results found',
        onChange: function (value) {
            updateEventsList();
        }
    });

    var dateFormat = 'yy-mm-dd';
    $('#dateFrom').datepicker({
        dateFormat: dateFormat,
        changeMonth: true,
        onSelect: function (value) {
            $('#dateTo').datepicker("option", "minDate", getDate(this));
            updateEventsList();
            renderActiveFilters();
        }
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
            renderActiveFilters();
        }
    });

    $('#dateTo').datepicker({
        dateFormat: dateFormat,
        changeMonth: true,
        onSelect: function (value) {
            $('#dateFrom').datepicker("option", "maxDate", getDate(this));
            updateEventsList();
            renderActiveFilters();
        }
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
            renderActiveFilters();
        }
    });

    var select = $('#sortCategory, #sortCountry, #sortTarget, #sortTheme').selectize({
        onChange: function(value) {
            updateEventsList();
            renderActiveFilters();
        }
    });

    $('#applyFilter').on('click', function() { updateEventsList(); });

    $('#clearFilter').on('click', function() {
        $('#dateFrom').val('');
        $('#dateTo').val('');
        $('#sortCategory, #sortCountry, #sortTarget, #sortTheme').val(0);

        // Clear search selectize instances
        for (var i = 0; i < search_i.length; i++) {
            if (search_i[i].selectize) {
                search_i[i].selectize.clear();
            }
        }

        // Reset filter selectize instances
        for (var i = 0; i < select.length; i++) {
            select[i].selectize.setValue(0);
        }

        updateEventsList();
        renderActiveFilters();
    });

    // URL params handling
    var urlParams = window.location.search.substring(1).split('&');
    if (urlParams.length) {
        for (var i = 0; i < urlParams.length; i++) {
            var paramArr = urlParams[i].split('=');
            var paramKey = paramArr[0];
            var paramVal = paramArr[1];
            if (typeof paramVal !== 'undefined' && select[i]) {
                select[i].selectize.setValue(paramVal);
                updateEventsList();
            }
        }
    }
});

function getDate(element) {
    var date;
    try {
        date = $.datepicker.parseDate('yy-mm-dd', element.value);
    } catch(error) {
        date = null;
    }
    return date;
}

function updateEventsList(page, type) {
    page = page || 1;
    type = type || 'short-term';

    var filters = {
        searchTerms: $('#searchTerms').val(),
        sortCategory: $('#sortCategory').val(),
        sortCountry: $('#sortCountry').val(),
        sortTarget: $('#sortTarget').val(),
        sortTheme: $('#sortTheme').val(),
        dateFrom: $('#dateFrom').val(),
        dateTo: $('#dateTo').val()
    };

    var data, handler, update;

    if (type === 'ongoing') {
        handler = 'Filter::onLoadOngoingEvents';
        data = Object.assign({}, filters, { ongoing_page: page });
        update = { 'events-ongoing': '#ongoingEventsContainer' };
    } else {
        handler = 'Filter::onSearchEvents';
        data = Object.assign({}, filters, { page: page });
        update = {
            'events-short-term': '#recordsContainer',
            'events-ongoing': '#ongoingEventsContainer'
        };
    }

    $.request(handler, {
        data: data,
        update: update
    });
}

$(document).keydown(function(e) {
    if (e.keyCode === 191) {
        e.preventDefault();
        $('#searchInput')[0].selectize.focus();
    }
    if (e.keyCode === 27) {
        e.preventDefault();
        $('#searchInput')[0].selectize.close();
        $('#searchInput')[0].selectize.blur();
    }
});

// Unified pagination click handler
$(document).on('click', '.pagination-wrapper .pagination-link', function(e) {
    e.preventDefault();
    var page = $(this).data('page');
    var ongoingPage = $(this).data('ongoing-page');

    if (ongoingPage) {
        updateEventsList(ongoingPage, 'ongoing');
        $('html, body').animate({
            scrollTop: $('#ongoingEventsContainer').offset().top - 100
        }, 300);
    } else if (page) {
        updateEventsList(page, 'short-term');
        $('html, body').animate({
            scrollTop: $('#recordsContainer').offset().top - 100
        }, 300);
    }
});

function renderActiveFilters() {
    var container = $('.active-filters');
    container.empty();

    var filters = [
        { id: 'sortTarget', el: '#sortTarget' },
        { id: 'sortTheme', el: '#sortTheme' },
        { id: 'sortCountry', el: '#sortCountry' },
        { id: 'sortCategory', el: '#sortCategory' }
    ];

    filters.forEach(function(filter) {
        var $select = $(filter.el);
        var value = $select.val();
        if (value && value !== '0') {
            var text = $select.find('option:selected').text();
            container.append(createFilterChip(filter.id, text));
        }
    });

    var dateFrom = $('#dateFrom').val();
    var dateTo = $('#dateTo').val();
    if (dateFrom) {
        container.append(createFilterChip('dateFrom', 'From: ' + dateFrom));
    }
    if (dateTo) {
        container.append(createFilterChip('dateTo', 'To: ' + dateTo));
    }
}

function createFilterChip(filterId, text) {
    return $('<div class="filter-chip" data-filter="' + filterId + '">' +
        '<span class="chip-text">' + text + '</span>' +
        '<span class="chip-remove">×</span>' +
        '</div>');
}

$(document).on('click', '.filter-chip .chip-remove', function() {
    var filterId = $(this).closest('.filter-chip').data('filter');
    if (filterId === 'dateFrom' || filterId === 'dateTo') {
        $('#' + filterId).val('');
    } else {
        $('#' + filterId)[0].selectize.setValue('0');
    }
    updateEventsList();
    renderActiveFilters();
});
