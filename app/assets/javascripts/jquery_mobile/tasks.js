var showErrorDialog = function(errorMessage){
	if(errorMessage == null)
		errorMessage = "Ein Fehler ist aufgetreten!";

	$('#errorDialog p').html(errorMessage);
	$('#showErrorDialog').click();
}

var swiperightHandler = function(e){
	var task = $(this);

	if(task.hasClass('done'))
		return;

	var taskid = task.data('taskid');
	$.mobile.showPageLoadingMsg();

	$.ajax({
		url: '/jquery_mobile/tasks/' + taskid + '/complete',
		type: 'POST',
		data: {
			_method: 'put',
		},
		success: function(data, textStatus, jqXHR){
			task.addClass('done');
			$.mobile.hidePageLoadingMsg();
		},
		error: function(jqXHR, textStatus, errorThrown){
			$.mobile.hidePageLoadingMsg();
			showErrorDialog();

		}
	});
}

var swipeleftHandler = function(e){
	var task = $(this);

	if(!task.hasClass('done'))
		return;

	var taskid = task.data('taskid');
	$.mobile.showPageLoadingMsg();

	$.ajax({
		url: '/jquery_mobile/tasks/' + taskid + '/incomplete',
		type: 'POST',
		data: {
			_method: 'put',
		},
		success: function(data, textStatus, jqXHR){
			task.removeClass('done');
			$.mobile.hidePageLoadingMsg();
		},
		error: function(jqXHR, textStatus, errorThrown){
			$.mobile.hidePageLoadingMsg();
			showErrorDialog();
		}
	});
}

var deleteHandler = function(e){
	console.log($(this).parent().data('taskid'));
	$('#deleteDialog p span').html('');
	$('#showDeleteDialog').click();

	var task = $(this).closest('li');
	$.mobile.showPageLoadingMsg();

	$.ajax({
		url: $(this).attr('href'),
		type: 'post',
		data: {
			_method: 'delete'
		},
		success: function(){
			// Todo find all the tasks
			console.log($(':jqmData(taskid="' + task.data('taskid') + '")'));
			$.mobile.hidePageLoadingMsg();

		},
		error: function(){
			$.mobile.hidePageLoadingMsg();
			showErrorDialog();
		},
	});


	return false;
}

$('#indexPage, #donePage, #undonePage').live('pageinit', function(e){
	$(':jqmData(role="page") ul').on({
		'swiperight': swiperightHandler,
		'swipeleft': swipeleftHandler,
	}, 'li');

	$(':jqmData(role="page") ul').on({'click': deleteHandler}, 'a:jqmData(method="delete")');
});

$('body').live('pagechange', function(toPage, options){
	$('nav ul li a.ui-btn-active').removeClass('ui-btn-active');
	$('nav ul li a.' + $.mobile.activePage[0].id).addClass('ui-btn-active');
});

/*$.testPerformance = function(count){
	var tasks;
	for(var i = 0; i < count; i++){
		tasks += '<li data-taskid="' + i + '"><a href="#">task' + i + '</a><a href="/jquery_mobile/tasks/' + i + '/edit" data-icon="gear" data-theme="c">Bearbeiten</a></li>';
	}
	$($('.ui-listview')[0]).append(tasks).listview('refresh')
}*/

$.preparePerformanceTest = function(count){
	var tasks = '';
	for(var i = 0; i < count; i++){
		tasks += '<li data-taskid="' + i + '"><a href="#">task' + i + '</a><a href="/jquery_mobile/tasks/' + i + '/edit" data-icon="gear" data-theme="c">Bearbeiten</a></li>';
	}
	$.testPreparations = tasks;
}

$.testPerformance = function(){
	var start = new Date().getMilliseconds();
	$($('.ui-listview')[0]).append($.testPreparations)//.listview('refresh');
	var stop = new Date().getMilliseconds();

	console.log(stop - start);
}