

function nadji() {
    var ime=$("#uname").val();
    console.log(ime);
    $.ajax({
        method:"get",
        url: "/ovdje",
        data:{unme:ime},
    }).done(function(data){
        console.log(data);
      window.location.assign('veza')
      //  $("#rj" ).append(data);

    }).fail(function() {
        alert( "error" );

    });
}
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

        $.ajax({
            method: "post",
            url: "/brisipl",
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
    var inew=$("#namenew"+i).val();
    var pnew=$("#lnamenew"+i).val();

    console.log(stari,inew,pnew);
    $.ajax({
        method: "post",
        url: "/updatepl",
        data:{unm:stari, fname:inew, lname:pnew},
    }).done(function (data) {
        console.log(data);
        window.location.assign('/igraci');
        //  $("#rj" ).append(data);

    }).fail(function () {
        alert("error");


    });
}


function dodajigraca() {
    var nick=$("#uname").val();
    var ime=$("#frname").val();
    var prez=$("#lsname").val();
    /* var nick=document.getElementById('uname').value();
     var ime=document.getElementById('frname').value();
     var prez=document.getElementById('lsname').value();*/
    //console.log(ime);
    $.ajax({
        method:"POST",
        url: "/dodajpl",
        data:{unm:nick, fname:ime, lname:prez},
    }).done(function(){
        //console.log(data),

        //window.location.reload();
        window.location.assign('/igraci');
    }).fail(function() {
        alert( "error" );

    });
}