$(function () {
    'use strict';
        
    Highcharts.setOptions({
        colors: ['#337ab7', '#5cb85c', '#d9534f', '#f0ad4e', '#606060']
    });
    
    var chartHeight = 200;


    function buildWebViewer(castNamePlaceholderID, chartPlaceholderID, statsPlaceholderID) {
        var getVisualizerDataURL = './data/data.json';
        $.getJSON(getVisualizerDataURL, function (data, status) {
            if (status === 'success' && data !== null) {
                var chartPlaceholder = '#' + chartPlaceholderID;
                if ('error' in data){
                    $(chartPlaceholder).html('<strong>Error: ' + data.error + '</strong>');
                } else {
                    updateCastName(castNamePlaceholderID, data['castName'])
                    updateChart(chartPlaceholderID, data['visualizerData']);
                    updateStats(statsPlaceholderID, data['stats']);
                }
            }
        });
    }

    function updateCastName(castNamePlaceholderID, data) {
        $('#'+ castNamePlaceholderID).html(data);
    }

    function updateStats(statsPlaceholderID, data) {
        
        var output = $('<div class="row"></div>');

        var i = 0;
        for (i = 0; i < data.length; i++) {
            var statContainer = $('<div class="col-md-4 col-lg-3"></div>');
            var stat = ''
            if (data[i]['statType'] == 'bounds') {
                stat = $('<span><strong>' + data[i]['statName'] + ':</strong><br/>Min: ' + data[i]['statData'][0] + ' ' + data[i]['statUnit'] + '<br/>Max: ' + data[i]['statData'][1] + ' ' + data[i]['statUnit'] + '</span>')
            }
            statContainer.append(stat);
            output.append(statContainer);            
        }

        $('#'+ statsPlaceholderID).html(output);
    }

    function updateChart(chartPlaceholderID, data) {
        var seriesData = [];
        var yAxes = [];
        var xAxes = [];

        var i = 0;
        for (i = 0; i < data.length; i++) {
            yAxes[i] = {
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[i % Highcharts.getOptions().colors.length]
                    }
                },
                title: {
                    text: '',
                    style: {
                        color: Highcharts.getOptions().colors[i % Highcharts.getOptions().colors.length]
                    }
                }
            };
            if (i >= data.length / 2) {
                yAxes[i].opposite = true;
            }

            seriesData[i] = {
                name: data[i].label +  ' (' + data[i].unit + ')',
                yAxis: i,
                data: data[i].data,
                animation: false
            };
        }

        var chartOptions = {
            chart: {type: 'line' },
            title: {text: ''},
            tooltip: {
                shared: true,
                crosshairs: true,
                //xDateFormat: '%Y-%m-%d',
                formatter: function() {
                    //var toolTipStr = '<span style="font-size: 10px">Time: ' + Highcharts.dateFormat('%b %e, %Y - %H:%M:%S', this.x) + '</span>';
                    var toolTipStr = '';
                    $.each(this.points, function (i) {
                        toolTipStr += '<br/>' + '<span style="font-size: 10px; color:' + this.series.color + '">\u25CF</span><span style="font-size: 10px"> ' + data[i].label + ': ' + this.y +  ' ' + data[i].unit + '</span>';
                    });
                    return toolTipStr;
                }
            },
            legend: {enabled: true},
            //xAxis: {type: 'datetime',
            //        title: {text: ''},
            //        dateTimeLabelFormats: {millisecond: '%H', second: '%H:%M:%S', minute: '%H:%M', hour: '%H:%M', day: '%b %e', week: '%b %e', month: '%b \'%y', year: '%Y'}
            //       },
            yAxis: yAxes,
            series: seriesData,
        };

        $(chartPlaceholder).highcharts(chartOptions);
    }

    buildWebViewer('castNamePlaceholder', 'chartPlaceholder', 'statsPlaceholder');
})