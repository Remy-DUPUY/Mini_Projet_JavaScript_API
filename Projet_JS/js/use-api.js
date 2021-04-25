$champ_de_saisi = $("#champ-recherche");
$text_mauvaise_info = $("#erreur_hero_Nexiste");
$button_fav = $("#btn-favoris");

var blocResultat = $("#bloc-resultats");
var blocGIF = $("#bloc-gif-attente");

function sendToApi(){


  if($champ_de_saisi.val() == "") {
    $text_mauvaise_info.text("Votre recherche est vide ! ");
  } else{
    blocGIF.css("display", "block");
    var saisie = $champ_de_saisi.val();
    var accessToken = "1491699247688988";
    var url = 'https://www.superheroapi.com/api.php/' + accessToken + '/search/' + saisie;
    $.get(url,recup_api_callback);

    setTimeout(function(){
        blocGIF.css("display", "none");
    }, 200);

  }



}
// Cette fonction -> Callback de l'api
function recup_api_callback(data){
  //Data est déja un obj JSON
  if(data.results == undefined){
    // vidage ici :
    blocResultat.empty();

    $text_mauvaise_info.text("Ce SuperHero n'existe pas!");



    $button_fav.attr('disabled', true);
        //Mettre en gris
    $button_fav.removeAttr('class');


    $("#img-favoris").attr('src',"images/etoile-vide.svg");
    $("#img-favoris").attr("alt", "Etoile vide");



  }else{
    $text_mauvaise_info.text("");

    $button_fav.attr('disabled', false);
    //mettre en vert
    $button_fav.attr('class',"btn_clicable");


    if(localStorage.getItem($champ_de_saisi.val()) !== null){
        $("#img-favoris").attr('src',"images/etoile-pleine.svg");
        $("#img-favoris").attr("alt", "Etoile pleine");
      }else{
        $("#img-favoris").attr('src',"images/etoile-vide.svg");
        $("#img-favoris").attr("alt", "Etoile vide");
      }



    /*Récupération des informations pertinantes */

      /* Photo du héro + dimensions */
    var url_image = data.results[0].image.url;
    var resultatDuHero_Photo = $('<img/>').attr('src', url_image);
    resultatDuHero_Photo.attr('id','photoHero');





    // ajouter une DIV qui encadre les p
    var div_resultats = $("<div id=\"divInterResultat\"></div>");


    /* Autre informations */
    var resultatDuHero_ID = $("<p class=\"res\"></p>").text("🆔 ID : " + data.results[0].id);
    var resultatDuHero_Genre = $("<p class=\"res\"></p>").text((data.results[0].appearance.gender == "Female" ? "♀️":"♂️")+" Genre : " + data.results[0].appearance.gender);
    var resultatDuHero_Force = $("<p class=\"res\"></p>").text("💪 Force : " + data.results[0].powerstats.strength);
    var resultatDuHero_Intelligence = $("<p class=\"res\"></p>").text("🧠 Intelligence : " + data.results[0].powerstats.intelligence);
    var resultatDuHero_Vitesse = $("<p class=\"res\"></p>").text("🌠 Vitesse : " + data.results[0].powerstats.speed);
    var resultatDuHero_Durabilite = $("<p class=\"res\"></p>").text("🧱 Durabilité : " + data.results[0].powerstats.durability);
    var resultatDuHero_Apparition = $("<p class=\"res\"></p>").text("📅 Première apparition : " + data.results[0].biography["first-appearance"]);
    if(data.results[0].work.occupation != "-"){
      var resultatDuHero_Occupation = $("<p class=\"res\"></p>").text("📖 Occupation : " + data.results[0].work.occupation);
    }

      blocResultat.empty();

      blocResultat.append(resultatDuHero_Photo,div_resultats);

      div_resultats.append(resultatDuHero_ID,resultatDuHero_Genre,resultatDuHero_Force,
    resultatDuHero_Intelligence,resultatDuHero_Vitesse,resultatDuHero_Durabilite,resultatDuHero_Apparition,resultatDuHero_Occupation);

  }
}

  function verif_is_in_fav(){

$champ_de_saisi = $("#champ-recherche");

      if($champ_de_saisi.val() == ""){
        $("#img-favoris").attr('src',"images/etoile-vide.svg");
        $("#img-favoris").attr("alt", "Etoile vide");

        $button_fav.attr('disabled', true);
        //mettre en gris
        $button_fav.removeAttr('class');

      }else{

              if(localStorage.getItem($champ_de_saisi.val()) !== null){
                  $("#img-favoris").attr('src',"images/etoile-pleine.svg");
                  $("#img-favoris").attr("alt", "Etoile pleine");

                  $button_fav.attr('disabled', false);
                  //mettre en vert
                  $button_fav.attr('class',"btn_clicable");

                }else{
                  $("#img-favoris").attr('src',"images/etoile-vide.svg");
                  $("#img-favoris").attr("alt", "Etoile vide");

                  $button_fav.attr('disabled', true);
                  //mettre en gris
                  $button_fav.removeAttr('class');

                }
        }
  }
