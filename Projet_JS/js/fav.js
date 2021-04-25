$champ_de_saisi = $("#champ-recherche");
list_of_fav();

function mettre_en_fav(){
  //Si SH trouvé donc bouton fav en vert et l'étoile est plein ou pas si c'est deja dans la liste

  //si le favorie est deja dans le local storage
  if(localStorage.getItem($champ_de_saisi.val()) !== null){

          delete_fav(localStorage.getItem($champ_de_saisi.val()));
          verif_is_in_fav();

  }else{//Si il n'existe pas on l'enregistre
    localStorage.setItem($champ_de_saisi.val(), $champ_de_saisi.val());
    $("#img-favoris").attr('src',"images/etoile-pleine.svg");
    $("#img-favoris").attr("alt", "Etoile pleine");

  }


  //actualise la liste:
  list_of_fav();

}


function list_of_fav(){
  if(localStorage.length <= 0){
    $("#fav_Nexiste").text("( ~ Aucune recherche enregistrée )");
    $ul_fav = $("#liste-favoris");
    $ul_fav.empty();

  }else{
      $("#fav_Nexiste").text("");
      $ul_fav = $("#liste-favoris");
      $ul_fav.empty();

      for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        console.log( localStorage.getItem( localStorage.key( i ) ) );
        var li_temp = $("<li>  <span onclick=\"use_fav("+i+");\" title=\"Cliquer pour relancer la recherche\">" + localStorage.getItem( localStorage.key( i ) ) + "  </span><img src=\"images/croix.svg\" onclick=\"delete_fav("+i+");\" alt=\"Icone pour supprimer le favori\" width=15 title=\"Cliquer pour supprimer le favori\"> </li>");
        $ul_fav.append(li_temp);

        }
  }
}

function use_fav(i){
  $champ_de_saisi.val(localStorage.getItem( localStorage.key( i ) ));
  sendToApi();
}

function delete_fav(i){
  ConfirmDialog('Voulez vous (vraiment) suprimmer le favori ?',i);
}



function ConfirmDialog(message,i) {
  $('<div></div>').appendTo('body')
    .html('<divstyle="padding: 10px; max-width: 500px; word-wrap: break-word;"><h6 style="color:black">' + message + '</h6></div>')
    .dialog({
      modal: true,
      title: 'Suppresion favori:',
      zIndex: 10000,
      autoOpen: true,
      width: 'auto',
      resizable: false,
      buttons: {
        Oui: function() {

          localStorage.removeItem(localStorage.getItem(localStorage.key( i )) );
          list_of_fav();

          verif_is_in_fav();

          $(this).dialog("close");
        },
        Non: function() {

          verif_is_in_fav();

          $(this).dialog("close");
        }
      },
      close: function(event, ui) {
        verif_is_in_fav();
        $(this).remove();
      }
    });
};
