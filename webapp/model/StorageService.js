sap.ui.define([
	"../model/StorageService",
	"../libs/sjcl"
], function(storageServ, sjcl) {
	"use strict";

	return {
		_key: "asd",
		_namespace: "EKR", //ICM.s
		_save: function(storage, property, value) {
			storage.setItem(this._namespace + '.' + property, this._utoa(JSON.stringify(value)));
		},
		_get: function(storage, property) {
			var objString = storage.getItem(this._namespace + '.' + property);
			return JSON.parse(this._atou(objString));
		},
		_remove: function(storage, property) {
			storage.removeItem(this._namespace + '.' + property);
		},
		_clear: function(storage) {
			for (var i = 0, len = storage.length; i < len; i++) {
				var key = storage.key(i);
				if (key && key.indexOf(this._namespace) !== -1) {
					this._remove(storage, key.replace(this._namespace, "").substring(1, key.replace(this._namespace, "").length));
					i = i - 1;
				}
			}
		},

		/* SESSION */
		sessionSave: function(property, value) {
			this._save(sessionStorage, property, value);
		},

		sessionGet: function(property) {
			return this._get(sessionStorage, property);
		},

		sessionRemove: function(property) {
			this._remove(sessionStorage, property);
		},

		sessionClear: function() {
			this._clear(sessionStorage);
		},

		/* LOCAL */
		localSave: function(property, value) {
			this._save(localStorage, property, value);
		},

		localGet: function(property) {
			return this._get(localStorage, property);
		},

		localRemove: function(property) {
			this._remove(localStorage, property);
		},

		localClear: function() {
			this._clear(localStorage);
		},

		_encrypt: function(str) {
			if (str) {
				return sjcl.encrypt(this._key, str);
			} else {
				return null;
			}
		},
		_decrypt: function(str) {
			if (str) {
				return sjcl.decrypt(this._key, str);
			} else {
				return null;
			}
		},

		_utoa: function(str) {
			if (str) {
				//ucs-2 string to base64 encoded ascii
				return window.btoa(unescape(encodeURIComponent(str)));
				//string to base64
				//return window.btoa(str);
			} else {
				return null;
			}
		},
		/**
		 * base64 to String
		 */
		_atou: function(str) {
			if (str) {
				//base64 encoded ascii to ucs-2 string
				return decodeURIComponent(escape(window.atob(str)));
				//base64 to String
				//return window.atob(str);
			} else {
				return null;
			}
		}

	}
});