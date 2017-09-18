const UTIL = {
	/**
	  * Test if Obj is empty
	  */
	objIsEmpty(obj) {
	  for (const prop in obj) {
	    if (obj.hasOwnProperty(prop)) { return false; }
	  }
	  return true;
	},

	/**
	  * Convert Obj to Arr
	  */
	objToArr(obj) {
	  return Object.keys(obj).map((k) => { return obj[k]; });
	},

	/**
	  * Get First Item in Object
	  */
	firstIndexInObj(obj) {
	  for (const a in obj) return a;
	},
};

/* Export ==================================================================== */
module.exports = UTIL;
module.exports.details = {
  title: 'UTIL'
};
