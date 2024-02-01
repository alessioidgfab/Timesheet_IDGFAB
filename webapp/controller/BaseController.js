sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../utils/Busy",
	"../model/oDataRequest",
	"../model/StorageService",
	"../utils/TimesheetSerializer",
	"../utils/CidSerializer",
	"../utils/CalcoloPasqua",
	"../model/formatter",
	"sap/m/MessageBox"
], function (Controller, Busy, oData, StorageService, TimesheetSerializer, CidSerializer, CalcoloPasqua, formatter, MessageBox) {
	"use strict";
	/* eslint-disable no-console */
	/* eslint-disable no-alert */
	// globals _:false ;
	/*eslint linebreak-style:0*/
	return Controller.extend("timesheetproject2.controller.BaseController", {
		onInit: function () {
            oData.view = this.getView();
			this.uiModel = sap.ui.model.json.JSONModel;
			this.getView().setModel(this.uiModel, "ui");

			this.periodsModel = sap.ui.model.json.JSONModel;
            this.getView().setModel(this.periodsModel, "periodsModel");
		},

		_getUserInfo: function () {
			// this._setDebugCid();
			
			// this.openDialogBusy(this._getLocalText("loadingPage"));
			// oData.getUserInfo(_.bind(function (result) {
			// 	var userModel = new sap.ui.model.json.JSONModel();
			// 	this.getView().setModel(userModel, "userModel");
			// 	this.getModel("userModel").setData(result);
			// 	this._getEmployee();
			// }, this), _.bind(function (error) {
			// 	var err = formatter.formatErroriSap(error);
			// 	this.closeDialogBusy();
			// 	MessageBox.error(err, {
			// 		title: this._getLocalText("oDataError")
			// 	});
			// }, this));
		},

		_setDebugCid: function () {
			this.debug = true;
			if (location.href.indexOf("IndigateTest") > 0) {
				this.debug = true;
				this.debugUser = "ESPMANZOLI";
				switch (this.debugUser) {
				case "ESPMANZOLI": //ADMIN
					this.debugCid = "50000281";
					break;
				case "CGALIAZZO": //ADMIN
					this.debugCid = "50000281";
					break;
				case "ESPSPINA": //USER
					this.debugCid = "50000281";
					break;
				case "FSPINA": //ADMIN
					this.debugCid = "50000281";
					break;
				case "ESPBIASOTTO": //USER
					this.debugCid = "50000281";
					break;
				}
			}
		},

		_getEmployeeId: function () {
			var employeeId;
			this._setDebugCid();
			var selectedUserInfo = StorageService.sessionGet("selectedUserInfo");
			if (selectedUserInfo && selectedUserInfo.userDetail) {
				employeeId = selectedUserInfo.userDetail.externalId;
			} else if (this.debug) {
				employeeId = this.debugUser;
			} else {
				employeeId = this.getModel("userModel").getProperty("/name");
			}
			return employeeId;
		},

		_getEmployeeCid: function () {
			var employeeCid;
			this._setDebugCid();
			var selectedUserInfo = StorageService.sessionGet("selectedUserInfo");
			if (selectedUserInfo && selectedUserInfo.userDetail) {
				employeeCid = selectedUserInfo.userDetail.cid;
			} else if (this.debug) {
				employeeCid = this.debugCid;
			} else {
				employeeCid = this.getModel("userModel").getProperty("/userDetail").cid;
			}
			return employeeCid;
		},

		_getEmployee: function () {
			oData.getEmploymentData(this._getEmployeeId(), _.bind(function (result) {
				if (!result || !result.cid || !result.stato) {
					this.closeDialogBusy();
					MessageBox.error(this._getLocalText("employmentErrorMsg"), {
						title: this._getLocalText("employmentErrorTitle")
					});
				} else {
					result = this._setVeichlesObj(result);
					this.getModel("userModel").setProperty("/userDetail", result);
					StorageService.sessionSave("userInfo", this.getModel("userModel").getData());
					var userLoggedIsAdmin = false;
					if (result.tipoUtente === "ADMIN") {
						this._getAllEmployees();
						userLoggedIsAdmin = true;
					} else {
						this.getModel("userModel").setProperty("/workingInAdmin", false);
						this._setPage();
					}
					this.getModel("userModel").setProperty("/userLoggedIsAdmin", userLoggedIsAdmin);
					StorageService.sessionSave("userModel", this.getModel("userModel").getData());
				}
			}, this), _.bind(function (error) {
				this.closeDialogBusy();
				MessageBox.error(error.statusText, {
					title: this._getLocalText("oDataError")
				});
			}, this));
		},

		_getAllEmployees: function () {
			this.openDialogBusy(this._getLocalText("loadingData"));
			var userLoggedData = StorageService.sessionGet("userInfo").userDetail;
			var companies = userLoggedData.dipendenteSocietaRef;
			var organizations = _.map(companies, function (n) {
				return n.societa;
			});
			oData.getAllEmployees(organizations, function (result) {
				var cidList = CidSerializer.fromSapItems(result);
				var loggedCid = this.debug ? this.debugCid : userLoggedData.cid;
				var userLogged = _.remove(cidList, {
					"cid": loggedCid
				});
				// se l'utente loggato non c'è nella lista significa che è admin di una società, ma dipendente di un'altra e quindi devo creare un oggetto uguale agli altri da aggiungere alla lista
				if (!userLogged.length) {
					userLogged = {
						"cid": userLoggedData.cid,
						"classeVeicolo": userLoggedData.classeVeicolo,
						"cognome": userLoggedData.cognome,
						"externalId": userLoggedData.externalId,
						"nome": userLoggedData.nome,
						"stato": 1,
						"tipoDipendente": userLoggedData.tipoDipendente,
						"tipoUtente": "USER",
						"tipoVeicolo": userLoggedData.tipoVeicolo,
						"veicoli": userLoggedData.veicoli
					};
				} else {
					userLogged = userLogged[0];
				}
				cidList = _.sortBy(cidList, ["cognome", "nome", "externalId"]);
				// userModel è il modello per l'utente loggato, mentre usersModel è quello per la lista di utenti
				this.usersModel = new sap.ui.model.json.JSONModel();
				this.getView().setModel(this.usersModel, "usersModel");
				cidList.unshift(userLogged);
				this.usersModel.setProperty("/selectedUser", userLogged.cid);
				if (cidList.length > 100) {
					this.usersModel.setSizeLimit(cidList.length);
				}
				this.usersModel.setProperty("/users", cidList);
				if (!this.dialogCidList) {
					this.dialogCidList = sap.ui.xmlfragment("titimesheetproject2.view.fragment.DialogCidList", this);
					this.getView().addDependent(this.dialogCidList);
				}
				this.dialogCidList.open();
				this.closeDialogBusy();
			}.bind(this), function (error) {
				this.closeDialogBusy();
				MessageBox.error(error.statusText, {
					title: this._getLocalText("oDataError")
				});
			}.bind(this));
		},

		onChangeUserPressOk: function () {
			this.openDialogBusy(this._getLocalText("loadingData"));
			var selectedUser = _.find(this.usersModel.getProperty("/users"), {
				"cid": this.usersModel.getProperty("/selectedUser")
			});
			if (selectedUser) {
				this.dialogCidList.close();
				//oData.getEmploymentData(selectedUser.externalId, _.bind(function (result) {
				oData.getEmploymentDataJson(selectedUser.externalId, _.bind(function (result) {
					if (!result || !result.cid || !result.stato) {
						this.closeDialogBusy();
						MessageBox.error(this._getLocalText("employmentErrorMsg"), {
							title: this._getLocalText("employmentErrorTitle")
						});
					} else {
						result = this._setVeichlesObj(result);
						var workingInAdmin = false;
						if (selectedUser.tipoUtente === "ADMIN" ||
							this.getModel("userModel").getProperty("/userDetail").cid !== result.cid) {
							// può succedere che un utente sia admin per una società ma dipendente di un'altra.
							// entro qui dentro se ho selezionato un utente ADMIN (= l'utente loggato è dipendente della società per cui è ADMIN e si seleziona)
							// oppure se ho selezionato un utente che ha un cid diverso dall'utente loggato (= sono admin della società del dipendente selezionato)
							workingInAdmin = true;
						}
						this.getModel("userModel").setProperty("/workingInAdmin", workingInAdmin);
						this.getModel("userModel").setProperty("/userDetail", result);
						StorageService.sessionSave("selectedUserInfo", this.getModel("userModel").getData());
						StorageService.sessionSave("userModel", this.getModel("userModel").getData());
						this._setPage();
					}
				}, this), _.bind(function (error) {
					this.closeDialogBusy();
					MessageBox.error(error.statusText, {
						title: this._getLocalText("oDataError")
					});
				}, this));
			}
		},

		_setVeichlesObj: function (result) {
			var vehicles = _.cloneDeep(result.dipendenteVeicoloRef);
			var correctVehicles = [];
			for (var i = 0; i < vehicles.length; i++) {
				var vehicle = vehicles[i];
				var correctVehicle = {
					"cid": vehicle.cid,
					"classeVeicolo": vehicle.classe,
					"dataFine": new Date(vehicle.dataFine),
					"dataInizio": new Date(vehicle.dataInizio),
					"id": vehicle.id,
					"tipoVeicolo": vehicle.tipo
				};
				correctVehicles.push(correctVehicle);
			}
			result.veicoli = correctVehicles;
			delete(result.dipendenteVeicoloRef);
			return result;
		},

		_getVehicleClassByDate: function (date) {
			// questa funzione viene chiamata quando sto facendo il duplica e quindi faccio tornare tipoVeicolo e classeVeicolo corretti
			// la data dev'essere in formate date
			var vehicleType, vehicleClass, error;
			var vehicles = this.getModel("userModel").getProperty("/userDetail").veicoli;
			date = new Date(date).setHours(0);
			var vehicle = _.find(vehicles, function (n) {
				return new Date(n.dataInizio).setHours(0) <= date && date <= new Date(n.dataFine).setHours(0);
			});
			if (vehicle) {
				vehicleType = vehicle.tipoVeicolo;
				vehicleClass = vehicle.classeVeicolo;
			} else {
				error = this._getLocalText("vehicleNotPresent");
			}
			var objToReturn = {
				vehicleClass: vehicleClass,
				vehicleType: vehicleType,
				error: error
			};
			return objToReturn;
		},

		_getVehicleClassByDateAndType: function (date, vehicleType) {
			date = new Date(date).setHours(0);
			// questa funzione viene chiamata quando viene selezionato manualmente il tipoVeicolo
			var vehicleClass, error;
			// la data dev'essere in formate date
			var vehicles = this.getModel("userModel").getProperty("/userDetail").veicoli;
			var vehicle = _.find(vehicles, function (n) {
				return new Date(n.dataInizio).setHours(0) <= date && date <= new Date(n.dataFine).setHours(0);
			});
			if (vehicle) {
				if (vehicle.tipoVeicolo === vehicleType) {
					vehicleClass = vehicleType === "A" ? "000" : vehicle.classeVeicolo;
				} else {
					// se tipoVeicolo selezionato è diverso da quello in anagrafica, la classe veicolo sarà "000" così in fase di contabilizzazione tornerà errore e l'amministrazione contatterà l'utente
					vehicleClass = "000";
				}
			} else {
				error = this._getLocalText("vehicleNotPresent");
			}
			var objToReturn = {
				vehicleClass: vehicleClass,
				error: error
			};
			return objToReturn;
		},

		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onShareEmailPress: function () {
			var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
			sap.m.URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},

		/*******************************************/
		/* CUSTOM */
		_getById: function (id) {
			return this.byId(id) ? this.byId(id) : sap.ui.getCore().getElementById(id);
		},

		openDialogBusy: function (text) {
			Busy.show(text);
		},

		closeDialogBusy: function () {
			Busy.hide();
		},

		_getLocalText: function (text) {
			if (this.getModel("i18n")) {
				return this.getModel("i18n").getProperty(text);
			}
			return text;
		},

		_getTimesheet: function (startDate, endDate, dialogCalendarProperty) {
			// chiamata timesheet
			var fSuccess = _.bind(function (result) {
				_.remove(result, function (n) {
					return (!n.timeSheetDataFieldsDetails.recordedHours && n.timeSheetStatus !== "40") || n.timeSheetDataFieldsDetails.workItem ===
						"T120" && !this.getModel(
							"userModel").getProperty("/workingInAdmin");
				}.bind(this));
				var listTimesheet = TimesheetSerializer.fromSapItems(result);
				if (this.rejectionReasonsModel && !_.isEmpty(this.rejectionReasonsModel.getData())) {
					_.forEach(listTimesheet, function (n) {
						if (n.rejectionReasonCode) {
							var rejectedReasonObj = _.find(this.rejectionReasonsModel.getData(), {
								RejectionReason: n.rejectionReasonCode
							});
							if (rejectedReasonObj) {
								n.rejectionReason = rejectedReasonObj.SAP_Description;
							}
						}
					}.bind(this));
				}
				var workLocations = this._getWorkLocations();
				_.forEach(listTimesheet, _.bind(function (tms) {
					var workLocation = _.find(workLocations, {
						workLocation: tms.workLocation
					});
					if (workLocation) {
						tms.workLocDescription = workLocation.workLocationDescription;
					}
				}, this));

				var officeLocations = this._getOfficeDescription();
				_.forEach(listTimesheet, _.bind(function (tms) {
					var officeLocation = _.find(officeLocations, {
						officeKey: tms.officeCode
					});
					if (officeLocation) {
						tms.officeDescription = officeLocation.officeDescription;
					}
				}, this));

				var listWbs = _.union(_.compact(_.map(listTimesheet, "WBS")));
				var propertyToSet = dialogCalendarProperty ? "timesheetDialogCalendar" : "timesheet";
				this.timesheetModel.setProperty("/" + propertyToSet, listTimesheet);
				if (!_.size(result)) {
					this._getPeriods(startDate, endDate, dialogCalendarProperty);
					return;
				}
				var timesheetToWork = dialogCalendarProperty ? this.timesheetModel.getProperty("/timesheetDialogCalendar") : this.timesheetModel
					.getProperty("/timesheet");
				var cloneTimesheet = _.cloneDeep(timesheetToWork);
				_.remove(cloneTimesheet, {
					workItem: ""
				});
				var tempArr = [];
				_.forEach(cloneTimesheet, function (o) {
					tempArr.push({
						wbs: o.WBS,
						workItem: o.workItem
					});
				});
				// assegnazione colori WBS
				var arrayColori = ["#FF0000", "#33FF33", "#FF6600", "#0000FF", "#FFFF33", "#00FFFF", "#CC33CC", "#009966", "#696969", "#FF99FF",
					"#99FFCC", "#FF0066", "#B8860B", "#A52A2A", "#9ACD32", "#FF7F50", "#336699", "#FF1493", "#00BFFF", "#FFE4E1", "#87CEEB",
					"#D8BFD8"
				];
				listWbs = _.uniq(_.map(timesheetToWork, "WBS"));
				var arrayWbsColor = [];
				for (var c = 0; c < _.size(listWbs); c++) {
					arrayWbsColor.push({
						wbsId: listWbs[c],
						color: arrayColori[c]
					});
				}
				StorageService.sessionSave("arrayWbsColor", arrayWbsColor);
				_.forEach(timesheetToWork, _.bind(function (item) {
					var wbsColor = _.find(arrayWbsColor, {
						wbsId: item.WBS
					});
					if (wbsColor) {
						item.color = wbsColor.color;
					}
				}, this));
				this._getPeriods(startDate, endDate, dialogCalendarProperty);
			}, this);

			var fError = _.bind(function () {
				var err = this._getLocalText("errorReadTimesheet");
				this.closeDialogBusy();
				MessageBox.error(err, {
					title: this._getLocalText("oDataError")
				});
			}, this);
			oData.getTimesheet(this._getEmployeeCid(), startDate, endDate, fSuccess, fError);
		},

		_getPeriods: function (startDate, endDate, dialogCalendarProperty, page) {
			var fSuccess = function (result) {
				for (var i = 0; i < result.length; i++) {
					var period = result[i];
					var day = parseInt(period.data.split("-")[0]);
					var month = parseInt(period.data.split("-")[1]) - 1;
					var year = parseInt(period.data.split("-")[2]);
					period.data = new Date(new Date(year, month, day).setHours(12));
					// se l'utente loggato è ADMIN, tutti i periodi devono essere sempre aperti
					if (this.getModel("userModel").getProperty("/workingInAdmin")) {
						for (var j = 0; j < period.validita.length; j++) {
							var validita = period.validita[j];
							validita.aperto = true;
						}
					}
				}
				var propertyToSet = dialogCalendarProperty ? "periodsDialogCalendar" : "periods";
				var periodsModel = this.getView().getModel("periodsModel");
				if (dialogCalendarProperty) {
					var arePeriodsYet = periodsModel.getProperty("/periodsDialogCalendar");
					if (arePeriodsYet && Array.isArray(arePeriodsYet)) {
						// se sono sul calendario per la duplicazione e sto navigando i mesi, voglio un array di tutti i giorni navigati
						result = result.concat(arePeriodsYet);
						// faccio lo uniq nel caso in cui si navighi avanti e indietro
						result = _.uniqBy(result, function (n) {
							return n.data.getTime();
						});
					}
				} else {
					// se non sto leggendo i periodi per il calendario della duplicazione, pulisco l'array dei periodi del calendario
					periodsModel.setProperty("/periodsDialogCalendar", []);
				}
				periodsModel.setProperty("/" + propertyToSet, result);
				this._afterGetPeriods(dialogCalendarProperty);
			}.bind(this);
			var fError = _.bind(function () {
				var err = this._getLocalText("errorReadPeriods");
				this.closeDialogBusy();
				MessageBox.error(err, {
					title: this._getLocalText("oDataError")
				});
			}, this);
			var organizations = this.getModel("userModel").getProperty("/userDetail").persWork;
			oData.getPeriods(this._getEmployeeCid(), startDate, endDate, organizations, fSuccess, fError);
		},

		_getPeriodsByDate: function (date, dialogCalendarProperty) {
			// var selectedOrganization = _.find(this.getModel("userModel").getProperty("/userDetail").persWork, function (n) {
			// 	return new Date(n.startDate).setHours(12) <= date.getTime() && new Date(n.endDate).setHours(12) >= date
			// 		.getTime();
			// }.bind(this));
			var propertyToSet = dialogCalendarProperty ? "periodsDialogCalendar" : "periods";
			var periodsModel = this.getView().getModel("periodsModel");
			// var selectedPeriod = _.find(periodsModel.getProperty("/" + propertyToSet), function (n) {
			// 	return n.data.getTime() === date.getTime() && selectedOrganization && selectedOrganization.societa === n.companyCode;
			// }.bind(this));
			var activity = false;
			var absence = false;
			var expense = false;
			// if (selectedPeriod) {
			// 	var activityPeriod = _.find(selectedPeriod.validita, {
			// 		tipo: "ATTIVITA"
			// 	});
			// 	var absencePeriod = _.find(selectedPeriod.validita, {
			// 		tipo: "ASSENZE"
			// 	});
			// 	var expensesPeriod = _.find(selectedPeriod.validita, {
			// 		tipo: "SPESE"
			// 	});
			// 	activity = activityPeriod.aperto;
			// 	absence = absencePeriod.aperto;
			// 	expense = expensesPeriod.aperto;
			// }
			var periodsByDate = {
				activity: activity,
				absence: absence,
				expense: expense
			};
			return periodsByDate;
		},

		// funzione che calcola i giorni festivi italiani
		_calcolaArrayFestivita: function (annoAttuale) {
			var easterDay = CalcoloPasqua.calcolaPasqua(annoAttuale);
			var italianFestivities = {
				"01": ["01","06"],
				"03": [],
				"04": ["25"],
				"05": ["01"],
				"06": ["02"],
				"08": ["15"],
				"11": ["01"],
				"12": ["08", "25", "26"]
			};
			var easterMonday;
			if (easterDay[0] === 31 && easterDay[1] === "03") {
				italianFestivities["04"].push("01");
			} else {
				easterMonday = (easterDay[0] + 1).toString();
				if (easterMonday.length < 2) {
					easterMonday = "0" + easterMonday;
				}
				italianFestivities[easterDay[1]].push(easterMonday);
			}
			return italianFestivities;
		},

		_getWorkLocations: function () {
			var workLocations = [{
				workLocation: "1",
				workLocationDescription: this._getLocalText("customer")
			}, {
				workLocation: "2",
				workLocationDescription: this._getLocalText("office")
			}, {
				workLocation: "3",
				workLocationDescription: this._getLocalText("home")
			}];
			workLocations = _.sortBy(workLocations, "workLocationDescription");
			return workLocations;
		},

		_getOfficeDescription: function (escludeVisible) {
			var workOffices = [{
				officeKey: "010",
				officeDescription: "Treviso",
				visible: true
			}, {
				officeKey: "020",
				officeDescription: "Padova",
				visible: true
			}, {
				officeKey: "030",
				officeDescription: "Bologna",
				visible: true
			}, {
				officeKey: "040",
				officeDescription: "Bologna 2",
				visible: true
			}, {
				officeKey: "050",
				officeDescription: "Milano",
				visible: true
			}, {
				officeKey: "060",
				officeDescription: "Firenze",
				visible: true
			}, {
				officeKey: "070",
				officeDescription: "Pisa",
				visible: true
			}, {
				officeKey: "080",
				officeDescription: "Roma",
				visible: true
			}, {
				officeKey: "090",
				officeDescription: "Perugia",
				visible: true
			}];
			workOffices = _.sortBy(workOffices, "officeDescription");
			if (escludeVisible) {
				_.remove(workOffices, {
					visible: false
				});
			}
			return workOffices;
		},

		_openMessageBoxError: function (error) {
			var msgText = "";
			if (error && error.responseJSON) {
				msgText = error.responseJSON.error;
			} else if (error && error.responseText) {
				if (typeof (error.responseText) === "string") {
					msgText = error.responseText;
				} else {
					var responseText = JSON.parse(error.responseText);
					if (responseText.error) {
						msgText = responseText.error;
					} else {
						msgText = responseText.errorCode + ": " + responseText.status;
					}
				}
			} else if (error && error.response && error.response.body && JSON.parse(error.response.body).error && JSON.parse(error.response.body)
				.error.message) {
				msgText = JSON.parse(error.response.body).error.message.value;
			} else {
				msgText = "Generic error";
			}
			MessageBox.error(msgText);
		},

		_checkWrongPlaceTs: function (timesheet) {
			// "T010" = da cliente --> dovrei essere da cliente ("1")
			// "T020" = da ufficio --> non dovrei essere dal cliente ("1")
			var wrongPlace = false;
			if (timesheet.workItem === "T010" && timesheet.workLocation !== "1" || timesheet.workItem === "T020" && timesheet.workLocation ===
				"1") {
				wrongPlace = true;
			}
			return wrongPlace;
		},

		_removeFocus: function () {
			$(":focus").blur();
		}
	});
});