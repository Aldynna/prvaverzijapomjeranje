function brisipok(i) {
    //  var ime=$("#uname").val();
    // var k=i+10;
    // console.log(i);
    //  var red = document.getElementById(k);
    //var j=red.valueOf();
    // var n=$("#red").val();
    // console.log(n);
    // console.log(red);
    var poki = document.getElementById("myTabPo").rows[i + 1].cells.namedItem("id").innerHTML;
    $.ajax({
        method: "post",
        url: "/brisipok",
        data: {br: poki},
    }).done(function (data) {
        console.log(data);
        window.location.assign('/pokemoni');
        //  $("#rj" ).append(data);

    }).fail(function () {
        alert("error");


    });
}


function editpok(i) {
    // var nick = document.getElementById("editTable"+i).rows[i + 1].cells.namedItem("neki").innerHTML;
    // var nick = document.getElementById("myTable").rows[i + 1].cells.namedItem("neki"+i).innerHTML;
    // var tbl = document.getElementById("myTable");
    //var rCount = tbl.rows.length;
    //alert(tbl.rows[rCount-1].cells[0].children[0].value);
    var stari = document.getElementById("myTabPo").rows[i + 1].cells.namedItem("id").innerHTML;
    // var nick=$("#neki"+i).val();
    var inew=$("#namenew"+i).val();
        console.log(stari,inew);
    $.ajax({
        method: "post",
        url: "/updatepok",
        data:{br:stari, newname:inew},
    }).done(function (data) {
        console.log(data);
        window.location.assign('/pokemoni');
        //  $("#rj" ).append(data);

    }).fail(function () {
        alert("error");


    });
}