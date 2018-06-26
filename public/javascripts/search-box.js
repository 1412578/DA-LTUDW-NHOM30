function debounce(fn, t) {
    var lock = false;
    var timeoutId = null;
    return function(event) {
        if (timeoutId != null)
            clearTimeout(timeoutId);
        timeoutId = setTimeout(fn, t, event);
    }
}
document.addEventListener("DOMContentLoaded", function(event) {
    var searchBtnElem = document.querySelector(".search-btn");
    var searchWdElem = document.querySelector(".search-window");
    var searchRsElem = document.querySelector(".search-results-inner");
    var scrollBar = document.querySelector(".scroll-bar");
    var active = false;
    var inSearchWindow = false;

    /* set Scroll bar */
    function setScrollBarSize(scrollbar, container) {
        scrollbar.style.height = 2 * container.clientHeight - container.scrollHeight + "px";
    }
    /* Don't use this */
    function unactiveState(event) {
        searchWdElem.classList.remove("active");

    }

    function activeState(event) {
        searchWdElem.classList.add("active");
    }

    document.addEventListener("click", function(event) {
        if ((active == false) && (!inSearchWindow)) {
            unactiveState(event);
            active = true;
        }
    });

    function keyupEventHandler(event) {
        var xhr = new XMLHttpRequest();
        var resJson = {};
        var searchDiscovery =  `<div class="search-discovery">
	    							<div>Không tìm thấy sản phẩm phù hợp ?<div>
	    							<a href="/product/list">Thử chức năng tìm kiếm nâng cao</a>
	    						</div>`;
	    if (searchBtnElem.value == ""){
	    	searchRsElem.innerHTML = searchDiscovery;
	    	return setScrollBarSize(scrollBar, searchRsElem);
	    }
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                resJson = JSON.parse(this.responseText);
                searchRsElem.innerHTML = "";
                if (resJson.items.length > 0) {
                    var re = new RegExp("^" + searchBtnElem.value, "i");
                    var newHTML = resJson.items.map(function(item) {
                        return `<a class="item search-item" href="/product/${item.id}">
	                                <div class="image"><img class="h-100" src="${item.images}"></div>
	                                <div class="info">
	                                    <div class="name">${item.name.replace(re, "<mark>$&</mark>")}</div>
	                                    <div class="price">${item.price}</div>
	                                </div>
	                            </a>`;}).reduce(function(a, b) {
					                        return a + b;
					                    }, "");
                    searchRsElem.innerHTML = newHTML;
                } else {
                    searchRsElem.innerHTML = searchDiscovery;
                }

                activeState(event);
                active = false;

                setScrollBarSize(scrollBar, searchRsElem);
            }
        }
        xhr.open("GET", "/product/search/" + searchBtnElem.value, true);
        xhr.send();
    }

    var keyupEventHandlerDebounce = debounce(keyupEventHandler, 300);

    searchWdElem.addEventListener("mouseover", function(event) {
        inSearchWindow = true;
    });
    searchWdElem.addEventListener("mouseout", function(event) {
        inSearchWindow = false;
    });


    searchBtnElem.addEventListener("keyup", keyupEventHandlerDebounce);

    searchRsElem.addEventListener("scroll", function(event) {
        scrollBar.style.top = this.scrollTop + "px";
    });
});