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