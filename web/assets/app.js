(function(){
	angular.module('app', ['templates']);
})();
(function(){
	angular.module('app')
		.controller('IndexController', function($scope, NoteService)
		{
			$scope.notes = NoteService.getNotes();
		});
})();	
	
(function(){
	angular.module('app')
		.directive('navigation', function()
		{
			return {
				templateUrl: "navigation.html"
			};
		})
	;
})();	

(function(){
 	angular.module('app')
 		.directive('newNote', function()
 		{
 			return {
 				templateUrl: "new-note.html",
 				scope: {
 					notes: "="
 				},
 				controller: NewNoteController
 			};
 
 			function NewNoteController($scope, NoteService)
 			{
 				$scope.blankNote = null;
 
 				$scope.createNote = createNote;
 				$scope.saveNote = saveNote;
 
 				function createNote()
 				{
 					$scope.blankNote = NoteService.createBlankNote();
 				}
 
 				function saveNote()
 				{
 					if ($scope.blankNote && ($scope.blankNote.title.length > 0 || $scope.blankNote.content.length > 0))
 					{
 						NoteService.saveNote($scope.blankNote);
 					}
 
 					$scope.blankNote = null;
 				}
 			}
 		})
 	;
 })();
(function(){
	angular.module('app')
		.directive('note', function()
 		{
 			return {
 				templateUrl: "note.html"
 			};
 		})
 	;
 })();
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
 })();
 