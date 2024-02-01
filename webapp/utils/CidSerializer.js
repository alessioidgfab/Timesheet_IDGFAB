sap.ui.define([], function() {
	"use strict";
	/*eslint complexity: ["error", 2]*/
	/*eslint linebreak-style:0*/
	return {
		fromSapItems: function(sapItems) {
			var results = [];
			if (sapItems && sapItems.length > 0) {
				for (var i = 0; i < sapItems.length; i++) {
					results.push(this.fromSap(sapItems[i]));
				}
			}
			return results;
		},

		fromSap: function(sap) {
			var p = {};
			p.cid = sap.CID ? sap.CID : sap.cid ? sap.cid : "";
			p.classeVeicolo = sap.CLASSE_VEICOLO ? sap.CLASSE_VEICOLO : sap.classeVeicolo ? sap.classeVeicolo : "";
			p.externalId = sap.EXTERNALID ? sap.EXTERNALID : sap.externalId ? sap.externalId : "";
			p.nome = sap.NOME ? sap.NOME : sap.nome ? sap.nome : "";
			p.cognome = sap.COGNOME ? sap.COGNOME : sap.cognome ? sap.cognome : "";
			p.stato = sap.STATO ? sap.STATO : sap.stato ? sap.stato : "";
			p.tipoDipendente = sap.TIPO_DIPENDENTE ? sap.TIPO_DIPENDENTE : sap.tipoDipendente ? sap.tipoDipendente : "";
			p.tipoUtente = sap.TIPO_UTENTE ? sap.TIPO_UTENTE : sap.tipoUtente ? sap.tipoUtente : "";
			p.tipoVeicolo = sap.TIPO_VEICOLO ? sap.TIPO_VEICOLO : sap.tipoVeicolo ? sap.tipoVeicolo : "";
			p.veicoli = sap.DipendenteVeicoloRef ? this.vehiclesFromSapItems(sap.DipendenteVeicoloRef) : sap.dipendenteVeicoloRef ? this.vehiclesFromSapItems(
				sap.dipendenteVeicoloRef) : [];
			return p;
		},

		vehiclesFromSapItems: function(results) {
			var data = [];
			var arrayVehicles = results && results.results && results.results.length ? results.results : results && results.dipendenteVeicoloSet &&
				results.dipendenteVeicoloSet.length ? results.dipendenteVeicoloSet : [];
			if (arrayVehicles.length) {
				_.each(arrayVehicles, function(sap) {
					var c = this.vehiclesFromSap(sap);
					data.push(c);
				}.bind(this));
			}
			return data;
		},

		vehiclesFromSap: function(sap) {
			var p = {};
			p.cid = sap.CID ? sap.CID : sap.cid ? sap.cid : "";
			p.classeVeicolo = sap.CLASSE_VEICOLO ? sap.CLASSE_VEICOLO : sap.classe ? sap.classe : "";
			p.dataInizio = sap.DATA_INIZIO ? sap.DATA_INIZIO : sap.dataInizio ? new Date(sap.dataInizio) : "";
			p.dataFine = sap.DATA_FINE ? sap.DATA_FINE : sap.dataFine ? new Date(sap.dataFine) : "";
			p.id = sap.ID ? sap.ID : sap.id ? sap.id : "";
			p.tipoVeicolo = sap.TIPO_VEICOLO ? sap.TIPO_VEICOLO : sap.tipo ? sap.tipo : "";
			return p;
		}
	}
});