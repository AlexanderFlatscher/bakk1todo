App.views.TasksNew = Ext.extend(Ext.form.FormPanel, {
	items: [
		{
			xtype: 'fieldset',
			title: 'Neuer Task',
			layout: 'auto',
			items: [
				{
					xtype: 'textareafield',
					name: 'body',
					label: 'Body',
					required: true
				},{
					xtype: 'button',
					text: 'Erstellen',
					handler: function(){
						Ext.dispatch({
							controller: 'Tasks',
							action: 'create'
						});
					}
				}
			]
		},
	]
	
});
Ext.reg('TasksNew', App.views.TasksNew);