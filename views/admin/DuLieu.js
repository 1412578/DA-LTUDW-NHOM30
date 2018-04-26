var DonHang = {
        NgayMua: "05/12/1996",
        SanPham: "LondonDryGin",
        TongTien: 12,
        TrangThai: "ChuaGiao"
    }

function KhoiTaoDonHang(NM, SP, TT, TThai){
        this.NgayMua = NM;
        this.SanPham = SP;
        this.TongTien = TT;
        this.TrangThai = TThai;
    }


var DH1 = new KhoiTaoDonHang("05/12/1990","LondonDryGin",12,"DaGiao");
    var DH2 = new KhoiTaoDonHang("05/12/1997","LondonDryGin",13,"ChuaGiao");
    var DH3 = new KhoiTaoDonHang("05/12/1998","Rhum Demeraran",14,"DaGiao");
    var DH4 = new KhoiTaoDonHang("05/07/1999","Canadian Whisky",11,"ChuaGiao");
    var DH5 = new KhoiTaoDonHang("05/12/1997","LondonDryGin",13,"ChuaGiao");
    var DH6 = new KhoiTaoDonHang("05/12/1998","Irish Whiskey",14,"DaGiao");
    var DH7 = new KhoiTaoDonHang("06/10/2009","LondonDryGin",11,"ChuaGiao");
    var DH8 = new KhoiTaoDonHang("09/12/1997","Irish Whiskey",13,"ChuaGiao");
    var DH9 = new KhoiTaoDonHang("05/12/2004","LondonDryGin",14,"DaGiao");
    var DH10 = new KhoiTaoDonHang("05/05/1999","LondonDryGin",11,"ChuaGiao");
    var DH11 = new KhoiTaoDonHang("03/03/2008","Rhum Martinique",13,"ChuaGiao");
    var DH12 = new KhoiTaoDonHang("04/04/1998","Absolut",14,"DaGiao");
    var DH13 = new KhoiTaoDonHang("05/12/2022","Finlandia",11,"ChuaGiao");
    
    var DSDH = [DH1,DH2,DH3,DH4,DH5,DH6,DH7,DH8,DH9,DH10,DH11,DH12,DH13];


    DSDH.sort(function(a,b){
        return new Date(a.NgayMua) - new Date(b.NgayMua);
    })

    var BangQuanLyDonHang = document.querySelector('#LayBangQuanLiDonHang');

    var  s1 = "<select class='form-control LuaChon'>"+
                                "<option value='ChuaGiao' >Chưa Giao</option>"+
                                "<option value='DangGiao' selected ='true'>Đang Giao</option>"+
                                "<option value='DaGiao'>Đã Giao</option>"+
                              "</select>";

    var s2 = "<select class='form-control LuaChon'>"+
                                "<option value='ChuaGiao' selected ='true'>Chưa Giao</option>"+
                                "<option value='DangGiao' >Đang Giao</option>"+
                                "<option value='DaGiao'>Đã Giao</option>"+
                              "</select>";

    var s3 = "<select class='form-control LuaChon'>"+
                                "<option value='ChuaGiao' selected ='true'>Chưa Giao</option>"+
                                "<option value='DangGiao' >Đang Giao</option>"+
                                "<option value='DaGiao' selected ='true'>Đã Giao</option>"+
                              "</select>";
    for (var i = 0; i < DSDH.length; i++) {
        var row = BangQuanLyDonHang.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = DSDH[i].NgayMua;
        cell2.innerHTML = DSDH[i].SanPham;
        cell3.innerHTML = DSDH[i].TongTien;
        if(DSDH[i].TrangThai == "DangGiao") cell4.innerHTML = s1;
        else if(DSDH[i].TrangThai == "ChuaGiao")  cell4.innerHTML = s2;
        else  cell4.innerHTML = s3;
                              
                           
    }

