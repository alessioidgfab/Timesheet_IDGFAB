sap.ui.define([
	"../model/formatter"
], function(formatter) {
	"use strict";
	
	return {
		toSap: function(item) {
			var sapItem = {};
			sapItem.ID_DIPENDENTE = item.idDipendente;
			sapItem.ID_TIMESHEET = item.idTimesheet;
			sapItem.ID_SPESA = "1";
			sapItem.ID_TIPO_SPESA = item.idTipoSpesa;
			sapItem.DATA_SPESA = formatter.getDayFormatTimesheet(formatter.dateFromStringToDateValue(item.dataSpesa));
			sapItem.IMPORTO = item.importo;
			sapItem.IMPORTO_RIMBORSABILE = item.importoRimborsabile;
			sapItem.KM = item.km;
			sapItem.KM_RIMBORSABILE = item.kmRimborsabile;
			sapItem.TIPO_VEICOLO = item.tipoVeicolo;
			sapItem.CLASSE_VEICOLO = item.classeVeicolo;
			sapItem.LOCALITA = item.localita;
			sapItem.NOTA = item.nota;
			sapItem.CREATO_DA = item.creatoDa;
			sapItem.LOCALITA_A = item.localitaA;
			return sapItem;
		}
	}
});