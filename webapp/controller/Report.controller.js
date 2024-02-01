sap.ui.define([
	"timesheetproject2/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"../model/oDataRequest",
	"../utils/TimesheetSerializer",
	"../model/StorageService",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, formatter, oData, TimesheetSerializer, StorageService, MessageBox) {
	"use strict";

	return BaseController.extend("timesheetproject2.controller.Report", {
		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */

		onInit: function () {
			var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			this.getRouter()
				.getRoute("report")
				.attachPatternMatched(this._reportMatched, this);

			this.activityModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.activityModel, "activityModel");
			var modelloJSON = new JSONModel();
			this.getView().setModel(modelloJSON, "activityModel");

			this.expenseModel = modelloJSON;
			this.getView().setModel(this.expenseModel, "expenseModel");

			this.enableReportModel = modelloJSON;
			this.getView().setModel(this.enableReportModel, "enableReportModel");
			this._setPage();
		},



		_reportMatched: function (evt) {
			// var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			// this.oDate = oStore.get("id");
			// if (!this.oDate.EMAIL_UTENTE) {
			// 	history.go(-1);
			// }
			//RICHIAMARE L'UTENTE LOGGATO
			var userInfo = sap.ushell.Container.getService('UserInfo')
			var email = userInfo.getEmail();
			this.getUser = [];
			var that = this;
			var obj = {
				EMAIL_UTENTE : email
			  };
			
			  this.oDate = null;
	  
			  //UTENTE TECHNIS
			//   if (this.oDate != null && this.oDate != "") {
			// 	var name = this.oDate.NOME_UTENTE;
			// 	var surname = this.oDate.COGNOME_UTENTE;
			// 	var that = this;
			// 	jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 	  jQuery.proxy(function () {
			// 		var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// 		that.makeAjaxRequest(
			// 		  sUrl + `Anagrafica_Utenti?$filter=COGNOME_UTENTE eq '${surname}' and NOME_UTENTE eq '${name}'`,
			// 		  function (data) {
			// 			// Handle success for Anagrafica_Utenti
			// 			that.getUser = data.value;
			// 		  }.bind(this),
			// 		  function (error) {
			// 			// Handle error for Anagrafica_Utenti
			// 			// console.log("Error in Anagrafica_Utenti: ", error);
			// 			sap.ui.core.BusyIndicator.hide();
			// 		  }.bind(this)
			// 		);
		
			// 		that.makeAjaxRequest(
			// 		  sUrl + `Associazione_Commessa_Utente?$filter=ID_UTENTE_ID_UTENTE eq '${this.getUser[0].ID_UTENTE}'`,
			// 		  function (data) {
			// 			// Handle success for Anagrafica_Utenti
			// 			that.assign = data.value;
			// 		  }.bind(this),
			// 		  function (error) {
			// 			// Handle error for Anagrafica_Utenti
			// 			// console.log("Error in Associazione_Commessa_Utente: ", error);
			// 			sap.ui.core.BusyIndicator.hide();
			// 		  }.bind(this)
			// 		);
			// 	  }, this)
			// 	);
  
			//   for (var g = 0; g < this.getUser.length; g++) {
			// 	  if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
  
			// 		  this.openDialogBusy(this._getLocalText("loadingPage"));
  
			// 		  var startDateJ = new Date(this.startDate);
			// 		  var endDateJ = new Date(this.endDate);
			// 		  var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
			// 			  pattern: "yyyy-MM-dd",
			// 		  });
			// 		  var startDateString = targetDateFormat.format(new Date(startDateJ));
			// 		  var endDateString = targetDateFormat.format(new Date(endDateJ));
  
			// 		  var annoinizio = parseFloat(startDateString);
			// 		  var meseinizio = parseFloat(startDateString[5] + startDateString[6]);
			// 		  var gironoinizio = parseFloat(startDateString[8] + startDateString[9]);
		  
			// 		  var annofine = parseFloat(endDateString);
			// 		  var mesefine = parseFloat(endDateString[5] + endDateString[6]);
			// 		  var gironofine = parseFloat(endDateString[8] + endDateString[9]);
		  
  
  
  
  
  
			// 		  var modelloJSON = new JSONModel();
			// 		  this.getView().setModel(modelloJSON, "activityModel");
			// 		  this.getView()
			// 			  .getModel("activityModel")
			// 			  .setProperty("/timesheetSum", []);
			// 		  var act = this.getView().getModel("activityModel");
			// 		   this.activityReport = [];
			// 		   var obj = {
			// 			  DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
			// 			};
			// 		   that=this;
			// 		  jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 			  jQuery.proxy(function () {
			// 				  var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
  
			// 				  jQuery.ajax({
			// 					  url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
  
			// 						  that.activityReport = oData.value;
			// 						//   console.log(activityReport);
			// 					  },
			// 					  error: function (error) {
			// 						  act.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 			  }, this)
			// 		  );
			// 		  var legendData = [];
			// 		  var ore = 0;
			// 		  var overtime = 0
			// 		  var getActivityId =  this.activityReport.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
			// 		  for (var i = 0; i < getActivityId.length; i++) {
  
			// 			  if (
			// 				  startDateString <= getActivityId[i].DATA_ATTIVITA &&
			// 				  getActivityId[i].DATA_ATTIVITA <= endDateString
			// 			  ) {
  
  
			// 				  var modl = {};
  
			// 				  modl.project = getActivityId[i].CODICE_COMMESSA;
			// 				  modl.totalWorkHours = getActivityId[i].ORE_LAVORATE;
			// 				  modl.overtime = getActivityId[i].OVERTIME;
			// 				  legendData.push(modl);
			// 			  }
			// 		  }
			// 		  var activitiesByProject = _.groupBy(_.cloneDeep(legendData), "totalWorkHours");
  
			// 		  // act.setProperty("/timesheetSum", legendData);
			// 		  this._setActivitiesTables(legendData);
			// 		  this.getView().setModel(modelloJSON, "activityModel");
			// 		  this.getView()
			// 			  .getModel("activityModel")
			// 			  .setProperty("/timesheetList", []);
			// 		  var tim = this.getView().getModel("activityModel");
			// 		  var timesheetTable = [];
			// 		  var tipoSpesa = [];
			// 		  var luogo = [];
			// 		  var stato = [];
			// 		  var obj = {
			// 			  DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
			// 			};
			// 			var spese = [];
			// 			for(var s = 0; s<this.activityReport.length; s++){              
			// 			 spese.push(this.activityReport[s].ID);
			// 			}
			
			// 			var filter = spese.map(function(num) {
			// 			  return `ACTIVITY_ID eq ${num}`;
			// 			}).join(" or ");
			// 		  jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 			  jQuery.proxy(function () {
			// 				  var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
  
			// 				  jQuery.ajax({
			// 					  url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
  
			// 						  timesheetTable = oData.value;
			// 						//   console.log(timesheetTable);
			// 					  },
			// 					  error: function (error) {
			// 						  tim.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 				  jQuery.ajax({
			// 					  url: sUrl + `TipoSpesaSet?$filter=${filter}`,
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
  
			// 						  tipoSpesa = oData.value;
			// 						//   console.log(tipoSpesa);
			// 					  },
			// 					  error: function (error) {
			// 						  tim.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 				  jQuery.ajax({
			// 					  url: sUrl + "Luogo_Lavoro",
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
			// 						  luogo = oData.value;
			// 						//   console.log(luogo);
			// 					  },
			// 					  error: function (error) {
			// 						  tim.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
  
			// 				  jQuery.ajax({
			// 					  url: sUrl + "Stato_Commessa",
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
			// 						  stato = oData.value;
			// 						//   console.log(stato);
			// 					  },
			// 					  error: function (error) {
			// 						  tim.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 			  }, this)
			// 		  );
			// 		  this.tipoSpesa = tipoSpesa;
			// 		  var TableData = [];
			// 		  // var getActivityId = timesheetTable.filter((x) => x.DESCRIZIONE_BUTTON == this.oDate.ID_UTENTE)
			// 		  for (var i = 0; i < getActivityId.length; i++) {
			// 			  if (
			// 				  startDateString <= getActivityId[i].DATA_ATTIVITA &&
			// 				  getActivityId[i].DATA_ATTIVITA <= endDateString
			// 			  ) {
			// 				  // for (var y = 0; y < tipoSpesa.length; y++) {
  
			// 				  for (var a = 0; a < luogo.length; a++) {
			// 					  for (var b = 0; b < stato.length; b++) {
			// 						  if
			// 							  ((getActivityId[i].UBICAZIONE_ID == luogo[a].ID) && (getActivityId[i].STATO_COMMESSA_ID == stato[b].ID)) {
			// 							  var table = {};
			// 							  table.workDate = formatter.formatDate(
			// 								  getActivityId[i].DATA_ATTIVITA
			// 							  );
			// 							  table.descriptionProject = getActivityId[i].DESCRIZIONE;
			// 							  table.WBS = getActivityId[i].CODICE_COMMESSA;
			// 							  table.workHours = getActivityId[i].ORE_LAVORATE;
			// 							  table.billDescription = getActivityId[i].FATTURAZIONE_FLAG;
			// 							  table.notes = getActivityId[i].NOTES;
			// 							  table.officeDescription = luogo[a].Luogo;
			// 							  table.statusId = stato[b].Stato;
			// 							  TableData.push(table);
			// 						  }
			// 					  }
			// 				  }
			// 				  // }
			// 			  }
			// 		  }
			// 		  tim.setProperty("/timesheetList", TableData);
  
			// 		  this.getView().setModel(modelloJSON, "expenseModel");
			// 		  this.getView()
			// 			  .getModel("expenseModel")
			// 			  .setProperty("/expensesList", []);
			// 		  var exs = this.getView().getModel("expenseModel");
			// 		  var ActivitySet = [];
			// 		  var TipoSpesaSet = [];
			// 		  var material = [];
			// 		  var RimborsoSet = [];
			// 		  var LuogoLavoro = [];
			// 		  var obj = {
			// 			  DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
			// 			};
			// 			var spese = [];
			// 			for(var s = 0; s<this.activityReport.length; s++){              
			// 			 spese.push(this.activityReport[s].ID);
			// 			}
			
			// 			var filter = spese.map(function(num) {
			// 			  return `ACTIVITY_ID eq ${num}`;
			// 			}).join(" or ");
			// 		  jQuery.when(this.oInitialLoadFinishedDeferred).then(
			// 			  jQuery.proxy(function () {
			// 				  var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
  
			// 				  jQuery.ajax({
			// 					  url: sUrl +  `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
  
			// 						  ActivitySet = oData.value;
			// 						//   console.log(ActivitySet);
			// 					  },
			// 					  error: function (error) {
			// 						  exs.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 				  jQuery.ajax({
			// 					  url: sUrl + `TipoSpesaSet?$filter=${filter}`,
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
			// 						  TipoSpesaSet = oData.value;
			// 						//   console.log(TipoSpesaSet);
			// 					  },
			// 					  error: function (error) {
			// 						  exs.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 				  jQuery.ajax({
			// 					  url: sUrl + "Luogo_Lavoro",
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
			// 						  LuogoLavoro = oData.value;
			// 						//   console.log(LuogoLavoro);
			// 					  },
			// 					  error: function (error) {
			// 						  exs.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 				  jQuery.ajax({
			// 					  url: sUrl + "RimborsoSet",
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
  
			// 						  RimborsoSet = oData.value;
			// 						//   console.log(RimborsoSet);
			// 					  },
			// 					  error: function (error) {
			// 						  exs.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 				  jQuery.ajax({
			// 					  url: sUrl + "Anagrafica_Materiale",
			// 					  type: "GET",
			// 					  dataType: 'json',
			// 					  success: function (oData, oResponse) {
			// 						  // var myData = oData.value;
			// 						  material = oData.value;
			// 						//   console.log(material);
			// 					  },
			// 					  error: function (error) {
			// 						  exs.setProperty("/idTable", []);
			// 						//   console.log("Err magazzino");
			// 						  sap.ui.core.BusyIndicator.hide();
			// 					  },
			// 					  async: false,
			// 				  });
			// 			  }, this)
			// 		  );
			// 		  var listData = [];
  
  
			// 		  for (var y = 0; y < getActivityId.length; y++) {
			// 			  if (
			// 				  startDateString <= getActivityId[y].DATA_ATTIVITA &&
			// 				  getActivityId[y].DATA_ATTIVITA <= endDateString
			// 			  ) {
			// 				  for (var i = 0; i < TipoSpesaSet.length; i++) {
			// 					  if (tipoSpesa[i].ACTIVITY_ID === getActivityId[y].ID) {
			// 						  for (var b = 0; b < LuogoLavoro.length; b++) {
			// 							  if (getActivityId[y].UBICAZIONE_ID == LuogoLavoro[b].ID) {
			// 								  var list = {};
			// 								  list.idSpesa = TipoSpesaSet[i].ACTIVITY_ID;
			// 								  list.dataSpesa = formatter.formatDate(getActivityId[y].DATA_ATTIVITA)
			// 								  list.descriptionProject = getActivityId[y].CODICE_COMMESSA;
			// 								  list.WBS = getActivityId[y].CODICE_COMMESSA;
			// 								  list.expenseType = TipoSpesaSet[i].TIPO_SPESA;
			// 								  list.place = LuogoLavoro[b].Luogo;
			// 								  list.importo = TipoSpesaSet[i].SPESA;
			// 								  list.km = TipoSpesaSet[i].KM;
			// 								  listData.push(list);
			// 							  }
			// 						  }
			// 					  }
			// 				  }
			// 			  }
			// 		  }
			// 		  this._setExpensesTables(listData);
			// 		  exs.setProperty("/expensesList", listData);
			// 		  // this._setPage();
			// 		  this._getById("idActivitiesBar").setSelectedItem(
			// 			  this._getById("idActivitiesBar").getItems()[0]
			// 		  );
			// 		  this.closeDialogBusy();
			// 		  // var sessionUserModel = StorageService.sessionGet("userModel");
			// 		  // if (!sessionUserModel) {
			// 		  //  this._getUserInfo();
			// 		  // } else {
			// 		  //  var userModel = new sap.ui.model.json.JSONModel();
			// 		  //  this.getView().setModel(userModel, "userModel");
			// 		  //  this.getModel("userModel").setData(sessionUserModel);
			// 		  //  jQuery.sap.delayedCall(200, this, function () {
			// 		  //      this._setPage();
			// 		  //  });
			// 		  // }
			// 		  jQuery.sap.delayedCall(2000, this, function () {
			// 			  this.closeDialogBusy();
			// 			});
			// 	  }
  
			//   }
			//   }else{
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
						//  console.log("Error in Anagrafica_Utenti: ", error);
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
						//  console.log("Error in Associazione_Commessa_Utente: ", error);
						 sap.ui.core.BusyIndicator.hide();
					   }.bind(this)
					 );
				   }, this)
				 );
   
			   for (var g = 0; g < this.getUser.length; g++) {
				   if (this.getUser[g].EMAIL_UTENTE === email) {
   
					   this.openDialogBusy(this._getLocalText("loadingPage"));
   
					   var startDateJ = new Date(this.startDate);
					   var endDateJ = new Date(this.endDate);
					   var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
						   pattern: "yyyy-MM-dd",
					   });
					   var startDateString = targetDateFormat.format(new Date(startDateJ));
					   var endDateString = targetDateFormat.format(new Date(endDateJ));
   
					   var annoinizio = parseFloat(startDateString);
					   var meseinizio = parseFloat(startDateString[5] + startDateString[6]);
					   var gironoinizio = parseFloat(startDateString[8] + startDateString[9]);
		   
					   var annofine = parseFloat(endDateString);
					   var mesefine = parseFloat(endDateString[5] + endDateString[6]);
					   var gironofine = parseFloat(endDateString[8] + endDateString[9]);
		   
   
   
   
					   if(mesefine <= 9){
						var act = this.getView().getModel("activityModel");
						this.activityReport = [];
						var obj = {
						   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
						 };
						that=this;
					   jQuery.when(this.oInitialLoadFinishedDeferred).then(
						   jQuery.proxy(function () {
							   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
   
							   jQuery.ajax({
								   url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + gironofine}`,
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
   
									   that.activityReport = oData.value;
									//    console.log(activityReport);
								   },
								   error: function (error) {
									   act.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
						   }, this)
					   );
					   }else {
						var act = this.getView().getModel("activityModel");
						this.activityReport = [];
						var obj = {
						   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
						 };
						that=this;
					   jQuery.when(this.oInitialLoadFinishedDeferred).then(
						   jQuery.proxy(function () {
							   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
   
							   jQuery.ajax({
								   url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
   
									   that.activityReport = oData.value;
									//    console.log(activityReport);
								   },
								   error: function (error) {
									   act.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
						   }, this)
					   );	
					
					   }
   
					   var modelloJSON = new JSONModel();
					   this.getView().setModel(modelloJSON, "activityModel");
					   this.getView()
						   .getModel("activityModel")
						   .setProperty("/timesheetSum", []);
					   var legendData = [];
					   var ore = 0;
					   var overtime = 0
					   var getActivityId =  this.activityReport.filter((x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE)
					   for (var i = 0; i < getActivityId.length; i++) {
   
						   if (
							   startDateString <= getActivityId[i].DATA_ATTIVITA &&
							   getActivityId[i].DATA_ATTIVITA <= endDateString
						   ) {
   
   
							   var modl = {};
   
							   modl.project = getActivityId[i].CODICE_COMMESSA;
							   modl.totalWorkHours = getActivityId[i].ORE_LAVORATE;
							   modl.overtime = getActivityId[i].OVERTIME;
							   legendData.push(modl);
						   }
					   }
					   var activitiesByProject = _.groupBy(_.cloneDeep(legendData), "totalWorkHours");
   
					   // act.setProperty("/timesheetSum", legendData);
					   this._setActivitiesTables(legendData);
					   this.getView().setModel(modelloJSON, "activityModel");
					   this.getView()
						   .getModel("activityModel")
						   .setProperty("/timesheetList", []);
					   var tim = this.getView().getModel("activityModel");
					   var timesheetTable = [];
					   var tipoSpesa = [];
					   var luogo = [];
					   var stato = [];
					   var obj = {
						   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
						 };


						 
						 if(mesefine <= 9){
							var act = this.getView().getModel("activityModel");
							this.activityReport = [];
							var obj = {
							   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
							 };
							that=this;
						   jQuery.when(this.oInitialLoadFinishedDeferred).then(
							   jQuery.proxy(function () {
								   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	   
								   jQuery.ajax({
									   url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + gironofine}`,
									   type: "GET",
									   dataType: 'json',
									   success: function (oData, oResponse) {
										   // var myData = oData.value;
	   
										   timesheetTable = oData.value;
										//    console.log(activityReport);
									   },
									   error: function (error) {
										   act.setProperty("/idTable", []);
										//    console.log("Err magazzino");
										   sap.ui.core.BusyIndicator.hide();
									   },
									   async: false,
								   });
							   }, this)
						   );
						   }else {
							var act = this.getView().getModel("activityModel");
							this.activityReport = [];
							var obj = {
							   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
							 };
							that=this;
						   jQuery.when(this.oInitialLoadFinishedDeferred).then(
							   jQuery.proxy(function () {
								   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	   
								   jQuery.ajax({
									   url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
									   type: "GET",
									   dataType: 'json',
									   success: function (oData, oResponse) {
										   // var myData = oData.value;
	   
										   timesheetTable = oData.value;
										//    console.log(activityReport);
									   },
									   error: function (error) {
										   act.setProperty("/idTable", []);
										//    console.log("Err magazzino");
										   sap.ui.core.BusyIndicator.hide();
									   },
									   async: false,
								   });
							   }, this)
						   );	
						
						   }

						 var spese = [];
						 for(var s = 0; s<this.activityReport.length; s++){              
						  spese.push(this.activityReport[s].ID);
						 }
			 
						 var filter = spese.map(function(num) {
						   return `ACTIVITY_ID eq ${num}`;
						 }).join(" or ");
					   jQuery.when(this.oInitialLoadFinishedDeferred).then(
						   jQuery.proxy(function () {
							   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
   
							//    jQuery.ajax({
							// 	   url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
							// 	   type: "GET",
							// 	   dataType: 'json',
							// 	   success: function (oData, oResponse) {
							// 		   // var myData = oData.value;
   
							// 		   timesheetTable = oData.value;
							// 		//    console.log(timesheetTable);
							// 	   },
							// 	   error: function (error) {
							// 		   tim.setProperty("/idTable", []);
							// 		//    console.log("Err magazzino");
							// 		   sap.ui.core.BusyIndicator.hide();
							// 	   },
							// 	   async: false,
							//    });
							   jQuery.ajax({
								   url: sUrl + `TipoSpesaSet?$filter=${filter}`,
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
   
									   tipoSpesa = oData.value;
									//    console.log(tipoSpesa);
								   },
								   error: function (error) {
									   tim.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
							   jQuery.ajax({
								   url: sUrl + "Luogo_Lavoro",
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
									   luogo = oData.value;
									//    console.log(luogo);
								   },
								   error: function (error) {
									   tim.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
   
							   jQuery.ajax({
								   url: sUrl + "Stato_Commessa",
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
									   stato = oData.value;
									   console.log(stato);
								   },
								   error: function (error) {
									   tim.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
						   }, this)
					   );
					   this.tipoSpesa = tipoSpesa;
					   var TableData = [];
					   // var getActivityId = timesheetTable.filter((x) => x.DESCRIZIONE_BUTTON == this.oDate.ID_UTENTE)
					   for (var i = 0; i < getActivityId.length; i++) {
						   if (
							   startDateString <= getActivityId[i].DATA_ATTIVITA &&
							   getActivityId[i].DATA_ATTIVITA <= endDateString
						   ) {
							   // for (var y = 0; y < tipoSpesa.length; y++) {
   
							   for (var a = 0; a < luogo.length; a++) {
								   for (var b = 0; b < stato.length; b++) {
									   if
										   ((getActivityId[i].UBICAZIONE_ID == luogo[a].ID) && (getActivityId[i].STATO_COMMESSA_ID == stato[b].ID)) {
										   var table = {};
										   table.workDate = formatter.formatDate(
											   getActivityId[i].DATA_ATTIVITA
										   );
										   table.descriptionProject = getActivityId[i].DESCRIZIONE;
										   table.WBS = getActivityId[i].CODICE_COMMESSA;
										   table.workHours = getActivityId[i].ORE_LAVORATE;
										   table.billDescription = getActivityId[i].FATTURAZIONE_FLAG;
										   table.notes = getActivityId[i].NOTES;
										   table.officeDescription = luogo[a].Luogo;
										   table.statusId = stato[b].Stato;
										   TableData.push(table);
									   }
								   }
							   }
							   // }
						   }
					   }
					   tim.setProperty("/timesheetList", TableData);
   
					   this.getView().setModel(modelloJSON, "expenseModel");
					   this.getView()
						   .getModel("expenseModel")
						   .setProperty("/expensesList", []);
					   var exs = this.getView().getModel("expenseModel");
					   var ActivitySet = [];
					   var TipoSpesaSet = [];
					   var material = [];
					   var RimborsoSet = [];
					   var LuogoLavoro = [];
					   var obj = {
						   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
						 };





						 
						 if(mesefine <= 9){
							var act = this.getView().getModel("activityModel");
							this.activityReport = [];
							var obj = {
							   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
							 };
							that=this;
						   jQuery.when(this.oInitialLoadFinishedDeferred).then(
							   jQuery.proxy(function () {
								   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	   
								   jQuery.ajax({
									   url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' +  mesefine + '-' + gironofine}`,
									   type: "GET",
									   dataType: 'json',
									   success: function (oData, oResponse) {
										   // var myData = oData.value;
	   
										  ActivitySet = oData.value;
										//    console.log(activityReport);
									   },
									   error: function (error) {
										   act.setProperty("/idTable", []);
										//    console.log("Err magazzino");
										   sap.ui.core.BusyIndicator.hide();
									   },
									   async: false,
								   });
							   }, this)
						   );
						   }else {
							var act = this.getView().getModel("activityModel");
							this.activityReport = [];
							var obj = {
							   DESCRIZIONE_BUTTON : this.getUser[g].ID_UTENTE.toString()
							 };
							that=this;
						   jQuery.when(this.oInitialLoadFinishedDeferred).then(
							   jQuery.proxy(function () {
								   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
	   
								   jQuery.ajax({
									   url: sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
									   type: "GET",
									   dataType: 'json',
									   success: function (oData, oResponse) {
										   // var myData = oData.value;
	   
										  ActivitySet = oData.value;
										//    console.log(activityReport);
									   },
									   error: function (error) {
										   act.setProperty("/idTable", []);
										//    console.log("Err magazzino");
										   sap.ui.core.BusyIndicator.hide();
									   },
									   async: false,
								   });
							   }, this)
						   );	
						
						   }




















						 var spese = [];
						 for(var s = 0; s<this.activityReport.length; s++){              
						  spese.push(this.activityReport[s].ID);
						 }
			 
						 var filter = spese.map(function(num) {
						   return `ACTIVITY_ID eq ${num}`;
						 }).join(" or ");
					   jQuery.when(this.oInitialLoadFinishedDeferred).then(
						   jQuery.proxy(function () {
							   var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
   
							//    jQuery.ajax({
							// 	   url: sUrl +  `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
							// 	   type: "GET",
							// 	   dataType: 'json',
							// 	   success: function (oData, oResponse) {
							// 		   // var myData = oData.value;
   
							// 		   ActivitySet = oData.value;
							// 		//    console.log(ActivitySet);
							// 	   },
							// 	   error: function (error) {
							// 		   exs.setProperty("/idTable", []);
							// 		//    console.log("Err magazzino");
							// 		   sap.ui.core.BusyIndicator.hide();
							// 	   },
							// 	   async: false,
							//    });
							   jQuery.ajax({
								   url: sUrl + `TipoSpesaSet?$filter=${filter}`,
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
									   TipoSpesaSet = oData.value;
									//    console.log(TipoSpesaSet);
								   },
								   error: function (error) {
									   exs.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
							   jQuery.ajax({
								   url: sUrl + "Luogo_Lavoro",
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
									   LuogoLavoro = oData.value;
									//    console.log(LuogoLavoro);
								   },
								   error: function (error) {
									   exs.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
							   jQuery.ajax({
								   url: sUrl + "RimborsoSet",
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
   
									   RimborsoSet = oData.value;
									//    console.log(RimborsoSet);
								   },
								   error: function (error) {
									   exs.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
							   jQuery.ajax({
								   url: sUrl + "Anagrafica_Materiale",
								   type: "GET",
								   dataType: 'json',
								   success: function (oData, oResponse) {
									   // var myData = oData.value;
									   material = oData.value;
									//    console.log(material);
								   },
								   error: function (error) {
									   exs.setProperty("/idTable", []);
									//    console.log("Err magazzino");
									   sap.ui.core.BusyIndicator.hide();
								   },
								   async: false,
							   });
						   }, this)
					   );
					   var listData = [];
   
   
					   for (var y = 0; y < getActivityId.length; y++) {
						   if (
							   startDateString <= getActivityId[y].DATA_ATTIVITA &&
							   getActivityId[y].DATA_ATTIVITA <= endDateString
						   ) {
							   for (var i = 0; i < TipoSpesaSet.length; i++) {
								   if (tipoSpesa[i].ACTIVITY_ID === getActivityId[y].ID) {
									   for (var b = 0; b < LuogoLavoro.length; b++) {
										   if (getActivityId[y].UBICAZIONE_ID == LuogoLavoro[b].ID) {
											   var list = {};
											   list.idSpesa = TipoSpesaSet[i].ACTIVITY_ID;
											   list.dataSpesa = formatter.formatDate(getActivityId[y].DATA_ATTIVITA)
											   list.descriptionProject = getActivityId[y].CODICE_COMMESSA;
											   list.WBS = getActivityId[y].CODICE_COMMESSA;
											   list.expenseType = TipoSpesaSet[i].TIPO_SPESA;
											   list.place = LuogoLavoro[b].Luogo;
											   list.importo = TipoSpesaSet[i].SPESA;
											   list.km = TipoSpesaSet[i].KM;
											   listData.push(list);
										   }
									   }
								   }
							   }
						   }
					   }
					   this._setExpensesTables(listData);
					   exs.setProperty("/expensesList", listData);
					   // this._setPage();
					   this._getById("idActivitiesBar").setSelectedItem(
						   this._getById("idActivitiesBar").getItems()[0]
					   );
					   this.closeDialogBusy();
					   // var sessionUserModel = StorageService.sessionGet("userModel");
					   // if (!sessionUserModel) {
					   //  this._getUserInfo();
					   // } else {
					   //  var userModel = new sap.ui.model.json.JSONModel();
					   //  this.getView().setModel(userModel, "userModel");
					   //  this.getModel("userModel").setData(sessionUserModel);
					   //  jQuery.sap.delayedCall(200, this, function () {
					   //      this._setPage();
					   //  });
					   // }
					   jQuery.sap.delayedCall(2000, this, function () {
						   this.closeDialogBusy();
						 });
				   }
   
			   }
			//   }
			 
			 

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
		_setPage: function () {
			// this.openDialogBusy(this._getLocalText("loadingPage"));
			this.enableReportModel.setProperty("/wbsVisible", false);
			// this.actualYear = StorageService.sessionGet("year");
			// this.actualMonth = parseInt(StorageService.sessionGet("month"));
			const date = new Date();
			this.actualYear = date.getFullYear();
			this.actualMonth = date.getMonth() + 1;
			var dataIn = this.actualYear;
			var dtaaFin = this.actualMonth;
			var data = this.getView().getModel("activityModel");
			
			this.activityModel.setProperty(
				"/startDate",
				formatter.formatDate(this.actualYear)
			);
			this.activityModel.setProperty(
				"/endDate",
				formatter.formatDate(this.actualMonth)
			);
			data.setProperty("/startDate", dataIn);
			data.setProperty("/endDate", dtaaFin);
			
			this.startDate = formatter.getFirstDayFromMonth(
				this.actualYear,
				this.actualMonth - 1
			);
			this.endDate = formatter.getLastDayFromMonth(
				this.actualYear,
				this.actualMonth
			);
			// faccio tornare la visualizzazione sulle attività
			this.onActivityPress();
			// this._getExpensesTypes();
		},

		_getExpensesTypes: function () {
			var fSuccess = _.bind(function (result) {
				this.allExpensesTypes = result.results;
				this._getMileageRepayments();
			}, this);

			var fError = _.bind(function () {
				var err = this._getLocalText("oDataReadError");
				this.closeDialogBusy();
				MessageBox.error(err, {
					title: this._getLocalText("oDataError"),
				});
			}, this);
			oData.getExpensesTypes(fSuccess, fError);
		},

		// funzione per lettura dei tipi veicoli
		_getMileageRepayments: function () {
			var url = "/RimborsoKMSet";

			var fSuccess = function (result) {
				this.allMileageRepayments = result.results;
				this._getTimesheet();
			}.bind(this);
			var fError = function (err) {
				err = this._getLocalText("oDataReadError");
				this.closeDialogBusy();
				MessageBox.error(err, {
					title: this._getLocalText("oDataError"),
				});
			}.bind(this);

			oData.getTimeTravelServices(url, "", fSuccess, fError);
		},

		_getTimesheet: function () {
			// chiamata timesheet
			// var fSuccess = _.bind(function (result) {
			//  _.remove(result, function (n) {
			//      return !n.timeSheetDataFieldsDetails.recordedHours;
			//  });
			var timesheetList = this.getView()
				.getModel("activityModel")
				.getProperty("/timesheetSum");
			// var timesheetList = TimesheetSerializer.fromSapItems(result);
			var workLocations = this._getWorkLocations();
			for (var i = 0; i < timesheetList.length; i++) {
				var ts = timesheetList[i];
				// metto la descrizione del luogo con la lingua del browser e non con quella che mi arriva dalla chiamata
				var workLocation = _.find(workLocations, {
					workLocation: ts.workLocation,
				});
				if (workLocation) {
					ts.workLocDescription = workLocation.workLocationDescription;
				}
				var expenses = ts.expenses;
				for (var j = 0; j < expenses.length; j++) {
					var expense = expenses[j];
					expense.dataSpesa = expense.dataSpesa ? formatter.formatDate(expense.dataSpesa) : "";
					expense.descriptionProject = ts.descriptionProject;
					expense.WBS = ts.WBS;
					expense.purchaseOrder = ts.purchaseOrder;
					expense.purchaseOrderItem = ts.purchaseOrderItem;
					expense.descriptionProject = ts.descriptionProject;
					expense.descriptionWbs = ts.descriptionWbs;
					expense.descriptionWorkItem = ts.descriptionWorkItem;
					expense.absenceDescription = ts.absenceDescription;
					var expTypeObj = _.find(this.allExpensesTypes, {
						"ID_TIPO_SPESA": expense.idTipoSpesa
					});
					var expenseType = "";
					var expenseTypeSign = "";
					if (expTypeObj) {
						expenseType = expTypeObj.DESCRIZIONE;
						expenseTypeSign = expTypeObj.TIPO_SPESA;
					}
					expense.expenseType = expenseType;
					expense.expenseTypeSign = expenseTypeSign;
					// aggiungo il rimborso chilometrico
					if (expense.idTipoSpesa === "14") {
						this.mileageRepayment = _.find(this.allMileageRepayments, {
							'CLASSE_VEICOLO': expense.classeVeicolo,
							'TIPO_VEICOLO': expense.tipoVeicolo
						});
						if (!this.mileageRepayment) {
							this.mileageRepayment = {};
							this.mileageRepayment.IMPORTO = 0;
						}
						expense.importo = (parseFloat(expense.km) * parseFloat(this.mileageRepayment.IMPORTO)).toFixed(2);
						expense.localitaDa = expense.localita;
					} else {
						expense.place = expense.localita;
					}
				}
			}
			// this._setActivitiesTables(timesheetList);
			// }, this);
			// var fError = _.bind(function () {
			//  var err = this._getLocalText("errorReadTimesheet");
			//  this.closeDialogBusy();
			//  MessageBox.error(err, {
			//      title: this._getLocalText("oDataError")
			//  });
			// }, this);
			this.activityModel.setProperty(
				"/startDate",
				formatter.formatDate(this.startDate)
			);
			this.activityModel.setProperty(
				"/endDate",
				formatter.formatDate(this.endDate)
			);
			var cid = this._getEmployeeCid();
			// oData.getTimesheet(cid, this.startDate, this.endDate, fSuccess, fError);
		},

		_setActivitiesTables: function (legendData) {


			var activitiesByProject = _.groupBy(
				_.cloneDeep(legendData),
				"project"
			);
			var timesheetSum = [];
			for (var i in activitiesByProject) {
				var rowToAdd;
				if (i) {
					rowToAdd = this._getRowToTimesheetSum(activitiesByProject, i);
				} else {
					var activitiesByWbs = _.groupBy(
						_.cloneDeep(activitiesByProject[i]),
						"project"
					);
					for (var j in activitiesByWbs) {
						rowToAdd = this._getRowToTimesheetSum(activitiesByWbs, j);
					}
				}
				timesheetSum.push(rowToAdd);
			}
			timesheetSum = _.orderBy(timesheetSum, "project");
			var act = this.getView().getModel("activityModel");
			act.setProperty("/timesheetSum", timesheetSum);
			// timesheetList = _.sortBy(timesheetList, function (n) {
			//   var day = n.workDate.split("-")[0];
			//   var month = n.workDate.split("-")[1];
			//   var year = n.workDate.split("-")[2];
			//   return new Date(year, parseInt(month) - 1, day);
			// });
			// this.timesheetList = _.cloneDeep(timesheetList);
			// this._setExpensesTables(timesheetList);
		},

		_getRowToTimesheetSum: function (activitiesByProject, i) {


			var projectActivity = activitiesByProject[i];
			var sumActivity = 0;
			for (var j = 0; j < projectActivity.length; j++) {
				sumActivity += parseFloat(projectActivity[j].totalWorkHours);
			}
			// sumActivity = sumActivity.toFixed(2);
			var activityToPush = {
				project: i,
				totalWorkHours: sumActivity,
			};
			return activityToPush;
		},

		_setExpensesTables: function (listData) {

			var expensesList = [];
			// for (var i = 0; i < listData.length; i++) {
			// 	// var ts = listData[i];
			// 	// var expenses = ts;
			// 	// // for (var j = 0; j < expenses.length; j++) {
			// 	// // 	var expense = expenses[j];
			// 	// // 	expense.descriptionProject = ts.descriptionProject;
			// 	// // 	// expense.absenceDescription = ts.absenceDescription;
			// 	// // }
			// 	// expensesList = expensesList.concat(_.sortBy(expenses, "expenseType"));
			// }
			var groupedExpenses = _.groupBy(listData, "expenseType");
			// definisco le colonne della tabella delle somme
			var columnsSumTable = [];
			var headerColumnsName = [
				// this._getLocalText("day"),
				// this._getLocalText("transfer"),
				this._getLocalText("project"),
				this._getLocalText("tot"),
			];
			var columnObj;
			for (var i = 0; i < headerColumnsName.length - 1; i++) {
				columnObj = {
					columnName: headerColumnsName[i],
				};
				columnsSumTable.push(columnObj);
			}
			for (i in groupedExpenses) {
				// 	var modelloJSON = new JSONModel({});
				// 	this.expenseModel = modelloJSON;
				// this.getView().setModel(this.expenseModel, "expenseModel");
				// 	var expensemodel = this.getModel('expenseModel')
				// var expTypeObj = expensemodel.filter(function (item) {
				// 	return item.idSpesa;
				// });
				// var expTypeObj = _.find( expensemodel , {
				// 	idSpesa: i,
				// });
				var expTypeObj = groupedExpenses[i];
				// for(var i)
				if (expTypeObj) {
					columnObj = {
						columnName: expTypeObj[0].expenseType,
						// columnDescription: expTypeObj.DESCRIZIONE,
					};
					// se c'è la spesa dei chilometri, mostro anche quella di EUR/KM
					if (expTypeObj[0].expenseType === "KM") {
						var columnsKmToAdd = [
							// 		{
							// 			columnName: "EUR/KM",
							// 			columnDescription: "EUR/KM",
							// 		},
							columnObj,
						];
					} else {
						columnsSumTable.push(columnObj);
					}
				}
			}
			if (columnsKmToAdd) {
				// se ci sono dei km, aggiungo alla fine le due colonne
				columnsSumTable = columnsSumTable.concat(columnsKmToAdd);
			}
			// aggiungo la colonna dei totali
			var totalColumnObj = {
				columnName: headerColumnsName[headerColumnsName.length - 1],
			};
			columnsSumTable.push(totalColumnObj);
			// definisco le righe della tabella delle somme
			var rowsSumTable = [];
			// tengo solamente i timesheet che hanno delle spese
			_.remove(listData, function (n) {
				return !n.expenseType.length;
			});
			var total = 0;
			var allExpenses = [];
			var expenses = [];
			// var mileageRepaymentproperty = "EUR/KM";
			var groupListWbs = _.groupBy(listData, "WBS");
			for (var i in groupListWbs) {
				var transferRow = {};
				transferRow[headerColumnsName[0]] = i;
				// transferRow[headerColumnsName[1]] = listData[i].transfer.idTrasferta;
				transferRow[headerColumnsName[2]] = i;
				expenses = groupListWbs[i];
				// allExpenses = allExpenses.concat(_.cloneDeep(expenses));
				groupedExpenses = _.groupBy(expenses, "expenseType");
				var totalRowAmount = 0;
				var totalRowKm = 0;
				for (var j in groupedExpenses) {
					var expensesByType = groupedExpenses[j];
					var totalCellAmount = 0;
					for (var k = 0; k < expensesByType.length; k++) {
						var expense = expensesByType[k];
						if (expense.importo) {
							var amount = parseFloat(expense.importo);
							totalRowAmount += amount;
							totalCellAmount += amount;
							total += amount;
						}
						if (j === "KM") {
							if (expense.km) {
								totalRowKm += parseFloat(expense.km);
							}
						}
					}
					transferRow[j] =
						j === "KM" ? totalRowKm.toString() : totalCellAmount.toFixed(2);

					// totalRowKm = 0;
				}
				if (totalRowKm > 0) {
					// transferRow[mileageRepaymentproperty] = (
					// 	totalRowKm * parseFloat(this.mileageRepayment.IMPORTO)
					// ).toFixed(2);
				}
				transferRow.Tot = totalRowAmount.toFixed(2);
				rowsSumTable.push(transferRow);
				transferRow = {};
				totalRowAmount = 0;
				totalCellAmount = 0;
			}

			// definisco l'ultima riga, quella dei totali
			var lastRow = {};
			lastRow[headerColumnsName[0]] = this._getLocalText("total");
			lastRow[headerColumnsName[1]] = "";
			lastRow[headerColumnsName[2]] = "";
			lastRow[headerColumnsName[headerColumnsName.length - 1]] =
				total.toFixed(2);
			var allGroupedExpenses = _.groupBy(listData, "expenseType");
			for (i in allGroupedExpenses) {
				var sum = 0;
				var sumKm = 0;
				for (j = 0; j < allGroupedExpenses[i].length; j++) {
					expense = allGroupedExpenses[i][j];
					if (i === "KM") {
						sumKm += parseFloat(expense.km);
						sum += parseFloat(expense.importo);
					} else {
						sum += parseFloat(expense.importo);
					}
				}
				if (sumKm > 0) {
					// lastRow[mileageRepaymentproperty] = sum.toFixed(2);
					lastRow[i] = sumKm.toString();
				} else {
					lastRow[i] = sum.toFixed(2);
				}
			}
			rowsSumTable.push(lastRow);
			var expenseForm = this.getView().byId("expensesSummary");
			if (this.expenseSumTable) {
				expenseForm.removeContent(this.expenseSumTable);
				this.expenseSumTable.destroy();
			}
			this.expenseSumTable = new sap.m.Table({
				id: "expensesSummaryTable",
				headerText: this._getLocalText("totals"),
			});
			for (i = 0; i < columnsSumTable.length; i++) {
				var tooltip = columnsSumTable[i].columnDescription
					? columnsSumTable[i].columnDescription
					: "";
				var hAlign = "End";
				if (
					// columnsSumTable[i].columnName === this._getLocalText("day") ||
					// columnsSumTable[i].columnName === this._getLocalText("transfer") ||
					columnsSumTable[i].columnName === this._getLocalText("project")
				) {
					hAlign = "Begin";
				}
				var columnToAdd = new sap.m.Column({
					hAlign: hAlign,
					vAlign: "Middle",
					header: new sap.m.Label({
						text: columnsSumTable[i].columnName,
						design: sap.m.LabelDesign.Bold,
						tooltip: tooltip,
					}),
				});
				if (
					// columnsSumTable[i].columnName === this._getLocalText("day") ||
					columnsSumTable[i].columnName === this._getLocalText("project")
				) {
					columnToAdd.setWidth("10rem");
				}
				this.expenseSumTable.addColumn(columnToAdd);
			}
			for (i = 0; i < rowsSumTable.length; i++) {
				var item = new sap.m.ColumnListItem({
					width: "100%",
				});
				for (j = 0; j < columnsSumTable.length; j++) {
					var prop = columnsSumTable[j].columnName;
					if (i === rowsSumTable.length - 1) {
						item.addCell(
							new sap.m.Text({
								text: rowsSumTable[i][prop],
							}).addStyleClass("bold")
						);
					} else {
						var text = rowsSumTable[i][prop];
						if (!text) {
							text = "";
						}
						item.addCell(
							new sap.m.Text({
								text: text,
							})
						);
					}
				}
				this.expenseSumTable.addItem(item);
			}
			expenseForm.addContent(this.expenseSumTable);
			this.expensesList = _.cloneDeep(expensesList);
			var iconTabBarId =
				this.page === "activitiesPage" ? "idActivitiesBar" : "idExpensesBar";
			var iconTabBar = this.getView().byId(iconTabBarId);
			var selectedFilterKey = iconTabBar.getSelectedKey();
			var selectedFilter = _.find(iconTabBar.getItems(), function (n) {
				if (n.getIcon()) {
					return n.getKey() === selectedFilterKey;
				}
			});
			if (selectedFilter) {
				iconTabBar.setSelectedItem(selectedFilter);
			}
			this.closeDialogBusy();
		},

		onIconTabBarSelect: function (evt) {
			var selectedTabKey = evt.getSource().getSelectedKey();
			this.enableReportModel.setProperty("/visiblePrintButton", false);
			var visiblePrintButton = false;
			setTimeout(
				function () {
					if (
						this.page === "activitiesPage" &&
						selectedTabKey === "activitiesDetail"
					) {
						this.activityModel.setProperty(
							"/timesheetList",
							this.timesheetList
						);
						this.getView().byId("activitiesDetailTable").rerender();
					} else if (this.page === "expensesPage") {
						if (selectedTabKey === "expensesDetail") {
							this.expenseModel.setProperty(
								"/expensesList",
								this.expensesList
							);
							this.getView().byId("expensesDetailTable").rerender();
						} else {
							this.enableReportModel.setProperty("/visiblePrintButton", true);
						}
					}
				}.bind(this),
				100
			);
		},

		onChangePeriodPress: function () {
			if (!this.changePeriodDialog) {
				this.changePeriodDialog = sap.ui.xmlfragment(
					"timesheetproject2.view.fragment.DialogChangeReportPeriod",
					this
				);
				this.getView().addDependent(this.changePeriodDialog);
			}

			var fromDate = this.activityModel.getProperty("/fromDate");
			var toDate = this.activityModel.getProperty("/toDate");
			if (!fromDate && !toDate) {
				fromDate = new Date(
					formatter.getFirstDayFromMonth(
						this.actualYear,
						this.actualMonth - 1
					)
				);
				toDate = new Date(
					formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
				);
			}

			this.activityModel.setProperty("/fromDate", fromDate);
			this.activityModel.setProperty("/toDate", toDate);
			this.changePeriodDialog.open();
		},

		onOkChangePeriodDialogPress: function (evt) {
			var fromDate = sap.ui.getCore().byId("firstDay").getDateValue();
			var toDate = sap.ui.getCore().byId("endDay").getDateValue();
			this.startDate = formatter.getDayFormatTimesheet(fromDate);
			this.endDate = formatter.getDayFormatTimesheet(toDate);
			this.changePeriodDialog.close();
			var dtaIN = formatter.formatDate(fromDate);
			var dataFin = formatter.formatDate(toDate);
			var data = this.getView().getModel("activityModel");
			data.setProperty("/startDate", dtaIN);
			data.setProperty("/endDate", dataFin);
			this._reportMatched();
		},

		onCloseChangePeriodDialogPress: function () {
			this.changePeriodDialog.close();
		},

		onExpensePress: function () {
			this.page = "expensesPage";
			var navCon = this.getView().byId("navCon");
			var animation = "flip";
			navCon.to(this.getView().byId("expenseReport"), animation);
			// seleziono il primo tabFilter
			this._getById("idExpensesBar").setSelectedItem(
				this._getById("idExpensesBar").getItems()[0]
			);
			navCon.rerender();
		},

		onActivityPress: function () {
			this.page = "activitiesPage";
			var navCon = this.getView().byId("navCon");
			navCon.back();
			// seleziono il primo tabFilter
			this._getById("idActivitiesBar").setSelectedItem(
				this._getById("idActivitiesBar").getItems()[0]
			);
			navCon.rerender();
		},

		onDownloadExcelPress: function () {
			this.openDialogBusy(this._getLocalText("downloadExcel"));
			this.enableReportModel.setProperty("/wbsVisible", true);
			setTimeout(_.bind(this._downloadExcel, this));
		},

		_downloadExcel: function () {
			var getWorkbook = function () {
				return XlsxPopulate.fromBlankAsync();
			};

			var generate = function (type) {
				return getWorkbook().then(
					function (workbook) {
						// capisco che download sto per fare
						var barId = "idActivitiesBar";
						if (this.page === "expensesPage") {
							barId = "idExpensesBar";
						}
						var bar = this.byId(barId);
			
						this.filterKey = bar.getSelectedKey();
						var idTable = this.filterKey + "Table";
						var table = this._getById(idTable);
						var columns = table.getColumns();
	
						var columnsArray = [
							"A",
							"B",
							"C",
							"D",
							"E",
							"F",
							"G",
							"H",
							"I",
							"J",
							"K",
							"L",
							"M",
							"N",
							"O",
							"P",
							"Q",
							"R",
							"S",
							"T",
							"U",
							"V",
							"W",
							"X",
							"Y",
							"Z",
						];
						columnsArray.splice(columns.length, columnsArray.length - 1);
						var contentColumn = {};
						var headerColumnsName = [];
						for (var i = 0; i < columns.length; i++) {
							var column = columns[i];
							var labelName =
								this.filterKey === "expensesSummary"
									? column.getHeader().getTooltip()
										? column.getHeader().getTooltip()
										: column.getHeader().getText()
									: column.getLabel().getText();
							contentColumn[i] = [labelName];
							headerColumnsName.push(labelName);
						}
						// definisco la testata della tabella
						for (i = 0; i < columnsArray.length; i++) {
							var cell = columnsArray[i] + "1";
							workbook.sheet(0).cell(cell).style("bold", true);
							workbook.sheet(0).cell(cell).style("borderStyle", "thin");
						}
						workbook.sheet(0).cell("A1").value([headerColumnsName]);
						// definisco i dati della tabella
						var rows =
							this.filterKey === "expensesSummary"
								? table.getItems()
								: table.getRows();
						if (!rows.length) {
							MessageBox.error(this._getLocalText("noDataToDownload"), {
								title: this._getLocalText("WARNING"),
							});
							return;
						}
						for (i = 0; i < rows.length; i++) {
							var row = rows[i];
							var cells = row.getCells();
							var dataValues = [];
							for (var j = 0; j < cells.length; j++) {
								var text = cells[j].getText();
								if (text.indexOf("\n") > 0) {
									// entro qui dentro quando sono nella colonna degli oda dove ho oda \n posizione
									var indexNewLine = text.indexOf("\n");
									text =
										text.substring(0, indexNewLine - 1) +
										" / " +
										text.substring(indexNewLine + 2, text.length);
								}
								contentColumn[j].push(text);
								if (
									(parseFloat(text) || parseFloat(text) === 0) &&
									contentColumn[j][0] !== this._getLocalText("date") &&
									contentColumn[j][0] !== this._getLocalText("day") &&
									contentColumn[j][0] !== this._getLocalText("id") &&
									contentColumn[j][0] !== this._getLocalText("oda") &&
									contentColumn[j][0] !== this._getLocalText("notes")
								) {
									// entro qui dentro se sono su un numero
									text = parseFloat(text);
								}
								dataValues.push(text);
							}
							var rowNumber = i + 2;
							var startRange = "A" + rowNumber;
							workbook.sheet(0).cell(startRange).value([dataValues]);
							// coloro il bordo delle celle
							for (j = 0; j < columnsArray.length; j++) {
								column = columnsArray[j];
								cell = column + rowNumber;
								workbook.sheet(0).cell(cell).style("borderStyle", "thin");
								if (
									this.filterKey === "expensesSummary" &&
									i === rows.length - 1
								) {
									workbook.sheet(0).cell(cell).style("bold", true);
								}
							}
						}
						// definisco la larghezza delle colonne e definisco come numeri quelli che sono tali
						for (i in contentColumn) {
							column = contentColumn[i];
							var maxLength = _.max(
								_.map(column, function (n) {
									return n.length;
								})
							);
							workbook
								.sheet(0)
								.column(columnsArray[i])
								.width(maxLength + 2);
						}
						return workbook.outputAsync({
							type: type,
						});
					}.bind(this)
				);
			}.bind(this);

			var generateBlob = function (type) {
				return generate()
					.then(
						function (blob) {
							this.enableReportModel.setProperty("/wbsVisible", false);
							if (window.navigator && window.navigator.msSaveOrOpenBlob) {
								window.navigator.msSaveOrOpenBlob(
									blob,
									this.filterKey + ".xlsx"
								);
							} else {
								var url = window.URL.createObjectURL(blob);
								var a = document.createElement("a");
								document.body.appendChild(a);
								a.href = url;
								a.download = this.filterKey + ".xlsx";
								a.click();
								window.URL.revokeObjectURL(url);
								document.body.removeChild(a);
							}
							this.closeDialogBusy();
						}.bind(this)
					)
					.catch(function (err) {
						alert(err.message || err);
						throw err;
					});
			}.bind(this);
			generateBlob();
		},

		onPrintPress: function () {
			this.openDialogBusy(this._getLocalText("loadingData"));
			var dataJsonToSend = {
				startPeriodDate: this.activityModel.getProperty("/startDate"),
				endPeriodDate: this.activityModel.getProperty("/endDate"),
				cid: this.getModel("userModel").getProperty("/userDetail").cid,
			};
			var idTable = "expensesSummaryTable";
			var table = this._getById(idTable);
			var columns = table.getColumns();
			var properties = [];
			for (var i = 0; i < columns.length; i++) {
				var column = columns[i];
				var property = column.getHeader().getText();
				properties.push(property);
			}
			var dataTable = [];
			var items = table.getItems();
			for (i = 0; i < items.length; i++) {
				var rowToAdd = {};
				var row = items[i];
				var cells = row.getCells();
				for (var j = 0; j < cells.length; j++) {
					property = properties[j];
					var cell = cells[j];
					var text = cell.getText();
					// per le colonne che hanno le categorie spese ci sono anche i tooltip e saranno da passare dentro la proprietà value
					var label = columns[j].getHeader().getTooltip();
					text = text ? text : null;
					if (label) {
						var itemToAdd = {
							value: text,
							label: label,
						};
					}
					rowToAdd[property] = label ? itemToAdd : text;
				}
				dataTable.push(rowToAdd);
			}
			dataJsonToSend.dataTable = dataTable;
			var fSuccess = function () {
				this.closeDialogBusy();
			}.bind(this);
			var fError = function (err) {
				this.closeDialogBusy();
				this._openMessageBoxError(err);
			}.bind(this);
			oData.printData(dataJsonToSend, fSuccess, fError);
		},
	});
});