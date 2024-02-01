sap.ui.define([
	"../model/formatter",
	"../model/StorageService"
], function (formatter, StorageService) {
	"use strict";
	/*eslint complexity: ["error", 2]*/
	/*eslint linebreak-style:0*/
	return {
		fromSapItems: function (sapItems) {
			var results = [];
			if (sapItems && sapItems.length) {
				for (var i = 0; i < sapItems.length; i++) {
					results.push(this.fromSap(sapItems[i]));
				}
			}
			return results;
		},

		fromSap: function (ts) {
			var p = {};
			p.workDate = ts.timeSheetDate ? formatter.formatDate(ts.timeSheetDate) : "";
			p.statusId = ts.timeSheetStatus ? ts.timeSheetStatus : "";
			p.timeSheetIsReleasedOnSave = ts.timeSheetIsReleasedOnSave ? ts.timeSheetIsReleasedOnSave : "";
			p.cid = ts.personWorkAgreementExternalID ? ts.personWorkAgreementExternalID : "";
			p.company = ts.companyCode ? ts.companyCode : "";
			p.timeSheetRecord = ts.timeSheetRecord ? ts.timeSheetRecord : "";
			p.timeSheetPredecessorRecord = ts.timeSheetPredecessorRecord ? ts.timeSheetPredecessorRecord : "";
			p.workHours = ts.timeSheetDataFieldsDetails.recordedHours ? parseFloat(ts.timeSheetDataFieldsDetails.recordedHours).toFixed(
				2) : "";
			p.workHoursUM = ts.timeSheetDataFieldsDetails.hoursUnitOfMeasure ? ts.timeSheetDataFieldsDetails.hoursUnitOfMeasure : "";
			var wbs = ts.timeSheetDataFieldsDetails.wbsElement ? ts.timeSheetDataFieldsDetails.wbsElement : "";
			if (wbs) {
				wbs = wbs.replace('??', '°').replace('??', '°');
			}
			p.WBS = wbs;
			p.descriptionWbs = ts.timeSheetDataFieldsDetails.wbsDescription;
			p.purchaseOrder = ts.timeSheetDataFieldsDetails.purchaseOrder ? ts.timeSheetDataFieldsDetails.purchaseOrder : "";
			p.purchaseOrderItem = ts.timeSheetDataFieldsDetails.purchaseOrderItem ? ts.timeSheetDataFieldsDetails.purchaseOrderItem : "";
			p.rejectionReasonCode = ts.timeSheetDataFieldsDetails.rejectionReason ? ts.timeSheetDataFieldsDetails.rejectionReason : "";
			p.rejectionReason = "";
			p.notes = ts.timeSheetDataFieldsDetails.timeSheetNote ? ts.timeSheetDataFieldsDetails.timeSheetNote : "";
			p.transfer = ts.trasfertaHanaDetails ? ts.trasfertaHanaDetails : "";
			p.expenses = ts.trasfertaHanaDetails ? (ts.trasfertaHanaDetails.notaSpeseRef ? ts.trasfertaHanaDetails.notaSpeseRef.results : []) : [];
			p.billingControlCategory = ts.timeSheetDataFieldsDetails.billingControlCategory ? ts.timeSheetDataFieldsDetails.billingControlCategory :
				"";
			p.officeCode = ts.officeCode ? ts.officeCode : "";
			p.officeDescription = sap.officeDescription ? ts.officeDescription : "";
			p.workLocDescription = ts.workLocDescription ? ts.workLocDescription : "";
			p.workLocation = ts.workLocCode ? ts.workLocCode : "";
			p.absenceCode = ts.absenceCode ? ts.absenceCode : "";
			p.absenceDescription = ts.absenceDescription ? ts.absenceDescription : "";
			p.workItem = ts.timeSheetDataFieldsDetails.workItem ? ts.timeSheetDataFieldsDetails.workItem : "";
			p.descriptionWorkItem = ts.timeSheetDataFieldsDetails.workItemDescription;
			p.activityId = ts.timeSheetDataFieldsDetails.activityType ? ts.timeSheetDataFieldsDetails.activityType : "";
			p.descriptionActivity = ts.timeSheetDataFieldsDetails.activityTypeDescription;
			p.selected = false;
			p.descriptionProject = ts.timeSheetDataFieldsDetails.projectDescription;
			
			p.overtimeCategory = ts.timeSheetDataFieldsDetails.timeSheetOvertimeCategory;
			p.overtimeDescription = p.overtimeCategory ? _.find(StorageService.sessionGet("overtime"), {
				Language: sap.ui.getCore().getConfiguration().getLanguage(),
				TimeSheetOvertimeCategory: p.overtimeCategory
			}).TimeSheetOvertimeCategoryText : "";
			return p;
		},

		toSap: function (item) {
			var sapItem = {};
			sapItem.TimeSheetDataFields = {
				ActivityType: item.activityId,
				WBSElement: item.WBS ? item.WBS : item.activity ? item.activity : "",
				TimeSheetNote: item.notes ? item.notes : item.note ? item.note : "",
				RecordedHours: parseInt(item.workMinutes) ? parseFloat(parseInt(item.workHours) + ".50").toString() : parseInt(item.workHours).toString(),
				WorkItem: item.workItem ? item.workItem : "",
				BillingControlCategory: item.billingControlCategory ? item.billingControlCategory : "",
				TimeSheetOvertimeCategory: item.overtimeCategory ? item.overtimeCategory : ""
			};
			if (item.purchaseOrder) {
				sapItem.TimeSheetDataFields.PurchaseOrder = item.purchaseOrder;
				sapItem.TimeSheetDataFields.PurchaseOrderItem = item.purchaseOrderItem;
			}
			sapItem.TimeSheetPredecessorRecord = item.timeSheetPredecessorRecord ? item.timeSheetPredecessorRecord : "";
			sapItem.PersonWorkAgreementExternalID = item.cid;
			sapItem.CompanyCode = item.company;
			sapItem.TimeSheetStatus = item.status ? item.status : item.statusId ? item.statusId : "10";
			if (item.timeSheetIsReleasedOnSave) {
				sapItem.TimeSheetIsReleasedOnSave = item.timeSheetIsReleasedOnSave;
			}
			sapItem.TimeSheetDate = formatter.stringDateToSapDate(item.workDate);
			sapItem.TimeSheetOperation = item.operation;
			sapItem.YY1_TMSWrkAbsence_TIM = item.absenceCode ? item.absenceCode : "";
			sapItem.YY1_TMSWorkLoc_TIM = item.workLocation ? item.workLocation : "";
			sapItem.YY1_TMSOffice_TIM = item.officeCode ? item.officeCode : "";
			if (item.operation !== "C") {
				sapItem.TimeSheetRecord = item.timeSheetRecord;
				sapItem.YY1_TMSCounterFlow_TIM = item.timeSheetRecord;
			}
			return sapItem;
		}
	}
});