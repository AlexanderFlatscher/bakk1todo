App.views.TasksIndex = Ext.extend(Ext.List, {
	layout: 'fit',
	store: Ext.StoreMgr.get('Tasks'),
	multiSelect: false,
	singleSelect: false,
	itemTpl: [
		'<tpl if="done == true">',
			'<span class="done">{body:htmlEncode}</span>',
			'<a href="#Tasks/delete/{id}">Löschen</a>',
		'</tpl>',
		'<tpl if="done == false">',
			'<span class="undone">{body:htmlEncode}</span>',
			'<a href="#Tasks/edit/{id}">Bearbeiten</a>',
		'</tpl>'
	],
	listeners: {
		itemswipe: function(list, index, item, e){
			var id = list.getRecord(item).get('id');
			if(e.direction == 'right'){
				Ext.dispatch({
					controller: 'Tasks',
					action: 'complete',
					taskid: id
				});
			}
			else if(e.direction == 'left'){
				Ext.dispatch({
					controller: 'Tasks',
					action: 'incomplete',
					taskid: id
				});
			}
		}
	}
	
});
Ext.reg('TasksIndex', App.views.TasksIndex);