sap.ui.define([
		"timesheetproject2/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("timesheetproject2.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);