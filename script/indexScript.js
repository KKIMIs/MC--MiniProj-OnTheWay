$(function(){
	// ------ header + nav ------
	// 햄버거 메뉴 클릭 이벤트
	var show = false;
	// 클릭 시 block/none 반복
	$(".header__menu").on('click',function(){
		if(show){
			$("nav").children('ul').css('display','none');
			show = false;
		}else{
			$("nav").children('ul').css('display','block');
			show = true;
		}
	});	
	//nav에서 마우스 아웃시 none
	$("nav").on({mouseenter:function(){
		$("nav").children('ul').css('display','block');
		show = true;
	}, mouseleave:function(){
		$("nav").children('ul').css('display','none');
		show = false;
	}})



	// ----- search ------
	// 선택 중인 select_title 색상 변경
	$(".search ul>li").on({mouseenter:function(){
		$(this).children('.search__title').css('color','#5e7ca0');
		$(this).children('label').children('.search__title').css('color','#5e7ca0');
	}, mouseleave:function(){
		$(this).children('.search__title').css('color','black');
		$(this).children('label').children('.search__title').css('color','black');
	}});
	
	//현재위치 넣기
	//현재위치 검색하기 


	//날짜입력창에 현재날짜 넣기 
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var dateString = year + '-' + month  + '-' + day;
	$('#start_Itnr').val(dateString);
	$('#end_Itnr').val(dateString);

	//날짜 최대 입력값 제한 : 4개월 이후 
	today.setMonth(today.getMonth() + 4);
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var dateString = year + '-' + month  + '-' + day;
	$('#start_Itnr').attr('max',dateString);
	$('#end_Itnr').attr('max',dateString);


	// 유효성 검사
	$('#search').submit(function(){
		if($('.tripPlan').val()==''){
			alert("여행 방법을 선택해주세요.");	
			return false;	
		}
		if($('#curLoc').val()==''){
			alert("현재 위치를 입력해주세요.");	
			return false;	
		}	
		if($('#intinerary').val()==''){
			alert("여행 일정을 입력해주세요.");	
			return false;	
		}	
		if($('#transfort').val()==''){
			alert("이동 수단을 입력해주세요.");	
			return false;	
		}	
		if($('#distance').val()==''){
			alert("이동 거리를 입력해주세요.");	
			return false;	
		}	
		return true;
	
	});


	// ----- Weather Theme ------
	// openweather api에서 날씨 불러오기
	// key: c33d4e9868e43efdaaf477c172906bb8
	// 주요 도시 영문명 리스트
	var engCity_1 = ["Seoul", "Incheon", "Suwon-si","Seongnam-si","Paju", "Icheon-si","Pyeongtaek-si","Chuncheon",
	"Wŏnju" ,"Gangneung","Daejeon","Hongseong","Cheongju-si","Chungju","Gwangju", "Mokpo",
	"Yeosu","Suncheon","Boseong","Naju"]
	var engCity_2 = ["Gochang","Muju","Busan","Ulsan","Masan","Changwon","Jinju","Imsil","Goseong","Daegu","Andong",
	"Junju","Gunsan","Haenam","Namwon","Koch'ang","Pohang", "Gyeongju","Ulchin","Tonghae","Jeju-do"]
	
	// 주요 도시 한국명 리스트 
	var korCity_1 = ['서울','인천','수원','성남','파주','이천','평택','춘천','원주','강릉','대전',
		'세종','홍성','청주','충주','광주','목포','여수','순천','보성','나주'];
	var korCity_2 = ['고창','무주','부산','울산','마산','창원','진주','임실','통영', '대구','안동',
	'전주','군산','해남','남원','고창', '포항', '경주','울진','동해','제주'];

	// ajax로 데이터 불러오기 
	for(var i=0;i<engCity_1.length;i++){
		$.ajax({
			url: "https://api.openweathermap.org/data/2.5/weather?q="+engCity_1[i]+"&appid=c33d4e9868e43efdaaf477c172906bb8&lang=kr",
			dataType: 'json',
			type: 'GET',
			success: function(data){
				var $icon = data.weather[0].icon;
				var $temp = Math.floor(data.main.temp - 273.15) + "℃";
				// var $eng = data.name;
				var $index = engCity_1.indexOf(data.name);
				var $city = korCity_1[$index];
				var $iconUrl = "http://openweathermap.org/img/wn/" + $icon + "@2x.png";
				// console.log(data.name+"--"+$index+"--"+$city);

				// 데이터 쓰기 
				// $('.weather__info').empty();
				var tag ='<li><ul class="weather__detail">';
				tag += '<li class="wIcon"><img src="'+$iconUrl+'" alt="icon" /></li>';
				tag += '<li class="wTemp">'+$temp+'</li>';
				tag += '<li class="wCity">'+$city+'</li></ul></li>';

				$('.weather__info_1').append(tag);
				// $('.weather__info_2').append(tag);
			
			}, error:function(e){
				console.log(e.responseText);
			}
		});
		$.ajax({
			url: "https://api.openweathermap.org/data/2.5/weather?q="+engCity_2[i]+"&appid=c33d4e9868e43efdaaf477c172906bb8&lang=kr",
			dataType: 'json',
			type: 'GET',
			success: function(data){
				var $icon = data.weather[0].icon;
				var $temp = Math.floor(data.main.temp - 273.15) + "℃";
				// var $eng = data.name;
				var $index = engCity_2.indexOf(data.name);
				var $city = korCity_2[$index];
				var $iconUrl = "http://openweathermap.org/img/wn/" + $icon + "@2x.png";
				// console.log(data.name+"--"+$index+"--"+$city);

				// 데이터 쓰기 
				// $('.weather__info').empty();
				var tag ='<li><ul class="weather__detail">';
				tag += '<li class="wIcon"><img src="'+$iconUrl+'" alt="icon" /></li>';
				tag += '<li class="wTemp">'+$temp+'</li>';
				tag += '<li class="wCity">'+$city+'</li></ul></li>';

				// $('.weather__info_1').append(tag);
				$('.weather__info_2').append(tag);
			
			}, error:function(e){
				console.log(e.responseText);
			}
		});
	}
	
	//날짜페이지:포지션 {1:0, 2:-500%, 3:-1000%, 4:-1500%}
	var wPage = 0;
	//배너 롤링 확인 아이콘 변경 함부
	function changeWPage(page){
		for(var k=0; k<4;k++){
			if(page==k){
				$('.weather__page>li').eq(k).empty();
				$('.weather__page>li').eq(k).html('<i class="fa-solid fa-circle"></i>');
			}else{
				$('.weather__page>li').eq(k).empty();
				$('.weather__page>li').eq(k).html('<i class="fa-regular fa-circle"></i>');
			}
		}
	}

	changeWPage(wPage);

		// 화살표 눌렀을 때 날짜 정보 이동 
	var newPos = 0;

	//오른쪽 버튼
	$("#wRight").on({mousedown:function(){
		$(this).css('color','#5e7ca0');

		wPage += 1;
		if(wPage<4){ //날찌 정보 이동 
			newPos = -500*wPage+"%";
			$(".weather__detail").css('left',newPos);
			changeWPage(wPage);
		}else{ //이동 금지
			wPage=3;
		}
		// console.log("현재페이지:"+wPage+",현재위치"+newPos);
	}, mouseup:function(){
		$(this).css('color','gray');
	}})

	//왼쪽버튼 
	$("#wLeft").on({mousedown:function(){
		$(this).css('color','#5e7ca0');

		wPage -= 1;
		if(wPage>=0){//날찌 정보 이동 
			newPos = -500*(wPage)+"%";
			$(".weather__detail").css('left',newPos);
			changeWPage(wPage);
			// console.log("현재페이지:"+wPage+",현재위치"+newPos);
		}else{ //이동금지
			wPage = 0;
		}
	}, mouseup:function(){
		$(this).css('color','gray');
	}})

});

