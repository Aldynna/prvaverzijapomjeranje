function brisi(i) {
    //  var ime=$("#uname").val();
    // var k=i+10;
    // console.log(i);
    //  var red = document.getElementById(k);
    //var j=red.valueOf();
    // var n=$("#red").val();
    // console.log(n);
    // console.log(red);
    var nick = document.getElementById("myTable").rows[i + 1].cells.namedItem("uname").innerHTML;
    var id = $("#pokid").val();
    console.log(nick,id);

    $.ajax({
        method: "post",
        url: "/brisivezu",
        data: {unme: nick},
    }).done(function (data) {
        console.log(data);
        window.location.assign('/igraci');
        //  $("#rj" ).append(data);

    }).fail(function () {
        alert("error");


    });
}

function edit(i) {
    // var nick = document.getElementById("editTable"+i).rows[i + 1].cells.namedItem("neki").innerHTML;
    // var nick = document.getElementById("myTable").rows[i + 1].cells.namedItem("neki"+i).innerHTML;
    // var tbl = document.getElementById("myTable");
    //var rCount = tbl.rows.length;
    //alert(tbl.rows[rCount-1].cells[0].children[0].value);
    var stari = document.getElementById("myTable").rows[i + 1].cells.namedItem("uname").innerHTML;
    // var nick=$("#neki"+i).val();
    var id = $("#pokid").val();
    var cnew=$("#customnm"+i).val();
    console.log(stari,cnew);
    $.ajax({
        method: "post",
        url: "/updateveza",
        data:{customnm:cnew,nick:stari,pokid:id},
    }).done(function (data) {
        console.log(data);
        window.location.assign('/igraci');


    }).fail(function () {
        alert("error");


    });
}


function dodajvezu() {
    var nick = $("#uname").val();
  //  var cname = $("#customnm").val();
    var id = $("#pokid").val();


    if (nick == '' || id == '') {
        alert("Please fill  fields...!!!!!!");
    }  else {
        $.ajax({
            method: "POST",
            url: "/dodajvezu",
            data: {uname: nick, pokid: id},
        }).done(function () {
            //console.log(data),

            //window.location.reload();
            alert("pokdodan");
            window.location.assign('/igraci');
        }).fail(function () {
            alert("pokusajte drugi username");

        });
    };
}

