// Load trước khi xử lí JS
document.addEventListener("DOMContentLoaded", function(){

     
    
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

