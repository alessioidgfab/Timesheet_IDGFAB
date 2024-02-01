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
    "../utils/TransferSerializer",
    "../utils/ExpenseSerializer",
    "../model/StorageService",
    "sap/m/MessageBox",
    "sap/ui/unified/CalendarLegendItem",
    "sap/ui/unified/DateTypeRange",
    "sap/ui/unified/library",
    "sap/ui/core/date/UI5Date",
    "sap/ui/core/Core",
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
    TransferSerializer,
    ExpenseSerializer,
    StorageService,
    MessageBox,
    CalendarLegendItem,
    DateTypeRange,
    unifiedLibrary,
    UI5Date,
    Core
  ) {
    "use strict";

    return BaseController.extend("timesheetproject2.controller.Timesheet", {
      formatter: formatter,

      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      /**
       * Called when the worklist controller is instantiated.
       * @public
       */
      onInit: function () {
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
        // this.oDate = null;
        var modelloJSON = new JSONModel();
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

              this.byId("activities").setProperty("visible", false)
              this.byId("BadgedButton").setProperty("visible", false)
             this.byId("textstopAI").setProperty("visible", false)



        // if (email === 'a.gjoni@idgfab.it') {





        //   this.byId("activities").setProperty("visible", false)
        //   this.byId("BadgedButton").setProperty("visible", false)
        //   this.byId("textstopAI").setProperty("visible", false)
        
        //   this.oDate = null;
        //   if(this.oDate != null && this.oDate != ""){
              
        // timesheetproject2.controller.BaseController.prototype.onInit.apply(
        //   this,
        //   arguments
        // );
        // this.getRouter().getRoute("Timesheet").attachPatternMatched(this._timesheetMatched, this);
        // this.timesheetCalendar = this._getById("timesheetCalendar");

        // this.timesheetModel = modelloJSON;
        // this.getView().setModel(this.timesheetModel, "timesheetModel");

        // this.NotificationModel = modelloJSON;
        // this.getView().setModel(this.NotificationModel, "NotificationModel");

        // this.tableModel = modelloJSON;
        // this.getView().setModel(this.tableModel, "tableModel");

        // this.ColorModel = modelloJSON;
        // this.getView().setModel(this.tableModel, "ColorModel");

        // this.getView().setModel(modelloJSON, "tableModel");
        // this.getView().getModel("tableModel").setProperty("/workList", []);

        // this.rejectionReasonsModel = modelloJSON;
        // this.getView().setModel(
        //   this.rejectionReasonsModel,
        //   "rejectionReasonsModel"
        // );

        // this.legendModel = modelloJSON;
        // this.getView().setModel(this.legendModel, "legendModel");
        // this.getView().setModel(modelloJSON, "legendModel");
        // this.getView().getModel("legendModel").setProperty("/wbs", []);

        // this.commessaModel = modelloJSON;
        // this.getView().setModel(this.commessaModel, "commessaModel");
        // this.getView().setModel(modelloJSON, "commessaModel");

        // this.visibleModel = modelloJSON;
        // this.getView().setModel(this.visibleModel, "visibleModel");

        // this.progressIndicatorModel = modelloJSON;
        // this.getView().setModel(
        //   this.progressIndicatorModel,
        //   "progressIndicatorModel"
        // );

        // this.periodsModel = modelloJSON;
        // this.getView().setModel(this.periodsModel, "periodsModel");
        // StorageService.sessionClear();
        // // Core.attachEventOnce("init", function() {
        // // this._setDayFull();
        // //   });

        //   }
        // } else{
            
        timesheetproject2.controller.BaseController.prototype.onInit.apply(
          this,
          arguments
        );
        this.getRouter().getRoute("Timesheet").attachPatternMatched(this._timesheetMatched, this);
        this.timesheetCalendar = this._getById("timesheetCalendar");

        this.timesheetModel = modelloJSON;
        this.getView().setModel(this.timesheetModel, "timesheetModel");

        this.NotificationModel = modelloJSON;
        this.getView().setModel(this.NotificationModel, "NotificationModel");

        this.tableModel = modelloJSON;
        this.getView().setModel(this.tableModel, "tableModel");

        this.ColorModel = modelloJSON;
        this.getView().setModel(this.tableModel, "ColorModel");

        this.getView().setModel(modelloJSON, "tableModel");
        this.getView().getModel("tableModel").setProperty("/workList", []);

        this.rejectionReasonsModel = modelloJSON;
        this.getView().setModel(
          this.rejectionReasonsModel,
          "rejectionReasonsModel"
        );

        this.legendModel = modelloJSON;
        this.getView().setModel(this.legendModel, "legendModel");
        this.getView().setModel(modelloJSON, "legendModel");
        this.getView().getModel("legendModel").setProperty("/wbs", []);

        this.commessaModel = modelloJSON;
        this.getView().setModel(this.commessaModel, "commessaModel");
        this.getView().setModel(modelloJSON, "commessaModel");

        this.visibleModel = modelloJSON;
        this.getView().setModel(this.visibleModel, "visibleModel");

        this.progressIndicatorModel = modelloJSON;
        this.getView().setModel(
          this.progressIndicatorModel,
          "progressIndicatorModel"
        );

        this.periodsModel = modelloJSON;
        this.getView().setModel(this.periodsModel, "periodsModel");
        // StorageService.sessionClear();
        // Core.attachEventOnce("init", function() {
        // this._setDayFull();
        //   });

        // }
     

      },

      _timesheetMatched: function (evt) {


        //RICHIAMARE L'UTENTE LOGGATO
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   this.getUser = [];
        //   this.assign = [];
        //   var obj = {
        //     EMAIL_UTENTE: email
        //   };
        //   var that = this;
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
        //       var calc = this.getView().getModel("legendModel");
        //       this.getAssign = this.assign.filter(
        //         (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
        //       );
        //       var calcolo = this.getAssign.filter(
        //         (x) => x.STATO_COMMESSA === "Da accettare" && x.ID_ID != 28 && x.ID_ID != 27 && x.ID_ID != 14 && x.ID_ID != 11 && x.ID_ID != 777
        //       );
        //       calc.setProperty("/calcolo", calcolo.length);

        //       // var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        //       // this.oDate = oStore.get("id");
        //       // if (!this.oDate) {
        //       // 	history.go(-1);
        //       // }
        //       this.openDialogBusy(this._getLocalText("loadingPage"));
        //       this.getView().getModel("tableModel").setProperty("/items");
        //       this.byId("idTable").getBinding("items");
        //       this.byId("add").setProperty("visible", false);
        //       this.byId("delete").setProperty("visible", false);
        //       this.byId("duplicate").setProperty("visible", false);
        //       // this.byId("release").setProperty("visible", false);
        //       this.byId("report").setProperty("visible", false);
        //       var calendario = [];
        //       var firstDayOfMonth = this.timesheetCalendar.getStartDate();
        //       this.actualYear = firstDayOfMonth.getFullYear();
        //       this.actualMonth = firstDayOfMonth.getMonth() + 1;
        //       var startDate = formatter.getFirstDayFromMonth(
        //         this.actualYear,
        //         this.actualMonth - 1
        //       );
        //       var endDate = formatter.getLastDayFromMonth(
        //         this.actualYear,
        //         this.actualMonth
        //       );
        //       var targetDateFormat =
        //         sap.ui.core.format.DateFormat.getDateInstance({
        //           pattern: "yyyy-MM-dd",
        //         });
        //       // Format the date to the desired output format
        //       var startDateString = targetDateFormat.format(new Date(startDate));
        //       var endDateString = targetDateFormat.format(new Date(endDate));
        //       var leg = this.getView().getModel("legendModel");
        //       this.legendActivity = [];
        //       this.activitySet = [];
        //       var that = this;



        //       var annoinizio = parseFloat(startDateString);
        //       var meseinizio = parseFloat(startDateString[5] + startDateString[6]);
        //       var gironoinizio = parseFloat(startDateString[8] + startDateString[9]);

        //       var annofine = parseFloat(endDateString);
        //       var mesefine = parseFloat(endDateString[5] + endDateString[6]);
        //       var gironofine = parseFloat(endDateString[8] + endDateString[9]);




        //       var obj = {
        //         DESCRIZIONE_BUTTON: this.getUser[g].ID_UTENTE.toString()
        //       };
        //       var attivitaAssegnate = [];
        //       for (var f = 0; f < this.assign.length; f++) {
        //         attivitaAssegnate.push(this.assign[f].ID_ID);
        //       }
        //       var filter = attivitaAssegnate.map(function (num) {
        //         return `ID eq '${num}'`;
        //       }).join(" or ");
        //       jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //         jQuery.proxy(function () {
        //           var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //           that.makeAjaxRequest(
        //             sUrl + `ActivityOnly?$filter=${filter}`,
        //             function (data) {
        //               // Handle success for Anagrafica_Utenti
        //               that.legendActivity = data.value;
        //             }.bind(this),
        //             function (error) {
        //               // Handle error for Anagrafica_Utenti
        //               // console.log("Error in ActivityOnly: ", error);
        //               sap.ui.core.BusyIndicator.hide();
        //             }.bind(this)
        //           );

        //           that.makeAjaxRequest(
        //             sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
        //             function (data) {
        //               // Handle success for Stato_Commessa
        //               that.activitySet = data.value;
        //             }.bind(this),
        //             function (error) {
        //               // Handle error for Stato_Commessa
        //               // console.log("Error in ActivitySet: ", error);
        //               sap.ui.core.BusyIndicator.hide();
        //             }.bind(this)
        //           );
        //         }, this)
        //       );
        //       this.legendaryColor = [];
        //       for (let i = 0; i < this.legendActivity.length; i++) {
        //         var obj = {};
        //         obj.activity = this.legendActivity[i].Descrizione;
        //         obj.color = this.arrayColori[i];
        //         this.legendaryColor.push(obj);
        //       }
        //       var legendData = [];
        //       var activityCheck = this.activitySet.filter(function (item) {
        //         return (
        //           item.DATA_ATTIVITA >= startDateString &&
        //           item.DATA_ATTIVITA <= endDateString
        //         );
        //       });
        //       var getActivityId = activityCheck.filter(
        //         (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );
        //       for (var i = 0; i < this.legendaryColor.length; i++) {
        //         var checkFinded = getActivityId.filter(
        //           (x) => x.CODICE_COMMESSA === this.legendaryColor[i].activity
        //         );
        //         if (checkFinded.length > 0) {
        //           var modl = {};
        //           modl.description = this.legendaryColor[i].activity;
        //           modl.color = this.legendaryColor[i].color;
        //           modl.select = true;
        //           legendData.push(modl);
        //         }
        //       }
        //       leg.setProperty("/wbs", legendData);

        //       var modelloJSON = new JSONModel();
        //       this.tableModel = modelloJSON;
        //       this.getView().setModel(this.tableModel, "tableModel");
        //       this.fillCalendar();
        //       this.colorPartial();
        //       var col = this.getView().getModel("ColorModel");

        //       var colora = this.getAssign.filter(
        //         (x) => x.STATO_COMMESSA === "Accettata"
        //       );

        //       if (colora.length > 0) {
        //         var colore = "Esiste una Commessa gia accettata";

        //         col.setProperty("/acti", colore);
        //       }
        //       else {
        //         var colore = "non esiste";
        //         col.setProperty("/acti", colore);
        //       }
        //       jQuery.sap.delayedCall(2000, this, function () {
        //         this._setDayFull();
        //         this.closeDialogBusy();
        //       });

        //       // col.setProperty("/acti", colore);
        //     }
        //   }
        // }
        // else {
          //UTENTE IDGFAB
          this.getUser = [];
          this.assign = [];
          var obj = {
            EMAIL_UTENTE: email
          };
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
              var calc = this.getView().getModel("legendModel");
              this.getAssign = this.assign.filter(
                (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
              );
              var calcolo = this.getAssign.filter(
                (x) => x.STATO_COMMESSA === "Da accettare" && x.ID_ID != 28 && x.ID_ID != 27 && x.ID_ID != 14 && x.ID_ID != 11 && x.ID_ID != 777
              );
              calc.setProperty("/calcolo", calcolo.length);

              // var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
              // this.oDate = oStore.get("id");
              // if (!this.oDate) {
              // 	history.go(-1);
              // }
              this.openDialogBusy(this._getLocalText("loadingPage"));
              this.getView().getModel("tableModel").setProperty("/items");
              this.byId("idTable").getBinding("items");
              this.byId("add").setProperty("visible", false);
              this.byId("delete").setProperty("visible", false);
              this.byId("duplicate").setProperty("visible", false);
              // this.byId("release").setProperty("visible", false);
              this.byId("report").setProperty("visible", false);
              var calendario = [];
              var firstDayOfMonth = this.timesheetCalendar.getStartDate();
              this.actualYear = firstDayOfMonth.getFullYear();
              this.actualMonth = firstDayOfMonth.getMonth() + 1;
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

              if (mesefine <= 9 )
              {
                var obj = {
                  DESCRIZIONE_BUTTON: this.getUser[g].ID_UTENTE.toString()
                };
                var attivitaAssegnate = [];
                for (var f = 0; f < this.assign.length; f++) {
                  attivitaAssegnate.push(this.assign[f].ID_ID);
                }
                var filter = attivitaAssegnate.map(function (num) {
                  return `ID eq '${num}'`;
                }).join(" or ");
                jQuery.when(this.oInitialLoadFinishedDeferred).then(
                  jQuery.proxy(function () {
                    var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                    that.makeAjaxRequest(
                      sUrl + `ActivityOnly?$filter=${filter}`,
                      function (data) {
                        // Handle success for Anagrafica_Utenti
                        that.legendActivity = data.value;
                      }.bind(this),
                      function (error) {
                        // Handle error for Anagrafica_Utenti
                        // console.log("Error in ActivityOnly: ", error);
                        sap.ui.core.BusyIndicator.hide();
                      }.bind(this)
                    );
  
                    that.makeAjaxRequest(
                      sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + '0' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + '0' + mesefine + '-' + gironofine}`,
                      function (data) {
                        // Handle success for Stato_Commessa
                        that.activitySet = data.value;
                      }.bind(this),
                      function (error) {
                        // Handle error for Stato_Commessa
                        // console.log("Error in ActivitySet: ", error);
                        sap.ui.core.BusyIndicator.hide();
                      }.bind(this)
                    );
                  }, this)
                );
              }else{
                var obj = {
                  DESCRIZIONE_BUTTON: this.getUser[g].ID_UTENTE.toString()
                };
                var attivitaAssegnate = [];
                for (var f = 0; f < this.assign.length; f++) {
                  attivitaAssegnate.push(this.assign[f].ID_ID);
                }
                var filter = attivitaAssegnate.map(function (num) {
                  return `ID eq '${num}'`;
                }).join(" or ");
                jQuery.when(this.oInitialLoadFinishedDeferred).then(
                  jQuery.proxy(function () {
                    var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                    that.makeAjaxRequest(
                      sUrl + `ActivityOnly?$filter=${filter}`,
                      function (data) {
                        // Handle success for Anagrafica_Utenti
                        that.legendActivity = data.value;
                      }.bind(this),
                      function (error) {
                        // Handle error for Anagrafica_Utenti
                        // console.log("Error in ActivityOnly: ", error);
                        sap.ui.core.BusyIndicator.hide();
                      }.bind(this)
                    );
  
                    that.makeAjaxRequest(
                      sUrl + `ActivitySet?$filter=DESCRIZIONE_BUTTON eq '${obj.DESCRIZIONE_BUTTON}' and DATA_ATTIVITA ge ${annoinizio + '-' + meseinizio + '-' + '0' + gironoinizio} and DATA_ATTIVITA le ${annofine + '-' + mesefine + '-' + gironofine}`,
                      function (data) {
                        // Handle success for Stato_Commessa
                        that.activitySet = data.value;
                      }.bind(this),
                      function (error) {
                        // Handle error for Stato_Commessa
                        // console.log("Error in ActivitySet: ", error);
                        sap.ui.core.BusyIndicator.hide();
                      }.bind(this)
                    );
                  }, this)
                );
              }




             
              this.legendaryColor = [];
              var arrayForLegend = this.removeDupl(
                this.activitySet,
                "CODICE_COMMESSA"
              );
              for (let i = 0; i < arrayForLegend.length; i++) {
                var obj = {};
                obj.activity = arrayForLegend[i].CODICE_COMMESSA;
                obj.color = this.arrayColori[i];
                this.legendaryColor.push(obj);
              }
              var legendData = [];
              var activityCheck = this.activitySet.filter(function (item) {
                return (
                  item.DATA_ATTIVITA >= startDateString &&
                  item.DATA_ATTIVITA <= endDateString
                );
              });
              var getActivityId = activityCheck.filter(
                (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );
              for (var i = 0; i < this.legendaryColor.length; i++) {
                var checkFinded = getActivityId.filter(
                  (x) => x.CODICE_COMMESSA === this.legendaryColor[i].activity
                );
                if (checkFinded.length > 0) {
                  var modl = {};
                  modl.description = this.legendaryColor[i].activity;
                  modl.color = this.legendaryColor[i].color;
                  modl.select = true;
                  legendData.push(modl);
                }
              }
              

              leg.setProperty("/wbs", legendData);

              var modelloJSON = new JSONModel();
              this.tableModel = modelloJSON;
              this.getView().setModel(this.tableModel, "tableModel");
              this.fillCalendar();
              this.colorPartial();
              var col = this.getView().getModel("ColorModel");

              var colora = this.getAssign.filter(
                (x) => x.STATO_COMMESSA === "Accettata"
              );

              if (colora.length > 0) {
                var colore = "Esiste una Commessa gia accettata";

                col.setProperty("/acti", colore);
              }
              else {
                var colore = "non esiste";
                col.setProperty("/acti", colore);
              }
              jQuery.sap.delayedCall(2000, this, function () {
                this._setDayFull();
                this.closeDialogBusy();
              });

              // col.setProperty("/acti", colore);
            }
          }
        // }
      },
      fillCalendar: function () {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var actualDate;
        //       const currentDate = new Date();
        //       var getCalendarDate = this.timesheetCalendar.getSelectedDates()[0];
        //       if (getCalendarDate) {
        //         actualDate = getCalendarDate.getStartDate();
        //       } else {
        //         actualDate = currentDate;
        //       }
        //       var getSelected = this.legendModel.getProperty("/wbs");
        //       // Create a DateFormat instance for the output format "yyyy-MM-dd"
        //       var targetDateFormat =
        //         sap.ui.core.format.DateFormat.getDateInstance({
        //           pattern: "yyyy-MM-dd",
        //         });
        //       // Format the date to the desired output format
        //       var targetDateString = targetDateFormat.format(actualDate);
        //       var mag = this.getView().getModel("tableModel");
        //       this.workPlace = [];
        //       this.stato = [];
        //       this.spese = [];

        //       var spese = [];
        //       for (var s = 0; s < this.activitySet.length; s++) {
        //         spese.push(this.activitySet[s].ID);
        //       }

        //       var filter = spese.map(function (num) {
        //         return `ACTIVITY_ID eq ${num}`;
        //       }).join(" or ");


        //       var that = this;
        //       jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //         jQuery.proxy(function () {
        //           var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //           // Make the AJAX requests using the reusable function
        //           that.makeAjaxRequest(
        //             sUrl + "Luogo_Lavoro",
        //             function (data) {
        //               // Handle success for Anagrafica_Utenti
        //               that.workPlace = data.value;
        //             }.bind(this),
        //             function (error) {
        //               // Handle error for Anagrafica_Utenti
        //               // console.log("Error in Luogo_Lavoro: ", error);
        //               sap.ui.core.BusyIndicator.hide();
        //             }.bind(this)
        //           );

        //           that.makeAjaxRequest(
        //             sUrl + "Stato_Commessa",
        //             function (data) {
        //               // Handle success for Stato_Commessa
        //               that.stato = data.value;
        //             }.bind(this),
        //             function (error) {
        //               // Handle error for Stato_Commessa
        //               // console.log("Error in Stato_Commessa: ", error);
        //               sap.ui.core.BusyIndicator.hide();
        //             }.bind(this)
        //           );

        //           that.makeAjaxRequest(
        //             sUrl + `TipoSpesaSet?$filter=${filter}`,
        //             function (data) {
        //               // Handle success for ActivitySet
        //               that.spese = data.value;
        //             }.bind(this),
        //             function (error) {
        //               // Handle error for ActivitySet
        //               // console.log("Error in TipoSpesaSet: ", error);
        //               sap.ui.core.BusyIndicator.hide();
        //             }.bind(this)
        //           );
        //         }, this)
        //       );
        //       var myData = [];
        //       var getSelected = getSelected.filter(
        //         (item) => item.select === true
        //       );
        //       var getActivityId = this.activitySet.filter(
        //         (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );
        //       var getActivity = getActivityId.filter(
        //         (x) => x.DATA_ATTIVITA == targetDateString
        //       );
        //       var selectedWbs;
        //       if (getSelected.length > 0) {
        //         for (var i = 0; i < getActivity.length; i++) {
        //           selectedWbs = getSelected.find(
        //             (x) => x.description === getActivity[i].CODICE_COMMESSA
        //           );
        //           var getSpese = this.spese.filter(
        //             (x) => x.ACTIVITY_ID === getActivity[i].ID
        //           );
        //           if (selectedWbs) {
        //             var obj = {};
        //             obj.Id = getActivity[i].ID;
        //             obj.WBS = getActivity[i].CODICE_COMMESSA;
        //             obj.descriptionWbs = getActivity[i].DESCRIZIONE;
        //             obj.workHours = getActivity[i].ORE_LAVORATE;
        //             obj.overTime = getActivity[i].OVERTIME;
        //             obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
        //             obj.notes = getActivity[i].NOTES;
        //             obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
        //             obj.workDate = getActivity[i].DATA_ATTIVITA;
        //             for (var y = 0; y < this.workPlace.length; y++) {
        //               if (getActivity[i].UBICAZIONE_ID == this.workPlace[y].ID) {
        //                 obj.workLocDescription = this.workPlace[y].Luogo;
        //               }
        //             }
        //             for (var z = 0; z < this.stato.length; z++) {
        //               if (getActivity[i].STATO_COMMESSA_ID == this.stato[z].ID) {
        //                 obj.statusId = this.stato[z].Stato;
        //               }
        //             }
        //             if (getSpese.length > 0) {
        //               obj.expenses = 1;
        //             }
        //             myData.push(obj);
        //             // this.byId("add").setProperty("visible", true);
        //             this.byId("report").setProperty("visible", true);
        //             // this.byId("release").setProperty("visible", true);
        //             this.byId("duplicate").setProperty("visible", true);
        //             this.byId("delete").setProperty("visible", true);
        //           }
        //         }
        //       } else {
        //         for (var i = 0; i < getActivity.length; i++) {
        //           var getSpese = this.spese.filter(
        //             (x) => x.ACTIVITY_ID === getActivity[i].ID
        //           );
        //           var obj = {};
        //           obj.Id = getActivity[i].ID;
        //           obj.WBS = getActivity[i].CODICE_COMMESSA;
        //           obj.descriptionWbs = getActivity[i].DESCRIZIONE;
        //           obj.workHours = getActivity[i].ORE_LAVORATE;
        //           obj.overTime = getActivity[i].OVERTIME;
        //           obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
        //           obj.notes = getActivity[i].NOTES;
        //           obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
        //           obj.workDate = getActivity[i].DATA_ATTIVITA;
        //           for (var y = 0; y < this.workPlace.length; y++) {
        //             if (getActivity[i].UBICAZIONE_ID == that.workPlace[y].ID) {
        //               obj.workLocDescription = that.workPlace[y].Luogo;
        //             }
        //           }
        //           for (var z = 0; z < that.stato.length; z++) {
        //             if (getActivity[i].STATO_COMMESSA_ID == that.stato[z].ID) {
        //               obj.statusId = this.stato[z].Stato;
        //             }
        //           }
        //           if (getSpese.length > 0) {
        //             obj.expenses = 1;
        //           }
        //           myData.push(obj);
        //           // this.byId("add").setProperty("visible", true);
        //           this.byId("report").setProperty("visible", true);
        //           // this.byId("release").setProperty("visible", true);
        //           this.byId("duplicate").setProperty("visible", true);
        //           this.byId("delete").setProperty("visible", true);
        //         }
        //       }

        //       if (myData.length == 0) {
        //         // this.byId("add").setProperty("visible", true);
        //         this.byId("delete").setProperty("visible", false);
        //         this.byId("duplicate").setProperty("visible", false);
        //         // this.byId("release").setProperty("visible", false);
        //         this.byId("report").setProperty("visible", false);
        //       }
        //       mag.setProperty("/workList", myData);
        //     }
        //   }
        // } else {
          //UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var actualDate;
              const currentDate = new Date();
              var getCalendarDate = this.timesheetCalendar.getSelectedDates()[0];
              if (getCalendarDate) {
                actualDate = getCalendarDate.getStartDate();
              } else {
                actualDate = currentDate;
              }
              var getSelected = this.legendModel.getProperty("/wbs");
              // Create a DateFormat instance for the output format "yyyy-MM-dd"
              var targetDateFormat =
                sap.ui.core.format.DateFormat.getDateInstance({
                  pattern: "yyyy-MM-dd",
                });
              // Format the date to the desired output format
              var targetDateString = targetDateFormat.format(actualDate);
              var mag = this.getView().getModel("tableModel");
              this.workPlace = [];
              this.stato = [];
              this.spese = [];

              var spese = [];
              for (var s = 0; s < this.activitySet.length; s++) {
                spese.push(this.activitySet[s].ID);
              }

              var filter = spese.map(function (num) {
                return `ACTIVITY_ID eq ${num}`;
              }).join(" or ");


              var that = this;
              jQuery.when(this.oInitialLoadFinishedDeferred).then(
                jQuery.proxy(function () {
                  var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                  // Make the AJAX requests using the reusable function
                  that.makeAjaxRequest(
                    sUrl + "Luogo_Lavoro",
                    function (data) {
                      // Handle success for Anagrafica_Utenti
                      that.workPlace = data.value;
                    }.bind(this),
                    function (error) {
                      // Handle error for Anagrafica_Utenti
                      // console.log("Error in Luogo_Lavoro: ", error);
                      sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                  );

                  that.makeAjaxRequest(
                    sUrl + "Stato_Commessa",
                    function (data) {
                      // Handle success for Stato_Commessa
                      that.stato = data.value;
                    }.bind(this),
                    function (error) {
                      // Handle error for Stato_Commessa
                      // console.log("Error in Stato_Commessa: ", error);
                      sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                  );

                  that.makeAjaxRequest(
                    sUrl + `TipoSpesaSet?$filter=${filter}`,
                    function (data) {
                      // Handle success for ActivitySet
                      that.spese = data.value;
                    }.bind(this),
                    function (error) {
                      // Handle error for ActivitySet
                      // console.log("Error in TipoSpesaSet: ", error);
                      sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                  );
                }, this)
              );
              var myData = [];
              var getSelected = getSelected.filter(
                (item) => item.select === true
              );
              var getActivityId = this.activitySet.filter(
                (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );
              var getActivity = getActivityId.filter(
                (x) => x.DATA_ATTIVITA == targetDateString
              );
              var selectedWbs;
              if (getSelected.length > 0) {
                for (var i = 0; i < getActivity.length; i++) {
                  selectedWbs = getSelected.find(
                    (x) => x.description === getActivity[i].CODICE_COMMESSA
                  );
                  var getSpese = this.spese.filter(
                    (x) => x.ACTIVITY_ID === getActivity[i].ID
                  );
                  if (selectedWbs) {
                    var obj = {};
                    obj.Id = getActivity[i].ID;
                    obj.WBS = getActivity[i].CODICE_COMMESSA;
                    obj.descriptionWbs = getActivity[i].DESCRIZIONE;
                    obj.workHours = getActivity[i].ORE_LAVORATE;
                    obj.overTime = getActivity[i].OVERTIME;
                    obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
                    obj.notes = getActivity[i].NOTES;
                    obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
                    obj.workDate = getActivity[i].DATA_ATTIVITA;
                    for (var y = 0; y < this.workPlace.length; y++) {
                      if (getActivity[i].UBICAZIONE_ID == this.workPlace[y].ID) {
                        obj.workLocDescription = this.workPlace[y].Luogo;
                      }
                    }
                    for (var z = 0; z < this.stato.length; z++) {
                      if (getActivity[i].STATO_COMMESSA_ID == this.stato[z].ID) {
                        obj.statusId = this.stato[z].Stato;
                      }
                    }
                    if (getSpese.length > 0) {
                      obj.expenses = 1;
                    }
                    myData.push(obj);
                    // this.byId("add").setProperty("visible", true);
                    this.byId("report").setProperty("visible", true);
                    // this.byId("release").setProperty("visible", true);
                    this.byId("duplicate").setProperty("visible", true);
                    this.byId("delete").setProperty("visible", true);
                  }
                }
              } else {
                for (var i = 0; i < getActivity.length; i++) {
                  var getSpese = this.spese.filter(
                    (x) => x.ACTIVITY_ID === getActivity[i].ID
                  );
                  var obj = {};
                  obj.Id = getActivity[i].ID;
                  obj.WBS = getActivity[i].CODICE_COMMESSA;
                  obj.descriptionWbs = getActivity[i].DESCRIZIONE;
                  obj.workHours = getActivity[i].ORE_LAVORATE;
                  obj.overTime = getActivity[i].OVERTIME;
                  obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
                  obj.notes = getActivity[i].NOTES;
                  obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
                  obj.workDate = getActivity[i].DATA_ATTIVITA;
                  for (var y = 0; y < this.workPlace.length; y++) {
                    if (getActivity[i].UBICAZIONE_ID == that.workPlace[y].ID) {
                      obj.workLocDescription = that.workPlace[y].Luogo;
                    }
                  }
                  for (var z = 0; z < that.stato.length; z++) {
                    if (getActivity[i].STATO_COMMESSA_ID == that.stato[z].ID) {
                      obj.statusId = this.stato[z].Stato;
                    }
                  }
                  if (getSpese.length > 0) {
                    obj.expenses = 1;
                  }
                  myData.push(obj);
                  // this.byId("add").setProperty("visible", true);
                  this.byId("report").setProperty("visible", true);
                  // this.byId("release").setProperty("visible", true);
                  this.byId("duplicate").setProperty("visible", true);
                  this.byId("delete").setProperty("visible", true);
                }
              }

              if (myData.length == 0) {
                // this.byId("add").setProperty("visible", true);
                this.byId("delete").setProperty("visible", false);
                this.byId("duplicate").setProperty("visible", false);
                // this.byId("release").setProperty("visible", false);
                this.byId("report").setProperty("visible", false);
              }
              mag.setProperty("/workList", myData);
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

      _setPage: function (oEvent) {
        // this.openDialogBusy(this._getLocalText("loadingPage"));
        this.openDialogBusy(this._getLocalText("loadingPage"));
        this.visibleModel.setProperty("/genericButtons", true);
        this.visibleModel.setProperty("/addTimesheetButton", false);
        this.visibleModel.setProperty("/duplicateTimesheetButton", false);
        this.visibleModel.setProperty(
          "/releaseTimesheetButton",
          this._checkExistingTsToRelease()
        );
        this.visibleModel.setProperty("/deleteTimesheetButton", false);
        // this.tableModel.setProperty("/totalWorkHoursInDay", "");
        // this.tableModel.setProperty("/workList", "");
        // this.tableModel.setProperty("/workList", []);
        // this.legendModel.setProperty("/wbs", []);
        // this.legendModel.setProperty("/switch", false);

        var firstDayOfMonth = this.timesheetCalendar.getStartDate();
        this.actualYear = firstDayOfMonth.getFullYear();
        this.actualMonth = firstDayOfMonth.getMonth() + 1;
        // var startDate = formatter.getFirstDayFromMonth(
        // 	this.actualYear,
        // 	this.actualMonth - 1
        // );
        // var endDate = formatter.getLastDayFromMonth(
        // 	this.actualYear,
        // 	this.actualMonth
        // );
        this._workDay(true);
        jQuery.sap.delayedCall(1000, this, function () {
          this._timesheetMatched();
        });
      },

      colorPartial: function () {
        var oCalendar = this.getView().byId("timesheetCalendar");
        var getAllData = this._calcolaArrayFestivita(this.actualYear);
        var startDate = new Date(
          formatter.getFirstDayFromMonth(this.actualYear, this.actualMonth - 1)
        ).getDate();
        var endDate = new Date(
          formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
        ).getDate();
        for (var i = startDate; i < endDate + 1; i++) {
          var actualMonth =
            this.actualMonth < 10
              ? "0" + this.actualMonth
              : this.actualMonth.toString();
          var data;
          if (i >= 1 && i <= 9) {
            data = this.actualYear + "-" + actualMonth + "-0" + i;
          } else {
            data = this.actualYear + "-" + actualMonth + "-" + i;
          }
          var date = this.getView().getModel("tableModel");
          date.getProperty(
            "/selectedDay",
            formatter.formatDate(this.selectedDate)
          );
          var checkDateSelect;

          if (i >= 1 && i <= 9) {
            checkDateSelect = "0" + i;
          } else {
            checkDateSelect = "" + i;
          }
          var getMonthDays = getAllData[actualMonth];
          if (getMonthDays) {
            var getDayFest = getMonthDays.filter((x) => x === checkDateSelect);
            checkDateSelect = "";
            if (getDayFest && getDayFest.length > 0) {
              var oNonWorkingDate = new sap.ui.unified.DateTypeRange({
                startDate: new Date(data), // Specify the non-working date
                endDate: new Date(data), // If it's a single-day non-working date, endDate is the same as startDate
                type: sap.ui.unified.CalendarDayType.NonWorking, // Custom type for the non-working date
              });
              oCalendar.addSpecialDate(oNonWorkingDate);
            }
          }
        }
      },

      _getRejectionReasons: function (startDate, endDate) {
        var fSuccess = function (result) {
          this.rejectionReasonsModel.setData(result.results);
          this._getTimesheet(startDate, endDate);
        }.bind(this);
        var fError = function (error) {
          this.closeDialogBusy();
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err);
        }.bind(this);
        oData.getRejectionReasons(fSuccess, fError);
        oData.getRejectionReasonsJson(fSuccess, fError);
      },

      _afterGetPeriods: function (dialogCalendarProperty) {
        this._setDayFull(dialogCalendarProperty);
      },

      // funzione per la colorazione delle giornate con attività

      _setDayFull: function (dialogCalendarProperty) {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {

        //       var startDate = new Date(
        //         formatter.getFirstDayFromMonth(
        //           this.actualYear,
        //           this.actualMonth - 1
        //         )
        //       ).getDate();
        //       var endDate = new Date(
        //         formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
        //       ).getDate();
        //       var getSelected = this.legendModel.getProperty("/wbs");
        //       var getActivityId = this.activitySet.filter(
        //         (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );
        //       var getAllSelected = getSelected.filter(
        //         (item) => item.select === true
        //       );
        //       for (var i = startDate; i < endDate + 1; i++) {
        //         i = i < 10 ? "0" + i : i.toString();
        //         var actualMonth =
        //           this.actualMonth < 10
        //             ? "0" + this.actualMonth
        //             : this.actualMonth.toString();
        //         var data = this.actualYear + "" + actualMonth + "" + i;
        //         var dataSelected = this.actualYear + "-" + actualMonth + "-" + i;
        //         var selectedDate = $('[id$="Month0-' + data + '"]')[0];
        //         var getFilteredData = getActivityId.filter(
        //           (x) => x.DATA_ATTIVITA === dataSelected
        //         );
        //         let colors = "";
        //         let check = 0;
        //         let col = 6;
        //         var removeDuplicates = this.removeDupl(
        //           getFilteredData,
        //           "CODICE_COMMESSA"
        //         );
        //         for (let i = 0; i < removeDuplicates.length; i++) {
        //           var getChecked = getAllSelected.find(
        //             (obj) =>
        //               obj.description === removeDuplicates[i].CODICE_COMMESSA
        //           );
        //           if (check == 0 && getChecked) {
        //             check = 1;
        //             colors += `inset 6px 0rem 0 ${getChecked.color}`;
        //           } else if (check > 0 && getChecked) {
        //             col = col + 6;
        //             colors += ` , inset ${col}px 0rem 0 ${getChecked.color}`;
        //           }
        //         }
        //         check = 0;
        //         col = 0;
        //         if(selectedDate != undefined){
        //           selectedDate.style.boxShadow = colors;
        //         }
                
        //       }
        //     }
        //   }
        // }
        // else {
          //UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {

              var startDate = new Date(
                formatter.getFirstDayFromMonth(
                  this.actualYear,
                  this.actualMonth - 1
                )
              ).getDate();
              var endDate = new Date(
                formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
              ).getDate();
              var getSelected = this.legendModel.getProperty("/wbs");
              var getActivityId = this.activitySet.filter(
                (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );
              var getAllSelected = getSelected.filter(
                (item) => item.select === true
              );
              for (var i = startDate; i < endDate + 1; i++) {
                i = i < 10 ? "0" + i : i.toString();
                var actualMonth =
                  this.actualMonth < 10
                    ? "0" + this.actualMonth
                    : this.actualMonth.toString();
                var data = this.actualYear + "" + actualMonth + "" + i;
                var dataSelected = this.actualYear + "-" + actualMonth + "-" + i;
                var selectedDate = $('[id$="Month0-' + data + '"]')[0];
                var getFilteredData = getActivityId.filter(
                  (x) => x.DATA_ATTIVITA === dataSelected
                );
                let colors = "";
                let check = 0;
                let col = 6;
                var removeDuplicates = this.removeDupl(
                  getFilteredData,
                  "CODICE_COMMESSA"
                );
                for (let i = 0; i < removeDuplicates.length; i++) {
                  var getChecked = getAllSelected.find(
                    (obj) =>
                      obj.description === removeDuplicates[i].CODICE_COMMESSA
                  );
                  if (check == 0 && getChecked) {
                    check = 1;
                    colors += `inset 6px 0rem 0 ${getChecked.color}`;
                  } else if (check > 0 && getChecked) {
                    col = col + 6;
                    colors += ` , inset ${col}px 0rem 0 ${getChecked.color}`;
                  }
                }
                check = 0;
                col = 0;
                selectedDate.style.boxShadow = colors;
              }
            }
          }
        // }


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

      _checkExistingTsToRelease: function () {
        var periodsModel = this.getView().getModel("periodsModel");
        var daysPeriods = periodsModel.getProperty("/periods");
        var allTimesheetToRelease = _.filter(
          this.timesheetModel.getProperty("/timesheet"),
          {
            statusId: "10",
          }
        );
        var openDaysWithTsToRelease = _.filter(daysPeriods, function (n) {
          var dateToCompare = formatter.formatDate(n.data);
          var activitiesForDay = _.find(allTimesheetToRelease, function (z) {
            return z.workDate === dateToCompare && !z.absenceCode;
          });
          var absencesForDay = _.find(allTimesheetToRelease, function (z) {
            return z.workDate === dateToCompare && z.absenceCode;
          });
          var openDayWithTsToRelease = _.find(n.validita, function (k) {
            return (
              (k.tipo === "ATTIVITA" && k.aperto && activitiesForDay) ||
              (k.tipo === "ASSENZE" && k.aperto && absencesForDay)
            );
          });
          if (openDayWithTsToRelease) {
            return n;
          }
        });
        if (openDaysWithTsToRelease.length) {
          // mostro il bottone di rilascio se c'è almeno un giorno con il periodo aperto e in quel giorno c'è almeno un rapportino in stato 10
          return true;
        } else {
          return false;
        }
      },

      // imposto la classe dei giorni del week end sui giorni festivi
      _workDay: function (dialogCalendarProperty) {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
    
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {


        //       var startDate = new Date(
        //         formatter.getFirstDayFromMonth(
        //           this.actualYear,
        //           this.actualMonth - 1
        //         )
        //       ).getDate();
        //       var endDate = new Date(
        //         formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
        //       ).getDate();
        //       var workingDaysArray = [];
        //       var calendarId = dialogCalendarProperty
        //         ? "idTsCalendar"
        //         : "timesheetCalendar";
        //       for (var i = startDate; i < endDate + 1; i++) {
        //         var day = i;
        //         day = day < 10 ? "0" + day : day.toString();
        //         var actualMonth = this.actualMonth.toString();
        //         if (this.actualMonth < 10) {
        //           actualMonth = "0" + this.actualMonth;
        //         }
        //         var giorno =
        //           this.actualYear.toString() + "" + actualMonth + "" + day;
        //         var arrayFestivita = this._calcolaArrayFestivita(this.actualYear);
        //         if (arrayFestivita[actualMonth]) {
        //           for (var k = 0; k < arrayFestivita[actualMonth].length; k++) {
        //             if (day === arrayFestivita[actualMonth][k]) {
        //               if ($('[id$="' + giorno + '"]')[0]) {
        //                 var id = $('[id$="' + giorno + '"]')[0].id;
        //                 $("#" + id).addClass("sapUiCalItemWeekEnd");
        //                 break;
        //               }
        //             }
        //           }
        //         }
        //         var cellDay = $(
        //           "[id$='" + calendarId + "--Month0-" + giorno + "']"
        //         )[0];
        //         var workingDay = true;
        //         if (cellDay) {
        //           if (cellDay.className.indexOf("sapUiCalItemWeekEnd") >= 0) {
        //             workingDay = false;
        //           }
        //           if (workingDay) {
        //             workingDaysArray.push(giorno);
        //           }
        //         }
        //       }
        //       if (!dialogCalendarProperty) {
        //         this._setProgressIndicator(workingDaysArray);
        //         this.updateTable();
        //       }
        //       if (this.legendModel.getProperty("/switch")) {
        //         this.colorPartialDays();
        //       }
        //     }
        //   }
        // }
        // else {
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {


              var startDate = new Date(
                formatter.getFirstDayFromMonth(
                  this.actualYear,
                  this.actualMonth - 1
                )
              ).getDate();
              var endDate = new Date(
                formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
              ).getDate();
              var workingDaysArray = [];
              var calendarId = dialogCalendarProperty
                ? "idTsCalendar"
                : "timesheetCalendar";
              for (var i = startDate; i < endDate + 1; i++) {
                var day = i;
                day = day < 10 ? "0" + day : day.toString();
                var actualMonth = this.actualMonth.toString();
                if (this.actualMonth < 10) {
                  actualMonth = "0" + this.actualMonth;
                }
                var giorno =
                  this.actualYear.toString() + "" + actualMonth + "" + day;
                var arrayFestivita = this._calcolaArrayFestivita(this.actualYear);
                if (arrayFestivita[actualMonth]) {
                  for (var k = 0; k < arrayFestivita[actualMonth].length; k++) {
                    if (day === arrayFestivita[actualMonth][k]) {
                      if ($('[id$="' + giorno + '"]')[0]) {
                        var id = $('[id$="' + giorno + '"]')[0].id;
                        $("#" + id).addClass("sapUiCalItemWeekEnd");
                        break;
                      }
                    }
                  }
                }
                var cellDay = $(
                  "[id$='" + calendarId + "--Month0-" + giorno + "']"
                )[0];
                var workingDay = true;
                if (cellDay) {
                  if (cellDay.className.indexOf("sapUiCalItemWeekEnd") >= 0) {
                    workingDay = false;
                  }
                  if (workingDay) {
                    workingDaysArray.push(giorno);
                  }
                }
              }
              if (!dialogCalendarProperty) {
                this._setProgressIndicator(workingDaysArray);
                this.updateTable();
              }
              if (this.legendModel.getProperty("/switch")) {
                this.colorPartialDays();
              }
            }
          }
        // }


      },

      _setProgressIndicator: function (workingDaysArray) {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var startDate = formatter.getFirstDayFromMonth(
        //         this.actualYear,
        //         this.actualMonth - 1
        //       );
        //       var endDate = formatter.getLastDayFromMonth(
        //         this.actualYear,
        //         this.actualMonth
        //       );
        //       var totalWorkingHours = workingDaysArray.length * 8;
        //       var totalHoursEntered = 0;
        //       var releasableHours = 0;
        //       var getActivityId = this.activitySet.filter(
        //         (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );
        //       for (var i = 0; i < getActivityId.length; i++) {
        //         var dataore = getActivityId[i].DATA_ATTIVITA;
        //         var date = formatter.getDayFormatTimesheet(dataore);

        //         if (date >= startDate && date <= endDate) {
        //           var ts = getActivityId[i];

        //           releasableHours +=
        //             parseFloat(getActivityId[i].OVERTIME) +
        //             parseFloat(getActivityId[i].ORE_LAVORATE);
        //           totalHoursEntered += parseFloat(getActivityId[i].ORE_LAVORATE);
        //         }
        //       }
        //       // definisco la percentuale di ore rilasciate
        //       var percentageReleasableHours = parseInt(
        //         (100 / totalWorkingHours) * releasableHours
        //       );
        //       // definisco lo stato
        //       var status = "Warning";
        //       if (percentageReleasableHours === 100) {
        //         status = "Success";
        //       } else if (percentageReleasableHours > 100) {
        //         status = "Error";
        //         percentageReleasableHours = 100;
        //       }
        //       this.progressIndicatorModel.setProperty("/status", status);
        //       this.progressIndicatorModel.setProperty(
        //         "/percentageReleasableHours",
        //         percentageReleasableHours
        //       );
        //       // definisco la stringa da mostrare
        //       var stringValue =
        //         releasableHours +
        //         "h " +
        //         this._getLocalText("of") +
        //         " " +
        //         totalWorkingHours;
        //       this.progressIndicatorModel.setProperty(
        //         "/stringValue",
        //         stringValue
        //       );
        //       // definisco il tooltip
        //       var tooltip =
        //         this._getLocalText("workingDays") +
        //         ":	" +
        //         workingDaysArray.length +
        //         "\n" +
        //         "--------------------------\n" +
        //         this._getLocalText("workingHours") +
        //         ":	" +
        //         totalWorkingHours +
        //         "\n" +
        //         this._getLocalText("reportedHours") +
        //         ":	" +
        //         totalHoursEntered +
        //         "\n" +
        //         this._getLocalText("releasableHours") +
        //         ":	" +
        //         releasableHours;
        //       this.progressIndicatorModel.setProperty("/tooltip", tooltip);
        //     }
        //   }
        // }
        // else {
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var startDate = formatter.getFirstDayFromMonth(
                this.actualYear,
                this.actualMonth - 1
              );
              var endDate = formatter.getLastDayFromMonth(
                this.actualYear,
                this.actualMonth
              );
              var totalWorkingHours = workingDaysArray.length * 8;
              var totalHoursEntered = 0;
              var releasableHours = 0;
              var getActivityId = this.activitySet.filter(
                (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );
              for (var m = 0; m < getActivityId.length; m++) {
                var dataore = getActivityId[m].DATA_ATTIVITA;
                var date = formatter.getDayFormatTimesheetProgress(dataore);
                var startDateformato = formatter.getDayFormatTimesheet(startDate);
                var endDateformato = formatter.getDayFormatTimesheet(endDate);

                

                if (date >= startDateformato && date <= endDateformato) {
                  var ts = getActivityId[m];

                  releasableHours +=
                    parseFloat(getActivityId[m].OVERTIME) +
                    parseFloat(getActivityId[m].ORE_LAVORATE);
                  totalHoursEntered += parseFloat(getActivityId[m].ORE_LAVORATE);
                }
              }
              // definisco la percentuale di ore rilasciate
              var percentageReleasableHours = parseInt(
                (100 / totalWorkingHours) * releasableHours
              );
              // definisco lo stato
              var status = "Warning";
              if (percentageReleasableHours === 100) {
                status = "Success";
              } else if (percentageReleasableHours > 100) {
                status = "Error";
                percentageReleasableHours = 100;
              }
              this.progressIndicatorModel.setProperty("/status", status);
              this.progressIndicatorModel.setProperty(
                "/percentageReleasableHours",
                percentageReleasableHours
              );
              // definisco la stringa da mostrare
              var stringValue =
                releasableHours +
                "h " +
                this._getLocalText("of") +
                " " +
                totalWorkingHours;
              this.progressIndicatorModel.setProperty(
                "/stringValue",
                stringValue
              );
              // definisco il tooltip
              var tooltip =
                this._getLocalText("workingDays") +
                ":	" +
                workingDaysArray.length +
                "\n" +
                "--------------------------\n" +
                this._getLocalText("workingHours") +
                ":	" +
                totalWorkingHours +
                "\n" +
                this._getLocalText("reportedHours") +
                ":	" +
                totalHoursEntered +
                "\n" +
                this._getLocalText("releasableHours") +
                ":	" +
                releasableHours;
              this.progressIndicatorModel.setProperty("/tooltip", tooltip);
            }
          }
        // }


      },

      // funzione che colora i giorni con meno di 8 ore lavorate di giallo
      colorPartialDays: function () {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       this.check = "yes";
        //       // CODICE ALEK
        //       var oCalendar = this.getView().byId("timesheetCalendar");
        //       var getDate = new Date(oCalendar.getStartDate());
        //       var startDate = new Date(
        //         formatter.getFirstDayFromMonth(
        //           this.actualYear,
        //           this.actualMonth - 1
        //         )
        //       ).getDate();
        //       var endDate = new Date(
        //         formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
        //       ).getDate();
        //       // var year = getDate.getFullYear();
        //       // var day = getDate.getDate();
        //       var month = getDate.getMonth() + 1;
        //       var arrayFestivita = this._calcolaArrayFestivita(this.actualYear);
        //       var state = this.legendModel.getProperty("/switch");
        //       if (state == true) {
        //         for (var i = startDate; i < endDate + 1; i++) {
        //           // for (var x = 0; x < timesheet.length; x++) {
        //           i = i < 10 ? "0" + i : i.toString();
        //           // var allDailyWbs = _.filter(timesheet, function (n) { });
        //           var sum = 0;
        //           var actualMonth =
        //             this.actualMonth < 10
        //               ? "0" + this.actualMonth
        //               : this.actualMonth.toString();
        //           var data = this.actualYear + "" + actualMonth + "" + i;
        //           var dataFind = this.actualYear + "-" + actualMonth + "-" + i;
        //           var getActivityId = this.activitySet.filter(
        //             (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //           );
        //           var checkDates = getActivityId.filter(
        //             (x) => x.DATA_ATTIVITA === dataFind
        //           );
        //           var oNonWorkingDate;
        //           for (let j = 0; j < checkDates.length; j++) {
        //             sum = sum + parseInt(checkDates[j].ORE_LAVORATE);
        //             sum = sum + parseFloat(checkDates[j].OVERTIME);
        //           }
        //           var monthNum;
        //           var getDayFestNum;
        //           if (month >= 1 && month <= 9) {
        //             monthNum = "0" + month;
        //           } else {
        //             monthNum = month;
        //           }
        //           var getMonthDays = arrayFestivita[monthNum];
        //           if (getMonthDays) {
        //             var getDayFest = getMonthDays.filter((x) => x == i);
        //             if (getDayFest && getDayFest.length > 0) {
        //               getDayFestNum = getDayFest[0];
        //             }
        //           }
        //           var actualMonth =
        //             this.actualMonth < 10
        //               ? "0" + this.actualMonth
        //               : this.actualMonth.toString();
        //           var data = this.actualYear + "" + actualMonth + "" + i;
        //           var selectedDate = $('[id$="Month0-' + data + '"]')[0];
        //           var dateClasses = selectedDate.className;
        //           var getData = new Date(dataFind).getDay();
        //           if (
        //             sum < 8 &&
        //             getData !== 6 &&
        //             getData !== 0 &&
        //             !getDayFestNum
        //           ) {
        //             var oNonWorkingDate = new sap.ui.unified.DateTypeRange({
        //               startDate: new Date(dataFind),
        //               endDate: new Date(dataFind),
        //               type: sap.ui.unified.CalendarDayType.Type01,
        //             });
        //             oCalendar.addSpecialDate(oNonWorkingDate);
        //           }
        //           getDayFestNum = "";
        //           sum = 0;
        //         }
        //       } else {
        //         var allSpecialDates = [];
        //         var actualMonnthNum = "";
        //         if (this.actualMonth >= 1 && this.actualMonth <= 9) {
        //           actualMonnthNum = "0" + this.actualMonth;
        //         } else {
        //           actualMonnthNum = this.actualMonth;
        //         }
        //         var targetDateFormat =
        //           sap.ui.core.format.DateFormat.getDateInstance({
        //             pattern: "yyyy-MM-dd",
        //           });
        //         let filteredObject = {};
        //         filteredObject.dates;
        //         for (var key in arrayFestivita) {
        //           if (key == actualMonnthNum) {
        //             filteredObject.dates = arrayFestivita[key];
        //           }
        //         }
        //         if (filteredObject.dates) {
        //           for (let i = 0; i < filteredObject.dates.length; i++) {
        //             var newDate =
        //               this.actualYear +
        //               "-" +
        //               actualMonnthNum +
        //               "-" +
        //               filteredObject.dates[i];
        //             allSpecialDates.push(newDate);
        //           }
        //         }
        //         if (oCalendar.getSpecialDates().length > 0) {
        //           for (
        //             let i = oCalendar.getSpecialDates().length - 1;
        //             i >= 0;
        //             i--
        //           ) {
        //             var filterSpecialDate = [];
        //             filterSpecialDate = allSpecialDates.filter(
        //               (x) =>
        //                 x ==
        //                 targetDateFormat.format(
        //                   oCalendar.getSpecialDates()[i].getStartDate()
        //                 )
        //             );
        //             if (filterSpecialDate.length === 0) {
        //               this._workDay();
        //               oCalendar.removeSpecialDate(oCalendar.getSpecialDates()[i]);
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        // else {
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              this.check = "yes";
              // CODICE ALEK
              var oCalendar = this.getView().byId("timesheetCalendar");
              var getDate = new Date(oCalendar.getStartDate());
              var startDate = new Date(
                formatter.getFirstDayFromMonth(
                  this.actualYear,
                  this.actualMonth - 1
                )
              ).getDate();
              var endDate = new Date(
                formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
              ).getDate();
              // var year = getDate.getFullYear();
              // var day = getDate.getDate();
              var month = getDate.getMonth() + 1;
              var arrayFestivita = this._calcolaArrayFestivita(this.actualYear);
              var state = this.legendModel.getProperty("/switch");
              if (state == true) {
                for (var i = startDate; i < endDate + 1; i++) {
                  // for (var x = 0; x < timesheet.length; x++) {
                  i = i < 10 ? "0" + i : i.toString();
                  // var allDailyWbs = _.filter(timesheet, function (n) { });
                  var sum = 0;
                  var actualMonth =
                    this.actualMonth < 10
                      ? "0" + this.actualMonth
                      : this.actualMonth.toString();
                  var data = this.actualYear + "" + actualMonth + "" + i;
                  var dataFind = this.actualYear + "-" + actualMonth + "-" + i;
                  var getActivityId = this.activitySet.filter(
                    (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
                  );
                  var checkDates = getActivityId.filter(
                    (x) => x.DATA_ATTIVITA === dataFind
                  );
                  var oNonWorkingDate;
                  for (let j = 0; j < checkDates.length; j++) {
                    sum = sum + parseInt(checkDates[j].ORE_LAVORATE);
                    sum = sum + parseFloat(checkDates[j].OVERTIME);
                  }
                  var monthNum;
                  var getDayFestNum;
                  if (month >= 1 && month <= 9) {
                    monthNum = "0" + month;
                  } else {
                    monthNum = month;
                  }
                  var getMonthDays = arrayFestivita[monthNum];
                  if (getMonthDays) {
                    var getDayFest = getMonthDays.filter((x) => x == i);
                    if (getDayFest && getDayFest.length > 0) {
                      getDayFestNum = getDayFest[0];
                    }
                  }
                  var actualMonth =
                    this.actualMonth < 10
                      ? "0" + this.actualMonth
                      : this.actualMonth.toString();
                  var data = this.actualYear + "" + actualMonth + "" + i;
                  var selectedDate = $('[id$="Month0-' + data + '"]')[0];
                  var dateClasses = selectedDate.className;
                  var getData = new Date(dataFind).getDay();
                  if (
                    sum < 8 &&
                    getData !== 6 &&
                    getData !== 0 &&
                    !getDayFestNum
                  ) {
                    var oNonWorkingDate = new sap.ui.unified.DateTypeRange({
                      startDate: new Date(dataFind),
                      endDate: new Date(dataFind),
                      type: sap.ui.unified.CalendarDayType.Type01,
                    });
                    oCalendar.addSpecialDate(oNonWorkingDate);
                  }
                  getDayFestNum = "";
                  sum = 0;
                }
              } else {
                var allSpecialDates = [];
                var actualMonnthNum = "";
                if (this.actualMonth >= 1 && this.actualMonth <= 9) {
                  actualMonnthNum = "0" + this.actualMonth;
                } else {
                  actualMonnthNum = this.actualMonth;
                }
                var targetDateFormat =
                  sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyy-MM-dd",
                  });
                let filteredObject = {};
                filteredObject.dates;
                for (var key in arrayFestivita) {
                  if (key == actualMonnthNum) {
                    filteredObject.dates = arrayFestivita[key];
                  }
                }
                if (filteredObject.dates) {
                  for (let i = 0; i < filteredObject.dates.length; i++) {
                    var newDate =
                      this.actualYear +
                      "-" +
                      actualMonnthNum +
                      "-" +
                      filteredObject.dates[i];
                    allSpecialDates.push(newDate);
                  }
                }
                if (oCalendar.getSpecialDates().length > 0) {
                  for (
                    let i = oCalendar.getSpecialDates().length - 1;
                    i >= 0;
                    i--
                  ) {
                    var filterSpecialDate = [];
                    filterSpecialDate = allSpecialDates.filter(
                      (x) =>
                        x ==
                        targetDateFormat.format(
                          oCalendar.getSpecialDates()[i].getStartDate()
                        )
                    );
                    if (filterSpecialDate.length === 0) {
                      this._workDay();
                      oCalendar.removeSpecialDate(oCalendar.getSpecialDates()[i]);
                    }
                  }
                }
              }
            }
          }
        // }


      },

      // funzione lanciata quando si seleziona un giorno del calendario
      onPressSingleDay: function (evt) {
        evt.preventDefault();
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
        
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var calendar = evt.getSource();
        //       var modelloJSON = new JSONModel();
        //       this.tableModel = modelloJSON;
        //       this.getView().setModel(this.tableModel, "tableModel");
        //       var date = this.getView().getModel("tableModel");
        //       this.selectedDate = new Date(
        //         calendar.getSelectedDates()[0].getStartDate()
        //       );
        //       date.setProperty(
        //         "/selectedDay",
        //         formatter.formatDate(this.selectedDate)
        //       );
        //       var mag = this.getView().getModel("tableModel");
        //       var targetDateFormat =
        //         sap.ui.core.format.DateFormat.getDateInstance({
        //           pattern: "yyyy-MM-dd",
        //         });
        //       // Format the date to the desired output format
        //       var targetDateString = targetDateFormat.format(this.selectedDate);
        //       var getSelected = this.legendModel.getProperty("/wbs");
        //       var myData = [];
        //       var getSelected = getSelected.filter(
        //         (item) => item.select === true
        //       );
        //       var getActivityId = this.activitySet.filter(
        //         (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );
        //       var getActivity = getActivityId.filter(
        //         (x) => x.DATA_ATTIVITA == targetDateString
        //       );
        //       var sum = 0;
        //       var selectedWbs;
        //       if (getSelected.length > 0) {
        //         for (var i = 0; i < getActivity.length; i++) {

        //           selectedWbs = getSelected.find(
        //             (x) => x.description === getActivity[i].CODICE_COMMESSA
        //           );
        //           var getSpese = this.spese.filter(
        //             (x) => x.ACTIVITY_ID === getActivity[i].ID
        //           );
        //           if (selectedWbs) {
        //             var obj = {};
        //             obj.Id = getActivity[i].ID;
        //             obj.WBS = getActivity[i].CODICE_COMMESSA;
        //             obj.descriptionWbs = getActivity[i].DESCRIZIONE;
        //             obj.workHours = getActivity[i].ORE_LAVORATE;
        //             obj.overTime = getActivity[i].OVERTIME;
        //             obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
        //             obj.notes = getActivity[i].NOTES;
        //             obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
        //             obj.workDate = getActivity[i].DATA_ATTIVITA;
        //             for (var y = 0; y < this.workPlace.length; y++) {
        //               if (getActivity[i].UBICAZIONE_ID == this.workPlace[y].ID) {
        //                 obj.workLocDescription = this.workPlace[y].Luogo;
        //               }
        //             }
        //             for (var z = 0; z < this.stato.length; z++) {
        //               if (getActivity[i].STATO_COMMESSA_ID == this.stato[z].ID) {
        //                 obj.statusId = this.stato[z].Stato;
        //               }
        //             }
        //             if (getSpese.length > 0) {
        //               obj.expenses = 1;
        //             }
        //             myData.push(obj);
        //             this.byId("add").setProperty("visible", true);
        //             this.byId("report").setProperty("visible", true);
        //             // this.byId("release").setProperty("visible", true);
        //             this.byId("duplicate").setProperty("visible", true);
        //             this.byId("delete").setProperty("visible", true);
        //           }
        //         }
        //       } else {
        //         for (var i = 0; i < getActivity.length; i++) {
        //           var getSpese = this.spese.filter(
        //             (x) => x.ACTIVITY_ID === getActivity[i].ID
        //           );
        //           var obj = {};
        //           obj.Id = getActivity[i].ID;
        //           obj.WBS = getActivity[i].CODICE_COMMESSA;
        //           obj.descriptionWbs = getActivity[i].DESCRIZIONE;
        //           obj.workHours = getActivity[i].ORE_LAVORATE;
        //           obj.overTime = getActivity[i].OVERTIME;
        //           obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
        //           obj.notes = getActivity[i].NOTES;
        //           obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
        //           obj.workDate = getActivity[i].DATA_ATTIVITA;
        //           for (var y = 0; y < this.workPlace.length; y++) {
        //             if (getActivity[i].UBICAZIONE_ID == this.workPlace[y].ID) {
        //               obj.workLocDescription = this.workPlace[y].Luogo;
        //             }
        //           }
        //           for (var z = 0; z < this.stato.length; z++) {
        //             if (getActivity[i].STATO_COMMESSA_ID == this.stato[z].ID) {
        //               obj.statusId = this.stato[z].Stato;
        //             }
        //           }
        //           if (getSpese.length > 0) {
        //             obj.expenses = 1;
        //           }
        //           myData.push(obj);
        //           this.byId("add").setProperty("visible", true);
        //           this.byId("report").setProperty("visible", true);
        //           // this.byId("release").setProperty("visible", true);
        //           this.byId("duplicate").setProperty("visible", true);
        //           this.byId("delete").setProperty("visible", true);
        //         }
        //       }

        //       if (myData.length == 0) {
        //         this.byId("add").setProperty("visible", true);
        //         this.byId("delete").setProperty("visible", false);
        //         this.byId("duplicate").setProperty("visible", false);
        //         // this.byId("release").setProperty("visible", false);
        //         this.byId("report").setProperty("visible", false);
        //       }
        //       if (myData.length > 0) {
        //         for (var x = 0; x < myData.length; x++) {
        //           sum = sum + parseInt(myData[x].workHours);
        //           if (sum >= 8) {
        //             this.byId("add").setProperty("visible", false);
        //           }
        //         }
        //       }

        //       mag.setProperty("/workList", myData);
        //       // this.fillCalendar();
        //       this._workDay(false);
        //       jQuery.sap.delayedCall(10, this, function () {
        //         this._setDayFull();
        //       });
        //     }
        //   }
        // }
        // else {
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var calendar = evt.getSource();
              var modelloJSON = new JSONModel();
              this.tableModel = modelloJSON;
              this.getView().setModel(this.tableModel, "tableModel");
              var date = this.getView().getModel("tableModel");
              this.selectedDate = new Date(
                calendar.getSelectedDates()[0].getStartDate()
              );
              date.setProperty(
                "/selectedDay",
                formatter.formatDate(this.selectedDate)
              );
              var mag = this.getView().getModel("tableModel");
              var targetDateFormat =
                sap.ui.core.format.DateFormat.getDateInstance({
                  pattern: "yyyy-MM-dd",
                });
              // Format the date to the desired output format
              var targetDateString = targetDateFormat.format(this.selectedDate);
              var getSelected = this.legendModel.getProperty("/wbs");
              var myData = [];
              var getSelected = getSelected.filter(
                (item) => item.select === true
              );
              var getActivityId = this.activitySet.filter(
                (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );
              var getActivity = getActivityId.filter(
                (x) => x.DATA_ATTIVITA == targetDateString
              );
              var sum = 0;
              var selectedWbs;
              if (getSelected.length > 0) {
                for (var i = 0; i < getActivity.length; i++) {

                  selectedWbs = getSelected.find(
                    (x) => x.description === getActivity[i].CODICE_COMMESSA
                  );
                  var getSpese = this.spese.filter(
                    (x) => x.ACTIVITY_ID === getActivity[i].ID
                  );
                  if (selectedWbs) {
                    var obj = {};
                    obj.Id = getActivity[i].ID;
                    obj.WBS = getActivity[i].CODICE_COMMESSA;
                    obj.descriptionWbs = getActivity[i].DESCRIZIONE;
                    obj.workHours = getActivity[i].ORE_LAVORATE;
                    obj.overTime = getActivity[i].OVERTIME;
                    obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
                    obj.notes = getActivity[i].NOTES;
                    obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
                    obj.workDate = getActivity[i].DATA_ATTIVITA;
                    for (var y = 0; y < this.workPlace.length; y++) {
                      if (getActivity[i].UBICAZIONE_ID == this.workPlace[y].ID) {
                        obj.workLocDescription = this.workPlace[y].Luogo;
                      }
                    }
                    for (var z = 0; z < this.stato.length; z++) {
                      if (getActivity[i].STATO_COMMESSA_ID == this.stato[z].ID) {
                        obj.statusId = this.stato[z].Stato;
                      }
                    }
                    if (getSpese.length > 0) {
                      obj.expenses = 1;
                    }
                    myData.push(obj);
                    this.byId("add").setProperty("visible", true);
                    this.byId("report").setProperty("visible", true);
                    // this.byId("release").setProperty("visible", true);
                    this.byId("duplicate").setProperty("visible", true);
                    this.byId("delete").setProperty("visible", true);
                  }
                }
              } else {
                for (var i = 0; i < getActivity.length; i++) {
                  var getSpese = this.spese.filter(
                    (x) => x.ACTIVITY_ID === getActivity[i].ID
                  );
                  var obj = {};
                  obj.Id = getActivity[i].ID;
                  obj.WBS = getActivity[i].CODICE_COMMESSA;
                  obj.descriptionWbs = getActivity[i].DESCRIZIONE;
                  obj.workHours = getActivity[i].ORE_LAVORATE;
                  obj.overTime = getActivity[i].OVERTIME;
                  obj.faturazioneFlag = getActivity[i].FATTURAZIONE_FLAG;
                  obj.notes = getActivity[i].NOTES;
                  obj.rimborso = getActivity[i].RIMBORSO_ID_RIMBORSO;
                  obj.workDate = getActivity[i].DATA_ATTIVITA;
                  for (var y = 0; y < this.workPlace.length; y++) {
                    if (getActivity[i].UBICAZIONE_ID == this.workPlace[y].ID) {
                      obj.workLocDescription = this.workPlace[y].Luogo;
                    }
                  }
                  for (var z = 0; z < this.stato.length; z++) {
                    if (getActivity[i].STATO_COMMESSA_ID == this.stato[z].ID) {
                      obj.statusId = this.stato[z].Stato;
                    }
                  }
                  if (getSpese.length > 0) {
                    obj.expenses = 1;
                  }
                  myData.push(obj);
                  this.byId("add").setProperty("visible", true);
                  this.byId("report").setProperty("visible", true);
                  // this.byId("release").setProperty("visible", true);
                  this.byId("duplicate").setProperty("visible", true);
                  this.byId("delete").setProperty("visible", true);
                }
              }

              if (myData.length == 0) {
                this.byId("add").setProperty("visible", true);
                this.byId("delete").setProperty("visible", false);
                this.byId("duplicate").setProperty("visible", false);
                // this.byId("release").setProperty("visible", false);
                this.byId("report").setProperty("visible", false);
              }
              if (myData.length > 0) {
                for (var x = 0; x < myData.length; x++) {
                  sum = sum + parseInt(myData[x].workHours);
                  if (sum >= 8) {
                    this.byId("add").setProperty("visible", false);
                  }
                }
              }

              mag.setProperty("/workList", myData);
              // this.fillCalendar();
              this._workDay(false);
              jQuery.sap.delayedCall(10, this, function () {
                this._setDayFull();
              });
            }
          }
        // }


      },
      // funzione per caricare la lista delle commessa sulla tabella
      updateTable: function () {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

      
        this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var workList = [];
        //       var addTimesheetButton = false;
        //       var periodsModel = this.getView().getModel("periodsModel");
        //       var activity = false;
        //       var absence = false;
        //       var expense = false;
        //     }
        //   }
        // }
        // else {
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var workList = [];
              var addTimesheetButton = false;
              var periodsModel = this.getView().getModel("periodsModel");
              var activity = false;
              var absence = false;
              var expense = false;
            }
          }
        // }



      },

      onLegendSelect: function () {
        this._setDayFull();
        this.fillCalendar();
      },

      onChangeSwitch: function (evt) {
        var src = evt.getSource();
        var state = src.getState();
        this.legendModel.setProperty("/switch", state);
        this.colorPartialDays();
        jQuery.sap.delayedCall(50, this, function () {
          this._setDayFull();
        });
      },
      AddActivities: function (evt) {
        // this.getRouter().navTo("AddActivities");
      },

      onAddTimesheetPress: function (evt) {

        var oCalendar = this.getView().byId("timesheetCalendar");
        var getAllData = this._calcolaArrayFestivita(this.actualYear);
        var startDate = new Date(
          formatter.getFirstDayFromMonth(this.actualYear, this.actualMonth - 1)
        ).getDate();
        var endDate = new Date(
          formatter.getLastDayFromMonth(this.actualYear, this.actualMonth)
        ).getDate();
        var dateFormat;
        var year;
        var month;
        var day;
        if (!this.selectedDate) {
          dateFormat = new Date();
          year = dateFormat.getFullYear();
          day = dateFormat.getDate();
          month = dateFormat.getMonth() + 1;
        } else {
          year = this.selectedDate.getFullYear();
          day = this.selectedDate.getDate();
          month = this.selectedDate.getMonth() + 1;
        }
        var date = ("selectedDate", year + "/" + month + "/" + day);
        var monthNum;
        var getDayFestNum;
        if (month >= 1 && month <= 9) {
          monthNum = "0" + month;
        }
        else {
          monthNum = month;
        }
        var getMonthDays = getAllData[monthNum];
        if (getMonthDays) {
          var getDayFest = getMonthDays.filter((x) => x == day);
          if (getDayFest && getDayFest.length > 0) {
            getDayFestNum = getDayFest[0];
          }
        }
        var getNumDay = new Date(date).getDay();
        if (getNumDay === 6 || getNumDay === 0 || getDayFestNum) {
          MessageBox.alert(
            "Check the calendar , the day it is not a workingDay"
          );
          return;
        }
        var obj = {};
        obj.workLocDescription;
        obj.WBS;
        obj.descriptionWbs;
        obj.workHours = 0;
        obj.overTime = 0;
        obj.faturazioneFlag = "no";
        obj.notes;
        obj.statusId;
        obj.rimborso = 0;
        var dataSelez = new sap.ui.model.json.JSONModel({
          dataSelez: date,
          rowSelez: obj,
        });
        this.getOwnerComponent().setModel(dataSelez, "dataSel");
        this.getRouter().navTo("detail", {
          entity: "new",
        });
      },

      onPressTs: function (evt) {
        var selectedRow = evt
          .getSource()
          .getBindingContext("tableModel")
          .getObject();
        var rigaSelezionata = {
          Id: selectedRow.Id,
          WBS: selectedRow.WBS,
          descriptionWbs: selectedRow.descriptionWbs,
          faturazioneFlag: selectedRow.faturazioneFlag,
          notes: selectedRow.notes,
          overTime: parseFloat(selectedRow.overTime),
          rimborso: selectedRow.rimborso,
          statusId: selectedRow.statusId,
          workDate: selectedRow.workDate,
          workHours: parseInt(selectedRow.workHours),
          workLocDescription: selectedRow.workLocDescription,

        };


        var dataSelez = new sap.ui.model.json.JSONModel({
          dataSelez: rigaSelezionata.workDate,
          rowSelez: rigaSelezionata,
        });
        this.getOwnerComponent().setModel(dataSelez, "dataSel");
        this.getRouter().navTo("detail", {
          entity: "view",
        });
      },

      onSelectTs: function () {
        // var selectedTs = _.filter(this.tableModel.getProperty("/workList"), {
        // 	selected: true,
        // });
        // var genericButtons = !selectedTs.length ? true : false;
        // var duplicateTimesheetButton = selectedTs.length ? true : false;
        // var deleteTimesheetButton = selectedTs.length ? true : false;
        // var visibleReleasedButton = selectedTs.length
        // 	? false
        // 	: this._checkExistingTsToRelease();
        // var periodsModel = this.getView().getModel("periodsModel");
        // var activityPeriodIsOpen = periodsModel.setProperty("/activity");
        // var absencePeriodIsOpen = periodsModel.setProperty("/absence");
        // var expensePeriodIsOpen = periodsModel.setProperty("/expense");
        // var tsNotToDelete = _.find(selectedTs, function (n) {
        // 	if (
        // 		(parseInt(n.statusId) > 20 && parseInt(n.statusId) !== 40) ||
        // 		(n.transfer && n.transfer.statoApprovazione !== "DA_APPROVARE") ||
        // 		(!n.absenceCode && !activityPeriodIsOpen) ||
        // 		(n.absenceCode && !absencePeriodIsOpen) ||
        // 		(n.expenses.length && !expensePeriodIsOpen)
        // 	) {
        // 		return n;
        // 	}
        // });
        // if (tsNotToDelete) {
        // 	deleteTimesheetButton = false;
        // }
        // var tsNotToDuplicate = _.find(selectedTs, {
        // 	statusId: "40",
        // });
        // if (tsNotToDuplicate) {
        // 	duplicateTimesheetButton = false;
        // }
        // this.visibleModel.setProperty(
        // 	"/duplicateTimesheetButton",
        // 	duplicateTimesheetButton
        // );
        // this.visibleModel.setProperty(
        // 	"/deleteTimesheetButton",
        // 	deleteTimesheetButton
        // );
        // this.visibleModel.setProperty(
        // 	"/releaseTimesheetButton",
        // 	visibleReleasedButton
        // );
        // this.visibleModel.setProperty("/genericButtons", genericButtons);
      },

      onDeleteTimesheetPress: function () {
        // MessageBox.confirm(this._getLocalText("confirmDeleteTs"), {
        // 	class: "sapUiSizeCompact",
        // 	actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        // 	onClose: _.bind(this.confirmDeleteTs, this)
        // });

        // setTimeout(_.bind(this._removeFocus, this), 300);

        var table = this.getView().byId("idTable");
        var aSelectedItems = table.getSelectedItems();
        var that = this;
        // Loop through selected items to get their data

        MessageBox.confirm(this._getLocalText("confirmDeleteTs"), {
          class: "sapUiSizeCompact",
          actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          // onClose: _.bind(this.confirmDeleteTs, this),
          onClose: function (sAction) {
            if (sAction === "YES") {
              for (var i = 0; i < aSelectedItems.length; i++) {
                var oSelectedItem = aSelectedItems[i];
                var oBindingContext =
                  oSelectedItem.getBindingContext("tableModel");
                var oSelectedData = oBindingContext.getProperty(); // Get the data of the selected item
                if (oSelectedData.Id) {
                  that.deleteTimesheetsRows(oSelectedData.Id);
                  that.deleteExpenseAfterRows(oSelectedData.Id);
                }
                // Now you can work with oSelectedData (data of the selected row)
                // console.log("Selected row data:", oSelectedData);
              }
              that._timesheetMatched();
            }
          },
        });

        // setTimeout(_.bind(this._removeFocus, this), 300);
      },
      deleteTimesheetsRows: function (id) {
        jQuery.when(this.oInitialLoadFinishedDeferred).then(
          jQuery.proxy(function () {
            var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
            jQuery.ajax({
              url: sUrl + `ActivitySet/${id}`,
              contentType: "application/json",
              type: "DELETE",
              dataType: "json",
              success: function (oData, oResponse) {
                var msg = "Deleted Succesfully!";
                sap.m.MessageToast.show(msg);
              },
              error: function (error) { },

              async: false,
            });
          }, this)
        );
      },

      deleteExpenseAfterRows: function (id) {
        var getSpeseById = this.spese.filter((x) => x.ACTIVITY_ID == id);
        if (getSpeseById.length > 0) {
          for (let i = 0; i < getSpeseById.length; i++) {
            jQuery.when(this.oInitialLoadFinishedDeferred).then(
              jQuery.proxy(function () {
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

                jQuery.ajax({
                  url: sUrl + `TipoSpesaSet/${getSpeseById[i].ID}`,
                  contentType: "application/json",
                  type: "DELETE",
                  dataType: "json",
                  success: function (oData, oResponse) {
                    var msg = "Deleted Succesfully!";
                    sap.m.MessageToast.show(msg);
                  },
                  error: function (error) { },

                  async: false,
                });
              }, this)
            );
          }
        }
      },

      confirmDeleteTs: function (evt) {
        if (evt === "NO") {
          return;
        }
        var selectedTs = _.filter(this.tableModel.getProperty("/workList"), {
          selected: true,
        });
        // per la cancellazione dei rapportini, prima di tutto si verifica se ci sono trasferte, se ce ne sono si verifica se ci sono spese. in caso positivo si cancellano prima le spese e poi le trasferte e alla fine si passa alla cancellazione dei rapportini
        this.allTransfers = this._checkTransfers(selectedTs);
        this.allExpenses = this._checkExpenses();
        this.allTimesheetToDelete = [];
        for (var i = 0; i < selectedTs.length; i++) {
          selectedTs[i].operation = "D";
          var timesheet = TimesheetSerializer.toSap(selectedTs[i]);
          this.allTimesheetToDelete.push(timesheet);
        }
        this.openDialogBusy(this._getLocalText("deletingTs"));
        if (this.allExpenses.length) {
          this.deleteAllExpenses();
        } else if (this.allTransfers.length) {
          this.deleteAllTransfers();
        } else {
          this.deleteAllTs();
        }
      },

      _checkTransfers: function (selectedTs) {
        var transfers = [];
        for (var i = 0; i < selectedTs.length; i++) {
          var completeTs = _.find(
            this.timesheetModel.getProperty("/timesheet"),
            {
              timeSheetRecord: selectedTs[i].timeSheetRecord,
            }
          );
          if (completeTs && completeTs.transfer) {
            transfers.push(completeTs.transfer);
          }
        }
        return transfers;
      },

      _checkExpenses: function () {
        var allExpenses = [];
        for (var i = 0; i < this.allTransfers.length; i++) {
          var expenses = this.allTransfers[i].notaSpeseRef.results;
          if (expenses && expenses.length) {
            allExpenses = allExpenses.concat(expenses);
          }
        }
        return allExpenses;
      },

      deleteAllExpenses: function () {
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
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err);
          this._setPage();
        }.bind(this);

        var expenseToDelete = this.allExpenses[counter];
        if (expenseToDelete) {
          oData.deleteExpense(expenseToDelete.id, fSuccess, fError);
        } else {
          this.deleteAllTransfers();
        }
      },

      deleteAllTransfers: function () {
        var counter = -1;
        this._deleteTransfer(counter);
      },

      _deleteTransfer: function (counter) {
        counter++;
        var fSuccess = function () {
          this._deleteTransfer(counter);
        }.bind(this);
        var fError = function (error) {
          this.closeDialogBusy();
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err);
          this._setPage();
        }.bind(this);
        var transferToDelete = this.allTransfers[counter];
        if (transferToDelete) {
          oData.deleteTransfer(transferToDelete.idTrasferta, fSuccess, fError);
        } else {
          this.deleteAllTs();
        }
      },

      deleteAllTs: function () {
        var counter = -1;
        this._deleteTs(counter);
      },

      _deleteTs: function (counter) {
        counter++;
        var fError = function (error) {
          this.closeDialogBusy();
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err);
          this._setPage();
        }.bind(this);
        var fSuccess = function (result) {
          if (result.TimeSheetPredecessorRecord) {
            // se il timesheet che ho appena cancellato ha un TimeSheetPredecessorRecord significa che deriva da un'approvazione revocata
            // in questo caso porto il ts appena cancellato con stato 20 e salvo le note
            result.TimeSheetOperation = "U";
            result.TimeSheetStatus = "20";
            result.TimeSheetIsReleasedOnSave = true;
            result.TimeSheetDataFields.TimeSheetNote = _.clone(
              this.notesToSave
            );
            delete this.notesToSave;
            oData.saveTs(result, _.bind(this._deleteTs, this, counter), fError);
          } else {
            this._deleteTs(counter);
          }
        }.bind(this);
        var timesheetToDelete = this.allTimesheetToDelete[counter];
        if (timesheetToDelete) {
          if (timesheetToDelete.TimeSheetPredecessorRecord) {
            this.notesToSave =
              timesheetToDelete.TimeSheetDataFields.TimeSheetNote;
          }
          oData.saveTs(timesheetToDelete, fSuccess, fError);
        } else {
          this._setPage();
        }
      },

      onDuplicateTimesheetPress: function () {
        // var selectedTs = _.filter(this.tableModel.getProperty("/workList"), {
        // 	selected: true,
        // });
        // // prima di tutto verifico se sto duplicando rapportini per i quali chiedere se il luogo di lavoro è corretto
        // for (var i = 0; i < selectedTs.length; i++) {
        // 	var ts = selectedTs[i];
        // 	var wrongPlace = this._checkWrongPlaceTs(ts);
        // 	if (wrongPlace) {
        // 		break;
        // 	}
        // }
        // if (wrongPlace) {
        // 	var errorMsg = this._getLocalText(
        // 		"confirmDuplicateWorkPlaceWithWorkItem"
        // 	);
        // 	MessageBox.confirm(errorMsg, {
        // 		actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        // 		onClose: _.bind(this._checkExistingExpenses, this),
        // 	});
        // } else {
        // 	// controllo se i timesheet che voglio duplicare hanno un overtime
        // 	var overtime = false;
        // 	for (var i = 0; i < selectedTs.length; i++) {
        // 		var ts = selectedTs[i];
        // 		if (ts.overtimeCategory !== "") {
        // 			overtime = true;
        // 			break;
        // 		}
        // 	}
        // 	if (overtime) {
        // 		var errorMsg = this._getLocalText("confirmDuplicateOvertime");
        // 		MessageBox.confirm(errorMsg, {
        // 			actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        // 			onClose: _.bind(this._checkExistingExpenses, this),
        // 		});
        // 	} else {
        // 		this._checkExistingExpenses();
        // 	}
        // }
        var dateFormat;
        var year;
        var month;
        var day;
        if (!this.selectedDate) {
          dateFormat = new Date();
          year = dateFormat.getFullYear();
          day = dateFormat.getDate();
          month = dateFormat.getMonth() + 1;
        } else {
          year = this.selectedDate.getFullYear();
          day = this.selectedDate.getDate();
          month = this.selectedDate.getMonth() + 1;
        }
        var getAllData = this._calcolaArrayFestivita(year);
        var date = ("selectedDate", year + "/" + month + "/" + day);
        var monthNum;
        var getDayFestNum;
        if (month >= 1 && month <= 9) {
          monthNum = "0" + month;
        } else {
          monthNum = month;
        }

        var getMonthDays = getAllData[monthNum];
        if (getMonthDays) {
          var getDayFest = getMonthDays.filter((x) => x == day);
          if (getDayFest && getDayFest.length > 0) {
            getDayFestNum = getDayFest[0];
          }
        }
        var getNumDay = new Date(date).getDay();
        if (getNumDay === 6 || getNumDay === 0 || getDayFestNum) {
          MessageBox.alert(
            "Check the calendar , the day it is not a workingDay"
          );
          return;
        }
        var selectedTs = _.filter(this.tableModel.getProperty("/workList"), {
          selected: true,
        });
        // prima di tutto verifico se sto duplicando rapportini per i quali chiedere se il luogo di lavoro è corretto
        for (var i = 0; i < selectedTs.length; i++) {
          var ts = selectedTs[i];
          var wrongPlace = this._checkWrongPlaceTs(ts);
          if (wrongPlace) {
            break;
          }
        }
        if (wrongPlace) {
          var errorMsg = this._getLocalText(
            "confirmDuplicateWorkPlaceWithWorkItem"
          );
          MessageBox.confirm(errorMsg, {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: _.bind(this._checkExistingExpenses, this),
          });
        } else {
          // controllo se i timesheet che voglio duplicare hanno un overtime
          var overtime = false;
          for (var i = 0; i < selectedTs.length; i++) {
            var ts = selectedTs[i];
            if (ts.overtimeCategory !== "") {
              overtime = true;
              break;
            }
          }
          // if (overtime) {
          //   var errorMsg = this._getLocalText("confirmDuplicateOvertime");
          //   MessageBox.confirm(errorMsg, {
          //     actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          //     onClose: _.bind(this._checkExistingExpenses, this),
          //   });
          // } else {
            this._checkExistingExpenses();
          // }
        }
      },

      _checkExistingExpenses: function (evt) {
        // if (evt === MessageBox.Action.NO) {
        // 	return;
        // }
        // this.timesheetModel.setProperty(
        // 	"/calendarDialogTitle",
        // 	this._getLocalText("duplicateTs")
        // );
        // this.duplicate = true;
        // this.release = false;
        // this.duplicateExpenses = false;
        // var selectedTs = _.filter(this.tableModel.getProperty("/workList"), {
        // 	selected: true,
        // });
        // // verifico se sono state selezionati dei rapportini con spese per chiedere se duplicare anche quelle
        // var expensesToDuplicate = false;
        // for (var i = 0; i < selectedTs.length; i++) {
        // 	if (selectedTs[i].expenses.length) {
        // 		expensesToDuplicate = true;
        // 		break;
        // 	}
        // }
        // if (expensesToDuplicate) {
        // 	MessageBox.confirm(this._getLocalText("confirmDuplicateExpenses"), {
        // 		class: "sapUiSizeCompact",
        // 		actions: [
        // 			MessageBox.Action.YES,
        // 			MessageBox.Action.NO,
        // 			MessageBox.Action.CANCEL,
        // 		],
        // 		onClose: _.bind(this.confirmDuplicateExpenses, this),
        // 	});
        // 	setTimeout(_.bind(this._removeFocus, this), 300);
        // } else {
        // 	this._openDialogCalendarTs();
        // }
        if (evt === MessageBox.Action.NO) {
          return;
        }
        this.timesheetModel.setProperty(
          "/calendarDialogTitle",
          this._getLocalText("duplicateTs")
        );
        this.duplicate = true;
        this.release = false;
        this.duplicateExpenses = false;
        var selectedTs = _.filter(this.tableModel.getProperty("/workList"), {
          selected: true,
        });
        // verifico se sono state selezionati dei rapportini con spese per chiedere se duplicare anche quelle

        var expensesToDuplicate = false;
        for (var i = 0; i < selectedTs.length; i++) {
          if (selectedTs[i].expenses) {
            expensesToDuplicate = true;
            break;
          }
        }
        // if (expensesToDuplicate) {
        //   MessageBox.confirm(this._getLocalText("confirmDuplicateExpenses"), {
        //     class: "sapUiSizeCompact",
        //     actions: [
        //       MessageBox.Action.YES,
        //       MessageBox.Action.NO,
        //       MessageBox.Action.CANCEL,
        //     ],
        //     onClose: _.bind(this.confirmDuplicateExpenses, this),
        //   });
        //   setTimeout(_.bind(this._removeFocus, this), 300);
        // } else {
          this._openDialogCalendarTs();
        // }
      },

      confirmDuplicateExpenses: function (evt) {
        if (evt === sap.m.MessageBox.Action.CANCEL) {
          return;
        }
        if (evt === "YES") {
          this.duplicateExpenses = true;
        }
        this._openDialogCalendarTs();
      },

      _openDialogCalendarTs: function () {
        if (this._dialogCalendarTs) {
          this.getView().removeDependent(this._dialogCalendarTs);
          this._dialogCalendarTs.destroy();
        this._dialogCalendarTs=null;
      }

        if (!this._dialogCalendarTs) {
        this._dialogCalendarTs = sap.ui.xmlfragment(
          "timesheetproject2.view.fragment.DialogCalendarTs",
          this
        );
        this.getView().addDependent(this._dialogCalendarTs);
        }

        this._dialogCalendarTs.attachAfterOpen(
          function () {
            // Get the underlying dialog
            var oDialog = this._dialogCalendarTs;
            var that = this;

            var clickListener = function (e) {
              // Check if the click target is not inside the dialog
              if (!oDialog.getDomRef().contains(e.target)) {
                that.colorPartialDupl(that.actualYear, that.actualMonth);
                jQuery.sap.delayedCall(10, this, function () {
                  that.setColors(that.actualYear, that.actualMonth);
                });
                // $(document).off("click", clickListener);
              }
            };
            var cancelButton = this._dialogCalendarTs.getButtons()[0]; // Assuming "Cancel" is the first button
            cancelButton.attachPress(function () {
              // Remove the click event listener from the document
              $(document).off("click", clickListener);

              // Close the dialog
              // oDialog.close();
            });

            // Attach a click event listener to the "Confirm" button
            var confirmButton = this._dialogCalendarTs.getButtons()[1]; // Assuming "Confirm" is the second button
            confirmButton.attachPress(function () {
              // Remove the click event listener from the document
              $(document).off("click", clickListener);

              // Close the dialog
              // oDialog.close();
            });
            $(document).on("click", clickListener);
          }.bind(this)
        );

        this._dialogCalendarTs.open();

        this.duplicateCalendar = this._getById("idTsCalendar");
        // var getMonth = new Date(this.timesheetCalendar.getStartDate())
        // var duplicateCalendar = sap.ui.getCore().getElementById("idTsCalendar");
        var targetDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
          pattern: "yyyy-MM-dd",
        });
        var getDate = targetDateFormat.format(
          this.timesheetCalendar.getStartDate()
        );
        // var oUI5Date = new sap.ui.core.date.UI5Date(this.timesheetCalendar.getStartDate());
        this.duplicateCalendar.focusDate(new Date(getDate));
        // duplicateCalendar.invalidate();
        // duplicateCalendar.rerender();
        this.colorPartialDupl(this.actualYear, this.actualMonth);
        jQuery.sap.delayedCall(10, this, function () {
          this.setColors(this.actualYear, this.actualMonth);
        });
      },
      colorPartialDupl: function (aYear, aMonth) {
        var oCalendar = sap.ui.getCore().getElementById("idTsCalendar");
        var getAllData = this._calcolaArrayFestivita(aYear);
        var startDate = new Date(
          formatter.getFirstDayFromMonth(aYear, aMonth - 1)
        ).getDate();
        var endDate = new Date(
          formatter.getLastDayFromMonth(aYear, aMonth)
        ).getDate();
        for (var i = startDate; i < endDate + 1; i++) {
          var actualMonth = aMonth < 10 ? "0" + aMonth : aMonth.toString();
          var data;
          if (i >= 1 && i <= 9) {
            data = aYear + "-" + actualMonth + "-0" + i;
          } else {
            data = aYear + "-" + actualMonth + "-" + i;
          }
          // var date = this.getView().getModel("tableModel");
          // date.getProperty(
          // 	"/selectedDay",
          // 	formatter.formatDate(this.selectedDate)
          // );
          var checkDateSelect;

          if (i >= 1 && i <= 9) {
            checkDateSelect = "0" + i;
          } else {
            checkDateSelect = "" + i;
          }
          var getMonthDays = getAllData[actualMonth];
          if (getMonthDays) {
            var getDayFest = getMonthDays.filter((x) => x === checkDateSelect);
            checkDateSelect = "";
            if (getDayFest && getDayFest.length > 0) {
              var oNonWorkingDate = new sap.ui.unified.DateTypeRange({
                startDate: new Date(data), // Specify the non-working date
                endDate: new Date(data), // If it's a single-day non-working date, endDate is the same as startDate
                type: sap.ui.unified.CalendarDayType.NonWorking, // Custom type for the non-working date
              });
              oCalendar.addSpecialDate(oNonWorkingDate);
            }
          }
        }
      },

      setColors: function (aYear, aMonth) {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var startDate = new Date(
        //         formatter.getFirstDayFromMonth(aYear, aMonth - 1)
        //       ).getDate();
        //       var endDate = new Date(
        //         formatter.getLastDayFromMonth(aYear, aMonth)
        //       ).getDate();
        //       this.colorData = {};
        //       var getSelected = this.legendModel.getProperty("/wbs");
        //       var getAllSelected = getSelected.filter(
        //         (item) => item.select === true
        //       );
        //       var getActivityId = this.activitySet.filter(
        //         (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );
        //       for (var i = startDate; i < endDate + 1; i++) {
        //         i = i < 10 ? "0" + i : i.toString();
        //         var actualMonth = aMonth < 10 ? "0" + aMonth : aMonth.toString();
        //         var dataSelected = aYear + "-" + actualMonth + "-" + i;

        //         // Fetch and calculate colors for the date
        //         var getFilteredData = getActivityId.filter(
        //           (x) => x.DATA_ATTIVITA === dataSelected
        //         );

        //         let colors = "";
        //         let check = 0;
        //         let col = 6;

        //         var removeDuplicates = this.removeDupl(
        //           getFilteredData,
        //           "CODICE_COMMESSA"
        //         );

        //         for (let j = 0; j < removeDuplicates.length; j++) {
        //           var getChecked = this.legendaryColor.filter(
        //             (obj) => obj.activity === removeDuplicates[j].CODICE_COMMESSA
        //           );
        //           if (check == 0 && getChecked.length > 0) {
        //             check = 1;
        //             colors += `inset 6px 0rem 0 ${getChecked[0].color}`;
        //           } else if (check > 0 && getChecked.length > 0) {
        //             col = col + 6;
        //             colors += ` , inset ${col}px 0rem 0 ${getChecked[0].color}`;
        //           }
        //         }
        //         check = 0;
        //         col = 0;
        //         this.colorData[dataSelected] = colors;
        //       }
        //       this.updateCalendarColors(startDate, endDate, aMonth, aYear);
        //     }
        //   }
        // }
        // else {
          //UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var startDate = new Date(
                formatter.getFirstDayFromMonth(aYear, aMonth - 1)
              ).getDate();
              var endDate = new Date(
                formatter.getLastDayFromMonth(aYear, aMonth)
              ).getDate();
              this.colorData = {};
              var getSelected = this.legendModel.getProperty("/wbs");
              var getAllSelected = getSelected.filter(
                (item) => item.select === true
              );
              var getActivityId = this.activitySet.filter(
                (x) => x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );
              for (var i = startDate; i < endDate + 1; i++) {
                i = i < 10 ? "0" + i : i.toString();
                var actualMonth = aMonth < 10 ? "0" + aMonth : aMonth.toString();
                var dataSelected = aYear + "-" + actualMonth + "-" + i;

                // Fetch and calculate colors for the date
                var getFilteredData = getActivityId.filter(
                  (x) => x.DATA_ATTIVITA === dataSelected
                );

                let colors = "";
                let check = 0;
                let col = 6;

                var removeDuplicates = this.removeDupl(
                  getFilteredData,
                  "CODICE_COMMESSA"
                );

                for (let j = 0; j < removeDuplicates.length; j++) {
                  var getChecked = this.legendaryColor.filter(
                    (obj) => obj.activity === removeDuplicates[j].CODICE_COMMESSA
                  );
                  if (check == 0 && getChecked.length > 0) {
                    check = 1;
                    colors += `inset 6px 0rem 0 ${getChecked[0].color}`;
                  } else if (check > 0 && getChecked.length > 0) {
                    col = col + 6;
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
        for (var i = startDate; i <= endDate; i++) {
          i = i < 10 ? "0" + i : i.toString();
          var actualMonth = aMonth < 10 ? "0" + aMonth : aMonth.toString();
          //   var actualMonth = aMonth; // Calculate the month
          var dataSelected = aYear + "" + actualMonth + "" + i;
          var dataSel = aYear + "-" + actualMonth + "-" + i;
          var selectedDate = $(
            '[id$="idTsCalendar--Month0-' + dataSelected + '"]'
          )[0];

          // Retrieve the colors for this date from this.colorData or your color array
          var colors = this.colorData[dataSel];

          // Apply the colors to the date element
          selectedDate.style.boxShadow = colors;
        }
      },

      setCalendarDialog: function (evt) {
        var duplicateCalendar = sap.ui.getCore().getElementById("idTsCalendar");
        var startDate = duplicateCalendar.getStartDate();
        this.actualYearDupl = startDate.getFullYear();
        this.actualMonthDupl = startDate.getMonth() + 1;
        startDate = formatter.getFirstDayFromMonth(
          this.actualYearDupl,
          this.actualMonthDupl - 1
        );
        var endDate = formatter.getLastDayFromMonth(
          this.actualYearDupl,
          this.actualMonthDupl
        );
        // this.colorPartialDupl(this.actualYearDupl, this.actualMonthDupl);
        jQuery.sap.delayedCall(100, this, function () {
          // this.setColors(this.actualYearDupl, this.actualMonthDupl);
        });
      },

      selectDayDuplicate: function (evt) {
        //N.B.: stranamente qui rispetto alla versione su sap si perdono i colori al click, per sicurezza rilancio setDayFull
        this._setDayFull(true);
        // mi salvo un array per fare sucessivamnete il controllo sul duplica delle ore in una giornata
        var calendar = evt.getSource();
        var selectedDates = calendar.getSelectedDates();
        var duplicateCalendar = sap.ui.getCore().getElementById("idTsCalendar");
        var startDate = duplicateCalendar.getStartDate();
        this.actualYearDupl = startDate.getFullYear();
        this.actualMonthDupl = startDate.getMonth() + 1;
        jQuery.sap.delayedCall(1, this, function () {
          // this.colorPartialDupl(this.actualYearDupl, this.actualMonthDupl);
          // this.setColors(this.actualYearDupl, this.actualMonthDupl);
        });

        for (var i = 0; i < _.size(selectedDates); i++) {
          var data = formatter.getDayFormatTimesheet(
            selectedDates[i].getStartDate()
          );


          var tsInDate = _.filter(
            this.timesheetModel.getProperty("/timesheetDialogCalendar"),
            {
              workDate: dataTs,
            }
          );

          if (_.size(tsInDate) > 0) {
            if (_.size(this.arrayGiornateCommesse) === 0) {
              this.arrayGiornateCommesse.push({
                data: data,
                ts: tsInDate,
              });
            } else {
              if (!_.find(this.arrayGiornateCommesse, { data: data })) {
                this.arrayGiornateCommesse.push({
                  data: data,
                  ts: tsInDate,
                });
              }
            }
          }
        }
      },

      onCancelCalendarDialogPress: function () {
        this._dialogCalendarTs.close();
        this.getView().removeDependent(this._dialogCalendarTs);
        this._dialogCalendarTs.destroy();
        // var setPage = true;
        // this.showErrorTsNotWorked(setPage);
      },

      onConfirmCalendarDialogPress: function () {
        if (this.duplicate) {
          this._confirmDuplicateTs();
        } else {
          this._releaseTs();
        }
      },

      _releaseTs: function () {
        var duplicateCalendar = sap.ui.getCore().getElementById("idTsCalendar");
        var allSelectedDates = duplicateCalendar.getSelectedDates();
        if (!allSelectedDates.length) {
          sap.m.MessageBox.warning(this._getLocalText("noSelectedDates"));
          return;
        }
        // var allTs = this.timesheetModel.getProperty("/timesheetDialogCalendar");
        var allTs = this.activitySet;
        var targetDateFormat =
                sap.ui.core.format.DateFormat.getDateInstance({
                  pattern: "yyyy-MM-dd",
                });

        this.allSelectedTs = [];
        for (var i = 0; i < allSelectedDates.length; i++) {
          var selectedDate = targetDateFormat.format(
            allSelectedDates[i].getStartDate()
          );
          var dailyTs = _.filter(allTs, {
            STATO_COMMESSA_ID: 3,
            DATA_ATTIVITA: selectedDate,
          });
          this.allSelectedTs = this.allSelectedTs.concat(dailyTs);
        }
        for (i = 0; i < this.allSelectedTs.length; i++) {
          var ts = this.allSelectedTs[i];
          ts.status = "20";
          ts.timeSheetIsReleasedOnSave = true;
          ts.operation = "U";
        }
        var operation = "release";
        var dialogCalendarProperty = true;
        this._checkPeriods(operation, dialogCalendarProperty);
      },

      _checkWorkPlaceForRelease: function () {
        for (var i = 0; i < this.allSelectedTs.length; i++) {
          var ts = this.allSelectedTs[i];
          var wrongPlace = this._checkWrongPlaceTs(ts);
          if (wrongPlace) {
            break;
          }
        }
        if (wrongPlace) {
          var errorMsg = this._getLocalText(
            "confirmReleaseWorkPlaceWithWorkItem"
          );
          MessageBox.confirm(errorMsg, {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: _.bind(this._confirmRelease, this),
          });
          return;
        } else {
          this._confirmRelease();
        }
      },

      _confirmRelease: function (evt) {
        if (evt === MessageBox.Action.NO) {
          return;
        }
        var dialog = sap.ui.getCore().getElementById("idCalendarDialog");
        dialog.setBusy(true);
        this.duplicateExpenses = false;
        var counter = -1;
        this.saveTs(counter);
      },

      _confirmDuplicateTs: function () {
        // var dialog = sap.ui.getCore().getElementById("idCalendarDialog");
        // var getActualDate = sap.ui.getCore().getElementById("timesheetCalendar")
        var duplicateCalendar = sap.ui.getCore().getElementById("idTsCalendar");
        var allSelectedDates = duplicateCalendar.getSelectedDates();
        if (!allSelectedDates.length) {
          sap.m.MessageBox.warning(this._getLocalText("noSelectedDates"), {
            class: "sapUiSizeCompact",
          });
          return;
        }
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var targetDateFormat =
        //         sap.ui.core.format.DateFormat.getDateInstance({
        //           pattern: "yyyy-MM-dd",
        //         });
        //       var newDataJ = new Date();
        //       var addDate;
        //       if (this.timesheetCalendar) {
        //         addDate = targetDateFormat.format(
        //           this.timesheetCalendar.getSelectedDates()[0].getStartDate()
        //         );
        //       } else {
        //         addDate = targetDateFormat.format(newDataJ);
        //       }
        //       var getDates = this.activitySet.filter(
        //         (x) =>
        //           x.DATA_ATTIVITA === addDate &&
        //           x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );
        //       for (let j = 0; j < getDates.length; j++) {
        //         var obj = Object.assign({}, getDates[j]);
        //         var spesaFilter = this.spese.filter(function (x) {
        //           return x.ACTIVITY_ID == obj.ID;
        //         });
        //       }
        //       if (spesaFilter.length > 0) {
        //         MessageBox.confirm(
        //           this._getLocalText("confirmDuplicateExpenses"),
        //           {
        //             class: "sapUiSizeCompact",
        //             actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        //             onClose: _.bind(this.dupicateTimesheet, this),
        //           }
        //         );
        //       } else {
        //         this.dupicateTimesheet();
        //       }

        //       // dialog.setBusy(true);
        //       // var allSelectedTs = _.filter(this.tableModel.getProperty("/workList"), {
        //       //   selected: true,
        //       // });
        //     }
        //   }
        // }
        // else {
          //UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var targetDateFormat =
                sap.ui.core.format.DateFormat.getDateInstance({
                  pattern: "yyyy-MM-dd",
                });
              var newDataJ = new Date();
              var addDate;
              if (this.timesheetCalendar) {
                addDate = targetDateFormat.format(
                  this.timesheetCalendar.getSelectedDates()[0].getStartDate()
                );
              } else {
                addDate = targetDateFormat.format(newDataJ);
              }
              var getDates = this.activitySet.filter(
                (x) =>
                  x.DATA_ATTIVITA === addDate &&
                  x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );
              for (let j = 0; j < getDates.length; j++) {
                var obj = Object.assign({}, getDates[j]);
                var spesaFilter = this.spese.filter(function (x) {
                  return x.ACTIVITY_ID == obj.ID;
                });
              }
              if (spesaFilter.length > 0) {
                MessageBox.confirm(
                  this._getLocalText("confirmDuplicateExpenses"),
                  {
                    class: "sapUiSizeCompact",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    onClose: _.bind(this.dupicateTimesheet, this),
                  }
                );
              } else {
                this.dupicateTimesheet();
              }

              // dialog.setBusy(true);
              // var allSelectedTs = _.filter(this.tableModel.getProperty("/workList"), {
              //   selected: true,
              // });
            }
          }
        // }


      },
      dupicateTimesheet: function (evt) {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var copyExpenses = 0;
        //       // if (evt === "NO") {
        //       // 	copyExpenses = 1;
        //       // };
        //       // if (evt === "YES") {
        //       // 	copyExpenses = 0;
        //       // };
        //       if (evt === "NO") {
        //         copyExpenses = 0;
        //       }
        //       if (evt === "YES") {
        //         copyExpenses = 1;
        //       }
        //       var duplicateCalendar = sap.ui
        //         .getCore()
        //         .getElementById("idTsCalendar");
        //       var allSelectedDates = duplicateCalendar.getSelectedDates();
        //       var mag = this.getView().getModel("tableModel");
        //       var getAllDataActivities = [];
        //       var spese = [];
        //       var targetDateFormat =
        //         sap.ui.core.format.DateFormat.getDateInstance({
        //           pattern: "yyyy-MM-dd",
        //         });
        //       var mag = this.getView()
        //         .getModel("tableModel")
        //         .getProperty("/workList");
        //       var workListTable = this.getView().getModel("tableModel");
        //       var newDataJ = new Date();
        //       var addDate;
        //       if (this.timesheetCalendar) {
        //         addDate = targetDateFormat.format(
        //           this.timesheetCalendar.getSelectedDates()[0].getStartDate()
        //         );
        //       } else {
        //         addDate = targetDateFormat.format(newDataJ);
        //       }
        //       var workedHours = 0;
        //       var getActivity = [];
        //       for (var a = 0; a < allSelectedDates.length; a++) {
        //         var targetDateString = targetDateFormat.format(
        //           allSelectedDates[a].getStartDate()
        //         );
        //         // var getDates = this.activitySet.filter((x) => x.DATA_ATTIVITA === targetDateString);
        //         // for (let z = 0; z < getDates.length; z++) {
        //         getActivity.push(targetDateString);
        //         // }
        //       }
        //       var getDates = this.activitySet.filter(
        //         (x) =>
        //           x.DATA_ATTIVITA === addDate &&
        //           x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
        //       );

        //       for (let i = 0; i < getActivity.length; i++) {


        //         var checkDate = formatter.formatDate(getActivity[i]);

        //         var month = checkDate[3] + checkDate[4];
        //         var getAllData = this._calcolaArrayFestivita(this.actualYear);
        //         var day = checkDate[0] + checkDate[1];

        //         var monthNum;
        //         var getDayFestNum;
        //         if (month >= 1 && month <= 9) {
        //           monthNum = "0" + month;
        //         } else {
        //           monthNum = month;
        //         }
        //         var getMonthDays = getAllData[monthNum];
        //         if (getMonthDays) {
        //           var getDayFest = getMonthDays.filter((x) => x == day);
        //           if (getDayFest && getDayFest.length > 0) {
        //             getDayFestNum = getDayFest[0];
        //           }
        //         }
        //         var getNumDay = new Date(getActivity[i]).getDay();
        //         if (getNumDay === 6 || getNumDay === 0 || getDayFestNum) {

        //           var datasbagliata = [];
        //           datasbagliata.push(getActivity[i]);
        //           MessageBox.alert(
        //             `Controlla le date: ${datasbagliata}  selezionate hai selezionato uno o più giorni non lavorativi`
        //           );
        //           break;

        //         }
        //         else {
        //           for (let j = 0; j < getDates.length; j++) {
        //             var obj = Object.assign({}, getDates[j]);
        //             var spesaFilter = this.spese.filter(function (x) {
        //               return x.ACTIVITY_ID == obj.ID;
        //             });
        //             // obj.ID = Math.floor(Math.random() * (999999 - 11 + 1) + 11);
        //             obj.DATA_ATTIVITA = getActivity[i];
        //             var dataString = JSON.stringify(obj);
        //             jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //               jQuery.proxy(function () {
        //                 var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //                 jQuery.ajax({
        //                   url: sUrl + `ActivitySet`,
        //                   contentType: "application/json",
        //                   type: "POST",
        //                   data: dataString,
        //                   dataType: "json",
        //                   success: function (oData, oResponse) {
        //                     if (getActivity.length > 1) {
        //                       var datecopiate = [];
        //                       datecopiate = getActivity[i];
        //                       var msg = `le date ${datecopiate} sono state aggiunge correttamente`;
        //                     } else {
        //                       var datecopiate = getActivity[0]
        //                       var msg = `le date ${datecopiate} sono state aggiunge correttamente`;
        //                     }
        //                     sap.m.MessageToast.show(msg);
        //                   },
        //                   error: function (error) {
        //                     if (getActivity.length > 1) {
        //                       var datecopiate = getActivity
        //                       var msg = `le date ${datecopiate} non sono state aggiunge correttamente`;
        //                     } else {
        //                       var datecopiate = getActivity[0]
        //                       var msg = `le date ${datecopiate} non sono state aggiunge correttamente`;
        //                     }
        //                     sap.m.MessageToast.show(msg);
        //                   },
        //                   async: false,
        //                 });
        //               }, this)
        //             );
        //             var idObj = obj.ID;
        //             if (copyExpenses === 1) {
        //               if (spesaFilter.length > 0) {
        //                 for (let t = 0; t < spesaFilter.length; t++) {
        //                   var obj1 = Object.assign({}, spesaFilter[t]);
        //                   obj1.ACTIVITY_ID = idObj;

        //                   var spesastring1 = JSON.stringify(obj1);
        //                   jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //                     jQuery.proxy(function () {
        //                       var sUrl =
        //                         this.getOwnerComponent().getModel().sServiceUrl;

        //                       jQuery.ajax({
        //                         url: sUrl + `TipoSpesaSet`,
        //                         contentType: "application/json",
        //                         type: "POST",
        //                         data: spesastring1,
        //                         dataType: "json",
        //                         success: function (oData, oResponse) {
        //                           // that.entity = "view";
        //                           // that.enableModel.setProperty("/entity", that.entity);

        //                           var msg = "le spese sono state aggiunge correttamente";
        //                           sap.m.MessageToast.show(msg);
        //                           obj.ID = oData.ID_SPESA;
        //                         },
        //                         error: function (error) {

        //                           var msg = "le spese non sono state aggiunge correttamente";
        //                           sap.m.MessageToast.show(msg);
        //                         },
        //                         async: false,
        //                       });
        //                     }, this)
        //                   );
        //                 }
        //               }
        //             }
        //           }
        //         }
        //       }

        //       workListTable.setProperty("/workList", getAllDataActivities);
        //       this._timesheetMatched();
        //       this._dialogCalendarTs.close();
        //       this.getView().removeDependent(this._dialogCalendarTs);
        //       this._dialogCalendarTs.destroy();
        //     }
        //   }
        // }
        // else {
          // UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var copyExpenses = 0;
              // if (evt === "NO") {
              // 	copyExpenses = 1;
              // };
              // if (evt === "YES") {
              // 	copyExpenses = 0;
              // };
              if (evt === "NO") {
                copyExpenses = 0;
              }
              if (evt === "YES") {
                copyExpenses = 1;
              }
              var duplicateCalendar = sap.ui
                .getCore()
                .getElementById("idTsCalendar");
              var allSelectedDates = duplicateCalendar.getSelectedDates();
              var mag = this.getView().getModel("tableModel");
              var getAllDataActivities = [];
              var spese = [];
              var targetDateFormat =
                sap.ui.core.format.DateFormat.getDateInstance({
                  pattern: "yyyy-MM-dd",
                });
              var mag = this.getView()
                .getModel("tableModel")
                .getProperty("/workList");
              var workListTable = this.getView().getModel("tableModel");
              var newDataJ = new Date();
              var addDate;
              if (this.timesheetCalendar) {
                addDate = targetDateFormat.format(
                  this.timesheetCalendar.getSelectedDates()[0].getStartDate()
                );
              } else {
                addDate = targetDateFormat.format(newDataJ);
              }
              var workedHours = 0;
              var getActivity = [];
              for (var a = 0; a < allSelectedDates.length; a++) {
                var targetDateString = targetDateFormat.format(
                  allSelectedDates[a].getStartDate()
                );
                // var getDates = this.activitySet.filter((x) => x.DATA_ATTIVITA === targetDateString);
                // for (let z = 0; z < getDates.length; z++) {
                getActivity.push(targetDateString);
                // }
              }
              var getDates = this.activitySet.filter(
                (x) =>
                  x.DATA_ATTIVITA === addDate &&
                  x.DESCRIZIONE_BUTTON == this.getUser[g].ID_UTENTE
              );

              for (let i = 0; i < getActivity.length; i++) {


                var checkDate = formatter.formatDate(getActivity[i]);

                var month = checkDate[3] + checkDate[4];
                var getAllData = this._calcolaArrayFestivita(this.actualYear);
                var day = checkDate[0] + checkDate[1];

                var monthNum;
                var getDayFestNum;
                if (month >= 1 && month <= 9) {
                  monthNum =  month;
                } else {
                  monthNum = month;
                }
                var getMonthDays = getAllData[monthNum];
                if (getMonthDays) {
                  var getDayFest = getMonthDays.filter((x) => x == day);
                  if (getDayFest && getDayFest.length > 0) {
                    getDayFestNum = getDayFest[0];
                  }
                }
                var getNumDay = new Date(getActivity[i]).getDay();
                if (getNumDay === 6 || getNumDay === 0 || getDayFestNum) {

                  var datasbagliata = [];
                  datasbagliata.push(getActivity[i]);
                  MessageBox.alert(
                    `Controlla le date selezionate hai selezionato dei giorni festivi`
                  );
                  break;

                }
                else {
                  for (let j = 0; j < getDates.length; j++) {
                    var obj = Object.assign({}, getDates[j]);
                    var spesaFilter = this.spese.filter(function (x) {
                      return x.ACTIVITY_ID == obj.ID;
                    });
                    // obj.ID = Math.floor(Math.random() * (999999 - 11 + 1) + 11);
                    obj.DATA_ATTIVITA = getActivity[i];
                    var dataString = JSON.stringify(obj);
                    jQuery.when(this.oInitialLoadFinishedDeferred).then(
                      jQuery.proxy(function () {
                        var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                        jQuery.ajax({
                          url: sUrl + `ActivitySet`,
                          contentType: "application/json",
                          type: "POST",
                          data: dataString,
                          dataType: "json",
                          success: function (oData, oResponse) {
                            obj.ID = oData.ID;
                            if (getActivity.length > 1) {
                              var datecopiate = [];
                              datecopiate = getActivity[i];
                              var msg = `le date ${datecopiate} sono state aggiunge correttamente`;
                            } else {
                              var datecopiate = getActivity[0]
                              var msg = `le date ${datecopiate} sono state aggiunge correttamente`;
                            }
                            sap.m.MessageToast.show(msg);
                          },
                          error: function (error) {
                            if (getActivity.length > 1) {
                              var datecopiate = getActivity
                              var msg = `le date ${datecopiate} non sono state aggiunge correttamente`;
                            } else {
                              var datecopiate = getActivity[0]
                              var msg = `le date ${datecopiate} non sono state aggiunge correttamente`;
                            }
                            sap.m.MessageToast.show(msg);
                          },
                          async: false,
                        });
                      }, this)
                    );
                    var idObj = obj.ID;
                    if (copyExpenses === 1) {
                      if (spesaFilter.length > 0) {
                        for (let t = 0; t < spesaFilter.length; t++) {
                          var obj1 = Object.assign({}, spesaFilter[t]);
                          obj1.ACTIVITY_ID = idObj;

                          var spesastring1 = JSON.stringify(obj1);
                          jQuery.when(this.oInitialLoadFinishedDeferred).then(
                            jQuery.proxy(function () {
                              var sUrl =
                                this.getOwnerComponent().getModel().sServiceUrl;

                              jQuery.ajax({
                                url: sUrl + `TipoSpesaSet`,
                                contentType: "application/json",
                                type: "POST",
                                data: spesastring1,
                                dataType: "json",
                                success: function (oData, oResponse) {
                                  // that.entity = "view";
                                  // that.enableModel.setProperty("/entity", that.entity);

                                  var msg = "le spese sono state aggiunge correttamente";
                                  sap.m.MessageToast.show(msg);
                                  obj.ID = oData.ID_SPESA;
                                },
                                error: function (error) {

                                  var msg = "le spese non sono state aggiunge correttamente";
                                  sap.m.MessageToast.show(msg);
                                },
                                async: false,
                              });
                            }, this)
                          );
                        }
                      }
                    }
                  }
                }
              }
              workListTable.setProperty("/workList", getAllDataActivities);
              this._timesheetMatched();
              this._dialogCalendarTs.close();
              this.getView().removeDependent(this._dialogCalendarTs);
              this._dialogCalendarTs.destroy();
            }
          }
        // }


      },

      _checkOda: function (i, allSelectedTs, callback) {
        if (i < 0) {
          this._tempAllSelectedTs = allSelectedTs;
          this._tempCallback = callback;
        }
        i++;
        if (this.params[i]) {
          oData.getPeriodicWbs(
            this._getEmployeeId(),
            this.params[i].data,
            this.params[i].data,
            _.bind(function (result) {
              this.params[i].wbs = result;
              this._checkOda(i);
            }, this),
            _.bind(function (err) { }, this)
          );
        } else {
          _.forEach(
            this.params,
            _.bind(function (param) {
              var wbs = param.wbs;
              param.activeWbs = [];
              param.inactiveWbs = [];
              _.forEach(this._tempAllSelectedTs, function (ts) {
                var y = _.find(wbs, function (singleWbs) {
                  if (
                    singleWbs.workPackage === ts.WBS &&
                    singleWbs.engagementProjectResource === ts.activityId &&
                    singleWbs.workItem === ts.workItem &&
                    (singleWbs.purchaseOrder !== null
                      ? singleWbs.purchaseOrder.purchaseOrder ===
                      ts.purchaseOrder
                      : true) &&
                    (singleWbs.purchaseOrder !== null
                      ? singleWbs.purchaseOrder.purchaseOrderItem ===
                      ts.purchaseOrderItem
                      : true)
                  ) {
                    return singleWbs;
                  }
                });

                if (y) {
                  param.activeWbs.push(ts);
                } else {
                  param.inactiveWbs.push(ts);
                }
              });
            }, this)
          );
          var dialog = sap.ui.getCore().getElementById("idCalendarDialog");
          dialog.setBusy(false);
          // console.log(this.params)
          this._tempCallback(this.params);
        }
      },

      _checkPeriods: function (operation, dialogCalendarProperty) {
        // per ogni ts, verifico se in quel giorno sono aperti i periodi necessari per la duplicazione o il rilascio del rapportino
        var allTsToWork = this.allSelectedTs;
        // faccio un forEach e uno uniq perché uniq e uniqBy non funzionano correttamente per array di proprietà
        // _.forEach(allTsToWork, function (n) {
        //   n.propertyToUnique =
        //     n.workDate + !!n.absenceCode + !!n.expenses.length;
        // });
        // lo uniq serve per evitare di mostrare nell'eventuale messaggio di errore che per uno stesso giorno, uno stesso tipo periodo è chiuso
        // allTsToWork = _.uniqBy(allTsToWork, "propertyToUnique");
        // la seguente variabile serve per tenere dentro i rapportini che si volevano duplicare su giorni chiusi
        this.allErrorsTs = [];
        for (var i = 0; i < allTsToWork.length; i++) {
          var errorMsg = "";
          var ts = allTsToWork[i];
          var periodsByDate = this._getPeriodsByDate(
            new Date(
              formatter.dateFromStringToDateValue(ts.workDate).setHours(12)
            ),
            dialogCalendarProperty
          );
          var activity = periodsByDate.activity;
          var absence = periodsByDate.absence;
          var expense = periodsByDate.expense;
          if (!activity && !ts.absenceCode) {
            // entro qui dentro se sto provando a duplicare un rapportino che non è assenza e il periodo attività è chiuso
            errorMsg = this._getLocalText("activitiesPeriodIsClosed");
          } else if (!absence && ts.absenceCode) {
            // entro qui dentro se sto provando a duplicare un rapportino che è assenza e il periodo assenze è chiuso
            errorMsg = this._getLocalText("absencesPeriodIsClosed");
          } else if (this.duplicateExpenses && !expense && ts.expenses.length) {
            // entro qui dentro se sto provando a duplicare le spese di un rapportino e il periodo spese è chiuso
            errorMsg = this._getLocalText("expensesPeriodIsClosed");
          }
          if (errorMsg) {
            ts.errorMsg = errorMsg;
            this.allErrorsTs.push(ts);
            _.remove(this.allSelectedTs, function (n) {
              return n.propertyToUnique === ts.propertyToUnique;
            });
          }
        }
        if (this.allSelectedTs.length) {
          if (operation === "duplicate") {
            // se tutto è andato correttamente, posso salvare i rapportini
            var counter = -1;
            // la seguente variabile conterrà i ts salvati che poi dovrò fare il match tra quelli salvati e quelli da salvare cui sono eventualmente associate le trasferte
            this.allSavedTs = [];
            this.errorRecordDuplicateYY1_TMSCounterFlow_TIM = "";
            this.saveTs(counter);
          } else if (operation === "release") {
            this._checkWorkPlaceForRelease();
          }
        } else {
          // se non ci sono più rapportini da salvare allora mostro direttamente l'errore
          this.showErrorTsNotWorked();
        }
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
            var errorMsgRow = ts.workDate + ": " + ts.errorMsg;
            errorMsg += errorMsgRow;
            if (i !== this.allErrorsTs.length - 1) {
              errorMsg += "\n";
            }
          }
          this.allErrorsTs = [];
          if (setPage) {
            MessageBox.error(errorMsg, {
              onClose: _.bind(this._setPage, this),
            });
          } else {
            MessageBox.error(errorMsg);
          }
          var dialog = sap.ui.getCore().getElementById("idCalendarDialog");
          if (dialog && dialog.isOpen() && dialog.getBusy()) {
            dialog.setBusy(false);
          }
        } else if (setPage) {
          this._setPage();
        } else {
          this._dialogCalendarTs.close();
          this._checkErrorDuplicate();
        }
      },

      onIconPress: function (evt) {
        var selectedTs = evt
          .getSource()
          .getParent()
          .getBindingContext("tableModel")
          .getObject();
        var source = evt.getSource();
        var icon = source.getSrc();
        if (selectedTs.statusId === "40") {
          this._showRejectionReason(source);
          return;
        }
        if (icon === "sap-icon://unlocked") {
          selectedTs.status = "20";
        } else {
          selectedTs.notes += ".";
        }
        selectedTs.timeSheetIsReleasedOnSave = true;
        selectedTs.operation = "U";
        if (
          parseFloat(selectedTs.workHours) !== parseInt(selectedTs.workHours)
        ) {
          // entro qua dentro se ho delle mezze ore
          selectedTs.workMinutes = "30";
        }
        var convertedTs = TimesheetSerializer.toSap(selectedTs);
        this.openDialogBusy(this._getLocalText("savingData"));
        if (icon === "sap-icon://unlocked") {
          this._unreleaseIconTs(convertedTs);
        } else {
          var transfer = selectedTs.transfer;
          this._releaseIconTs(convertedTs, transfer);
        }
      },

      _showRejectionReason: function (source) {
        var obj = source.getParent().getBindingContext("tableModel");
        var path = obj.getPath();
        if (!this._rejectionReasonPopover) {
          this._rejectionReasonPopover = sap.ui.xmlfragment(saveTs,
            "timesheetproject2.view.fragment.RejectionReasonPopover",
            this
          );
          this.getView().addDependent(this._rejectionReasonPopover);
          this._rejectionReasonPopover.setModel(this.tableModel);
        }
        this._rejectionReasonPopover.bindElement(path);
        this._rejectionReasonPopover.openBy(source);
      },

      _releaseIconTs: function (ts, transfer) {
        var fSuccess = function (result) {
          result.TimeSheetOperation = "U";
          var notes = result.TimeSheetDataFields.TimeSheetNote;
          notes = notes.substring(0, notes.length - 1);
          result.TimeSheetDataFields.TimeSheetNote = notes;
          result.TimeSheetIsReleasedOnSave = true;
          this._unreleaseIconTs(result, transfer);
        }.bind(this);
        var fError = function (error) {
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
          });
          this.closeDialogBusy();
        }.bind(this);
        oData.saveTs(ts, fSuccess, fError);
      },

      _unreleaseIconTs: function (ts, transfer) {
        var fSuccess = function () {
          if (transfer) {
            var transferToChange = {
              ID_TRASFERTA: transfer.idTrasferta,
              ID_DIPENDENTE: transfer.idDipendente,
              ID_TIMESHEET: ts.TimeSheetRecord,
              ID_WBS: ts.TimeSheetDataFields.WBSElement,
              CHIAVE_TRASFERTA: transfer.chiaveTrasferta,
              SOCIETA: ts.CompanyCode,
              DATA_INIZIO:
                "/Date(" + _.clone(ts.TimeSheetDate).setHours(12) + ")/",
              DATA_FINE:
                "/Date(" + _.clone(ts.TimeSheetDate).setHours(12) + ")/",
              STATO_APPROVAZIONE: transfer.statoApprovazione,
              // mi prendo l'utente loggato perché il cid da salvare dentro 'CREATO_DA' dev'essere quello di chi è loggato
              CREATO_DA: transfer.creatoDa,
              DATA_CREAZIONE:
                "/Date(" + _.clone(ts.TimeSheetDate).setHours(12) + ")/",
            };
            this.updateTransfer(transferToChange);
          } else {
            this._setPage();
          }
        }.bind(this);
        var fError = function (error) {
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
          });
          this.closeDialogBusy();
        }.bind(this);
        oData.saveTs(ts, fSuccess, fError);
      },

      updateTransfer: function (transfer) {
        var fSuccess = function () {
          this._setPage();
        }.bind(this);
        var fError = function (error) {
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
          });
          this.closeDialogBusy();
        }.bind(this);
        oData.updateTransfer(transfer.ID_TRASFERTA, transfer, fSuccess, fError);
      },

      saveTs: function (counter) {
        counter++;
        var fSuccess = function (result) {
          if (this.allSavedTs) {
            this.allSavedTs.push(result);
          }
          if (this.duplicate) {
            result.YY1_TMSCounterFlow_TIM = result.TimeSheetRecord;
            oData.saveTs(
              result,
              _.bind(function (success) {
                this.saveTs(counter);
              }, this),
              _.bind(function (error) {
                var err = formatter.formatErroriSap(error);
                this.errorRecordDuplicateYY1_TMSCounterFlow_TIM += err + "\n";
              }, this)
            );
          } else {
            this.saveTs(counter);
          }
        }.bind(this);
        var fError = function (error) {
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
          });
          this.saveTs(counter);
        }.bind(this);
        var timesheet = this.allSelectedTs[counter];
        if (timesheet) {
          if (
            parseFloat(timesheet.workHours) !== parseInt(timesheet.workHours)
          ) {
            // entro qua dentro se ho delle mezze ore
            timesheet.workMinutes = "30";
          }
          var convertedTs = TimesheetSerializer.toSap(timesheet);
          oData.saveTs(convertedTs, fSuccess, fError);
        } else {
          if (this.duplicateExpenses) {
            this._saveTransfer();
          } else {
            this.onCancelCalendarDialogPress();
            if (this.duplicate) this._checkErrorDuplicate();

            if (this.errorRecordDuplicateYY1_TMSCounterFlow_TIM !== "") {
              MessageBox.error(
                this.errorRecordDuplicateYY1_TMSCounterFlow_TIM,
                {
                  title: this._getLocalText("oDataError"),
                }
              );
            }
          }
        }
      },

      _saveTransfer: function () {
        var fSuccess = function () {
          this.onCancelCalendarDialogPress();
          if (this.duplicate) this._checkErrorDuplicate();
        }.bind(this);
        var fError = function (error) {
          var err = formatter.formatErroriSap(error);
          MessageBox.error(err, {
            title: this._getLocalText("oDataError"),
          });
          this.onCancelCalendarDialogPress();
        }.bind(this);
        var allTransfer = [];
        var allExpenses = [];
        for (var i = 0; i < this.allSelectedTs.length; i++) {
          var tsToSave = this.allSelectedTs[i];
          var savedTs = this.allSavedTs[i];
          var transfer = tsToSave.transfer;
          if (transfer) {
            transfer.companyCode = tsToSave.company;
            transfer.idTimesheet = savedTs.TimeSheetRecord;
            var expenses = tsToSave.expenses;
            for (var j = 0; j < expenses.length; j++) {
              expenses[j].idTimesheet = savedTs.TimeSheetRecord;
              expenses[j].idDipendente = transfer.idDipendente;
              expenses[j] = ExpenseSerializer.toSap(expenses[j]);
            }
            allTransfer.push(TransferSerializer.toSap(transfer));
            allExpenses = allExpenses.concat(expenses);
          }
        }
        var objToSave = {
          trasferte: allTransfer,
          spese: allExpenses,
        };
        oData.saveTransfers(objToSave, fSuccess, fError);
      },

      onReleaseAllPress: function () {
        this.timesheetModel.setProperty(
          "/calendarDialogTitle",
          this._getLocalText("releaseTs")
        );
        this.release = true;
        this.duplicate = false;
        this._openDialogCalendarTs();
      },

      _saveDate: function () {
        var year = this.selectedDate.getFullYear();
        var month = this.selectedDate.getMonth() + 1;
        var day = this.selectedDate.getDate();
        var date = ("selectedDate", year + "," + month + "," + day);
      },

      // funzione per la lettura delle note del timesheet
      onPressNoteIcon: function (evt) {
        var src = evt.getSource();
        var obj = src.getParent().getBindingContext("tableModel");
        var path = obj.getPath();
        if (!this.notesPopover) {
          this.notesPopover = sap.ui.xmlfragment(
            "timesheetproject2.view.fragment.NotesPopover",
            this
          );
          this.getView().addDependent(this.notesPopover);
          this.notesPopover.setModel(this.tableModel);
        }
        this.notesPopover.bindElement(path);
        this.notesPopover.openBy(src);
      },

      // funzione che naviga alla pagina delle note spese, partendo dalla commessa selezionata
      onPressExpense: function (evt) {
        var modelRow = evt
          .getSource()
          .getParent()
          .getBindingContext("tableModel")
          .getObject();
        evt.getSource();
        this.getRouter().navTo("expense", {
          date: modelRow.workDate,
          wbsId: modelRow.Id,
        });
      },

      onReportPress: function () {
        StorageService.sessionSave("month", this.actualMonth);
        StorageService.sessionSave("year", this.actualYear);
        this.getRouter().navTo("report");
      },

      _checkErrorDuplicate: function () {
        var errorDuplicate = [];
        _.forEach(
          this.params,
          _.bind(function (param) {
            if (_.size(param.inactiveWbs) > 0) {
              var elencoWbs = [];
              _.forEach(param.inactiveWbs, function (wbs) {
                elencoWbs.push({
                  wbs: wbs.WBS,
                  description: wbs.descriptionWbs,
                  purchaseOrder: wbs.purchaseOrder,
                });
              });
              errorDuplicate.push({
                data: param.data,
                wbs: elencoWbs,
              });
            }
          }, this)
        );
        if (_.size(errorDuplicate) > 0) {
          var msg = "";
          _.forEach(errorDuplicate, function (element) {
            msg +=
              "<p><strong>" +
              formatter.formatDate(new Date(element.data)) +
              "</strong></p>\n";
            msg += "<ul>";
            _.forEach(element.wbs, function (wbs) {
              msg += "<li>" + wbs.wbs + " - " + wbs.description;
              msg += "<p>Purchase order: " + wbs.purchaseOrder + "</p></li>";
            });
            msg += "</ul>";
          });

          MessageBox.show(this._getLocalText("errorDuplicateODA"), {
            icon: MessageBox.Icon.ERROR,
            title: "Error",
            actions: [sap.m.MessageBox.Action.CLOSE],
            details: msg,
            styleClass: "sapUiSizeCompact",
            contentWidth: "100px",
          });
        }
        this.params = undefined;
      },
      _changeUser: function () {
        MessageBox.confirm(this._getLocalText("logoutText"), {
          class: "sapUiSizeCompact",
          actions: [MessageBox.Action.YES, MessageBox.Action.NO],
          onClose: _.bind(this.removeUser, this),
        });
      },
      removeUser: function (evt) {
        // if (evt === "NO") {
        // 	return;
        // }
        // if (evt === "YES") {
        // 	var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        // 	oStore.put("id");
        // 	history.go(-1);
        // }
      },
      notification: function () {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
        var that = this;
      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   var idUtente = this.oDate.ID_UTENTE;
        //   jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //     jQuery.proxy(function () {
        //       var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        //       that.makeAjaxRequest(
        //         sUrl + `Associazione_Commessa_Utente?$filter=ID_UTENTE_ID_UTENTE eq '${idUtente}'`,
        //         function (data) {
        //           // Handle success for Anagrafica_Utenti
        //           that.assign = data.value;
        //           var calc = this.getView().getModel("NotificationModel");
        //           calc.setProperty("/ProductCollection", []);
        //           var list = [];
        //           for (var g = 0; g < this.getUser.length; g++) {
        //             if (
        //               this.getUser[g].ID_UTENTE === idUtente
        //             ) {
        //               var getAssign = this.assign.filter(
        //                 (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
        //               );

        //               for (var i = 0; i < getAssign.length; i++) {
        //                 var getCommessa = this.legendActivity.filter(
        //                   (x) => x.ID === getAssign[i].ID_ID
        //                 );

        //                 if (getCommessa.length > 0) {
        //                   if (getCommessa[0].Descrizione != 'Ferie' &&
        //                     getCommessa[0].Descrizione != 'Permesso' &&
        //                     getCommessa[0].Descrizione != 'Malattia' &&
        //                     getCommessa[0].Descrizione != 'Formazione' &&
        //                     getCommessa[0].Descrizione != 'INDIGATE') {
        //                     for (var b = 0; b < getCommessa.length; b++) {
        //                       var calcolo = {};

        //                       calcolo.Name = getCommessa[b].Descrizione;

        //                       calcolo.ProductId = getAssign[i].STATO_COMMESSA;

        //                       list.push(calcolo);
        //                     }
        //                   }
        //                 }


        //               }
        //             }
        //             calc.setProperty("/ProductCollection", list);
        //           }
        //         }.bind(this),
        //         function (error) {
        //           // Handle error for Anagrafica_Utenti
        //           // console.log("Error in Associazione_Commessa_Utente: ", error);
        //           sap.ui.core.BusyIndicator.hide();
        //         }.bind(this)
        //       );
        //     }, this)
        //   );
        // }
        // else {
          //UTENTI IDGFAB
          jQuery.when(this.oInitialLoadFinishedDeferred).then(
            jQuery.proxy(function () {
              var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
              that.makeAjaxRequest(
                sUrl + `Associazione_Commessa_Utente?$filter=ID_UTENTE_ID_UTENTE eq '${this.getUser[0].ID_UTENTE}'`,
                function (data) {
                  // Handle success for Anagrafica_Utenti
                  that.assign = data.value;
                  var calc = this.getView().getModel("NotificationModel");
                  calc.setProperty("/ProductCollection", []);
                  var list = [];
                  for (var g = 0; g < this.getUser.length; g++) {
                    if (
                      this.getUser[g].EMAIL_UTENTE === email
                    ) {
                      var getAssign = this.assign.filter(
                        (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
                      );

                      for (var i = 0; i < getAssign.length; i++) {
                        var getCommessa = this.legendActivity.filter(
                          (x) => x.ID === getAssign[i].ID_ID
                        );

                        if (getCommessa.length > 0) {
                          if (getCommessa[0].Descrizione != 'Ferie' &&
                            getCommessa[0].Descrizione != 'Permesso' &&
                            getCommessa[0].Descrizione != 'Malattia' &&
                            getCommessa[0].Descrizione != 'Formazione' &&
                            getCommessa[0].Descrizione != 'INDIGATE') {
                            for (var b = 0; b < getCommessa.length; b++) {
                              var calcolo = {};

                              calcolo.Name = getCommessa[b].Descrizione;

                              calcolo.ProductId = getAssign[i].STATO_COMMESSA;

                              list.push(calcolo);
                            }
                          }
                        }


                      }
                    }
                    calc.setProperty("/ProductCollection", list);
                  }
                }.bind(this),
                function (error) {
                  // Handle error for Anagrafica_Utenti
                  // console.log("Error in Associazione_Commessa_Utente: ", error);
                  sap.ui.core.BusyIndicator.hide();
                }.bind(this)
              );
            }, this)
          );
        // }

      },
      onPressNotification: function (evt) {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();

    
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   var src = evt.getSource();
        //   this.notification();
        //   var calc = this.getView().getModel("NotificationModel");
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var calc = this.getView().getModel("legendModel");
        //       this.getAssign = this.assign.filter(
        //         (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
        //       );
        //       var calcolo = this.getAssign.filter(
        //         (x) => x.STATO_COMMESSA === "Accettata"
        //       );
        //       // sap.ui.getCore().byId("ProductList").setProperty('mode', 'None')
        //       if (calcolo.length > 0) {
        //         if (!this.selectActivities) {
        //           this.selectActivities = sap.ui.xmlfragment(
        //             "timesheetproject2.view.fragment.NotificationTimesheet",
        //             this
        //           );
        //           this.getView().addDependent(this.selectActivities);
        //         }
        //         // calc.setProperty("/ProductCollection", list);
        //         sap.ui.getCore().byId("ProductList").setProperty("mode", "None");
        //         sap.ui.getCore().byId("Accepted").setProperty("visible", false);

        //         this.selectActivities.open();
        //       }
        //       else {
        //         if (!this.selectActivities) {
        //           this.selectActivities = sap.ui.xmlfragment(
        //             "timesheetproject2.view.fragment.NotificationTimesheet",
        //             this
        //           );
        //           this.getView().addDependent(this.selectActivities);
        //           sap.ui.getCore().byId("ProductList").setProperty("mode", "SingleSelect");
        //           sap.ui.getCore().byId("Accepted").setProperty("visible", true);

        //           this.selectActivities.open();
        //         }
        //       }
        //     }
        //   }

        //   this.selectActivities.open();
        // }
        // else {
          //UTENTE IDGFAB

          var src = evt.getSource();
          this.notification();
          var calc = this.getView().getModel("NotificationModel");
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var calc = this.getView().getModel("legendModel");
              this.getAssign = this.assign.filter(
                (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
              );
              var calcolo = this.getAssign.filter(
                (x) => x.STATO_COMMESSA === "Accettata"
              );
              // sap.ui.getCore().byId("ProductList").setProperty('mode', 'None')
              if (calcolo.length > 0) {
                if (!this.selectActivities) {
                  this.selectActivities = sap.ui.xmlfragment(
                    "timesheetproject2.view.fragment.NotificationTimesheet",
                    this
                  );
                  this.getView().addDependent(this.selectActivities);
                }
                // calc.setProperty("/ProductCollection", list);
                sap.ui.getCore().byId("ProductList").setProperty("mode", "None");
                sap.ui.getCore().byId("Accepted").setProperty("visible", false);

                this.selectActivities.open();
              }
              else {
                if (!this.selectActivities) {
                  this.selectActivities = sap.ui.xmlfragment(
                    "timesheetproject2.view.fragment.NotificationTimesheet",
                    this
                  );
                  this.getView().addDependent(this.selectActivities);
                  sap.ui.getCore().byId("ProductList").setProperty("mode", "SingleSelect");
                  sap.ui.getCore().byId("Accepted").setProperty("visible", true);

                  this.selectActivities.open();
                }
              }
            }
          }

          this.selectActivities.open();

        // }






      },
      onPressOk: function () {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
    
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var selectedItem = sap.ui
        //         .getCore()
        //         .byId("ProductList")
        //         .getSelectedItems();

        //       var list = [];
        //       if (selectedItem) {
        //         for (var a = 0; a < selectedItem.length; a++) {
        //           for (var c = 0; c < this.legendActivity.length; c++) {
        //             if (
        //               selectedItem[a].mProperties.title ===
        //               this.legendActivity[c].Descrizione
        //             ) {
        //               var idAssociazione = [];
        //               idAssociazione = this.assign.filter((x) => x.ID_UTENTE_ID_UTENTE === this.getUser[g].ID_UTENTE && x.ID_ID === this.legendActivity[c].ID || x.STATO_COMMESSA === 'in pausa' && x.STATO_COMMESSA === 'Da accettare');
        //               var obj = {
        //                 ID_ASS_COMM_UTE: idAssociazione[0].ID_ASS_COMM_UTE,
        //                 ID_UTENTE_ID_UTENTE: this.getUser[g].ID_UTENTE,
        //                 ID_ID: this.legendActivity[c].ID,
        //                 STATO_COMMESSA: "Accettata",
        //               };
        //             }
        //           }

        //           var that = this;
        //           var spesastring = JSON.stringify(obj);

        //           jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //             jQuery.proxy(function () {
        //               var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

        //               jQuery.ajax({
        //                 url:
        //                   sUrl +
        //                   `Associazione_Commessa_Utente/${obj.ID_ASS_COMM_UTE}`,
        //                 contentType: "application/json",
        //                 type: "PUT",
        //                 data: spesastring,
        //                 dataType: "json",
        //                 success: function (oData, oResponse) {
        //                   // that.entity = "view";
        //                   // that.enableModel.setProperty("/entity", that.entity);
        //                   var msg = "Updated Succesfully!";
        //                   sap.m.MessageToast.show(msg);
        //                 },
        //                 error: function (error) {
        //                   var msg = "Not Updated Check Data!";
        //                   sap.m.MessageToast.show(msg);
        //                 },
        //                 async: false,
        //               });
        //             }, this)
        //           );
        //           this.notification();
        //           // this.selectActivities.destroy()
        //           // this.selectActivities.removeAllContent()
        //           // sap.ui.getCore().byId("ProductList").removeSelections();
        //           // sap.ui.getCore().byId("ProductList").updateItems()
        //           // this.notification();
        //           sap.ui.getCore().byId("ProductList").removeSelections();
        //           // sap.ui.getCore().byId("ProductList").removeAllItems()

        //           this.selectActivities.close();

        //           this.selectActivities.destroy();
        //           this.selectActivities = null;
        //           var calc = this.getView().getModel("NotificationModel");
        //           calc.setProperty("/ProductCollection", []);
        //           this._timesheetMatched();
        //           // this.selectActivities.destroy()
        //           // this.selectActivities = null;
        //           // this.notification();
        //         }
        //       }
        //     }
        //   }
        // }
        // else {
          //UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var selectedItem = sap.ui
                .getCore()
                .byId("ProductList")
                .getSelectedItems();

              var list = [];
              if (selectedItem) {
                for (var a = 0; a < selectedItem.length; a++) {
                  for (var c = 0; c < this.legendActivity.length; c++) {
                    if (
                      selectedItem[a].mProperties.title ===
                      this.legendActivity[c].Descrizione
                    ) {
                      var idAssociazione = [];
                      idAssociazione = this.assign.filter((x) => x.ID_UTENTE_ID_UTENTE === this.getUser[g].ID_UTENTE && x.ID_ID === this.legendActivity[c].ID || x.STATO_COMMESSA === 'in pausa' && x.STATO_COMMESSA === 'Da accettare');
                      var obj = {
                        ID_ASS_COMM_UTE: idAssociazione[0].ID_ASS_COMM_UTE,
                        ID_UTENTE_ID_UTENTE: this.getUser[g].ID_UTENTE,
                        ID_ID: this.legendActivity[c].ID,
                        STATO_COMMESSA: "Accettata",
                      };
                    }
                  }

                  var that = this;
                  var spesastring = JSON.stringify(obj);

                  jQuery.when(this.oInitialLoadFinishedDeferred).then(
                    jQuery.proxy(function () {
                      var sUrl = this.getOwnerComponent().getModel().sServiceUrl;

                      jQuery.ajax({
                        url:
                          sUrl +
                          `Associazione_Commessa_Utente/${obj.ID_ASS_COMM_UTE}`,
                        contentType: "application/json",
                        type: "PUT",
                        data: spesastring,
                        dataType: "json",
                        success: function (oData, oResponse) {
                          // that.entity = "view";
                          // that.enableModel.setProperty("/entity", that.entity);
                          var msg = "Updated Succesfully!";
                          sap.m.MessageToast.show(msg);
                        },
                        error: function (error) {
                          var msg = "Not Updated Check Data!";
                          sap.m.MessageToast.show(msg);
                        },
                        async: false,
                      });
                    }, this)
                  );
                  this.notification();
                  // this.selectActivities.destroy()
                  // this.selectActivities.removeAllContent()
                  // sap.ui.getCore().byId("ProductList").removeSelections();
                  // sap.ui.getCore().byId("ProductList").updateItems()
                  // this.notification();
                  sap.ui.getCore().byId("ProductList").removeSelections();
                  // sap.ui.getCore().byId("ProductList").removeAllItems()

                  this.selectActivities.close();

                  this.selectActivities.destroy();
                  this.selectActivities = null;
                  var calc = this.getView().getModel("NotificationModel");
                  calc.setProperty("/ProductCollection", []);
                  this._timesheetMatched();
                  // this.selectActivities.destroy()
                  // this.selectActivities = null;
                  // this.notification();
                }
              }
            }
          }
        // }

      },
      onPressCancel: function () {
        sap.ui.getCore().byId("ProductList").removeSelections();
        this.selectActivities.close();
      },

      onpressActivities: function () {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   for (var g = 0; g < this.getUser.length; g++) {
        //     if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //       var calc = this.getView().getModel("legendModel");
        //       this.getAssign = this.assign.filter(
        //         (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
        //       );
        //       var calcolo = this.getAssign.filter(
        //         (x) => x.STATO_COMMESSA === "Accettata"
        //       );
  
        //       var descrizione = this.legendActivity.filter(
        //         (x) => x.ID === calcolo[0].ID_ID
        //       );
        //     }
        //   }
        //   MessageBox.confirm(
        //     `Vuoi mettere in pausa la commessa ${descrizione[0].Descrizione} ?`
        //     ,
        //     {
        //       class: "sapUiSizeCompact",
        //       actions: [MessageBox.Action.YES, MessageBox.Action.NO],
        //       onClose: _.bind(this.commessaInPausa, this),
        //     });
        // }
        // else{
          //UTENTE IDGFAB
          for (var g = 0; g < this.getUser.length; g++) {
            if (this.getUser[g].EMAIL_UTENTE === email) {
              var calc = this.getView().getModel("legendModel");
              this.getAssign = this.assign.filter(
                (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
              );
              var calcolo = this.getAssign.filter(
                (x) => x.STATO_COMMESSA === "Accettata"
              );
  
              var descrizione = this.legendActivity.filter(
                (x) => x.ID === calcolo[0].ID_ID
              );
            }
          }
          MessageBox.confirm(
            `Vuoi mettere in pausa la commessa ${descrizione[0].Descrizione} ?`
            ,
            {
              class: "sapUiSizeCompact",
              actions: [MessageBox.Action.YES, MessageBox.Action.NO],
              onClose: _.bind(this.commessaInPausa, this),
            });
        // }
      

      },
      commessaInPausa: function (evt) {
        var userInfo = sap.ushell.Container.getService('UserInfo')
        var email = userInfo.getEmail();
      
        // this.oDate = null;

        //UTENTE TECHNIS
        // if (this.oDate != null && this.oDate != "") {
        //   var name = this.oDate.NOME_UTENTE;
        //   var surname = this.oDate.COGNOME_UTENTE;
        //   if (evt === "YES") {
        //     for (var g = 0; g < this.getUser.length; g++) {
        //       if (this.getUser[g].NOME_UTENTE === name && this.getUser[g].COGNOME_UTENTE === surname) {
        //         var calc = this.getView().getModel("legendModel");
        //         this.getAssign = this.assign.filter(
        //           (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
        //         );
        //         var calcolo = this.getAssign.filter(
        //           (x) => x.STATO_COMMESSA === "Accettata"
        //         );
        //       }
        //     }
        //     var obj = {
        //       ID_ASS_COMM_UTE: calcolo[0].ID_ASS_COMM_UTE,
        //       ID_UTENTE_ID_UTENTE: calcolo[0].ID_UTENTE_ID_UTENTE,
        //       ID_ID: calcolo[0].ID_ID,
        //       STATO_COMMESSA: "In pausa",
        //     };
  
        //     var that = this;
        //     var spesastring = JSON.stringify(obj);
  
        //     jQuery.when(this.oInitialLoadFinishedDeferred).then(
        //       jQuery.proxy(function () {
        //         var sUrl =
        //           this.getOwnerComponent().getModel().sServiceUrl;
  
        //         jQuery.ajax({
        //           url:
        //             sUrl +
        //             `Associazione_Commessa_Utente/${obj.ID_ASS_COMM_UTE}`,
        //           contentType: "application/json",
        //           type: "PUT",
        //           data: spesastring,
        //           dataType: "json",
        //           success: function (oData, oResponse) {
        //             // that.entity = "view";
        //             // that.enableModel.setProperty("/entity", that.entity);
        //             var msg = "Updated Succesfully!";
        //             sap.m.MessageToast.show(msg);
        //           },
        //           error: function (error) {
        //             var msg = "Not Updated Check Data!";
        //             sap.m.MessageToast.show(msg);
        //           },
        //           async: false,
        //         });
        //       }, this)
        //     );
        //     sap.ui.getCore().byId("ProductList").setProperty("mode", "SingleSelect");
        //     sap.ui.getCore().byId("Accepted").setProperty("visible", true);
        //     this._timesheetMatched();
        //   }
        // }
        // else{
          if (evt === "YES") {
            for (var g = 0; g < this.getUser.length; g++) {
              if (this.getUser[g].EMAIL_UTENTE === email) {
                var calc = this.getView().getModel("legendModel");
                this.getAssign = this.assign.filter(
                  (x) => x.ID_UTENTE_ID_UTENTE == this.getUser[g].ID_UTENTE
                );
                var calcolo = this.getAssign.filter(
                  (x) => x.STATO_COMMESSA === "Accettata"
                );
              }
            }
            var obj = {
              ID_ASS_COMM_UTE: calcolo[0].ID_ASS_COMM_UTE,
              ID_UTENTE_ID_UTENTE: calcolo[0].ID_UTENTE_ID_UTENTE,
              ID_ID: calcolo[0].ID_ID,
              STATO_COMMESSA: "In pausa",
            };
  
            var that = this;
            var spesastring = JSON.stringify(obj);
  
            jQuery.when(this.oInitialLoadFinishedDeferred).then(
              jQuery.proxy(function () {
                var sUrl =
                  this.getOwnerComponent().getModel().sServiceUrl;
  
                jQuery.ajax({
                  url:
                    sUrl +
                    `Associazione_Commessa_Utente/${obj.ID_ASS_COMM_UTE}`,
                  contentType: "application/json",
                  type: "PUT",
                  data: spesastring,
                  dataType: "json",
                  success: function (oData, oResponse) {
                    // that.entity = "view";
                    // that.enableModel.setProperty("/entity", that.entity);
                    var msg = "Updated Succesfully!";
                    sap.m.MessageToast.show(msg);
                  },
                  error: function (error) {
                    var msg = "Not Updated Check Data!";
                    sap.m.MessageToast.show(msg);
                  },
                  async: false,
                });
              }, this)
            );
            sap.ui.getCore().byId("ProductList").setProperty("mode", "SingleSelect");
            sap.ui.getCore().byId("Accepted").setProperty("visible", true);
            this._timesheetMatched();
          }
        // }
      }
    });
  }
);
