sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
], function (MockServer, JSONModel, UriParameters, Log) {
    "use strict";

    var aMockServers = [],
        _sAppPath = "timesheetproject2/",
        _sJsonFilesPath = _sAppPath + "localService/";

    var oMockServerInterface = {

        /**
         * Initializes the mock server asynchronously.
         * You can configure the delay with the URL parameter "serverDelay".
         * The local mock data in this folder is returned instead of the real data for testing.
         * @protected
         * @param {object} [oOptionsParameter] init parameters for the mockserver
         * @returns{Promise} a promise that is resolved when the mock server has been started
         */
        init: function (oOptionsParameter) {
            var oOptions = oOptionsParameter || {};

            return new Promise(function (fnResolve, fnReject) {
                var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                    oManifestModel = new JSONModel(sManifestUrl);

                oManifestModel.attachRequestCompleted(function () {
                    var oUriParameters = new UriParameters(window.location.href),
                        // parse manifest for local metatadata URI
                        sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                    var oData = oManifestModel.getData();
                    var serviceList = Object.values(oData["sap.app"].dataSources);

                    for (var i = 0; i < serviceList.length; i++) {
                        var oMainDataSource = serviceList[i];

                        if (oMainDataSource.type === "OData") {
                            var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri),
                                // ensure there is a trailing slash
                                sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";
                            // ensure the URL to be relative to the application
                            sMockServerUrl = sMockServerUrl && new URI(sMockServerUrl).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                            // create a mock server instance or stop the existing one to reinitialize
                            if (!aMockServers[oMainDataSource.uri]) {
                                aMockServers[oMainDataSource.uri] = new MockServer({
                                    rootUri: sMockServerUrl
                                });
                            } else {
                                aMockServers[oMainDataSource.uri].stop();
                            }

                            // configure mock server with the given options or a default delay of 0.5s
                            MockServer.config({
                                autoRespond: true,
                                autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                            });

                            // simulate all requests using mock data
                            // aMockServers[oMainDataSource.uri].simulate(sMetadataUrl, {
                            //     sMockdataBaseUrl: sJsonFilesUrl,
                            //     bGenerateMissingMockData: true
                            // });

                            var aRequests = aMockServers[oMainDataSource.uri].getRequests();

                            // compose an error response for each request
                            var fnResponse = function (iErrCode, sMessage, aRequest) {
                                aRequest.response = function (oXhr) {
                                    oXhr.respond(iErrCode, {
                                        "Content-Type": "text/plain;charset=utf-8"
                                    }, sMessage);
                                };
                            };

                            // simulate metadata errors
                            if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                                aRequests.forEach(function (aEntry) {
                                    if (aEntry.path.toString().indexOf("$metadata") > -1) {
                                        fnResponse(500, "metadata Error", aEntry);
                                    }
                                });
                            }

                            // simulate request errors
                            var sErrorParam = oOptions.errorType || oUriParameters.get("errorType"),
                                iErrorCode = sErrorParam === "badRequest" ? 400 : 500;
                            if (sErrorParam) {
                                aRequests.forEach(function (aEntry) {
                                    fnResponse(iErrorCode, sErrorParam, aEntry);
                                });
                            }

                            // custom mock behaviour may be added here
                            // custom mock behaviour may be added here
                            aMockServers[oMainDataSource.uri].attachBefore("GET", function (oEvent) {
                                console.log(oEvent); // eslint-disable-line
                            });
                            aMockServers[oMainDataSource.uri].attachBefore("POST", function (oEvent) {
                                console.log(oEvent); // eslint-disable-line
                            });
                            // set requests and start the server
                            aMockServers[oMainDataSource.uri].setRequests(aRequests);
                            aMockServers[oMainDataSource.uri].start();
                        }
                    }

                    //mock per restapi
                    var oTimesheet = {
                        method: "GET",
                        path: new RegExp("api/v1/rest/client/employment-timesheet-one/(.*)\?startDate=(.*)&endDate=(.*)&role=(.*)"),
                        response: function (oXhr, userID, startDate, endDate, role) {
                            var fSuccess = _.bind(function (oXhr, startDate, endDate, data) {
                                var res = _.filter(data, function(d) {
                                    var tsDate = Date.parse(d.timeSheetDate);
                                    return tsDate >= startDate && tsDate <= endDate;
                                });
                                oXhr.respondJSON(200, {}, JSON.stringify(res));
                            }, this, oXhr, Date.parse(startDate.split("T")[0]), Date.parse(endDate));

                            if (userID.endsWith("?")) {
                                userID = userID.substring(0, userID.length - 1);
                            }
                            
                            $.ajax({
                                async: false,
                                dataType: "json",
                                url: sap.ui.require.toUrl(_sJsonFilesPath + "/employment-timesheet-one/" + userID + ".json"),
                                success: fSuccess
                            });
                            //oXhr.respondJSON(200, {}, JSON.stringify({a: 'test'}));
                            //return true;
                        }
                    }
                    var oPeriodStatus = {
                        method: "GET",
                        path: new RegExp("api/v1/rest/client/period-status/(.*)\?startDate=(.*)&endDate=(.*)&companies=(.*)"),
                        response: function (oXhr, userID, startDate, endDate, companies) {
                            var fSuccess = _.bind(function (oXhr, startDate, endDate, data) {
                                var res = _.filter(data, function(d) {
                                    var psDate = Date.parse(d.data.split("-").reverse().join("-") + "T12:00:00.000");
                                    return psDate >= startDate && psDate <= endDate;
                                });
                                oXhr.respondJSON(200, {}, JSON.stringify(res));
                            }, this, oXhr, Date.parse(startDate), Date.parse(endDate));

                            if (userID.endsWith("?")) {
                                userID = userID.substring(0, userID.length - 1);
                            }
                            
                            $.ajax({
                                async: false,
                                dataType: "json",
                                url: sap.ui.require.toUrl(_sJsonFilesPath + "/period-status/" + userID + ".json"),
                                success: fSuccess
                            });
                            //oXhr.respondJSON(200, {}, JSON.stringify({a: 'test'}));
                            //return true;
                        }
                    }
                    var oEmploymentData = {
                        method: "GET",
                        path: new RegExp("api/v1/rest/client/employment-data/(.*)"),
                        response: function (oXhr, user) {
                            var fSuccess = _.bind(function (oXhr, data) {
                                oXhr.respondJSON(200, {}, JSON.stringify(data));
                            }, this, oXhr);
                            
                            $.ajax({
                                async: false,
                                dataType: "json",
                                url: sap.ui.require.toUrl(_sJsonFilesPath + "/" + user + ".json"),
                                success: fSuccess
                            });
                        }
                    }
                    var oPeriodicWbs = {
                        method: "GET",
                        path: new RegExp("api/v1/rest/client/employment-wbs/(.*)\?startDate=(.*)&endDate=(.*)"),
                        response: function (oXhr, user, startDate, endDate) {
                            var fSuccess = _.bind(function (oXhr, startDate, endDate, data) {
                                //Questo servizio ha un filtro per date, ma gli unici campi data non sembrano rispettare il filtro nei risultati
                                //Dato che ogni mese vengono i dati presenti sono gli stessi, a parte qualche mese che ne ha di meno o di più,
                                //ho deciso di prendere il mese con più dati ed utilizzare quello come base senza filtrarlo
                                oXhr.respondJSON(200, {}, JSON.stringify(data));
                            }, this, oXhr, Date.parse(startDate), Date.parse(endDate));

                            if (user.endsWith("?")) {
                                user = user.substring(0, user.length - 1);
                            }
                            
                            $.ajax({
                                async: false,
                                dataType: "json",
                                url: sap.ui.require.toUrl(_sJsonFilesPath + "/employment-wbs/" + user + ".json"),
                                success: fSuccess
                            });
                        }
                    }
                    var oEmpty = {
                        method: "GET",
                        path: new RegExp(""),
                        response: function (oXhr) {
                            oXhr.respondJSON(200, {}, JSON.stringify({a: 'test'}));
                            return true;
                        }
                    }
                    var oMockServerRest = new MockServer({
                        rootUri: "/S4HCNEO-TST/",
                        requests: [oTimesheet, oPeriodStatus, oEmploymentData, oPeriodicWbs, oEmpty]
                    });
                    //start the mockserver
                    oMockServerRest.start();
                    
                    var oAttributes = {
                        method: "GET",
                        path: "attributes",
                        response: function (oXhr) {
                           var fSuccess = _.bind(function (oXhr, data) {
                                oXhr.respondJSON(200, {}, JSON.stringify(data));
                            }, this, oXhr);
                            
                            $.ajax({
                                async: false,
                                dataType: "json",
                                url: sap.ui.require.toUrl(_sJsonFilesPath + "/attributes.json"),
                                success: fSuccess
                            });
                        }
                    }
                    var oMockServerUserapi = new MockServer({
                        rootUri: "/services/userapi/",
                        requests: [oAttributes]
                    });
                    oMockServerUserapi.start();

                    Log.info("Running the app with mock data");
                    fnResolve();
                });

                oManifestModel.attachRequestFailed(function () {
                    var sError = "Failed to load application manifest";

                    Log.error(sError);
                    fnReject(new Error(sError));
                });
            });
        },

        /**
         * @public returns the mockserver of the app, should be used in integration tests
         * @param {string} id the name of the related dataset 
         * @returns {sap.ui.core.util.MockServer} the mockserver instance
         */
        getMockServer: function (id) {
            return aMockServers[id];
        }
    };

    return oMockServerInterface;
});