Ext.regStore('Tasks', {
	model: 'Task',
	autoLoad: true,
	sortOnLoad: true,
	sorters: [
		{
			property: 'done',
			direction: 'ASC'
		}
	]
});