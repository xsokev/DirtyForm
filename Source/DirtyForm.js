/*
---

name: DirtyForm

description: Registers form elements and their values. Provides an isDirty function to determine if values have been changed.

license: MIT-style

authors: Kevin Armstrong

requires: 
	- Core/Class
	- Core/Class.Extras
	- Core/Array
	
provides: 	
	- DirtyForm

...
*/

var DirtyForm = (function(){
	
	var fieldValues = {};
	var fields;
	var resetField;
	
	var DF = new Class({
		Implements: Options,
		options: {
			excludes: [],
			blockSubmitOnDirty: true,
			updateOnReset: true,
			filterButtons: true
		},
		initialize: function(elm, options) {
			this.setOptions(options);
			this.element = document.id(elm);
			if(!(typeOf(this.element) == "element" && this.element.tagName == "FORM")){ return false; }
			fields = this.element.getElements('input')
				.combine(this.element.getElements('select'))
				.combine(this.element.getElements('textarea'));
			if(this.options.filterButtons){
				fields = fields.filter(function(elm){
					return (elm.tagName != "button" && elm.type != "submit" && elm.type != "reset");
				});
			}
			if(this.options.blockSubmitOnDirty){
				this.element.addEvent('submit', function(e){
					return !this.isDirty();
				}.bind(this));
			}
			if(this.options.updateOnReset){
				resetField = new Element('input', { type: "hidden" });
				this.element.grab(resetField);
				this.element.addEvent('reset', function(e){
					var timer = function(){
						if(resetField.value == ""){
							clearInterval(timer);
							this.update();
						}
					}.periodical(100, this);
				}.bind(this));
			}
			if(this.options.excludes && this.options.excludes.length > 0){
				fields = fields.filter(function(elm){
					return !this.options.excludes.contains(elm.id);
				}.bind(this));
			}
			this.dirtyFields = [];
			this.update();
			return this;
		},
		update: function(){
			fields.each(function(elm){
				if(!elm.id){
					elm.set('id', elm.tagName.toLowerCase()+'_'+(DirtyForm._idCounter++));
				}
				if(elm.type && (elm.type == "checkbox" || elm.type == "radio")) {
					fieldValues[elm.id] = elm.checked;
				} else {
					fieldValues[elm.id] = elm.value;
				}
			});
			resetField.value = this.element.id+":updated";
		},
		isDirty: function(){
			this.dirtyFields = [];
			fields.each(function(elm){
				var val = elm.value;
				if(elm.type && (elm.type == "checkbox" || elm.type == "radio")) {
					val = elm.checked;
				}
				if(val != fieldValues[elm.id]){
					this.dirtyFields.push({
						field: $(elm.id),
						oldValue: fieldValues[elm.id],
						newValue: val
					});
				}
			}, this);
			return this.dirtyFields.length > 0;
		}
	});
	DF._idCounter = 1;
	return DF;
	
})();
