$(function(){
    var refreshNotesView = function(){

        var successCB = function(res){
            var notes = res.notes;
            console.log(notes);
            var notesTable = $("#notesTable");
            notesTable.empty();
            var headerString = "<tr><th>&nbsp;</th><th>id</th><th>title</th><th>detail</th><th>&nbsp;</th></tr>";
            notesTable.append($(headerString));

            var makeButton = function(id){
                var buttonAttrs = {
                    "class": "btn btn-danger"
                };

                var clickHandler = function(evt){

                    var successfulDeletion = function(){
                        $.ajax(req);
                    };

                    var deleteReq = {
                        url: "/deletenote/" + id,
                        method: "delete",
                        success: successfulDeletion
                    };

                    $.ajax(deleteReq);
                };

                var buttonOb = $("<button></button>", buttonAttrs);
                buttonOb.click(clickHandler);
                buttonOb.html("delete");
                return buttonOb;
            };

            var makeChangeButton = function(id, title, detail){



                var changeButtonClick = function(evt){
                    $("#tfTitleChange").val(title);
                    $("#tfDetailChange").val(detail);
                    $("#tfHiddenId").val(id)
                    $("#changeModal").modal();
                };

                var buttonAttrs = {
                    "class": "btn btn-primary"
                };

                var changeButton = $("<button></button>", buttonAttrs)
                        .html("change")
                        .click(changeButtonClick);
                return changeButton;
            };

            var addRec = function(rec){
                var row = $("<tr></tr>");

                var deleteCell = $("<td></td>");
                var buttonObj = makeButton(rec.id);
                deleteCell.append(buttonObj);
                row.append(deleteCell);

                var idCell = $("<td></td>").html(rec.id);
                row.append(idCell);

                var titleCell = $("<td></td>").html(rec.title);
                row.append(titleCell);

                var detailCell = $("<td></td>").html(rec.detail);
                row.append(detailCell);

                var changeButtonCell = $("<td></td>");
                var btn = makeChangeButton(rec.id, rec.title, rec.detail);
                changeButtonCell.append(btn);
                row.append(changeButtonCell);

                notesTable.append(row);
            };

            notes.forEach(addRec);
        };

        var req = {
            url: "/notes",
            method: "get",
            success: successCB
        };

        $.ajax(req);
    };

    refreshNotesView();

    /////////////////// ADDING NEW RECORDS SECTION/////////////////////
    var addNoteClick = function(evt){
        var jsonArgs = {
            title: $("#tfTitle").val(),
            detail: $("#tfDetail").val()
        };

        headers = {
            "Content-type": "application/json"
        };

        var req = {
            url: "/addnote",
            method: "post",
            headers: headers,
            success: refreshNotesView,
            data: JSON.stringify(jsonArgs)
        };

        $.ajax(req);
    };
    

    $("#btnAddNote").click(addNoteClick);
});