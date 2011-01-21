DirtyForm - Copyright (c) 2010 [Kevin Armstrong](http://kevinandre.com/)
========================================================================

DirtyForm - a mootools class for registering form elements and their values. It provides a function to determine if values have been changed.


Compatibility
----

DirtyForm has been tested with Mootools 1.3.x+


Overview
------------

DirtyForm was created out of a necessity to check if certain fields in a form were modified. It provides the ability to capture the current state of a form. It also provides a list of modified fields and their old and new values.


How to use
----------

Using DirtyForm is very simple.

	To initialize a form and its current values, instantiate a class as follows:
	var dirtyForm = new DirtyForm(frm, {
		excludes: [], 				// form fields that you do not want to check
		blockSubmitOnDirty: true,	// prevent form from submitting if it is dirty. Defaults to true.
		updateOnReset: true,		// if true, the update command will be executed if the form is reset.
		filterButtons: true			// not include buttons (<input type="submit" />, <input type="reset" />, <input type="button" />). Defaults to true.
	);
	
	
	If the form values change and you would like to capture the current state of the form, use the update() method.
	dirtyForm.update();
	
	Update will store the form current values using the field id as the identifier. If no field id exists, a unique id will be generated and assigned to the field.
	
	To check if any of the form's values has been modified, use the isDirty() method.
	dirtyForm.isDirty();
	
	After isDirty has been executed, the property "dirtyFields" of the class instance will contain a list of object for the fields whose values have changed since the last update. 
	dirtyForm.dirtyFields
	
	Each object contains:
		field		//the DOM representation of the field
		oldValue	//the last saved value of the field
		newValue	//the current value of the field


Demos
-----




License
-------

The MIT License (http://www.opensource.org/licenses/mit-license.php)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
