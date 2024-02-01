sap.ui.define([
	"../model/formatter",
	"../controller/BaseController"
], function (formatter, baseController) {
	"use strict";

	return {
		baseController: baseController,
		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		getFirstDayFromMonth: function (year, month) {
			var data = new Date(year, month, 1);
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddThh:mm:ss.mmm"
			});
			return oDateFormat.format(data);
		},

		getLastDayFromMonth: function (year, month) {
			var data = new Date(year, month, 0);
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddThh:mm:ss.mmm"
			});
			return oDateFormat.format(data);
		},

		getDayFormatTimesheet: function (date) {
			var data = new Date(date);
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTHH:mm:ss.mmm"
			});
			return oDateFormat.format(data);
		},
		getDayFormatTimesheetProgress: function (date) {
			var data = new Date(date);
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddT12:mm:ss.mmm"
			});
			return oDateFormat.format(data);
		},

		dateFromStringToDateValue: function (date) {
			var day = parseInt(date.split("/")[0]);
			var month = parseInt(date.split("/")[1]) - 1;
			var year = parseInt(date.split("/")[2]);
			return new Date(year, month, day);
		},

		stringDateToSapDate: function (date) {
			var dateValue = this.dateFromStringToDateValue(date);
			dateValue.setHours(12);
			var time = dateValue.getTime();
			return "/Date(" + time + ")/";
		},

		sapDateToDateValue: function (sapDate) {
			var convertedDate;
			if (sapDate) {
				var milliseconds = sapDate.replace("/Date(", "");
				milliseconds = parseInt(milliseconds.replace(")/", ""));
				convertedDate = new Date(milliseconds);
			}
			return convertedDate;
		},

		formatDate: function (date) {
			var formattedDate = new Date(date);
			var convertedDate = "";
			if (formattedDate) {
				var gg = formattedDate.getDate();
				var mm = formattedDate.getMonth() + 1;
				var yyyy = formattedDate.getFullYear();
				if (gg < 10) {
					gg = "0" + gg;
				}
				if (mm < 10) {
					mm = "0" + mm;
				}
				convertedDate = gg + "/" + mm + "/" + yyyy;
			}
			return convertedDate;
		},

		stato: function (statusId) {
			var value;
			switch (statusId) {
			case "1":
				value = "ELAB";
				break;
			case "2":
				value = "RIL";
				break;
			case "3":
				value = "APPR";
				break;
			}
			return value;
		},

		setDecimals: function (value) {
			if (value) {
				return parseFloat(value).toFixed(2);
			}
		},

		formatErroriSap: function (err) {
			var errore = "";
			if (err && err.response && err.response.body) {
				var objErrore = JSON.parse(err.response.body) ? JSON.parse(err.response.body).error : "";
				if (typeof (objErrore === "object")) {
					if (objErrore.message && objErrore.message.value) {
						errore = objErrore.message.value;
					}
				} else {
					errore = "Errore non definito";
				}
			} else {
				errore = "Errore non definito";
			}
			return errore;
		},

		setMonthName: function (monthNumber) {
			var monthName = "";
			switch (monthNumber) {
			case 1:
				monthName = "january";
				break;
			case 2:
				monthName = "february";
				break;
			case 3:
				monthName = "march";
				break;
			case 4:
				monthName = "april";
				break;
			case 5:
				monthName = "may";
				break;
			case 6:
				monthName = "june";
				break;
			case 7:
				monthName = "july";
				break;
			case 8:
				monthName = "august";
				break;
			case 9:
				monthName = "september";
				break;
			case 10:
				monthName = "october";
				break;
			case 11:
				monthName = "november";
				break;
			case 12:
				monthName = "december";
				break;
			}
			return monthName;
		}
	};
});