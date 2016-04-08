$(document).ready(function () {
  $('.pokeValues').hide(40);

  var pokeAPI = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
  var next;
  var nextPokeAPI;
  var arrayForPokemons = [];
  

  $.getJSON(pokeAPI, function (data) {

    getData = data;
    next = getData.meta.next;
    nextPokeAPI = 'http://pokeapi.co' + next;


    $('#cover').addClass('cover');

    for (objN in getData.objects) {
      
      var typesNames = '';
      var forType = [];
      
      obj = getData.objects[objN];
      $('.bigContainer').append('<div class="pokemonsContainer" id="bulbazar' + objN + objN + '"></div>')
      $('<img src=' + 'http://pokeapi.co/media/img/' + obj.pkdx_id + '.png' + ' alt="' + obj.name + '"></img>').appendTo($('#bulbazar' + objN + objN))
      $('<h3>' + obj.name + ' #' + obj.pkdx_id + '</h3>').appendTo($('#bulbazar' + objN + objN))

      for (typeN in obj.types) {
        var typeObj = obj.types[typeN];
        $('<div class="' + typeObj.name + '"' + '>' + typeObj.name + '</div>').appendTo($('#bulbazar' + objN + objN));
        forType.push(typeObj.name);

      }
      
      typesNames = forType.join('/');
      arrayForPokemons.push({
        name: getData.objects[objN].name,
        attack: getData.objects[objN].attack,
        defense: getData.objects[objN].defense,
        hp: getData.objects[objN].hp,
        speed: getData.objects[objN].speed,
        weight: getData.objects[objN].weight,
        pkdx_id: getData.objects[objN].pkdx_id,
        types: typesNames
      });

    };

    var pokeValues = $('.pokeValues');
    
    $('#hide-layout').css({opacity: .5});

    $('.pokemonsContainer').on("click", function (e) {
      var ImgSrcForParse = $(this).find('img').attr('src')
      $('#hide-layout, .pokeValues').fadeIn(300);
      $('.pokeValues').append('<img src=' + ImgSrcForParse + ' alt=""></img>')
      var pokeIdNum = parseInt(ImgSrcForParse.replace(/\D+/g, ""));

      for (key in arrayForPokemons) {
        
        if (pokeIdNum === arrayForPokemons[key].pkdx_id) {
          $('.pokeValues').append('<h3>' + arrayForPokemons[key].name + ' #' + arrayForPokemons[key].pkdx_id + '</h3>')

              $('.pokeValues').append('<table  id="inP">' +
                '<tr>' + '<td>' + 'type: ' + '</td>' + '<td>' + arrayForPokemons[key].types + '</td>' + '</tr>' +
                '<tr>' + '<td>' + 'attack:' + '</td>' + '<td>' + arrayForPokemons[key].attack + '</td>' + '</tr>' +
                '<tr>' + '<td>' + 'defense: ' + '</td>' + '<td>' + arrayForPokemons[key].defense + '</td>' + '</tr>' +
                '<tr>' + '<td>' + 'hp: ' + '</td>' + '<td>' + arrayForPokemons[key].hp + '</td>' + '</tr>' +
                '<tr>' + '<td>' + 'speed: ' + '</td>' + '<td>' + arrayForPokemons[key].speed + '</td>' + '</tr>' +
                '<tr>' + '<td>' + 'weight: ' + '</td>' + '<td>' + arrayForPokemons[key].weight + '</td>' + '</tr>' +
                '<tr>' + '<td>' + 'pkdx_id: ' + '</td>' + '<td>' + arrayForPokemons[key].pkdx_id + '</td>' + '</tr>' +
                '</table>');
        }
      }
    });

  });
if ($('#hide-layout, .pokeValues').css('display') == 'block') {
    $('#hide-layout').click(function () {
      $('#hide-layout, .pokeValues').fadeOut(300).empty();
      pokeValues = null;
    });
  };
  //--
  
  var counter = 1;
  $('.getMore').on("click", function (e) {

    $.getJSON(nextPokeAPI, function (data) {

      getData = data;
      next = getData.meta.next;
      nextPokeAPI = 'http://pokeapi.co' + next;

      for (objN in getData.objects) {
        var typesNames = '';
        var forType = [];
        obj = getData.objects[objN];
        
        $('.bigContainer').append('<div class="pokemonsContainer" id="bulbazar' + counter + objN + '"></div>');
        $('<img src=' + 'http://pokeapi.co/media/img/' + obj.pkdx_id + '.png' + ' alt="' + obj.name + '"></img>').appendTo($('#bulbazar' + counter + objN));
        $('<h3>' + obj.name + ' #' + obj.pkdx_id + '</h3>').appendTo($('#bulbazar' + counter + objN));

        for (typeN in obj.types) {
          var typeObj = obj.types[typeN];
          $('<div class="' + typeObj.name + '"' + '>' + typeObj.name + '</div>').appendTo('#bulbazar' + counter + objN);
          forType.push(typeObj.name);
        };
        typesNames = forType.join('/');
        arrayForPokemons.push({
          name: getData.objects[objN].name,
          attack: getData.objects[objN].attack,
          defense: getData.objects[objN].defense,
          hp: getData.objects[objN].hp,
          speed: getData.objects[objN].speed,
          weight: getData.objects[objN].weight,
          pkdx_id: getData.objects[objN].pkdx_id,
          types: typesNames
        });
        
        counter++
      
      };
      
      var pokeValues = $('.pokeValues');
      $('#hide-layout').css({opacity: .5});

      $('.pokemonsContainer').off('click').on("click", function (e) {
        var ImgSrcForParse = $(this).find('img').attr('src')
        $('#hide-layout, .pokeValues').fadeIn(300);
        $('.pokeValues').append('<img src=' + ImgSrcForParse + ' alt=""></img>')
        var pokeIdNum = parseInt(ImgSrcForParse.replace(/\D+/g, ""));

        for (key in arrayForPokemons) {
          if (pokeIdNum === arrayForPokemons[key].pkdx_id) {
            $('.pokeValues').append('<h3>' + arrayForPokemons[key].name + ' #' + arrayForPokemons[key].pkdx_id + '</h3>')

                $('.pokeValues').append('<table  id="inP">' +
                  '<tr>' + '<td>' + 'type: ' + '</td>' + '<td>' + arrayForPokemons[key].types + '</td>' + '</tr>' +
                  '<tr>' + '<td>' + 'attack:' + '</td>' + '<td>' + arrayForPokemons[key].attack + '</td>' + '</tr>' +
                  '<tr>' + '<td>' + 'defense: ' + '</td>' + '<td>' + arrayForPokemons[key].defense + '</td>' + '</tr>' +
                  '<tr>' + '<td>' + 'hp: ' + '</td>' + '<td>' + arrayForPokemons[key].hp + '</td>' + '</tr>' +
                  '<tr>' + '<td>' + 'speed: ' + '</td>' + '<td>' + arrayForPokemons[key].speed + '</td>' + '</tr>' +
                  '<tr>' + '<td>' + 'weight: ' + '</td>' + '<td>' + arrayForPokemons[key].weight + '</td>' + '</tr>' +
                  '<tr>' + '<td>' + 'pkdx_id: ' + '</td>' + '<td>' + arrayForPokemons[key].pkdx_id + '</td>' + '</tr>' +
                  '</table>');
          }
        }
      });

    });
    //---
    

    //---
  });

if ($('#hide-layout, .pokeValues').css('display') == 'block') {
    $('#hide-layout').click(function () {
      $('#hide-layout, .pokeValues').fadeOut(300).empty();
      pokeValues = null;
    });
  };

});