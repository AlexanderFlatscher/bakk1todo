Ext.regModel('Task', {
	fields: [
		{name: 'id', type: 'int'},
		{name: 'body', type: 'string'},
		{name: 'done', type: 'boolean', defaultValue: false}
	],
	validations: [
		{type: 'length', field: 'body', min: 2}
	],
	proxy: {
		type: 'rest',
		url: '/sencha_touch/tasks',
		extraParams: {
			format: 'json',
		},
		reader: {
			type: 'json'
		},
		writer: {
			type: 'json'
		}
	}
});