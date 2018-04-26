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
        console.log(DSSP.innerText);
    })
    

    var xoaSP = document.getElementById('btnXoaSanPham');
    var sanPhamXoa = "St Remy Napoleon";

    xoaSP.addEventListener('click', function(){
        var spXoa = document.querySelector("#lblxoaTheoTen").value;
        var table = document.querySelector('#LayBang');
        console.log(table);
        var DSSPS = document.getElementById('DanhSachSP');
        var DSF = DSSPS.getElementsByTagName('tr');
        for (var i = 0; i < DSF.length; i++) {
            console.log(DSF[i].querySelector('td').innerText);
            if(DSF[i].querySelector('td').innerText == spXoa){
                table.deleteRow(i);
            }
        }

    })

	 x = document.getElementById('mySelect').value;
     y = document.getElementById('DoiMau');
     if(x == "ChuaGiao") y.classList.add('success');
     else if(x == "DangGiao") y.classList.add('warning');
     else y.classList.add('info');

     x = document.getElementById('mySelect1').value;
     y = document.getElementById('DoiMau1');
     if(x == "ChuaGiao") y.classList.add('success');
     else if(x == "DangGiao") y.classList.add('warning');
     else y.classList.add('info');

     x = document.getElementById('mySelect2').value;
     y = document.getElementById('DoiMau2');
     if(x == "ChuaGiao") y.classList.add('success');
     else if(x == "DangGiao") y.classList.add('warning');
     else y.classList.add('info');

     x = document.getElementById('mySelect3').value;
     y = document.getElementById('DoiMau3');
     if(x == "ChuaGiao") y.classList.add('success');
     else if(x == "DangGiao") y.classList.add('warning');
     else y.classList.add('info');
}, false)

function myFunction() {
    x = document.getElementById('mySelect').value;
    y = document.getElementById('DoiMau');
    y.classList.remove('success');
    y.classList.remove('warning');
    y.classList.remove('info');

    if(x == "ChuaGiao") y.classList.add('success');
    else if(x == "DangGiao") y.classList.add('warning');
    else y.classList.add('info');
    console.log(x);
    console.log(y);
}


function myFunction1() {
	x = document.getElementById('mySelect1').value;
    y = document.getElementById('DoiMau1');
    y.classList.remove('success');
    y.classList.remove('warning');
    y.classList.remove('info');

    if(x == "ChuaGiao") y.classList.add('success');
    else if(x == "DangGiao") y.classList.add('warning');
    else y.classList.add('info');
    console.log(x);
    console.log(y);
}

function myFunction2() {
	x = document.getElementById('mySelect2').value;
    y = document.getElementById('DoiMau2');
    y.classList.remove('success');
    y.classList.remove('warning');
    y.classList.remove('info');

    if(x == "ChuaGiao") y.classList.add('success');
    else if(x == "DangGiao") y.classList.add('warning');
    else y.classList.add('info');
    console.log(x);
    console.log(y);
}


function myFunction3() {
	x = document.getElementById('mySelect3').value;
    y = document.getElementById('DoiMau3');
    y.classList.remove('success');
    y.classList.remove('warning');
    y.classList.remove('info');

    if(x == "ChuaGiao") y.classList.add('success');
    else if(x == "DangGiao") y.classList.add('warning');
    else y.classList.add('info');
    console.log(x);
    console.log(y);
}

