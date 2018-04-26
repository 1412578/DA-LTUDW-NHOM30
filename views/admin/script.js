// Load trước khi xử lí JS
document.addEventListener("DOMContentLoaded", function(){

     
var BangQuanLyDonHang = document.querySelector('#LayBangQuanLiDonHang');
 

     var DSLC = document.querySelectorAll('.LuaChon');

     var LuaChon = DSLC[0];
     for (var i = 1; i < BangQuanLyDonHang.rows.length; i++) {

           if(BangQuanLyDonHang.rows[i].cells[3].getElementsByTagName('select')[0].value == "ChuaGiao"){
              BangQuanLyDonHang.rows[i].classList.add("warning"); 
           } 
           else if(BangQuanLyDonHang.rows[i].cells[3].getElementsByTagName('select')[0].value == "DangGiao"){
              BangQuanLyDonHang.rows[i].classList.add("info"); 
           }
           else{
              BangQuanLyDonHang.rows[i].classList.add("success"); 
           }
     }

            DSSLT = document.querySelectorAll('select');


            DSSLT[0].onchange = function(){
                    BangQuanLyDonHang.rows[1].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[1].classList.remove("info"); 
                    BangQuanLyDonHang.rows[1].classList.remove("success"); 
                     if(DSSLT[0].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[1].classList.add("warning"); 
                   } 
                   else if(DSSLT[0].value == "DangGiao"){
                      BangQuanLyDonHang.rows[1].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[1].classList.add("success"); 
                   }
            }

             DSSLT[1].onchange = function(){
                    BangQuanLyDonHang.rows[2].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[2].classList.remove("info"); 
                    BangQuanLyDonHang.rows[2].classList.remove("success"); 
                     if(DSSLT[1].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[2].classList.add("warning"); 
                   } 
                   else if(DSSLT[1].value == "DangGiao"){
                      BangQuanLyDonHang.rows[2].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[2].classList.add("success"); 
                   }
            }

             DSSLT[2].onchange = function(){
                    BangQuanLyDonHang.rows[3].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[3].classList.remove("info"); 
                    BangQuanLyDonHang.rows[3].classList.remove("success"); 
                     if(DSSLT[2].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[3].classList.add("warning"); 
                   } 
                   else if(DSSLT[2].value == "DangGiao"){
                      BangQuanLyDonHang.rows[3].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[3].classList.add("success"); 
                   }
            }

             DSSLT[3].onchange = function(){
                    BangQuanLyDonHang.rows[4].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[4].classList.remove("info"); 
                    BangQuanLyDonHang.rows[4].classList.remove("success"); 
                     if(DSSLT[3].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[4].classList.add("warning"); 
                   } 
                   else if(DSSLT[3].value == "DangGiao"){
                      BangQuanLyDonHang.rows[4].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[4].classList.add("success"); 
                   }
            }
       
      DSSLT[4].onchange = function(){
                    BangQuanLyDonHang.rows[5].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[5].classList.remove("info"); 
                    BangQuanLyDonHang.rows[5].classList.remove("success"); 
                     if(DSSLT[4].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[5].classList.add("warning"); 
                   } 
                   else if(DSSLT[4].value == "DangGiao"){
                      BangQuanLyDonHang.rows[5].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[5].classList.add("success"); 
                   }
            }

             DSSLT[6].onchange = function(){
                    BangQuanLyDonHang.rows[7].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[7].classList.remove("info"); 
                    BangQuanLyDonHang.rows[7].classList.remove("success"); 
                     if(DSSLT[6].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[7].classList.add("warning"); 
                   } 
                   else if(DSSLT[6].value == "DangGiao"){
                      BangQuanLyDonHang.rows[7].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[7].classList.add("success"); 
                   }
            }

             DSSLT[7].onchange = function(){
                    BangQuanLyDonHang.rows[8].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[8].classList.remove("info"); 
                    BangQuanLyDonHang.rows[8].classList.remove("success"); 
                     if(DSSLT[7].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[8].classList.add("warning"); 
                   } 
                   else if(DSSLT[7].value == "DangGiao"){
                      BangQuanLyDonHang.rows[8].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[8].classList.add("success"); 
                   }
            }

             DSSLT[8].onchange = function(){
                    BangQuanLyDonHang.rows[9].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[9].classList.remove("info"); 
                    BangQuanLyDonHang.rows[9].classList.remove("success"); 
                     if(DSSLT[8].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[9].classList.add("warning"); 
                   } 
                   else if(DSSLT[8].value == "DangGiao"){
                      BangQuanLyDonHang.rows[9].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[9].classList.add("success"); 
                   }
            }

              DSSLT[9].onchange = function(){
                    BangQuanLyDonHang.rows[10].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[10].classList.remove("info"); 
                    BangQuanLyDonHang.rows[10].classList.remove("success"); 
                     if(DSSLT[9].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[10].classList.add("warning"); 
                   } 
                   else if(DSSLT[9].value == "DangGiao"){
                      BangQuanLyDonHang.rows[10].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[10].classList.add("success"); 
                   }
            }

             DSSLT[10].onchange = function(){
                    BangQuanLyDonHang.rows[11].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[11].classList.remove("info"); 
                    BangQuanLyDonHang.rows[11].classList.remove("success"); 
                     if(DSSLT[10].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[11].classList.add("warning"); 
                   } 
                   else if(DSSLT[10].value == "DangGiao"){
                      BangQuanLyDonHang.rows[11].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[11].classList.add("success"); 
                   }
            }

             DSSLT[11].onchange = function(){
                    BangQuanLyDonHang.rows[12].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[12].classList.remove("info"); 
                    BangQuanLyDonHang.rows[12].classList.remove("success"); 
                     if(DSSLT[11].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[12].classList.add("warning"); 
                   } 
                   else if(DSSLT[11].value == "DangGiao"){
                      BangQuanLyDonHang.rows[12].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[12].classList.add("success"); 
                   }
            }

             DSSLT[12].onchange = function(){
                    BangQuanLyDonHang.rows[13].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[13].classList.remove("info"); 
                    BangQuanLyDonHang.rows[13].classList.remove("success"); 
                     if(DSSLT[12].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[13].classList.add("warning"); 
                   } 
                   else if(DSSLT[12].value == "DangGiao"){
                      BangQuanLyDonHang.rows[13].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[13].classList.add("success"); 
                   }
            }

             DSSLT[5].onchange = function(){
                    BangQuanLyDonHang.rows[6].classList.remove("warning"); 
                    BangQuanLyDonHang.rows[6].classList.remove("info"); 
                    BangQuanLyDonHang.rows[6].classList.remove("success"); 
                     if(DSSLT[5].value == "ChuaGiao"){
                      BangQuanLyDonHang.rows[6].classList.add("warning"); 
                   } 
                   else if(DSSLT[5].value == "DangGiao"){
                      BangQuanLyDonHang.rows[6].classList.add("info"); 
                   }
                   else{
                      BangQuanLyDonHang.rows[6].classList.add("success"); 
                   }
            }

    var DSSP = document.getElementById('DanhSachSP');
    
    var themSP = document.getElementById('btnThemSanPham');
    themSP.addEventListener('click', function(){
        var tenSanPham = document.querySelector("#lbltenSamPham").value;
        var loaiSanPham = document.querySelector('#lblLoaiSanPham').value;
        var nhaSanXuat = document.querySelector('#lblNhaSanXuat').value;
       
        var s = "<tr>"+
                    "<td>"+tenSanPham+"</td>"+
                    "<td>"+loaiSanPham+"</td>"+
                    "<td>"+nhaSanXuat+"</td>"+
                "</tr>"
        
        DSSP.innerHTML += s;

    })
    

    var xoaSP = document.getElementById('btnXoaSanPham');
    var sanPhamXoa = "St Remy Napoleon";

    xoaSP.addEventListener('click', function(){
        var spXoa = document.querySelector("#lblxoaTheoTen").value;
        var table = document.querySelector('#LayBang');
        var DSSPS = document.getElementById('DanhSachSP');
        var DSF = DSSPS.getElementsByTagName('tr');
        for (var i = 0; i < DSF.length; i++) {
            console.log(DSF[i].querySelector('td').innerText);
            if(DSF[i].querySelector('td').innerText == spXoa){
                table.deleteRow(i);
            }
        }

    })

}, false)



