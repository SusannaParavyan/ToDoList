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