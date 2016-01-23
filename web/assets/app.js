(function(){
	angular.module('app', ['templates']);
})();
(function () {
    angular.module('app')
        .controller('IndexController', function ($scope, NoteService) {
            NoteService.getNotes().then(function (notes) {
                $scope.notes = notes;
            });
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

(function () {
    angular.module('app')
        .directive('newNote', function () {
            return {
                templateUrl: "new-note.html",
                scope: true,
                bindToController: {
                    notes: "="
                },
                controller: NewNoteController,
                controllerAs: 'NewNoteCtrl'
            };

            NewNoteController.$inject = ['NoteService'];

            function NewNoteController(NoteService) {
                var instance = this;

                instance.blankNote = null;

                instance.createNote = createNote;
                instance.onSaved = onSaved;

                function createNote() {
                    instance.blankNote = NoteService.createBlankNote();
                }

                function onSaved(savedNote){
                    if(savedNote){
                        instance.notes.unshift(savedNote);
                    }

                    instance.blankNote = null;
                }

            }
        })
    ;
})();
(function(){
   angular.module('app')
       .directive('noteEditModal', noteEditModalDirective);

    noteEditModalDirective.$inject = ['$timeout', 'NoteService'];

    function noteEditModalDirective($timeout, NoteService){
        return {
            templateUrl: "note-edit-modal.html",
            link: linkFunction
        };

        function linkFunction($scope, $element){
            $scope.closeModal = function(){
                $element.find('.modal').closeModal();
            };

            $scope.onDeleted = function(deletedNote){
                $scope.notes.splice(
                    $scope.notes.indexOf(deletedNote),1
                );

                $scope.closeModal();
            }

            $timeout(function(){
                $('body').append($element);
                $element.find('.modal').openModal();
            });
        }
    }
})();
(function () {
    angular.module('app')
        .directive('noteEditOpenModal', noteEditOpenDirective);

    noteEditOpenDirective.$inject = ['$compile'];

    function noteEditOpenDirective($compile) {
        return {
            link: function ($scope, $element) {
                $element.click(showNoteEditModal);

                function showNoteEditModal() {
                    $compile('<note-edit-modal></note-edit-modal>')($scope);
                }
            }
        }
    }
})();
(function () {
    angular.module('app')
        .directive('noteEdit', function () {
            return {
                templateUrl: "note-edit.html",
                scope: true,
                bindToController: {
                    note: '=noteEdit',
                    onSaveCallback: '=onSave',
                    onDeleteCallback: '=onDelete'
                },
                controller: NoteEditController,
                controllerAs: 'NoteEditCtrl'
            };

            function NoteEditController(NoteService) {
                var instance = this;

                instance.saveNote = saveNote;
                instance.deleteNote = deleteNote;

                function saveNote() {
                    if (instance.note.title.length > 0 || instance.note.content.length > 0) {
                        NoteService.saveNote(instance.note).then(function (savedNote) {
                            instance.note = savedNote;
                            if (typeof  instance.onSaveCallback === 'function') {
                                instance.onSaveCallback(instance.note);
                            }
                        });
                    }
                    else {
                        instance.onSaveCallback(false);
                    }
                }

                function deleteNote() {
                    NoteService.deleteNote(instance.note).then(function () {
                        if (typeof instance.onDeleteCallback === 'function') {
                            instance.onDeleteCallback(instance.note);
                        }
                    });
                }
            }
        });
})();
(function () {
    angular.module('app')
        .directive('note', function () {
            return {
                templateUrl: "note.html",
            };
        })
    ;
})();
(function () {
    angular.module('app')
        .factory('NoteService', function ($http) {

            return {
                getNotes: getNotes,
                saveNote: saveNote,
                deleteNote: deleteNote,
                createBlankNote: createBlankNote
            };

            function getNotes()
            {
                return $http.get('/note')
                    .then(function(response)
                    {
                        return response.data;
                    })
                    .catch(function(error)
                    {
                        alert(getErrorMessage(error));
                    })
                    ;
            }

            function saveNote(note)
            {
                if (note.id)
                {
                    return $http.put('/note/' + note.id, note)
                        .then(function(response)
                        {
                            return response.data;
                        })
                        .catch(function(error)
                        {
                            alert(getErrorMessage(error));
                        })
                        ;
                }
                else
                {
                    return $http.post('/note', note)
                        .then(function(response)
                        {
                            return response.data;
                        })
                        .catch(function(error)
                        {
                            alert(getErrorMessage(error));
                        })
                        ;
                }
            }

            function createBlankNote() {
                return {
                    title: "",
                    content: ""
                };
            }

            function deleteNote(note)
            {
                return $http.delete('/note/' + note.id);
            }

            function getErrorMessage(error)
            {
                return 'Error ' + error.status  + ': ' + error.statusText;
            }
        })
    ;
})();
 