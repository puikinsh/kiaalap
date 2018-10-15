(function ($) {
 "use strict";
 
	$("#sparkline1").sparkline([34, 43, 43, 35, 44, 32, 44, 52, 25], {
        type: 'line',
        lineColor: '#006DF0',
		lineWidth: 1,
		barSpacing: '100px',
        fillColor: '#006DF0',
    });
    $("#sparkline2").sparkline([-4, -2, 2, 0, 4, 5, 6, 7], {
        type: 'bar',
        barColor: '#006DF0',
        negBarColor: '#933EC5'});

    $("#sparkline3").sparkline([1, 1, 2], {
        type: 'pie',
        sliceColors: ['#006DF0', '#933EC5', '#D80027']});

    $("#sparklinedask1").sparkline([1, 3, 2], {
        type: 'pie',
		width: '80',
            height: '80',
        sliceColors: ['#006DF0', '#933EC5', '#D80027']});

    $("#sparklinedask2").sparkline([1, 1, 2], {
        type: 'pie',
		width: '80',
            height: '80',
        sliceColors: ['#006DF0', '#933EC5', '#D80027']});

    $("#sparkline4").sparkline([34, 43, 43, 35, 44, 32, 15, 22, 46, 33, 86, 54, 73, 53, 12, 53, 23, 65, 23, 63, 53, 42, 34, 56, 76, 15, 54, 23, 44], {
        type: 'line',
        lineColor: '#006DF0',
        fillColor: '#ffffff',
    });

    $("#sparkline5").sparkline([1, 1, 0, 1, 1, 1, 1, 1, -1, -2, -3, -4], {
        type: 'tristate',
        posBarColor: '#006DF0',
        negBarColor: '#933EC5'});


    $("#sparkline6").sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 5, 6, 3, 4, 5, 8, 7, 6, 9, 3, 2, 4, 1, 5, 6, 4, 3, 7, ], {
        type: 'discrete',
        lineColor: '#006DF0'});

    $("#sparkline7").sparkline([52, 12, 44], {
        type: 'pie',
        height: '150px',
        sliceColors: ['#006DF0', '#933EC5', '#D80027']});

    $("#sparkline8").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7], {
        type: 'bar',
        barWidth: 8,
        height: '150px',
        barColor: '#006DF0',
        negBarColor: '#933EC5'});

    $("#sparkline9").sparkline([34, 43, 43, 35, 44, 32, 15, 22, 46, 33, 86, 54, 73, 53, 12, 53, 23, 65, 23, 63, 53, 42, 34, 56, 76, 15, 54, 23, 44], {
        type: 'line',
        lineWidth: 1,
        width: '150px',
        height: '150px',
        lineColor: '#999',
        fillColor: '#006DF0',
    });
	
	 $('.sparklineedu').sparkline([ [1], [2], [3], [4, 2], [3], [5, 3] ], { type: 'bar', barColor: '#006DF0',
        negBarColor: '#933EC5',});
	
	
	

	var sparklineCharts = function(){
		 $("#sparkline22").sparkline([34, 43, 43, 35, 44, 32, 44, 52], {
			 type: 'line',
			 width: '100%',
			 height: '60',
			 lineColor: '#006DF0',
			 fillColor: "#006DF0"
		 });

		 $("#sparkline23").sparkline([24, 43, 43, 55, 44, 62, 44, 72], {
			 type: 'line',
			 width: '100%',
			 height: '60',
			 lineColor: '#933EC5',
			 fillColor: "#933EC5"
		 });

		 $("#sparkline24").sparkline([74, 43, 23, 55, 54, 32, 24, 12], {
			 type: 'line',
			 width: '100%',
			 height: '60',
			 lineColor: '#65b12d',
			 fillColor: "#65b12d"
		 });

		 $("#sparkline25").sparkline([24, 43, 33, 55, 64, 72, 44, 22], {
			 type: 'line',
			 width: '100%',
			 height: '60',
			 lineColor: '#D80027',
			 fillColor: "#D80027"
		 });

		 $("#sparkline51").sparkline([1, 4], {
			 type: 'pie',
			 height: '140',
			 sliceColors: ['#006DF0', '#ebebeb']
		 });

		 $("#sparkline52").sparkline([5, 3], {
			 type: 'pie',
			 height: '140',
			 sliceColors: ['#933EC5', '#ebebeb']
		 });

		 $("#sparkline53").sparkline([2, 2], {
			 type: 'pie',
			 height: '140',
			 sliceColors: ['#65b12d', '#ebebeb']
		 });

		 $("#sparkline54").sparkline([2, 3], {
			 type: 'pie',
			 height: '140',
			 sliceColors: ['#D80027', '#ebebeb']
		 });
	};

	var sparkResize;

	$(window).resize(function(e) {
		clearTimeout(sparkResize);
		sparkResize = setTimeout(sparklineCharts, 500);
	});

	sparklineCharts();



	
	
})(jQuery); 