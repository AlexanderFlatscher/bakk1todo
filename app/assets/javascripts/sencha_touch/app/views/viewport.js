App.views.Viewport = Ext.extend(Ext.Panel, {
	id: 'viewport',
	fullscreen: true,
	layout: 'card',
	cardSwitchAnimation: 'slide',
	dockedItems: [
		{
			xtype: 'toolbar',
			title: 'ToDo',
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'right'
			},
			items: [
				{
					text: 'Neu',
					ui: 'round',
					handler: function(b, e){
						Ext.redirect('Tasks/new');
					}
				}
			]
		},{
			xtype: 'toolbar',
			ui: 'light',
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			items: [
				{
					xtype: 'segmentedbutton',
					items: [
						{
							text: 'Alle',
							id: 'all',
							handler: function(){
								Ext.redirect('Tasks/index');
							}
						},{
							text: 'Offen',
							id: 'undone',
							handler: function(){
								Ext.redirect('Tasks/index/undone');
							}
						},{
							text: 'Erledigt',
							id: 'done',
							handler: function(){
								Ext.redirect('Tasks/index/done');
							}
						}
					]
				}
			]
		}
	],
	setView: function(card, cardSwitchAnimation, filter){
		var index = -1;

		if(filter == 'all')
			index = 0;
		else if(filter == 'undone')
			index = 1;
		else if(filter == 'done')
			index = 2;

		var segmentedButton = this.query('segmentedbutton')[0];
		
		if(index >= 0)
			segmentedButton.setPressed(index, true);
		else
			segmentedButton.setPressed(segmentedButton.getPressed(), false);

		this.setActiveItem(card, cardSwitchAnimation);
	}
});