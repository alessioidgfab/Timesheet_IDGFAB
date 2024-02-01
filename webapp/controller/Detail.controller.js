sap.ui.define(
  [
    "timesheetproject2/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/oDataRequest",
    "../utils/TimesheetSerializer",
    "../model/StorageService",
    "sap/m/MessageBox",
  ],
  function (
    BaseController,
    JSONModel,
    History,
    formatter,
    Filter,
    FilterOperator,
    oData,
    TimesheetSerializer,
    StorageService,
    MessageBox
  ) {
    "use strict";

    return BaseController.extend("timesheetproject2.controller.Detail", {
      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the worklist controller is instantiated.
       * @public
       */

      onInit: function () {
        var modelloJSON = new JSONModel();

        // timesheetproject2.controller.BaseController.prototype.onInit.apply(this, arguments);
        this.getRouter()
          .getRoute("detail")
          .attachPatternMatched(this._detailMatched, this);

        this.detailModel = modelloJSON;
        this.getView().setModel(this.detailModel, "detailModel");

        // this.tendineModel = new sap.ui.model.json.JSONModel();
        // this.getView().setModel(this.tendineModel, "tendineModel");
        this.getView().setModel(modelloJSON, "tendineModel");
        this.getView().getModel("tendineModel").setProperty("/activities", []);

        this.enableModel = modelloJSON;
        this.getView().setModel(this.enableModel, "enableModel");

        this.visibleModel = modelloJSON;
        this.getView().setModel(this.visibleModel, "visibleModel");

        this.userModel = modelloJSON;
        this.getView().setModel(this.userModel, "userModel");
      },

      _detailMatched: function (evt) {

        var setField = this.getOwnerComponent().getModel("dataSel");
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

        this.getUser = [];
        this.assign = [];
        var obj = {
          EMAIL_UTENTE : email
        };
        var that = this;
      
        // this.oDate = null;
    
        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //     jQuery.proxy(function () {
        //       var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //       that.makeAjaxRequest(
        //         sUrl + `Anagrafica_Utenti?$filter=COGNOME_UTENTE eq '${surname}' and NOME_UTENTE eq '${name}'`,
        //         function (data) {
        //           // Handle success for Anagrafica_Utenti
        //           that.getUser = data.value;
        //         }.bind(this),
        //         function (error) {
        //           // Handle error for Anagrafica_Utenti
        //           // console.log("Error in Anagrafica_Utenti: ", error);
        //           sap.ui.core.BusyIndicator.hide();
        //         }.bind(this)
        //       );
  
        //       that.makeAjaxRequest(
        //         sUrl + `Associazione_Commessa_Utente?$filter=ID_UTENTE_ID_UTENTE eq '${this.getUser[0].ID_UTENTE}'`,
        //         function (data) {
        //           // Handle success for Anagrafica_Utenti
        //           that.assign = data.value;
        //         }.bind(this),
        //         function (error) {
        //           // Handle error for Anagrafica_Utenti
        //           // console.log("Error in Associazione_Commessa_Utente: ", error);
        //           sap.ui.core.BusyIndicator.hide();
        //         }.bind(this)
        //       );
        //     }, this)
        //   );
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       this.openDialogBusy(this._getLocalText("loadingPage"));
        //       this.entity = evt.getParameter("arguments").entity;
        //       // this.enableModel.setProperty("/entity", this.entity);
        //       this.enableModel.setProperty("/saveButton", true);
        //       this.enableModel.setProperty("/overtimeRequired", false);
        //       var sessionUserModel = StorageService.sessionGet("userModel");
        //       var overtime = _.filter(StorageService.sessionGet("overtime"), {
        //         Language: sap.ui.getCore().getConfiguration().getLanguage(),
        //       });
        //       overtime.unshift({
        //         Language: sap.ui.getCore().getConfiguration().getLanguage(),
        //         TimeSheetOvertimeCategory: "",
        //         TimeSheetOvertimeCategoryText: "",
        //       });
        //       // this.tendineModel.setProperty("/overtime", overtime);
        //       // if (!sessionUserModel) {
        //       // 	this._getUserInfo();
        //       // } else {
        //       // 	this.userModel.setData(sessionUserModel);
        //       // 	this._setPage();
        //       // }
        //       var tend = this.getView().getModel("tendineModel");
        //       this.tendine = [];
        //       var attivitaAssegnate = [];
        //       for(var f = 0 ; f<this.assign.length; f++){
        //         attivitaAssegnate.push(this.assign[f].ID_ID);
        //       }
        //       var filter = attivitaAssegnate.map(function(num) {
        //         return `ID eq '${num}'`;
        //       }).join(" or ");
        //       var that = this;
        //       jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //         jQuery.proxy(function () {
        //           var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //           that.makeAjaxRequest(
        //             sUrl + `ActivityOnly?$filter=${filter}`,
        //             function (data) {
        //               // Handle success for Stato_Commessa
        //               that.tendine = data.value;
        //             }.bind(this),
        //             function (error) {
        //               // Handle error for Stato_Commessa
        //               // console.log("Error in ActivityOnly: ", error);
        //               sap.ui.core.BusyIndicator.hide();
        //             }.bind(this)
        //           );
        //         }, this)
        //       );
        //       var myData = [];
        //       // for (var i = 0; i < this.tendine.length; i++) {
        //       // 	var obj = {};
        //       // 	obj.workPackage = this.tendine[i].ID;
        //       // 	obj.workPackageName = this.tendine[i].Descrizione;
        //       // 	myData.push(obj);
        //       // }
        //       var getAssign = this.assign.filter(
        //         (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
        //       );
  
        //       for (var i = 0; i < getAssign.length; i++) {
        //         var getCommessa = this.tendine.filter(
        //           (x) => x.ID === getAssign[i].ID_ID
        //         );
  
        //         for (var b = 0; b < getCommessa.length; b++) {
        //           var obj = {};
  
        //           obj.workPackageName = getCommessa[b].Descrizione;
  
        //           obj.workPackage = getCommessa[b].ID;
  
        //           myData.push(obj);
        //         }
        //       }
  
        //       tend.setProperty("/activities", myData);
  
        // if(setField){
        //   this.edit = myData.filter(
        //     (x) =>
        //       x.workPackageName ===
        //       this.getOwnerComponent().getModel("dataSel").oData.rowSelez.WBS
        //     );
        // }
           
  
        //       var modelloJSON = new JSONModel();
        //       this.getView().setModel(modelloJSON, "detailModel");
        //       var date = this.getView().getModel("dataSel");
        //       var act = this.getView().getModel("detailModel");
        //       var des = this.getView().getModel("detailModel");
        //       var dataSel = date.getProperty("/dataSelez");
        //       var dataSelezionata = formatter.formatDate(dataSel);
        //       // var activity = [];
        //       this.workPlace = [];
        //       // var stato = [];
        //       var that = this;
  
        //       jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //         jQuery.proxy(function () {
        //           var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //           that.makeAjaxRequest(
        //             sUrl + "Luogo_Lavoro",
        //             function (data) {
        //               // Handle success for Stato_Commessa
        //               this.workPlace = data.value;
        //               var workPlc = new sap.ui.model.json.JSONModel(
        //                 this.workPlace
        //               );
        //               that.getOwnerComponent().setModel(workPlc, "workPlace");
        //             }.bind(this),
        //             function (error) {
        //               // Handle error for Stato_Commessa
        //               // console.log("Error in Luogo_Lavoro: ", error);
        //               sap.ui.core.BusyIndicator.hide();
        //             }.bind(this)
        //           );
        //           // that.makeAjaxRequest(sUrl + "ActivitySet", function (data) {
        //           // 	// Handle success for Stato_Commessa
        //           // 	activity = data.value;
        //           // }.bind(this), function (error) {
        //           // 	// Handle error for Stato_Commessa
        //           // 	console.log("Error in ActivitySet: ", error);
        //           // 	sap.ui.core.BusyIndicator.hide();FoF
        //           // }.bind(this));
        //           // that.makeAjaxRequest(sUrl + "Stato_Commessa", function (data) {
        //           // 	// Handle success for Stato_Commessa
        //           // 	stato = data.value;
        //           // }.bind(this), function (error) {
        //           // 	// Handle error for Stato_Commessa
        //           // 	console.log("Error in Stato_Commessa: ", error);
        //           // 	sap.ui.core.BusyIndicator.hide();
        //           // }.bind(this));
        //         }, this)
        //       );
  
        //       var fatturazioneFlag =
        //         this.getOwnerComponent().getModel("dataSel").oData.rowSelez
        //           .faturazioneFlag;
        //       if (
        //         fatturazioneFlag === "no" ||
        //         fatturazioneFlag === undefined ||
        //         fatturazioneFlag === null
        //       ) {
        //         var fatturazione = false;
        //       }
        //       if (fatturazioneFlag === "si") {
        //         var fatturazione = true;
        //       }
  
        //       var luogo = this.workPlace.filter(
        //         (x) =>
        //           x.Luogo ===
        //           this.getOwnerComponent().getModel("dataSel").oData.rowSelez
        //             .workLocDescription
        //       );
        //       if (this.edit.length>0) {
            
        //           this.byId("idWbsActionSelect").setSelectedKey(
        //             this.edit[0].workPackage.toString()
        //           );
        //       }
        // else{
        //   this.byId('idWbsActionSelect').setSelectedKey(null);
        // }
        // if (fatturazione) {
        //           this.byId("checkBox").setSelected(fatturazione);
        //         }
        //   else{
        //   this.byId("checkBox").setSelected(false);
        //   }
        //   if (
        //           this.getOwnerComponent().getModel("dataSel").oData.rowSelez
        //             .workHours
        //         ) {
        //           this.byId("inputNumber").setValue(
        //             this.getOwnerComponent().getModel("dataSel").oData.rowSelez
        //               .workHours
        //           );
        //         }
        //   else{
        //   this.byId('inputNumber').setValue('');
        //   }
        //   if (
        //           this.getOwnerComponent().getModel("dataSel").oData.rowSelez
        //             .overTime
        //         ) {
        //           this.byId("SelectNumber").setSelectedKey(
        //             this.getOwnerComponent().getModel("dataSel").oData.rowSelez
        //               .overTime
        //           );
        //         }
        //   else{
        //   this.byId('SelectNumber').setSelectedKey(null);
        //   }
        //   if (luogo.length>0) {
        //           this.byId("location").setSelectedKey(luogo[0].ID); 
        //         }else
        //   {
        //   this.byId('location').setSelectedKey(null);
        //   }
  
        //       // var myData = [];
        //       // var attivita = [];
        //       // for (var a = 0; a < activity.length; a++) {
        //       // 	var dat = activity[a].DATA_ATTIVITA
        //       // 	var data = formatter.formatDate(dat)
        //       // 	console.log(data);
        //       // 	if (dataSelezionata == data) {
        //       // 		var attivitaselezionata = {};
        //       // 		attivitaselezionata.activity = activity[a].CODICE_COMMESSA;
        //       // 		attivita.push(attivitaselezionata);
        //       // 	}
        //       // }
        //       // act.setProperty("/activities", attivita);
        //       // var descrizione = [];
        //       // for (var a = 0; a < activity.length; a++) {
        //       // 	for (var c = 0; c < activity.length; c++) {
        //       // 		var dat = activity[a].DATA_ATTIVITA
        //       // 		var data = formatter.formatDate(dat)
        //       // 		console.log(data);
        //       // 		if (dataSelezionata == data) {
        //       // 			var descr = {};
        //       // 			descr.wbsDescription = activity[c].DESCRIZIONE;
        //       // 			descrizione.push(descr);
        //       // 		}
        //       // 	}
        //       // }
        //       // des.setProperty("/wbsDescription", descrizione);
        //       jQuery.sap.delayedCall(2000, this, function () {
        //         this.closeDialogBusy();
        //       });
        //     }
        //   }
        // }
        // else{
          //UTENTE IDGFAB
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
              this.entity = evt.getParameter("arguments").entity;
              // this.enableModel.setProperty("/entity", this.entity);
              this.enableModel.setProperty("/saveButton", true);
              this.enableModel.setProperty("/overtimeRequired", false);
              var sessionUserModel = StorageService.sessionGet("userModel");
              var overtime = _.filter(StorageService.sessionGet("overtime"), {
                Language: sap.ui.getCore().getConfiguration().getLanguage(),
              });
              overtime.unshift({
                Language: sap.ui.getCore().getConfiguration().getLanguage(),
                TimeSheetOvertimeCategory: "",
                TimeSheetOvertimeCategoryText: "",
              });
              // this.tendineModel.setProperty("/overtime", overtime);
              // if (!sessionUserModel) {
              // 	this._getUserInfo();
              // } else {
              // 	this.userModel.setData(sessionUserModel);
              // 	this._setPage();
              // }
              var tend = this.getView().getModel("tendineModel");
              this.tendine = [];
              var attivitaAssegnate = [];
              for(var f = 0 ; f<this.assign.length; f++){
                attivitaAssegnate.push(this.assign[f].ID_ID);
              }
              var filter = attivitaAssegnate.map(function(num) {
                return `ID eq '${num}'`;
              }).join(" or ");
              var that = this;
              jQuery.when(this.oInitialLoadFinishedDeferred).then(
                jQuery.proxy(function () {
                  var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                  that.makeAjaxRequest(
                    sUrl + `ActivityOnly?$filter=${filter}`,
                    function (data) {
                      // Handle success for Stato_Commessa
                      that.tendine = data.value;
                    }.bind(this),
                    function (error) {
                      // Handle error for Stato_Commessa
                      // console.log("Error in ActivityOnly: ", error);
                      sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                  );
                }, this)
              );
              var myData = [];
              // for (var i = 0; i < this.tendine.length; i++) {
              // 	var obj = {};
              // 	obj.workPackage = this.tendine[i].ID;
              // 	obj.workPackageName = this.tendine[i].Descrizione;
              // 	myData.push(obj);
              // }
              var getAssign = this.assign.filter(
                (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
              );
  
              for (var i = 0; i < getAssign.length; i++) {
                var getCommessa = this.tendine.filter(
                  (x) => x.ID === getAssign[i].ID_ID
                );
  
                for (var b = 0; b < getCommessa.length; b++) {
                  var obj = {};
  
                  obj.workPackageName = getCommessa[b].Descrizione;
  
                  obj.workPackage = getCommessa[b].ID;
  
                  myData.push(obj);
                }
              }
  
              tend.setProperty("/activities", myData);
  
        if(setField){
          this.edit = myData.filter(
            (x) =>
              x.workPackageName ===
              this.getOwnerComponent().getModel("dataSel").oData.rowSelez.WBS
            );
        }
           
  
              var modelloJSON = new JSONModel();
              this.getView().setModel(modelloJSON, "detailModel");
              var date = this.getView().getModel("dataSel");
              var act = this.getView().getModel("detailModel");
              var des = this.getView().getModel("detailModel");
              var dataSel = date.getProperty("/dataSelez");
              var dataSelezionata = formatter.formatDate(dataSel);
              // var activity = [];
              this.workPlace = [];
              // var stato = [];
              var that = this;
  
              jQuery.when(this.oInitialLoadFinishedDeferred).then(
                jQuery.proxy(function () {
                  var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                  that.makeAjaxRequest(
                    sUrl + "Luogo_Lavoro",
                    function (data) {
                      // Handle success for Stato_Commessa
                      this.workPlace = data.value;
                      var workPlc = new sap.ui.model.json.JSONModel(
                        this.workPlace
                      );
                      that.getOwnerComponent().setModel(workPlc, "workPlace");
                    }.bind(this),
                    function (error) {
                      // Handle error for Stato_Commessa
                      // console.log("Error in Luogo_Lavoro: ", error);
                      sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                  );
                  // that.makeAjaxRequest(sUrl + "ActivitySet", function (data) {
                  // 	// Handle success for Stato_Commessa
                  // 	activity = data.value;
                  // }.bind(this), function (error) {
                  // 	// Handle error for Stato_Commessa
                  // 	console.log("Error in ActivitySet: ", error);
                  // 	sap.ui.core.BusyIndicator.hide();FoF
                  // }.bind(this));
                  // that.makeAjaxRequest(sUrl + "Stato_Commessa", function (data) {
                  // 	// Handle success for Stato_Commessa
                  // 	stato = data.value;
                  // }.bind(this), function (error) {
                  // 	// Handle error for Stato_Commessa
                  // 	console.log("Error in Stato_Commessa: ", error);
                  // 	sap.ui.core.BusyIndicator.hide();
                  // }.bind(this));
                }, this)
              );
  
              var fatturazioneFlag =
                this.getOwnerComponent().getModel("dataSel").oData.rowSelez
                  .faturazioneFlag;
              if (
                fatturazioneFlag === "no" ||
                fatturazioneFlag === undefined ||
                fatturazioneFlag === null
              ) {
                var fatturazione = false;
              }
              if (fatturazioneFlag === "si") {
                var fatturazione = true;
              }
  
              var luogo = this.workPlace.filter(
                (x) =>
                  x.Luogo ===
                  this.getOwnerComponent().getModel("dataSel").oData.rowSelez
                    .workLocDescription
              );
              if (this.edit.length>0) {
            
                  this.byId("idWbsActionSelect").setSelectedKey(
                    this.edit[0].workPackage.toString()
                  );
              }
        else{
          this.byId('idWbsActionSelect').setSelectedKey(null);
        }
        if (fatturazione) {
                  this.byId("checkBox").setSelected(fatturazione);
                }
          else{
          this.byId("checkBox").setSelected(false);
          }
          if (
                  this.getOwnerComponent().getModel("dataSel").oData.rowSelez
                    .workHours
                ) {
                  this.byId("inputNumber").setValue(
                    this.getOwnerComponent().getModel("dataSel").oData.rowSelez
                      .workHours
                  );
                }
          else{
          this.byId('inputNumber').setValue('');
          }
          if (
                  this.getOwnerComponent().getModel("dataSel").oData.rowSelez
                    .overTime
                ) {
                  this.byId("SelectNumber").setSelectedKey(
                    this.getOwnerComponent().getModel("dataSel").oData.rowSelez
                      .overTime
                  );
                }
          else{
          this.byId('SelectNumber').setSelectedKey(null);
          }
          if (luogo.length>0) {
                  this.byId("location").setSelectedKey(luogo[0].ID); 
                }else
          {
          this.byId('location').setSelectedKey(null);
          }
  
              // var myData = [];
              // var attivita = [];
              // for (var a = 0; a < activity.length; a++) {
              // 	var dat = activity[a].DATA_ATTIVITA
              // 	var data = formatter.formatDate(dat)
              // 	console.log(data);
              // 	if (dataSelezionata == data) {
              // 		var attivitaselezionata = {};
              // 		attivitaselezionata.activity = activity[a].CODICE_COMMESSA;
              // 		attivita.push(attivitaselezionata);
              // 	}
              // }
              // act.setProperty("/activities", attivita);
              // var descrizione = [];
              // for (var a = 0; a < activity.length; a++) {
              // 	for (var c = 0; c < activity.length; c++) {
              // 		var dat = activity[a].DATA_ATTIVITA
              // 		var data = formatter.formatDate(dat)
              // 		console.log(data);
              // 		if (dataSelezionata == data) {
              // 			var descr = {};
              // 			descr.wbsDescription = activity[c].DESCRIZIONE;
              // 			descrizione.push(descr);
              // 		}
              // 	}
              // }
              // des.setProperty("/wbsDescription", descrizione);
              jQuery.sap.delayedCall(2000, this, function () {
                this.closeDialogBusy();
              });
            }
          }
        // }
      
      },
      makeAjaxRequest: function (url, successCallback, errorCallback) {
        jQuery.ajax({
          url: url,
          dataType: "json",
          success: function (data) {
            if (typeof successCallback === "function") {
              successCallback(data);
            }
          },
          error: function (error) {
            if (typeof errorCallback === "function") {
              errorCallback(error);
            }
          },
          async: false,
        });
      },
      inputChange: function (oEvent) {
        if (oEvent.getSource().getValue().length > 3) {
          oEvent
            .getSource()
            .setValue(oEvent.getSource().getValue().slice(0, -2));
        }
        var numero = oEvent.getSource().getValue();
        var numeroId = this.byId("inputNumber");

        var numeIntero = oEvent.getSource().getValue()[0];

        var punto = oEvent.getSource().getValue()[1];
        var numFloat = oEvent.getSource().getValue()[2];

        if (parseFloat(numeIntero) >= 9 ) {
          numeroId.setValue("1");
        }
        if (punto) {
          if (numFloat != "5") {
            numeroId.setValue("1");
          }
        }
      },
      _setPage: function () {
        var fSuccess = function (result) {
          this.closeDialogBusy();
          var activities = _.sortBy(result, "workPackage");
          this.tendineModel.setProperty("/activities", activities);
          this._getAbsenceTypes();
        }.bind(this);
        this.openDialogBusy(this._getLocalText("loadingPage"));
        var date = formatter.getDayFormatTimesheet(
          new Date(StorageService.sessionGet("selectedDate"))
        );
        this._getPeriodicWbs(date, fSuccess);
      },

      _getPeriodicWbs: function (date, afterGetWbs) {
        var fSuccess = function (result) {
          if (!this.getModel("userModel").getProperty("/workingInAdmin")) {
            _.remove(result, {
              workItem: "T120",
            });
          }
          var wbs = result;
          afterGetWbs(wbs);
        }.bind(this);
        var fError = function () {
          this.closeDialogBusy();
          var err = this._getLocalText("errorReadWbs");
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
            onClose: _.bind(this.onCancelPress, this),
          });
        }.bind(this);
        oData.getPeriodicWbs(
          this._getEmployeeId(),
          date,
          date,
          fSuccess,
          fError
        );
      },

      _getAbsenceTypes: function () {
        var fSuccess = function (result) {
          var absenceTypes = _.sortBy(result.results, "SAP_Description");
          this.tendineModel.setProperty("/absenceTypes", absenceTypes);
          this._setFields();
        }.bind(this);
        var fError = function () {
          this.closeDialogBusy();
          var err = this._getLocalText("errorReadWbs");
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
          });
        }.bind(this);
        this.openDialogBusy(this._getLocalText("loadingPage"));
        oData.getAbsenceTypes(fSuccess, fError);
      },

      _getAbsenceTypesOnChangeData: function () {
        var fSuccess = function (result) {
          var absenceTypes = _.sortBy(result.results, "SAP_Description");
          this.tendineModel.setProperty("/absenceTypes", absenceTypes);
          var detailModel = this.detailModel.getData();
          var page = "detail";
          var selectedDate = formatter.getDayFormatTimesheet(
            _.clone(new Date(detailModel.date.setHours(12)))
          );
          var dialogCalendarProperty;
          this._getPeriods(
            selectedDate,
            selectedDate,
            dialogCalendarProperty,
            page
          );
        }.bind(this);
        var fError = function () {
          this.closeDialogBusy();
          var err = this._getLocalText("errorReadWbs");
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
          });
        }.bind(this);
        this.openDialogBusy(this._getLocalText("loadingPage"));
        oData.getAbsenceTypes(fSuccess, fError);
      },

      _resetActivity: function () {
        // Resetta i campi delle attività
        this.detailModel.setProperty("/activityId", "");
        this.detailModel.setProperty("/company", "");
        this.detailModel.setProperty("/activity", "");
        this.detailModel.setProperty("/wbsDescription", "");
        this.detailModel.setProperty("/workItem", "");
        this.detailModel.setProperty("/workItemName", "");
        this.detailModel.setProperty("/billingControlCategory", "");
        this.detailModel.setProperty("/purchaseOrder", "");
        this.detailModel.setProperty("/purchaseOrderItem", "");
        this.enableModel.setProperty("/saveButton", false);
        this.enableModel.setProperty("/isAbsenceWbs", "");
      },

      _setFields: function () {
        // setto i luoghi lavoro
        var workLocations = this._getWorkLocations();
        this.tendineModel.setProperty("/workLocations", workLocations);
        var officeLocations = this._getOfficeDescription(true);
        this.tendineModel.setProperty("/officeLocations", officeLocations);
        var detailModel = {};
        if (this.entity === "new") {
          var date = new Date(StorageService.sessionGet("selectedDate"));
        } else {
          var selectedTs = StorageService.sessionGet("selectedTs");
        }
        detailModel.date =
          this.entity === "new"
            ? date
            : formatter.dateFromStringToDateValue(this.selectedDate);
        detailModel.activity = this.entity === "new" ? "" : selectedTs.WBS;
        detailModel.absenceCode =
          this.entity === "new" ? "" : selectedTs.absenceCode;
        var isAbsenceWbs = detailModel.absenceCode ? true : false;
        this.enableModel.setProperty("/isAbsenceWbs", isAbsenceWbs);
        detailModel.workLocation =
          this.entity === "new" ? "" : selectedTs.workLocation;
        detailModel.officeCode =
          this.entity === "new" ? "" : selectedTs.officeCode;
        detailModel.rejectionReason =
          this.entity === "new" ? "" : selectedTs.rejectionReason;
        detailModel.workItem = this.entity === "new" ? "" : selectedTs.workItem;
        detailModel.workItemName =
          this.entity === "new" ? "" : selectedTs.descriptionWorkItem;
        detailModel.purchaseOrder =
          this.entity === "new" || !selectedTs.purchaseOrder
            ? ""
            : selectedTs.purchaseOrder;
        detailModel.purchaseOrderItem =
          this.entity === "new" || !selectedTs.purchaseOrderItem
            ? ""
            : selectedTs.purchaseOrderItem;
        detailModel.billingControlCategory =
          this.entity === "new" ? "" : selectedTs.billingControlCategory;
        detailModel.note = this.entity === "new" ? "" : selectedTs.notes;
        detailModel.overtimeCategory =
          this.entity === "new" ? "" : selectedTs.overtimeCategory;
        var workHours =
          this.entity === "new" ? "" : parseInt(selectedTs.workHours);
        var workMinutes = "00";
        var company = "";
        var activityId = "";
        if (this.entity !== "new") {
          if (workHours !== parseFloat(selectedTs.workHours)) {
            // entro qui dentro se ho mezze ore
            workMinutes = "30";
          }
          if (selectedTs.purchaseOrder) {
            detailModel.purchaseOrder = selectedTs.purchaseOrder;
            detailModel.purchaseOrderItem = selectedTs.purchaseOrderItem;
          }
          detailModel.timeSheetRecord = selectedTs.timeSheetRecord;
          company = selectedTs.company;
          activityId = selectedTs.activityId;
          detailModel.status = selectedTs.statusId;
          // se c'è la trasferta in stato approvato, metto lo stato del detailModel a 40
          if (selectedTs.transfer.statoApprovazione === "APPROVATO") {
            detailModel.status = "40";
          }
        }
        detailModel.company = company;
        detailModel.activityId = activityId;
        detailModel.workHours = workHours;
        detailModel.workMinutes = workMinutes;
        var wbsDescription = "";
        if (this.entity !== "new") {
          var activityObj = _.find(
            this.tendineModel.getProperty("/activities"),
            {
              workPackage: selectedTs.WBS,
            }
          );
          if (activityObj) {
            wbsDescription = activityObj.workPackageName;
          }
        }
        detailModel.wbsDescription = wbsDescription;
        this.detailModel.setData(detailModel);
        var page = "detail";
        var selectedDate = formatter.getDayFormatTimesheet(
          _.clone(new Date(detailModel.date.setHours(12)))
        );
        var dialogCalendarProperty;
        this._getPeriods(
          selectedDate,
          selectedDate,
          dialogCalendarProperty,
          page
        );
      },

      _afterGetPeriods: function () {
        var date = new Date(this.detailModel.getProperty("/date").setHours(12));
        var periodsByDate = this._getPeriodsByDate(date);
        var activity = periodsByDate.activity;
        var absence = periodsByDate.absence;
        var periodsModel = this.getView().getModel("periodsModel");
        periodsModel.setProperty("/activity", activity);
        periodsModel.setProperty("/absence", absence);
        this.closeDialogBusy();
      },

      onEditPress: function () {
        this.entity = "edit";
        this.enableModel.setProperty("/entity", this.entity);
        // se sono in modifica di un timesheet rifiutato, mi tengo il clone dei dati iniziali perché non è possibile salvare un ts rifiutato senza averci cambiato prima i dati
        if (this.detailModel.getProperty("/status") === "40") {
          this.cloneModel = _.cloneDeep(this.detailModel.getData());
        }
      },

      handleValueHelp: function (evt) {
        var sInputValue = evt.getSource().getValue();
        // create value help dialog
        if (!this._valueHelpDialog) {
          this._valueHelpDialog = sap.ui.xmlfragment(
            "timesheetproject2.view.fragment.InputAssistedActivities",
            this
          );
          this.getView().addDependent(this._valueHelpDialog);
        }
        // create a filter for the binding
        this._valueHelpDialog.getBinding("items");
        // open value help dialog filtered by the input value
        this._valueHelpDialog.open(sInputValue);
      },

      _handleValueHelpSearch: function (evt) {
        var sValue = evt.getParameter("value");
        var propertiesToFilter = ["CODICE_COMMESSA"];
        var filters = [];
        for (var i = 0; i < propertiesToFilter.length; i++) {
          var propertyToFilter = propertiesToFilter[i];
          var filter = new Filter(
            propertyToFilter,
            sap.ui.model.FilterOperator.Contains,
            sValue
          );
          filters.push(filter);
        }
        var oFilter = new sap.ui.model.Filter({
          filters: filters,
          and: false,
        });
        evt.getSource().getBinding("items").filter(oFilter);
      },

      _handleValueHelpClose: function (evt) {
        var selectedItem = evt.getParameter("selectedItem");
        if (selectedItem) {
          var selectedActivity = selectedItem
            .getBindingContext("tendineModel")
            .getObject();
          this.detailModel.setProperty(
            "/activity",
            selectedActivity.workPackage
          );
          var isAbsenceWbs = selectedActivity.isAbsenceWbs;
          if (isAbsenceWbs) {
            this.detailModel.setProperty("/workLocation", "");
            this.detailModel.setProperty("/officeCode", "");
          } else {
            this.detailModel.setProperty("/absenceCode", "");
          }
          var activityId = selectedActivity.engagementProjectResource
            ? selectedActivity.engagementProjectResource
            : "";
          var company = selectedActivity.deliveryOrganization
            ? selectedActivity.deliveryOrganization
            : "";
          this.detailModel.setProperty("/activityId", activityId);
          this.detailModel.setProperty("/company", company);
          this.detailModel.setProperty(
            "/activity",
            selectedActivity.workPackage
          );
          this.detailModel.setProperty(
            "/wbsDescription",
            selectedActivity.workPackageName
          );
          this.detailModel.setProperty("/workItem", selectedActivity.workItem);
          this.detailModel.setProperty(
            "/workItemName",
            selectedActivity.workItemName
          );
          this.detailModel.setProperty(
            "/billingControlCategory",
            selectedActivity.billingControlCategory
          );
          var order = selectedActivity.purchaseOrder;
          var purchaseOrder =
            order && order.purchaseOrder ? order.purchaseOrder : "";
          var purchaseOrderItem =
            order && order.purchaseOrderItem ? order.purchaseOrderItem : "";
          this.detailModel.setProperty("/purchaseOrder", purchaseOrder);
          this.detailModel.setProperty("/purchaseOrderItem", purchaseOrderItem);
          this.enableModel.setProperty("/saveButton", true);
          this.enableModel.setProperty("/isAbsenceWbs", isAbsenceWbs);
        }
        evt.getSource().getBinding("items").filter([]);
      },

      onCancelPress: function () {
        history.go(-1);
      },

      onChangeDate: function (evt) {
        this.openDialogBusy(this._getLocalText("checkWbsDate"));
        var data = evt.getSource().getProperty("dateValue");
        var dataSelezionata = formatter.getDayFormatTimesheet(data);
        var fSuccess = _.bind(function (success) {
          var activities = _.sortBy(success, "workPackage");
          this.tendineModel.setProperty("/activities", activities);
          this.closeDialogBusy();
          this._resetActivity();
          this._getAbsenceTypesOnChangeData();
        }, this);
        this._getPeriodicWbs(dataSelezionata, fSuccess);
      },

      onNotesWrite: function (evt) {
        var notes = evt.getSource().getValue();
        this.detailModel.setProperty("/note", notes);
      },

      onSavePress: function (evt) {
        // this.timesheet = this.detailModel.getData();
        // if (evt.getSource().getText() === this._getLocalText("saveAndRelease")) {
        // 	this.timesheet.status = "20";
        // 	this.timesheet.timeSheetIsReleasedOnSave = true;
        // }
        // this._checkErrorsBeforeSaving();
        	var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
      
        // this.oDate = null;
    
        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var getData = this.getView().getModel("dataSel").getData().rowSelez;
        //       var getDate = this.getView()
        //         .getModel("dataSel")
        //         .getData().dataSelez;
        //       var idSelected;
        //       if (getData) {
        //         idSelected = getData.Id;
        //       }
        //       var getSelectedStato = this.getView()
        //         .byId("location")
        //         .getSelectedKey();
        //       var commessa = this.getView()
        //         .byId("idWbsActionSelect")
        //         ._getSelectedItemText();
  
        //       var checkBox = this.getView().byId("checkBox").getSelected();
  
        //       var parsedDate = new Date(getDate.replace(/-/g, "/"));
  
        //       // Create a DateFormat instance for the output format "yyyy-MM-dd"
        //       var targetDateFormat =
        //         sap.ui.core.format.DateFormat.getDateInstance({
        //           pattern: "yyyy-MM-dd",
        //         });
  
        //       // Format the date to the desired output format
        //       var targetDateString = targetDateFormat.format(parsedDate);
        //       var inputnumerico = this.byId("inputNumber").getValue();
        //       var selectNumerica = this.byId("SelectNumber").getSelectedKey();
  
        //       var obj = {
        //         CODICE_COMMESSA: commessa,
        //         NOTES: getData.notes,
        //         DESCRIZIONE_BUTTON: this.getUser[g].ID_UTENTE.toString(),
        //         DATA_ATTIVITA: targetDateString,
        //         ORE_LAVORATE: inputnumerico,
        //         OVERTIME: this.byId("SelectNumber").getSelectedKey(),
        //         UBICAZIONE_ID: parseInt(getSelectedStato),
        //         RIMBORSO_ID_RIMBORSO: parseInt(getData.rimborso),
        //       };
        //       if (idSelected) {
        //         obj.ID = idSelected;
        //       } 
        //       if (checkBox === true) {
        //         obj.FATTURAZIONE_FLAG = "si";
        //       } else {
        //         obj.FATTURAZIONE_FLAG = null;
        //       }
        //       if (getData.statusId === "Aperto") {
        //         obj.STATO_COMMESSA_ID = 1;
        //       } else if (getData.statusId === "Chiuso") {
        //         obj.STATO_COMMESSA_ID = 2;
        //       } else {
        //         obj.STATO_COMMESSA_ID = 3;
        //       }
        //       if(obj.CODICE_COMMESSA != null && obj.CODICE_COMMESSA != '' && obj.CODICE_COMMESSA != undefined )
        //      {
        //       if( obj.NOTES != null && obj.NOTES != '' && obj.NOTES != undefined){
        //         if( obj.ORE_LAVORATE != null && obj.ORE_LAVORATE != '' && obj.ORE_LAVORATE != undefined && obj.ORE_LAVORATE != '0'){
        //           if( obj.UBICAZIONE_ID != null && obj.UBICAZIONE_ID != '' && obj.UBICAZIONE_ID != undefined && obj.UBICAZIONE_ID != NaN){
  
        //             var that = this;
        //             var cloneData = _.cloneDeep(this.detailModel.getData());
        //             var status = this.detailModel.getProperty("/status");
        //             var dataString = JSON.stringify(obj);
        //             jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //               jQuery.proxy(function () {
        //                 var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //                 if (idSelected) {
        //                   jQuery.ajax({
        //                     url: sUrl + `ActivitySet/${idSelected}`,
        //                     contentType: "application/json",
        //                     type: "PUT",
        //                     data: dataString,
        //                     dataType: "json",
        //                     success: function (oData, oResponse) {
        //                       // that.entity = "view";
        //                       // that.enableModel.setProperty("/entity", that.entity);
        //                       var msg = "Updated Succesfully!";
        //                       sap.m.MessageToast.show(msg);
        //                       history.go(-1);
        //                     },
        //                     error: function (error) {
        //                       var msg = "Data not Updated Correctly!";
        //                       sap.m.MessageToast.show(msg);
        //                     },
        
        //                     async: false,
        //                   });
        //                 } else {
        //                   jQuery.ajax({
        //                     url: sUrl + `ActivitySet`,
        //                     contentType: "application/json",
        //                     type: "POST",
        //                     data: dataString,
        //                     dataType: "json",
        //                     success: function (oData, oResponse) {
        //                       var msg = "Created Succesfully!";
        //                       sap.m.MessageToast.show(msg);
        //                       // Modify a specific property in the data
        //                       idSelected = oData.ID;
        //                       // Update the model with the modified data
        //                       history.go(-1);
        //                     },
        //                     error: function (error) {
        //                       var msg = "Data not Inserted Correctly!";
        //                       sap.m.MessageToast.show(msg);
        //                     },
        
        //                     async: false,
        //                   });
        //                 }
        //               }, this)
        //             );
  
        //           }
                   
        //         }
        //       }
        //      }
               
  
              
             
        //     }
        //   }
        //   if(dataString === undefined)
        //   {
        //     var msg = "Data not Inserted Correctly!";
        //                       sap.m.MessageToast.show(msg);
        //   }
        // }
        // else{
          //UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var getData = this.getView().getModel("dataSel").getData().rowSelez;
              var getDate = this.getView()
                .getModel("dataSel")
                .getData().dataSelez;
              var idSelected;
              if (getData) {
                idSelected = getData.Id;
              }
              var getSelectedStato = this.getView()
                .byId("location")
                .getSelectedKey();
              var commessa = this.getView()
                .byId("idWbsActionSelect")
                ._getSelectedItemText();
  
              var checkBox = this.getView().byId("checkBox").getSelected();
  
              var parsedDate = new Date(getDate.replace(/-/g, "/"));
  
              // Create a DateFormat instance for the output format "yyyy-MM-dd"
              var targetDateFormat =
                sap.ui.core.format.DateFormat.getDateInstance({
                  pattern: "yyyy-MM-dd",
                });
  
              // Format the date to the desired output format
              var targetDateString = targetDateFormat.format(parsedDate);
              var inputnumerico = this.byId("inputNumber").getValue();
              var selectNumerica = this.byId("SelectNumber").getSelectedKey();
  
              var obj = {
                CODICE_COMMESSA: commessa,
                NOTES: getData.notes,
                DESCRIZIONE_BUTTON: this.getUser[g].ID_UTENTE.toString(),
                DATA_ATTIVITA: targetDateString,
                ORE_LAVORATE: inputnumerico,
                OVERTIME: this.byId("SelectNumber").getSelectedKey(),
                UBICAZIONE_ID: parseInt(getSelectedStato),
                RIMBORSO_ID_RIMBORSO: parseInt(getData.rimborso),
              };
              if (idSelected) {
                obj.ID = idSelected;
              } 
              if (checkBox === true) {
                obj.FATTURAZIONE_FLAG = "si";
              } else {
                obj.FATTURAZIONE_FLAG = null;
              }
              if (getData.statusId === "Aperto") {
                obj.STATO_COMMESSA_ID = 1;
              } else if (getData.statusId === "Chiuso") {
                obj.STATO_COMMESSA_ID = 2;
              } else {
                obj.STATO_COMMESSA_ID = 3;
              }
              if(obj.CODICE_COMMESSA != null && obj.CODICE_COMMESSA != '' && obj.CODICE_COMMESSA != undefined )
             {
              if( obj.NOTES != null && obj.NOTES != '' && obj.NOTES != undefined){
                if( obj.ORE_LAVORATE != null && obj.ORE_LAVORATE != '' && obj.ORE_LAVORATE != undefined && obj.ORE_LAVORATE != '0'){
                  if( obj.UBICAZIONE_ID != null && obj.UBICAZIONE_ID != '' && obj.UBICAZIONE_ID != undefined && obj.UBICAZIONE_ID != NaN){
  
                    var that = this;
                    var cloneData = _.cloneDeep(this.detailModel.getData());
                    var status = this.detailModel.getProperty("/status");
                    var dataString = JSON.stringify(obj);
                    jQuery.when(this.oInitialLoadFinishedDeferred).then(
                      jQuery.proxy(function () {
                        var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                        if (idSelected) {
                          jQuery.ajax({
                            url: sUrl + `ActivitySet/${idSelected}`,
                            contentType: "application/json",
                            type: "PUT",
                            data: dataString,
                            dataType: "json",
                            success: function (oData, oResponse) {
                              // that.entity = "view";
                              // that.enableModel.setProperty("/entity", that.entity);
                              var msg = "Updated Succesfully!";
                              sap.m.MessageToast.show(msg);
                              history.go(-1);
                            },
                            error: function (error) {
                              var msg = "Data not Updated Correctly!";
                              sap.m.MessageToast.show(msg);
                            },
        
                            async: false,
                          });
                        } else {
                          jQuery.ajax({
                            url: sUrl + `ActivitySet`,
                            contentType: "application/json",
                            type: "POST",
                            data: dataString,
                            dataType: "json",
                            success: function (oData, oResponse) {
                              var msg = "Created Succesfully!";
                              sap.m.MessageToast.show(msg);
                              // Modify a specific property in the data
                              idSelected = oData.ID;
                              // Update the model with the modified data
                              history.go(-1);
                            },
                            error: function (error) {
                              var msg = "Data not Inserted Correctly!";
                              sap.m.MessageToast.show(msg);
                            },
        
                            async: false,
                          });
                        }
                      }, this)
                    );
  
                  }
                   
                }
              }
             }
               
  
              
             
            }
          }
          if(dataString === undefined)
          {
            var msg = "Data not Inserted Correctly!";
                              sap.m.MessageToast.show(msg);
          }
        // }
      
      },

      _checkErrorsBeforeSaving: function () {
        this.timesheet.workDate = formatter.formatDate(this.timesheet.date);
        this.timesheet.workHours = parseInt(this.timesheet.workHours)
          ? parseInt(this.timesheet.workHours)
          : 0;
        var activities = this.tendineModel.getProperty("/activities");
        var activity = _.find(activities, {
          workPackage: this.timesheet.activity,
        });
        if (activity && activity.purchaseOrder) {
          var performancePeriodStartDate = formatter.sapDateToDateValue(
            activity.purchaseOrder.performancePeriodStartDate
          );
          var performancePeriodEndDate = formatter.sapDateToDateValue(
            activity.purchaseOrder.performancePeriodEndDate
          );
        }
        var periodsModel = this.getView().getModel("periodsModel");
        var errorMsg = "";
        if (
          this.timesheet.status === "40" &&
          this.cloneModel &&
          this._checkChangesDone()
        ) {
          // se si sta salvando un ts che era stato rifiutato senza aver fatto alcuna modifica, torna errore
          errorMsg = this._getLocalText("noChangesDone");
        } else if (
          !this.timesheet.workHours &&
          this.timesheet.workMinutes === "00"
        ) {
          errorMsg = this._getLocalText("errorHours");
        } else if (
          activity &&
          activity.purchaseOrder &&
          (performancePeriodStartDate > this.timesheet.date ||
            performancePeriodEndDate < this.timesheet.date)
        ) {
          // se esiste il purchaseOrder, bisogna verificare che la data del rapportino sia inclusa tra performancePeriodStartDate e performancePeriodEndDate
          errorMsg = this._getLocalText("wbsDateIsIncorrect");
        } else if (
          !activity.isAbsenceWbs &&
          !periodsModel.getProperty("/activity")
        ) {
          // se sto salvando una wbs non assenza con il periodo delle attività chiuso, torna errore
          errorMsg = this._getLocalText("activitiesPeriodIsClosed");
        } else if (
          activity.isAbsenceWbs &&
          !periodsModel.getProperty("/absence")
        ) {
          // se sto salvando una wbs assenza con il periodo delle assenze chiuso, torna errore
          errorMsg = this._getLocalText("absencesPeriodIsClosed");
        } else {
          // controllo il numero delle ore della giornata
          // se il totale è > 8 torno errore
          var listTimesheet = StorageService.sessionGet("workList");
          if (_.size(listTimesheet) > 0) {
            if (this.timesheet.timeSheetRecord)
              _.remove(listTimesheet, {
                timeSheetRecord: this.timesheet.timeSheetRecord,
              });

            var oreAltreAttivita = _.sumBy(listTimesheet, function (ts) {
              return parseFloat(ts.workHours);
            });

            if (
              oreAltreAttivita + this.timesheet.workHours > 8 &&
              this.timesheet.overtimeCategory === ""
            ) {
              this.enableModel.setProperty("/overtimeRequired", true);
              errorMsg = this._getLocalText("overtimeError");
            }
          }
        }
        if (errorMsg) {
          MessageBox.error(errorMsg);
          return;
        }
        var wrongPlace = this._checkWrongPlaceTs(this.timesheet);
        if (wrongPlace) {
          errorMsg = this._getLocalText("confirmWorkPlaceWithWorkItem");
          MessageBox.confirm(errorMsg, {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: _.bind(this._saveTimesheet, this),
          });
          return;
        }
        this._saveTimesheet();
      },

      _checkChangesDone: function () {
        var noChanges = true;
        for (var i in this.timesheet) {
          if (
            (i !== "date" && this.timesheet[i] !== this.cloneModel[i]) ||
            (i === "date" &&
              this.timesheet[i].getTime() !== this.cloneModel[i].getTime())
          ) {
            noChanges = false;
            break;
          }
        }
        return noChanges;
      },

      _saveTimesheet: function (evt) {
        if (evt === MessageBox.Action.NO) {
          return;
        }
        // se ho trasferta collegata al rapportino e modifico
        // -> la data del rapportino allora devo cancellare il rapportino e crearne uno di nuovo
        // -> la wbs modifico il rapportino
        // se sono in modifica rapportino ed è stata modificata l'attività si chiede se si vogliono trasportare anche le spese (e trasferta)
        this.selectedTs = StorageService.sessionGet("selectedTs");
        this.isTsToDelete =
          this.entity === "edit" &&
          formatter.formatDate(this.timesheet.date) !== this.selectedTs.workDate
            ? true
            : false;
        this.isTransferToChange = null;
        this.isTransferToDelete = null;
        if (
          this.entity === "edit" &&
          this.selectedTs.transfer &&
          (this.timesheet.activity !== this.selectedTs.WBS ||
            formatter.formatDate(this.timesheet.date) !==
              this.selectedTs.workDate)
        ) {
          var msg = this._getLocalText("confirmTransportExpenses");
          MessageBox.confirm(msg, {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: _.bind(this.confirmTransportExpensesClose, this),
          });
        } else {
          this.openDialogBusy(this._getLocalText("savingData"));
          if (this.isTsToDelete) {
            this.deleteTs();
          } else {
            this.saveTimesheet();
          }
        }
      },

      confirmTransportExpensesClose: function (evt) {
        this.transfer = _.cloneDeep(this.selectedTs.transfer);
        this.openDialogBusy(this._getLocalText("savingData"));
        this.expenses = _.cloneDeep(this.selectedTs.expenses);
        if (evt === "NO") {
          this.isTransferToDelete = true;
        } else {
          // se la trasferta è già stata contabilizzata allora, nel caso in cui esista lo stato approvazione lo ripasso uguale, altrimenti passo "DA_APPROVARE"
          this.transferApprovationStatus =
            this.transfer.statoApprovazione === "APPROVATO" &&
            this.transfer.statoContabilizzazione !== "DA_CONTABILIZZARE"
              ? this.transfer.statoApprovazione
              : "DA_APPROVARE";
          // lo stato di contabilizzazione sarà sempre uguale a "DA_CONTABILIZZARE"
          this.transferAccountingStatus = "DA_CONTABILIZZARE";
          this.isTransferToChange = true;
        }
        if (this.isTsToDelete) {
          this.deleteTs();
        } else {
          this.saveTimesheet();
        }
      },

      deleteTs: function () {
        var fSuccess = function () {
          this.saveTimesheet();
        }.bind(this);
        var fError = function (error) {
          this.closeDialogBusy();
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err);
          this._setPage();
        }.bind(this);

        var timesheetToDelete = _.cloneDeep(this.selectedTs);
        timesheetToDelete.operation = "D";
        var timesheet = TimesheetSerializer.toSap(timesheetToDelete);
        oData.saveTs(timesheet, fSuccess, fError);
      },

      saveTimesheet: function () {
        var fSuccess = function (result) {
          if (this.isTransferToChange) {
            var idTimesheet = result.TimeSheetRecord;
            this.changeTransfer(idTimesheet);
          } else if (this.isTransferToDelete) {
            this.deleteExpenses();
          } else {
            this._endSaves(result);
          }
        }.bind(this);
        var fError = function (error) {
          this.closeDialogBusy();
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err);
        }.bind(this);

        this.timesheet.operation =
          this.timesheet.timeSheetRecord && !this.isTsToDelete ? "U" : "C";
        var externalId = this.userModel.getProperty("/userDetail").externalId;
        this.timesheet.cid = externalId;
        if (this.isTsToDelete) {
          delete this.timesheet.timeSheetRecord;
        }
        if (this.timesheet.workLocation !== "2") {
          this.timesheet.officeCode = "";
        }
        var timesheetToSend = TimesheetSerializer.toSap(this.timesheet);
        oData.saveTs(timesheetToSend, fSuccess, fError);
      },

      changeTransfer: function (idTimesheet) {
        var fSuccess = function () {
          this._endSaves();
        }.bind(this);
        var fError = function (error) {
          this.closeDialogBusy();
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err);
        }.bind(this);

        if (this.isTransferToDelete) {
          oData.deleteTransfer(this.transfer.idTrasferta, fSuccess, fError);
        } else {
          var transferToChange = {
            ID_TRASFERTA: this.transfer.idTrasferta,
            ID_DIPENDENTE: this.transfer.idDipendente,
            ID_TIMESHEET: idTimesheet,
            ID_WBS: this.timesheet.activity,
            CHIAVE_TRASFERTA: this.transfer.chiaveTrasferta,
            SOCIETA: this.selectedTs.company,
            DATA_INIZIO:
              "/Date(" + _.clone(this.timesheet.date).setHours(12) + ")/",
            DATA_FINE:
              "/Date(" + _.clone(this.timesheet.date).setHours(12) + ")/",
            STATO_APPROVAZIONE: this.transferApprovationStatus,
            STATO_CONTABILIZZAZIONE: this.transferAccountingStatus,
            // mi prendo l'utente loggato perché il cid da salvare dentro 'CREATO_DA' dev'essere quello di chi è loggato
            CREATO_DA: this.transfer.creatoDa,
            DATA_CREAZIONE:
              "/Date(" + _.clone(this.timesheet.date).setHours(12) + ")/",
          };
          oData.updateTransfer(
            transferToChange.ID_TRASFERTA,
            transferToChange,
            fSuccess,
            fError
          );
        }
      },

      deleteExpenses: function () {
        var counter = -1;
        this._deleteExpense(counter);
      },

      _deleteExpense: function (counter) {
        counter++;
        var fSuccess = function () {
          this._deleteExpense(counter);
        }.bind(this);
        var fError = function (error) {
          this.closeDialogBusy();
          if (error.status === 500 || error.status === 504) {
            this.onCancelPress();
          } else {
            var err = formatter.formatErroriSap(error);
            MessageBox.error(err);
          }
        }.bind(this);

        var expense = this.expenses[counter];
        if (expense) {
          oData.deleteExpense(expense.id, fSuccess, fError);
        } else if (this.isTransferToDelete) {
          this.changeTransfer();
        } else {
          this._endSaves();
        }
      },

      _endSaves: function (result) {
        /* if (this.enableModel.getProperty("/entity") === "new") {
				result.YY1_TMSCounterFlow_TIM = result.TimeSheetRecord;
				if (result.TimeSheetStatus === "20") {
					result.TimeSheetOperation = "U";
					result.TimeSheetIsReleasedOnSave = true;
				}
				oData.saveTs(result, _.bind(function (success) {
					this.closeDialogBusy();
					this.onCancelPress();
				}, this), _.bind(function (error) {
					this.closeDialogBusy();
					var err = formatter.formatErroriSap(error);
					MessageBox.error(err);
				}, this));
			} else { */
        this.closeDialogBusy();
        this.onCancelPress();
        /* } */
      },
    });
  }
);
