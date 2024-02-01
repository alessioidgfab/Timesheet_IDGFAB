sap.ui.define([
		"../model/StorageService",
		"../Component"
	],
	function (StorageService, Component) {
		"use strict";
		/*globals _:false */
		/*eslint linebreak-style:0*/
		return {
            view: undefined,
            
			getOdataModel: function (service) {
				//var _serviceUrl = "/S4HC-TST/sap/opu/odata/sap/" + service;
				var _serviceUrl = service;
				return new sap.ui.model.odata.ODataModel(_serviceUrl, true);
			},

			getOdataModelTravel: function () {
				var _serviceUrl = "../localService/odata.xsodata/metadata.xml";
				return new sap.ui.model.odata.ODataModel(_serviceUrl, true);
			},

			getHanaServicesUrl: function (service) {
				var _serviceUrl = Component.getMetadata().getManifestEntry("sap.app").dataSources["HanaServices"].uri;
				return _serviceUrl + service + ".xsjs";
			},

			getUserInfo: function (success, error) {
				//var url = "../../services/userapi/currentUser"; maps a default set of attributes
                //var url = "../../services/userapi/attributes";
                /* var url = "/services/userapi/attributes";
                //$.get(url, success).fail(error);
                $.ajax({
					url:url, 
                    type:"GET", 
                    success: success, 
                    error: error
                }); */
				var url = "/userapi/attributes";
				this.getTimeServices(url, "", success, error);
			},

			logout: function (success, error) {
				//var url = "../../services/userapi/logout";
				//var url = "/S4HC-TST/sap/public/bc/icf/logoff?sap-client=100";
				var url = "https://authn.hana.ondemand.com/saml2/sp/slo/a50f44485/a50f44485";
				$.post(url, success).fail(error);
			},

			/* CHIAMATE JAVA */
			/* EXAMPLE: url:'/api/v1/rest/client/' params: 'employment-merge/id' id->CID */
			getJavaServices: function (url, params, success, error) {
				$.ajax({
					//url: "/S4HCNEO-TST" + url + params,
					url: "../time" + url + params,
					type: "GET",
					success: success,
					error: error,
					async: true,
					contentType: "application/json; charset=utf-8"
				});
			},

			getTimeServices: function (url, params, success, error) {
				$.ajax({
					url: "../time" + url + params,
					type: "GET",
					success: success,
					error: error,
					async: true,
					contentType: "application/json; charset=utf-8"
				});
			},

			postTimeServices: function (url, data, success, error) {
				$.ajax({
					url: "../time" + url,
					type: "POST",
					success: success,
					error: error,
					async: true,
					data: JSON.stringify(data),
					dataType: "json",
					contentType: "application/json; charset=utf-8"
				});
			},

			deleteTimeServices: function (url, params, success, error) {
				$.ajax({
					url: "../time" + url + params,
					type: "DELETE",
					success: success,
					error: error,
					async: true,
					contentType: "application/json; charset=utf-8"
				});
			},

			getTimeTravelServices: function (url, params, success, error) {
				var serviceUrl = '/HANA-TST/FTRNEODB/odata/odata.xsodata/' + ((url.startsWith('/')) ? url.substr(1) : url);
				this.getTimeServices(serviceUrl, params, success, error);
			},

			postTimeTravelServices: function (url, data, success, error) {
				var serviceUrl = '/HANA-TST/FTRNEODB/odata/odata.xsodata/' + ((url.startsWith('/')) ? url.substr(1) : url);
				this.postTimeServices(serviceUrl, data, success, error);
			},

			deleteTimeTravelServices: function (url, params, success, error) {
				var serviceUrl = '/HANA-TST/FTRNEODB/odata/odata.xsodata/' + ((url.startsWith('/')) ? url.substr(1) : url);
				this.deleteTimeServices(serviceUrl, params, success, error);
			},

			putJavaServices: function (url, data, success, error) {
				$.ajax({
					url: "/S4HCNEO-TST" + url,
					type: "PUT",
					data: JSON.stringify(data),
					dataType: "json",
					success: success,
					error: error,
					async: true,
					contentType: "application/json; charset=utf-8"
				});
			},

			postJavaServices: function (url, data, success, error) {
				$.ajax({
					url: "/S4HCNEO-TST" + url,
					type: "POST",
					data: JSON.stringify(data),
					dataType: "json",
					success: success,
					error: error,
					async: true,
					contentType: "application/json; charset=utf-8"
				});
			},

			getEmploymentData: function (id, success, error) {
				// this.getJavaServices("/api/v1/rest/client/employment-data/", id, success, error);
				this.getTimeServices("/client/employment-data/", id, success, error);
			},
			/**/

			getTimesheet: function (employeeId, startDate, endDate, success, error) {
				var role = StorageService.sessionGet("userInfo").userDetail.tipoUtente;
				this.getTimeServices("/client/employment-timesheet-one/", employeeId + "?startDate=" + startDate + "&endDate=" + endDate +
                    "&role=" + role, success, error);
                /*var url = "/api/v1/rest/client/employment-timesheet-one/"+ employeeId + "?startDate=" + startDate + "&endDate=" + endDate + "&role=" + role;
                $.ajax({
                    url:url, 
                    type:"GET", 
                    success: success, 
                    error: error
                });*/
			},

			getTimesheetById: function (employeeId, idRecord, success, error) {
				var role = StorageService.sessionGet("userInfo").userDetail.tipoUtente;
				this.getTimeServices("/client/employment-timesheet-one/", employeeId + "?timesheetId=" + idRecord + "&role=" + role,
					success,
					error);
			},

			getRejectionReasons: function (success, error) {
				var modelName = "tmsrej";
				var url = "/localService/tmsrej/metadata.xml";
				this.getTimeServices(url, "", success, error);
			},

			createTransfer: function (param, success, error) {
				var url = "/TrasfertaSet";
				this.postTimeTravelServices(url, param, success, error);
			},

			updateTransfer: function (id, transfer, success, error) {
				var url = "/api/v1/hana/TrasfertaSet/" + id;
				this.putJavaServices(url, transfer, success, error);
			},

			deleteTransfer: function (id, success, error) {
				var url = "/TrasfertaSet/";
				this.deleteTimeTravelServices(url, id, success, error);
			},

			createExpense: function (expense, success, error) {
				var url = "/NotaSpeseSet";
				this.postTimeTravelServices(url, expense, success, error);
			},

			deleteExpense: function (id, success, error) {
				var url = "/NotaSpeseSet/";
				this.deleteTimeTravelServices(url, id, success, error);
			},

			updateExpense: function (expense, success, error) {
				var service = "updateNotaSpese";
				var url = this.getHanaServicesUrl(service);
				$.ajax({
					url: url,
					type: "POST",
					data: JSON.stringify(expense),
					success: success,
					error: error,
					async: true,
					contentType: "application/json; charset=utf-8"
				});
			},

			getAllEmployees: function (organizations, success, error) {
				var params = "";
				if (organizations.length > 0) {
					params = "?orgs=";
					for (var i = 0; i < organizations.length; i++) {
						params += organizations[i];
						if (i !== organizations.length - 1) {
							params += ",";
						}
					}
				}
				this.getTimeServices("/client/employment-list", params, success, error);
			},

			getExpensesTypes: function (success, error) {
				var url = "TipoSpesaSet";
				this.getTimeTravelServices(url, "", success, error);
			},

			getPeriodicWbs: function (id, startDate, endDate, success, error) {
				var params = id + "?startDate=" + startDate + "&endDate=" + endDate;
				this.getTimeServices("/client/employment-wbs/", params, success, error);
			},

			saveTs: function (timesheet, success, error) {
				var url = "../API_MANAGE_WORKFORCE_TIMESHEET/TimeSheetEntryCollection";
				this.postTimeServices(url, timesheet, success, error);
			},

			saveTransfers: function (objToSave, success, error) {
				var service = "creazioneTrasfertaSpese";
				var url = this.getHanaServicesUrl(service);
				$.ajax({
					url: url,
					type: "POST",
					data: JSON.stringify(objToSave),
					success: success,
					error: error,
					async: true,
					contentType: "application/json; charset=utf-8"
				});
			},

			getAbsenceTypes: function (success, error) {
				var url = "/YY1_ABSENCE_CDS/YY1_ABSENCE";
				this.getTimeServices(url, "", success, error);
			},

			getPeriods: function (cid, startDate, endDate, organizations, success, error) {
				var url = "/client/period-status/" + cid;
				var companies = "";
				for (var i = 0; i < organizations.length; i++) {
					companies += organizations[i].companyCode;
					if (i !== organizations.length - 1) {
						companies += ",";
					}
				}
				var params = "?startDate=" + startDate + "&endDate=" + endDate + "&companies=" + companies;
				this.getTimeServices(url, params, success, error);
			},
			
			printData: function (dataToJsonSend, success, error) {
				var url = "/api/v1/hana/ReportSet";
				this.postJavaServices(url, dataToJsonSend, success, error);
			},
			
			getOvertime: function (success, error) {
				var modelName = "overtime";
				var url = "/localService/overtime/metadata.xml";
				this.getTimeServices(url, "", success, error);
            }
		};
	});