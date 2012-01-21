App.views.TasksEdit = Ext.extend(Ext.form.FormPanel, {
	items: [
		{
			xtype: 'fieldset',
			title: 'Task Bearbeiten',
			layout: 'auto',
			items: [
				{
					xtype: 'hiddenfield',
					name: 'id'	
				},{
					xtype: 'textareafield',
					name: 'body',
					label: 'Body',
					required: true
				},{
					xtype: 'hiddenfield',
					name: 'done'
				},{
					xtype: 'button',
					text: 'Ändern',
					handler: function(){
						Ext.dispatch({
							controller: 'Tasks',
							action: 'update'
						});
					}
				}
			]
		}
	]
	
});
Ext.reg('TasksEdit', App.views.TasksEdit);