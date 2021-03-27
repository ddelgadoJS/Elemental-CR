(function (window) {
	"use strict";

	var publicPath = "https://bookingcommerce.com";

	// var shopifyPath = "https://karan.webkul.com/shopify-booking-app/web";
	var shopifyPath = document.currentScript.src.split('/shopify-widget')[0];
	var _this = this;
	var _document = document;

	var BookingConfigurationType = {
		DayDate: "day_date_slots",
		DayDateTime: "time_slots",

		RangeDate: "range_date_slots",
		RangeDateTime: "rent_slots",

		FixedDate: "day_slots",
		FixedDateTime: "fixed_datetime_slots",

		TimeSlot: "time_slots",
		DaySlot: "day_slots",
		RentSlots: "rent_slots"
	};

	BookingConfigurationType.FixedType = [
		BookingConfigurationType.FixedDate,
		BookingConfigurationType.FixedDateTime
	];
	BookingConfigurationType.rangeType = [
		BookingConfigurationType.RangeDate,
		BookingConfigurationType.RangeDateTime
	];
	BookingConfigurationType.DayType = [
		BookingConfigurationType.RangeDate,
		BookingConfigurationType.DayDate
	];
	BookingConfigurationType.DayDateType = [
		BookingConfigurationType.DayDate,
		BookingConfigurationType.DayDateTime
	];

	function beWidget(options) {
		_this = this;
		_this.nExtend(this.options, options);
		_this.init();
		_this.addBrandColor();
	}

	function nInbuilt() {
		return _this.inbuilt;
	}

	function validation() {
		return _this.validation;
	}

	// querySelector, jQuery style
	beWidget.prototype.$ = function (selector) {
		return _document.querySelector(selector);
	};

	beWidget.prototype.models = {
		company: null,
		bookingProductList: null,
		bookingProduct: null,
		slotsData: null,
		completedStep: 0,
		selectedSlot: null,
		hash: null,
		cardInformation: {},
		loaderCount: 0,
		reviewList: null,
		fields: {
			slot: {
				timezone: {
					type: "select",
					label: "Timezone",
					value: "",
					isRequired: true,
					options: [{
						label: "Select Timezone",
						value: ""
					}],
					validations: ["isEmpty"]
				},
				"wk-datepicker-input": {
					type: "text",
					label: "Search Slots",
					value: "",
					isRequired: true,
					validations: ["isEmpty"]
				},
				timestamp: {
					type: "select",
					label: "Time Slot",
					value: "",
					options: [{
						label: "Select Time Slot",
						value: ""
					}],
					validations: ["isEmpty"]
				},
				"wk-datepicker-2-input": {
					type: "text",
					label: "Search Slots",
					value: "",
					isRequired: true,
					validations: ["isEmpty"]
				},
				tstamp: {
					type: "select",
					label: "Time Slot",
					value: "",
					options: [{
						label: "Select Time Slot",
						value: ""
					}],
					validations: ["isEmpty"]
				},
				guests: {
					type: "number",
					label: "Number of Guests",
					value: 1,
					isRequired: true,
					shouldLessThanOrEqualValue: 1,
					shouldGreaterThanOrEqualValue: 1,
					validations: ["isEmpty", "invalidNumber", "greaterThanZero", "shouldLessThanOrEqualValue", "shouldGreaterThanOrEqualValue"]
				},
				customerFields: {}
			},
			personalInfo: {
				// name: {
				// 	type: "text",
				// 	label: "Name",
				// 	value: "",
				// 	isRequired: true,
				// 	validations: ["isEmpty"]
				// },
				// email: {
				// 	type: "text",
				// 	label: "Email",
				// 	value: "",
				// 	isRequired: true,
				// 	validations: ["isEmpty", "invalidEmail"]
				// },
				// phone: {
				// 	type: "text",
				// 	label: "Phone",
				// 	value: "",
				// 	isRequired: false,
				// 	validations: ["invalidNumber"]
				// },

			}
		},
		currencySymbols: {
			AED: "&#1583;.&#1573;", // ?
			AFN: "&#65;&#102;",
			ALL: "&#76;&#101;&#107;",
			AMD: "",
			ANG: "&#402;",
			AOA: "&#75;&#122;", // ?
			ARS: "&#36;",
			AUD: "&#36;",
			AWG: "&#402;",
			AZN: "&#1084;&#1072;&#1085;",
			BAM: "&#75;&#77;",
			BBD: "&#36;",
			BDT: "&#2547;", // ?
			BGN: "&#1083;&#1074;",
			BHD: ".&#1583;.&#1576;", // ?
			BIF: "&#70;&#66;&#117;", // ?
			BMD: "&#36;",
			BND: "&#36;",
			BOB: "&#36;&#98;",
			BRL: "&#82;&#36;",
			BSD: "&#36;",
			BTN: "&#78;&#117;&#46;", // ?
			BWP: "&#80;",
			BYR: "&#112;&#46;",
			BZD: "&#66;&#90;&#36;",
			CAD: "&#36;",
			CDF: "&#70;&#67;",
			CHF: "&#67;&#72;&#70;",
			CLF: "", // ?
			CLP: "&#36;",
			CNY: "&#165;",
			COP: "&#36;",
			CRC: "&#8353;",
			CUP: "&#8396;",
			CVE: "&#36;", // ?
			CZK: "&#75;&#269;",
			DJF: "&#70;&#100;&#106;", // ?
			DKK: "&#107;&#114;",
			DOP: "&#82;&#68;&#36;",
			DZD: "&#1583;&#1580;", // ?
			EGP: "&#163;",
			ETB: "&#66;&#114;",
			EUR: "&#8364;",
			FJD: "&#36;",
			FKP: "&#163;",
			GBP: "&#163;",
			GEL: "&#4314;", // ?
			GHS: "&#162;",
			GIP: "&#163;",
			GMD: "&#68;", // ?
			GNF: "&#70;&#71;", // ?
			GTQ: "&#81;",
			GYD: "&#36;",
			HKD: "&#36;",
			HNL: "&#76;",
			HRK: "&#107;&#110;",
			HTG: "&#71;", // ?
			HUF: "&#70;&#116;",
			IDR: "&#82;&#112;",
			ILS: "&#8362;",
			INR: "&#8377;",
			IQD: "&#1593;.&#1583;", // ?
			IRR: "&#65020;",
			ISK: "&#107;&#114;",
			JEP: "&#163;",
			JMD: "&#74;&#36;",
			JOD: "&#74;&#68;", // ?
			JPY: "&#165;",
			KES: "&#75;&#83;&#104;", // ?
			KGS: "&#1083;&#1074;",
			KHR: "&#6107;",
			KMF: "&#67;&#70;", // ?
			KPW: "&#8361;",
			KRW: "&#8361;",
			KWD: "&#1583;.&#1603;", // ?
			KYD: "&#36;",
			KZT: "&#1083;&#1074;",
			LAK: "&#8365;",
			LBP: "&#163;",
			LKR: "&#8360;",
			LRD: "&#36;",
			LSL: "&#76;", // ?
			LTL: "&#76;&#116;",
			LVL: "&#76;&#115;",
			LYD: "&#1604;.&#1583;", // ?
			MAD: "&#1583;.&#1605;.", //?
			MDL: "&#76;",
			MGA: "&#65;&#114;", // ?
			MKD: "&#1076;&#1077;&#1085;",
			MMK: "&#75;",
			MNT: "&#8366;",
			MOP: "&#77;&#79;&#80;&#36;", // ?
			MRO: "&#85;&#77;", // ?
			MUR: "&#8360;", // ?
			MVR: ".&#1923;", // ?
			MWK: "&#77;&#75;",
			MXN: "&#36;",
			MYR: "&#82;&#77;",
			MZN: "&#77;&#84;",
			NAD: "&#36;",
			NGN: "&#8358;",
			NIO: "&#67;&#36;",
			NOK: "&#107;&#114;",
			NPR: "&#8360;",
			NZD: "&#36;",
			OMR: "&#65020;",
			PAB: "&#66;&#47;&#46;",
			PEN: "&#83;&#47;&#46;",
			PGK: "&#75;", // ?
			PHP: "&#8369;",
			PKR: "&#8360;",
			PLN: "&#122;&#322;",
			PYG: "&#71;&#115;",
			QAR: "&#65020;",
			RON: "&#108;&#101;&#105;",
			RSD: "&#1044;&#1080;&#1085;&#46;",
			RUB: "&#1088;&#1091;&#1073;",
			RWF: "&#1585;.&#1587;",
			SAR: "&#65020;",
			SBD: "&#36;",
			SCR: "&#8360;",
			SDG: "&#163;", // ?
			SEK: "&#107;&#114;",
			SGD: "&#36;",
			SHP: "&#163;",
			SLL: "&#76;&#101;", // ?
			SOS: "&#83;",
			SRD: "&#36;",
			STD: "&#68;&#98;", // ?
			SVC: "&#36;",
			SYP: "&#163;",
			SZL: "&#76;", // ?
			THB: "&#3647;",
			TJS: "&#84;&#74;&#83;", // ? TJS (guess)
			TMT: "&#109;",
			TND: "&#1583;.&#1578;",
			TOP: "&#84;&#36;",
			TRY: "&#8356;", // New Turkey Lira (old symbol used)
			TTD: "&#36;",
			TWD: "&#78;&#84;&#36;",
			TZS: "",
			UAH: "&#8372;",
			UGX: "&#85;&#83;&#104;",
			USD: "&#36;",
			UYU: "&#36;&#85;",
			UZS: "&#1083;&#1074;",
			VEF: "&#66;&#115;",
			VND: "&#8363;",
			VUV: "&#86;&#84;",
			WST: "&#87;&#83;&#36;",
			XAF: "&#70;&#67;&#70;&#65;",
			XCD: "&#36;",
			XDR: "",
			XOF: "",
			XPF: "&#70;",
			YER: "&#65020;",
			ZAR: "&#82;",
			ZMK: "&#90;&#75;", // ?
			ZWL: "&#90;&#36;"
		},
		currentTimezone: "",
		timeZones: [],
		lastMonth: "",
		isAvailable: "",
		isSetTimeoutCall: false,
		minDate: new Date(),
		initializeDatePicker: false,
		firstCalendar: {
			selector: ".wk-datepicker",
			picker: false,
			dateValue: "",
			availableDates: [],
			disableDates: [],
			isAvailable: {},
			active: false
		},
		secondCalendar: {
			selector: ".wk-datepicker-2",
			picker: false,
			dateValue: "",
			availableDates: [],
			disableDates: [],
			// maxDate: new Date(),
			maxDate: false,
			isAvailable: {},
			active: false
		},
		dateValue: "",
		bookNow: "Book Now",
		location: "Location",
		additionalInfo: "Additonal Info",
		noSlots: "No Slots Available",
		selectedSlotQuantity: null,
		unitDays: null,
		slotTime: "Slot Time",
		slotDate: "Slot Date",
		lockInfoLabel: "Product is locked until"
	};

	beWidget.prototype.selector = {
		iframe: "wk-bc-widget-iframe",
		MAIN_DIV: "wk-bc-widget-wrapper",
		WIDGET_TOGGLE_BTN: "wk-bc-widget-toggle-btn",
		WIDGET: "wk-bc-widget",
		WIDGET_BODY: "wk-bc-widget-body",
		BOOKING_PRODUCT_LIST: "booking-product-list",
		VIEW_BOOKING_PRODUCT_BUTTON: "view-booking-product",
		TOGGLE_BOOKING_PRODUCT_INFO_BUTTON: "wk-toggle-booking-product-info",
		ERROR_MESSAGE: "be-error",
		BACK_BTN: "back-btn",
		SCHEDULE_BOOKING_AGAIN: "schedule-booking-again",
		BOOKING_PROCESS_WRAPPER: "wk-booking-process-wrapper",
		DATE_PICKER_INPUT: "wk-datepicker-input",
		TIME_SLOT_SELECT: "timestamp",
		TIME_SLOT_SELECT_2: "tstamp",
		TIME_ZONE_SELECT: "timezone",
		PROCEED_BTN: "proceed-next",
		CHANGE_STEP_LINK: "change-info-link",
		BOOKING_FORM: "wk-booking-form-id",
		LOADER: "loader-view",
		NOTIFICATION_CLOSE_BTN: "close-btn",
		VIEW_REVIEW_LINK: "view-review-link",
		REVIEW_LIST: "review-list"
	};

	beWidget.prototype.templates = {
		empty: function () {
			return "<h4>No result found!</h4>";
		},
		iframe: function () {
			return (
				'<div> <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700" rel="stylesheet"> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> <link href="' +
				publicPath +
				'/widget/css/tiny-date-picker.css" rel="stylesheet"> <link href="' +
				publicPath +
				'/widget/css/tiny-daterange-picker.css" rel="stylesheet"> <link href="' +
				shopifyPath +
				'/shopify-widget/widget.css" rel="stylesheet"> <link href="' +
				publicPath +
				'/widget/css/font.css" rel="stylesheet"><div class="wk-bc-widget wk-bc-hide" style="display:block;"><div class="wk-bc-widget-body" style="margin-bottom:auto"></div></div></div>'
			);
		},
		WIDGET_BODY: function () {
			return '<div class="booking-product-list"><h3>Our Services<span class="border-bottom"></span></h3>';
		},
		BOOKING_PRODUCT: function (bookingProduct) {
			return ('');

		},
		VIEW_BOOKING_PRODUCT: function (bookingProduct) {
			var customFieldInformationHtml = "";
			if (_this.options.bcWidgetType == 1 && bookingProduct.customFields && bookingProduct.customFields.length) {
				bookingProduct.customFields.forEach(function (row) {
					customFieldInformationHtml +=
						'<div class="custom-info-row"><label>' +
						row.title +
						": </label><span>" +
						row.description +
						"</span></div>";
				});
			}
			return (
				'<div class="wk-booking-product-info"><div class="wk-booking-process-wrapper"></div>' +
				(_this.options.bcWidgetType == 1 && bookingProduct.serviceSide && bookingProduct.serviceSide == 'onMySide' && bookingProduct.address && bookingProduct.address != "" ?
					'<div class="wk-booking-product-info-row"><h3>' + _this.models.location + '<span class="border-bottom"></span></h3><span>' +
					bookingProduct.address +
					'</span>' +
					// '<a href="https://map.google.com/?q=' +
					// bookingProduct.address +
					// '" target="_blank" class="btn btn-default btn-sm">Get Direction</a>'+
					'</div>' :
					"") +
				(_this.options.bcWidgetType == 1 && bookingProduct.customFields && bookingProduct.customFields.length ?
					'<div class="wk-booking-product-info-row"><h3>' + _this.models.additionalInfo + '<span class="border-bottom"></span></h3>' +
					customFieldInformationHtml +
					"</div>" :
					"") +
				'</div>'
			);
		},
		BOOKING_SLOT_CARD: function () {
			var cards =
				'<form name="wk-booking-form" id="wk-booking-form-id">';

			// Slot Card
			cards +=
				'<div class="card slot active"><div class="card-body" style="margin-bottom:0px;"><div class="card-info"></div><div class="wk-form-wrapper"> <div class="wk-control-block"></div></div></div></div>';

			cards += "</form>";

			return cards;
		},
		CARD_INFORMATION: function (currentStepCode) {
			var cardInformationHtml = "";
			var slotInformation = _this.models.cardInformation[currentStepCode];
			for (var fieldName in slotInformation) {
				if (fieldName != "customerFields") {
					cardInformationHtml +=
						'<div class="card-info-row ' + fieldName + ' "><label>' +
						fieldName +
						" : </label>" +
						slotInformation[fieldName] +
						"</div>";
				} else {
					for (var customerFieldName in slotInformation[fieldName]) {
						cardInformationHtml +=
							'<div class="card-info-row"><label>' +
							customerFieldName +
							" : </label>" +
							slotInformation[fieldName][customerFieldName] +
							"</div>";
					}
				}
			}

			return cardInformationHtml;
		},
		style: function (brandColor) {
			// if(!brandColor || brandColor == '')
			//     brandColor = '#1747E3';
			if (!brandColor || brandColor == "") return "";

			return (
				".btn.btn-primary { color:" +
				brandColor +
				"; background: -webkit-linear-gradient(" +
				brandColor +
				", " +
				brandColor +
				");background: -o-linear-gradient(" +
				brandColor +
				", " +
				brandColor +
				");background: -moz-linear-gradient(" +
				brandColor +
				", " +
				brandColor +
				");background: linear-gradient(" +
				brandColor +
				", " +
				brandColor +
				");} .btn.btn-default {border: 1px solid " +
				brandColor +
				"; color: " +
				brandColor +
				";} .card-header .change-info-link {color: " +
				brandColor +
				";} .wk-form-control:focus {border: 1px solid " +
				brandColor +
				";} .wk-bc-widget-toggle-btn {background:" +
				brandColor +
				";border: 1px solid " +
				brandColor +
				"};"
			);
		}
	};

	beWidget.prototype.addBrandColor = function () {
		var style = _document.createElement("style");
		style.type = "text/css";
		style.innerHTML = _this.templates.style(_this.options.brandColor);

		_document.getElementsByTagName("head")[0].appendChild(style);
	};

	beWidget.prototype.styles = {
		I_FRAME_INACTIVE: "border: 0; z-index: 999999",
		I_FRAME_ACTIVE: "border: none; z-index: 999999; background: transparent;"
	};

	beWidget.prototype.options = {
		baseurl: "http://demo.bookingengine.com/symfony/BookingEngine/web/app_dev.php",
		fetchUrl: "https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js",
		datePickerUrl: publicPath + "/widget/js/tiny-date-picker.min.js",
		// datePickerUrl: shopifyPath + "/shopify-widget/tiny-date-picker.min.js",
		// 'datePickerUrl': publicPath + '/widget/js/tiny-daterange-picker.min.js',
		moment: publicPath + "/widget/js/moment.js",
		"moment-timezone": publicPath + "/widget/js/moment-timezone.js",
		"moment-timezone-data": publicPath + "/widget/js/moment-timezone-with-data.min.js",
		requestCompanyUrl: "/api/company",
		requestBookingProductsUrl: "/api/booking-products",
		requestBookingProductUrl: "/api/booking-product",
		requestBookingSlotsUrl: "/api/slots",
		requestBookingCreateUrl: "/api/create-booking",
		requestOrderCreateUrl: "/api/create-order",
		requestReviewsUrl: "/api/reviews",
		requestAvailabilityUrl: "/api/booking-product-availablity",
		requestBookingPrice: "/api/booking-product-pricing",
		wrapper: document.getElementById('wk-bc-widget'),
		// wrapper: document.body,
		width: 450,
		timezoneSelectBox: 0,
		bookingButtonId: 'AddToCart-product-template',
		bookingButtonSelector: '[name="add"]',
		buyNowButtonClass: 'shopify-payment-button__button',
		bookingLabels: {},
		bcWidgetType: 1,
		serverDateFormat: 'Y-m-d',
		dateFormat: 'YYYY-MM-DD',
		slotTimeFormat: 12,
		fixedDateFormat: false,
		defaultDateFormat: 'YYYY-MM-DD',
		defaultServerDateFormat: 'Y-m-d',
		serverDateTimeFormat: 'Y-m-d h:i:s A',
		weekStartFrom: 0,
		bookingConfigurationType: false,
		lang: {
			days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			months: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			],
			today: 'Today',
			clear: 'Clear',
			close: 'Close',
		},
		dateFormatCollection: {
			month: {
				M: 'n', // 1
				MM: 'm',    // 01
				MMM: 'M',   // Jan
				MMMM: 'F'   // January
			},
			date: {
				D: 'j',     // 1
				DD: 'd'     // 01
			},
			year: {
				YYYY: 'Y',      // 1999
				YY: 'y'      // 99
			},
			day: {
				d: 'w',     // 0,1,2
				dddd: 'l',      // sunday
				do: 'S'     // 0th, 1st
			}
		},
		serverDateFormatCollection: {
			M: 'n', // 1
			MM: 'm',    // 01
			MMM: 'M',   // Jan
			MMMM: 'F',   // January
			D: 'j',     // 1
			DD: 'd',     // 01
			YYYY: 'Y',      // 1999
			YY: 'y',      // 99
			d: 'w',     // 0,1,2
			dddd: 'l',      // sunday
			do: 'S',     // 0th, 1st
		},
		currentBookingId: false,
		curTimezone: false
	};

	beWidget.prototype.nEventHandler = function (
		eventType,
		elementId,
		cb,
		querySelector
	) {
		if (
			!validation().defined(querySelector) ||
			validation().isEmpty(querySelector)
		)
			querySelector = "ID";
		_document.addEventListener(eventType, function (event) {

			var el = event.target;
			el = _this.findEle(el, elementId, querySelector);
			if (el) {
				cb.call(el, event);
			}
		},true);
	};

	beWidget.prototype.findEle = function (el, elementId, querySelector) {
		var found;
		if (querySelector == "ID") {
			while (el && !(found = el.id === elementId)) {
				el = el.parentElement;
			}
		} else if (querySelector == "CLASS") {
			var splitClass = elementId.split(".");
			while (
				el &&
				!(
					validation().defined(el.className) && typeof (el.className) != 'object' &&
					(found = el.className.indexOf(splitClass[splitClass.length - 1]) >= 0)
				)
			) {
				el = el.parentElement;
			}
		} else if (querySelector == "NAME") {
			while (el && !(found = el.name === elementId)) {
				el = el.parentElement;
			}
		} else {
			el = _this.$(elementId);
			found = true;
		}
		return found ? el : false;
	};

	beWidget.prototype.nExtend = function (a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
	};

	beWidget.prototype.loadScript = function (url, callback, options) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		if (typeof options == "Array") {
			for (var key in options) {
				script[key] = options[key];
			}
		}

		if (script.readyState) {
			//IE
			script.onreadystatechange = function () {
				if (
					script.readyState === "loaded" ||
					script.readyState === "compvare"
				) {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {
			//Others
			script.onload = function () {
				callback();
			};
		}

		script.src = url;
		if (_this.options.datePickerUrl == url)
			_document.head.appendChild(script);
		else document.head.appendChild(script);
	};

	beWidget.prototype.inbuilt = {
		createElement: function (options) {
			var element = document.createElement(options.element);
			if (validation().defined(options.style))
				element.style.cssText = options.style;
			if (validation().defined(options.attr)) {
				for (var key in options.attr) {
					if (!validation().isEmpty(options.attr[key]))
						element.setAttribute(key, options.attr[key]);
				}
			}
			if (validation().defined(options.src)) element.src = options.src;
			if (validation().defined(options.id)) element.id = options.id;
			if (validation().defined(options.class))
				element.className = options.class;
			if (validation().defined(options.innerHTML))
				element.innerHTML = options.innerHTML;
			if (validation().defined(options.value)) element.value = options.value;

			return element;
		},
		whatIsLength: function (data) {
			if (validation().defined(data.length)) return data.length;
			else if (typeof data === "object") return Object.keys(data).length;
		},
		getRegex: function (expression) {
			return new RegExp(expression);
		},
		converToValidDate: function (str) {
			return str.replace(/-/g, '/');
		}
	};

	beWidget.prototype.validation = {
		shouldLessThanOrEqualValue: function (value, validationValue) {
			return value > validationValue ?
				true :
				false;
		},
		shouldGreaterThanOrEqualValue: function (value, validationValue) {
			return value < validationValue ?
				true :
				false;
		},
		defined: function (data) {
			return data == undefined || data == null || data == "undefined" ?
				false :
				true;
		},
		isEmpty: function (data) {
			if (data === "null" || data === null) return true;

			if (typeof data === "string") return data.trim() == "" ? true : false;

			if (typeof data === "array" || typeof data === "object")
				return _this.inbuilt.whatIsLength(data) === 0 ? true : false;
		},
		invalidNumber: function (value) {
			if (this.isEmpty(value)) return false;

			if (!Number.isInteger(Number(value))) return true;

			return false;
		},
		greaterThanZero: function (value) {
			if (value > 0) {
				return false;
			}
			return true;
		},
		invalidEmail: function (value) {
			if (this.isEmpty(value)) return false;

			var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (_this.inbuilt.getRegex(emailRegex).test(value)) {
				return false;
			}

			return true;
		}
	};

	beWidget.prototype.validationErrorMessage = {
		isEmpty: "This field is mandatory",
		invalidNumber: "This is not a valid number",
		invalidEmail: "This is not a valid email address",
		invalidGuest: "Guests Not available",
		shouldLessThanOrEqualValue: "Value should be less or equal to available limit",
		shouldGreaterThanOrEqualValue: "Value should be greater or equal to available limit",
		greaterThanZero: "Value should be greater than zero",
		guestLimit: "Guest Limit",
		minLimit: "Min Guest Limit",
		maxLimit: "Max Guest Limit"
	};

	beWidget.prototype.init = function () {
		_this.iframe = _this.inbuilt.createElement({
			element: "div",
			id: _this.selector.iframe,
			// style: _this.styles.I_FRAME_INACTIVE
		});
		_this.box = _this.inbuilt.createElement({
			element: "div",
			id: _this.selector.MAIN_DIV,
			className: _this.selector.MAIN_DIV,
			// style: _this.styles.I_FRAME_INACTIVE
		});
		_this.box.appendChild(_this.iframe);
		if (_this.options.bookingConfigurationType) {
			_this.iframe = _this.$("#" + _this.selector.iframe);
			_this.box = _this.$("#" + _this.selector.MAIN_DIV);
		} else {
			_this.options.wrapper.appendChild(_this.box);
			_this.createIframe();
		}
		_this.bindEvents();
		if (_this.options.bookingLabels) {
			_this.options.bookingLabels = JSON.parse(_this.options.bookingLabels.replace(/=>/g, ':').replace(/&quot;/g, '"'));
			if (_this.options.bookingLabels.label_6)
				_this.models.fields.slot.guests.label = _this.options.bookingLabels.label_6;
			if (_this.options.bookingLabels.label_15)
				_this.models.bookNow = _this.options.bookingLabels.label_15;

			if (_this.options.bookingLabels.label_9)
				_this.models.noSlots = _this.options.bookingLabels.label_9;
			if (_this.options.bookingLabels.label_3)
				_this.models.location = _this.options.bookingLabels.label_3;
			if (_this.options.bookingLabels.label_7)
				_this.models.additionalInfo = _this.options.bookingLabels.label_7;
			if (_this.options.bookingLabels.label_24)
				_this.validationErrorMessage.shouldLessThanOrEqualValue = _this.options.bookingLabels.label_24;
			if (_this.options.bookingLabels.label_28)
				_this.validationErrorMessage.shouldGreaterThanOrEqualValue = _this.options.bookingLabels.label_28;
			if (_this.options.bookingLabels.label_14)
				_this.validationErrorMessage.guestLimit = _this.options.bookingLabels.label_14;
			if (_this.options.bookingLabels.label_18)
				_this.models.fields.slot.timezone.label = _this.options.bookingLabels.label_18;
			if (_this.options.bookingLabels.label_25)
				_this.validationErrorMessage.isEmpty = _this.options.bookingLabels.label_25;
			_this.models.fields.slot['wk-datepicker-input'].label = _this.options.bookingLabels.label_4;
			if (_this.options.bookingLabels.label_26)
				_this.models.fields.slot['wk-datepicker-2-input'].label = _this.options.bookingLabels.label_26;
			else
				_this.models.fields.slot['wk-datepicker-2-input'].label = _this.options.bookingLabels.label_4;
			_this.models.fields.slot.timestamp.label = _this.options.bookingLabels.label_5;
			if (_this.options.bookingLabels.label_27)
				_this.models.fields.slot.tstamp.label = _this.options.bookingLabels.label_27;
			else
				_this.models.fields.slot.tstamp.label = _this.options.bookingLabels.label_5;
			if (_this.options.bookingLabels.label_53) {
				_this.models.fields.slot.timestamp.options[0].label = _this.options.bookingLabels.label_53;
				_this.models.fields.slot.tstamp.options[0].label = _this.options.bookingLabels.label_53;
			}
			if (_this.options.bookingLabels.label_54)
				_this.models.slotDate = _this.options.bookingLabels.label_54;
			if (_this.options.bookingLabels.label_55)
				_this.models.slotTime = _this.options.bookingLabels.label_55;
			if (_this.options.bookingLabels.label_70)
				_this.models.lockInfoLabel = _this.options.bookingLabels.label_70;

		}
	};

	beWidget.prototype.createIframe = function () {
		// var iframe =
		// 	_this.iframe.contentWindow ||
		// 	(_this.iframe.contentDocument.document || _this.iframe.contentDocument);

		// _document.window = iframe;
		// _this.$(`#${_this.selector.iframe}`).html(_this.templates.iframe());
		// iframe.appendChild(_this.templates.iframe());
		_this.iframe.innerHTML = _this.templates.iframe();
	};

	beWidget.prototype.scrollToTop = function () {
		_document.body.scrollTop = _document.documentElement.scrollTop = 0;
	};

	beWidget.prototype.isRangeType = function () {
		if (
			BookingConfigurationType.rangeType.indexOf(
				_this.models.bookingProduct.bookingConfigurationType
			) > -1
		)
			return true;
	};

	beWidget.prototype.isFixedType = function () {
		if (
			BookingConfigurationType.FixedType.indexOf(
				_this.models.bookingProduct.bookingConfigurationType
			) > -1
		)
			return true;
	};

	beWidget.prototype.isDayType = function () {
		if (
			BookingConfigurationType.DayType.indexOf(
				_this.models.bookingProduct.bookingConfigurationType
			) > -1
		)
			return true;
	};

	beWidget.prototype.isDayDateType = function () {
		if (
			BookingConfigurationType.DayDateType.indexOf(
				_this.models.bookingProduct.bookingConfigurationType
			) > -1
		)
			return true;
	};

	beWidget.prototype.getBookingProductItem = function (
		event,
		bookingProductPath
	) {
		if (event) {
			var path = event.target.getAttribute("data-path");
		} else {
			var path = bookingProductPath;
		}

		if (_this.options.bcWidgetType == 1) {
			let token = '';
			let element = _this.$("#wk_cartToken");

			if (element && element.innerHTML) {
				let cart = JSON.parse('' + element.innerHTML);
				token = cart.token;
			}
			_this.options = Object.assign(_this.options, {
				token: token
			});

		}

		let request = new Request(
			_this.getUrl(_this.options.requestBookingProductUrl + "/" + path), {
			method: "GET"
		}
		);
		_this.fetch(request, "json").then(function (response) {
			if (response) {
				_this.models.bookingProduct = response;
				if (response.unitDays && response.unitDays.length) {
					_this.models.unitDays = response.unitDays[0];
					_this.models.bookingProduct.showSecond = true;
				}
				_this.addCustomerFieldsToModel();
				_this.renderBookingProductItem();
				if (_this.models.bookingProduct.maxcustomerLimit != 0 || _this.models.bookingProduct.customerLimit != 0) {
					var limit = _this.models.bookingProduct.maxcustomerLimit || _this.models.bookingProduct.customerLimit;
					$("[name='guests']").attr("max", limit);
				} else {
					$("[name='guests']").attr("max", "");
				}
				if (_this.models.bookingProduct.mincustomerLimit != 0) {
					$("[name='guests']").attr("min", _this.models.bookingProduct.mincustomerLimit);
				} else {
					$("[name='guests']").attr("min", 1);
				}
				if (
					validation().defined(response.isAvailable) &&
					validation().defined(response.isAvailable.next) &&
					response.isAvailable.next
				) {
					_this.models.minDate = new Date(nInbuilt().converToValidDate(response.isAvailable.next));
				}

				if (!_this.isFixedType()) {
					_this.initializeDatePicker(".wk-datepicker");

					if (_this.isRangeType()) {
						if (_this.models.unitDays && !_this.models.bookingProduct.showSecond) {
							let selector = _this.$('.wk-form-control.wk-datepicker-2-input.wk-datepicker-2');
							if (selector) {
								selector.parentElement.classList.add('wk-bc-hide');
							}
						} else {
							_this.initializeDatePicker(".wk-datepicker-2");
						}
					}

					_this.getAvailability({
						id: _this.models.bookingProduct.id,
						month: _this.models.minDate.getMonth() + 1,
						year: _this.models.minDate.getFullYear()
					});
				} else {
					_this.getBookingSlots({});
				}

				_this.$(".wk-bc-widget").classList.remove('wk-bc-hide');

				if (_this.options.bcWidgetType == 1) {
					if (_this.$(_this.options.bookingButtonSelector)) {
						_this.$(_this.options.bookingButtonSelector).classList.remove("wk-hide");
						_this.$(_this.options.bookingButtonSelector).disabled = false;
						_this.$(_this.options.bookingButtonSelector).innerText = _this.models.bookNow
						_this.$(`.${_this.selector.BOOKING_PROCESS_WRAPPER}`).after(_this.$(_this.options.bookingButtonSelector));
						_this.$(_this.options.bookingButtonSelector).disabled = false;
						// _this.$(".".concat(_this.selector.BOOKING_PROCESS_WRAPPER)).after(_this.$(_this.options.bookingButtonSelector));
					}
					else if (_this.$(`#${_this.options.bookingButtonId}`)) {
						_this.$(`#${_this.options.bookingButtonId}`).classList.remove("wk-hide");
						_this.$(`#${_this.options.bookingButtonId}`).disabled = false;
						_this.$(`#${_this.options.bookingButtonId}`).innerText = _this.models.bookNow
						_this.$(`.${_this.selector.BOOKING_PROCESS_WRAPPER}`).after(_this.$(`#${_this.options.bookingButtonId}`));
						_this.$(`#${_this.options.bookingButtonId}`).disabled = false;
					}
					// else if (_this.$("#".concat(_this.options.bookingButtonId))) {
					// 	_this.$("#".concat(_this.options.bookingButtonId)).classList.remove("wk-hide");
					// 	_this.$("#".concat(_this.options.bookingButtonId)).innerText = _this.models.bookNow
					// 	_this.$(".".concat(_this.selector.BOOKING_PROCESS_WRAPPER)).after(_this.$("#".concat(_this.options.bookingButtonId)));
					// }
					// by prakhar to set guest value on product fetch
					if (_this.models.bookingProduct.mincustomerLimit)
						$("[name='guests']").val(_this.models.bookingProduct.mincustomerLimit);
				}
				else if (_this.options.bcWidgetType == 2) {
					_this.$(`#btn_reschedule`).removeAttribute("disabled");
					// _this.$("#btn_reschedule").removeAttribute("disabled");
				}
				// _this.toggleWidget()
			}
		});
	};

	beWidget.prototype.addCustomerFieldsToModel = function () {
		_this.models.fields["slot"]["customerFields"] = {};
		if (_this.options.bcWidgetType == 1 && _this.models.bookingProduct.customerFields) {
			_this.models.bookingProduct.customerFields.forEach(function (
				customerField
			) {
				var validation = customerField["isRequired"] ? ["isEmpty"] : [];
				_this.models.fields["slot"]["customerFields"][
					customerField["title"].replace(/"/g, "'")
				] = {
					label: customerField.title,
					type: customerField.type,
					isRequired: customerField["isRequired"],
					value: "",
					validations: validation,
					choices: customerField.select || customerField.choices,
				};
			});
		}
	};

	beWidget.prototype.renderBookingProductItem = function () {
		_this.scrollToTop();
		_this.models.hash = _this.randToken();
		_this.$("." + _this.selector.WIDGET_BODY).classList.remove("extended");
		_this.$(
			"." + _this.selector.WIDGET_BODY
		).innerHTML = _this.templates.VIEW_BOOKING_PRODUCT(
			_this.models.bookingProduct
		);

		var e = document.createElement("div");
		e.innerHTML = _this.templates.BOOKING_SLOT_CARD();
		_this.$("." + _this.selector.BOOKING_PROCESS_WRAPPER).appendChild(e);
		_this.prepareFormFields();
		let element = document.createElement("div");
		element.setAttribute('id', 'wk-lockInfo');
		_this.$(".wk-bc-widget-body .card-body").append(element);
	};

	beWidget.prototype.randToken = function () {
		return Math.random()
			.toString(36)
			.substr(2);
	};

	beWidget.prototype.prepareFormFields = function () {

		for (var formGroupName in _this.models.fields) {
			for (var fieldName in _this.models.fields[formGroupName]) {
				if (fieldName != "customerFields") {
					_this.createField(
						formGroupName,
						fieldName,
						_this.models.fields[formGroupName][fieldName]
					);
				} else {
					for (var customerFieldName in _this.models.fields[formGroupName][
						fieldName
					]) {
						_this.createField(
							formGroupName,
							customerFieldName,
							_this.models.fields[formGroupName][fieldName][customerFieldName]
						);
					}
				}
			}
		}
	};

	beWidget.prototype.createField = function (formGroupName, fieldName, field) {

		var element = nInbuilt().createElement({
			element: "div",
			class: "wk-form-group"
		});

		if (
			fieldName == "guests" &&
			// (_this.models.bookingProduct.bookingType == "single" || _this.options.bcWidgetType != 1)
			(_this.models.bookingProduct.bookingType == "single" || _this.options.bcWidgetType != 1 || _this.models.bookingProduct.bookingConfigurationType == BookingConfigurationType.RangeDateTime || _this.models.bookingProduct.bookingConfigurationType == BookingConfigurationType.RangeDate)
		) {
			element.classList.add("wk-bc-hide");
		} else if (fieldName == "wk-datepicker-input") {
			if (_this.isFixedType()) element.classList.add("wk-bc-hide");
		} else if (
			(fieldName == "timestamp" || fieldName == "tstamp") &&
			_this.isDayType()
		) {
			element.classList.add("wk-bc-hide");
		} else if (
			!_this.isRangeType() &&
			(fieldName == "wk-datepicker-2-input" || fieldName == "tstamp")
		) {
			element.classList.add("wk-bc-hide");
		} else if (_this.isRangeType() && fieldName == "wk-datepicker-2-input") {
			// element.classList.add("datepicker-2");
		}

		var html =
			'<label class="' +
			(field.isRequired ? 'required' : "") +
			(fieldName == "timezone" && _this.options.timezoneSelectBox != 1 ? ' wk-bc-hide' : "") +
			'">' +
			field.label +
			"</label>";
		switch (field["type"]) {
			case "text":
			case "Text":
				html +=
					'<input type="text" class="wk-form-control ' +
					fieldName +
					(fieldName == "wk-datepicker-input" ? " wk-datepicker " : "") +
					(fieldName == "wk-datepicker-2-input" ? " wk-datepicker-2 " : "") +
					'" name="' +
					fieldName +
					'" ' +
					(fieldName == "wk-datepicker-input" || fieldName == "wk-datepicker-2-input" ? "readonly" : "") + (fieldName == "wk-datepicker-2-input" ? " disabled" : "") +
					' value="' +
					field.value +
					'"/>';
				element.innerHTML = html;
				_this
					.$(".card." + formGroupName + " .wk-control-block")
					.appendChild(element);
				break;
			case "number":
				html +=
					'<input type="number" class="wk-form-control ' +
					fieldName +
					(fieldName == "wk-datepicker-input" ? " wk-datepicker " : "") +
					(fieldName == "wk-datepicker-2-input" ? " wk-datepicker-2 " : "") +
					'" name="' +
					fieldName.replace(/"/g, "'") +
					'" ' +
					(fieldName == "wk-datepicker-input" || fieldName == "wk-datepicker-2-input" ? "readonly" : "") + (fieldName == "wk-datepicker-2-input" ? " disabled" : "") +
					' value="' +
					field.value +
					'"/>';
				element.innerHTML = html;
				_this
					.$(".card." + formGroupName + " .wk-control-block")
					.appendChild(element);
				break;
			case "textarea":
			case "Textarea":
				html +=
					'<textarea type="text" class="wk-form-control ' +
					fieldName +
					'" name="' +
					fieldName.replace(/"/g, "'") +
					'">' +
					field.value +
					"</textarea>";
				element.innerHTML = html;
				_this
					.$(".card." + formGroupName + " .wk-control-block")
					.appendChild(element);
				break;

			case "select":
			case "Select":
				if (fieldName == "timezone") {
					if (!_this.models.timeZones.length) _this.setTimeZones();

					field.options = _this.models.timeZones;
					// field.value = _this.models.currentTimezone;
					if (_this.options.curTimezone) {
						field.value = _this.options.curTimezone;
					} else {
						field.value = (_this.options.timezoneSelectBox == 1) ? _this.models.currentTimezone : _this.models.bookingProduct.companyTimezone;
					}
				} else if (field.choices != undefined) {
					field.options = field.choices;
				}
				html +=
					'<select type="text" class="wk-form-control ';
				if (fieldName == "timezone" && _this.options.timezoneSelectBox != 1)
					html += 'wk-bc-hide ';
				html += fieldName +
					'" name="' +
					fieldName.replace(/"/g, "'") +
					'">';
				if (field.choices != undefined) {
					html += '<option value="" selected></option>';
				}
				field.options.forEach(function (option) {
					let value = (option && option.label) ? option.value : option;
					let label = (option && option.label) ? option.label : option;
					value = value.replace(/"/g, "'")
					html +=
						'<option value="' +
						value +
						'" ' +
						(field.value == value ? "selected" : "") +
						">" +
						label +
						"</option>";
				});
				html += "</select>";
				element.innerHTML = html;
				_this
					.$(".card." + formGroupName + " .wk-control-block")
					.appendChild(element);
				break;

			case "Choice":
				if (field.choices) {
					field.options = field.choices;
					html += '<div class="wk-form-control wk-choice-wrapper wk-flex">';
					field.options.forEach(function (option) {
						html += '<div class="wk-choice wk-flex"><input type="checkbox" name="' + fieldName.replace(/"/g, "'") + '" >' + option + '</div>';
					});

					html += '</div>';
					element.innerHTML = html;
					_this
						.$(".card." + formGroupName + " .wk-control-block")
						.appendChild(element);
				}
				break;

		}
	};

	beWidget.prototype.viewSecondSlot = function (slot) {
		if ((_this.models.selectedSlot && _this.models.selectedSlot.timestamp <= slot.timestamp)
			//&& (_this.models.enabledSlots.indexOf(slot.timestamp) > -1 )
		) {
			return true;
		} else
			return false;
	}

	beWidget.prototype.getBookingSlots = function (params) {
		if (_this.options.bcWidgetType == 1) {
			if (_this.models.unitDays) {
				params = Object.assign(params, {
					days: _this.models.unitDays.days,
					token: _this.options.token
				});
			} else {
				params = Object.assign(params, {
					token: _this.options.token
				});
			}
		} else {
			if (_this.models.unitDays) {
				params = Object.assign(params, {
					days: _this.models.unitDays.days
				});
			}
			if (_this.options.currentBookingId) {
				params['bookingId'] = _this.options.currentBookingId;
			}
		}

		var currentTimezone = _this.$("." + _this.selector.TIME_ZONE_SELECT).value;
		if (currentTimezone) {
			params["timezone"] = currentTimezone;
		}
		params['dateFormat'] = _this.options.serverDateFormat;
		let request = new Request(
			_this.getUrl(
				_this.options.requestBookingSlotsUrl +
				"/" +
				_this.models.bookingProduct.path,
				params
			), {
			method: "GET"
		}
		);

		_this.fetch(request, "json").then(function (response) {
			if (response) {
				_this.models.slotsData = response;

				switch (_this.models.bookingProduct.bookingConfigurationType) {
					case BookingConfigurationType.DayDate:
					case BookingConfigurationType.RangeDate:
						break;
					case BookingConfigurationType.FixedDate:
					case BookingConfigurationType.FixedDateTime:
						var slotsInput = '<option hidden value="">' + _this.models.fields.slot.timestamp.label + '</option>';
						if (_this.models.slotsData.slots) {
							_this.models.slotsData.slots.forEach(function (slot, index) {
								slotsInput +=
									"<option value='" +
									JSON.stringify(slot) +
									"' data-index=\"" +
									index +
									'">' +
									_this.slotLabelFormatFixedType(slot.from) +
									" - " +
									_this.slotLabelFormatFixedType(slot.to) +
									"</option>";
							});
							if (_this.models.slotsData.slots.length == 0) {
								slotsInput += '<option value="">' + _this.models.noSlots + '</option>';
							}
						}
						_this.$(
							"." + _this.selector.TIME_SLOT_SELECT
						).innerHTML = slotsInput;
						break;

					case BookingConfigurationType.DayDateTime:
						var slotsInput = '<option hidden value="">' + _this.models.fields.slot.timestamp.options[0].label + '</option>';
						_this.models.slotsData.dates.forEach(function (date) {
							if (_this.models.slotsData.slots[date]) {
								let tempDate = new Date(date.replace(/-/g, '/') + " 00:00:00");
								slotsInput += '<optgroup label="' + moment(tempDate).format(_this.options.dateFormat) + '">';
								_this.models.slotsData.slots[date].forEach(function (
									slot,
									index
								) {
									slotsInput +=
										"<option value='" +
										JSON.stringify(slot) +
										"' data-index=\"" +
										index +
										'">' +
										_this.slotLabelFormat(slot.from) +
										" - " +
										_this.slotLabelFormat(slot.to) +
										"</option>";
								});
								slotsInput += '</optgroup">';
							}

						});
						if (_this.models.slotsData.dates.length == 0) {
							slotsInput += '<option value="">' + _this.models.noSlots + '</option>';
						}
						_this.$(
							"." + _this.selector.TIME_SLOT_SELECT
						).innerHTML = slotsInput;
						break;
					case BookingConfigurationType.RangeDateTime:
						var slotsInput = '<option hidden value="">' + _this.models.fields.slot.timestamp.options[0].label + '</option>';
						_this.models.slotsData.dates.forEach(function (date) {
							if (_this.models.slotsData.slots[date]) {
								let tempDate = new Date(date.replace(/-/g, '/') + " 00:00:00");
								slotsInput += '<optgroup label="' + moment(tempDate).format(_this.options.dateFormat) + '">';
								_this.models.slotsData.slots[date].forEach(function (
									slot,
									index
								) {
									if (
										_this.models.firstCalendar.active ||
										_this.viewSecondSlot(slot)
									) {
										slotsInput +=
											"<option value='" +
											JSON.stringify(slot) +
											"' data-index=\"" +
											index +
											'">' +
											(_this.models.secondCalendar.active ? _this.slotLabelFormat(slot.to) : _this.slotLabelFormat(slot.from)) +
											"</option>";
									}
								});
								slotsInput += '</optgroup">';
							}
						});
						if (_this.models.slotsData.dates.length == 0) {
							slotsInput += '<option value="">' + _this.models.noSlots + '</option>';
						}
						let selector;
						if (_this.models.secondCalendar.active)
							selector = _this.selector.TIME_SLOT_SELECT_2;
						else selector = _this.selector.TIME_SLOT_SELECT;

						_this.$("." + selector).innerHTML = slotsInput;
						break;
				}
			}
		});
	};

	beWidget.prototype.initializeDatePicker = function (selector) {
		var options = {
			// mode: "dp-permanent",
			mode: "dp-below",
			// hilightedDate: new Date(),
			min: _this.models.minDate,
			selector: selector,
			inRange: function (date, dp) {
				if(dp.opts.selector === '.wk-datepicker-2' && _this.models.secondCalendar.maxDate && date >_this.models.secondCalendar.maxDate){
					return false;
				}
				if (_this.models.unitDays && dp && dp.opts.selector === '.wk-datepicker-2') {
					return dp.opts.min <= date && dp.opts.max >= date;
				}
				if (!dp) {
					return true;
				}
				if (!dp.opts.isAvailable) {
					return false;
				}
				if (dp.opts.isAvailable.available) {
					let formatedDate = date.getDate();
					
					if (dp.opts.isAvailable.available.indexOf(formatedDate) > -1) {
						return true;
					}
				}
				return false;
			},
			parse(str) {
				var date = new Date(moment(str , _this.options.dateFormat + ' hh:mm A').format(_this.options.defaultDateFormat + ' hh:mm A'));
				return isNaN(date) ? new Date() : date;
			},
			lang: _this.options.lang,
			dayOffset: _this.options.weekStartFrom || 0
		};
		var datePicker = window.TinyDatePicker(
			_this.$(selector),
			options
		);

		_this.datePicker = _this.datePicker || datePicker;

		if (selector == _this.models.firstCalendar.selector) {
			_this.models.firstCalendar.picker = datePicker;
		} else if (selector == _this.models.secondCalendar.selector) {
			_this.models.secondCalendar.picker = datePicker;
		}

		datePicker.on("select", function (_, dp) {
			_this.models.isSetTimeoutCall = true;

			var date = dp.state.selectedDate;

			_this.$(selector + "-input").value = moment(date).format(_this.options.dateFormat);
			_this.$(selector).classList.remove("open");

			var formatedDate = moment(date).format(_this.options.defaultDateFormat);
			if (_this.isDayType()) {
				if (_this.isRangeType()) {
					let slot;
					if (_this.models.slotsData.slots[formatedDate])
						slot = Object.assign({},
							_this.models.slotsData.slots[formatedDate]
						);
					if (!slot) return;


					if (selector == _this.models.firstCalendar.selector) {
						if (_this.models.unitDays) {
							let secondDate = new Date(date.getTime());
							secondDate.setDate(date.getDate() + _this.models.unitDays.days - 1);
							var secondFormatedDate = moment(secondDate).format(_this.options.defaultDateFormat);
							let secondSlot = _this.models.slotsData.slots[secondFormatedDate];

							_this.models.selectedSlot = slot;
							_this.models.selectedSlot.rentSecond = secondSlot;

							_this.$(_this.models.secondCalendar.selector).disabled = false;
							_this.models.selectedSlot.rentFirst = true;
							_this.$(_this.models.secondCalendar.selector + "-input").value = moment(secondDate).format(_this.options.dateFormat);

							_this.models.selectedSlot.from = slot.dateCalendar + " " + slot.from;
							_this.models.selectedSlot.to = secondSlot.dateCalendar + " " + secondSlot.to;

							_this.models.selectedSlot.duration = _this.dateDiffInDaysTimeZoneBased(
								_this.models.selectedSlot
							) - 1;

							if (_this.models.bookingProduct.showSecond) {

								let maxDate = new Date(date.getTime());
								maxDate.setDate(maxDate.getDate() + _this.models.unitDays.days - 1);
								let opt = {
									min: maxDate,
									max: maxDate,
									isAvailable: _this.models.firstCalendar.isAvailable
								};
								_this.models.secondCalendar.maxDate = maxDate;
								_this.models.secondCalendar.picker.setOption(opt);
							}
							_this.models.isSetTimeoutCall = true;
						} else {
							_this.$(_this.models.secondCalendar.selector).disabled = false;

							if (_this.models.selectedSlot) {
								delete slot.to;
								_this.models.selectedSlot = Object.assign(
									_this.models.selectedSlot,
									slot
								);
							} else {
								_this.models.selectedSlot = slot;
							}

							_this.models.selectedSlot.from =
								slot.dateCalendar + " " + slot.from;

							// by prakhar to allow same day booking
							let disableDate = _this.findNextDisableDate(date, selector);
							_this.models.secondCalendar.maxDate = disableDate;
							let opt = {
								min: new Date(
									date.getFullYear(),
									date.getMonth(),
									date.getDate()
									// date.getDate() + 1
								),
								max: disableDate,
								isAvailable: _this.models.firstCalendar.isAvailable
							};

							_this.models.secondCalendar.picker.setOption(opt);
							_this.models.isSetTimeoutCall = true;

							_this.models.selectedSlot.rentFirst = true;


							if (_this.models.selectedSlot.rentSecond) {
								if (
									_this.models.selectedSlot.timestamp >= _this.models.selectedSlot.rentSecond.timestamp
									|| true
								) {
									_this.models.dateValue = "";
									_this.$(_this.models.secondCalendar.selector).value = "";
									delete _this.models.selectedSlot.rentSecond;
								}
							} else {
								_this.models.dateValue = "";
								_this.$(_this.models.secondCalendar.selector).value = "";
							}
						}
					} else if (selector == _this.models.secondCalendar.selector) {
						if (!_this.models.selectedSlot) {
							_this.models.selectedSlot = slot;
							_this.models.selectedSlot.rentFirst = false;
						}
						_this.models.selectedSlot.rentSecond = slot;
						_this.models.selectedSlot.to = slot.dateCalendar + " " + slot.to;
						_this.models.selectedSlot.duration = _this.dateDiffInDaysTimeZoneBased(
							_this.models.selectedSlot
						) - 1;
					}

					if ((_this.models.unitDays && _this.models.bookingProduct.showSecond) || selector == _this.models.secondCalendar.selector) {
						let getPricingParams = Object.assign({
							id: _this.models.bookingProduct.id,
						}, _this.models.selectedSlot);

						if (_this.$(_this.options.bookingButtonSelector))
							_this.$(_this.options.bookingButtonSelector).setAttribute('disabled', 'disabled');
						else
							_this.$(`#${_this.options.bookingButtonId}`).setAttribute('disabled', 'disabled');


						_this.getBookingPrice(getPricingParams);
					}

					_this.models.selectedSlot.duration = _this.dateDiffInDaysTimeZoneBased(
						_this.models.selectedSlot);

				} else {
					_this.models.selectedSlot =
						_this.models.slotsData.slots[formatedDate];
				}
			} else if (_this.isRangeType()) {
				if (selector == _this.models.firstCalendar.selector) {
					_this.$(_this.models.secondCalendar.selector).disabled = false;

					let opt = {
						isAvailable: _this.models.secondCalendar.isAvailable ||
							_this.models.firstCalendar.isAvailable
					};
					_this.models.secondCalendar.minDate = opt.min = date;

					let disableDate = _this.findNextDisableDate(date, selector);
					// if (disableDate) {
					opt.max = disableDate;
					_this.models.secondCalendar.maxDate = disableDate;
					// }

					_this.models.secondCalendar.picker.setOption(opt);
				}
				_this.models.isSetTimeoutCall = true;
				// date.getFullYear() +
				// "-" +
				// (parseInt(date.getMonth()) < 9 ? "0" : "") +
				// (parseInt(date.getMonth()) + 1) +
				// "-" +
				// (parseInt(date.getDate()) < 10 ? "0" : "") +
				// date.getDate();
				_this.getBookingSlots({
					start: formatedDate
				});
			}
			else {
				// date.getFullYear() +
				// "-" +
				// (parseInt(date.getMonth()) < 9 ? "0" : "") +
				// (parseInt(date.getMonth()) + 1) +
				// "-" +
				// (parseInt(date.getDate()) < 10 ? "0" : "") +
				// date.getDate();
				_this.getBookingSlots({
					start: formatedDate
				});
			}
		});

		datePicker.on("statechange", function (_, dp) {
			if (!validation().defined(dp.state.hilightedDate)) return;
			if (dp.state.disabled) {
				dp.state.disabled = false;
				return;
			}
			var date = dp.state.hilightedDate;
			var formatedMonth = date.getMonth() + 1;
			var formatedYear = date.getFullYear();

			if (
				// formatedMonth != _this.models.lastMonth &&
				!_this.models.isSetTimeoutCall
			) {
				_this.models.lastMonth = formatedMonth;
				_this.getAvailability({
					id: _this.models.bookingProduct.id,
					month: formatedMonth,
					year: formatedYear
				},
					selector
				);
			}

			_this.models.isSetTimeoutCall = false;
			// by prakhar
			if (_this.models.bookingProduct.mincustomerLimit == 0 || !_this.models.selectedSlot) {
				//do nothing
			} else if ((_this.models.bookingProduct.allowLessThanMin && _this.models.bookingProduct.mincustomerLimit > _this.models.selectedSlot.availability) && _this.models.bookingProduct.customerLimit != 0) {
				$("[name='guests']").val(1);
				$("[name='guests']").attr("min", 1);
				if (_this.$('#form_reschedule'))
					$("[name='availability'").val(_this.models.selectedSlot.availability);
			} else {
				$("[name='guests']").val(_this.models.bookingProduct.mincustomerLimit);
				$("[name='guests']").attr("min", _this.models.bookingProduct.mincustomerLimit);
				if (_this.$('#form_reschedule'))
					$("[name='availability'").val(_this.models.selectedSlot.availability);
			}
		});

		datePicker.on("open", function (_, dp) {
			_this.datePicker = datePicker;

			_this.models.firstCalendar.active = false;
			_this.models.secondCalendar.active = false;

			if (_this.models.secondCalendar.selector == selector)
				_this.models.secondCalendar.active = true;
			else _this.models.firstCalendar.active = true;

			if (_this.models.unitDays && selector == '.wk-datepicker') {
				_document.querySelectorAll('button:not(.dp-day-disabled).dp-day').forEach((elementRef) => {
					elementRef.addEventListener('mouseenter', event => {
						let element = event.srcElement;
						for (let i = 0; i < _this.models.unitDays.days; i++) {
							if (element) {
								element.classList.add('wk_range_calender');
								element = element.nextElementSibling;
							}
						}
					})
					elementRef.addEventListener('mouseleave', event => {
						let element = event.srcElement;
						for (let i = 0; i < _this.models.unitDays.days; i++) {
							if (element) {
								element.classList.remove('wk_range_calender');
								element = element.nextElementSibling;
							}
						}
					})
				})
			}
		});
	};

	beWidget.prototype.dateDiffInDaysTimeZoneBased = function (a) {
		return (a.rentSecond ? (((a.rentSecond.timestamp - a.timestamp) / 60) + a.rentSecond.duration) : 0);
	};

	beWidget.prototype.dateDiffInDays = function (a, b) {
		return _this.dateDiffN(b, a) + 1;
	};

	beWidget.prototype.dateDiffN = function (a, b) {
		a = new Date(nInbuilt().converToValidDate(a));
		b = new Date(nInbuilt().converToValidDate(b));


		var diffMs = a.getTime() - b.getTime();
		var diffMins = Math.round(diffMs / 60000);

		return diffMins;
	};

	beWidget.prototype.findNextDisableDate = function (date, selector) {
		let disableDates = [];
		let disableDate = false;
		if (selector == _this.models.firstCalendar.selector)
			disableDates = _this.models.firstCalendar.disableDates;
		else disableDates = _this.models.secondCalendar.disableDates;
		if (disableDates) {
			for (let i = 0; i < disableDates.length; i++) {
				let disableDateFormatInDate = new Date(nInbuilt().converToValidDate(disableDates[i]));
				if (date <= disableDateFormatInDate) {
					disableDate = disableDateFormatInDate;
					break;
				}
			}
		}

		return disableDate;
	};


	beWidget.prototype.findNextDisableDateBySlots = function (date, selector) {
		let disableDates = [];
		let disableDate = false;

		if (selector == _this.models.firstCalendar.selector)
			disableDates = _this.models.firstCalendar.disableDates;
		else disableDates = _this.models.secondCalendar.disableDates;
		let i = 0;
		if (disableDates) {
			for (i; i < disableDates.length; i++) {
				let disableDateFormatInDate = new Date(nInbuilt().converToValidDate(disableDates[i]));
				if (date <= disableDateFormatInDate) {
					disableDate = disableDateFormatInDate;
					if (disableDate && _this.models.slotsData.slots && _this.models.slotsData.slots[disableDates[i]]) {
						disableDate = false;
					}
					break;
				}
			}
		}


		return disableDate;
	};

	beWidget.prototype.rentCallback = function () {
		let slots = Object.values(_this.models.slotsData.slots)[0];
		_this.models.enabledSlots = [];

		if (_this.models.selectedSlot && _this.models.selectedSlot.timestamp && slots && slots.length && !_this.models.lastSlotTimestamp) {
			for (let i = 0; i < slots.length - 1; i++) {
				if (_this.models.selectedSlot.timestamp < slots[i].timestamp) {
					if ((_this.models.enabledSlots[_this.models.enabledSlots.length - 1] + (60 * slots[i - 1].duration)) == slots[i].timestamp) {
						_this.models.enabledSlots.push(slots[i].timestamp);
					} else {
						_this.models.lastSlotTimestamp = slots[i].timestamp;
						break;
					}
				} else if (_this.models.selectedSlot.timestamp == slots[i].timestamp) {
					_this.models.enabledSlots.push(slots[i].timestamp);
				}
			}
		}
	}

	beWidget.prototype.getAvailability = function (params, selector) {
		if (_this.options.bcWidgetType == 1) {
			if (_this.models.unitDays) {
				params = Object.assign(params, {
					days: _this.models.unitDays.days,
					token: _this.options.token
				});
			} else {
				params = Object.assign(params, {
					token: _this.options.token
				});
			}
		} else {
			if (_this.models.unitDays) {
				params = Object.assign(params, {
					days: _this.models.unitDays.days
				});
			}
			if (_this.options.currentBookingId) {
				params['bookingId'] = _this.options.currentBookingId;
			}
		}

		let request = new Request(
			_this.getUrl(_this.options.requestAvailabilityUrl, params), {
			method: "GET"
		}
		);

		_this.fetch(request, "json").then(function (response) {
			if (response) {
				_this.models.isSetTimeoutCall = true;

				if (validation().defined(response)) {
					if (validation().defined(response.next) && response.next) {
						let minDate = new Date(nInbuilt().converToValidDate(response.next));

						let newparams = {
							id: _this.models.bookingProduct.id,
							month: minDate.getMonth() + 1,
							year: minDate.getFullYear()
						};
						_this.models.lastMonth = newparams.month;

						_this.datePicker.setOption({
							min: response.next,
							isAvailable: response
						});

						setTimeout(() => {
							_this.getAvailability(newparams, selector);
						}, 1000);
						return;
					} else if (response.available || response.unavailable) {
						let opt = {
							min: new Date(),
							isAvailable: response
						};
						if (response.available) {

							opt.min = new Date(
								params["month"] +
								"/" +
								response.available[0] +
								"/" +
								params["year"]
							);
						}
						if (_this.isRangeType()) {
							let disableDate = false;
							if (response.unavailable) {
								selector = selector || _this.models.firstCalendar.selector;
								_this.models.secondCalendar.disableDates = response.unavailable;
								if (selector == _this.models.firstCalendar.selector) {
									// _this.models.secondCalendar.maxDate = disableDate = "";
									_this.models.firstCalendar.isAvailable = response;
									if (!_this.models.selectedSlot)
										_this.models.secondCalendar.isAvailable = response;
									_this.models.firstCalendar.disableDates =
										response.unavailable;
								} else if (
									selector == _this.models.secondCalendar.selector &&
									// _this.models.selectedSlot &&
									!_this.models.secondCalendar.maxDate
								) {
									if (!_this.isDayType() || _this.models.selectedSlot) {
										let date = new Date(nInbuilt().converToValidDate(_this.models.selectedSlot.js));
										opt.min =
											new Date(
												date.getFullYear(),
												date.getMonth(),
												date.getDate() + (_this.isDayType() ? 1 : 0)
											) || opt.min;

										if (_this.models.unitDays) {
											let maxDate = new Date(date.getTime());
											maxDate.setDate(maxDate.getDate() + _this.models.unitDays.days - 1);
											disableDate = _this.models.secondCalendar.minDate = _this.models.secondCalendar.maxDate = maxDate;
										} else {
											disableDate = _this.findNextDisableDate(new Date(nInbuilt().converToValidDate(_this.models.selectedSlot.js)), selector);
											_this.models.secondCalendar.maxDate = disableDate ?
												disableDate :
												"";
										}

									}
								} else if (
									selector == _this.models.secondCalendar.selector &&
									// _this.models.selectedSlot &&
									_this.models.secondCalendar.maxDate
								) {
									if (!_this.isDayType() || _this.models.selectedSlot) {
										let date = new Date(nInbuilt().converToValidDate(_this.models.selectedSlot.js));
										opt.min =
											new Date(
												date.getFullYear(),
												date.getMonth(),
												date.getDate()
												//by vasu
												//date.getDate() + (_this.isDayType() ? 1 : 0)
											) || opt.min;


										if (_this.models.unitDays) {
											let maxDate = new Date(date.getTime());
											maxDate.setDate(maxDate.getDate() + _this.models.unitDays.days - 1);
											disableDate = maxDate;
										} else {
											disableDate = _this.findNextDisableDate(opt.min, _this.models.secondCalendar.selector);
										}
									}
								}

								if (disableDate) {
									opt.max = disableDate;
									if (_this.models.unitDays) {
										opt.min = opt.max;
									}
								}
							}
						}

						_this.datePicker.setOption(opt);
					}
					if (_this.isDayType())
						_this.getBookingSlots({
							start: params["year"] + "-" + params["month"] + "-01"
						});
					_this.models.isSetTimeoutCall = false;
				}
				if (_this.models.unitDays && selector == '.wk-datepicker') {
					_document.querySelectorAll('button:not(.dp-day-disabled).dp-day').forEach((elementRef) => {
						elementRef.addEventListener('mouseenter', event => {
							let element = event.srcElement;
							for (let i = 0; i < _this.models.unitDays.days; i++) {
								if (element) {
									element.classList.add('wk_range_calender');
									element = element.nextElementSibling;
								}
							}
						})
						elementRef.addEventListener('mouseleave', e => {
							let element = event.srcElement;
							for (let i = 0; i < _this.models.unitDays.days; i++) {
								if (element) {
									element.classList.remove('wk_range_calender');
									element = element.nextElementSibling;
								}
							}
						})
					})
				}
			}
		});
	};

	beWidget.prototype.toggleDatePicker = function (event) {
		event.target.parentElement.classList.toggle("open");
	};

	beWidget.prototype.isValid = function (stepCode) {
		var stepFields = _this.models.fields[stepCode];
		var errorMessageElements = _document.getElementsByClassName(
			"error-message"
		);
		for (var k = errorMessageElements.length - 1; k >= 0; k--) {
			var parent = errorMessageElements[k].parentNode;
			parent.classList.remove("has-error");
			parent.removeChild(errorMessageElements[k]);
		}
		var isValid = true;
		//by prakhar
		if (_this.models.selectedSlot)
			if (!_this.models.bookingProduct.customerLimit && !_this.models.bookingProduct.mincustomerLimit && !_this.models.bookingProduct.maxcustomerLimit) {
				delete _this.models.fields.slot.guests.shouldLessThanOrEqualValue;
				delete _this.models.fields.slot.guests.shouldGreaterThanOrEqualValue;
				$("[name='guests']").attr("max", "");
				$("[name='guests']").attr("min", 1);
			} else {
				if (!_this.models.bookingProduct.customerLimit && !_this.models.bookingProduct.maxcustomerLimit) {
					delete _this.models.fields.slot.guests.shouldLessThanOrEqualValue;
					$("[name='guests']").attr("max", "");
				} else {
					_this.models.fields.slot.guests.shouldLessThanOrEqualValue = _this.models.selectedSlot.availability
					$("[name='guests']").attr("max", _this.models.bookingProduct.maxcustomerLimit);
				}

				if (_this.models.bookingProduct.mincustomerLimit == 0 || _document.forms["wk-booking-form"].elements["guests"].value == 0 || _this.$('#form_reschedule')) {
					delete _this.models.fields.slot.guests.shouldGreaterThanOrEqualValue;
					$("[name='guests']").attr("min", 1);
				} else if (_this.models.bookingProduct.customerLimit && _this.models.bookingProduct.allowLessThanMin && _this.models.bookingProduct.mincustomerLimit > _this.models.selectedSlot.availability) {
					_this.models.fields.slot.guests.shouldGreaterThanOrEqualValue = 1
					$("[name='guests']").attr("min", 1);
					// $("[name='guests']").val()datepicker-input.setAttribute("value",1);
					// $("[name='guests']").val()wk-datepicker-input.setAttribute("value",1);
				} else {
					_this.models.fields.slot.guests.shouldGreaterThanOrEqualValue = _this.models.bookingProduct.mincustomerLimit
					_this.models.fields.slot.guests.value = _this.models.bookingProduct.mincustomerLimit
					$("[name='guests']").attr("min", _this.models.bookingProduct.mincustomerLimit);
				}
			}

		for (var field in stepFields) {
			if (field != "customerFields") {
				var value = _document.forms["wk-booking-form"][
					field
				].value.trim();

				if (_this.isDayType() && ["timestamp", "tstamp"].indexOf(field) > -1)
					continue;
				if (
					_this.isFixedType() && ["wk-datepicker-input", "wk-datepicker-2-input", "tstamp"].indexOf(field) >
					-1
				)
					continue;
				if (
					_this.isDayDateType() && ["wk-datepicker-2-input", "tstamp"].indexOf(field) > -1
				)
					continue;
				// if (field == 'guests') {

				// 	if (value && _this.models.selectedSlot && value > _this.models.selectedSlot.availability) {
				// 		isValid = false;
				// 		_this.addErrorMessage("invalidGuest", field);
				// 	}
				// }
				stepFields[field]["validations"].forEach(function (validationRule) {
					let validationValue;
					if (validationRule == "shouldLessThanOrEqualValue")
						validationValue = stepFields[field].shouldLessThanOrEqualValue;
					else
						validationValue = stepFields[field].shouldGreaterThanOrEqualValue;

					if (isValid && validation()[validationRule](value, validationValue)) {
						_this.addErrorMessage(validationRule, field);
						isValid = false;
					}

				});
			} else {
				if (_this.options.bcWidgetType == 1) {
					for (var customerField in stepFields[field]) {
						
						var value = _document.forms["wk-booking-form"][customerField].value.trim();
						if(stepFields[field][customerField]['type'] == "Choice"){
							if(_document.forms["wk-booking-form"][customerField].length){
								value = [];
								let fieldVal = [];
								_document.forms["wk-booking-form"][customerField].forEach(function (ele,index){
									value.push(ele.checked);
									if (ele.checked !== false)
										fieldVal.push(stepFields[field][customerField]["options"][index]);
								});
								value = stepFields[field][customerField].value = fieldVal.join();
							} else {
								value = stepFields[field][customerField].value = (_document.forms["wk-booking-form"][customerField].checked) ? stepFields[field][customerField]["options"][0] : "";
							}
						}
						stepFields[field][customerField]["validations"].forEach(function (
							validationRule
						) {
							if (validation()[validationRule](value)) {
								_this.addErrorMessage(validationRule, customerField);
								isValid = false;
							}
						});
					}
				}
			}
		}

		return isValid;
	};

	beWidget.prototype.addErrorMessage = function (validation, field) {
		var errorMessageElement = document.createElement("div");
		errorMessageElement.classList.add("error-message");
		errorMessageElement.innerText = _this.validationErrorMessage[validation];

		if (validation == 'shouldLessThanOrEqualValue') {
			if (_this.models.bookingProduct.mincustomerLimit != 0)
				errorMessageElement.innerText += (` (${_this.validationErrorMessage.maxLimit}  ${_this.models.fields.slot.guests.shouldLessThanOrEqualValue})`);
			// errorMessageElement.innerText +=  (" (".concat(_this.validationErrorMessage.maxLimit, "  ").concat(_this.models.fields.slot.guests.shouldLessThanOrEqualValue, ")"));
			else
				errorMessageElement.innerText += (` (${_this.validationErrorMessage.guestLimit}  ${_this.models.fields.slot.guests.shouldLessThanOrEqualValue})`);
			// errorMessageElement.innerText +=  (" (".concat(_this.validationErrorMessage.guestLimit, "  ").concat(_this.models.fields.slot.guests.shouldLessThanOrEqualValue, ")"));
		}
		if (validation == 'shouldGreaterThanOrEqualValue')
			errorMessageElement.innerText += (` (${_this.validationErrorMessage.minLimit}  ${_this.models.fields.slot.guests.shouldGreaterThanOrEqualValue})`);
		// errorMessageElement.innerText +=  (" (".concat(_this.validationErrorMessage.minLimit, "  ").concat(_this.models.fields.slot.guests.shouldGreaterThanOrEqualValue, ")"));
		if(!_this.$('.wk-form-control[name="' + field + '"]')){
			_this
				.$('[name="' + field + '"]')
				.parentElement.parentElement.parentElement.classList.add("has-error");
			_this
				.$('[name="' + field + '"]')
				.parentElement.parentElement.parentElement.appendChild(errorMessageElement);
		} else {
			_this
				.$('.wk-form-control[name="' + field + '"]')
				.parentElement.classList.add("has-error");
			_this
				.$('.wk-form-control[name="' + field + '"]')
				.parentElement.appendChild(errorMessageElement);
		}
	};

	beWidget.prototype.getFinalFormValues = function () {
		var form = _document.forms["wk-booking-form"];
		var data = {};
		data["timezone"] = form.elements["timezone"].value;

		data["guests"] = form.elements["guests"] ? form.elements["guests"].value : 1;

		_this.models.selectedSlot.guests = data["guests"];
		_this.models.selectedSlot.id = _this.models.bookingProduct.id;
		_this.models.selectedSlot.path = _this.models.bookingProduct.path;
		_this.models.selectedSlot.timezone = data["timezone"];
		switch (_this.models.bookingProduct.bookingConfigurationType) {
			case BookingConfigurationType.DaySlot:
				_this.models.selectedSlot.duration--;
				data["quantity"] = data["guests"];
				break;
			case BookingConfigurationType.RangeDate:
				_this.models.selectedSlot.duration--;
				if (_this.models.selectedSlotQuantity) {
					data["quantity"] = this.models.selectedSlotQuantity;
				} else {
					if (_this.models.unitDays) {
						data["quantity"] = _this.models.unitDays.units;
					} else {
						data["quantity"] = _this.dateDiffInDays(_this.models.selectedSlot.from, _this.models.selectedSlot.to) / 1440;
					}
				}
				data["quantity"] = data["quantity"] * data["guests"];
				break;
			case BookingConfigurationType.RangeDateTime:
				if (_this.models.selectedSlotQuantity) {
					data["quantity"] = this.models.selectedSlotQuantity;
				}
				else {
					data["quantity"] = Math.floor(_this.dateDiffInDays(_this.models.selectedSlot.from, _this.models.selectedSlot.to) / _this.models.bookingProduct.basicSlot.bookingTimeMinutes);
				}
				data["quantity"] = data["quantity"] * data["guests"];
				break;
			default:
				data["quantity"] = data["guests"];
				break;
		}
		data.products = [_this.models.selectedSlot];

		data["slot"] = [];
		data["slot"]["customerFields"] = {};
		for (var customerFieldName in _this.models.fields["slot"]["customerFields"]) {

			if (_this.models.fields["slot"]["customerFields"][customerFieldName]['type'] == "Choice") {
				data["slot"]["customerFields"][customerFieldName] = _this.models.fields["slot"]["customerFields"][customerFieldName].value.replace(/"/g, "'");
			} else {
				data["slot"]["customerFields"][customerFieldName] = form.elements[customerFieldName].value;
			}
		}

		return data;
	};

	beWidget.prototype.getBookingPrice = function (params) {
		if (_this.options.bcWidgetType == 1) {
			if (_this.models.unitDays) {
				params = Object.assign(params, {
					units: _this.models.unitDays.units,
					token: _this.options.token
				});
			} else {
				params = Object.assign(params, {
					token: _this.options.token
				});
			}
		} else {
			if (_this.models.unitDays) {
				params = Object.assign(params, {
					units: _this.models.unitDays.units
				});
			}
		}

		let request = new Request(_this.getUrl(this.options.requestBookingPrice, params), {
			method: "GET"
		});

		_this.fetch(request, "json").then(function (response) {
			if (response) {
				_this.models.selectedSlotQuantity = response.rangeSlots
				if (_this.$('#bc_units')) {
					_this.$('#bc_units').value = response.rangeSlots;
				}
				if (_this.$(_this.options.bookingButtonSelector))
					_this.$(_this.options.bookingButtonSelector).removeAttribute('disabled');
				else
					_this.$(`#${_this.options.bookingButtonId}`).removeAttribute('disabled');
				// _this.$("#".concat(_this.options.bookingButtonId)).removeAttribute('disabled');

			}

		});
	};
	beWidget.prototype.renderErrorMessage = function (response) {
		var notificationElement = document.createElement("div");
		notificationElement.classList.add("notification");
		if (response.success) {
			notificationElement.classList.add("success");
		} else {
			notificationElement.classList.add("error");
		}

		notificationElement.innerHTML =
			response.message + '<span class="close-btn">X</span>';

		_this.$("body").prepend(notificationElement);
	};


	beWidget.prototype.setTimeZones = function () {
		_this.models.currentTimezone = moment.tz.guess();
		if (_this.models.currentTimezone == 'Asia/Calcutta')
			_this.models.currentTimezone = 'Asia/Kolkata';
		moment.tz.names().forEach((value, index) => {
			_this.models.timeZones.push({
				label: value,
				value: value
			});
		});
	};

	beWidget.prototype.shopifyBooking = function (e) {

		if (e.srcElement.style.visibility == "hidden" && window.location.href.indexOf('malou-media') == -1) {
			e.preventDefault();
			return;
		}
		e.srcElement.style.visibility = "hidden";

		_this.$("#wk-lockInfo").innerHTML = "";
		if (_this.isValid('slot')) {
			var data = _this.getFinalFormValues();
			let options = {};
			let slotDate = data.products[0].date.split('/');
			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			if (slotDate.length > 1) {
				let date = slotDate[0] + " " + months[slotDate[1] - 1] + " " + slotDate[2];
				data.products[0].date = date;
			}

			if (_this.models.bookingProduct.bookingConfigurationType == "range_date_slots") {
				data.products[0].from = data.products[0].from.split(' ')[0];
				data.products[0].to = data.products[0].to.split(' ')[0];
			}
			if (_this.options.bcWidgetType == 1 && !(_this.models.bookingProduct.bookingType == 'multi' && !_this.models.bookingProduct.maxcustomerLimit && !_this.models.bookingProduct.mincustomerLimit && !_this.models.bookingProduct.customerLimit)) {

				options['date'] = data.products[0].date;
				options['start'] = data.products[0].from;
				options['end'] = data.products[0].to
				options['timestamp'] = data.products[0].timestamp
				options['duration'] = data.products[0].duration
				options['guests'] = data.guests
				options['path'] = _this.models.bookingProduct.path
				options['timezone'] = data.timezone

				let json = _this.checkCartAvailability(e, options);
				if (json) {
					if (json['success']) {
						options['hash'] = json['hash'] || '';

						if (json['expireOn']) {
							options['expireOn'] = json['expireOn'];
						}
					} else {
						if (json['message']) {
							let message = '';
							if (json['message'] == 'This slot is not available, please try another time slot.') {
								message = _this.options.bookingLabels && _this.options.bookingLabels.label_71 ? _this.options.bookingLabels.label_71 : json['message'];
							} else {
								message = _this.options.bookingLabels && _this.options.bookingLabels.label_72 ? _this.options.bookingLabels.label_72.replace("%qty%", json['availableSlot']) : json[message];
							}
							_this.$("#wk-lockInfo").innerHTML = message;
						}
						e.preventDefault();
						(async (el) => {
							setTimeout(() => {
								el.style.visibility = "visible";
							}, 200);
						})(e.srcElement);
						return;
					}
				}
			}

			if (_this.models.bookingProduct.bookingConfigurationType == BookingConfigurationType.FixedDateTime || _this.models.bookingProduct.bookingConfigurationType == BookingConfigurationType.FixedDate) {
				_this.$('input[name="properties[wk_booking][slot_date]"]').value = data.products[0].date;
				_this.$('input[name="properties[wk_booking][from]"]').value = _this.slotLabelFormatFixedType(data.products[0].from);
				_this.$('input[name="properties[wk_booking][to]"]').value = _this.slotLabelFormatFixedType(data.products[0].to);
			} else if (_this.models.bookingProduct.bookingConfigurationType == BookingConfigurationType.RangeDateTime) {
				_this.$('input[name="properties[wk_booking][slot_date]"]').value = data.products[0].date;
				_this.$('input[name="properties[wk_booking][from]"]').value = _this.options.slotTimeFormat && _this.options.slotTimeFormat == 24 ? moment(new Date(data.products[0].from)).format(_this.options.dateFormat + ' HH:mm') : moment(new Date(data.products[0].from)).format(_this.options.dateFormat + ' hh:mm A');
				_this.$('input[name="properties[wk_booking][to]"]').value = _this.options.slotTimeFormat && _this.options.slotTimeFormat == 24 ? moment(new Date(data.products[0].to)).format(_this.options.dateFormat + ' HH:mm') : moment(new Date(data.products[0].to)).format(_this.options.dateFormat + ' hh:mm A');
			} else if (_this.models.bookingProduct.bookingConfigurationType == BookingConfigurationType.RangeDate) {
				_this.$('input[name="properties[wk_booking][slot_date]"]').value = data.products[0].date;
				let tempFrom = new Date(data.products[0].from.replace(/-/g, '/') + " 00:00:00");
				let tempTo = new Date(data.products[0].to.replace(/-/g, '/') + " 00:00:00");
				_this.$('input[name="properties[wk_booking][from]"]').value = moment(tempFrom).format(_this.options.dateFormat);
				_this.$('input[name="properties[wk_booking][to]"]').value = moment(tempTo).format(_this.options.dateFormat);
			} else {
				let tempDate = new Date(data.products[0].date.replace(/-/g, '/') + " 00:00:00");
				_this.$('input[name="properties[wk_booking][slot_date]"]').value = moment(tempDate).format(_this.options.dateFormat);
				_this.$('input[name="properties[wk_booking][from]"]').value = _this.slotLabelFormat(data.products[0].from);
				_this.$('input[name="properties[wk_booking][to]"]').value = _this.slotLabelFormat(data.products[0].to);
			}

			_this.$('input[name="properties[wk_booking][timestamp]"]').value = data.products[0].timestamp;
			_this.$('input[name="properties[wk_booking][timezone]"]').value = data.timezone;

			let hashElement = document.createElement("input");
			hashElement.setAttribute("name", "properties[wk_booking][hash]");
			hashElement.setAttribute("value", options['hash'] || '');
			hashElement.setAttribute("type", "hidden");
			_this.$('input[name="quantity"]').parentElement.appendChild(hashElement);

			if (options && options['expireOn']) {

				let expireOnElement = document.createElement("input");
				expireOnElement.setAttribute("name", "properties[wk_booking][expireOn]");
				expireOnElement.setAttribute("value", options['expireOn']);
				expireOnElement.setAttribute("type", "hidden");
				_this.$('input[name="quantity"]').parentElement.appendChild(expireOnElement);

				let lockInfoLabelElement = document.createElement("input");
				lockInfoLabelElement.setAttribute("name", "properties[wk_booking][label_lock_info]");
				lockInfoLabelElement.setAttribute("value", _this.models.lockInfoLabel);
				lockInfoLabelElement.setAttribute("type", "hidden");
				_this.$('input[name="quantity"]').parentElement.appendChild(lockInfoLabelElement);
			}

			let bookingConfigurationTypeElement = document.createElement("input");
			bookingConfigurationTypeElement.setAttribute("name", "properties[wk_booking][BookingConfigurationType]");
			bookingConfigurationTypeElement.setAttribute("value", _this.models.bookingProduct.bookingConfigurationType);
			bookingConfigurationTypeElement.setAttribute("type", "hidden");
			_this.$('input[name="quantity"]').parentElement.appendChild(bookingConfigurationTypeElement);

			let labelSlotDateElement = document.createElement("input");
			labelSlotDateElement.setAttribute("name", "properties[wk_booking][label_slot_date]");
			labelSlotDateElement.setAttribute("value", _this.models.slotDate);
			labelSlotDateElement.setAttribute("type", "hidden");
			_this.$('input[name="quantity"]').parentElement.appendChild(labelSlotDateElement);

			let labelSlotTimeElement = document.createElement("input");
			labelSlotTimeElement.setAttribute("name", "properties[wk_booking][label_slot_time]");
			labelSlotTimeElement.setAttribute("value", _this.models.slotTime);
			labelSlotTimeElement.setAttribute("type", "hidden");
			_this.$('input[name="quantity"]').parentElement.appendChild(labelSlotTimeElement);

			let durationFiledElement = document.createElement("input");
			durationFiledElement.setAttribute("name", "properties[wk_booking][duration]");
			durationFiledElement.setAttribute("value", data.products[0].duration);
			durationFiledElement.setAttribute("type", "hidden");
			_this.$('input[name="quantity"]').parentElement.appendChild(durationFiledElement);


			let customerFiledElement = document.createElement("input");
			customerFiledElement.setAttribute("name", "properties[wk_booking][guest]");
			customerFiledElement.setAttribute("value", data.guests);
			customerFiledElement.setAttribute("type", "hidden");

			_this.$('input[name="quantity"]').parentElement.appendChild(customerFiledElement);
			if (window.location.href.indexOf('sabattusdiscgolf.com') == -1 && window.location.href.indexOf('sonsohires.com') == -1)
				_this.$('input[name="quantity"]').value = _this.options.bcWidgetType == 1 ? data.quantity : _this.$('input[name="guest"]').getAttribute('value');
			if (_this.options.bcWidgetType == 1) {
				if (data.slot.customerFields) {
					for (let key in data.slot.customerFields) {
						let customerFiledElement = document.createElement("input");
						customerFiledElement.setAttribute("name", "properties[wk_booking][customer_fields[" + key + "]]");
						customerFiledElement.setAttribute("value", data.slot.customerFields[key]);
						customerFiledElement.setAttribute("type", "hidden");

						_this.$('input[name="quantity"]').parentElement.appendChild(customerFiledElement);

					}
				}
			}
			else {
				bkObj.bookingReschduleClick()
			}
		}
		else {
			e.preventDefault();
		}

		(async (el) => {
			setTimeout(() => {
				el.style.visibility = "visible";
			}, 200);
		})(e.srcElement);
	}

	beWidget.prototype.checkCartAvailability = function (event, data) {


		let storeOrigin = location.origin;

		let bookingSlot = _this.models.bookingProduct;

		let guests = parseInt('' + data['guests']);

		let cartResponse = _this.synchronousRequest(storeOrigin + '/cart.json', 'GET', null, true);

		let cart = JSON.parse(cartResponse.response);
		let matchedCartItemIndex = [];
		let matchedHash = [];

		if (cart && cart.items && cart.items.length && guests) {

			_this.options.token = cart.token;

			let lineItems = cart.items;

			let from = new Date(data['start']);

			let to = new Date(data['end']);

			if (bookingSlot.bookingtype == 'single' && bookingSlot.bookingConfigurationType != 'rent_slots') {
				to.setHours(23, 59, 59);
			} else if (bookingSlot.bookingConfigurationType == 'rent_slots' && moment(to).format("hh:mm A") == '12:00 AM') {
				to.setHours(23, 59, 59);
			}

			lineItems.forEach((lineItem, index) => {

				if (!lineItem)
					return;

				matchedCartItemIndex.push(lineItem.quantity || 0);

				if (lineItem.variant_id == bookingSlot.path)

					if (lineItem.properties && lineItem.properties.wk_booking) {

						let slot = lineItem.properties.wk_booking;
						let tempFrom = new Date(slot.from);
						let tempTo = new Date(slot.to);

						if (slot.BookingConfigurationType == "rent_slots") {
							if (moment(tempTo).format("hh:mm A") == '12:00 AM') {
								tempTo.setHours(23, 59, 59);
							}
							if (!((from.getTime() < tempFrom.getTime() && to.getTime() <= tempFrom.getTime()) || (from.getTime() >= tempTo.getTime() && to.getTime() > tempTo.getTime()))) {

								matchedCartItemIndex[index] = 0;
								guests = 1;
								if (slot.hash && slot.hash != '') {
									matchedHash.push(slot.hash);
								}

							}

						} else if (slot.BookingConfigurationType == 'range_date_slots') {
							tempTo.setHours(23, 59, 59);
							if (!((from.getTime() < tempFrom.getTime() && to.getTime() < tempFrom.getTime()) || (tempTo.getTime() < from.getTime() && tempTo.getTime() < to.getTime()))) {

								matchedCartItemIndex[index] = 0;
								guests = 1;

								if (slot.hash && slot.hash != '') {
									matchedHash.push(slot.hash);
								}

							}

						} else {
							if (slot['timestamp'] == data['timestamp']) {

								matchedCartItemIndex[index] = 0;
								if (slot.hash && slot.hash != '') {
									matchedHash.push(slot.hash);
								}

							}
						}

					}
			});
		}

		_this.getServerDateTimeFormat();
		if (guests) {
			let response = _this.synchronousRequest(_this.getUrl('/api/cart-lock', {}), 'POST', {
				timestamp: data.timestamp,
				duration: data.duration,
				path: bookingSlot.path,
				guests: guests,
				hash: matchedHash,
				token: cart.token,
				timezone: data.timezone,
				format: this.options.serverDateTimeFormat
			}, false);

			if (response) {
				let json = JSON.parse(response.response);

				if (json && json.success) {
					_this.synchronousRequest(storeOrigin + '/cart/update.js', 'POST', { updates: matchedCartItemIndex }, true);
				}
				return json
			}
		}
		return false;
	}

	beWidget.prototype.getServerDateTimeFormat = function () {
		let dateFormat = _this.options.dateFormat;
		let serverTimeFormat = dateFormat.replace(/M/g, "A").replace(/AAAA/g, "F").replace(/AAA/g, "M").replace(/AA/g, "m").replace(/A/g, "n").replace(/YYYY/g, "Y").replace(/YY/g, "y").replace(/DD/g, "B").replace(/D/g, "j").replace(/dddd/g, "l").replace(/do/g, "S").replace(/d/g, "w").replace(/B/g, "d");

		let timeformat = (_this.options.slotTimeFormat == 12) ? " h:i:s A" : " H:i:s";
		_this.options.serverDateTimeFormat = serverTimeFormat + timeformat;
	}

	beWidget.prototype.synchronousRequest = function(url, method, data, header) {
		if(typeof url != "string")
		    url = url.href;
		if (data){
			data = JSON.stringify(data);
		}
		let request = new XMLHttpRequest();
		request.open(method, url, false);
		if (header) {
			request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			request.setRequestHeader('Content-Type', 'application/json');
		}
		request.send(data);
		return request;
	}

	beWidget.prototype.bindEvents = function () {
		_this._document = _document;

		_this.loadScript(_this.options.datePickerUrl, function () { });
		_this.loadScript(_this.options.moment, function () {
			_this.loadScript(_this.options["moment-timezone"], function () {
				_this.loadScript(_this.options["moment-timezone-data"], function () {
					_this.setTimeZones();
					_this.loadScript(_this.options.fetchUrl, function () {
						_this.getBookingProductItem(null, _this.options.bookingProductPath);

					});
				});
			});
		});
		_this.nEventHandler(
			"click",
			_this.selector.DATE_PICKER_INPUT,
			_this.toggleDatePicker,
			"CLASS"
		);
		_this.nEventHandler(
			"click",
			_this.selector.WIDGET,
			function (event) {
				if (
					_this.$(".wk-datepicker") &&
					!event.target.classList.contains("wk-datepicker-input")
				) {
					// _this.$(".wk-datepicker").classList.remove("open");
				}

				if (
					_this.$(".wk-datepicker-2") &&
					!event.target.classList.contains("wk-datepicker-2-input")
				) {
					// _this.$(".wk-datepicker-2").classList.remove("open");
				}
			},
			"CLASS"
		);
		_this.nEventHandler(
			"change",
			_this.selector.TIME_ZONE_SELECT,
			function (event) {
				_this.getBookingSlots({});
			},
			"CLASS"
		);
		_this.nEventHandler(
			"change",
			_this.selector.TIME_SLOT_SELECT,
			function (event) {

				if (_this.isRangeType()) {
					let slot = event.target.value ?
						JSON.parse(event.target.value) :
						false;

					if (!slot) {
						_this.models.selectedSlot = false;
						return;
					}

					if (_this.models.selectedSlot) {
						delete slot.to;
						_this.models.selectedSlot = Object.assign(
							_this.models.selectedSlot,
							slot
						);
					} else {
						_this.models.selectedSlot = slot;
					}

					if (_this.models.bookingProduct.bookingConfigurationType == 'rent_slots')
						_this.models.selectedSlot.from = slot.dateCalendar.replace(/-/g, '/') + " " + slot.from;
					else
						_this.models.selectedSlot.from = slot.dateCalendar + " " + slot.from;

					_this.models.selectedSlot.rentFirst = true;

					if (_this.models.selectedSlot.rentSecond) {
						if (
							_this.models.selectedSlot.timestamp >=
							_this.models.selectedSlot.rentSecond.timestamp
						) {
							_this.models.dateValue = "";
							_this.$(_this.models.secondCalendar.selector).value = '';
							_this.$("." + _this.selector.TIME_SLOT_SELECT_2).innerHTML = "";
							// _this.$('.' + _this.models.TIME_SLOT_SELECT_2).value = "";
							delete _this.models.selectedSlot.rentSecond;
						}
					} else {
						_this.models.dateValue = "";
						_this.models.lastSlotTimestamp = 0;
						_this.rentCallback();
						_this.$(_this.models.secondCalendar.selector).value = '';
						_this.$("." + _this.selector.TIME_SLOT_SELECT_2).innerHTML = "";
					}

					_this.models.selectedSlot.duration =
						_this.dateDiffInDaysTimeZoneBased(
							_this.models.selectedSlot
						) - 1;
				} else {
					_this.models.selectedSlot = event.target.value ?
						JSON.parse(event.target.value) :
						false;
				}

				// by prakhar
				if (_this.models.bookingProduct.mincustomerLimit == 0 || !_this.models.selectedSlot) {
					//do nothing
				} else if ((_this.models.bookingProduct.allowLessThanMin && _this.models.bookingProduct.mincustomerLimit > _this.models.selectedSlot.availability) && _this.models.bookingProduct.customerLimit != 0) {
					$("[name='guests']").val(1);
					if (_this.$('#form_reschedule'))
						$("[name='availability'").val(_this.models.selectedSlot.availability);
				} else {
					$("[name='guests']").val(_this.models.bookingProduct.mincustomerLimit);
					if (_this.$('#form_reschedule'))
						$("[name='availability'").val(_this.models.selectedSlot.availability);
				}
			},
			"CLASS"
		);
		_this.nEventHandler(
			"change",
			_this.selector.TIME_SLOT_SELECT_2,
			function (event) {
				if (_this.isRangeType()) {
					let slot = event.target.value ?
						JSON.parse(event.target.value) :
						false;

					if (!slot) {
						delete _this.models.selectedSlot.rentSecond;
						return;
					}

					if (!_this.models.selectedSlot) {
						_this.models.selectedSlot = slot;
						_this.models.selectedSlot.rentFirst = false;
					}
					_this.models.selectedSlot.rentSecond = slot;

					if (_this.models.bookingProduct.bookingConfigurationType == 'rent_slots')
						_this.models.selectedSlot.to = slot.dateCalendar.replace(/-/g, '/') + " " + slot.to;
					else
						_this.models.selectedSlot.to = slot.dateCalendar + " " + slot.to;

					_this.models.selectedSlot.duration =
						_this.dateDiffInDaysTimeZoneBased(
							_this.models.selectedSlot
						) - 1;
					let getPricingParams = Object.assign({
						id: _this.models.bookingProduct.id,
					}, _this.models.selectedSlot);

					if (_this.$(_this.options.bookingButtonSelector))
						_this.$(_this.options.bookingButtonSelector).setAttribute('disabled', 'disabled');
					else
						_this.$(`#${_this.options.bookingButtonId}`).setAttribute('disabled', 'disabled');
					// _this.$("#".concat(_this.options.bookingButtonId)).setAttribute('disabled','disabled');

					_this.getBookingPrice(getPricingParams);
				}
			},
			"CLASS"
		);

		if (_this.$(_this.options.bookingButtonSelector)) {
			if (_this.options.bookingButtonSelector.indexOf("#") != -1)
				_this.nEventHandler(
					"click",
					_this.options.bookingButtonSelector.slice(_this.options.bookingButtonSelector.indexOf('#') + 1),
					function (e) {
						_this.shopifyBooking(e);
					},
					"ID"
				);
			else if (_this.options.bookingButtonSelector.indexOf(".") != -1)
				_this.nEventHandler(
					"click",
					_this.options.bookingButtonSelector.slice(_this.options.bookingButtonSelector.indexOf('.') + 1),
					function (e) {
						_this.shopifyBooking(e);
					},
					"CLASS"
				);
			else if (_this.options.bookingButtonSelector.indexOf("name") != -1)
				_this.nEventHandler(
					"click",
					_this.options.bookingButtonSelector.slice(_this.options.bookingButtonSelector.indexOf('"') + 1, _this.options.bookingButtonSelector.lastIndexOf('"')),
					function (e) {
						_this.shopifyBooking(e);
					},
					"NAME"
				);
		} else {
			_this.nEventHandler(
				"click",
				_this.options.bookingButtonId,
				function (e) {
					_this.shopifyBooking(e);
				},
				"ID"
			);
		}

		// _this.nEventHandler(
		// 	"click",
		// 	_this.options.buyNowButtonClass,
		// 	function (e) {
		// 		_this.shopifyBooking(e);
		// 	},
		// 	"CLASS"
		// )
	};

	beWidget.prototype.getUrl = function (url, data) {
		if (!validation().defined(data)) data = {};

		if (!url) return;
		var requestUrl = new URL(_this.options.baseurl + url);
		Object.keys(data).forEach(function (key) {
			requestUrl.search = requestUrl.search ?
				requestUrl.search + "&" + key + "=" + data[key] :
				"?" + key + "=" + data[key];
		});

		return requestUrl;
	};

	beWidget.prototype.fetch = function (request, responseType) {
		if (!validation().defined(responseType)) responseType = false;
		if (typeof request != "string" && request.method == "GET" && window.location.href.indexOf('ucebo') != -1)
			request = request.url;
		return fetch(request)
			.then(function (response) {
				if (response.ok == false) {
					// _this.renderErrorMessage({
					// 	success: false,
					// 	message: "Opps! Something went wrong, try again later."
					// });
					// $(_this.options.wrapper).remove();
					_this.options.wrapper.innerHTML = "";
					return false;
				}

				var contentType = response.headers.get("content-type");
				if (contentType) {
					// && contentType.indexOf("application/json") !== -1) {
					switch (responseType) {
						case "json":
							return response.json();
						case "text":
							return response.text();
						case "html":
							return response.html();
						default:
							return response;
					}
				} else {
					// _this.renderErrorMessage({
					// 	success: false,
					// 	message: "Opps! Something went wrong, try again later."
					// });
					_this.options.wrapper.innerHTML = "";
					return false;
				}
			})
			.catch(function (error) {
				// _this.renderErrorMessage({
				// 	success: false,
				// 	message: "Opps! Something went wrong, try again later."
				// });
				_this.options.wrapper.innerHTML = "";
			});
	};
	// beWidget.prototype.slotLabelFormatFixedType2 = (time) => {
	// 	if (time && _this.options.slotTimeFormat && _this.options.slotTimeFormat == 24) {
	// 		let timeArray = time.split(' ');
	// 		if (timeArray.length == 5) {
	// 			if (timeArray[3] && timeArray[4]) {
	// 				return timeArray[0] + ' ' + timeArray[1] + ' ' + timeArray[2] + ' ' + moment(timeArray[3] + ' ' + timeArray[4], ["hh:mm A"]).format("HH:mm")
	// 			}
	// 		}
	// 	}
	// 	return time;
	// };
	beWidget.prototype.slotLabelFormatFixedType = (time) => {
		if (_this.options.fixedDateFormat) {
			let timeArray = time.split(' ');
			let format = "" + _this.options.dateFormat + ' ' + ((timeArray.length == 5) ? ((_this.options.slotTimeFormat == 24) ? "HH:mm" : "hh:mm A") : "");
			time = (timeArray.length == 5) ? time : (time + " 00:00:00");
			let timeOf = new Date(time);
			time = moment(timeOf).format(format);
		}
		return time;
	};
	beWidget.prototype.slotLabelFormat = (time) => {
		return _this.options.slotTimeFormat && _this.options.slotTimeFormat == 24 ? moment(time, ["hh:mm A"]).format("HH:mm") : time;
	};
	// beWidget.prototype.getDateFormat = (format) => {

	// 	let serverDateFormat = format.dateFormat;
	// 	serverDateFormat = serverDateFormat.replace('date', _this.options.dateFormatCollection['date'][format.date]);
	// 	serverDateFormat = serverDateFormat.replace('month', _this.options.dateFormatCollection['month'][format.month]);
	// 	serverDateFormat = serverDateFormat.replace('year', _this.options.dateFormatCollection['year'][format.year]);
	// 	serverDateFormat = serverDateFormat.replace('day', _this.options.dateFormatCollection['day'][format.day]);

	// 	let dateFormat = format.dateFormat;
	// 	dateFormat = dateFormat.replace('date', format.date);
	// 	dateFormat = dateFormat.replace('month', format.month);
	// 	dateFormat = dateFormat.replace('year', format.year);
	// 	dateFormat = dateFormat.replace('day', format.day);

	// 	return {
	// 		dateFormat: dateFormat,
	// 		serverDateFormat: serverDateFormat
	// 	};

	// };
	window.beWidget = beWidget;
})(window);
