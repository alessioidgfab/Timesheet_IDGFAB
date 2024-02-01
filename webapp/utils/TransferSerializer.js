sap.ui.define([
	"../model/formatter"
], function(formatter) {
	"use strict";
	
	return {
		toSap: function(item) {
			var sapItem = {};
			sapItem.ID_DIPENDENTE = item.idDipendente;
			sapItem.ID_TIMESHEET = item.idTimesheet;
			sapItem.ID_WBS = item.idWbs;
			sapItem.CHIAVE_TRASFERTA = item.chiaveTrasferta;
			sapItem.DATA_INIZIO = formatter.getDayFormatTimesheet(formatter.dateFromStringToDateValue(item.dataInizio));
			sapItem.DATA_FINE = formatter.getDayFormatTimesheet(formatter.dateFromStringToDateValue(item.dataFine));
			sapItem.CREATO_DA = item.creatoDa;
			sapItem.SOCIETA = item.companyCode;
			return sapItem;
		}
	}
});