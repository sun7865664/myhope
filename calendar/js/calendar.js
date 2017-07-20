var calendar = function(id, options){
  var me = this;

  var defaltoptions = {
      width: '500px',
      height: '500px',
      language: 'CH', //语言
      showLunarCalendar: true, //阴历
      showHoliday: true, //休假
      showFestival: true, //节日
      showLunarFestival: true, //农历节日
      showSolarTerm: true, //节气
      showMark: true, //标记
      timeRange: {
        startYear: 1900,
        endYear: 2049
      },
      mark: {
        '2016-5-5': '上学'
      },
      theme: {
        changeAble: false,
        weeks: {
          'background-color': '#FBEC9C',
          'font-color': '#4A4A4A',
          'font-size': '20px',
        },
        days: {
          'background-color': '#ffffff',
          'font-color': '#565555',
          'font-size': '24px'
        },
        todaycolor: 'orange',
        activeSelectColor: 'orange',
      }
    };

    me.options = options = $.extend(defaltoptions,options);

    me.DateToCalendar = function(){
      var calendarArray=[];
      var now = new Date();
      var sumDaysOfMonth,weekDay;
      if(me.options.month){
        var monthArr = me.options.month.split("-");
        sumDaysOfMonth = new Date(monthArr[0],monthArr[1],0).getDate();
        weekDay = new Date(monthArr[0],monthArr[1]-1,1).getDay() === 0 ?7:new Date(monthArr[0],monthArr[1]-1,1).getDay();
      } else {
        sumDaysOfMonth = new Date(now.getFullYear(),(now.getMonth()+1),0).getDate();
        weekDay = new Date(now.getFullYear(),now.getMonth(),1).getDay() === 0 ?7:new Date(now.getFullYear(),now.getMonth(),1).getDay();
      }
      me.maxDay = sumDaysOfMonth;

      for(var i=1;i<weekDay;i++){
        calendarArray.push("-");
      }
      for(var j=0; j<sumDaysOfMonth; j++){
        calendarArray.push(j+1);
      }
      return calendarArray;
    };

    me.init = function(){
      var dom = $("#"+id);
      var table = $("<table class='calendar-table'  cellspacing=0 cellpadding=0></table>");
      var thead = $("<thead></thead>");
      table.css('width', options.width);
      table.css('height', options.height);
      thead.append('<th>一</th>');
      thead.append('<th>二</th>');
      thead.append('<th>三</th>');
      thead.append('<th>四</th>');
      thead.append('<th>五</th>');
      thead.append('<th>六</th>');
      thead.append('<th>日</th>');
      var tbody = $("<tbody></tbody>");
      var calendarArray = me.DateToCalendar();
      var row=1;
      var tr;
      var today = new Date().getDate();
      var month = me.options.month;
      var todayMonth = new Date().getFullYear() + "-" + (new Date().getMonth()+1)>10?new Date().getMonth()+1:"0"+(new Date().getMonth()+1);
      for(var k in calendarArray) {
        if(row === 1) {
          tr = $("<tr></tr>");
          tbody.append(tr);
        }
        if(calendarArray[k] === "-"){
          tr.append('<td></td>');
        } else {
          if(calendarArray[k] === today && month.split("-")[1] === todayMonth) {
            tr.append('<td class="today" day="'+ calendarArray[k] +'"><div><span class="middle-sapn"></span><span>'+ calendarArray[k] +'</span></div><div id="point"></div></td>');
          } else {
            tr.append('<td day="'+ calendarArray[k] +'"><div><span class="middle-sapn"></span><span>'+ calendarArray[k] +'</span></div><div id="point"></div></td>');
          }
        }
        if(k == calendarArray.length-1){
          for(var l=0; l<7-row; l++){
            tr.append('<td></td>');
          }
        }
        row++;
        if(row >7) {
          row = 1;
        }
      }
      table.append(thead);
      table.append(tbody);
      dom.html(table);
      if(options.theme.changeAble === true){
        $("#"+id+" td").css(options.theme.days);
        $("#"+id+" th").css(options.theme.weeks);
      }

      $(".calendar-table td").click(function(event) {
        $('.calendar-table td').removeClass('active');
        $(this).has('div').addClass('active');
      });
    };

    me.AddDaysEvent = function(eventName,callback){
        $('.calendar-table td').on(eventName,callback);
    };

    me.addDayClass = function(day,className){
      $(".calendar-table td[day="+day+"]").addClass(className);
    };

    me.addDayStyle = function(day,css){
      $(".calendar-table td[day="+day+"]").css(css);
    };

    // me.init(options);
    return me;
};
