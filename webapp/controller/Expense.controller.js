sap.ui.define([
	"timesheetproject2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../model/oDataRequest",
	"../utils/TimesheetSerializer",
	"../utils/CalcoloPasqua",
	"../model/StorageService",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, History, formatter, Filter, FilterOperator, oData, TimesheetSerializer, CalcoloPasqua,
	StorageService, MessageBox) {
	"use strict";
	/* eslint-disable no-console */
	/*eslint linebreak-style:0*/
	/*globals _:false */
	return BaseController.extend("timesheetproject2.controller.Expense", {
		formatter: formatter,

		onInit: function () {
			this.byId('changeButton').setEnabled(false);
			this.byId('AddButton').setEnabled(true);

			this.arrayColori = [
				"#FF0000",
				"#33FF33",
				"#FF6600",
				"#0000FF",
				"#FFFF33",
				"#00FFFF",
				"#CC33CC",
				"#009966",
				"#696969",
				"#FF99FF",
				"#99FFCC",
				"#FF0066",
				"#B8860B",
				"#A52A2A",
				"#9ACD32",
				"#FF7F50",
				"#336699",
				"#FF1493",
				"#00BFFF",
				"#FFE4E1",
				"#87CEEB",
				"#D8BFD8",
				"#A0CE00",
				"#6B8E23",
				"#FF4500",
				"#808000",
				"#00008B",
				"#DC143C",
				"#000000",
				"#D2691E",
				"#5F9EA0",
				"#8A2BE2",
				"#CD5C5C",
				"#00FF00",
				"#9370DB",
				"#FF00FF",
			];
			// timesheetproject2.controller.BaseController.prototype.onInit.apply(this, arguments);
			this.getRouter().getRoute("expense").attachPatternMatched(this._expenseMatched, this);

			this.timesheetCalendar = this._getById("idExpenseCalendar");

			this.timesheetModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.timesheetModel, "timesheetModel");

			this.expenseModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.expenseModel, "expenseModel");
			// var modelloJSON = new JSONModel;
			// this.getView().setModel(modelloJSON, "expenseModel");
			this.getView().getModel("expenseModel").setProperty("/expenseType", []);
			this.getView().getModel("expenseModel").setProperty("/arrayExpense", []);

			this.expenseToSaveModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.expenseToSaveModel, "expenseToSaveModel");
			// this.getView().setModel(modelloJSON, "expenseToSaveModel");
			this.getView().getModel("expenseToSaveModel").setProperty("/amount", []);

			this.chooseTimesheetModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.chooseTimesheetModel, "chooseTimesheetModel");
		},

		_expenseMatched: function (evt) {
			this.byId('changeButton').setEnabled(false);
			this.byId('AddButton').setEnabled(true);
			// var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			// this.oDate = oStore.get("id");
			var userInfo = sap.ushell.Container.getService('UserInfo')
			var email = userInfo.getEmail();
			this.getUser = [];
			this.assign = [];
			var obj = {
				EMAIL_UTENTE: email
			};
		
			// this.oDate = null;
	
			//UTENTE TECHNIS
			// if (this.oDate != null && this.oDate != "") {
			//   var name = this.oDate.NOME_UTENTE;
			//   var surname = this.oDate.COGNOME_UTENTE;
			//   var that = this;
			// jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 	jQuery.proxy(function () {
			// 		var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// 		that.makeAjaxRequest(
			// 			sUrl +  `Anagrafica_Utenti?$filter=COGNOME_UTENTE eq '${surname}' and NOME_UTENTE eq '${name}'`,
			// 			function (data) {
			// 				// Handle success for Anagrafica_Utenti
			// 				that.getUser = data.value;
			// 			}.bind(this),
			// 			function (error) {
			// 				// Handle error for Anagrafica_Utenti
			// 				// console.log("Error in Anagrafica_Utenti: ", error);
			// 				sap.ui.core.BusyIndicator.hide();
			// 			}.bind(this)
			// 		);

			// 		that.makeAjaxRequest(
			// 			sUrl + `Associazione_Commessa_Utente?$filter=ID_UTENTE_ID_UTENTE eq '${this.getUser[0].ID_UTENTE}'`,
			// 			function (data) {
			// 				// Handle success for Anagrafica_Utenti
			// 				that.assign = data.value;
			// 			}.bind(this),
			// 			function (error) {
			// 				// Handle error for Anagrafica_Utenti
			// 				// console.log("Error in Associazione_Commessa_Utente: ", error);
			// 				sap.ui.core.BusyIndicator.hide();
			// 			}.bind(this)
			// 		);
			// 	}, this)
			// );

			// for (var g = 0; g < this.getUser.length; g++) {
			// 	if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {


			// 		this.openDialogBusy(this._getLocalText("loadingPage"));

			// 		this.byId("luogospesa").setProperty('visible', true)
			// 		this.byId("vehicle").setProperty('visible', false)
			// 		this.byId("placeto").setProperty('visible', false)
			// 		this.byId("repayablekm").setProperty('visible', true)
			// 		this.byId("placefrom").setProperty('visible', false)
			// 		if (evt) {
			// 			var params = evt.getParameters();
			// 			this.dateTimesheet = params.arguments.date;
			// 			this.timesheetRecord = params.arguments.wbsId;
			// 			var timeshetDate = new Date(this.dateTimesheet);
			// 			this.timesheetCalendar.setStartDate(timeshetDate);
			// 			// this.timesheetCalendar.insertSelectedDate(timeshetDate);		
			// 		}
			// 		var mag = this.getView().getModel("expenseModel");
			// 		var that = this;
			// 		var firstDayOfMonth = this.timesheetCalendar.getStartDate();
			// 		this.actualYear = firstDayOfMonth.getFullYear();
			// 		this.actualMonth = firstDayOfMonth.getMonth() + 1;
			// 		var exspenseType = [];
			// 		jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
			// 			var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// 			that.makeAjaxRequest(sUrl + "ExpenseCategory", function (data) {
			// 				// Handle success for Anagrafica_Utenti
			// 				exspenseType = data.value;
			// 				that.expenseCategory = data.value;
			// 			}.bind(this), function (error) {
			// 				// Handle error for Anagrafica_Utenti
			// 				// console.log("Error in ExpenseCategory: ", error);
			// 				sap.ui.core.BusyIndicator.hide();
			// 			}.bind(this));
			// 		}, this));
			// 		var myData = [];
			// 		for (var i = 0; i < exspenseType.length; i++) {
			// 			var obj = {};
			// 			obj.DESCRIZIONE = exspenseType[i].Descrizione;
			// 			obj.ID_TIPO_SPESA = exspenseType[i].ID;
			// 			myData.push(obj);
			// 		}
			// 		this.legendColors = [];
			// 		var attivitaAssegnate = [];
			// 		for (var f = 0; f < this.assign.length; f++) {
			// 			attivitaAssegnate.push(this.assign[f].ID_ID);
			// 		}
			// 		var filter = attivitaAssegnate.map(function (num) {
			// 			return `ID eq '${num}'`;
			// 		}).join(" or ");
			// 		var that = this;
			// 		jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 			jQuery.proxy(function () {
			// 				var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// 				that.makeAjaxRequest(sUrl + `ActivityOnly?$filter=${filter}`, function (data) {
			// 					// Handle success for Anagrafica_Utenti
			// 					that.legendColors = data.value;
			// 				}.bind(this), function (error) {
			// 					// Handle error for Anagrafica_Utenti
			// 					// console.log("Error in ActivityOnly: ", error);
			// 					sap.ui.core.BusyIndicator.hide();
			// 				}.bind(this));
			// 			}, this)
			// 		);
			// 		this.legendaryColor = [];
			// 		for (let i = 0; i < this.legendColors.length; i++) {
			// 			var obj = {};
			// 			obj.activity = this.legendColors[i].Descrizione;
			// 			obj.color = this.arrayColori[i];
			// 			this.legendaryColor.push(obj);
			// 		}
			// 		mag.setProperty("/expenseType", myData);
			// 		var tab = this.getView().getModel("expenseModel");
			// 		var obj = {
			// 			DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
			// 		  };
			// 		var that = this;
			// 		jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
			// 			var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

			// 			that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}'`, function (data) {
			// 				// Handle success for Stato_Commessa
			// 				that.attivita = data.value;
			// 			}.bind(this), function (error) {
			// 				// Handle error for Stato_Commessa
			// 				// console.log("Error in ActivitySet: ", error);
			// 				sap.ui.core.BusyIndicator.hide();
			// 			}.bind(this));

			// 			that.makeAjaxRequest(sUrl + "RimborsoSet", function (data) {
			// 				// Handle success for ActivitySet
			// 				that.rimborsi = data.value;
			// 			}.bind(this), function (error) {
			// 				// Handle error for ActivitySet
			// 				// console.log("Error in RimborsoSet: ", error);
			// 				sap.ui.core.BusyIndicator.hide();
			// 			}.bind(this));
			// 			that.makeAjaxRequest(sUrl + "ExpenseCategory", function (data) {
			// 				// Handle success for ActivitySet
			// 				that.materiali = data.value;
			// 			}.bind(this), function (error) {
			// 				// Handle error for ActivitySet
			// 				// console.log("Error in ExpenseCategory: ", error);
			// 				sap.ui.core.BusyIndicator.hide();
			// 			}.bind(this));
			// 		}, this));
			// 		var spese = [];
			// 		for(var s = 0; s<this.attivita.length; s++){              
			// 		 spese.push(this.attivita[s].ID);
			// 		}
		
			// 		var filter = spese.map(function(num) {
			// 		  return `ACTIVITY_ID eq ${num}`;
			// 		}).join(" or ");
			// 		var that = this;
			// 		jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
			// 			var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// 			// Make the AJAX requests using the reusable function
			// 			that.makeAjaxRequest(sUrl + `TipoSpesaSet?$filter=${filter}`, function (data) {
			// 				// Handle success for Anagrafica_Utenti
			// 				that.spese = data.value;
			// 			}.bind(this), function (error) {
			// 				// Handle error for Anagrafica_Utenti
			// 				// console.log("Error in TipoSpesaSet: ", error);
			// 				sap.ui.core.BusyIndicator.hide();
			// 			}.bind(this));
			// 	}, this));

			// 		var table = [];
			// 		var getActivityId = this.attivita.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
			// 		var getActivity = getActivityId.filter((x) => x.DATA_ATTIVITA == this.dateTimesheet);
			// 		var getActitityCorrect = getActivity.filter((x) => x.ID == parseInt(this.timesheetRecord))
			// 		var getAllData = this.spese.filter((x) => x.ACTIVITY_ID == getActitityCorrect[0].ID)
			// 		for (var i = 0; i < getAllData.length; i++) {
			// 			var dati = {};
			// 			dati.id = getAllData[i].ID;
			// 			dati.descrizioneTipoSpesa = getAllData[i].TIPO_SPESA;
			// 			dati.importo = getAllData[i].SPESA;
			// 			dati.localita = getAllData[i].LOCALITA;
			// 			// dati.importoRimborsabile = rimborsi[y].IMPORTO;
			// 			dati.km = getAllData[i].KM;
			// 			dati.localitaA = getAllData[i].LOCALITA_PARTENZA;
			// 			dati.localitaB = getAllData[i].LOCALITA_ARRIVO;
			// 			dati.vehicleType = getAllData[i].TIPO_AUTO;
			// 			dati.nota = getAllData[i].SPESA_BUTTON;
			// 			table.push(dati);
			// 		}
			// 		tab.setProperty("/arrayExpense", table);
			// 		this.title = getActitityCorrect[0].DATA_ATTIVITA + " - " + getActitityCorrect[0].CODICE_COMMESSA + " - " + getActitityCorrect[0].NOTES;
			// 		tab.setProperty("/title", this.title);
			// 		this._setInputExpense();
			// 		this._setPage();
			// 		jQuery.sap.delayedCall(3000, this, function () {
			// 			this.setColors(this.actualYear, this.actualMonth);
			// 			this.closeDialogBusy();
			// 		})
			// 	}
			// }
			// }
			// else{
				//UTENTE IDGFAB
				var that = this;
				jQuery.when(this.oInitialLoadFinishedDeferred).then(
					jQuery.proxy(function () {
						var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
						that.makeAjaxRequest(
							sUrl + `Anagrafica_Utenti?$filter=EMAIL_UTENTE eq '${obj.EMAIL_UTENTE}'`,
							function (data) {
								// Handle success for Anagrafica_Utenti
								that.getUser = data.value;
							}.bind(this),
							function (error) {
								// Handle error for Anagrafica_Utenti
								// console.log("Error in Anagrafica_Utenti: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this)
						);
	
						that.makeAjaxRequest(
							sUrl + `Associazione_Commessa_Utente?$filter=ID_UTENTE_ID_UTENTE eq '${this.getUser[0].ID_UTENTE}'`,
							function (data) {
								// Handle success for Anagrafica_Utenti
								that.assign = data.value;
							}.bind(this),
							function (error) {
								// Handle error for Anagrafica_Utenti
								// console.log("Error in Associazione_Commessa_Utente: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this)
						);
					}, this)
				);
	
				for (var g = 0; g < this.getUser.length; g++) {
					if (this.getUser[g].EMAIL_UTENTE === email) {
	
	
						this.openDialogBusy(this._getLocalText("loadingPage"));
	
						this.byId("luogospesa").setProperty('visible', true)
						this.byId("vehicle").setProperty('visible', false)
						this.byId("placeto").setProperty('visible', false)
						this.byId("repayablekm").setProperty('visible', true)
						this.byId("placefrom").setProperty('visible', false)
						if (evt) {
							var params = evt.getParameters();
							this.dateTimesheet = params.arguments.date;
							this.timesheetRecord = params.arguments.wbsId;
							var timeshetDate = new Date(this.dateTimesheet);
							this.timesheetCalendar.setStartDate(timeshetDate);
							// this.timesheetCalendar.insertSelectedDate(timeshetDate);		
						}
						var mag = this.getView().getModel("expenseModel");
						var that = this;
						var firstDayOfMonth = this.timesheetCalendar.getStartDate();
						this.actualYear = firstDayOfMonth.getFullYear();
						this.actualMonth = firstDayOfMonth.getMonth() + 1;
						var exspenseType = [];
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
							that.makeAjaxRequest(sUrl + "ExpenseCategory", function (data) {
								// Handle success for Anagrafica_Utenti
								exspenseType = data.value;
								that.expenseCategory = data.value;
							}.bind(this), function (error) {
								// Handle error for Anagrafica_Utenti
								// console.log("Error in ExpenseCategory: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));
						var myData = [];
						for (var i = 0; i < exspenseType.length; i++) {
							var obj = {};
							obj.DESCRIZIONE = exspenseType[i].Descrizione;
							obj.ID_TIPO_SPESA = exspenseType[i].ID;
							myData.push(obj);
						}
						this.legendColors = [];
						var attivitaAssegnate = [];
						for (var f = 0; f < this.assign.length; f++) {
							attivitaAssegnate.push(this.assign[f].ID_ID);
						}
						var filter = attivitaAssegnate.map(function (num) {
							return `ID eq '${num}'`;
						}).join(" or ");
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(
							jQuery.proxy(function () {
								var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
								that.makeAjaxRequest(sUrl + `ActivityOnly?$filter=${filter}`, function (data) {
									// Handle success for Anagrafica_Utenti
									that.legendColors = data.value;
								}.bind(this), function (error) {
									// Handle error for Anagrafica_Utenti
									// console.log("Error in ActivityOnly: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
							}, this)
						);
						mag.setProperty("/expenseType", myData);
						var tab = this.getView().getModel("expenseModel");
						var obj = {
							DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
						  };   
						  var startDate = formatter.getFirstDayFromMonth(
							this.actualYear,
							this.actualMonth - 1
						  );
						  var endDate = formatter.getLastDayFromMonth(
							this.actualYear,
							this.actualMonth
						  );
						  var targetDateFormat =
							sap.ui.core.format.DateFormat.getDateInstance({
							  pattern: "yyyy-MM-dd",
							});
						  // Format the date to the desired output format
						  var startDateString = targetDateFormat.format(new Date(startDate));
						  var endDateString = targetDateFormat.format(new Date(endDate));
						  var leg = this.getView().getModel("legendModel");
						  this.legendActivity = [];
						  this.activitySet = [];
						  var that = this;
			
			
			
						  var annoinizio = parseFloat(startDateString);
						  var meseinizio = parseFloat(startDateString[5] + startDateString[6]);
						  var gironoinizio = parseFloat(startDateString[8] + startDateString[9]);
			
						  var annofine = parseFloat(endDateString);
						  var mesefine = parseFloat(endDateString[5] + endDateString[6]);
						  var gironofine = parseFloat(endDateString[8] + endDateString[9]);

						  if(mesefine <= 9){
							var that = this;
							jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
								var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
		
								that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' + mesefine + '-' + gironofine}`, function (data) {
									// Handle success for Stato_Commessa
									that.attivita = data.value;
								}.bind(this), function (error) {
									// Handle error for Stato_Commessa
									// console.log("Error in ActivitySet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
		
								that.makeAjaxRequest(sUrl + "RimborsoSet", function (data) {
									// Handle success for ActivitySet
									that.rimborsi = data.value;
								}.bind(this), function (error) {
									// Handle error for ActivitySet
									// console.log("Error in RimborsoSet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
								that.makeAjaxRequest(sUrl + "ExpenseCategory", function (data) {
									// Handle success for ActivitySet
									that.materiali = data.value;
								}.bind(this), function (error) {
									// Handle error for ActivitySet
									// console.log("Error in ExpenseCategory: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
							}, this));
						  }else {
							var that = this;
							jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
								var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
		
								that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + gironofine}`, function (data) {
									// Handle success for Stato_Commessa
									that.attivita = data.value;
								}.bind(this), function (error) {
									// Handle error for Stato_Commessa
									// console.log("Error in ActivitySet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
		
								that.makeAjaxRequest(sUrl + "RimborsoSet", function (data) {
									// Handle success for ActivitySet
									that.rimborsi = data.value;
								}.bind(this), function (error) {
									// Handle error for ActivitySet
									// console.log("Error in RimborsoSet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
								that.makeAjaxRequest(sUrl + "ExpenseCategory", function (data) {
									// Handle success for ActivitySet
									that.materiali = data.value;
								}.bind(this), function (error) {
									// Handle error for ActivitySet
									// console.log("Error in ExpenseCategory: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
							}, this));				   
						  }
						  this.legendaryColor = [];
						  var arrayForLegend = this.removeDupl(
							this.attivita,
							"CODICE_COMMESSA"
						  );
						  for (let i = 0; i < arrayForLegend.length; i++) {
							var obj = {};
							obj.activity = arrayForLegend[i].CODICE_COMMESSA;
							obj.color = this.arrayColori[i];
							this.legendaryColor.push(obj);
						  }
			
					
						var spese = [];
						for(var s = 0; s<this.attivita.length; s++){              
						 spese.push(this.attivita[s].ID);
						}
			
						var filter = spese.map(function(num) {
						  return `ACTIVITY_ID eq ${num}`;
						}).join(" or ");
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
							// Make the AJAX requests using the reusable function
							that.makeAjaxRequest(sUrl + `TipoSpesaSet?$filter=${filter}`, function (data) {
								// Handle success for Anagrafica_Utenti
								that.spese = data.value;
							}.bind(this), function (error) {
								// Handle error for Anagrafica_Utenti
								// console.log("Error in TipoSpesaSet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
					}, this));
	
						var table = [];
						var getActivityId = this.attivita.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
						var getActivity = getActivityId.filter((x) => x.DATA_ATTIVITA == this.dateTimesheet);
						var getActitityCorrect = getActivity.filter((x) => x.ID == parseInt(this.timesheetRecord))
						var getAllData = this.spese.filter((x) => x.ACTIVITY_ID == getActitityCorrect[0].ID)
						for (var i = 0; i < getAllData.length; i++) {
							var dati = {};
							dati.id = getAllData[i].ID;
							dati.descrizioneTipoSpesa = getAllData[i].TIPO_SPESA;
							dati.importo = getAllData[i].SPESA;
							dati.localita = getAllData[i].LOCALITA;
							// dati.importoRimborsabile = rimborsi[y].IMPORTO;
							dati.km = getAllData[i].KM;
							dati.localitaA = getAllData[i].LOCALITA_PARTENZA;
							dati.localitaB = getAllData[i].LOCALITA_ARRIVO;
							dati.vehicleType = getAllData[i].TIPO_AUTO;
							dati.nota = getAllData[i].SPESA_BUTTON;
							table.push(dati);
						}
						tab.setProperty("/arrayExpense", table);
						this.title = getActitityCorrect[0].DATA_ATTIVITA + " - " + getActitityCorrect[0].CODICE_COMMESSA + " - " + getActitityCorrect[0].NOTES;
						tab.setProperty("/title", this.title);
						this._setInputExpense();
						this._setPage();
						jQuery.sap.delayedCall(3000, this, function () {
							this.setColors(this.actualYear, this.actualMonth);
							this.closeDialogBusy();
						})
					}
				}
			// }
			

		},
		makeAjaxRequest: function (url, successCallback, errorCallback) {
			jQuery.ajax({
				url: url,
				dataType: 'json',
				success: function (data) {
					if (typeof successCallback === 'function') {
						successCallback(data);
					}
				},
				error: function (error) {
					if (typeof errorCallback === 'function') {
						errorCallback(error);
					}
				},
				async: false
			});
		},
		_setInputExpense: function () {

			this.expenseModel.setProperty("/title", this.title);
			this.expenseModel.setProperty("/index", 0);
			this.expenseModel.refresh();
			this.expenseToSaveModel.setProperty("/expenseCategory", 1);
			this.expenseToSaveModel.setProperty("/amount", "");
			// this.expenseToSaveModel.setProperty("/currency", "EUR");
			this.expenseToSaveModel.setProperty("/currency", "");
			this.expenseToSaveModel.setProperty("/km", "");
			this.expenseToSaveModel.setProperty("/placeFrom", "");
			this.expenseToSaveModel.setProperty("/placeTo", "");
			this.expenseToSaveModel.setProperty("/place", "");
			// var vehicles = this.getModel("userModel").getProperty("/userDetail").veicoli;
			// tengo in this.vehicleType il tipo veicolo di default dell'utente
			// this.vehicleType = this.getModel("userModel").getProperty("/userDetail").tipoVeicolo;
			// if (vehicles.length) {
			// 	var vehicle = _.find(vehicles, function (n) {
			// 		return new Date(n.dataInizio) < this.selectedDate && this.selectedDate < new Date(n.dataFine);
			// 	}.bind(this));
			// 	if (vehicle) {
			// 		this.vehicleType = vehicle.tipoVeicolo;
			// 	}
			// }
			this.expenseToSaveModel.setProperty("/vehicleType", ""); // da user
			this.expenseToSaveModel.setProperty("/note", "");
			this.expenseToSaveModel.refresh();
		},

		// reset dei bottoni
		_setButtonInitial: function () {
			// this.uiModel.setProperty("/expenseAdd", false);
			// this.uiModel.setProperty("/expenseSave", false);
			// this.uiModel.setProperty("/expenseCancel", false);
			// this.uiModel.setProperty("/expenseDelete", false);
			// this.uiModel.setProperty("/expenseDuplicate", false);
			// this.uiModel.setProperty("/backButton", false);
			// this.uiModel.setProperty("/forwardButton", false);
			// var timesheetByDate = this.timesheetModel.getProperty("/timesheetByDate");
			// var expenseFormEnabled = false;
			// if (timesheetByDate && this.index !== undefined) {
			// 	// entro qui dentro se ho cliccato il bottone 'CANCELLA' dopo aver aperto il dettaglio della spesa
			// 	var transfer = timesheetByDate[this.index].transfer;
			// 	if (transfer && transfer.statoApprovazione === "DA_APPROVARE") {
			// 		expenseFormEnabled = true;
			// 	}
			// }
			// this.uiModel.setProperty("/expenseFormEnabled", expenseFormEnabled);
			// if (this.vehicles) {
			// 	this.expenseModel.setProperty("/vehicleType", this.vehicles);
			// }
		},

		_setPage: function () {

			// this.openDialogBusy(this._getLocalText("loadingPage"));
			this._setInputExpense();
			// this._setButtonInitial();
			// this._getExpenseType();
			// this.arrayExpensesSelected = [];
			// this._getById("idTableExpenses").removeSelections();
		},

		// funzione per la lettura dei tipi spesa
		_getExpenseType: function () {
			var user = this.getModel("userModel").getProperty("/userDetail");

			this.arrayParams = [];
			for (var i = 0; i < user.persWork.length; i++) {
				var param = {
					"CHIAVE_TRASFERTA": user.persWork[i].chiaveTrasferta
				};
				if (!StorageService.sessionGet("expensesTypes@" + param.CHIAVE_TRASFERTA)) {
					this.arrayParams.push(param);
				}
			}
			this._batchTipoSpese(-1);
		},
		setColors: function (aYear, aMonth) {
			// this._expenseMatched();
			var userInfo = sap.ushell.Container.getService('UserInfo')
			var email = userInfo.getEmail();
			this.getUser = [];
			var that = this;
		
			// this.oDate = null;
	
			//UTENTE TECHNIS
			// if (this.oDate != null && this.oDate != "") {
			//   var name = this.oDate.NOME_UTENTE;
			//   var surname = this.oDate.COGNOME_UTENTE;
			//   jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 	jQuery.proxy(function () {
			// 		var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// 		that.makeAjaxRequest(sUrl +  `Anagrafica_Utenti?$filter=COGNOME_UTENTE eq '${surname}' and NOME_UTENTE eq '${name}'`, function (data) {
			// 			// Handle success for Anagrafica_Utenti
			// 			this.getUser = data.value;
			// 		}.bind(this), function (error) {
			// 			// Handle error for Anagrafica_Utenti
			// 			// console.log("Error in Anagrafica_Utenti: ", error);
			// 			sap.ui.core.BusyIndicator.hide();
			// 		}.bind(this));
			// 	}, this)
			// );

			// for (var g = 0; g < this.getUser.length; g++) {
			// 	if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
			// 		var startDate = 0;
			// 		var endDate = 7;
			// 		this.colorData = {};
			// 		// var getSelected = this.legendModel.getProperty("/wbs");
			// 		// var getAllSelected = getSelected.filter((item) => item.select === true);
			// 		var getActivityId = this.attivita.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
			// 		for (var i = startDate; i < endDate; i++) {
			// 			// i = i < 10 ? "0" + i : i.toString();
			// 			// var actualMonth = aMonth < 10 ? "0" + aMonth : aMonth.toString();
			// 			// var dataSelected = aYear + "-" + actualMonth + "-" + i;
			// 			var nextDay = new Date(this.timesheetCalendar.getStartDate());
			// 			nextDay.setDate(nextDay.getDate() + i);
			// 			var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
			// 				pattern: "yyyy-MM-dd",
			// 			});
			// 			var dataSelected = targetDateFormat.format(nextDay);
			// 			var getFilteredData = getActivityId.filter(
			// 				(x) => x.DATA_ATTIVITA === dataSelected
			// 			);
			// 			let colors = "";
			// 			let check = 0;
			// 			let col = 4;
			// 			var removeDuplicates = this.removeDupl(getFilteredData, 'CODICE_COMMESSA');

			// 			for (let j = 0; j < removeDuplicates.length; j++) {
			// 				var getChecked = this.legendaryColor.filter(
			// 					(obj) => obj.activity === removeDuplicates[j].CODICE_COMMESSA
			// 				);
			// 				if (check == 0 && getChecked.length > 0) {
			// 					check = 1;
			// 					colors += `inset 4px 0rem 0 ${getChecked[0].color}`;
			// 				} else if (check > 0) {
			// 					col = col + 4;
			// 					colors += ` , inset ${col}px 0rem 0 ${getChecked[0].color}`;
			// 				}
			// 			}
			// 			check = 0;
			// 			col = 0;
			// 			this.colorData[dataSelected] = colors;
			// 		}
			// 		this.updateCalendarColors(startDate, endDate, aMonth, aYear);
			// 	}
			// }
			// }
			// else{
				//UTENTE IDGFAB
				var obj = {
					EMAIL_UTENTE: email
				  };
				jQuery.when(this.oInitialLoadFinishedDeferred).then(
					jQuery.proxy(function () {
						var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
						that.makeAjaxRequest(sUrl + `Anagrafica_Utenti?$filter=EMAIL_UTENTE eq '${obj.EMAIL_UTENTE}'`, function (data) {
							// Handle success for Anagrafica_Utenti
							this.getUser = data.value;
						}.bind(this), function (error) {
							// Handle error for Anagrafica_Utenti
							// console.log("Error in Anagrafica_Utenti: ", error);
							sap.ui.core.BusyIndicator.hide();
						}.bind(this));
					}, this)
				);
	
				for (var g = 0; g < this.getUser.length; g++) {
					if (this.getUser[g].EMAIL_UTENTE === email) {
						var startDate = 0;
						var endDate = 7;
						this.colorData = {};
						// var getSelected = this.legendModel.getProperty("/wbs");
						// var getAllSelected = getSelected.filter((item) => item.select === true);
						var getActivityId = this.attivita.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
						for (var i = startDate; i < endDate; i++) {
							// i = i < 10 ? "0" + i : i.toString();
							// var actualMonth = aMonth < 10 ? "0" + aMonth : aMonth.toString();
							// var dataSelected = aYear + "-" + actualMonth + "-" + i;
							var nextDay = new Date(this.timesheetCalendar.getStartDate());
							nextDay.setDate(nextDay.getDate() + i);
							var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
								pattern: "yyyy-MM-dd",
							});
							var dataSelected = targetDateFormat.format(nextDay);
							var getFilteredData = getActivityId.filter(
								(x) => x.DATA_ATTIVITA === dataSelected
							);
							let colors = "";
							let check = 0;
							let col = 4;
							var removeDuplicates = this.removeDupl(getFilteredData, 'CODICE_COMMESSA');
	
							for (let j = 0; j < removeDuplicates.length; j++) {
								var getChecked = this.legendaryColor.filter(
									(obj) => obj.activity === removeDuplicates[j].CODICE_COMMESSA
								);
								if (check == 0 && getChecked.length > 0) {
									check = 1;
									colors += `inset 4px 0rem 0 ${getChecked[0].color}`;
								} else if (check > 0) {
									col = col + 4;
									colors += ` , inset ${col}px 0rem 0 ${getChecked[0].color}`;
								}
							}
							check = 0;
							col = 0;
							this.colorData[dataSelected] = colors;
						}
						this.updateCalendarColors(startDate, endDate, aMonth, aYear);
					}
				}
			// }
			
		},

		updateCalendarColors: function (startDate, endDate, aMonth, aYear) {
			var startDate = 0;
			var endDate = 7;

			for (var i = startDate; i < endDate; i++) {
				var nextDay = new Date(this.timesheetCalendar.getStartDate());
				nextDay.setDate(nextDay.getDate() + i);
				var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "yyyy-MM-dd",
				});

				var dataSelected = targetDateFormat.format(nextDay);
				var calendarDay = dataSelected.replace(/-/g, '');
				var selectedDate = $('[id$="idExpenseCalendar--Month0-' + calendarDay + '"]')[0];

				// Retrieve the colors for this date from this.colorData or your color array
				var colors = this.colorData[dataSelected];

				// Apply the colors to the date element
				selectedDate.style.boxShadow = colors;
			}
		},
		removeDupl: function (arr, key) {
			const seen = new Set();
			return arr.filter((item) => {
				const value = item[key];
				if (!seen.has(value)) {
					seen.add(value);
					return true;
				}
				return false;
			});
		},
		// chiamata in batch se l'utente ha piu società
		_batchTipoSpese: function (i) {
			i++;
			if (this.arrayParams[i]) {
				var url = "/TipoSpesaSet";
				/* var filter = "?$filter=CHIAVE_TRASFERTA eq '" + this.arrayParams[i].CHIAVE_TRASFERTA;
				if (this.getView().getModel("userModel").getProperty("/workingInAdmin")) {
					filter = filter + "' and (VISIBILITA eq 'INT' or VISIBILITA eq 'AMM')";
				} else {
					filter = filter + "' and VISIBILITA eq 'INT'";
				} */
				var filter = "?CHIAVE_TRASFERTA=" + this.arrayParams[i].CHIAVE_TRASFERTA + "&VISIBILITA=INT";
				if (this.getView().getModel("userModel").getProperty("/workingInAdmin")) {
					filter += "&VISIBILITA=AMM";
				}
				var fSuccess = function (result) {
					var res = _.sortBy(result.results, "DESCRIZIONE");
					if (this.getView().getModel("userModel").getProperty("/workingInAdmin")) {
						for (var y = 0; y < res.length; y++) {
							res[y].DESCRIZIONE = res[y].DESCRIZIONE + " (" + res[y].VISIBILITA + ")";
						}
					}
					StorageService.sessionSave("expensesTypes@" + this.arrayParams[i].CHIAVE_TRASFERTA, res);
					this._batchTipoSpese(i);
				}.bind(this);
				var fError = function (err) {
					// window.console.log(err);
					MessageBox.error("Select a team in the \"Development\" area.\n\"Marketing\" isn't assigned to this area.");
				};
				//var urlComplete = url + filter;
				oData.getTimeTravelServices(url, filter, fSuccess, fError);
			} else {
				// fine
				this._getVehicleType();
			}
		},

		// funzione per lettura dei tipi veicoli
		_getVehicleType: function () {
			var fSuccess = function (result) {
				var vehicles = _.sortBy(result.results, "DESCRIZIONE");
				StorageService.sessionSave("vehicleType", vehicles);
				this.vehicles = vehicles;
				this.expenseModel.setProperty("/vehicleType", vehicles);
				this._getTimesheet(this.startDate, this.endDate);
			}.bind(this);

			var fError = function (err) {
				// console.log(err);
			};

			var url = "/TipoVeicoloSet";
			oData.getTimeTravelServices(url, '', fSuccess, fError);
		},

		_afterGetPeriods: function () {
			this._setDayFull();
		},

		_setPeriodsModel: function () {
			var periodsModel = this.getView().getModel("periodsModel");
			var expense = false;
			var periodsByDate = this._getPeriodsByDate(new Date(this.selectedDate.setHours(12)));
			expense = periodsByDate.expense;
			// periodsModel.setProperty("/expense", expense);
		},

		// funzione per la colorazione delle giornate con attività
		_setDayFull: function () {
			var monthStartDate, monthEndDate, startDate, endDate, fullYear;
			if (this.dialogDuplicateExpense && this.dialogDuplicateExpense.isOpen()) {
				// gestire calendario
				var firstDay = new Date(this.startDateDuplicate);
				var lastDay = new Date(this.endDateDuplicate);
				monthStartDate = firstDay.getMonth();
				monthEndDate = lastDay.getMonth();
				startDate = firstDay.getDate();
				endDate = lastDay.getDate();
				fullYear = firstDay.getFullYear();
				_.remove(this.timesheetModel.getProperty("/timesheet"), function (item) {
					if (item.transfer !== "" && item.transfer.statoApprovazione !== "DA_APPROVARE") {
						return item;
					}
				});
			} else {
				monthStartDate = this.startDateJavascript.getMonth();
				monthEndDate = this.endDateJavascript.getMonth();
				startDate = this.startDateJavascript.getDate();
				endDate = this.endDateJavascript.getDate();
				fullYear = this.startDateJavascript.getFullYear();
				this.arrayExpensesSelected = [];
				this._getById("idTableExpenses").removeSelections();
			}
			var timesheet = _.cloneDeep(this.timesheetModel.getProperty("/timesheet"));
			var actualMonth;
			if (monthStartDate === monthEndDate) {
				for (var i = startDate; i < endDate + 1; i++) {
					i = i < 10 ? "0" + i : i.toString();
					if (monthStartDate + 1 < 10) {
						actualMonth = "0" + (monthStartDate + 1);
					} else {
						actualMonth = (monthStartDate + 1).toString();
					}
					var data = fullYear + "" + actualMonth + "" + i;
					if (this.dialogDuplicateExpense && this.dialogDuplicateExpense.isOpen()) {
						$("[id$='idCalendarDuplicateExpense--Month0-" + data + "']")[0].style.boxShadow = "none";
						$("[id$='idCalendarDuplicateExpense--Month0-" + data + "']")[0].style.backgroundColor = "";
					} else {
						$("[id$='idExpenseCalendar--Month0-" + data + "']")[0].style.boxShadow = "none";
						$("[id$='idExpenseCalendar--Month0-" + data + "']")[0].style.backgroundColor = "";
					}
				}
			} else {
				var endDateFirstMonth = new Date(formatter.getLastDayFromMonth(this.startDateJavascript.getFullYear(), this.startDateJavascript.getMonth() +
					1)).getDate();
				for (i = startDate; i < endDateFirstMonth + 1; i++) {
					if (i < 10) {
						i = "0" + i;
					} else {
						i = i.toString();
					}
					if ((this.startDateJavascript.getMonth() + 1) < 10) {
						actualMonth = "0" + (this.startDateJavascript.getMonth() + 1);
					} else {
						actualMonth = (this.startDateJavascript.getMonth() + 1).toString();
					}
					data = this.startDateJavascript.getFullYear() + "" + actualMonth + "" + i;
					$("[id$='idExpenseCalendar--Month0-" + data + "']")[0].style.boxShadow = "none";
					$("[id$='idExpenseCalendar--Month0-" + data + "']")[0].style.backgroundColor = "";
				}
				var startDateSecondMonth = new Date(formatter.getFirstDayFromMonth(this.endDateJavascript.getFullYear(), this.endDateJavascript.getMonth()))
					.getDate();
				for (i = startDateSecondMonth; i < endDate + 1; i++) {
					if (i < 10) {
						i = "0" + i;
					} else {
						i = i.toString();
					}
					if ((this.endDateJavascript.getMonth() + 1) < 10) {
						actualMonth = "0" + (this.endDateJavascript.getMonth() + 1);
					} else {
						actualMonth = (this.endDateJavascript.getMonth() + 1).toString();
					}
					data = this.endDateJavascript.getFullYear() + "" + actualMonth + "" + i;
					$("[id$='idExpenseCalendar--Month0-" + data + "']")[0].style.boxShadow = "none";
					$("[id$='idExpenseCalendar--Month0-" + data + "']")[0].style.backgroundColor = "";
				}
			}

			if (timesheet) {
				var timesheetByDate = _.groupBy(timesheet, function (n) {
					return n.workDate;
				});

				for (var x in timesheetByDate) {
					var timesheetForDay = _.orderBy(timesheetByDate[x], "descriptionWbs", "desc");
					var splitDate = timesheetForDay[0].workDate.split("/");
					var date = splitDate[2] + "" + splitDate[1] + "" + splitDate[0];
					var selectedDay = this.dialogDuplicateExpense && this.dialogDuplicateExpense.isOpen() ? $(
						"[id$='idCalendarDuplicateExpense--Month0-" + date + "']")[0] : $("[id$='idExpenseCalendar--Month0-" + date + "']")[0];
					var depth = 4;
					var arrayString = [];
					var string = "";
					var extra = [];
					for (var y = timesheetForDay.length; y > 0; y--) {
						if (timesheetForDay[y - 1].color === undefined) {
							timesheetForDay[y - 1].color = "#000000";
						}
						if (timesheetForDay.length > 1) {
							if (y !== timesheetForDay.length) {
								arrayString.push("inset " + (depth * (timesheetForDay.length - y) + 2 + (extra.length * 2)) + "px 0rem 0 #FFFFFF");
								extra.push(y);
							}
						}
						arrayString.push("inset " + (depth * (timesheetForDay.length - y) + depth + (extra.length * 2)) + "px 0rem 0 " +
							timesheetForDay[y - 1].color);
					}
					for (i = 0; i < arrayString.length; i++) {
						string = string + ", " + arrayString[i];
					}
					if (selectedDay) {
						selectedDay.style.boxShadow = string.substr(2, string.length);
					}
				}
			}
			this._workDay();
			if (this.rechargeExpenses) {
				delete (this.rechargeExpenses);
				this.updateTable(this.selectedDate, false, 0);
			}
			this.closeDialogBusy();
		},

		// funzione per colorare i giorni festivi
		_workDay: function () {
			var monthStartDate, monthEndDate, startDate, endDate, fullYear;
			if (this.dialogDuplicateExpense && this.dialogDuplicateExpense.isOpen()) {
				// gestire calendario
				var firstDay = new Date(this.startDateDuplicate);
				var lastDay = new Date(this.endDateDuplicate);
				monthStartDate = firstDay.getMonth();
				monthEndDate = lastDay.getMonth();
				startDate = firstDay.getDate();
				endDate = lastDay.getDate();
				fullYear = firstDay.getFullYear();
			} else {
				monthStartDate = this.startDateJavascript.getMonth();
				monthEndDate = this.endDateJavascript.getMonth();
				startDate = this.startDateJavascript.getDate();
				endDate = this.endDateJavascript.getDate();
				fullYear = this.startDateJavascript.getFullYear();
			}
			var festivityArray = this._calcolaArrayFestivita(fullYear);
			var actualMonth;
			if (monthStartDate === monthEndDate) {
				for (var i = startDate; i <= endDate; i++) {
					i = i < 10 ? "0" + i : i.toString();
					if (monthStartDate + 1 < 10) {
						actualMonth = "0" + (monthStartDate + 1);
					} else {
						actualMonth = (monthStartDate + 1).toString();
					}
					var day = fullYear + "" + actualMonth + "" + i;
					if (festivityArray[actualMonth]) {
						for (var k = 0; k < festivityArray[actualMonth].length; k++) {
							if (i === festivityArray[actualMonth][k]) {
								var id;
								if (this.dialogDuplicateExpense && this.dialogDuplicateExpense.isOpen()) {
									id = $("[id$='idCalendarDuplicateExpense--Month0-" + day + "']")[0].id;
								} else {
									id = $("[id$='idExpenseCalendar--Month0-" + day + "']")[0].id;
								}
								$("#" + id).addClass("sapUiCalItemWeekEnd");
							}
						}
					}
				}
			} else {
				var endDateFirstMonth = new Date(formatter.getLastDayFromMonth(this.startDateJavascript.getFullYear(), this.startDateJavascript.getMonth() +
					1)).getDate();
				for (i = startDate; i < endDateFirstMonth + 1; i++) {
					i = i < 10 ? "0" + i : i.toString();
					if ((this.startDateJavascript.getMonth() + 1) < 10) {
						actualMonth = "0" + (this.startDateJavascript.getMonth() + 1);
					} else {
						actualMonth = (this.startDateJavascript.getMonth() + 1).toString();
					}
					day = this.startDateJavascript.getFullYear() + "" + actualMonth + "" + i;
					if (festivityArray[actualMonth]) {
						for (k = 0; k < festivityArray[actualMonth].length; k++) {
							if (i === festivityArray[actualMonth][k]) {
								id = $("[id$='idExpenseCalendar--Month0-" + day + "']")[0].id;
								$("#" + id).addClass("sapUiCalItemWeekEnd");
							}
						}
					}
				}

				var startDateSecondMonth = new Date(formatter.getFirstDayFromMonth(this.endDateJavascript.getFullYear(), this.endDateJavascript.getMonth()))
					.getDate();
				for (i = startDateSecondMonth; i < endDate + 1; i++) {
					i = i < 10 ? "0" + i : i.toString();
					if ((this.endDateJavascript.getMonth() + 1) < 10) {
						actualMonth = "0" + (this.endDateJavascript.getMonth() + 1);
					} else {
						actualMonth = (this.endDateJavascript.getMonth() + 1).toString();
					}
					day = this.endDateJavascript.getFullYear() + "" + actualMonth + "" + i;
					if (festivityArray[actualMonth]) {
						for (k = 0; k < festivityArray[actualMonth].length; k++) {
							if (i === festivityArray[actualMonth][k]) {
								id = $("[id$='idExpenseCalendar--Month0-" + day + "']")[0].id;
								$("#" + id).addClass("sapUiCalItemWeekEnd");
							}
						}
					}
				}
			}
			if (this._getById("idExpenseCalendar").getSelectedDates().length && (!this.dialogDuplicateExpense || !this.dialogDuplicateExpense
				.isOpen())) {
				this.updateTable(this._getById("idExpenseCalendar").getSelectedDates()[0].getStartDate(), this.fromTimesheet);
			} else if (this.dialogDuplicateExpense && this.dialogDuplicateExpense.isOpen()) {
				this.closeDialogBusy();
			} else {
				this._setInputExpense();
				this._setButtonInitial();
			}
			this.fromTimesheet = false;
			this._startFocusSituasion();
		},

		// funzione lanciata al cambio della settimana
		_changeWeek: function (evt) {
			var src = evt.getSource();
			this.startDateJavascript = src.getStartDate();
			var endDateJvascript = new Date();
			this.endDateJavascript = new Date(endDateJvascript.setTime(src.getStartDate().getTime() + (1000 * 60 * 60 * 24 * 6)));
			this.startDate = formatter.getDayFormatTimesheet(src.getStartDate());
			this.endDate = formatter.getDayFormatTimesheet(this.endDateJavascript);
			this._getById("idExpenseCalendar").removeAllSelectedDates();
			// aggiungo la variabile title per poi ri-settarlo perché il metodo '_setInputExpense' lo pulisce
			// var title = this.expenseModel.getProperty("/title");
			this._setPage();
			// this._navigationTimesheet();
			jQuery.sap.delayedCall(100, this, function () {

				var obj = {
					DESCRIZIONE_BUTTON : this.getUser[0].ID_UTENTE.toString()
				  };   
				  var targetDateFormat =
					sap.ui.core.format.DateFormat.getDateInstance({
					  pattern: "yyyy-MM-dd",
					});
				  // Format the date to the desired output format
				  var startDateString = targetDateFormat.format(new Date(this.startDate));
				  var endDateString = targetDateFormat.format(new Date(this.endDate));
				  var that = this;
	
	
	
				  var annoinizio = parseFloat(startDateString);
				  var meseinizio = parseFloat(startDateString[5] + startDateString[6]);
				  var gironoinizio = parseFloat(startDateString[8] + startDateString[9]);
	
				  var annofine = parseFloat(endDateString);
				  var mesefine = parseFloat(endDateString[5] + endDateString[6]);
				  var gironofine = parseFloat(endDateString[8] + endDateString[9]);

				//   if(meseinizio <= 9 && mesefine ){
				// 	var that = this;
				// 	jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
				// 		var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

				// 		that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' + mesefine + '-' + gironofine}`, function (data) {
				// 			// Handle success for Stato_Commessa
				// 			that.attivita = data.value;
				// 		}.bind(this), function (error) {
				// 			// Handle error for Stato_Commessa
				// 			// console.log("Error in ActivitySet: ", error);
				// 			sap.ui.core.BusyIndicator.hide();
				// 		}.bind(this));
				// 	}, this));
				//   }else {
				// 	var that = this;
				// 	jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
				// 		var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

				// 		that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + gironofine}`, function (data) {
				// 			// Handle success for Stato_Commessa
				// 			that.attivita = data.value;
				// 		}.bind(this), function (error) {
				// 			// Handle error for Stato_Commessa
				// 			// console.log("Error in ActivitySet: ", error);
				// 			sap.ui.core.BusyIndicator.hide();
				// 		}.bind(this));
				// 	}, this));				   
				//   }



				  if(meseinizio <= 9 && mesefine <= 9){
					//AGGIUNGI 0 MESE INIZIO
					//AGGIUNGI 0 MESE FINE
					if(gironoinizio <= 9 && gironofine <= 9){
						//AGGIUNGI 0 GIORNO INIZIO
						//AGGIUNGI 0 GIORNO FINE
						var that = this;
					jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
						var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

						that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + '0' + gironofine}`, function (data) {
							// Handle success for Stato_Commessa
							that.attivita = data.value;
						}.bind(this), function (error) {
							// Handle error for Stato_Commessa
							// console.log("Error in ActivitySet: ", error);
							sap.ui.core.BusyIndicator.hide();
						}.bind(this));
					}, this));	
					}else if (gironoinizio <= 9 && gironofine >= 10){
						//AGGIUNGI 0 GIORNO INIZIO
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}else if (gironoinizio >= 10 && gironofine <= 9){
						//AGGIUNGI 0 GIORNO FINE
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + '0' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}else if (gironoinizio >= 10 && gironofine >= 10){
						//NON AGGIUNGERE NULLA SUI GIORNI
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}
				  }	else if(meseinizio <= 9 && mesefine >= 10)
				  {
						//AGGIUNGI 0 MESE INIZIO
						if(gironoinizio <= 9 && gironofine <= 9){
							//AGGIUNGI 0 GIORNO INIZIO
							//AGGIUNGI 0 GIORNO FINE
							var that = this;
							jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
								var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
		
								that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + '0' + gironofine}`, function (data) {
									// Handle success for Stato_Commessa
									that.attivita = data.value;
								}.bind(this), function (error) {
									// Handle error for Stato_Commessa
									// console.log("Error in ActivitySet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
							}, this));	
						}else if (gironoinizio <= 9 && gironofine >= 10){
							//AGGIUNGI 0 GIORNO INIZIO
							var that = this;
							jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
								var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
		
								that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + gironofine}`, function (data) {
									// Handle success for Stato_Commessa
									that.attivita = data.value;
								}.bind(this), function (error) {
									// Handle error for Stato_Commessa
									// console.log("Error in ActivitySet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
							}, this));	
						}else if (gironoinizio >= 10 && gironofine <= 9){
							//AGGIUNGI 0 GIORNO FINE
							var that = this;
							jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
								var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
		
								that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + '0' + gironofine}`, function (data) {
									// Handle success for Stato_Commessa
									that.attivita = data.value;
								}.bind(this), function (error) {
									// Handle error for Stato_Commessa
									// console.log("Error in ActivitySet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
							}, this));	
						}else if (gironoinizio >= 10 && gironofine >= 10){
							//NON AGGIUNGERE NULLA SUI GIORNI
							var that = this;
							jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
								var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
		
								that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + gironofine}`, function (data) {
									// Handle success for Stato_Commessa
									that.attivita = data.value;
								}.bind(this), function (error) {
									// Handle error for Stato_Commessa
									// console.log("Error in ActivitySet: ", error);
									sap.ui.core.BusyIndicator.hide();
								}.bind(this));
							}, this));	
						}
				  }	else if(meseinizio >= 10 && mesefine <= 9){
					//AGGIUNGI 0 MESE FINE
					if(gironoinizio <= 9 && gironofine <= 9){
						//AGGIUNGI 0 GIORNO INIZIO
						//AGGIUNGI 0 GIORNO FINE
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + '0' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}else if (gironoinizio <= 9 && gironofine >= 10){
						//AGGIUNGI 0 GIORNO INIZIO
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));
					}else if (gironoinizio >= 10 && gironofine <= 9){
						//AGGIUNGI 0 GIORNO FINE
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + '0' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));
					}else if (gironoinizio >= 10 && gironofine >= 10){
						//NON AGGIUNGERE NULLA SUI GIORNI
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));
					}
				  }else if (meseinizio >= 10 && mesefine >= 10){
					//NON AAGGIUNGERE NULLA SUI MESI
					if(gironoinizio <= 9 && gironofine <= 9){
						//AGGIUNGI 0 GIORNO INIZIO
						//AGGIUNGI 0 GIORNO FINE
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + '0' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}else if (gironoinizio <= 9 && gironofine >= 10){
						//AGGIUNGI 0 GIORNO INIZIO
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}else if (gironoinizio >= 10 && gironofine <= 9){
						//AGGIUNGI 0 GIORNO FINE
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + '0' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}else if (gironoinizio >= 10 && gironofine >= 10){
						//NON AGGIUNGERE NULLA SUI GIORNI
						var that = this;
						jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	
							that.makeAjaxRequest(sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' +  mesefine + '-' + gironofine}`, function (data) {
								// Handle success for Stato_Commessa
								that.attivita = data.value;
							}.bind(this), function (error) {
								// Handle error for Stato_Commessa
								// console.log("Error in ActivitySet: ", error);
								sap.ui.core.BusyIndicator.hide();
							}.bind(this));
						}, this));	
					}
				  }


				  this.legendaryColor = [];
				  var arrayForLegend = this.removeDupl(
					this.attivita,
					"CODICE_COMMESSA"
				  );
				  for (let i = 0; i < arrayForLegend.length; i++) {
					var obj = {};
					obj.activity = arrayForLegend[i].CODICE_COMMESSA;
					obj.color = this.arrayColori[i];
					this.legendaryColor.push(obj);
				  }

				  this._setDayFull();
				this.setColors(this.actualYear, this.actualMonth);
			
			})
			// this.expenseModel.setProperty("/title", title);
		},

		// funzione lanciata al premere di un giorno
		onSelectDay: function (evt) {
			var userInfo = sap.ushell.Container.getService('UserInfo')
			var email = userInfo.getEmail();
			this.getUser = [];
			var that = this;
			
			// this.oDate = null;
	
			//UTENTE TECHNIS
			// if (this.oDate != null && this.oDate != "") {
			//   var name = this.oDate.NOME_UTENTE;
			//   var surname = this.oDate.COGNOME_UTENTE;
			//   jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 	jQuery.proxy(function () {
			// 		var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// 		that.makeAjaxRequest(sUrl + `Anagrafica_Utenti?$filter=COGNOME_UTENTE eq '${surname}' and NOME_UTENTE eq '${name}'`, function (data) {
			// 			// Handle success for Anagrafica_Utenti
			// 			this.getUser = data.value;
			// 		}.bind(this), function (error) {
			// 			// Handle error for Anagrafica_Utenti
			// 			// console.log("Error in Anagrafica_Utenti: ", error);
			// 			sap.ui.core.BusyIndicator.hide();
			// 		}.bind(this));
			// 	}, this)
			// );

			// for (var g = 0; g < this.getUser.length; g++) {
			// 	if (this.getUser[g].EMAIL_UTENTE === email) {

			// 		this.arrayExpensesSelected = [];
			// 		this._getById("idTableExpenses").removeSelections();
			// 		var calendar = evt.getSource();
			// 		this.selectedDate = calendar.getSelectedDates()[0].getStartDate();
			// 		var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
			// 			pattern: "yyyy-MM-dd",
			// 		});
			// 		var getDay = targetDateFormat.format(this.selectedDate);
			// 		var getActivityId = this.attivita.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
			// 		var getSelected = getActivityId.filter((item) => item.DATA_ATTIVITA === getDay);
			// 		if (getSelected.length == 1) {
			// 			this.expenseModel = new sap.ui.model.json.JSONModel();
			// 			this.getView().setModel(this.expenseModel, "getTimesheetList");
			// 			this.getView().getModel("getTimesheetList").setProperty("/selectList", getSelected);
			// 			this.getView().addDependent(this._selectTimesheet);
			// 			var objectData = getSelected

			// 			this.dateTimesheet = objectData[0].DATA_ATTIVITA;
			// 			this.timesheetRecord = objectData[0].ID;
			// 			this.byId('AddButton').setVisible(true);
			// 			this.byId('changeButton').setVisible(true);
			// 			this.byId('idDeleteButton').setVisible(true);
			// 			this._expenseMatched();
			// 		}
			// 		else {
			// 			this.byId('AddButton').setVisible(false);
			// 			this.byId('changeButton').setVisible(false);
			// 			this.byId('idDeleteButton').setVisible(false);
			// 			var msg = 'There is not timesheet in this date!';
			// 			sap.m.MessageToast.show(msg);
			// 		}
			// 		if (getSelected.length > 1) {
			// 			this.expenseModel = new sap.ui.model.json.JSONModel();
			// 			this.getView().setModel(this.expenseModel, "getTimesheetList");
			// 			this.getView().getModel("getTimesheetList").setProperty("/selectList", getSelected);
			// 			this.byId('AddButton').setVisible(true);
			// 			this.byId('changeButton').setVisible(true);
			// 			this.byId('idDeleteButton').setVisible(true);

			// 			if (!this._selectTimesheet) {
			// 				this._selectTimesheet = sap.ui.xmlfragment(
			// 					"timesheetproject2.view.fragment.DialogPopUpTableSelectTimesheet",
			// 					this
			// 				);
			// 				this.getView().addDependent(this._selectTimesheet);
			// 			}
			// 			this._selectTimesheet.open();
			// 		}
			// 		jQuery.sap.delayedCall(10, this, function () {
			// 			this.setColors(this.actualYear, this.actualMonth)
			// 		})
			// 	}
			// }
			// }
			// else{
				//UTENTE IDGFAB
				var obj = {
					EMAIL_UTENTE: email
				  };
				jQuery.when(this.oInitialLoadFinishedDeferred).then(
					jQuery.proxy(function () {
						var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
						that.makeAjaxRequest(sUrl + `Anagrafica_Utenti?$filter=EMAIL_UTENTE eq '${obj.EMAIL_UTENTE}'`, function (data) {
							// Handle success for Anagrafica_Utenti
							this.getUser = data.value;
						}.bind(this), function (error) {
							// Handle error for Anagrafica_Utenti
							// console.log("Error in Anagrafica_Utenti: ", error);
							sap.ui.core.BusyIndicator.hide();
						}.bind(this));
					}, this)
				);
	
				for (var g = 0; g < this.getUser.length; g++) {
					if (this.getUser[g].EMAIL_UTENTE === email) {
	
						this.arrayExpensesSelected = [];
						this._getById("idTableExpenses").removeSelections();
						var calendar = evt.getSource();
						this.selectedDate = calendar.getSelectedDates()[0].getStartDate();
						var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
							pattern: "yyyy-MM-dd",
						});
						var getDay = targetDateFormat.format(this.selectedDate);
						var getActivityId = this.attivita.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
						var getSelected = getActivityId.filter((item) => item.DATA_ATTIVITA === getDay);
						if (getSelected.length == 1) {
							this.expenseModel = new sap.ui.model.json.JSONModel();
							this.getView().setModel(this.expenseModel, "getTimesheetList");
							this.getView().getModel("getTimesheetList").setProperty("/selectList", getSelected);
							this.getView().addDependent(this._selectTimesheet);
							var objectData = getSelected
	
							this.dateTimesheet = objectData[0].DATA_ATTIVITA;
							this.timesheetRecord = objectData[0].ID;
							this.byId('AddButton').setVisible(true);
							this.byId('changeButton').setVisible(true);
							this.byId('idDeleteButton').setVisible(true);
							this._expenseMatched();
						}
						else {
							this.byId('AddButton').setVisible(false);
							this.byId('changeButton').setVisible(false);
							this.byId('idDeleteButton').setVisible(false);
							var msg = 'There is not timesheet in this date!';
							sap.m.MessageToast.show(msg);
						}
						if (getSelected.length > 1) {
							this.expenseModel = new sap.ui.model.json.JSONModel();
							this.getView().setModel(this.expenseModel, "getTimesheetList");
							this.getView().getModel("getTimesheetList").setProperty("/selectList", getSelected);
							this.byId('AddButton').setVisible(true);
							this.byId('changeButton').setVisible(true);
							this.byId('idDeleteButton').setVisible(true);
	
							if (!this._selectTimesheet) {
								this._selectTimesheet = sap.ui.xmlfragment(
									"timesheetproject2.view.fragment.DialogPopUpTableSelectTimesheet",
									this
								);
								this.getView().addDependent(this._selectTimesheet);
							}
							this._selectTimesheet.open();
						}
						jQuery.sap.delayedCall(10, this, function () {
							this._setDayFull();
							this.setColors(this.actualYear, this.actualMonth)
						})
					}
				}
			// }
		

		},
		onSelectData: function () {

			var getSelected = sap.ui.getCore().byId("selectListTable")
			if (getSelected.getSelectedItems) {
				var getData = getSelected.getSelectedItems()[0];
				var objectData = getData.getBindingContext("getTimesheetList").getObject();

				this.dateTimesheet = objectData.DATA_ATTIVITA;
				this.timesheetRecord = objectData.ID;

				this._expenseMatched();
				this._selectTimesheet.close();
			} else {
				var msg = 'Please Select a row!';
				sap.m.MessageToast.show(msg);
			}
		},
		onCancelData: function () {
			this._selectTimesheet.close();
		},
		// funzione che carica i dati delle spese nella tabella
		updateTable: function (date, fromTimesheet, index) {
			this._setPeriodsModel();
			this._setInputExpense();
			this._setButtonInitial();
			// var profili = this.getModel("userModel").getProperty("/userDetail");
			// for (var z = 0; z < profili.persWork.length; z++) {
			// 	var initDate = new Date(profili.persWork[z].startDate);
			// 	var endDate = new Date(profili.persWork[z].endDate);
			// 	if (date > initDate && date < endDate) {
			// 		var expenseType = StorageService.sessionGet("expensesTypes@" + profili.persWork[z].chiaveTrasferta);
			// 		this.expenseModel.setProperty("/expenseType", expenseType);
			// 	}
			// }
			var selectedDate = formatter.formatDate(date);
			var objFound = _.filter(this.timesheetModel.getProperty("/timesheet"), {
				workDate: selectedDate
			});
			if (objFound && objFound.length) {
				this.timesheetModel.setProperty("/timesheetByDate", _.orderBy(objFound, "descriptionWbs"));
				var objects = this.timesheetModel.getProperty("/timesheetByDate");
				if (fromTimesheet) {
					index = _.findIndex(objects, {
						timeSheetRecord: this.timesheetRecord
					});
				}
				if (index !== undefined) {
					this.expenseModel.setProperty("/index", index);
					var titleDate = objects[index].workDate;
					this.expenseModel.setProperty("/titleDate", titleDate);
					var title = "";
					if (objects[index].WBS) {
						title += objects[index].WBS;
					}
					if (objects[index].descriptionWbs) {
						title += " / " + objects[index].descriptionWbs;
					}
					title += " / ";
					if (objects[index].absenceDescription) {
						title += objects[index].absenceDescription;
					} else {
						title += objects[index].descriptionActivity;
					}
					if (objects[index].descriptionWorkItem) {
						title += " / " + objects[index].descriptionActivity + ", " + objects[index].descriptionWorkItem;
					}
					if (objects[index].purchaseOrder) {
						title += " / ";
						var order = parseInt(objects[index].purchaseOrderItem) ? parseInt(objects[index].purchaseOrder) + " / " + parseInt(objects[
							index]
							.purchaseOrderItem) : parseInt(objects[index].purchaseOrder);
						title += order;
					}
					this.expenseModel.setProperty("/title", title);
					this.expenseModel.setProperty("/arrayExpense", []);
					if (objects[index].transfer) {
						// se esiste un id trasferta controllo se ci sono spese
						if (objects[index].expenses.length) {
							_.forEach(objects[index].expenses, _.bind(function (item) {
								item.descrizioneTipoSpesa = _.find(this.expenseModel.getProperty("/expenseType"), {
									ID_TIPO_SPESA: item.idTipoSpesa
								}) ? _.find(this.expenseModel.getProperty("/expenseType"), {
									ID_TIPO_SPESA: item.idTipoSpesa
								}).DESCRIZIONE : "";
								item.importoRimborsabile = item.importoRimborsabile ? parseFloat(item.importoRimborsabile).toFixed(2) : "";
								item.tipoVeicoloDescrizione = _.find(this.vehicles, {
									TIPO_VEICOLO: item.tipoVeicolo
								}) ? _.find(this.vehicles, {
									TIPO_VEICOLO: item.tipoVeicolo
								}).DESCRIZIONE : "";
							}, this));
							this.expenseModel.setProperty("/arrayExpense", objects[index].expenses);
						}
						if (objects[index].transfer.statoApprovazione === "DA_APPROVARE") {
							this._startFocusSituasion();
							this.uiModel.setProperty("/expenseFormEnabled", true);
						} else {
							this.uiModel.setProperty("/expenseFormEnabled", false);
						}
					} else {
						this.uiModel.setProperty("/expenseFormEnabled", true);
					}
				}
				this._getById("idTableExpenses").removeSelections();
				this._navigationTimesheet(index);
			} else {
				// this.expenseModel.setProperty("/arrayExpense", []);
			}
		},

		// funzione che gestisce la visualizzazione delle frecce per selezionare la commessa nel caso in cui in un giorno ci siano più commesse
		_navigationTimesheet: function (index) {
			var objects = this.timesheetModel.getProperty("/timesheetByDate");
			if (index >= 0) {
				this.index = index;
			} else {
				index = this.index;
				this.expenseModel.setProperty("/index", index);
			}
			var title = this.expenseModel.getProperty("/title");
			if (title) {
				this.title = title;
			} else {
				this.expenseModel.setProperty("/title", this.title);
			}
			if (objects.length === 1) {
				this.uiModel.setProperty("/backButton", false);
				this.uiModel.setProperty("/forwardButton", false);
			} else if (!index && index < (objects.length - 1)) {
				this.uiModel.setProperty("/backButton", false);
				this.uiModel.setProperty("/forwardButton", true);
			} else if (index && index < (objects.length - 1)) {
				this.uiModel.setProperty("/backButton", true);
				this.uiModel.setProperty("/forwardButton", true);
			} else {
				this.uiModel.setProperty("/backButton", true);
				this.uiModel.setProperty("/forwardButton", false);
			}
		},

		// funzione che naviga indietro di una commessa dello stesso giorno
		onBackWbsPress: function () {
			var index = this.expenseModel.getProperty("/index");
			this.index--;
			index--;
			this.updateTable(this._getById("idExpenseCalendar").getSelectedDates()[0].getStartDate() ? this._getById("idExpenseCalendar").getSelectedDates()[
				0].getStartDate() : this.selectedDate, false, index);
		},

		// funzione che naviga avanti di una commessa dello stesso giorno
		onForwardWbsPress: function () {
			// var index = this.expenseModel.setProperty("/index");
			// this.index++;
			// index++;
			// this.updateTable(this._getById("idExpenseCalendar").getSelectedDates()[0].getStartDate() ? this._getById("idExpenseCalendar").getSelectedDates()[
			// 	0].getStartDate() : this.selectedDate, false, index);
		},

		// funzione lanciata al cambio di tipo spesa
		onChangeExpenseCategory: function (evt) {
			var expenseCategory = evt.getSource().getSelectedKey();
			if (expenseCategory === "5" || expenseCategory === 'FAK' || expenseCategory === 'FAKM') {
				// this.byId("add").setProperty('visible', true);
				this.byId("luogospesa").setProperty('visible', false)
				this.byId("vehicle").setProperty('visible', true)
				this.byId("placeto").setProperty('visible', true)
				this.byId("placefrom").setProperty('visible', true)
				this.byId("repayablekm").setProperty('visible', true)

			} else {
				this.byId("luogospesa").setProperty('visible', true)
				this.byId("vehicle").setProperty('visible', false)
				this.byId("placeto").setProperty('visible', false)
				this.byId("placefrom").setProperty('visible', false)
				this.byId("repayablekm").setProperty('visible', true)

			}

			//table.setModel(UtenteFlussoModel, "UtenteFlusso");


			// if (this.expenseCategory !== "14" && expenseCategory === "14" || this.expenseCategory === "14") {
			// 	// entro qui dentro se seleziono un categoria spesa diversa dai chilometri quando prima c'erano i km selezionati oppure se seleziono i km
			// 	this.expenseToSaveModel.setProperty("/expenseCategory", expenseCategory);
			// 	this.expenseToSaveModel.setProperty("/amount", null);
			// 	this.expenseToSaveModel.setProperty("/place", "");
			// 	this.expenseToSaveModel.setProperty("/km", null);
			// 	this.expenseToSaveModel.setProperty("/placeFrom", "");
			// 	this.expenseToSaveModel.setProperty("/placeTo", "");
			// 	this.expenseToSaveModel.setProperty("/vehicleType", this.vehicleType);
			// 	this.expenseToSaveModel.setProperty("/note", "");
			// }
			// this.expenseCategory = expenseCategory;
			// var visibleExpenseAdd = !this.uiModel.getProperty("/expenseSave") ? true : false;
			// var visibleExpenseCancel = !this.uiModel.getProperty("/expenseSave") ? true : false;
			// this.uiModel.setProperty("/expenseAdd", visibleExpenseAdd);
			// this.uiModel.setProperty("/expenseCancel", visibleExpenseCancel);
			// setTimeout(_.bind(this.enableOEPTabNavigation, this), 100);
		},

		// funzione lanciata alla modifica dell'importo
		liveChangeAmount: function (evt) {
			//commentato per permettere inserimento libero
			var src = evt.getSource();
			var value = src.getValue();
			/* if (value.indexOf(",") !== -1) {
				value = value.replace(",", ".");
			}
			if (this.isNumeric(value)) {
				src.setValueState("None");
			} else {
				src.setValueState("Error");
				return;
			}
			if (this.isValidAmount(value)) {
				src.setValueState("None");
			} else {
				src.setValueState("Error");
				return;
			} */
			this.expenseToSaveModel.setProperty("/amount", value);
		},

		isNumeric: function (str) {
			return /^\d*\.{0,1}\d*$/.test(str);
		},

		isValidAmount: function (value) {
			if (value.split(".")[1] !== "" && value.split(".")[1] !== undefined) {
				if (value.split(".")[1].length > 2) {
					return false;
				} else {
					return true;
				}
			} else if (value.split(".")[1] === "") {
				return false;
			} else if (value.split(".")[0] !== undefined) {
				if (value.split(".")[0].length > 4) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			return true;
		},

		// funzione lanciata alla modifica della località
		liveChangePlace: function (evt) {
			var value = evt.getSource().getValue();
			this.expenseToSaveModel.setProperty("/place", value);
		},

		// funzione lanciata alla modifica dei chilometri
		liveChangeKm: function (evt) {
			var src = evt.getSource();
			var value = src.getValue();
			if (value.indexOf(",") !== -1) {
				value = value.replace(",", ".");
			}
			if (this.isNumeric(value)) {
				src.setValueState("None");
			} else {
				src.setValueState("Error");
				return;
			}
			if (this.isValidKm(value)) {
				src.setValueState("None");
			} else {
				src.setValueState("Error");
				return;
			}
			this.expenseToSaveModel.setProperty("/km", value);
		},

		isValidKm: function (value) {
			if (value.split(".")[1] !== "" && value.split(".")[1] !== undefined) {
				return false;
			} else if (value.split(".")[1] === "") {
				return false;
			} else if (value.split(".")[0] !== undefined) {
				if (value.split(".")[0].length > 4) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
			return true;
		},

		// funzione lanciata alla modifica della località di partenza
		liveChangePlaceFrom: function (evt) {
			var value = evt.getSource().getValue();
			this.expenseToSaveModel.setProperty("/placeFrom", value);
		},

		// funzione lanciata alla modifica della località di arrivo
		liveChangePlaceTo: function (evt) {
			var value = evt.getSource().getValue();
			this.expenseToSaveModel.setProperty("/placeTo", value);
		},

		// funzione lanciata alla modifica del tipo veicolo
		onChangeVehicleType: function (evt) {
			var selectedVehicleType = evt.getSource().getSelectedKey();
			this.expenseToSaveModel.setProperty("/vehicleType", selectedVehicleType);
		},

		// funzione lanciata alla modifica del campo note
		liveChangeNote: function (evt) {
			var value = evt.getSource().getValue();
			this.expenseToSaveModel.setProperty("/note", value);
		},

		// funzione che inverte i campi 'localita partenza' e 'località arrivo'
		onInvertPress: function () {
			var from = this.expenseToSaveModel.getProperty("/placeFrom");
			var to = this.expenseToSaveModel.getProperty("/placeTo");
			this.expenseToSaveModel.setProperty("/placeFrom", to);
			this.expenseToSaveModel.setProperty("/placeTo", from);
			this.getView().byId("idInputFrom").setValue(to);
			this.getView().byId("idInputTo").setValue(from);
		},

		// funzione che salva la nota spesa inserita
		// controlla se esiste una trasferta associata alla commessa, e nel caso in cui non ci sia la crea
		onAddPress: function () {
			var tipoSpesa = this.getView().byId("idSelectExpenseCategory").getValue();
			var activityID = parseInt(this.timesheetRecord);
			var kilometri = this.expenseToSaveModel.getProperty("/km");
			var localitaArrivo = this.expenseToSaveModel.getProperty("/placeTo");
			var localitaPartenza = this.expenseToSaveModel.getProperty("/placeFrom");
			var localitaSpesa = this.expenseToSaveModel.getProperty("/place")
			var spesaButton = this.expenseToSaveModel.getProperty("/note");
			var spesa = this.expenseToSaveModel.getProperty("/amount")
			var veicolo = this.getView().byId("idSelectVehicleType").getSelectedItem().mProperties.text;


			if (tipoSpesa === 'KM' || tipoSpesa === 'Forfait km - automobile' ||  tipoSpesa === 'Forfait km - motorino' ) {
				if (activityID != '' && activityID != undefined &&
					kilometri != '' && kilometri != undefined &&
					localitaArrivo != '' && localitaArrivo != undefined &&
					localitaPartenza != '' && localitaPartenza != undefined &&
					veicolo != '' && veicolo != undefined &&
					spesaButton != '' && spesaButton != undefined) {
					var obj = {
						"TIPO_SPESA": tipoSpesa,
						"ACTIVITY_ID": activityID,
						"RIMBORSO_ID_RIMBORSO": 1,
						"KM": kilometri,
						"LOCALITA_ARRIVO": localitaArrivo,
						"LOCALITA_ARRIVO": localitaArrivo,
						"LOCALITA_PARTENZA": localitaPartenza,
						"LOCALITA": localitaSpesa,
						"SPESA_BUTTON": spesaButton,
						"CHIAVE_TRASFERTA": null,
						"SPESA": spesa,
						"FATTURAZIONE_FLAG": "No"
					};
					var spesastring = JSON.stringify(obj);
					var that = this;
					jQuery.when(this.oInitialLoadFinishedDeferred).then(
						jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

							jQuery.ajax({
								url: sUrl + `TipoSpesaSet`,
								contentType: "application/json",
								type: "POST",
								data: spesastring,
								dataType: 'json',
								success: function (oData, oResponse) {
									// that.entity = "view";
									// that.enableModel.setProperty("/entity", that.entity);
									var msg = 'Dati inseriti correttamente';
									sap.m.MessageToast.show(msg);
									obj.ID = oData.ID_SPESA;
									that._expenseMatched();								
								},
								error: function (error) {
									var msg = 'Dati non inseriti correttamente!';
									sap.m.MessageToast.show(msg);
								},
								async: false,
							});
						}, this)
					);
					this._expenseMatched();

				}
			} else {
				if (tipoSpesa != '' && tipoSpesa != undefined &&
					activityID != '' && activityID != undefined &&
					spesa != '' && spesa != undefined &&
					localitaSpesa != '' && localitaSpesa != undefined &&
					spesaButton != '' && spesaButton != undefined) {
					var obj = {
						"TIPO_SPESA": tipoSpesa,
						"ACTIVITY_ID": activityID,
						"RIMBORSO_ID_RIMBORSO": 1,
						"KM": kilometri,
						"LOCALITA_ARRIVO": localitaArrivo,
						"LOCALITA_ARRIVO": localitaArrivo,
						"LOCALITA_PARTENZA": localitaPartenza,
						"LOCALITA": localitaSpesa,
						"SPESA_BUTTON": spesaButton,
						"CHIAVE_TRASFERTA": null,
						"SPESA": spesa,
						"FATTURAZIONE_FLAG": "No"
					};
					var spesastring = JSON.stringify(obj);
					var that = this;
					jQuery.when(this.oInitialLoadFinishedDeferred).then(
						jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

							jQuery.ajax({
								url: sUrl + `TipoSpesaSet`,
								contentType: "application/json",
								type: "POST",
								data: spesastring,
								dataType: 'json',
								success: function (oData, oResponse) {
									// that.entity = "view";
									// that.enableModel.setProperty("/entity", that.entity);
									var msg = 'Dati inseriti correttamente!';
									sap.m.MessageToast.show(msg);
									obj.ID = oData.ID_SPESA;
									that._expenseMatched()
								},
								error: function (error) {
									var msg = 'Dati non inseriti correttamente!';
									sap.m.MessageToast.show(msg);
								},
								async: false,
							});
						}, this)
					);
					this._expenseMatched();
				}
				else {
					var msg = 'Dati non inseriti correttamente';
					sap.m.MessageToast.show(msg);
				}
			}



		},


		// se seleziono una riga
		onPressExpenseRow: function (evt) {
			var source = evt.getSource();
			var path = source.getBindingContext("expenseModel").getPath();
			var obj = source.getBindingContext("expenseModel").getModel().getProperty(path);
			this.selectedExpense = obj;
			this.expenseToSaveModel.setProperty("/expenseCategory", obj.idTipoSpesa);
			this.expenseToSaveModel.setProperty("/amount", obj.importo);
			// this.expenseToSaveModel.setProperty("/currency", "EUR");
			this.expenseToSaveModel.setProperty("/currency", "");
			this.expenseToSaveModel.setProperty("/km", obj.km);
			this.expenseToSaveModel.setProperty("/placeFrom", obj.idTipoSpesa === "14" ? obj.localita : "");
			this.expenseToSaveModel.setProperty("/placeTo", obj.localitaA);
			this.expenseToSaveModel.setProperty("/place", obj.idTipoSpesa === "14" ? "" : obj.localita);
			this.expenseToSaveModel.setProperty("/vehicleType", obj.tipoVeicolo);
			var vehicles = _.cloneDeep(this.vehicles);
			if (obj.tipoVeicolo === "P") {
				_.remove(vehicles, function (n) {
					return n.TIPO_VEICOLO === "A";
				});
			}
			this.expenseModel.setProperty("/vehicleType", vehicles);
			this.expenseToSaveModel.setProperty("/note", obj.nota);
			this.uiModel.setProperty("/expenseCancel", true);
			var transfer = _.find(this.timesheetModel.getProperty("/timesheetByDate"), _.bind(function (item) {
				if (item.transfer.idTrasferta === this.selectedExpense.idTrasferta) {
					return item;
				}
			}, this)).transfer;
			if (transfer.statoApprovazione === "DA_APPROVARE") {
				this.uiModel.setProperty("/expenseSave", true);
				this.uiModel.setProperty("/expenseFormEnabled", true);
			} else {
				this.uiModel.setProperty("/expenseSave", false);
				this.uiModel.setProperty("/expenseFormEnabled", false);
			}
			this.uiModel.setProperty("/expenseAdd", false);
			this.uiModel.setProperty("/expenseDelete", false);
			this.uiModel.setProperty("/expenseDuplicate", false);
			this._getById("idTableExpenses").removeSelections();
			this._startFocusSituasion();
		},

		// funzione lanciata al premere del tasto 'cancella'
		onCancelPress: function () {
			// aggiungo la variabile title per poi ri-settarlo perché il metodo '_setInputExpense' lo pulisce
			// var title = this.expenseModel.setProperty("/title");
			// this._setInputExpense();
			// this._setButtonInitial();
			// this.expenseModel.setProperty("/title", title);
			// this._navigationTimesheet();
			this.getRouter().navTo("Timesheet");
			// history.go(-1);
		},

		// funzione che salva la modifica di una nota spesa già esistente
		onSavePress: function () {
			var getData = this.getView().getModel("expenseModel").getData();
			var idspesa = this.getView().getModel("expenseModel").getProperty("/arrayExpense");
			var tipoSpesa = this.getView().byId("idSelectExpenseCategory").getValue();
			var activityID = parseInt(this.timesheetRecord);
			var kilometri = this.expenseToSaveModel.getProperty("/km");
			var localitaArrivo = this.expenseToSaveModel.getProperty("/placeTo");
			var localitaPartenza = this.expenseToSaveModel.getProperty("/placeFrom");
			var localitaSpesa = this.expenseToSaveModel.getProperty("/place")
			var spesaButton = this.expenseToSaveModel.getProperty("/note");
			var spesa = this.expenseToSaveModel.getProperty("/amount")
			var veicolo = this.getView().byId("idSelectVehicleType").getSelectedItem().mProperties.text;
			if (tipoSpesa === 'KM' || tipoSpesa === 'Forfait km - automobile' ||  tipoSpesa === 'Forfait km - motorino') {
				if (activityID != '' && activityID != undefined &&
					kilometri != '' && kilometri != undefined &&
					localitaArrivo != '' && localitaArrivo != undefined &&
					localitaPartenza != '' && localitaPartenza != undefined &&
					veicolo != '' && veicolo != undefined &&
					spesaButton != '' && spesaButton != undefined) {
					var obj = {
						"TIPO_SPESA": tipoSpesa,
						"ACTIVITY_ID": activityID,
						"RIMBORSO_ID_RIMBORSO": 1,
						"KM": kilometri,
						"LOCALITA_ARRIVO": localitaArrivo,
						"LOCALITA_PARTENZA": localitaPartenza,
						"LOCALITA": localitaSpesa,
						"SPESA_BUTTON": spesaButton,
						"CHIAVE_TRASFERTA": null,
						"SPESA": spesa,
						"FATTURAZIONE_FLAG": "No"
					};
					obj.ID = this.editedData.id;
					var spesastring = JSON.stringify(obj);
					var that = this;
					jQuery.when(this.oInitialLoadFinishedDeferred).then(
						jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

							jQuery.ajax({
								url: sUrl + `TipoSpesaSet/${obj.ID}`,
								contentType: "application/json",
								type: "PUT",
								data: spesastring,
								dataType: 'json',
								success: function (oData, oResponse) {
									// that.entity = "view";
									// that.enableModel.setProperty("/entity", that.entity);
									var msg = 'Dati aggiornati correttamente!';
									sap.m.MessageToast.show(msg);
									that.getView().byId("AddButton").setEnabled(true)
									that.getView().byId("changeButton").setEnabled(false)
									that._expenseMatched();

								},
								error: function (error) {
									var msg = 'Dati non aggiornati correttamente!';
									sap.m.MessageToast.show(msg);
								},
								async: false,
							});
						}, this)
					);
					this._expenseMatched();
					this.getView().byId("idTableExpenses").removeSelections();
					this.getView().byId("AddButton").setEnabled(true)
					this.getView().byId("changeButton").setEnabled(false)

				}
			}
			else {
				if (tipoSpesa != '' && tipoSpesa != undefined &&
					activityID != '' && activityID != undefined &&
					spesa != '' && spesa != undefined &&
					localitaSpesa != '' && localitaSpesa != undefined &&
					spesaButton != '' && spesaButton != undefined) {
					var obj = {
						"TIPO_SPESA": tipoSpesa,
						"ACTIVITY_ID": activityID,
						"RIMBORSO_ID_RIMBORSO": 1,
						"KM": kilometri,
						"LOCALITA": localitaSpesa,
						"SPESA_BUTTON": spesaButton,
						"CHIAVE_TRASFERTA": null,
						"SPESA": spesa,
						"FATTURAZIONE_FLAG": "No"
					};
					obj.ID = this.editedData.id;
					var spesastring = JSON.stringify(obj);
					var that = this;
					jQuery.when(this.oInitialLoadFinishedDeferred).then(
						jQuery.proxy(function () {
							var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

							jQuery.ajax({
								url: sUrl + `TipoSpesaSet/${obj.ID}`,
								contentType: "application/json",
								type: "PUT",
								data: spesastring,
								dataType: 'json',
								success: function (oData, oResponse) {
									// that.entity = "view";
									// that.enableModel.setProperty("/entity", that.entity);
									var msg = 'Dati aggiornati correttamente!';
									sap.m.MessageToast.show(msg);
									that.getView().byId("AddButton").setEnabled(true)
									that.getView().byId("changeButton").setEnabled(false)
									that._expenseMatched();
								},
								error: function (error) {
									var msg = 'Dati non aggiornati correttamente!';
									sap.m.MessageToast.show(msg);
								},
								async: false,
							});
						}, this)
					);
					this._expenseMatched();
					this.getView().byId("idTableExpenses").removeSelections();
					this.getView().byId("AddButton").setEnabled(true)
					this.getView().byId("changeButton").setEnabled(false)
				}
				else {
					var msg = 'Dati non inseriti correttamente';
					sap.m.MessageToast.show(msg);
				}
			}




		},


		// controllo dei campi input obbligatori
		_checkInputValues: function () {
			if (!this.expenseToSaveModel.getProperty("/expenseCategory")) {
				sap.m.MessageBox.error(this._getLocalText("insertExpenseCategory"), {
					title: this._getLocalText("WARNING")
				});
				return false;
			} else if (!this.expenseToSaveModel.getProperty("/amount") && this.expenseToSaveModel.getProperty("/expenseCategory") !== "14") {
				sap.m.MessageBox.error(this._getLocalText("insertAmount"), {
					title: this._getLocalText("WARNING")
				});
				return false;
			} else if (this.expenseToSaveModel.getProperty("/expenseCategory") !== "14" && (!this.isNumeric(this.expenseToSaveModel.getProperty(
				"/amount")) || !this.isValidAmount(this.expenseToSaveModel.getProperty("/amount")))) {
				//decommentare per gestire nuovamente invalidAmount
				/* sap.m.MessageBox.error(this._getLocalText("invalidAmount"), {
					title: this._getLocalText("WARNING")
				});
				return false; */
			} else if (!this.expenseToSaveModel.getProperty("/place") && this.expenseToSaveModel.getProperty("/expenseCategory") !== "14") {
				//decommentare per gestire nuovamente place obbligatorio
				/* sap.m.MessageBox.error(this._getLocalText("insertPlace"), {
					title: this._getLocalText("WARNING")
				});
				return false; */
			} else if (!this.expenseToSaveModel.getProperty("/km") && this.expenseToSaveModel.getProperty("/expenseCategory") === "14") {
				sap.m.MessageBox.error(this._getLocalText("insertKm"), {
					title: this._getLocalText("WARNING")
				});
				return false;
			} else if (this.expenseToSaveModel.getProperty("/expenseCategory") === "14" && (!this.isNumeric(this.expenseToSaveModel.getProperty(
				"/km")) || !this.isValidKm(this.expenseToSaveModel.getProperty("/km")))) {
				sap.m.MessageBox.error(this._getLocalText("invalidKm"), {
					title: this._getLocalText("WARNING")
				});
				return false;
			} else if (!this.expenseToSaveModel.getProperty("/placeFrom") && this.expenseToSaveModel.getProperty("/expenseCategory") === "14") {
				sap.m.MessageBox.error(this._getLocalText("insertPlaceFrom"), {
					title: this._getLocalText("WARNING")
				});
				return false;
			} else if (!this.expenseToSaveModel.getProperty("/placeTo") && this.expenseToSaveModel.getProperty("/expenseCategory") === "14") {
				sap.m.MessageBox.error(this._getLocalText("insertPlaceTo"), {
					title: this._getLocalText("WARNING")
				});
				return false;
			}
			return true;
		},

		// controllo sull'importo. aggiungo gli zeri dopo il punto
		_checkAmount: function () {
			var amount = this.expenseToSaveModel.getProperty("/expenseCategory") !== "14" ? this.expenseToSaveModel.getProperty("/amount") :
				"";
			if (amount !== "") {
				if (amount.indexOf(".") === -1) {
					amount = amount + ".00";
				} else {
					if (amount.split(".")[1].length === 1) {
						amount = amount + "0";
					}
				}
			}
			return amount;
		},

		// funzione che gestisce la selezione delle spese
		onPressTs: function (evt) {
			// this.onCancelPress();
			var selectedExpensesObj = [];
			selectedExpensesObj.push(evt
			.getSource()
			.getBindingContext("expenseModel")
			.getObject());
			var that = this;
			this.arrayExpensesSelected = [];
			if (selectedExpensesObj != '' && selectedExpensesObj != null && selectedExpensesObj != undefined) {
				MessageBox.confirm(this._getLocalText("confirmMessageEditExpenses"), {
					class: "sapUiSizeCompact",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					// onClose: _.bind(this.confirmDeleteTs, this),
					onClose: function (sAction) {
						if (sAction === "YES") {
							that.getView().byId("AddButton").setEnabled(false)
							that.getView().byId("changeButton").setEnabled(true)
							for (var i = 0; i < selectedExpensesObj.length; i++) {
								var oSelectedItem = selectedExpensesObj[i];
								// var oBindingContext =
								// 	oSelectedItem.getBindingContext("expenseModel");
								var oSelectedData = oSelectedItem; // Get the data of the selected item
								if (oSelectedData.id) {
									that.addInputs(oSelectedData);
								}
							}
						}
						if (sAction === "NO") {
							// that._expenseMatched();
						}
					},
				});
			} else if (selectedExpensesObj === '' && selectedExpensesObj === null && selectedExpensesObj === undefined) {
				this._expenseMatched();
				this.getView().byId("AddButton").setEnabled(true)
				this.getView().byId("changeButton").setEnabled(false)

			}
			// for (var i = 0; i < selectedExpensesObj.length; i++) {
			// 	var expense = selectedExpensesObj[i].getBindingContext("expenseModel").getObject();
			// 	this.arrayExpensesSelected.push(expense);
			// }
			// if (this.arrayExpensesSelected.length) {
			// 	var transfer = _.find(this.timesheetModel.getProperty("/timesheetByDate"), _.bind(function (item) {
			// 		if (item.transfer.idTrasferta === this.arrayExpensesSelected[0].idTrasferta) {
			// 			return item;
			// 		}
			// 	}, this));
			// }
			// if (this.arrayExpensesSelected.length && (transfer && transfer.transfer.statoApprovazione === "DA_APPROVARE")) {
			// 	this.uiModel.setProperty("/expenseDelete", true);
			// 	this.uiModel.setProperty("/expenseDuplicate", true);
			// } else if (this.arrayExpensesSelected.length && (transfer && transfer.transfer.statoApprovazione !== "DA_APPROVARE")) {
			// 	this.uiModel.setProperty("/expenseDelete", false);
			// 	this.uiModel.setProperty("/expenseDuplicate", true);
			// } else {
			// 	this.uiModel.setProperty("/expenseDelete", false);
			// 	this.uiModel.setProperty("/expenseDuplicate", false);
			// }
			// this.uiModel.setProperty("/expenseSave", false);
			// this.uiModel.setProperty("/expenseCancel", false);
		},
		addInputs: function (oSelectedData) {
			this.editedData = oSelectedData;
			var getCategory = this.expenseCategory.filter((x) => x.Descrizione === oSelectedData.descrizioneTipoSpesa)
			this.expenseToSaveModel.setProperty("/expenseCategory", parseInt(getCategory[0].ID));
			if (getCategory[0].ID == 5) {
				this.byId("luogospesa").setProperty('visible', false)
				this.byId("vehicle").setProperty('visible', true)
				this.byId("placeto").setProperty('visible', true)
				this.byId("idInputKmLabel").setProperty('visible', true)
				this.byId("idAmount").setProperty('visible', false)
				this.byId("placefrom").setProperty('visible', true)
				this.byId("repayablekm").setProperty('visible', true)

			} else {
				this.byId("luogospesa").setProperty('visible', true)
				this.byId("vehicle").setProperty('visible', false)
				this.byId("placeto").setProperty('visible', false)
				this.byId("placefrom").setProperty('visible', false)
				this.byId("idInputKmLabel").setProperty('visible', false)
				this.byId("idAmount").setProperty('visible', true)
				this.byId("repayablekm").setProperty('visible', true)
			}

			this.expenseToSaveModel.setProperty("/amount", oSelectedData.importo);
			// this.expenseToSaveModel.setProperty("/currency", "EUR");
			this.expenseToSaveModel.setProperty("/currency", oSelectedData.currency);
			this.expenseToSaveModel.setProperty("/km", oSelectedData.km);
			this.expenseToSaveModel.setProperty("/placeFrom", oSelectedData.localitaA);
			this.expenseToSaveModel.setProperty("/placeTo", oSelectedData.localitaB);
			this.expenseToSaveModel.setProperty("/place", oSelectedData.localita);
			this.expenseToSaveModel.setProperty("/vehicleType", oSelectedData.vehicle); // da user
			this.expenseToSaveModel.setProperty("/note", oSelectedData.nota);
			// this.expenseToSaveModel.refresh();
		},

		// funzione lanciata alla pressione del tasto di cancellazione
		onDeletePress: function () {
			// var msg = this.arrayExpensesSelected.length === 1 ? this._getLocalText("confirmMessageDeletExpense") : this._getLocalText(
			// 	"confirmMessageDeletExpenses");
			// sap.m.MessageBox.show(msg,
			// 	sap.m.MessageBox.Icon.NONE,
			// 	this._getLocalText("confirmMessageTitleDeletExpense"), [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
			// 	_.bind(function (action) {
			// 		if (action === "YES") {
			// 			this.openDialogBusy(this._getLocalText("cencelExpenses"));
			// 			this.arraExpensesToDelete = [];
			// 			for (var i = 0; i < this.arrayExpensesSelected.length; i++) {
			// 				var param = {
			// 					"ID": this.arrayExpensesSelected[i].id
			// 				};
			// 				this.arraExpensesToDelete.push(param);
			// 			}
			// 			this.arrayErrorsExpenseDelete = [];
			// 			this._batchDeleteExpense(-1);
			// 		}
			// 	}, this)
			// );

			var table = this.getView().byId("idTableExpenses");
			var aSelectedItems = table.getSelectedItems();
			var that = this;
			// Loop through selected items to get their data

			MessageBox.confirm(this._getLocalText("confirmMessageDeletExpenses"), {
				class: "sapUiSizeCompact",
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				// onClose: _.bind(this.confirmDeleteTs, this),
				onClose: function (sAction) {
					if (sAction === "YES") {
						that.byId('AddButton').setEnabled(false);
						that.byId('changeButton').setEnabled(true);
						for (var i = 0; i < aSelectedItems.length; i++) {
							var oSelectedItem = aSelectedItems[i];
							var oBindingContext =
								oSelectedItem.getBindingContext("expenseModel");
							var oSelectedData = oBindingContext.getProperty(); // Get the data of the selected item
							if (oSelectedData.id) {
								that.deleteTimesheetsRows(oSelectedData.id);
							}
						}
						that._expenseMatched();
					}
				},
			});
			// setTimeout(_.bind(this._removeFocus, this), 300);

		},
		deleteTimesheetsRows: function (id) {
			var that = this;
			jQuery.when(this.oInitialLoadFinishedDeferred).then(
				jQuery.proxy(function () {
					var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

					jQuery.ajax({
						url: sUrl + `TipoSpesaSet/${id}`,
						contentType: "application/json",
						type: "DELETE",
						dataType: 'json',
						success: function (oData, oResponse) { that.getRouter().navTo("Timesheet"); },
						error: function (error) { },

						async: false,
					});
				}, this)
			);
			this.byId('AddButton').setEnabled(false);
			this.byId('changeButton').setEnabled(true);
			this._expenseMatched();
			// sap.ui.getCore().byId("idTableExpenses").getBinding("expenseModel").refresh()
		},

		// batch di cancellazione spese
		_batchDeleteExpense: function (i) {
			i++;

			if (this.arraExpensesToDelete[i]) {
				var id = this.arraExpensesToDelete[i].ID;
				oData.deleteExpense(id, function (result) {
					this._batchDeleteExpense(i);
				}.bind(this), function (err) {
					this.closeDialogBusy();
					this._openMessageBoxError(err);
					this.arrayErrorsExpenseDelete.push(err);
				}.bind(this));
			} else {
				// cancellate tutte le spese
				this.arraExpensesToDelete = [];
				this.arrayExpensesSelected = [];
				// rileggo il timesheet
				var cid = this.getModel("userModel").getProperty("/userDetail").cid;
				var timesheetRecord = this.timesheetModel.getProperty("/timesheetByDate")[this.expenseModel.getProperty("/index")].timeSheetRecord;
				oData.getTimesheetById(cid, timesheetRecord, function (result) {
					if (!result[0]) {
						this.closeDialogBusy();
						MessageBox.error(this._getLocalText("oDataMissingTimesheetError"), {
							title: this._getLocalText("oDataReadTransferError")
						});
						//ricarica la pagina in modo da non visualizzare il timesheet mancante
						this._getById("idExpenseCalendar").removeAllSelectedDates();
						this._setPage();
					}
					var obj = _.find(this.timesheetModel.getProperty("/timesheet"), {
						timeSheetRecord: result[0].timeSheetRecord
					});

					var arrayExpenses = result[0].trasfertaHanaDetails.notaSpeseRef.results;
					_.forEach(arrayExpenses, _.bind(function (item) {
						item.descrizioneTipoSpesa = _.find(this.expenseModel.getProperty("/expenseType"), {
							ID_TIPO_SPESA: item.idTipoSpesa
						}) ? _.find(this.expenseModel.getProperty("/expenseType"), {
							ID_TIPO_SPESA: item.idTipoSpesa
						}).DESCRIZIONE : "";
						item.tipoVeicoloDescrizione = _.find(this.vehicles, {
							TIPO_VEICOLO: item.tipoVeicolo
						}) ? _.find(this.vehicles, {
							TIPO_VEICOLO: item.tipoVeicolo
						}).DESCRIZIONE : "";
					}, this));

					obj.expenses = arrayExpenses;
					this.expenseModel.setProperty("/arrayExpense", arrayExpenses);
					this.expenseModel.refresh();
					this.uiModel.setProperty("/expenseDelete", false);
					this.uiModel.setProperty("/expenseDuplicate", false);
					this._getById("idTableExpenses").removeSelections();
					this.closeDialogBusy();
					if (this.arrayErrorsExpenseDelete.length) {
						// mostrare errori
					} else {
						sap.m.MessageToast.show(this._getLocalText("successDeleted"), {
							duration: 3000,
							at: "center center"
						});
					}
				}.bind(this), function (error) {
					// ERRORE
					this.closeDialogBusy();
				}.bind(this));
			}
		},

		// funzione lanciata al premere il bottone di duplica. Apre il dialog con il calendario per la selezione dei giorni
		onDuplicatePress: function () {
			if (!this.dialogDuplicateExpense) {
				this.dialogDuplicateExpense = sap.ui.xmlfragment("timesheetproject2.view.fragment.DialogDuplicateExpense", this);
				this.getView().addDependent(this.dialogDuplicateExpense);
			}
			this.dialogDuplicateExpense.open();
		},

		// funzione lanciata dopo l'apertura del dialog. Mostra le commesse dove si possono aggiungere spese
		onAfterOpenDialog: function () {
			this.openDialogBusy(this._getLocalText("loadingPage"));
			this.startDateDuplicate = formatter.getFirstDayFromMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
			this.endDateDuplicate = formatter.getLastDayFromMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
			var calendar = this._getById("idCalendarDuplicateExpense");
			calendar.focusDate(new Date(this.startDateDuplicate));
			calendar.removeAllSelectedDates();
			this._getTimesheet(this.startDateDuplicate, this.endDateDuplicate);
		},

		// chiusura del dialog
		onPressCloseDialog: function () {
			this.dialogDuplicateExpense.close();
		},

		// funzione lanciata al cambio mese del calendario di duplica
		_setCalendarDuplicate: function (evt) {
			this.openDialogBusy(this._getLocalText("loadingPage"));
			var src = evt.getSource();
			src.removeAllSelectedDates();
			var firstDayOfMonth = src.getStartDate();
			this.startDateDuplicate = formatter.getFirstDayFromMonth(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth());
			this.endDateDuplicate = formatter.getLastDayFromMonth(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1);
			this._getTimesheet(this.startDateDuplicate, this.endDateDuplicate);
		},

		// funzione che avvia la duplicazione
		// controlla se per i timesheet selezionati esistono trasferte
		onPressDuplicate: function () {
			var calendar = this._getById("idCalendarDuplicateExpense");
			var datesSelected = calendar.getSelectedDates();
			if (!datesSelected.length) {
				sap.m.MessageToast.show(this._getLocalText("selectOneDate"), {
					duration: 3000,
					at: "center center"
				});
				return;
			}
			var arrayTimesheet = [];
			for (var i = 0; i < datesSelected.length; i++) {
				var date = datesSelected[i].getStartDate();
				var day = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
				var month = date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
				var year = date.getFullYear();
				var compareDate = day + "/" + month + "/" + year;
				var timesheetFound = _.filter(this.timesheetModel.getProperty("/timesheet"), {
					workDate: compareDate
				});
				if (timesheetFound && timesheetFound.length) {
					_.forEach(timesheetFound, function (item) {
						arrayTimesheet.push(item);
					});
				}
			}
			this.arrayTimesheet = arrayTimesheet;
			this._checkPeriods();
		},

		_checkPeriods: function (operation) {
			// per ogni ts, verifico se in quel giorno sono aperti i periodi necessari per la duplicazione del rapportino
			var allTsToDupliate = _.cloneDeep(this.arrayTimesheet);
			// lo uniq serve per evitare di mostrare nell'eventuale messaggio di errore che per uno stesso giorno, uno stesso tipo periodo è chiuso
			allTsToDupliate = _.uniqBy(allTsToDupliate, "workDate");
			// la seguente variabile serve per tenere dentro i rapportini che si volevano duplicare su giorni con periodo spese chiuso
			this.allErrorsTs = [];
			for (var i = 0; i < allTsToDupliate.length; i++) {
				var ts = allTsToDupliate[i];
				var periodsByDate = this._getPeriodsByDate(new Date(formatter.dateFromStringToDateValue(ts.workDate).setHours(12)));
				var expense = periodsByDate.expense;
				if (!expense) {
					// entro qui dentro se sto provando a duplicare le spese di un rapportino e il periodo spese è chiuso
					this.allErrorsTs.push(ts);
					_.remove(this.arrayTimesheet, {
						"workDate": ts.workDate
					});
				}
			}
			if (this.arrayTimesheet.length) {
				this._continueDuplicateOperation();
			} else {
				// se non ci sono più spese da salvare allora mostro direttamente l'errore
				this.showErrorTsNotWorked();
			}
		},

		_continueDuplicateOperation: function () {
			var arrayTimesheet = _.cloneDeep(this.arrayTimesheet);
			this.arrayMultiTimesheet = [];
			_.forEach(_.groupBy(arrayTimesheet, "workDate"), _.bind(function (item) {
				if (item.length > 1) {
					this.arrayMultiTimesheet.push(item);
					for (var w = 0; w < item.length; w++) {
						_.remove(this.arrayTimesheet, item[w]);
					}
				}
			}, this));
			if (!this.arrayMultiTimesheet.length) {
				var timesheetNoTransfer = _.remove(this.arrayTimesheet, {
					transfer: ""
				});
				if (timesheetNoTransfer.length) {
					// batch transfer
					this._createTransferBatch(timesheetNoTransfer);
				} else {
					this._createDuplicateExpense(arrayTimesheet);
				}
			} else {
				if (!this.DialogChooseTimesheetForExpense) {
					this.DialogChooseTimesheetForExpense = sap.ui.xmlfragment("ttimesheetproject2.view.fragment.DialogChooseTimesheetForExpense",
						this);
					this.getView().addDependent(this.DialogChooseTimesheetForExpense);
				}
				this.DialogChooseTimesheetForExpense.open();
			}
		},

		// dopo l'apertura del dialog di seleziona commessa costruisco il navContainer
		onAfterOpenDialogChooseTimesheet: function () {
			var nav = this._getById("idNavContainerDialogChooseTimesheeet");
			nav.removeAllPages();
			_.forEach(this.arrayMultiTimesheet, _.bind(function (items) {
				var p = new sap.m.Page({
					showHeader: false
				});
				nav.addPage(p);
				var list = new sap.m.List();
				list.setHeaderText(items[0].workDate);
				list.setMode("MultiSelect");
				list.attachSelectionChange(_.bind(this.pressSelectChooseTimesheet, this));
				items = _.orderBy(items, "descriptionProject", "descriptionWbs");
				for (var i = 0; i < items.length; i++) {
					list.addItem(new sap.m.StandardListItem({
						"title": items[i].descriptionWbs,
						"description": items[i].descriptionActivity,
						"info": items[i].timeSheetRecord
					}));
				}
				p.addContent(list);
			}, this));
			this.counter = this.arrayMultiTimesheet.length;
			if (this.arrayMultiTimesheet.length === 1) {
				this.uiModel.setProperty("/confirmButtonChooseTimesheet", true);
				this.uiModel.setProperty("/nextButtonChooseTimesheet", false);
			} else {
				this.uiModel.setProperty("/confirmButtonChooseTimesheet", false);
				this.uiModel.setProperty("/nextButtonChooseTimesheet", true);
			}
			this.chooseTimesheet = [];
		},

		// selezionando o deselezionando una commessa la aggiungo/tolgo dall'array
		pressSelectChooseTimesheet: function (evt) {
			var parameters = evt.getParameters();
			var item = parameters.listItem;
			var idTimesheet = item.getProperty("info");
			var timesheet = _.find(this.timesheetModel.getProperty("/timesheet"), {
				timeSheetRecord: idTimesheet
			});
			if (item.isSelected()) {
				this.arrayTimesheet.push(timesheet);
			} else {
				_.remove(this.arrayTimesheet, timesheet);
			}
		},

		// funzione per cambiare la pagina (giorno) per la scelta della commesse
		onPressNextPage: function () {
			var nav = this._getById("idNavContainerDialogChooseTimesheeet");
			var page = nav.getCurrentPage();
			var list = page.getContent()[0];
			if (!list.getSelectedItems().length) {
				sap.m.MessageToast.show(this._getLocalText("selectOnce"), {
					duration: 3000,
					at: "center center"
				});
				return;
			}
			this.counter--;
			var id = page.getId();
			var index = parseInt(id.substr(id.length - 1, id.length));
			if (this.counter === 1) {
				this.uiModel.setProperty("/confirmButtonChooseTimesheet", true);
				this.uiModel.setProperty("/nextButtonChooseTimesheet", false);
			}
			var prefix = id.substr(0, id.length - 1);
			nav.to(prefix + (index + 1), "slide");
		},

		// funzione che chiude il dialog dopo ever scelto l'ultima commessa
		onPressConfirmChooseTimesheet: function () {
			var nav = this._getById("idNavContainerDialogChooseTimesheeet");
			var page = nav.getCurrentPage();
			var list = page.getContent()[0];
			if (!list.getSelectedItems().length) {
				sap.m.MessageToast.show(this._getLocalText("selectOnce"), {
					duration: 3000,
					at: "center center"
				});
				return;
			}
			this.DialogChooseTimesheetForExpense.close();
			var timesheetNoTransfer = _.remove(this.arrayTimesheet, {
				"transfer": ""
			});
			if (timesheetNoTransfer.length) {
				// batch transfer
				this._createTransferBatch(timesheetNoTransfer);
			} else {
				this._createDuplicateExpense(this.arrayTimesheet);
			}
		},

		// crea un array di trasferte per la creazione multipla
		_createTransferBatch: function (timesheetNoTransfer) {
			this.openDialogBusy(this._getLocalText("saveTransfer"));
			// create trasferta
			this.trips = [];
			var user = this.getModel("userModel").getProperty("/userDetail");
			var personWork = _.find(this.getModel("userModel").getProperty("/userDetail").persWork, function (item) {
				var data = this.selectedDate ? this.selectedDate : this._getById("idExpenseCalendar").getSelectedDates()[0].getStartDate();
				var initDate = new Date(item.startDate);
				var endDate = new Date(item.endDate);
				if (initDate < data && endDate > data) {
					return item;
				}
			}.bind(this));

			for (var q = 0; q < timesheetNoTransfer.length; q++) {
				var dateTimesheet = timesheetNoTransfer[q].workDate;
				var day = dateTimesheet.split("/")[0];
				var month = dateTimesheet.split("/")[1];
				var year = dateTimesheet.split("/")[2];
				var dateInJavascriptFormat = new Date(year + "/" + month + "/" + day);
				dateInJavascriptFormat = dateInJavascriptFormat.setHours(12);
				var paramCreateTransfer = {
					"ID_TRASFERTA": 1,
					"ID_DIPENDENTE": user.cid,
					"ID_TIMESHEET": timesheetNoTransfer[q].timeSheetRecord,
					"ID_WBS": encodeURIComponent(timesheetNoTransfer[q].WBS),
					"CHIAVE_TRASFERTA": personWork.chiaveTrasferta,
					"SOCIETA": personWork.companyCode,
					"DATA_INIZIO": "\/Date(" + dateInJavascriptFormat + ")\/",
					"DATA_FINE": "\/Date(" + dateInJavascriptFormat + ")\/",
					"STATO_APPROVAZIONE": "DA_APPROVARE",
					// mi prendo l'utente loggato perché il cid da salvare dentro 'CREATO_DA' dev'essere quello di chi è loggato
					"CREATO_DA": StorageService.sessionGet("userInfo").userDetail.cid,
					"DATA_CREAZIONE": "\/Date(" + dateInJavascriptFormat + ")\/"
				};
				this.trips.push(paramCreateTransfer);
			}
			this._batchCreateTransfer(-1);
		},

		// batch per la creazione delle trasferte
		_batchCreateTransfer: function (i) {
			i++;
			if (this.trips[i]) {
				oData.createTransfer(this.trips[i], function (result) {
					// rilettura timesheet
					var cid = this.getModel("userModel").getProperty("/userDetail").cid;
					var timesheetRecord = result.ID_TIMESHEET;
					oData.getTimesheetById(cid, timesheetRecord, function (ris) {
						if (!ris[0]) {
							// e se non trova il timesheet
							this.closeDialogBusy();
							return;
						} else {
							var obj = _.find(this.timesheetModel.getProperty("/timesheet"), {
								timeSheetRecord: ris[0].timeSheetRecord
							});
							obj.transfer = ris[0].trasfertaHanaDetails;
							this.arrayTimesheet.push(obj);
							this._batchCreateTransfer(i);
						}
						this._getById("idTableExpenses").removeSelections();
					}.bind(this), function (error) {
						// ERRORE
						this.closeDialogBusy();
					}.bind(this));
				}.bind(this), function (err) {
					this.closeDialogBusy();
					// console.log(err);
				}.bind(this));
			} else {
				this.closeDialogBusy();
				this._createDuplicateExpense(this.arrayTimesheet);
			}
		},

		// funzione che crea l'array di spese da creare in batch
		_createDuplicateExpense: function (arrayTimesheet) {
			this.openDialogBusy(this._getLocalText("saveExpenses"));
			this.expenseToSave = [];
			var idExpense = 0;
			for (var w = 0; w < arrayTimesheet.length; w++) {
				var tm = arrayTimesheet[w];
				if (!tm.expenses.length) {
					idExpense = 0;
				} else {
					var maxIdExpense = _.maxBy(this.timesheetModel.getProperty("/timesheetByDate")[0].expenses, function (o) {
						if (parseInt(o.idSpesa)) {
							return parseInt(o.idSpesa);
						}
					});
					idExpense = maxIdExpense ? parseInt(maxIdExpense.idSpesa) : 0;
				}
				for (var q = 0; q < this.arrayExpensesSelected.length; q++) {
					idExpense++;
					var dateToSave = new Date(tm.transfer.dataInizio);
					var vehicleType = this.arrayExpensesSelected[q].tipoVeicolo;
					var vehicleClass = this.arrayExpensesSelected[q].classeVeicolo;
					if (this.arrayExpensesSelected[q].idTipoSpesa === "14") {
						var vehicleObj = this._getVehicleClassByDate(dateToSave);
						if (vehicleObj.error) {
							this.closeDialogBusy();
							MessageBox.error(vehicleObj.error);
							return;
						} else {
							vehicleType = vehicleObj.vehicleType;
							vehicleClass = vehicleObj.vehicleClass;
						}
					}
					var ex = {
						"ID": 1,
						"ID_SPESA": (idExpense).toString(),
						"ID_TRASFERTA": tm.transfer.idTrasferta,
						"ID_TIPO_SPESA": this.arrayExpensesSelected[q].idTipoSpesa,
						"DATA_SPESA": "\/Date(" + dateToSave.getTime() + ")\/",
						"IMPORTO": this.arrayExpensesSelected[q].importo,
						"IMPORTO_RIMBORSABILE": this.arrayExpensesSelected[q].importoRimborsabile,
						"KM": this.arrayExpensesSelected[q].km,
						"KM_RIMBORSABILE": this.arrayExpensesSelected[q].kmRimborsabile,
						"TIPO_VEICOLO": vehicleType,
						"CLASSE_VEICOLO": vehicleClass,
						"LOCALITA": this.arrayExpensesSelected[q].localita,
						"LOCALITA_A": this.arrayExpensesSelected[q].localitaA ? this.arrayExpensesSelected[q].localitaA : "",
						"NOTA": this.arrayExpensesSelected[q].nota,
						// mi prendo l'utente loggato perché il cid da salvare dentro 'CREATO_DA' dev'essere quello di chi è loggato
						"CREATO_DA": StorageService.sessionGet("userInfo").userDetail.cid,
						"DATA_CREAZIONE": "\/Date(" + dateToSave.getTime() + ")\/"
					};
					this.expenseToSave.push(ex);
				}
			}
			this._batchSaveExpense(-1);
		},

		// batch creazione spese
		_batchSaveExpense: function (i) {
			i++;
			if (this.expenseToSave[i]) {
				oData.createExpense(this.expenseToSave[i], function (result) {
					this._batchSaveExpense(i);
				}.bind(this), function (err) {
					MessageBox.error(JSON.parse(err.response.body).error.message.value);
					// console.log(err);
					this.closeDialogBusy();
				}.bind(this));
			} else {
				this.dialogDuplicateExpense.close();
			}
		},

		// rilettura di tutta la settimana 
		onAfterCloseDialog: function () {
			var setPage = true;
			this.closeDialogBusy();
			this.showErrorTsNotWorked(setPage);
		},

		showErrorTsNotWorked: function (setPage) {
			var errorMsg = "";
			if (this.allErrorsTs && this.allErrorsTs.length) {
				this.allErrorsTs = _.orderBy(this.allErrorsTs, function (n) {
					return formatter.dateFromStringToDateValue(n.workDate);
				});
				errorMsg = this._getLocalText("saveingFailedOn") + "\n";
				for (var i = 0; i < this.allErrorsTs.length; i++) {
					var ts = this.allErrorsTs[i];
					errorMsg += ts.workDate;
					if (i !== this.allErrorsTs.length - 1) {
						errorMsg += ", ";
					} else {
						errorMsg += ":\n";
						errorMsg += this._getLocalText("expensesPeriodIsClosed");
					}
				}
				this.allErrorsTs = [];
				if (setPage) {
					MessageBox.error(errorMsg, {
						"onClose": _.bind(this._afterCloseDialog, this)
					});
				} else {
					MessageBox.error(errorMsg);
				}
				var dialog = sap.ui.getCore().getElementById("idCalendarDialog");
				if (dialog && dialog.isOpen() && dialog.getBusy()) {
					dialog.setBusy(false);
				}
			} else {
				this._afterCloseDialog();
			}
		},

		_afterCloseDialog: function () {
			this.openDialogBusy(this._getLocalText("loadingPage"));
			this._getById("idTableExpenses").removeSelections();
			// la seguente variabile mi permette di ricaricare la tabella delle spese nel caso in cui abbia duplicato una spesa nel giorno in cui mi trovo
			this.rechargeExpenses = true;
			this._getTimesheet(this.startDate, this.endDate);
		},

		_startFocusSituasion: function () {
			setTimeout(_.bind(this.enableOEPTabNavigation, this), 100);
			var inputIdToFocus = "idSelectExpenseCategory";
			setTimeout(_.bind(this.focusOn, this, inputIdToFocus), 500);
		},

		enableOEPTabNavigation: function () {
			var that = this;
			var qtyInputs = $(":input:visible");
			$.each(qtyInputs, _.bind(function (i, el) {
				$(el).on("keydown", function (oEvent) {
					if (oEvent.keyCode === 13) {
						return null;
						oEvent.preventDefault();
					}
					if (oEvent.keyCode === 9) {
						oEvent.preventDefault();
						if (!qtyInputs[i].id.split("expense--")[1] || !qtyInputs[i].id.split("expense--")[1].split("-inner")[0]) {
							return;
						}
						var idInputAttuale = qtyInputs[i].id.split("expense--")[1].split("-inner")[0];
						var backInput, nextInput;
						switch (idInputAttuale) {
							case "idSelectExpenseCategory":
								backInput = "idInputNote";
								nextInput = that.expenseToSaveModel.getProperty("/expenseCategory") === "14" ? "idInputKm" : "idInputAmount";
								break;
							case "idInputAmount":
								backInput = "idSelectExpenseCategory";
								nextInput = "idInputPlace";
								break;
							case "idInputKm":
								backInput = "idSelectExpenseCategory";
								nextInput = "idInputFrom";
								break;
							case "idInputFrom":
								backInput = "idInputKm";
								nextInput = "idButtonInvertPlaces";
								break;
							case "idButtonInvertPlaces":
								backInput = "idInputFrom";
								nextInput = "idInputTo";
								break;
							case "idInputTo":
								backInput = "idButtonInvertPlaces";
								nextInput = "idInputNote";
								break;
							case "idSelectVehicleType":
								backInput = "idInputTo";
								nextInput = "idInputNote";
								break;
							case "idInputPlace":
								backInput = "idInputAmount";
								nextInput = "idInputNote";
								break;
							case "idInputNote":
								backInput = that.expenseToSaveModel.getProperty("/expenseCategory") === "14" ? "idInputTo" : "idInputPlace";
								nextInput = "idSelectExpenseCategory";
								break;
						}
						var inputIdToFocus = oEvent.shiftKey ? backInput : nextInput;
						setTimeout(function () {
							that.focusOn(inputIdToFocus);
						}, 1);
					}
				});
			}, that));
		},

		focusOn: function (inputIdToFocus) {
			var objToFocus = $("[id*=" + inputIdToFocus + "]:input");
			objToFocus.focus();
			objToFocus.select();
		}
	});
});