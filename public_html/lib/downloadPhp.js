/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){

	$('#download').click(function(e){

		$.generateFile({
			filename	: 'export.txt',
			content		: $('textarea').val(),
			script		: 'download.php'
		});

		e.preventDefault();
	});

	$('#downloadPage').click(function(e){

		$.generateFile({
			filename	: 'page.html',
			content		: $('html').html(),
			script		: 'download.php'
		});

		e.preventDefault();
	});

});