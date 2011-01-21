/*
---
name: DirtyForm
description: Registers form elements and their values. Provides an isDirty function to determine if values have been changed.
author: Kevin Armstrong
requires: 
	- Core/Class
	- Core/Class.Extras
	- Core/Array
provides: DirtyForm
...
*/

var DirtyForm = new Class({
	Implements: Options,
	options: {
		excludes: [],
		blockSubmitOnDirty: true,
		filterButtons: true
	},
	initialize: function(elm, options) {
		this.setOptions(options);
		this.element = document.id(elm);
		if(!(typeOf(this.element) == "element" && this.element.tagName == "FORM")){ return false; }
		this.fields = this.element.getElements('input')
			.combine(this.element.getElements('select'))
			.combine(this.element.getElements('textarea'));
		if(this.options.filterButtons){
			this.fields = this.fields.filter(function(elm){
				return (elm.tagName != "button" && elm.type != "submit");
			});
		}
		if(this.options.blockSubmitOnDirty){
			this.element.addEvent('submit', function(e){
				return !this.isDirty();
			}.bind(this));
		}
		if(this.options.excludes && this.options.excludes.length > 0){
			this.fields = this.fields.filter(function(elm){
				return !this.options.excludes.contains(elm.id);
			}.bind(this));
		}
		this.fieldValues = {};
		this.dirtyFields = [];
		this.update();
		return this;
	},
	update: function(){
		this.fields.each(function(elm){
			if(!elm.id){
				elm.set('id', elm.tagName.toLowerCase()+'_'+(DirtyForm._idCounter++));
			}
			if(elm.type && (elm.type == "checkbox" || elm.type == "radio")) {
				this.fieldValues[elm.id] = elm.checked;
			} else {
				this.fieldValues[elm.id] = elm.value;
			}
		}, this);
	},
	isDirty: function(){
		this.dirtyFields = [];
		this.fields.each(function(elm){
			var val = elm.value;
			if(elm.type && (elm.type == "checkbox" || elm.type == "radio")) {
				val = elm.checked;
			}
			if(val != this.fieldValues[elm.id]){
				this.dirtyFields.push({
					field: $(elm.id),
					oldValue: this.fieldValues[elm.id],
					newValue: val
				});
			}
		}, this);
		return this.dirtyFields.length > 0;
	}
});
DirtyForm._idCounter = 1;