/** @format */
console.log("start");
// 탭 css 제거하기 - 나중에 활용해보자.
//  var jQueryUiClass =
//      [".ui-tabs", ".ui-tabs-nav", ".ui-tabs-panel", ".ui-widget", ".ui-widget-header", ".ui-widget-content", ".ui-corner-all", ".ui-corner-top", ".ui-corner-bottom", ".ui-helper-clearfix", ".ui-helper-reset", ".ui-state-default"];

// $("#tabs").tabs().each(function(){
//    $tabEle = $(this).find( jQueryUiClass.join(", ") ).andSelf();
//    $tabEle.removeClass( jQueryUiClass.join(" ").replace(/\./g, "") );
// });

$(document).ready(function () {
    console.log("load");
    $("input[type=checkbox").removeAttr("checked");
    $("#projects").tabs();
    $("ul").sortable({ axis: "x", containment: "#projects" }); //가로로 드래그 정렬
    $("ol").sortable({ axis: "y", containment: "#projects" }); //세로로 드래그 정렬

    //========================================================
    //checkbox 클릭시 리스트 삭제
    //========================================================
    // $("input[type=checkbox]").click(function () {
    //     $(this)
    //         .closest("li")
    //         .slideUp(function () {
    //             $(this).remove();
    //         });
    // });
    $("#projects").on("click", "input[type=checkbox]", function () {
        $(this)
            .closest("li")
            .slideUp(function () {
                $(this).remove();
            });
    });

    //========================================================
    //프로젝트 추가 버튼 클릭시 다이얼로그 박스 display
    //========================================================
    $("#btnAddProject")
        .button()
        .click(function () {
            $("#project-dialog").dialog({
                width: 400,
                resizable: false,
                modal: true,
                buttons: {
                    추가: function () {
                        let projectName = $("#new-project").val();
                        let replaceName = projectName.split(" ").join("_"); //공백처리
                        $(
                            "<li><a href='#" +
                                replaceName +
                                "'>" +
                                projectName +
                                "</a></li>"
                        ).appendTo("#main"); //탭메뉴에 새프로젝트 추가
                        $("<ol id='" + replaceName + "'>")
                            .appendTo("#projects")
                            .sortable(); //새로 만든 탭메뉴에 대한 일정 리스트도 sortable되도록 처리..
                        let tabCount = $("#projects.ui-tabs-nav li").length; //tab의 개수 리턴
                        console.log(tabCount);
                        $("#projects").tabs("refresh"); //탭메뉴 리프레쉬
                        $("#projects").tabs("option", "active", tabCount - 1); //마지막 탭이 활성화되게..
                        $("#new-project").val(""); //입력창 비우고
                        $(this).dialog("close"); //다이얼로그창 닫기
                    },
                    취소: function () {
                        $("#new-project").val("");
                        $(this).dialog("close");
                    },
                },
            });
        });

    //일정추가 버튼 클릭시 다이얼로그 박스 display

    $("#btnAddTodo")
        .button()
        .click(function () {
            $("#todo-dialog").dialog({
                width: 400,
                resizable: false,
                modal: true,
                buttons: {
                    추가: function () {
                        let activeTab = $("#projects").tabs("option", "active"); //현재 활성탭의 값을 가져온다.
                        let title = $(
                            "#main > li:nth-child(" + (activeTab + 1) + ") > a"
                        ).attr("href"); //활성탭의 id를 가져온다.
                        $("#projects " + title).append(
                            "<li><input type='checkbox' />" +
                                $("#new-todo").val() +
                                "</li>"
                        );
                        //alert(title);

                        $("#projects").tabs("refresh"); //탭메뉴 리프레쉬
                        $("#new-todo").val(""); //입력창 비우고
                        $(this).dialog("close"); //다이얼로그창 닫기
                    },
                    취소: function () {
                        $("#new-todo").val("");
                        $(this).dialog("close");
                    },
                },
            });
        });
});
