Ext.regController('Tasks', {
	
	index: function(options){
		if(!this.indexView){
			this.indexView = this.render({
				xtype: 'TasksIndex'
			});
		}

		var tasksStore = Ext.StoreMgr.get('Tasks');

		if(tasksStore.isFiltered())
			tasksStore.clearFilter();

		if(options.parameter == 'undone')
			tasksStore.filter('done', false);
		else if(options.parameter == 'done')
			tasksStore.filter('done', true);
		else
			options.parameter = 'all';

		tasksStore.sort('done');

		this.application.viewport.setView(this.indexView, options.animation, options.parameter);
	},

	'new': function(options){
		if(!this.newView){
			this.newView = this.render({
				xtype: 'TasksNew'
			});
		}

		this.application.viewport.setView(this.newView, options.animation);
	},

	create: function(options){
		var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Lade...'});
		loadMask.show();

		var params = this.newView.getValues();
		var record = Ext.ModelMgr.create({body: params.body}, 'Task');
		var errors = record.validate();

		if(errors.isValid()){
			record.save({
				success: function(){
					Ext.StoreMgr.get('Tasks').load();
					Ext.redirect('Tasks/index');
				},
				failure: function(){
					Ext.Msg.alert('Fehler', 'Der Task konnte nicht erstellt werden!', Ext.emptyFn);
				}
			});
		} else {
			Ext.Msg.alert('Fehler', 'Dieser Task ist nicht valide!', Ext.emptyFn);
		}

		loadMask.hide();
	},

	edit: function(options){
		if(!this.editView){
			this.editView = this.render({
				xtype: 'TasksEdit'
			});
		}

		var id = parseInt(options.parameter);
		var task = Ext.StoreMgr.get('Tasks').getById(id);

		if(task){
			this.editView.load(task);
			this.application.viewport.setView(this.editView, options.animation);
		}
		
	},

	update: function(options){
		var params = this.editView.getValues();
		var task = Ext.StoreMgr.get('Tasks').getById(parseInt(params.id));
		task.set(params);
		var errors = task.validate();

		if(errors.isValid()){
			task.save({
				success: function(){
					Ext.StoreMgr.get('Tasks').load();
					Ext.redirect('Tasks/index');
				},
				failure: function(){
					Ext.Msg.alert('Fehler', 'Der Task konnte nicht bearbeitet werden!', Ext.emptyFn);
				}
			});
		} else {
			Ext.Msg.alert('Fehler', 'Dieser Task ist nicht valide!', Ext.emptyFn);
		}
	},

	'delete': function(options){
		var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Lade...'});
		loadMask.show();

		var id = parseInt(options.parameter);
		var task = Ext.StoreMgr.get('Tasks').getById(id);
		Ext.Ajax.request({
			url: task.getProxy().url + '/' + task.get('id'),
			method: 'DELETE',
			success: function(){
				Ext.StoreMgr.get('Tasks').remove(task);
				loadMask.hide();
				history.go(-1);
			},
			failure: function(){
				Ext.Msg.alert('Fehler', 'Der Task konnte nicht gelöscht werden!', Ext.emptyFn);
				loadMask.hide();
				history.go(-1);
			}
		});

		
	},

	complete: function(options){
		var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Lade...'});
		loadMask.show();

		var task = Ext.StoreMgr.get('Tasks').getById(options.taskid);
		task.set('done', true);
		task.save({
			success: function(){
				loadMask.hide();
			},
			failure: function(){
				loadMask.hide();
				Ext.Msg.alert('Fehler', 'Der Task konnte nicht erledigt werden!', Ext.emptyFn);
			}
		});
	},

	incomplete: function(options){
		var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: 'Lade...'});
		loadMask.show();

		var task = Ext.StoreMgr.get('Tasks').getById(options.taskid);
		task.set('done', false);
		task.save({
			success: function(){
				loadMask.hide();
			},
			failure: function(){
				loadMask.hide();
				Ext.Msg.alert('Fehler', 'Der Task konnte nicht als "nicht erledigt" markiert werden!', Ext.emptyFn);
			}
		});
	}
});