Ext.regApplication({
	name: 'App',
	defaultUrl: 'Tasks/index',
	defaultRenderTarget: 'viewport',
	
	launch: function(){
		this.viewport = new App.views.Viewport();
	},

	/*testPerformance: function(count){
		var taskArray = new Array();
		for(var i = 0; i < count; i++){
			taskArray.push({body: 'task' + i});
		}
		Ext.StoreMgr.get('Tasks').add(taskArray);

	}*/

	preparePerformanceTest: function(count){
		var taskArray = new Array();
		for(var i = 0; i < count; i++){
			taskArray.push({body: 'task' + i});
		}
		App.testPreparations = taskArray;
	},

	testPerformance: function(){
		var start = new Date().getMilliseconds();
		Ext.StoreMgr.get('Tasks').add(App.testPreparations);
		var stop = new Date().getMilliseconds();
		console.log(start - stop);
	}
	
});