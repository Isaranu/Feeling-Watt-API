var path = '';
var fw_now_arr = [];
var wht_now=[], whb_now=[], Pt_now=[], Qt_now=[], Qb_now=[], Pb_now=[], mdt_now=[];
var fw_now_range;
var fw_today_arr=[];
var wht_today=[], whb_today=[], Pt_today=[], Qt_today=[], Qb_today=[], Pb_today=[], mdt_today=[];
var fw_today_range;
var fw_24h_arr=[];
var wht_24h=[], whb_24h=[], Pt_24h=[], Qt_24h=[], Qb_24h=[], Pb_24h=[], mdt_24h=[];
var fw_24h_range;
var fw_n_data_arr=[];
var wht_n_data=[], whb_n_data=[], Pt_n_data=[], Qt_n_data=[], Qb_n_data=[], Pb_n_data=[], mdt_n_data=[];
var fw_n_data_range;
var Energy_t, Energy_a, Energy_b, Cost;
var fw_cost_range;
var Energy_t_112, Energy_a_112, Energy_b_112, Cost_112;
var fw_cost_tariff112_range;

var n_data;

var fw_start_date, fw_end_date;
var fw_start_time, fw_end_time;

// --------- Now -------------
function getfw_now(sn, athread) {
  path = 'http://www.feelingwatt.com/api/now?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;

  $.getJSON(path,{
  })
  .done(function(data){
    var output_now;
    output_now = JSON.stringify(data);
    output_now = '{"fw_now":' + output_now +'}';
    console.log(output_now);
    parsefw_now(output_now);
  });
}

function parsefw_now(txtToparsefwnow){
  var fw_now_json = JSON.parse(txtToparsefwnow);
  var fw_now_obj = fw_now_json.fw_now;
  fw_now_range = Object.keys(fw_now_obj).length;

  for(var i in fw_now_obj){
    wht_now[i] = Number(fw_now_obj[i].Wht);
    whb_now[i] = Number(fw_now_obj[i].Whb);
    Pt_now[i] = Number(fw_now_obj[i].Pt);
    Pb_now[i] = Number(fw_now_obj[i].Pb);
    Qt_now[i] = Number(fw_now_obj[i].Qt);
    Qb_now[i] = Number(fw_now_obj[i].Qb);
    mdt_now[i] = fw_now_obj[i].mdt;
  }

  //console.log(wht_now);
  //var wht_now_mega = wht_now/1000;
  //drawgauge(wht_now_mega, 10000, 'now', 'kW');
  //console.log(Pb_now);
  //drawgauge(Pb_now, 10000, 'now', 'kW');

}


// --------- Today -------------
function getfw_today(sn, athread) {
  path = 'http://www.feelingwatt.com/api/today?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;

  $.getJSON(path,{
  })
  .done(function(data){
    var output_today;
    output_today = JSON.stringify(data);
    output_today = '{"fw_today":' + output_today +'}';
    //console.log(output);
    parsefw_today(output_today);
  });
}

function parsefw_today(txtToparsefwtoday){
  var fw_today_json = JSON.parse(txtToparsefwtoday);
  var fw_today_obj = fw_today_json.fw_today;
  fw_today_range = Object.keys(fw_today_obj).length;

  for(var i in fw_today_obj){
    wht_today[i] = Number(fw_today_obj[i].Wht);
    whb_today[i] = Number(fw_today_obj[i].Whb);
    Pt_today[i] = Number(fw_today_obj[i].Pt);
    Pb_today[i] = Number(fw_today_obj[i].Pb);
    Qt_today[i] = Number(fw_today_obj[i].Qt);
    Qb_today[i] = Number(fw_today_obj[i].Qb);
    mdt_today[i] = fw_today_obj[i].mdt;
  }

  console.log(wht_today);
  drawchart(mdt_today,wht_today);

}

// --------- Last 24hr -------------
function getfw_24h(sn, athread) {
  path = 'http://www.feelingwatt.com/api/24h?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;

  $.getJSON(path,{
  })
  .done(function(data){
    var output_24h;
    output_24h = JSON.stringify(data);
    output_24h = '{"fw_24h":' + output_24h +'}';
    //console.log(output);
    parsefw_24h(output_24h);
  });
}

function parsefw_24h(txtToparsefw24h){
  var fw_24h_json = JSON.parse(txtToparsefw24h);
  var fw_24h_obj = fw_24h_json.fw_24h;
  fw_24h_range = Object.keys(fw_24h_obj).length;

  for(var i in fw_24h_obj){
    wht_24h[i] = Number(fw_24h_obj[i].Wht);
    whb_24h[i] = Number(fw_24h_obj[i].Whb);
    Pt_24h[i] = Number(fw_24h_obj[i].Pt);
    Pb_24h[i] = Number(fw_24h_obj[i].Pb);
    Qt_24h[i] = Number(fw_24h_obj[i].Qt);
    Qb_24h[i] = Number(fw_24h_obj[i].Qb);
    mdt_24h[i] = fw_24h_obj[i].mdt;
  }

  console.log(wht_24h);
  drawchart(mdt_24h,wht_24h);

}

// --------- Custom limit data -------------
function getfw_n_data(sn, athread) {
  path = 'http://www.feelingwatt.com/api/trend?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;
  path += '&';
  path += 'limit=' + n_data;

  $.getJSON(path,{
  })
  .done(function(data){
    var output_n_data;
    output_n_data = JSON.stringify(data);
    output_n_data = '{"fw_n_data":' + output_n_data +'}';
    //console.log(output);
    parsefw_n_data(output_n_data);
  });
}

function parsefw_n_data(txtToparsefw_n_data){
  var fw_n_data_json = JSON.parse(txtToparsefw_n_data);
  var fw_n_data_obj = fw_n_data_json.fw_n_data;
  fw_n_data_range = Object.keys(fw_n_data_obj).length;

  for(var i in fw_n_data_obj){
    wht_n_data[i] = Number(fw_n_data_obj[i].Wht);
    whb_n_data[i] = Number(fw_n_data_obj[i].Whb);
    Pt_n_data[i] = Number(fw_n_data_obj[i].Pt);
    Pb_n_data[i] = Number(fw_n_data_obj[i].Pb);
    Qt_n_data[i] = Number(fw_n_data_obj[i].Qt);
    Qb_n_data[i] = Number(fw_n_data_obj[i].Qb);
    mdt_n_data[i] = fw_n_data_obj[i].mdt;
  }

  console.log(wht_n_data);
  drawchart(mdt_n_data,wht_n_data);

}

// --------- Custom range (Date and Time) -------------
function getfw_range(sn, athread) {
  path = 'http://www.feelingwatt.com/api/range?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;
  path += '&';
  path += 'from=' + fw_start_date + ' ' + fw_start_time;
  path += '&';
  path += 'to=' + fw_end_date + ' ' + fw_end_time;

  $.getJSON(path,{
  })
  .done(function(data){
    var output_range;
    output_range = JSON.stringify(data);
    output_range = '{"fw_range":' + output_range +'}';
    console.log(output_range);
    //parsefw_range(output_range);
  });
}

// --------- Cost -------------
function getfw_cost(sn, athread) {
  path = 'http://www.feelingwatt.com/api/cost/fixed?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;
  path += '&';
  path += 'rate=4&due=1';

  $.getJSON(path,{
  })
  .done(function(data){
    var output_cost;
    output_cost = JSON.stringify(data);
    output_cost = '{"fw_cost":' + output_cost +'}';
    console.log(output_cost);
    parsefw_cost(output_cost);
  });
}

function parsefw_cost(txtToparsefwcost){
  var fw_cost_json = JSON.parse(txtToparsefwcost);
  var fw_cost_obj = fw_cost_json.fw_cost;
  fw_cost_range = Object.keys(fw_cost_obj).length;

  for(var i in fw_cost_obj){
  /*
    wht_cost[i] = Number(fw_cost_obj[i].Wht);
    whb_cost[i] = Number(fw_cost_obj[i].Whb);
    Pt_cost[i] = Number(fw_cost_obj[i].Pt);
    Pb_cost[i] = Number(fw_cost_obj[i].Pb);
    Qt_cost[i] = Number(fw_cost_obj[i].Qt);
    Qb_cost[i] = Number(fw_cost_obj[i].Qb);
    mdt_cost[i] = fw_cost_obj[i].mdt;
  */
    Energy_t = Number(fw_cost_obj.Energy_t);
    Energy_a = Number(fw_cost_obj.Energy_a);
    Energy_b = Number(fw_cost_obj.Energy_b);
    Cost = Number(fw_cost_obj.Cost);
  }

  //console.log(wht_cost);
  drawgauge(Cost,5000, 'Cost', 'THB');

}

// --------- Cost tariff 112 -------------
function getfw_costtariff(sn, athread) {
  path = 'http://www.feelingwatt.com/api/cost/tariff112?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;

  $.getJSON(path,{
  })
  .done(function(data){
    var output_cost_tariff112;
    output_cost_tariff112 = JSON.stringify(data);
    output_cost_tariff112 = '{"fw_cost_tariff112":' + output_cost_tariff112 +'}';
    console.log(output_cost_tariff112);
    parsefw_cost_tariff112(output_cost_tariff112);
  });
}

function parsefw_cost_tariff112(txtToparsefwcost_tariff112){
  var fw_cost_tariff112_json = JSON.parse(txtToparsefwcost_tariff112);
  var fw_cost_tariff112_json_obj = fw_cost_tariff112_json.fw_cost_tariff112;
  fw_cost_tariff112_range = Object.keys(fw_cost_tariff112_json_obj).length;

  for(var i in fw_cost_tariff112_json_obj){
    Energy_t_112 = Number(fw_cost_tariff112_json_obj.Energy_t);
    Energy_a_112 = Number(fw_cost_tariff112_json_obj.Energy_a);
    Energy_b_112 = Number(fw_cost_tariff112_json_obj.Energy_b);
    Cost_112 = Number(fw_cost_tariff112_json_obj.Cost);
  }

  //console.log(wht_cost);
  drawgauge(Cost_112,5000, 'Cost tariff 112', 'THB');

}

// --------- Cost tariff 212 -------------
function getfw_costtariff212(sn, athread) {
  path = 'http://www.feelingwatt.com/api/cost/tariff212?';

  path += 'sn=' + sn;
  path += '&';
  path += 'athread=' + athread;

  $.getJSON(path,{
  })
  .done(function(data){
    var output_cost_tariff212;
    output_cost_tariff212 = JSON.stringify(data);
    output_cost_tariff212 = '{"fw_cost_tariff212":' + output_cost_tariff212 +'}';
    console.log(output_cost_tariff212);
    parsefw_cost_tariff212(output_cost_tariff212);
  });
}

function parsefw_cost_tariff212(txtToparsefwcost_tariff212){
  var fw_cost_tariff212_json = JSON.parse(txtToparsefwcost_tariff212);
  var fw_cost_tariff212_json_obj = fw_cost_tariff212_json.fw_cost_tariff212;
  fw_cost_tariff212_range = Object.keys(fw_cost_tariff212_json_obj).length;

  for(var i in fw_cost_tariff212_json_obj){
    Energy_t_212 = Number(fw_cost_tariff212_json_obj.Energy_t);
    Energy_a_212 = Number(fw_cost_tariff212_json_obj.Energy_a);
    Energy_b_212 = Number(fw_cost_tariff212_json_obj.Energy_b);
    Cost_212 = Number(fw_cost_tariff212_json_obj.Cost);
  }

  //console.log(wht_cost);
  drawgauge(Cost_212,5000, 'Cost tariff 212', 'THB');

}
