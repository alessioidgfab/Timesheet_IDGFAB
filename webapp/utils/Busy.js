sap.ui.define([
		"sap/m/BusyDialog"
	], function(busy) {
	"use strict";

	return {
		busyDialog: new busy,
		show: function(text) {
			if (text) {
				var message = text;
				this.busyDialog.setText(message);
			}
			this.busyDialog.open();
		},
		hide: function(text) {
			this.busyDialog.setText("");
			this.busyDialog.close();
		}
	};

});