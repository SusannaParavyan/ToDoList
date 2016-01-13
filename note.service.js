(function(){
 	angular.module('app')
 		.factory('NoteService', function()
		{
			var notes = [
			];
 
 			return {
 				getNotes: getNotes,
 				saveNote: saveNote,
 				createBlankNote: createBlankNote
 			};
 
 			function getNotes()
 			{
 				return notes;
 			}
 
 			function saveNote(note)
 			{
 				notes.unshift(note);
 			}
 
 			function createBlankNote()
 			{
 				return {
 					title: "",
 					text: ""
 				};
 			}
 		})
 	;
 })()
 