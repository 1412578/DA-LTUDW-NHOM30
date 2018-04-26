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

    }
    var DH1 = new KhoiTaoDonHang("05/12/1990","LondonDryGin",12);
    var DH2 = new KhoiTaoDonHang("05/12/1997","LondonDryGin",13);
    var DH3 = new KhoiTaoDonHang("05/12/1998","LondonDryGin",14);
    var DH4 = new KhoiTaoDonHang("05/12/1999","LondonDryGin",11);
    var DSDH = [DH1,DH2,DH3,DH4];


    DSDH.sort(function(a,b){
        return new Date(a.NgayMua) - new Date(b.NgayMua);
    })

    var BangQuanLyDonHang = document.querySelector('#LayBangQuanLiDonHang');
    for (var i = 0; i < DSDH.length; i++) {
        var row = BangQuanLyDonHang.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = DSDH[i].NgayMua;
        cell2.innerHTML = DSDH[i].SanPham;
        cell3.innerHTML = DSDH[i].TongTien;
        cell4.innerHTML = "<form>"+
                            "<div class='form-group'>"+
                              "<select class='form-control' id='mySelect'>"+
                                "<option value='ChuaGiao'>Chưa Giao</option>"+
                                "<option value='DangGiao' selected='true'>Đang Giao</option>"+
                                "<option value='DaGiao'>Đã Giao</option>"+
                              "</select>"+
                            "</div>"+
                          "</form>";
    }
    console.log(BangQuanLyDonHang);