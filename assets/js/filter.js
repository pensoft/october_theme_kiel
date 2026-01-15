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

// $('#dateFrom').on('change', updateEventsList());
// $('#dateTo').on('change', updateEventsList());

    var dateFormat = 'yy-mm-dd';
    $('#dateFrom').datepicker({
        dateFormat: dateFormat,
        onSelect: function (value) {
            updateEventsList();
        }
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });
    $('#dateTo').datepicker({
        dateFormat: dateFormat,
        onSelect: function (value) {
            updateEventsList();
        }
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });

    var from = $("#dateFrom")
            .datepicker({
                changeMonth: true,
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $("#dateTo").datepicker({
            changeMonth: true,
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    var select = $('#sortCategory, #sortCountry, #sortTarget, #sortTheme').selectize({
        onChange: function(value) {
            updateEventsList();
            renderActiveFilters();
        }
    });

    $('#applyFilter').on('click', function() { updateEventsList(); });

    $('#clearFilter').on('click',function() {
        $('#dateFrom').val('');
        $('#dateTo').val('');
        // $('#searchInput').val('');
        // $('#sortFormat').val(0);
        $('#sortCategory').val(0);
        $('#sortCountry').val(0);
        $('#sortTarget').val(0);
        $('#sortTheme').val(0);
        var selectize = select[0].selectize;
        var selectize1 = select[1].selectize;
        var selectize2 = select[2].selectize;
        var selectize3 = select[3].selectize;

        if (search_i.length > 0 && search_i[0].selectize) {
            search_i[0].selectize.clear();
        }
        if (search_i.length > 1 && search_i[1].selectize) {
            search_i[1].selectize.clear();
        }
        if (search_i.length > 2 && search_i[2].selectize) {
            search_i[2].selectize.clear();
        }
        selectize.setValue(0);
        selectize1.setValue(0);
        selectize2.setValue(0);
        selectize3.setValue(0);
        updateEventsList();
        renderActiveFilters();
    });

    var urlParams = window.location.search.substring(1).split('&');
    if(urlParams.length){
        for(i = 0; i < urlParams.length; i++){
            var paramArr = urlParams[i].split('=');
            var paramKey = paramArr[0];
            var paramVal = paramArr[1];
            if(typeof paramVal !== 'undefined'){
                var selectize = select[i].selectize;
                selectize.setValue(paramVal);
                updateEventsList();
            }
        }

    }



});

function getDate( element ) {
    var date;
    try {
        date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
        date = null;
    }

    return date;
}




function updateEventsList(page) {
    page = page || 1;

    var sortCategory = $('#sortCategory').val();
    var sortCountry = $('#sortCountry').val();
    var sortTarget = $('#sortTarget').val();
    var sortTheme = $('#sortTheme').val();

    // if($('#sortCategory').length == 0){
    //     sortCategory = 2;
    // }
    //
    // var sortFormat = $('#sortFormat').val();

    var dateFrom = $('#dateFrom').val();
    var dateTo = $('#dateTo').val();
    var searchTerm = $('#searchTerms').val();
    var searchTarget = $('#searchTarget').val();
    var searchTheme = $('#searchTheme').val();

    $.request('onSearchEvents', {
        data: {
            searchTerms: searchTerm,
            sortCategory: sortCategory,
            sortCountry: sortCountry,
            sortTarget: sortTarget,
            sortTheme: sortTheme,
            dateFrom: dateFrom,
            dateTo: dateTo,
            page: page
        },
        update: { 'events-short-term': '#recordsContainer' }
    });
}

//
// function getUrlParams(){
//     var params = window.location.search.substring(1).split('&');
//     console.log(params);
//     var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//     // var urlparam = [];
//     // for (var i = 0; i < url.length; i++) {
//     //     urlparam[] = url[i];
//     //
//     // }
//     // return urlparam;
// }


$(document).keydown(function(e) {

    // 191 = /
    if (e.keyCode === 191) {
        e.preventDefault();
        $('#searchInput')[0].selectize.focus();
    }

    // 27 = esc
    if (e.keyCode === 27) {
        e.preventDefault();
        $('#searchInput')[0].selectize.close();
        $('#searchInput')[0].selectize.blur();
    }
});

// Pagination click handler
$(document).on('click', '.pagination-wrapper .pagination-link', function(e) {
    e.preventDefault();
    var page = $(this).data('page');
    if (page) {
        updateEventsList(page);
        // Scroll to top of results
        $('html, body').animate({
            scrollTop: $('#recordsContainer').offset().top - 100
        }, 300);
    }
});

// Render active filter chips
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
            var chip = $('<div class="filter-chip" data-filter="' + filter.id + '">' +
                '<span class="chip-text">' + text + '</span>' +
                '<span class="chip-remove">×</span>' +
                '</div>');
            container.append(chip);
        }
    });
}

// Handle chip remove click
$(document).on('click', '.filter-chip .chip-remove', function() {
    var filterId = $(this).closest('.filter-chip').data('filter');
    var selectize = $('#' + filterId)[0].selectize;
    selectize.setValue('0');
    updateEventsList();
});
